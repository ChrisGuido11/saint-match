import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { hapticImpact, hapticNotification, ImpactFeedbackStyle, NotificationFeedbackType } from '@/lib/haptics';
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
import { IconMilestone, IconCompleted } from '../../components/icons';

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

  const iconScale = useSharedValue(0);
  const contentY = useSharedValue(20);

  useEffect(() => {
    hapticNotification(NotificationFeedbackType.Success);

    iconScale.value = withDelay(
      100,
      withSequence(
        withSpring(1.1, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 12 })
      )
    );

    contentY.value = withDelay(
      300,
      withSpring(0, { damping: 12, stiffness: 100 })
    );
  }, []);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentY.value }],
    opacity: contentY.value === 0 ? 1 : 0,
  }));

  const handleDone = () => {
    hapticImpact(ImpactFeedbackStyle.Light);
    router.replace('/(auth)/(tabs)');
  };

  return (
    <View style={styles.container}>
      {showConfetti && <ConfettiAnimation count={50} onFinish={() => setShowConfetti(false)} />}

      <View style={styles.content}>
        {/* Celebration Icon */}
        <Animated.View style={[styles.iconContainer, iconStyle]}>
          {isMilestone ? (
            <IconMilestone size={80} streak={count} />
          ) : (
            <IconCompleted size={80} color={Colors.sage} />
          )}
        </Animated.View>

        {/* Streak count */}
        <Animated.View entering={FadeIn.delay(400).duration(500)}>
          <Text style={styles.streakNumber}>{count}</Text>
          <Text style={styles.streakLabel}>{count === 1 ? 'day' : 'days'}</Text>
        </Animated.View>

        {/* Message */}
        <Animated.Text style={[styles.message, contentStyle]}>
          {message}
        </Animated.Text>
      </View>

      {/* Continue button */}
      <Animated.View entering={FadeInUp.delay(600).duration(500)} style={styles.bottomSection}>
        <TouchableOpacity style={styles.button} onPress={handleDone} activeOpacity={0.85} accessibilityRole="button" accessibilityLabel="Continue to home">
          <Text style={styles.buttonText}>Continue</Text>
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
  iconContainer: {
    marginBottom: Spacing.lg,
  },
  streakNumber: {
    ...Typography.streakDisplay,
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
    paddingBottom: Spacing.safeBottom,
  },
  button: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: Colors.sage,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.button,
  },
  buttonText: {
    ...Typography.buttonLarge,
    color: Colors.white,
  },
});
