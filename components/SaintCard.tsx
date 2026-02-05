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
      {/* Avatar */}
      <View style={styles.avatarSection}>
        <LinearGradient
          colors={[Colors.sage, Colors.sageDark]}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>{saint.initials}</Text>
        </LinearGradient>
      </View>

      {/* Saint Name */}
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
        {saint.feastDay}
      </Animated.Text>

      {/* Bio */}
      {!compact && (
        <Animated.Text
          entering={FadeInDown.delay(400).duration(400)}
          style={styles.bio}
        >
          {saint.bio}
        </Animated.Text>
      )}

      {/* Challenge */}
      {microAction && !compact && (
        <Animated.View
          entering={FadeInDown.delay(500).duration(500)}
          style={styles.challengeCard}
        >
          <Text style={styles.challengeText}>{microAction.actionText}</Text>
          <Text style={styles.challengeTime}>~{microAction.estimatedMinutes} min</Text>
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
    ...Shadows.card,
  },
  cardCompact: {
    padding: Spacing.md,
  },
  avatarSection: {
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: FontFamily.serifBold,
    fontSize: 24,
    color: Colors.white,
    letterSpacing: 1,
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
  bio: {
    ...Typography.body,
    color: Colors.charcoalLight,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: Spacing.md,
  },
  challengeCard: {
    width: '100%',
    marginTop: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: Colors.creamWarm,
    borderRadius: BorderRadius.md,
  },
  challengeText: {
    ...Typography.bodyLarge,
    color: Colors.charcoal,
    lineHeight: 26,
  },
  challengeTime: {
    ...Typography.caption,
    color: Colors.charcoalMuted,
    marginTop: Spacing.sm,
  },
});
