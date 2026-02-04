import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, {
  FadeIn,
  FadeInUp,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Typography, FontFamily } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { ConfettiAnimation } from '../../components/ConfettiAnimation';
import { StreakCounter } from '../../components/StreakCounter';
import { MilestoneBadge } from '../../components/MilestoneBadge';
import { isMilestoneStreak, getMilestoneForStreak } from '../../constants/saints';

const CELEBRATION_MESSAGES = [
  "You're building something beautiful!",
  "The saints are cheering for you!",
  "Every small step is holy work!",
  "Your consistency inspires!",
  "Virtue is becoming your habit!",
  "You're growing closer to God!",
  "This is what transformation looks like!",
  "Keep shining your light!",
];

const DUO_MESSAGES: Record<number, string> = {
  1: "First day down! The journey of a thousand miles begins with a single step.",
  2: "Two days! You're building momentum now.",
  3: "3-day streak! You're on fire! 🔥",
  7: "One week! You are becoming the person you want to be.",
  14: "Two weeks strong! This is who you are now.",
  21: "Three weeks! Your dedication is inspiring.",
  30: "A whole month! You're unstoppable! 🏆",
  50: "50 days! You're a saint in training! 👑",
  100: "100 days! You are truly living like a saint! 🌟",
};

export default function CelebrationScreen() {
  const { streakCount } = useLocalSearchParams<{ streakCount: string }>();
  const count = parseInt(streakCount ?? '0', 10);
  const [showConfetti, setShowConfetti] = useState(true);
  const [message] = useState(() => 
    DUO_MESSAGES[count] || CELEBRATION_MESSAGES[Math.floor(Math.random() * CELEBRATION_MESSAGES.length)]
  );
  
  const isMilestone = isMilestoneStreak(count);
  const milestone = getMilestoneForStreak(count);

  // Animation values
  const titleScale = useSharedValue(0);
  const emojiScale = useSharedValue(0);
  const cardY = useSharedValue(50);

  useEffect(() => {
    // Success haptic
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Emoji bounce
    emojiScale.value = withDelay(
      200,
      withSequence(
        withSpring(1.3, { damping: 6, stiffness: 200 }),
        withSpring(1, { damping: 10 })
      )
    );

    // Title animation
    titleScale.value = withDelay(
      500,
      withSpring(1, { damping: 8, stiffness: 120 })
    );

    // Card slide up
    cardY.value = withDelay(
      300,
      withSpring(0, { damping: 12, stiffness: 100 })
    );
  }, []);

  const emojiStyle = useAnimatedStyle(() => ({
    transform: [{ scale: emojiScale.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: titleScale.value }],
    opacity: titleScale.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cardY.value }],
    opacity: withTiming(cardY.value === 0 ? 1 : 0, { duration: 300 }),
  }));

  const handleDone = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace('/(auth)/(tabs)');
  };

  const handleShare = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Share.share({
        message: `I'm on a ${count}-day streak growing in virtue with Saint Match! 🙏✨ Join me on this journey!`,
        title: 'My Saint Match Streak!',
      });
    } catch (error) {
      // Silent fail
    }
  }, [count]);

  return (
    <View style={styles.container}>
      {showConfetti && <ConfettiAnimation count={80} onFinish={() => setShowConfetti(false)} />}

      <View style={styles.content}>
        {/* Main celebration emoji */}
        <Animated.Text style={[styles.celebrationEmoji, emojiStyle]}>
          {isMilestone ? milestone?.emoji : '🎉'}
        </Animated.Text>

        {/* Title */}
        <Animated.Text style={[styles.title, titleStyle]}>
          {isMilestone ? 'Milestone Reached!' : 'Challenge Complete!'}
        </Animated.Text>

        {/* Milestone Badge (if applicable) */}
        {isMilestone && milestone && (
          <MilestoneBadge streakCount={count} isNewMilestone={true} />
        )}

        {/* Streak Counter */}
        <Animated.View entering={FadeInUp.delay(600).duration(500)}>
          <StreakCounter count={count} size="large" />
        </Animated.View>

        {/* Personalized message */}
        <Animated.Text
          entering={FadeInUp.delay(800).duration(500)}
          style={styles.message}
        >
          {message}
        </Animated.Text>

        {/* Encouragement card */}
        <Animated.View 
          entering={FadeInDown.delay(1000).duration(500)}
          style={[styles.encouragementCard, cardStyle]}
        >
          <Text style={styles.encouragementEmoji}>💡</Text>
          <Text style={styles.encouragementText}>
            {getEncouragementText(count)}
          </Text>
        </Animated.View>
      </View>

      {/* Bottom buttons */}
      <Animated.View entering={FadeIn.delay(1200).duration(500)} style={styles.bottomSection}>
        {isMilestone && (
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
            activeOpacity={0.85}
          >
            <Text style={styles.shareButtonText}>Share My Progress 📤</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={styles.doneButton}
          onPress={handleDone}
          activeOpacity={0.85}
        >
          <Text style={styles.doneButtonText}>
            {isMilestone ? 'Keep Going! →' : 'Back to Home'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

function getEncouragementText(streak: number): string {
  if (streak === 1) return "Tomorrow, come back to start your streak!";
  if (streak < 3) return "You're building momentum. Don't break the chain!";
  if (streak < 7) return "A week is within reach. Keep showing up!";
  if (streak < 14) return "You're creating real change. Be proud!";
  if (streak < 30) return "This is who you are now. A person of virtue.";
  return "You inspire us all. Keep being extraordinary!";
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  celebrationEmoji: {
    fontSize: 80,
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.heroTitle,
    color: Colors.charcoal,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  message: {
    ...Typography.bodyLarge,
    color: Colors.charcoalLight,
    textAlign: 'center',
    marginTop: Spacing.xl,
    lineHeight: 26,
    maxWidth: 300,
  },
  encouragementCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginTop: Spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.sageMuted,
    ...Shadows.card,
    maxWidth: 300,
  },
  encouragementEmoji: {
    fontSize: 28,
    marginBottom: Spacing.sm,
  },
  encouragementText: {
    ...Typography.body,
    color: Colors.charcoalLight,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  bottomSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 50,
    gap: Spacing.sm,
  },
  shareButton: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.sage,
    ...Shadows.subtle,
  },
  shareButtonText: {
    ...Typography.button,
    color: Colors.sage,
    fontSize: 16,
  },
  doneButton: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: Colors.sage,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.card,
  },
  doneButtonText: {
    ...Typography.button,
    color: Colors.white,
    fontSize: 17,
  },
});
