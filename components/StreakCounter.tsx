import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
} from 'react-native-reanimated';
import { Colors } from '../constants/colors';
import { Typography, FontFamily } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';
import { Springs } from '../constants/animations';
import { IconFire, IconTrophy, IconSparkle } from './icons';

interface StreakCounterProps {
  count: number;
  size?: 'compact' | 'large';
  showLabel?: boolean;
}

function StreakIcon({ count, size }: { count: number; size: number }) {
  if (count >= 100) return <IconTrophy size={size} color={Colors.terracotta} />;
  if (count >= 30) return <IconFire size={size} color={Colors.terracotta} />;
  if (count >= 7) return <IconSparkle size={size} color={Colors.terracotta} />;
  if (count > 0) return <IconFire size={size} color={Colors.charcoalSubtle} />;
  return null;
}

export function StreakCounter({ count, size = 'compact', showLabel = true }: StreakCounterProps) {
  const scale = useSharedValue(0.9);

  useEffect(() => {
    scale.value = withSpring(1, Springs.buttonRelease);
  }, [count]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isLarge = size === 'large';
  const iconSize = isLarge ? 20 : 14;

  if (count === 0) {
    return (
      <Animated.View entering={FadeIn} style={[styles.container, isLarge && styles.large]}>
        <Text style={[styles.number, isLarge && styles.numberLarge, styles.inactive]}>0</Text>
        {showLabel && <Text style={styles.label}>days</Text>}
      </Animated.View>
    );
  }

  return (
    <Animated.View
      entering={FadeIn}
      style={[
        styles.container,
        isLarge && styles.large,
        count >= 7 && styles.active,
        animatedStyle,
      ]}
      accessibilityLabel={`${count} day streak`}
    >
      <StreakIcon count={count} size={iconSize} />
      <Text style={[styles.number, isLarge && styles.numberLarge]}>{count}</Text>
      {showLabel && <Text style={styles.label}>{count === 1 ? 'day' : 'days'}</Text>}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.round,
    ...Shadows.subtle,
  },
  large: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
  },
  active: {
    backgroundColor: Colors.terracottaMuted,
  },
  number: {
    fontFamily: FontFamily.sansBold,
    fontSize: 18,
    color: Colors.charcoal,
  },
  numberLarge: {
    fontSize: 32,
  },
  inactive: {
    color: Colors.charcoalSubtle,
  },
  label: {
    ...Typography.caption,
    color: Colors.charcoalMuted,
  },
});
