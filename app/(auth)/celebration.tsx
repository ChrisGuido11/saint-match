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
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Typography, FontFamily } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { ConfettiAnimation } from '../../components/ConfettiAnimation';
import { StreakCounter } from '../../components/StreakCounter';

export default function CelebrationScreen() {
  const { streakCount } = useLocalSearchParams<{ streakCount: string }>();
  const count = parseInt(streakCount ?? '0', 10);
  const [showConfetti, setShowConfetti] = useState(true);

  const titleScale = useSharedValue(0);
  const emojiScale = useSharedValue(0);

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    emojiScale.value = withDelay(
      200,
      withSequence(
        withSpring(1.3, { damping: 6, stiffness: 200 }),
        withSpring(1, { damping: 10 })
      )
    );

    titleScale.value = withDelay(
      500,
      withSpring(1, { damping: 8, stiffness: 120 })
    );
  }, []);

  const emojiStyle = useAnimatedStyle(() => ({
    transform: [{ scale: emojiScale.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: titleScale.value }],
    opacity: titleScale.value,
  }));

  const handleDone = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace('/(auth)/(tabs)');
  };

  const getMessage = () => {
    if (count >= 30) return "You're building something extraordinary.";
    if (count >= 14) return "Two weeks strong! Your consistency inspires.";
    if (count >= 7) return "One whole week! Virtue is becoming a habit.";
    if (count >= 3) return "Three days in. You're building momentum.";
    return "Amazing work today. Come back tomorrow!";
  };

  return (
    <View style={styles.container}>
      {showConfetti && <ConfettiAnimation count={60} onFinish={() => setShowConfetti(false)} />}

      <View style={styles.content}>
        <Animated.Text style={[styles.celebrationEmoji, emojiStyle]}>
          {'\u{1F389}'}
        </Animated.Text>

        <Animated.Text style={[styles.title, titleStyle]}>
          Challenge Complete!
        </Animated.Text>

        <Animated.View entering={FadeInUp.delay(700).duration(500)}>
          <StreakCounter count={count} size="large" />
        </Animated.View>

        <Animated.Text
          entering={FadeInUp.delay(900).duration(500)}
          style={styles.message}
        >
          {getMessage()}
        </Animated.Text>

        <Animated.Text
          entering={FadeInUp.delay(1000).duration(500)}
          style={styles.virtue}
        >
          Your patience is growing {'\u{1F331}'}
        </Animated.Text>
      </View>

      <Animated.View entering={FadeIn.delay(1200).duration(500)} style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={handleDone}
          activeOpacity={0.85}
        >
          <Text style={styles.doneButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
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
  celebrationEmoji: {
    fontSize: 80,
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.heroTitle,
    color: Colors.charcoal,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  message: {
    ...Typography.bodyLarge,
    color: Colors.charcoalLight,
    textAlign: 'center',
    marginTop: Spacing.xl,
    lineHeight: 26,
  },
  virtue: {
    ...Typography.body,
    color: Colors.sage,
    textAlign: 'center',
    marginTop: Spacing.sm,
    fontFamily: FontFamily.sansMedium,
  },
  bottomSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 50,
  },
  doneButton: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: Colors.sage,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.card,
  },
  doneButtonText: {
    ...Typography.button,
    color: Colors.white,
    fontSize: 17,
  },
});
