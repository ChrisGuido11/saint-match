import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { hapticImpact, hapticSelection, ImpactFeedbackStyle } from '@/lib/haptics';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Typography, FontFamily } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { fetchNovenaCatalog, getCachedCatalog, NovenaEntry } from '../../lib/novenaCatalog';
import { PRESET_INTENTIONS, matchNovenaToIntention } from '../../lib/novenaMatch';
import { IconClose, IconNavNovenas } from '../../components/icons';

export default function ChooseIntentionScreen() {
  const [selectedIntention, setSelectedIntention] = useState<string | null>(null);
  const [customIntention, setCustomIntention] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [catalog, setCatalog] = useState<NovenaEntry[]>([]);

  // Warm the catalog cache on mount
  useEffect(() => {
    getCachedCatalog().then(setCatalog);
    fetchNovenaCatalog().then(setCatalog).catch(() => {});
  }, []);

  const intention =
    selectedIntention === '__custom__' ? customIntention.trim() : (selectedIntention ?? '');
  const canSearch = intention.length > 0;

  const handleFindNovena = async () => {
    if (!canSearch) return;
    setIsMatching(true);
    hapticImpact(ImpactFeedbackStyle.Medium);

    try {
      // Ensure we have the freshest catalog
      const freshCatalog = catalog.length > 0 ? catalog : await getCachedCatalog();
      const result = await matchNovenaToIntention(intention, freshCatalog);

      const saintId = result.entry.slug;
      const saintName = result.patronSaint;
      const novenaTitle = `${saintName} Novena`;

      router.push({
        pathname: '/(auth)/start-novena',
        params: {
          saintId,
          saintName,
          novenaTitle,
          novenaDescription: `Nine days of prayer — ${novenaTitle}. Praying for: ${intention}.`,
          intention,
          matchReason: result.matchReason,
        },
      });
    } finally {
      setIsMatching(false);
    }
  };

  const handleViewCatalog = () => {
    router.push({ pathname: '/(auth)/browse-novenas' });
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
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.closeButton}
            accessibilityLabel="Close"
            accessibilityRole="button"
          >
            <IconClose size={20} color={Colors.charcoalMuted} />
          </TouchableOpacity>
          <IconNavNovenas size={32} color={Colors.sage} />
          <Text style={styles.headerLabel}>START A NOVENA</Text>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.titleSection}>
          <Text style={styles.title}>What's on your heart?</Text>
          <Text style={styles.subtitle}>
            Choose an intention and we'll find the perfect novena for you.
          </Text>
        </Animated.View>

        {/* Preset Intentions */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.intentionsSection}>
          {PRESET_INTENTIONS.map((preset) => (
            <TouchableOpacity
              key={preset}
              style={[
                styles.intentionChip,
                selectedIntention === preset && styles.intentionChipSelected,
              ]}
              onPress={() => {
                setSelectedIntention(preset);
                hapticSelection();
              }}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityState={{ selected: selectedIntention === preset }}
            >
              <Text
                style={[
                  styles.intentionChipText,
                  selectedIntention === preset && styles.intentionChipTextSelected,
                ]}
              >
                {preset}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Custom Intention */}
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
              autoFocus
              accessibilityLabel="Custom prayer intention"
            />
          )}
        </Animated.View>

        {/* Bottom Section */}
        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.bottomSection}>
          <TouchableOpacity
            style={[styles.findButton, (!canSearch || isMatching) && styles.findButtonDisabled]}
            onPress={handleFindNovena}
            disabled={!canSearch || isMatching}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Find my novena"
          >
            {isMatching ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator size="small" color={Colors.white} />
                <Text style={styles.findButtonText}>  Finding your novena...</Text>
              </View>
            ) : (
              <Text style={styles.findButtonText}>Find My Novena</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.catalogLink}
            onPress={handleViewCatalog}
            activeOpacity={0.7}
            accessibilityRole="link"
            accessibilityLabel="View full novena catalog"
          >
            <Text style={styles.catalogLinkText}>View Full Catalog</Text>
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
  titleSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h2,
    color: Colors.charcoal,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    maxWidth: 300,
  },
  intentionsSection: {
    marginBottom: Spacing.lg,
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
  bottomSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.safeBottom,
    paddingTop: Spacing.md,
    alignItems: 'center',
  },
  findButton: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.button,
  },
  findButtonDisabled: {
    opacity: 0.5,
  },
  findButtonText: {
    ...Typography.buttonLarge,
    color: Colors.white,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  catalogLink: {
    paddingVertical: Spacing.md,
  },
  catalogLinkText: {
    ...Typography.body,
    color: Colors.sage,
  },
});
