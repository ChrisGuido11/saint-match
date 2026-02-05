import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { SaintCard } from '../../components/SaintCard';
import { useApp } from '../../context/AppContext';
import { SaintMatch as SaintMatchType, Mood } from '../../types';
import { getMoodById } from '../../constants/saints';

export default function SaintMatchScreen() {
  const { matchData, selectedMood } = useLocalSearchParams<{ matchData: string; selectedMood: Mood }>();
  const { acceptChallenge } = useApp();
  
  const selectedMoodData = selectedMood ? getMoodById(selectedMood) : null;

  const match: SaintMatchType = matchData ? JSON.parse(matchData) : null;

  if (!match) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Something went wrong. Please try again.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAcceptChallenge = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
          <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Saint Match</Text>
          {selectedMoodData && (
            <Text style={styles.moodLabel}>
              {selectedMoodData.emoji} {selectedMoodData.label}
            </Text>
          )}
        </Animated.View>

        {/* Saint Card */}
        <SaintCard saint={match.saint} microAction={match.microAction} />

        {/* Encouragement */}
        <Animated.Text
          entering={FadeInDown.delay(600).duration(400)}
          style={styles.encouragement}
        >
          {getEncouragementText(selectedMoodData?.category)}
        </Animated.Text>
      </ScrollView>

      {/* Accept button */}
      <Animated.View entering={FadeInDown.delay(700).duration(500)} style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={handleAcceptChallenge}
          activeOpacity={0.85}
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
  closeButtonText: {
    fontSize: 24,
    color: Colors.charcoalMuted,
    lineHeight: 28,
  },
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
    paddingBottom: 40,
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
    ...Typography.button,
    color: Colors.white,
    fontSize: 17,
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
