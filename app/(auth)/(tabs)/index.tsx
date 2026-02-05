import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing, BorderRadius } from '../../../constants/spacing';
import { useApp } from '../../../context/AppContext';
import { getGreetingMessage } from '../../../constants/saints';
import { MoodSelector } from '../../../components/MoodSelector';
import { StreakCounter } from '../../../components/StreakCounter';
import { ChallengeCard } from '../../../components/ChallengeCard';
import { PaywallBottomSheet } from '../../../components/PaywallBottomSheet';
import { Mood } from '../../../types';
import { getSaintMatch } from '../../../lib/claude';
import { getEmotionFromMood } from '../../../constants/saints';
import { IconCompleted, IconMatching } from '../../../components/icons';

export default function HomeScreen() {
  const {
    streak,
    usage,
    activeChallenge,
    isPro,
    consumeMatch,
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

  const handleMoodSelect = async (mood: Mood) => {
    const emotion = getEmotionFromMood(mood);
    
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
          selectedMood: mood,
        },
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'USAGE_LIMIT_REACHED') {
        setShowPaywall(true);
        refreshAll();
      }
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
  const hasContent = activeChallenge || isMatching;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.sage} />
      }
    >
      {/* Header - Clean and minimal */}
      <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.subtitle}>
            {getGreetingMessage(streak.currentStreak)}
          </Text>
        </View>
        <StreakCounter count={streak.currentStreak} />
      </Animated.View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {activeChallenge && !activeChallenge.completed ? (
          <Animated.View entering={FadeInDown.delay(100).duration(500)}>
            <ChallengeCard challenge={activeChallenge} onComplete={handleCompleteChallenge} />
          </Animated.View>
        ) : activeChallenge?.completed ? (
          <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.completedState}>
            <IconCompleted size={72} color={Colors.sage} />
            <Text style={styles.completedTitle}>Rest well</Text>
            <Text style={styles.completedSubtitle}>
              You've completed today's challenge. Return tomorrow to continue your journey.
            </Text>
          </Animated.View>
        ) : isMatching ? (
          <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.matchingState}>
            <IconMatching size={64} color={Colors.sage} />
            <Text style={styles.matchingText}>Finding your saint...</Text>
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInDown.delay(100).duration(500)}>
            <MoodSelector onSelect={handleMoodSelect} />
          </Animated.View>
        )}
      </View>

      {/* Usage Indicator - Minimal */}
      {!isPro && !hasContent && (
        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.usageSection}>
          <View style={styles.usageBar}>
            <View 
              style={[
                styles.usageFill,
                { width: `${(matchesRemaining / usage.weeklyLimit) * 100}%` },
              ]} 
            />
          </View>
          <Text style={styles.usageText}>
            {matchesRemaining} free matches remaining
          </Text>
        </Animated.View>
      )}

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
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xl,
  },
  greetingSection: {
    flex: 1,
  },
  greeting: {
    ...Typography.h1,
    color: Colors.charcoal,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    marginTop: 4,
  },
  mainContent: {
    flex: 1,
  },
  completedState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  completedTitle: {
    ...Typography.h2,
    color: Colors.charcoal,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  completedSubtitle: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    maxWidth: 280,
  },
  matchingState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  matchingText: {
    ...Typography.bodyLarge,
    color: Colors.charcoalMuted,
    marginTop: Spacing.md,
  },
  usageSection: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  usageBar: {
    width: 120,
    height: 4,
    backgroundColor: Colors.creamDark,
    borderRadius: 2,
    overflow: 'hidden',
  },
  usageFill: {
    height: '100%',
    backgroundColor: Colors.sage,
    borderRadius: 2,
  },
  usageText: {
    ...Typography.caption,
    color: Colors.charcoalSubtle,
    marginTop: Spacing.xs,
  },
});
