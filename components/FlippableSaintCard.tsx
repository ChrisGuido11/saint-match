import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Modal, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS, interpolate } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { hapticImpact, ImpactFeedbackStyle } from '@/lib/haptics';
import { Colors } from '../constants/colors';
import { Typography, FontFamily } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';
import { Springs, Durations } from '../constants/animations';
import { Saint } from '../types';

interface FlippableSaintCardProps {
  saint: Saint;
  count: number;
}

export default function FlippableSaintCard({ saint, count }: FlippableSaintCardProps) {
  const [expanded, setExpanded] = useState(false);
  const flipProgress = useSharedValue(0);

  const openCard = () => {
    setExpanded(true);
    hapticImpact(ImpactFeedbackStyle.Light);
    flipProgress.value = withSpring(1, Springs.cardEntrance);
  };

  const closeCard = () => {
    flipProgress.value = withTiming(0, { duration: Durations.fast }, (finished) => {
      if (finished) {
        runOnJS(setExpanded)(false);
      }
    });
  };

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(flipProgress.value, [0, 1], [0, 1]),
  }));

  const expandedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(flipProgress.value, [0, 1], [0.85, 1]) },
    ],
    opacity: flipProgress.value,
  }));

  return (
    <>
      {/* Grid card (front face) */}
      <TouchableOpacity activeOpacity={0.9} onPress={openCard} style={styles.wrapper}>
        <View style={styles.card}>
          <View style={styles.initialsCircle}>
            <Text style={styles.initialsText}>{saint.initials}</Text>
          </View>
          <Text style={styles.name} numberOfLines={2}>{saint.name}</Text>
          {count > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{count}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Expanded modal overlay */}
      <Modal visible={expanded} transparent animationType="none">
        <Animated.View style={[styles.overlay, overlayStyle]}>
          <Pressable style={styles.backdrop} onPress={closeCard} />
          <Animated.View style={[styles.expandedCard, expandedCardStyle]}>
            {/* Avatar */}
            <LinearGradient
              colors={[Colors.sage, Colors.sageDark]}
              style={styles.expandedAvatar}
            >
              <Text style={styles.expandedAvatarText}>{saint.initials}</Text>
            </LinearGradient>

            {/* Saint name */}
            <Text style={styles.expandedName}>{saint.name}</Text>

            {/* Feast day */}
            <Text style={styles.expandedFeastDay}>{saint.feastDay}</Text>

            {/* Divider */}
            <View style={styles.expandedDivider} />

            {/* Bio */}
            <Text style={styles.expandedBio}>{saint.bio}</Text>

            {/* Virtues */}
            {saint.virtues && saint.virtues.length > 0 && (
              <View style={styles.virtuesContainer}>
                {saint.virtues.map((virtue) => (
                  <View key={virtue} style={styles.virtueTag}>
                    <Text style={styles.virtueText}>{virtue}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Completion count */}
            {count > 0 && (
              <Text style={styles.completionText}>
                {count} {count === 1 ? 'challenge' : 'challenges'} completed
              </Text>
            )}
          </Animated.View>
        </Animated.View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  // Grid card styles (unchanged)
  wrapper: {
    width: '30%',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    alignItems: 'center',
    ...Shadows.card,
  },
  initialsCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.sageMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  initialsText: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 16,
    color: Colors.sage,
  },
  name: {
    ...Typography.caption,
    color: Colors.charcoal,
    textAlign: 'center',
    fontFamily: FontFamily.sansMedium,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.round,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    fontFamily: FontFamily.sansBold,
    fontSize: 11,
    color: Colors.white,
  },

  // Modal overlay
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },

  // Expanded card
  expandedCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    maxWidth: 320,
    width: '85%',
  },
  expandedAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  expandedAvatarText: {
    fontFamily: FontFamily.serifBold,
    fontSize: 20,
    color: Colors.white,
    letterSpacing: 1,
  },
  expandedName: {
    ...Typography.saintName,
    color: Colors.charcoal,
    textAlign: 'center',
  },
  expandedFeastDay: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
    marginTop: Spacing.xxs,
  },
  expandedDivider: {
    width: 40,
    height: 1,
    backgroundColor: Colors.creamDark,
    marginVertical: Spacing.md,
  },
  expandedBio: {
    ...Typography.body,
    color: Colors.charcoalLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  virtuesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.md,
  },
  virtueTag: {
    backgroundColor: Colors.sageMuted,
    borderRadius: BorderRadius.round,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
  },
  virtueText: {
    ...Typography.caption,
    color: Colors.sage,
    fontFamily: FontFamily.sansMedium,
  },
  completionText: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
    marginTop: Spacing.md,
  },
});
