import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, {
  FadeIn,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { ConfettiAnimation } from '../../components/ConfettiAnimation';
import { isMilestoneStreak } from '../../constants/saints';

const MESSAGES: Record<number, string> = {
  1: "The journey of a thousand miles begins with a single step.",
  7: "One week of showing up for yourself.",
  14: "Two weeks strong. This is who you are now.",
  30: "A month of transformation. You're incredible.",
  50: "50 days. The saints are proud of you.",
  100: "A century of days. You inspire us all.",
};

const DEFAULT_MESSAGES = [
  "Beautiful work today.",
  "You're building something meaningful.",
  "Step by step, you're growing.",
  "The saints are cheering for you.",
];

export default function CelebrationScreen() {
  const { streakCount } = useLocalSearchParams<{ streakCount: string }>();
  const count = parseInt(streakCount ?? '0', 10);
  const [showConfetti, setShowConfetti] = useState(true);
  
  const isMilestone = isMilestoneStreak(count);
  const message = MESSAGES[count] || DEFAULT_MESSAGES[Math.floor(Math.random() * DEFAULT_MESSAGES.length)];

  const emojiScale = useSharedValue(0);
  const contentY = useSharedValue(20);

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    emojiScale.value = withDelay(
      100,
      withSequence(
        withSpring(1.2, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 12 })
      )
    );

    contentY.value = withDelay(
      300,
      withSpring(0, { damping: 12, stiffness: 100 })
    );
  }, []);

  const emojiStyle = useAnimatedStyle(() => ({
    transform: [{ scale: emojiScale.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentY.value }],
    opacity: contentY.value === 0 ? 1 : 0,
  }));

  const handleDone = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace('/(auth)/(tabs)');
  };

  return (
    <View style={styles.container}>
      {showConfetti && <ConfettiAnimation count={50} onFinish={() => setShowConfetti(false)} />}

      <View style={styles.content}>
        {/* Main celebration emoji */}
        <Animated.Text style={[styles.emoji, emojiStyle]}>
          {isMilestone ? getMilestoneEmoji(count) : '✨'}
        </Animated.Text>

        {/* Streak count */}
        <Animated.View entering={FadeIn.delay(400).duration(500)}>
          <Text style={styles.streakNumber}>{count}</Text>
          <Text style={styles.streakLabel}>{count === 1 ? 'day' : 'days'}</Text>
        </Animated.View>

        {/* Single elegant message */}
        <Animated.Text style={[styles.message, contentStyle]}>
          {message}
        </Animated.Text>
      </View>

      {/* Single continue button */}
      <Animated.View entering={FadeInUp.delay(600).duration(500)} style={styles.bottomSection}>
        <TouchableOpacity style={styles.button} onPress={handleDone} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

function getMilestoneEmoji(count: number): string {
  if (count >= 100) return '🏆';
  if (count >= 50) return '⭐';
  if (count >= 30) return '👑';
  if (count >= 14) return '🌟';
  if (count >= 7) return '🎉';
  if (count >= 3) return '🔥';
  return '🌱';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emoji: {
    fontSize: 72,
    marginBottom: Spacing.lg,
  },
  streakNumber: {
    ...Typography.heroTitle,
    color: Colors.charcoal,
    fontSize: 80,
    lineHeight: 90,
    textAlign: 'center',
  },
  streakLabel: {
    ...Typography.bodyLarge,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  message: {
    ...Typography.bodyLarge,
    color: Colors.charcoalLight,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 28,
    fontStyle: 'italic',
  },
  bottomSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 50,
  },
  button: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: Colors.sage,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.card,
  },
  buttonText: {
    ...Typography.button,
    color: Colors.white,
    fontSize: 17,
  },
});
