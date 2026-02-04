import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Colors } from '../../../constants/colors';
import { Typography, FontFamily } from '../../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../../constants/spacing';
import { useApp } from '../../../context/AppContext';
import { EmotionSelector } from '../../../components/EmotionSelector';
import { StreakCounter } from '../../../components/StreakCounter';
import { ChallengeCard } from '../../../components/ChallengeCard';
import { PaywallBottomSheet } from '../../../components/PaywallBottomSheet';
import { Emotion } from '../../../types';
import { getSaintMatch } from '../../../lib/claude';

export default function HomeScreen() {
  const {
    streak,
    usage,
    activeChallenge,
    isPro,
    consumeMatch,
    acceptChallenge,
    completeChallenge,
    refreshAll,
    setIsPro,
  } = useApp();

  const [showPaywall, setShowPaywall] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshAll();
    setRefreshing(false);
  }, [refreshAll]);

  const handleEmotionSelect = async (emotion: Emotion) => {
    // Client-side pre-check (server is authoritative via Edge Function)
    const canMatch = await consumeMatch();
    if (!canMatch) {
      setShowPaywall(true);
      return;
    }

    setIsMatching(true);
    try {
      const match = await getSaintMatch(emotion);
      router.push({
        pathname: '/(auth)/saint-match',
        params: {
          matchData: JSON.stringify(match),
        },
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'USAGE_LIMIT_REACHED') {
        setShowPaywall(true);
        refreshAll();
      }
      // Other errors: getSaintMatch already falls back to local
    } finally {
      setIsMatching(false);
    }
  };

  const handleCompleteChallenge = async () => {
    const updatedStreak = await completeChallenge();
    router.push({
      pathname: '/(auth)/celebration',
      params: { streakCount: updatedStreak.currentStreak.toString() },
    });
  };

  const matchesRemaining = usage.weeklyLimit - usage.matchesUsedThisWeek;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.sage} />
      }
    >
      {/* Header */}
      <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            {getGreeting()}
          </Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>
        <StreakCounter count={streak.currentStreak} />
      </Animated.View>

      {/* Active challenge or emotion selector */}
      {activeChallenge && !activeChallenge.completed ? (
        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
          <Text style={styles.sectionTitle}>Today's Challenge</Text>
          <ChallengeCard challenge={activeChallenge} onComplete={handleCompleteChallenge} />
        </Animated.View>
      ) : activeChallenge?.completed ? (
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.completedSection}>
          <View style={styles.completedCard}>
            <Text style={styles.completedEmoji}>{'\u{2705}'}</Text>
            <Text style={styles.completedTitle}>Challenge completed!</Text>
            <Text style={styles.completedSubtitle}>
              Amazing work. Come back tomorrow for your next saint match.
            </Text>
          </View>
        </Animated.View>
      ) : (
        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
          {isMatching ? (
            <View style={styles.matchingContainer}>
              <Text style={styles.matchingEmoji}>{'\u{1F52E}'}</Text>
              <Text style={styles.matchingText}>Finding your saint...</Text>
            </View>
          ) : (
            <EmotionSelector onSelect={handleEmotionSelect} />
          )}
        </Animated.View>
      )}

      {/* Free match counter */}
      {!isPro && (
        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.usageContainer}>
          <View style={styles.usageCard}>
            <View style={styles.usageBar}>
              <View
                style={[
                  styles.usageFill,
                  { width: `${(matchesRemaining / usage.weeklyLimit) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.usageText}>
              {matchesRemaining} of {usage.weeklyLimit} free matches remaining this week
            </Text>
          </View>
        </Animated.View>
      )}

      {/* Quick stats */}
      <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{streak.currentStreak}</Text>
          <Text style={styles.statLabel}>Current Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{streak.longestStreak}</Text>
          <Text style={styles.statLabel}>Longest Streak</Text>
        </View>
      </Animated.View>

      <PaywallBottomSheet
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        onPurchaseSuccess={() => {
          setIsPro(true);
          setShowPaywall(false);
        }}
      />
    </ScrollView>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  greeting: {
    ...Typography.h1,
    color: Colors.charcoal,
  },
  date: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    marginTop: 2,
  },
  sectionTitle: {
    ...Typography.label,
    color: Colors.charcoalMuted,
    marginBottom: Spacing.sm,
  },
  completedSection: {
    marginBottom: Spacing.md,
  },
  completedCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.sage,
    ...Shadows.card,
  },
  completedEmoji: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  completedTitle: {
    ...Typography.h3,
    color: Colors.charcoal,
    textAlign: 'center',
  },
  completedSubtitle: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  matchingContainer: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xxl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.creamDark,
    ...Shadows.card,
  },
  matchingEmoji: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  matchingText: {
    ...Typography.h3,
    color: Colors.charcoalMuted,
  },
  usageContainer: {
    marginTop: Spacing.lg,
  },
  usageCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.creamDark,
  },
  usageBar: {
    height: 6,
    backgroundColor: Colors.creamDark,
    borderRadius: 3,
    marginBottom: Spacing.xs,
    overflow: 'hidden',
  },
  usageFill: {
    height: '100%',
    backgroundColor: Colors.sage,
    borderRadius: 3,
  },
  usageText: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.creamDark,
    ...Shadows.subtle,
  },
  statNumber: {
    ...Typography.statNumber,
    color: Colors.charcoal,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.charcoalMuted,
    marginTop: 2,
  },
});
