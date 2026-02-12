import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';
import { UserNovena } from '../types';
import { SAINTS } from '../constants/saints';
import { NovenaProgressDots } from './NovenaProgressDots';

interface ActiveNovenaCardProps {
  userNovena: UserNovena;
  onPrayNow: () => void;
  onLongPress?: () => void;
}

export function ActiveNovenaCard({ userNovena, onPrayNow, onLongPress }: ActiveNovenaCardProps) {
  const saint = SAINTS.find((s) => s.id === userNovena.saintId);
  const saintName = saint?.name ?? userNovena.saintName ?? 'Saint';
  const saintInitials = saint?.initials ?? (saintName
    .split(' ')
    .filter((w) => w.length > 0 && w[0] === w[0].toUpperCase())
    .map((w) => w[0])
    .slice(0, 2)
    .join('') || '?');

  return (
    <TouchableOpacity
      style={styles.card}
      onLongPress={onLongPress}
      activeOpacity={onLongPress ? 0.85 : 1}
      disabled={!onLongPress}
    >
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{saintInitials}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.saintName}>{saintName}</Text>
          <Text style={styles.dayLabel}>Day {userNovena.currentDay} of 9</Text>
        </View>
      </View>

      {userNovena.personalIntention ? (
        <Text style={styles.intention} numberOfLines={1}>
          Intention: {userNovena.personalIntention}
        </Text>
      ) : null}

      <NovenaProgressDots
        completedDays={userNovena.completedDays}
        currentDay={userNovena.currentDay}
      />

      <TouchableOpacity
        style={styles.prayButton}
        onPress={onPrayNow}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Pray now"
      >
        <Text style={styles.prayButtonText}>Pray Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.sageMuted,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.subtle,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  avatarText: {
    ...Typography.buttonSmall,
    color: Colors.white,
  },
  headerText: {
    flex: 1,
  },
  saintName: {
    ...Typography.cardTitle,
    color: Colors.charcoal,
  },
  dayLabel: {
    ...Typography.caption,
    color: Colors.charcoalMuted,
  },
  intention: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
  },
  prayButton: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.sage,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  prayButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
});
