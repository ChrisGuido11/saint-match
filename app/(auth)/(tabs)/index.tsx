import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
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

import { Mood } from '../../../types';
import { getSaintMatch, getSaintMatchCustom } from '../../../lib/claude';
import { getEmotionFromMood } from '../../../constants/saints';
import { IconCompleted, IconMatching } from '../../../components/icons';
import { ActiveNovenaCard } from '../../../components/ActiveNovenaCard';

export default function HomeScreen() {
  const {
    streak,
    activeChallenge,
    consumeMatch,
    completeChallenge,
    refreshAll,
    userNovenas,
    abandonNovena,
  } = useApp();

  const activeNovenas = userNovenas.filter((n) => !n.completed);

  const handleDeleteNovena = (userNovenaId: string, saintName: string) => {
    Alert.alert(
      'Remove Novena',
      `Are you sure you want to remove the ${saintName} novena? Your progress will be lost.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            await abandonNovena(userNovenaId);
          },
        },
      ],
    );
  };

  const [isMatching, setIsMatching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshAll();
    setRefreshing(false);
  }, [refreshAll]);

  const handleMoodSelect = async (mood: Mood) => {
    const emotion = getEmotionFromMood(mood);

    await consumeMatch();

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
    } catch {
      // Match failed — user can retry
    } finally {
      setIsMatching(false);
    }
  };

  const handleCustomMoodSubmit = async (text: string) => {
    await consumeMatch();

    setIsMatching(true);
    try {
      const match = await getSaintMatchCustom(text);
      router.push({
        pathname: '/(auth)/saint-match',
        params: {
          matchData: JSON.stringify(match),
          customMoodText: text,
        },
      });
    } catch {
      // Match failed — user can retry
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
            <MoodSelector onSelect={handleMoodSelect} onCustomSubmit={handleCustomMoodSubmit} />
          </Animated.View>
        )}
      </View>

      {/* Active Novenas */}
      {activeNovenas.length > 0 && (
        <View style={styles.novenasSection}>
          {activeNovenas.map((userNovena) => (
            <Animated.View key={userNovena.id} entering={FadeInDown.delay(200).duration(400)} style={styles.novenaCardWrapper}>
              <ActiveNovenaCard
                userNovena={userNovena}
                onPrayNow={() => {
                  router.push({
                    pathname: '/(auth)/novena-prayer',
                    params: { userNovenaId: userNovena.id },
                  });
                }}
                onLongPress={() => {
                  const saint = userNovena.saintName ?? 'Saint';
                  handleDeleteNovena(userNovena.id, saint);
                }}
              />
            </Animated.View>
          ))}
        </View>
      )}

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
  novenasSection: {
    marginTop: Spacing.xl,
  },
  novenaCardWrapper: {
    marginBottom: Spacing.sm,
  },
});
