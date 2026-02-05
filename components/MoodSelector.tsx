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
import { Typography } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';
import { MOODS } from '../constants/saints';
import { Mood } from '../types';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface MoodButtonProps {
  emoji: string;
  label: string;
  subtitle: string;
  index: number;
  onPress: () => void;
}

function MoodButton({ emoji, label, subtitle, index, onPress }: MoodButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
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
      entering={FadeInDown.delay(index * 50).duration(400).springify()}
      style={styles.buttonWrapper}
    >
      <AnimatedTouchable
        style={[styles.moodButton, animatedStyle]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <View style={styles.emojiContainer}>
          <Text style={styles.moodEmoji}>{emoji}</Text>
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
  return (
    <View style={styles.container}>
      <Animated.Text
        entering={FadeInDown.duration(500)}
        style={styles.title}
      >
        How would you like to grow today?
      </Animated.Text>
      
      <View style={styles.moodList}>
        {MOODS.map((mood, index) => (
          <MoodButton
            key={mood.id}
            emoji={mood.emoji}
            label={mood.label}
            subtitle={mood.subtitle}
            index={index}
            onPress={() => onSelect(mood.id)}
          />
        ))}
      </View>
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
  moodList: {
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
    ...Shadows.card,
  },
  emojiContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  moodEmoji: {
    fontSize: 24,
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
});
