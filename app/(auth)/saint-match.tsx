import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { hapticImpact, ImpactFeedbackStyle } from '@/lib/haptics';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { SaintCard } from '../../components/SaintCard';
import { useApp } from '../../context/AppContext';
import { SaintMatch as SaintMatchType, Mood } from '../../types';
import { getMoodById } from '../../constants/saints';
import { IconClose } from '../../components/icons';
import { NovenaSuggestionCard } from '../../components/NovenaSuggestionCard';

export default function SaintMatchScreen() {
  const { matchData, selectedMood, customMoodText } = useLocalSearchParams<{
    matchData: string;
    selectedMood?: Mood;
    customMoodText?: string;
  }>();
  const { acceptChallenge, userNovenas } = useApp();

  const selectedMoodData = selectedMood ? getMoodById(selectedMood) : null;

  let match: SaintMatchType | null = null;
  try {
    match = matchData ? JSON.parse(matchData) : null;
  } catch {
    // Invalid JSON — fall through to error UI
  }

  if (!match) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Something went wrong. Please try again.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Go back">
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAcceptChallenge = async () => {
    hapticImpact(ImpactFeedbackStyle.Medium);
    await acceptChallenge({
      match,
      acceptedAt: new Date().toISOString(),
      completed: false,
    });
    router.replace('/(auth)/(tabs)');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeIn.delay(100).duration(500)} style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeButton} accessibilityLabel="Close" accessibilityRole="button">
            <IconClose size={20} color={Colors.charcoalMuted} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Saint Match</Text>
          {selectedMoodData && (
            <Text style={styles.moodLabel}>
              {selectedMoodData.label}
            </Text>
          )}
          {customMoodText && (
            <Text style={styles.customMoodLabel} numberOfLines={1}>
              {customMoodText.length > 50 ? customMoodText.slice(0, 50) + '...' : customMoodText}
            </Text>
          )}
        </Animated.View>

        {/* Saint Card */}
        <SaintCard saint={match.saint} microAction={match.microAction} />

        {/* Why this saint? */}
        {match.matchReason ? (
          <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.reasonSection}>
            <Text style={styles.reasonLabel}>Why {match.saint.name}?</Text>
            <Text style={styles.reasonText}>{match.matchReason}</Text>
          </Animated.View>
        ) : null}

        {/* Novena Suggestion */}
        {!userNovenas.some((n) => n.saintId === match.saint.id && !n.completed) && (
          <NovenaSuggestionCard
            saintId={match.saint.id}
            saintName={match.saint.name}
            saintBio={match.saint.bio}
            onStartNovena={() => {
              const novenaIntention = customMoodText || (selectedMoodData ? selectedMoodData.label : undefined);
              router.push({
                pathname: '/(auth)/start-novena',
                params: {
                  saintId: match.saint.id,
                  saintName: match.saint.name,
                  saintBio: match.saint.bio,
                  ...(novenaIntention ? { intention: novenaIntention } : {}),
                },
              });
            }}
          />
        )}

        {/* Encouragement */}
        <Animated.Text
          entering={FadeInDown.delay(600).duration(400)}
          style={styles.encouragement}
        >
          {getEncouragementText(customMoodText ? 'support' : selectedMoodData?.category)}
        </Animated.Text>
      </ScrollView>

      {/* Accept button */}
      <Animated.View entering={FadeInDown.delay(700).duration(500)} style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={handleAcceptChallenge}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Accept challenge"
        >
          <Text style={styles.acceptButtonText}>Accept Challenge</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

function getEncouragementText(category?: 'support' | 'growth'): string {
  if (category === 'growth') {
    return "Your heart is open to grace today.\nThis saint will help you share your light with the world.";
  }
  return "This saint walked your path before you.\nTheir wisdom is your strength today.";
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
  // closeButtonText removed — replaced by IconClose component
  headerTitle: {
    ...Typography.label,
    color: Colors.terracotta,
    marginTop: Spacing.sm,
  },
  moodLabel: {
    ...Typography.caption,
    color: Colors.charcoalMuted,
    marginTop: Spacing.xs,
  },
  customMoodLabel: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
    fontStyle: 'italic',
    marginTop: Spacing.xs,
    maxWidth: 260,
    textAlign: 'center',
  },
  reasonSection: {
    backgroundColor: Colors.sageMuted,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginTop: Spacing.md,
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
  encouragement: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    marginTop: Spacing.lg,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  bottomSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.safeBottom,
    paddingTop: Spacing.md,
  },
  acceptButton: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.button,
  },
  acceptButtonText: {
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
