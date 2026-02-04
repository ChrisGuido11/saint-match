import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';
import { Typography, FontFamily } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';
import { Saint, MicroAction } from '../types';

interface SaintCardProps {
  saint: Saint;
  microAction?: MicroAction;
  compact?: boolean;
}

export function SaintCard({ saint, microAction, compact }: SaintCardProps) {
  return (
    <Animated.View
      entering={FadeInUp.duration(600).springify()}
      style={[styles.card, compact && styles.cardCompact]}
    >
      {/* Saint avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarOuter}>
          <LinearGradient
            colors={[Colors.sage, Colors.sageDark]}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>{saint.initials}</Text>
          </LinearGradient>
        </View>
        <View style={styles.haloRing} />
      </View>

      {/* Saint info */}
      <Animated.Text
        entering={FadeInDown.delay(200).duration(400)}
        style={styles.saintName}
      >
        {saint.name}
      </Animated.Text>

      <Animated.Text
        entering={FadeInDown.delay(300).duration(400)}
        style={styles.feastDay}
      >
        Feast Day: {saint.feastDay}
      </Animated.Text>

      {!compact && (
        <>
          <Animated.View
            entering={FadeInDown.delay(350).duration(400)}
            style={styles.divider}
          />

          <Animated.Text
            entering={FadeInDown.delay(400).duration(400)}
            style={styles.bio}
          >
            {saint.bio}
          </Animated.Text>
        </>
      )}

      {/* Virtues tags */}
      <Animated.View
        entering={FadeInDown.delay(450).duration(400)}
        style={styles.virtuesRow}
      >
        {saint.virtues.map((virtue) => (
          <View key={virtue} style={styles.virtueTag}>
            <Text style={styles.virtueText}>{virtue}</Text>
          </View>
        ))}
      </Animated.View>

      {/* Micro action */}
      {microAction && !compact && (
        <Animated.View
          entering={FadeInDown.delay(500).duration(500)}
          style={styles.actionCard}
        >
          <Text style={styles.actionLabel}>TODAY'S CHALLENGE</Text>
          <Text style={styles.actionText}>{microAction.actionText}</Text>
          <View style={styles.actionMeta}>
            <Text style={styles.actionTime}>
              {'\u{23F1}\u{FE0F}'} ~{microAction.estimatedMinutes} min
            </Text>
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.creamDark,
    ...Shadows.card,
  },
  cardCompact: {
    padding: Spacing.md,
  },
  avatarSection: {
    marginBottom: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarOuter: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: Colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: FontFamily.serifBold,
    fontSize: 28,
    color: Colors.white,
    letterSpacing: 1,
  },
  haloRing: {
    position: 'absolute',
    top: -6,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.sageMuted,
    borderStyle: 'dashed',
  },
  saintName: {
    ...Typography.saintName,
    color: Colors.charcoal,
    textAlign: 'center',
  },
  feastDay: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
    marginTop: Spacing.xxs,
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: Colors.creamDark,
    marginVertical: Spacing.md,
  },
  bio: {
    ...Typography.body,
    color: Colors.charcoalLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  virtuesRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: Spacing.md,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  virtueTag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    backgroundColor: Colors.sageMuted,
    borderRadius: BorderRadius.round,
  },
  virtueText: {
    ...Typography.caption,
    color: Colors.sageDark,
    fontFamily: FontFamily.sansMedium,
    textTransform: 'capitalize',
  },
  actionCard: {
    width: '100%',
    marginTop: Spacing.lg,
    backgroundColor: Colors.creamWarm,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.creamDark,
  },
  actionLabel: {
    ...Typography.label,
    color: Colors.terracotta,
    marginBottom: Spacing.xs,
  },
  actionText: {
    ...Typography.bodyLarge,
    color: Colors.charcoal,
    lineHeight: 26,
  },
  actionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  actionTime: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
  },
});
