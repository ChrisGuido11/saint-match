import React, { useEffect } from 'react';
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
}

function getFireScale(count: number): number {
  if (count >= 30) return 2.0;
  if (count >= 14) return 1.5;
  if (count >= 7) return 1.2;
  return 1.0;
}

function getFireEmoji(count: number): string {
  if (count >= 30) return '\u{1F525}\u{1F525}\u{1F525}';
  if (count >= 14) return '\u{1F525}\u{1F525}';
  if (count >= 7) return '\u{1F525}';
  if (count > 0) return '\u{1F525}';
  return '\u{26AA}';
}

export function StreakCounter({ count, size = 'compact', showLabel = true }: StreakCounterProps) {
  const fireScale = useSharedValue(1);
  const glow = useSharedValue(0);
  const numberScale = useSharedValue(0.8);

  useEffect(() => {
    numberScale.value = withSpring(1, { damping: 8, stiffness: 150 });

    if (count >= 7) {
      fireScale.value = withRepeat(
        withSequence(
          withTiming(1.15, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    }

    if (count >= 30) {
      glow.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 1200, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    }
  }, [count]);

  const fireAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fireScale.value }],
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: glow.value * 0.3,
  }));

  const numberAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: numberScale.value }],
  }));

  const isLarge = size === 'large';
  const fireSize = isLarge ? 36 * getFireScale(count) : 22 * getFireScale(count);

  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      style={[
        styles.container,
        isLarge && styles.containerLarge,
        count >= 7 && styles.containerActive,
      ]}
    >
      {count >= 30 && (
        <Animated.View style={[styles.glowOverlay, glowAnimatedStyle]} />
      )}
      <Animated.Text style={[{ fontSize: fireSize }, fireAnimatedStyle]}>
        {getFireEmoji(count)}
      </Animated.Text>
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            isLarge ? styles.numberLarge : styles.number,
            count === 0 && styles.numberInactive,
            numberAnimatedStyle,
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.xl,
    gap: Spacing.sm,
  },
  containerActive: {
    borderColor: Colors.terracottaMuted,
    backgroundColor: 'rgba(212, 115, 94, 0.04)',
  },
  glowOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.terracottaGlow,
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
  label: {
    ...Typography.caption,
    color: Colors.charcoalMuted,
    marginTop: -2,
  },
  labelLarge: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
  },
});
