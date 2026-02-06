import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  isToday,
  subMonths,
  addMonths,
} from 'date-fns';
import { Colors } from '../../../constants/colors';
import { Typography, FontFamily } from '../../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../../constants/spacing';
import { useApp } from '../../../context/AppContext';
import { getCompletionDates } from '../../../lib/streak';
import { TouchableOpacity } from 'react-native';
import {
  IconFire,
  IconTrophy,
  IconCheckCircle,
  IconChevronLeft,
  IconChevronRight,
} from '../../../components/icons';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function SkeletonBlock({ width, height, style }: { width: number | string; height: number; style?: any }) {
  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      style={[
        {
          width,
          height,
          borderRadius: BorderRadius.sm,
          backgroundColor: Colors.creamDark,
        },
        style,
      ]}
    />
  );
}

export default function CalendarScreen() {
  const { streak } = useApp();
  const [completionDates, setCompletionDates] = useState<string[] | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    getCompletionDates().then(setCompletionDates);
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = getDay(monthStart);

  const isLoading = completionDates === null;
  const dates = completionDates ?? [];

  const isCompleted = (date: Date): boolean => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return dates.includes(dateStr);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
        <Text style={styles.title}>Streak Calendar</Text>
        <Text style={styles.subtitle}>Your journey of daily faithfulness</Text>
      </Animated.View>

      {/* Stats row */}
      {isLoading ? (
        <View style={styles.statsRow}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={[styles.statCard, { alignItems: 'center', gap: Spacing.xs }]}>
              <SkeletonBlock width={28} height={28} style={{ borderRadius: 14 }} />
              <SkeletonBlock width={40} height={24} />
              <SkeletonBlock width={48} height={14} />
            </View>
          ))}
        </View>
      ) : (
      <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.statsRow}>
        <View style={styles.statCard}>
          <IconFire size={28} color={Colors.terracotta} />
          <Text style={styles.statNumber}>{streak.currentStreak}</Text>
          <Text style={styles.statLabel}>Current</Text>
        </View>
        <View style={[styles.statCard, styles.statCardHighlight]}>
          <IconTrophy size={28} color={Colors.terracotta} />
          <Text style={[styles.statNumber, styles.statNumberHighlight]}>
            {streak.longestStreak}
          </Text>
          <Text style={styles.statLabel}>Longest</Text>
        </View>
        <View style={styles.statCard}>
          <IconCheckCircle size={28} color={Colors.sage} />
          <Text style={styles.statNumber}>{dates.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </Animated.View>
      )}

      {/* Calendar */}
      <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.calendarCard}>
        {/* Month nav */}
        <View style={styles.monthNav}>
          <TouchableOpacity
            onPress={() => setCurrentMonth(subMonths(currentMonth, 1))}
            style={styles.monthNavButton}
            accessibilityRole="button"
            accessibilityLabel="Previous month"
          >
            <IconChevronLeft size={20} color={Colors.charcoalLight} />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>
            {format(currentMonth, 'MMMM yyyy')}
          </Text>
          <TouchableOpacity
            onPress={() => setCurrentMonth(addMonths(currentMonth, 1))}
            style={styles.monthNavButton}
            accessibilityRole="button"
            accessibilityLabel="Next month"
          >
            <IconChevronRight size={20} color={Colors.charcoalLight} />
          </TouchableOpacity>
        </View>

        {/* Weekday headers */}
        <View style={styles.weekdayRow}>
          {WEEKDAYS.map((day, i) => (
            <View key={i} style={styles.weekdayCell}>
              <Text style={styles.weekdayText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Days grid */}
        <View style={styles.daysGrid}>
          {/* Empty cells for offset */}
          {Array.from({ length: startDayOfWeek }).map((_, i) => (
            <View key={`empty-${i}`} style={styles.dayCell} />
          ))}

          {/* Day cells */}
          {daysInMonth.map((day) => {
            const completed = isCompleted(day);
            const today = isToday(day);

            return (
              <View key={day.toISOString()} style={styles.dayCell}>
                <View
                  style={[
                    styles.dayCircle,
                    completed && styles.dayCircleCompleted,
                    today && !completed && styles.dayCircleToday,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      completed && styles.dayTextCompleted,
                      today && styles.dayTextToday,
                    ]}
                  >
                    {format(day, 'd')}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </Animated.View>

      {/* Legend */}
      <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.sage }]} />
          <Text style={styles.legendText}>Completed</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendDot,
              { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Colors.terracotta },
            ]}
          />
          <Text style={styles.legendText}>Today</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.creamDark }]} />
          <Text style={styles.legendText}>Missed</Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: 120,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h1,
    color: Colors.charcoal,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.subtle,
  },
  statCardHighlight: {
    backgroundColor: Colors.terracottaMuted,
  },
  statNumber: {
    ...Typography.statNumber,
    color: Colors.charcoal,
    marginTop: Spacing.xs,
  },
  statNumberHighlight: {
    color: Colors.terracotta,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.charcoalMuted,
    marginTop: 2,
  },
  calendarCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.card,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  monthNavButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.creamWarm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthTitle: {
    ...Typography.h3,
    color: Colors.charcoal,
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
  },
  weekdayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.xxs,
  },
  weekdayText: {
    ...Typography.label,
    color: Colors.charcoalSubtle,
    fontSize: 11,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    alignItems: 'center',
    paddingVertical: 6,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleCompleted: {
    backgroundColor: Colors.sage,
  },
  dayCircleToday: {
    borderWidth: 2,
    borderColor: Colors.terracotta,
  },
  dayText: {
    fontFamily: FontFamily.sans,
    fontSize: 14,
    color: Colors.charcoalLight,
  },
  dayTextCompleted: {
    color: Colors.white,
    fontFamily: FontFamily.sansSemiBold,
  },
  dayTextToday: {
    color: Colors.terracotta,
    fontFamily: FontFamily.sansBold,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.lg,
    marginTop: Spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
  },
});
