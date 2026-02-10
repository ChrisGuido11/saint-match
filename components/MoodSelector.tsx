import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
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
  IconServe,
  IconHeart,
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

const MAX_CHARS = 120;
const MIN_CHARS = 10;

interface MoodSelectorProps {
  onSelect: (mood: Mood) => void;
  onCustomSubmit: (text: string) => void;
}

export function MoodSelector({ onSelect, onCustomSubmit }: MoodSelectorProps) {
  const [customOpen, setCustomOpen] = useState(false);
  const [customText, setCustomText] = useState('');
  const customScale = useSharedValue(1);

  const customAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: customScale.value }],
  }));

  const handlePresetSelect = (mood: Mood) => {
    setCustomOpen(false);
    setCustomText('');
    onSelect(mood);
  };

  const handleCustomPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCustomOpen(!customOpen);
  };

  const handleCustomSubmit = () => {
    const trimmed = customText.trim();
    if (trimmed.length >= MIN_CHARS) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onCustomSubmit(trimmed);
    }
  };

  const canSubmit = customText.trim().length >= MIN_CHARS;
  const charCount = customText.length;

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
            onPress={() => handlePresetSelect(mood.id)}
          />
        ))}

        {/* 7th option: Custom mood */}
        <Animated.View
          entering={FadeInDown.delay(MOODS.length * 50).duration(400).springify()}
          style={styles.buttonWrapper}
        >
          <AnimatedTouchable
            style={[styles.moodButton, customOpen && styles.moodButtonActive, customAnimatedStyle]}
            onPress={handleCustomPress}
            onPressIn={() => { customScale.value = withSpring(0.96, Springs.buttonPress); }}
            onPressOut={() => { customScale.value = withSpring(1, Springs.buttonRelease); }}
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityLabel="What's on Your Heart? Tell us in your own words"
          >
            <View style={[styles.iconContainer, { backgroundColor: Colors.terracottaMuted }]}>
              <IconHeart size={28} color={Colors.terracotta} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.moodLabel}>What's on Your Heart?</Text>
              <Text style={styles.moodSubtitle}>Tell us in your own words</Text>
            </View>
          </AnimatedTouchable>
        </Animated.View>

        {/* Expandable custom input */}
        {customOpen && (
          <Animated.View
            entering={FadeInDown.duration(300).springify()}
            style={styles.customInputSection}
          >
            <Text style={styles.helperText}>Describe briefly how you're feeling</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                value={customText}
                onChangeText={setCustomText}
                placeholder="e.g. Stressed about a big decision..."
                placeholderTextColor={Colors.charcoalSubtle}
                maxLength={MAX_CHARS}
                multiline
                textAlignVertical="top"
                autoFocus
              />
              <Text
                style={[
                  styles.charCounter,
                  charCount > 100 && styles.charCounterWarn,
                ]}
              >
                {charCount}/{MAX_CHARS}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
              onPress={handleCustomSubmit}
              disabled={!canSubmit}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Find My Saint"
            >
              <Text style={[styles.submitButtonText, !canSubmit && styles.submitButtonTextDisabled]}>
                Find My Saint
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
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
  moodButtonActive: {
    borderWidth: 1.5,
    borderColor: Colors.terracottaLight,
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
  customInputSection: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.card,
  },
  helperText: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
    marginBottom: Spacing.sm,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  textInput: {
    ...Typography.body,
    color: Colors.charcoal,
    backgroundColor: Colors.cream,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    paddingBottom: Spacing.lg + 4,
    minHeight: 80,
    borderWidth: 1,
    borderColor: Colors.creamDark,
  },
  charCounter: {
    ...Typography.caption,
    color: Colors.charcoalSubtle,
    position: 'absolute',
    bottom: 8,
    right: 12,
  },
  charCounterWarn: {
    color: Colors.terracotta,
  },
  submitButton: {
    backgroundColor: Colors.sage,
    borderRadius: BorderRadius.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: Colors.creamDark,
  },
  submitButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
  submitButtonTextDisabled: {
    color: Colors.charcoalSubtle,
  },
});
