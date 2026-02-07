import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';
import { getNovenaBySaintId } from '../constants/novenas';
import { NovenaInfoModal } from './NovenaInfoModal';

interface NovenaSuggestionCardProps {
  saintId: string;
  saintName: string;
  saintBio?: string;
  onStartNovena: () => void;
}

export function NovenaSuggestionCard({ saintId, saintName, onStartNovena }: NovenaSuggestionCardProps) {
  const [showInfo, setShowInfo] = useState(false);
  const novena = getNovenaBySaintId(saintId);

  // Use static novena title/description if available, otherwise generate from saint name
  const title = novena?.title ?? `${saintName} Novena`;
  const description = novena?.description ?? `Nine days of personalized prayer with ${saintName}, generated just for you.`;

  return (
    <>
      <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.card}>
        <Text style={styles.heading}>Want to go deeper?</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => setShowInfo(true)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="What's a novena?"
          >
            <Text style={styles.infoButtonText}>What's a Novena?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.startButton}
            onPress={onStartNovena}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Start novena"
          >
            <Text style={styles.startButtonText}>Start Novena</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <NovenaInfoModal visible={showInfo} onClose={() => setShowInfo(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.sageMuted,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginTop: Spacing.lg,
    ...Shadows.subtle,
  },
  heading: {
    ...Typography.label,
    color: Colors.sage,
    marginBottom: Spacing.xs,
  },
  title: {
    ...Typography.h3,
    color: Colors.charcoal,
    marginBottom: Spacing.xs,
  },
  description: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
    marginBottom: Spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  infoButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.sage,
    alignItems: 'center',
  },
  infoButtonText: {
    ...Typography.buttonSmall,
    color: Colors.sage,
  },
  startButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.sage,
    alignItems: 'center',
  },
  startButtonText: {
    ...Typography.buttonSmall,
    color: Colors.white,
  },
});
