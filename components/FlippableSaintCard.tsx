import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';
import { Colors } from '../constants/colors';
import { Typography, FontFamily } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';
import { Saint } from '../types';

interface FlippableSaintCardProps {
  saint: Saint;
  count: number;
}

export default function FlippableSaintCard({ saint, count }: FlippableSaintCardProps) {
  const rotation = useSharedValue(0);

  const handleFlip = () => {
    rotation.value = withTiming(rotation.value === 0 ? 180 : 0, { duration: 300 });
  };

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 800 }, { rotateY: `${interpolate(rotation.value, [0, 180], [0, 180])}deg` }],
    backfaceVisibility: 'hidden' as const,
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 800 }, { rotateY: `${interpolate(rotation.value, [0, 180], [180, 360])}deg` }],
    backfaceVisibility: 'hidden' as const,
  }));

  const truncatedBio = saint.bio && saint.bio.length > 80
    ? saint.bio.slice(0, 80).trimEnd() + '…'
    : saint.bio || '';

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handleFlip} style={styles.wrapper}>
      {/* Front face */}
      <Animated.View style={[styles.card, frontStyle]}>
        <View style={styles.initialsCircle}>
          <Text style={styles.initialsText}>{saint.initials}</Text>
        </View>
        <Text style={styles.name} numberOfLines={2}>{saint.name}</Text>
        {count > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        )}
      </Animated.View>

      {/* Back face */}
      <Animated.View style={[styles.card, styles.cardBack, backStyle]}>
        <Text style={styles.feastDay}>{saint.feastDay}</Text>
        <View style={styles.divider} />
        <Text style={styles.bio} numberOfLines={3}>{truncatedBio}</Text>
        <Text style={styles.hint}>tap to flip</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  cardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.creamWarm,
    justifyContent: 'center',
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
  feastDay: {
    fontFamily: FontFamily.serif,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.charcoal,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  divider: {
    width: 24,
    height: 1,
    backgroundColor: Colors.creamDark,
    marginBottom: Spacing.xs,
  },
  bio: {
    ...Typography.caption,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 15,
  },
  hint: {
    fontFamily: FontFamily.sans,
    fontSize: 9,
    color: Colors.charcoalSubtle,
    marginTop: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
