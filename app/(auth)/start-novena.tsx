import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { hapticImpact, hapticSelection, ImpactFeedbackStyle } from '@/lib/haptics';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Typography, FontFamily } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { useApp } from '../../context/AppContext';
import { getNovenaById } from '../../constants/novenas';
import { SAINTS } from '../../constants/saints';
import { scheduleNovenaReminders } from '../../lib/notifications';
import { IconClose, IconNavNovenas } from '../../components/icons';

export default function StartNovenaScreen() {
  const { novenaId, saintId, saintName: saintNameParam, saintBio: saintBioParam, novenaTitle, novenaDescription, intention: passedIntention, matchReason } = useLocalSearchParams<{
    novenaId?: string;
    saintId: string;
    saintName?: string;
    saintBio?: string;
    novenaTitle?: string;
    novenaDescription?: string;
    intention?: string;
    matchReason?: string;
  }>();
  const { startNovena } = useApp();

  const novena = novenaId ? getNovenaById(novenaId) : null;
  const saint = saintId ? SAINTS.find((s) => s.id === saintId) : null;

  // Resolve saint name and bio — prefer local saint data, fall back to route params
  const resolvedSaintName = saint?.name ?? saintNameParam ?? 'Saint';
  const resolvedSaintBio = saint?.bio ?? saintBioParam ?? '';
  const resolvedInitials = saint?.initials ?? resolvedSaintName
    .split(' ')
    .filter((w) => w.length > 0 && w[0] === w[0].toUpperCase())
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  // Intention suggestions: use static novena's if available, otherwise generic ones
  const intentionSuggestions = novena?.intentionSuggestions ?? [
    'Spiritual growth',
    'Peace and guidance',
    'Healing and strength',
    'For a loved one',
  ];

  // If intention was passed from choose-intention screen, pre-select it
  const resolvePassedIntention = (): { selected: string | null; custom: string } => {
    if (!passedIntention) return { selected: null, custom: '' };
    // Check if it matches a preset suggestion
    if (intentionSuggestions.includes(passedIntention)) {
      return { selected: passedIntention, custom: '' };
    }
    // Otherwise treat as custom
    return { selected: '__custom__', custom: passedIntention };
  };
  const initialIntention = resolvePassedIntention();

  const [selectedIntention, setSelectedIntention] = useState<string | null>(initialIntention.selected);
  const [customIntention, setCustomIntention] = useState(initialIntention.custom);
  const [isStarting, setIsStarting] = useState(false);

  // For AI-only saints (no static novena), we still need a valid saintId or name
  if (!saintId) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Novena not found.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} accessibilityRole="button">
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Title and description: prefer route params (from catalog), then static novena, then generated
  const displayTitle = novenaTitle ?? novena?.title ?? `${resolvedSaintName} Novena`;
  const displayDescription = novenaDescription ?? novena?.description ?? `Nine days of prayer with ${resolvedSaintName}, asking for their intercession and guidance.`;

  const intention = selectedIntention === '__custom__' ? customIntention.trim() : (selectedIntention ?? '');

  const handleStart = async () => {
    if (!intention) return;
    setIsStarting(true);
    hapticImpact(ImpactFeedbackStyle.Medium);

    try {
      const userNovena = await startNovena(
        novena?.id ?? 'generated',
        saintId,
        resolvedSaintName,
        resolvedSaintBio,
        intention
      );
      scheduleNovenaReminders(userNovena, resolvedSaintName).catch(() => {});
      router.replace({
        pathname: '/(auth)/novena-prayer',
        params: { userNovenaId: userNovena.id },
      });
    } catch {
      // Failed to start
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <Animated.View entering={FadeIn.delay(100).duration(500)} style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeButton} accessibilityLabel="Close" accessibilityRole="button">
            <IconClose size={20} color={Colors.charcoalMuted} />
          </TouchableOpacity>
          <IconNavNovenas size={32} color={Colors.sage} />
          <Text style={styles.headerLabel}>9 DAYS OF PRAYER</Text>
        </Animated.View>

        {/* Saint & Novena Info */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.infoSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{resolvedInitials}</Text>
          </View>
          <Text style={styles.novenaTitle}>{displayTitle}</Text>
          <Text style={styles.novenaDescription}>{displayDescription}</Text>
        </Animated.View>

        {/* Why this saint? */}
        {matchReason ? (
          <Animated.View entering={FadeInDown.delay(250).duration(400)} style={styles.reasonSection}>
            <Text style={styles.reasonLabel}>Why {resolvedSaintName}?</Text>
            <Text style={styles.reasonText}>{matchReason}</Text>
          </Animated.View>
        ) : null}

        {/* Intention Selection — skip if intention was already chosen in previous step */}
        {passedIntention ? (
          <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.intentionSection}>
            <Text style={styles.sectionTitle}>Praying for</Text>
            <View style={[styles.intentionChip, styles.intentionChipSelected]}>
              <Text style={[styles.intentionChipText, styles.intentionChipTextSelected]}>
                {passedIntention}
              </Text>
            </View>
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.intentionSection}>
            <Text style={styles.sectionTitle}>Set Your Intention</Text>
            <Text style={styles.sectionSubtitle}>What would you like to pray for?</Text>

            {intentionSuggestions.map((suggestion) => (
              <TouchableOpacity
                key={suggestion}
                style={[
                  styles.intentionChip,
                  selectedIntention === suggestion && styles.intentionChipSelected,
                ]}
                onPress={() => {
                  setSelectedIntention(suggestion);
                  hapticSelection();
                }}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityState={{ selected: selectedIntention === suggestion }}
              >
                <Text
                  style={[
                    styles.intentionChipText,
                    selectedIntention === suggestion && styles.intentionChipTextSelected,
                  ]}
                >
                  {suggestion}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[
                styles.intentionChip,
                selectedIntention === '__custom__' && styles.intentionChipSelected,
              ]}
              onPress={() => {
                setSelectedIntention('__custom__');
                hapticSelection();
              }}
              activeOpacity={0.7}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.intentionChipText,
                  selectedIntention === '__custom__' && styles.intentionChipTextSelected,
                ]}
              >
                Write my own...
              </Text>
            </TouchableOpacity>

            {selectedIntention === '__custom__' && (
              <TextInput
                style={styles.customInput}
                placeholder="My prayer intention..."
                placeholderTextColor={Colors.charcoalSubtle}
                value={customIntention}
                onChangeText={setCustomIntention}
                multiline
                maxLength={200}
                accessibilityLabel="Custom prayer intention"
              />
            )}
          </Animated.View>
        )}

        {/* Helper text */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)}>
          <Text style={styles.helperText}>
            You'll receive a daily reminder at noon to pray. Each day takes about 5 minutes.
          </Text>
        </Animated.View>

        {/* Start Button */}
        <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.bottomSection}>
          <TouchableOpacity
            style={[styles.startButton, (!intention || isStarting) && styles.startButtonDisabled]}
            onPress={handleStart}
            disabled={!intention || isStarting}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Start 9-day novena"
          >
            <Text style={styles.startButtonText}>
              {isStarting ? 'Generating your novena...' : 'Start 9-Day Novena'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  closeButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.subtle,
  },
  headerLabel: {
    ...Typography.label,
    color: Colors.sage,
    marginTop: Spacing.sm,
  },
  infoSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: {
    ...Typography.button,
    color: Colors.white,
    fontSize: 18,
  },
  novenaTitle: {
    ...Typography.h2,
    color: Colors.charcoal,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  novenaDescription: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    maxWidth: 320,
  },
  reasonSection: {
    backgroundColor: Colors.sageMuted,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  reasonLabel: {
    ...Typography.cardTitle,
    color: Colors.sageDark,
    marginBottom: Spacing.xxs,
  },
  reasonText: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  intentionSection: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.charcoal,
    marginBottom: Spacing.xxs,
  },
  sectionSubtitle: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
    marginBottom: Spacing.md,
  },
  intentionChip: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.creamDark,
    backgroundColor: Colors.white,
    marginBottom: Spacing.xs,
  },
  intentionChipSelected: {
    borderColor: Colors.sage,
    backgroundColor: Colors.sageMuted,
  },
  intentionChipText: {
    ...Typography.body,
    color: Colors.charcoal,
  },
  intentionChipTextSelected: {
    color: Colors.sageDark,
  },
  customInput: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    ...Typography.body,
    color: Colors.charcoal,
    borderWidth: 1,
    borderColor: Colors.creamDark,
    marginTop: Spacing.xs,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  helperText: {
    ...Typography.bodySmall,
    color: Colors.charcoalSubtle,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bottomSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.safeBottom,
    paddingTop: Spacing.md,
  },
  startButton: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.button,
  },
  startButtonDisabled: {
    opacity: 0.5,
  },
  startButtonText: {
    ...Typography.buttonLarge,
    color: Colors.white,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: Colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  errorText: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  backButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.sage,
    borderRadius: BorderRadius.md,
  },
  backButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
});
