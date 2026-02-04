import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  FadeIn,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '../constants/colors';
import { Typography, FontFamily } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';

interface StreakCounterProps {
  count: number;
  size?: 'compact' | 'large';
  showLabel?: boolean;
  animate?: boolean;
}

// Duolingo-style streak tiers
const STREAK_TIERS = {
  NOVICE: { min: 0, max: 2, emoji: '⚪', color: Colors.charcoalSubtle },
  BEGINNER: { min: 3, max: 6, emoji: '🔥', color: Colors.streak },
  INTERMEDIATE: { min: 7, max: 13, emoji: '🔥', color: '#FF6B35' },
  ADVANCED: { min: 14, max: 29, emoji: '🔥', color: '#E8511B' },
  EXPERT: { min: 30, max: 49, emoji: '👑', color: '#D4A85E' },
  MASTER: { min: 50, max: 99, emoji: '⭐', color: '#FFD700' },
  LEGEND: { min: 100, max: Infinity, emoji: '🏆', color: '#9B59B6' },
};

function getStreakTier(count: number) {
  if (count >= 100) return STREAK_TIERS.LEGEND;
  if (count >= 50) return STREAK_TIERS.MASTER;
  if (count >= 30) return STREAK_TIERS.EXPERT;
  if (count >= 14) return STREAK_TIERS.ADVANCED;
  if (count >= 7) return STREAK_TIERS.INTERMEDIATE;
  if (count >= 3) return STREAK_TIERS.BEGINNER;
  return STREAK_TIERS.NOVICE;
}

function getFireScale(count: number): number {
  if (count >= 100) return 2.2;
  if (count >= 50) return 2.0;
  if (count >= 30) return 1.8;
  if (count >= 14) return 1.5;
  if (count >= 7) return 1.3;
  if (count >= 3) return 1.1;
  return 1.0;
}

function getFireEmoji(count: number): string {
  if (count >= 100) return '🏆';
  if (count >= 50) return '⭐';
  if (count >= 30) return '👑';
  if (count >= 14) return '🔥🔥';
  if (count >= 7) return '🔥';
  if (count > 0) return '🔥';
  return '⚪';
}

// Get encouraging message based on streak
function getStreakMessage(count: number): string {
  if (count === 0) return "Start your journey today!";
  if (count === 1) return "First day! Keep it going!";
  if (count < 3) return "Building momentum!";
  if (count < 7) return `${count} days! You're on fire!`;
  if (count === 7) return "One week! Amazing!";
  if (count < 14) return `${count} days strong!`;
  if (count === 14) return "Two weeks! Incredible!";
  if (count < 30) return `${count} days! You're unstoppable!`;
  if (count === 30) return "One month! You're a legend!";
  if (count < 50) return `${count} days of excellence!`;
  if (count === 50) return "50 days! Absolutely amazing!";
  if (count < 100) return `${count} days! You're extraordinary!`;
  return "100+ days! Living like a saint!";
}

export function StreakCounter({ count, size = 'compact', showLabel = true, animate = true }: StreakCounterProps) {
  const fireScale = useSharedValue(1);
  const glow = useSharedValue(0);
  const numberScale = useSharedValue(0.8);
  const pulse = useSharedValue(1);

  const tier = getStreakTier(count);
  const message = getStreakMessage(count);

  useEffect(() => {
    if (animate) {
      numberScale.value = withSpring(1, { damping: 8, stiffness: 150 });

      // Fire animation for active streaks
      if (count >= 3) {
        fireScale.value = withRepeat(
          withSequence(
            withTiming(1.15, { duration: 800, easing: Easing.inOut(Easing.ease) }),
            withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          true
        );
      }

      // Glow effect for higher streaks
      if (count >= 7) {
        glow.value = withRepeat(
          withSequence(
            withTiming(0.6, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
            withTiming(0, { duration: 1200, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          true
        );
      }

      // Special pulse for milestones
      if (count === 7 || count === 14 || count === 30 || count === 50 || count === 100) {
        pulse.value = withRepeat(
          withSequence(
            withSpring(1.1, { damping: 10 }),
            withSpring(1, { damping: 10 })
          ),
          5,
          true
        );
      }
    }
  }, [count, animate]);

  const fireAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fireScale.value }],
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  const numberAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: numberScale.value }],
  }));

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const isLarge = size === 'large';
  const fireSize = isLarge ? 36 * getFireScale(count) : 22 * getFireScale(count);

  // Special styling for milestones
  const isMilestone = [7, 14, 30, 50, 100].includes(count);

  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      style={[
        styles.container,
        isLarge && styles.containerLarge,
        count >= 7 && styles.containerActive,
        isMilestone && styles.containerMilestone,
      ]}
    >
      {/* Glow effect for high streaks */}
      {count >= 7 && (
        <Animated.View style={[styles.glowOverlay, glowAnimatedStyle, { backgroundColor: tier.color }]} />
      )}
      
      {/* Fire/Streak emoji */}
      <Animated.View style={[pulseAnimatedStyle]}>
        <Animated.Text style={[{ fontSize: fireSize }, fireAnimatedStyle]}>
          {getFireEmoji(count)}
        </Animated.Text>
      </Animated.View>
      
      {/* Number and label */}
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            isLarge ? styles.numberLarge : styles.number,
            count === 0 && styles.numberInactive,
            numberAnimatedStyle,
            isMilestone && styles.numberMilestone,
          ]}
        >
          {count}
        </Animated.Text>
        {showLabel && (
          <Text style={[styles.label, isLarge && styles.labelLarge]}>
            {count === 1 ? 'day' : 'days'}
          </Text>
        )}
      </View>

      {/* Milestone sparkle */}
      {isMilestone && isLarge && (
        <View style={styles.sparkleContainer}>
          <Text style={styles.sparkle}>✨</Text>
        </View>
      )}
    </Animated.View>
  );
}

// Extended streak counter with message - for home screen
interface StreakDisplayProps {
  count: number;
}

export function StreakDisplay({ count }: StreakDisplayProps) {
  const tier = getStreakTier(count);
  const message = getStreakMessage(count);
  const scaleAnim = useSharedValue(1);

  useEffect(() => {
    if (count >= 3) {
      scaleAnim.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1,
        true
      );
    }
  }, [count]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnim.value }],
  }));

  return (
    <Animated.View style={[styles.displayContainer, animatedStyle]}>
      <View style={[styles.iconContainer, { backgroundColor: tier.color + '20' }]}>
        <Text style={styles.displayIcon}>{tier.emoji}</Text>
      </View>
      <View style={styles.displayTextContainer}>
        <Text style={[styles.displayCount, { color: tier.color }]}>
          {count} {count === 1 ? 'Day' : 'Days'}
        </Text>
        <Text style={styles.displayMessage}>{message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
    borderColor: Colors.creamDark,
    ...Shadows.subtle,
  },
  containerLarge: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    gap: Spacing.md,
  },
  containerActive: {
    borderColor: Colors.streak,
    backgroundColor: 'rgba(232, 133, 62, 0.08)',
  },
  containerMilestone: {
    borderWidth: 2,
    borderColor: Colors.streak,
  },
  glowOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.round,
    opacity: 0.3,
  },
  textContainer: {
    alignItems: 'center',
  },
  number: {
    fontFamily: FontFamily.sansBold,
    fontSize: 20,
    color: Colors.charcoal,
    lineHeight: 24,
  },
  numberLarge: {
    ...Typography.streakNumber,
    color: Colors.charcoal,
  },
  numberInactive: {
    color: Colors.charcoalSubtle,
  },
  numberMilestone: {
    color: Colors.streak,
  },
  label: {
    ...Typography.caption,
    color: Colors.charcoalMuted,
    marginTop: -2,
  },
  labelLarge: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
  },
  sparkleContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  sparkle: {
    fontSize: 16,
  },
  // StreakDisplay styles
  displayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.creamDark,
    ...Shadows.card,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  displayIcon: {
    fontSize: 24,
  },
  displayTextContainer: {
    flex: 1,
  },
  displayCount: {
    ...Typography.h3,
    fontFamily: FontFamily.sansBold,
  },
  displayMessage: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
    marginTop: 2,
  },
});
