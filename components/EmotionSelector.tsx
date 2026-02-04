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
import { EMOTIONS } from '../constants/saints';
import { Emotion } from '../types';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface EmotionButtonProps {
  emoji: string;
  label: string;
  index: number;
  onPress: () => void;
}

function EmotionButton({ emoji, label, index, onPress }: EmotionButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.92, { damping: 15, stiffness: 300 });
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
      entering={FadeInDown.delay(index * 80).duration(400).springify()}
    >
      <AnimatedTouchable
        style={[styles.emotionButton, animatedStyle]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Text style={styles.emotionEmoji}>{emoji}</Text>
        <Text style={styles.emotionLabel}>{label}</Text>
      </AnimatedTouchable>
    </Animated.View>
  );
}

interface EmotionSelectorProps {
  onSelect: (emotion: Emotion) => void;
}

export function EmotionSelector({ onSelect }: EmotionSelectorProps) {
  return (
    <View style={styles.container}>
      <Animated.Text
        entering={FadeInDown.duration(500)}
        style={styles.title}
      >
        How are you feeling today?
      </Animated.Text>
      <Animated.Text
        entering={FadeInDown.delay(100).duration(500)}
        style={styles.subtitle}
      >
        Select the emotion closest to where you are right now
      </Animated.Text>
      <View style={styles.grid}>
        {EMOTIONS.map((emotion, index) => (
          <EmotionButton
            key={emotion.id}
            emoji={emotion.emoji}
            label={emotion.label}
            index={index}
            onPress={() => onSelect(emotion.id)}
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
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  emotionButton: {
    width: 105,
    height: 105,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.creamDark,
    ...Shadows.card,
  },
  emotionEmoji: {
    fontSize: 32,
    marginBottom: Spacing.xs,
  },
  emotionLabel: {
    ...Typography.buttonSmall,
    color: Colors.charcoalLight,
  },
});
