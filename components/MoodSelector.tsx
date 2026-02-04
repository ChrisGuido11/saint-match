import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  FadeInDown,
} from 'react-native-reanimated';
import { Colors } from '../constants/colors';
import { Typography, FontFamily } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';
import { MOODS } from '../constants/saints';
import { Mood } from '../types';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface MoodButtonProps {
  emoji: string;
  label: string;
  subtitle: string;
  color: string;
  index: number;
  category: 'support' | 'growth';
  onPress: () => void;
}

function MoodButton({ emoji, label, subtitle, color, index, category, onPress }: MoodButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 200 });
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 60).duration(400).springify()}
      style={styles.buttonWrapper}
    >
      <AnimatedTouchable
        style={[
          styles.moodButton,
          animatedStyle,
          { borderLeftColor: color, borderLeftWidth: 4 },
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <View style={styles.emojiContainer}>
          <Text style={styles.moodEmoji}>{emoji}</Text>
          {category === 'growth' && (
            <View style={[styles.growthBadge, { backgroundColor: color }]}>
              <Text style={styles.growthBadgeText}>+</Text>
            </View>
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.moodLabel}>{label}</Text>
          <Text style={styles.moodSubtitle}>{subtitle}</Text>
        </View>
      </AnimatedTouchable>
    </Animated.View>
  );
}

interface MoodSelectorProps {
  onSelect: (mood: Mood) => void;
}

export function MoodSelector({ onSelect }: MoodSelectorProps) {
  const growthMoods = MOODS.filter(m => m.category === 'growth');
  const supportMoods = MOODS.filter(m => m.category === 'support');

  return (
    <View style={styles.container}>
      <Animated.Text
        entering={FadeInDown.duration(500)}
        style={styles.title}
      >
        How would you like to grow today?
      </Animated.Text>
      
      {/* Growth Section - Featured */}
      <Animated.View entering={FadeInDown.delay(100).duration(500)}>
        <Text style={styles.sectionLabel}>✨ Amplify the Good</Text>
        <View style={styles.growthGrid}>
          {growthMoods.map((mood, index) => (
            <MoodButton
              key={mood.id}
              emoji={mood.emoji}
              label={mood.label}
              subtitle={mood.subtitle}
              color={mood.color}
              category={mood.category}
              index={index}
              onPress={() => onSelect(mood.id)}
            />
          ))}
        </View>
      </Animated.View>

      {/* Support Section - Reframed */}
      <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.supportSection}>
        <Text style={styles.sectionLabel}>🌱 Find Your Center</Text>
        <View style={styles.supportGrid}>
          {supportMoods.map((mood, index) => (
            <MoodButton
              key={mood.id}
              emoji={mood.emoji}
              label={mood.label}
              subtitle={mood.subtitle}
              color={mood.color}
              category={mood.category}
              index={index + 3}
              onPress={() => onSelect(mood.id)}
            />
          ))}
        </View>
      </Animated.View>

      {/* Encouragement footer */}
      <Animated.Text
        entering={FadeInDown.delay(500).duration(500)}
        style={styles.footerText}
      >
        Every step, no matter how small, brings you closer to the saint you're meant to be.
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    ...Typography.h2,
    color: Colors.charcoal,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  sectionLabel: {
    ...Typography.label,
    color: Colors.charcoalMuted,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
  },
  growthGrid: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  supportSection: {
    marginTop: Spacing.sm,
  },
  supportGrid: {
    gap: Spacing.sm,
  },
  buttonWrapper: {
    width: '100%',
  },
  moodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.creamDark,
    ...Shadows.card,
  },
  emojiContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  moodEmoji: {
    fontSize: 32,
  },
  growthBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthBadgeText: {
    fontSize: 10,
    color: Colors.white,
    fontFamily: FontFamily.sansBold,
  },
  textContainer: {
    flex: 1,
  },
  moodLabel: {
    ...Typography.button,
    color: Colors.charcoal,
    marginBottom: 2,
  },
  moodSubtitle: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
  },
  footerText: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    marginTop: Spacing.xl,
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
