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
import { NovenaProgressDots } from '../../components/NovenaProgressDots';
import { IconNavNovenas } from '../../components/icons';

const MESSAGES = [
  "Your prayer has been heard.",
  "Each day draws you closer.",
  "Faithful in prayer, faithful in heart.",
  "The saints rejoice with you.",
  "Perseverance is its own grace.",
];

export default function NovenaCelebrationScreen() {
  const { saintName, dayCompleted, completedDays: completedDaysParam, intention } = useLocalSearchParams<{
    saintName: string;
    dayCompleted: string;
    completedDays: string;
    intention?: string;
  }>();

  const day = parseInt(dayCompleted ?? '1', 10);
  const completedDays = completedDaysParam ? JSON.parse(completedDaysParam) as boolean[] : [];
  const [showConfetti, setShowConfetti] = useState(true);
  const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

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
      {showConfetti && <ConfettiAnimation count={30} onFinish={() => setShowConfetti(false)} />}

      <View style={styles.content}>
        {/* Icon */}
        <Animated.View style={[styles.iconContainer, iconStyle]}>
          <IconNavNovenas size={80} color={Colors.sage} />
        </Animated.View>

        {/* Day and saint */}
        <Animated.View entering={FadeIn.delay(400).duration(500)} style={styles.infoSection}>
          <Text style={styles.dayNumber}>Day {day}</Text>
          <Text style={styles.dayLabel}>of 9 complete</Text>
          <Text style={styles.saintName}>{saintName}</Text>
        </Animated.View>

        {/* Progress dots */}
        <Animated.View entering={FadeIn.delay(500).duration(500)} style={styles.progressSection}>
          <NovenaProgressDots
            completedDays={completedDays}
            currentDay={day < 9 ? day + 1 : 9}
          />
        </Animated.View>

        {/* Intention reminder */}
        {intention ? (
          <Animated.View entering={FadeIn.delay(550).duration(500)}>
            <Text style={styles.intentionText}>"{intention}"</Text>
          </Animated.View>
        ) : null}

        {/* Message */}
        <Animated.Text style={[styles.message, contentStyle]}>
          {message}
        </Animated.Text>
      </View>

      {/* Continue button */}
      <Animated.View entering={FadeInUp.delay(600).duration(500)} style={styles.bottomSection}>
        <TouchableOpacity style={styles.button} onPress={handleDone} activeOpacity={0.85} accessibilityRole="button" accessibilityLabel="Continue">
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
  infoSection: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  dayNumber: {
    ...Typography.streakDisplay,
    textAlign: 'center',
  },
  dayLabel: {
    ...Typography.bodyLarge,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  saintName: {
    ...Typography.saintName,
    color: Colors.sage,
    textAlign: 'center',
  },
  progressSection: {
    marginBottom: Spacing.lg,
  },
  intentionText: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    fontStyle: 'italic',
    maxWidth: 280,
    marginBottom: Spacing.md,
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
