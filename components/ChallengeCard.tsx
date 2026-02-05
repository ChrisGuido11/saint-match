import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInUp,
} from 'react-native-reanimated';
import { Colors } from '../constants/colors';
import { Typography, FontFamily } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';
import { ActiveChallenge } from '../types';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ChallengeCardProps {
  challenge: ActiveChallenge;
  onComplete: () => void;
}

export function ChallengeCard({ challenge, onComplete }: ChallengeCardProps) {
  const buttonScale = useSharedValue(1);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.96, { damping: 15 });
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1, { damping: 10 });
  };

  const handleComplete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onComplete();
  };

  const { saint, microAction } = challenge.match;

  return (
    <Animated.View entering={FadeInUp.duration(500).springify()} style={styles.card}>
      {/* Saint Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{saint.initials}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.saintName}>{saint.name}</Text>
          <Text style={styles.feastDay}>{saint.feastDay}</Text>
        </View>
      </View>

      {/* Challenge */}
      <View style={styles.challengeBox}>
        <Text style={styles.challengeText}>{microAction.actionText}</Text>
        <Text style={styles.challengeTime}>~{microAction.estimatedMinutes} minutes</Text>
      </View>

      {/* Complete Button */}
      {!challenge.completed ? (
        <AnimatedTouchable
          style={[styles.button, buttonAnimatedStyle]}
          onPress={handleComplete}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          <Text style={styles.buttonText}>I Did It!</Text>
        </AnimatedTouchable>
      ) : (
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>Completed today</Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: FontFamily.serifBold,
    fontSize: 16,
    color: Colors.white,
  },
  headerText: {
    flex: 1,
  },
  saintName: {
    ...Typography.h3,
    color: Colors.charcoal,
    fontSize: 18,
  },
  feastDay: {
    ...Typography.caption,
    color: Colors.charcoalMuted,
  },
  challengeBox: {
    backgroundColor: Colors.creamWarm,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
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
  button: {
    width: '100%',
    paddingVertical: Spacing.md,
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.button,
  },
  buttonText: {
    ...Typography.button,
    color: Colors.white,
    fontSize: 17,
  },
  completedBadge: {
    width: '100%',
    paddingVertical: Spacing.md,
    backgroundColor: Colors.sageMuted,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  completedText: {
    ...Typography.button,
    color: Colors.sageDark,
  },
});
