import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Typography, FontFamily } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { addPatienceScore } from '../../lib/storage';
import { IconPatienceScore, IconCompleted } from '../../components/icons';

const SCORES = [
  { value: 1, label: 'Struggling' },
  { value: 2, label: 'Difficult' },
  { value: 3, label: 'Okay' },
  { value: 4, label: 'Good' },
  { value: 5, label: 'Peaceful' },
];

export default function WeeklyCheckinScreen() {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (value: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(value);
  };

  const handleSubmit = async () => {
    if (selected === null) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await addPatienceScore(selected);
    setSubmitted(true);
    setTimeout(() => router.back(), 1500);
  };

  if (submitted) {
    return (
      <View style={styles.container}>
        <Animated.View entering={FadeIn.duration(500)} style={styles.successContent}>
          <IconCompleted size={72} color={Colors.sage} />
          <Text style={styles.successTitle}>Score recorded!</Text>
          <Text style={styles.successSubtitle}>Check your Virtue Portfolio to see trends.</Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Handle */}
        <View style={styles.handleBar} />

        <Animated.Text entering={FadeInDown.duration(400)} style={styles.title}>
          Weekly Check-In
        </Animated.Text>
        <Animated.Text entering={FadeInDown.delay(100).duration(400)} style={styles.subtitle}>
          On a scale of 1-5, how patient did you feel this week?
        </Animated.Text>

        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.scoresRow}>
          {SCORES.map((score) => (
            <TouchableOpacity
              key={score.value}
              style={[
                styles.scoreButton,
                selected === score.value && styles.scoreButtonSelected,
              ]}
              onPress={() => handleSelect(score.value)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={`Score ${score.value} — ${score.label}`}
              accessibilityState={{ selected: selected === score.value }}
            >
              <IconPatienceScore level={score.value as 1 | 2 | 3 | 4 | 5} size={36} color={selected === score.value ? Colors.terracotta : Colors.sage} />
              <Text style={styles.scoreValue}>{score.value}</Text>
              <Text style={styles.scoreLabel}>{score.label}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        <TouchableOpacity
          style={[styles.submitButton, selected === null && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={selected === null}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Submit patience score"
          accessibilityState={{ disabled: selected === null }}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  handleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.charcoalSubtle,
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h2,
    color: Colors.charcoal,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  scoresRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  scoreButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.creamDark,
  },
  scoreButtonSelected: {
    borderColor: Colors.terracotta,
    backgroundColor: Colors.terracottaMuted,
  },
  scoreValue: {
    fontFamily: FontFamily.sansBold,
    fontSize: 18,
    color: Colors.charcoal,
    marginTop: Spacing.xs,
  },
  scoreLabel: {
    ...Typography.caption,
    color: Colors.charcoalMuted,
    fontSize: 10,
    marginTop: 2,
  },
  submitButton: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.button,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    ...Typography.buttonLarge,
    color: Colors.white,
  },
  successContent: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
  successTitle: {
    ...Typography.h2,
    color: Colors.charcoal,
    marginTop: Spacing.md,
  },
  successSubtitle: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    marginTop: Spacing.xs,
  },
});
