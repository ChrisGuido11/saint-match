import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { hapticSelection } from '@/lib/haptics';
import { Colors } from '../constants/colors';
import { Typography, FontFamily } from '../constants/typography';
import { Spacing } from '../constants/spacing';

export interface WeekDay {
  date: Date;
  dateStr: string;
  hasCompletions: boolean;
  isToday: boolean;
  hasPending: boolean;
}

interface WeeklyMiniCalendarProps {
  weekDays: WeekDay[];
  selectedDate: string | null;
  onSelectDate: (dateStr: string) => void;
}

const DAY_ABBREVS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function WeeklyMiniCalendar({ weekDays, selectedDate, onSelectDate }: WeeklyMiniCalendarProps) {
  return (
    <View style={styles.container}>
      {weekDays.map((day) => {
        const isSelected = selectedDate === day.dateStr;
        const dayAbbrev = DAY_ABBREVS[day.date.getDay()];
        const dateNum = day.date.getDate();

        const circleVariant = day.hasCompletions
          ? styles.circleCompleted
          : day.isToday && day.hasPending
            ? styles.circlePending
            : day.isToday
              ? styles.circleToday
              : styles.circleDefault;

        const isCompleted = day.hasCompletions;

        return (
          <Pressable
            key={day.dateStr}
            style={styles.cell}
            onPress={() => {
              hapticSelection();
              onSelectDate(day.dateStr);
            }}
            accessibilityRole="button"
            accessibilityLabel={`${dayAbbrev} ${dateNum}${day.hasCompletions ? ', has completions' : ''}${day.hasPending ? ', challenge in progress' : ''}`}
          >
            <Text style={styles.dayLabel}>{dayAbbrev}</Text>
            <View style={[styles.circle, circleVariant, isSelected && styles.circleSelected]}>
              <Text style={[styles.dateText, isCompleted ? styles.dateTextCompleted : styles.dateTextDefault]}>
                {dateNum}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const CIRCLE_SIZE = 36;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  dayLabel: {
    fontFamily: FontFamily.sans,
    fontSize: 11,
    color: Colors.charcoalSubtle,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDefault: {
    backgroundColor: Colors.creamDark,
  },
  circleCompleted: {
    backgroundColor: Colors.sage,
  },
  circlePending: {
    borderWidth: 2,
    borderColor: Colors.terracotta,
    backgroundColor: 'transparent',
  },
  circleToday: {
    borderWidth: 1,
    borderColor: Colors.charcoalSubtle,
    backgroundColor: 'transparent',
  },
  circleSelected: {
    transform: [{ scale: 1.15 }],
  },
  dateText: {
    fontFamily: FontFamily.serif,
    fontSize: 16,
    lineHeight: 20,
  },
  dateTextDefault: {
    color: Colors.charcoalLight,
  },
  dateTextCompleted: {
    color: Colors.white,
  },
});
