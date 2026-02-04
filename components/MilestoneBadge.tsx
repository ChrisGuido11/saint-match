import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  withRepeat,
  FadeIn,
  FadeInUp,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors } from '../constants/colors';
import { Typography, FontFamily } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';
import { MILESTONES, getMilestoneForStreak } from '../constants/saints';

interface MilestoneBadgeProps {
  streakCount: number;
  isNewMilestone?: boolean;
}

export function MilestoneBadge({ streakCount, isNewMilestone = false }: MilestoneBadgeProps) {
  const badgeScale = useSharedValue(0);
  const glowOpacity = useSharedValue(0);
  const floatY = useSharedValue(0);

  const milestone = getMilestoneForStreak(streakCount);

  useEffect(() => {
    if (isNewMilestone) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Badge pop animation
      badgeScale.value = withDelay(
        300,
        withSequence(
          withSpring(1.3, { damping: 8, stiffness: 200 }),
          withSpring(1, { damping: 12, stiffness: 150 })
        )
      );

      // Glow pulse
      glowOpacity.value = withDelay(
        500,
        withRepeat(
          withSequence(
            withSpring(0.6, { damping: 10 }),
            withSpring(0, { damping: 10 })
          ),
          3,
          true
        )
      );

      // Floating animation
      floatY.value = withDelay(
        800,
        withRepeat(
          withSequence(
            withSpring(-5, { damping: 15 }),
            withSpring(5, { damping: 15 })
          ),
          -1,
          true
        )
      );
    } else {
      badgeScale.value = withSpring(1);
    }
  }, [isNewMilestone]);

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: badgeScale.value },
      { translateY: floatY.value },
    ],
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  if (!milestone) return null;

  return (
    <Animated.View entering={FadeIn.delay(200)} style={styles.container}>
      <Animated.View style={[styles.glowRing, glowAnimatedStyle]} />
      <Animated.View 
        style={[
          styles.badge,
          badgeAnimatedStyle,
          { backgroundColor: milestone.color },
        ]}
      >
        <Text style={styles.badgeEmoji}>{milestone.emoji}</Text>
      </Animated.View>
      <Animated.Text entering={FadeInUp.delay(600)} style={styles.badgeTitle}>
        {milestone.title}
      </Animated.Text>
      <Animated.Text entering={FadeInUp.delay(700)} style={styles.badgeDescription}>
        {milestone.description}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  glowRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.streakGlow,
  },
  badge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.card,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  badgeEmoji: {
    fontSize: 45,
  },
  badgeTitle: {
    ...Typography.h3,
    color: Colors.charcoal,
    marginTop: Spacing.md,
  },
  badgeDescription: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    marginTop: Spacing.xs,
    maxWidth: 250,
  },
});
