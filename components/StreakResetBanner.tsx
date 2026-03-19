import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors } from '../constants/colors';
import { Typography, FontFamily } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';
import { StreakResetInfo } from '../types';
import { hapticNotification } from '../lib/haptics';
import * as Haptics from 'expo-haptics';
import { IconFire } from './icons';

interface StreakResetBannerProps {
  resetInfo: StreakResetInfo;
  freezeAvailable: boolean;
  onUseFreeze: () => Promise<boolean>;
  onDismiss: () => void;
}

export function StreakResetBanner({ resetInfo, freezeAvailable, onUseFreeze, onDismiss }: StreakResetBannerProps) {
  const [isFreezing, setIsFreezing] = useState(false);

  useEffect(() => {
    hapticNotification(Haptics.NotificationFeedbackType.Warning);
  }, []);

  const handleFreeze = async () => {
    if (isFreezing) return;
    setIsFreezing(true);
    try {
      const success = await onUseFreeze();
      if (success) {
        hapticNotification(Haptics.NotificationFeedbackType.Success);
      }
    } catch {
      setIsFreezing(false);
    }
  };

  return (
    <Animated.View entering={FadeInDown.duration(500)} style={styles.container}>
      <View style={styles.iconRow}>
        <IconFire size={20} color={Colors.warning} />
        <Text style={styles.title}>
          Your {resetInfo.previousStreak}-day streak was reset
        </Text>
      </View>
      <Text style={styles.message}>
        You missed {resetInfo.daysMissed} {resetInfo.daysMissed === 1 ? 'day' : 'days'}.{' '}
        {freezeAvailable
          ? 'Use your weekly streak freeze to restore it!'
          : 'Start fresh — every saint was once a beginner.'}
      </Text>

      <View style={styles.actions}>
        {freezeAvailable && (
          <Pressable
            style={[styles.freezeButton, isFreezing && styles.freezeButtonDisabled]}
            onPress={handleFreeze}
            disabled={isFreezing}
          >
            {isFreezing ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Text style={styles.freezeButtonText}>Use Streak Freeze</Text>
            )}
          </Pressable>
        )}
        <Pressable onPress={onDismiss} hitSlop={8}>
          <Text style={styles.dismissText}>Got it</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: Colors.warning,
    ...Shadows.card,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  title: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.charcoal,
  },
  message: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
    marginBottom: Spacing.md,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  freezeButton: {
    backgroundColor: Colors.terracotta,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    minWidth: 160,
    alignItems: 'center',
  },
  freezeButtonDisabled: {
    opacity: 0.7,
  },
  freezeButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
  dismissText: {
    ...Typography.buttonSmall,
    color: Colors.charcoalMuted,
  },
});
