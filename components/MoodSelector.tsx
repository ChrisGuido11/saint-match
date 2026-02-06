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
import { Colors, MoodColors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';
import { Springs } from '../constants/animations';
import { MOODS } from '../constants/saints';
import { Mood } from '../types';
import { 
  IconPeace, 
  IconFocus, 
  IconGrow, 
  IconGrateful, 
  IconJoy, 
  IconServe 
} from './icons';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// Map mood IDs to icon components
const moodIcons: Record<Mood, React.FC<{ size?: number; color?: string }>> = {
  'seeking-peace': IconPeace,
  'need-focus': IconFocus,
  'want-to-grow': IconGrow,
  'feeling-grateful': IconGrateful,
  'full-of-joy': IconJoy,
  'ready-to-serve': IconServe,
};

// Map mood IDs to their accent colors for icon tinting
const moodAccentColors: Record<Mood, { icon: string; bg: string }> = {
  'seeking-peace': { icon: MoodColors.peace, bg: 'rgba(139, 168, 160, 0.12)' },
  'need-focus': { icon: MoodColors.focus, bg: 'rgba(123, 143, 163, 0.12)' },
  'want-to-grow': { icon: MoodColors.grow, bg: 'rgba(158, 139, 131, 0.12)' },
  'feeling-grateful': { icon: MoodColors.grateful, bg: 'rgba(196, 154, 108, 0.12)' },
  'full-of-joy': { icon: MoodColors.joy, bg: 'rgba(212, 168, 94, 0.12)' },
  'ready-to-serve': { icon: MoodColors.serve, bg: 'rgba(139, 157, 131, 0.12)' },
};

interface MoodButtonProps {
  mood: Mood;
  label: string;
  subtitle: string;
  index: number;
  onPress: () => void;
}

function MoodButton({ mood, label, subtitle, index, onPress }: MoodButtonProps) {
  const scale = useSharedValue(1);
  const IconComponent = moodIcons[mood];
  const { icon: accentColor, bg: accentBg } = moodAccentColors[mood];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, Springs.buttonPress);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, Springs.buttonRelease);
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
        accessibilityRole="button"
        accessibilityLabel={`${label} — ${subtitle}`}
      >
        <View style={[styles.iconContainer, { backgroundColor: accentBg }]}>
          <IconComponent size={28} color={accentColor} />
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
            mood={mood.id}
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
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
