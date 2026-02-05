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

interface StreakCounterProps {
  count: number;
  size?: 'compact' | 'large';
  showLabel?: boolean;
}

function getStreakEmoji(count: number): string {
  if (count >= 100) return '🏆';
  if (count >= 30) return '🔥';
  if (count >= 7) return '✨';
  if (count > 0) return '·'; // Simple dot for low streaks
  return '';
}

export function StreakCounter({ count, size = 'compact', showLabel = true }: StreakCounterProps) {
  const scale = useSharedValue(0.9);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12 });
  }, [count]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isLarge = size === 'large';
  const emoji = getStreakEmoji(count);

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
    >
      {emoji && <Text style={[styles.emoji, isLarge && styles.emojiLarge]}>{emoji}</Text>}
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
  emoji: {
    fontSize: 14,
  },
  emojiLarge: {
    fontSize: 20,
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
