import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isToday,
  subMonths,
  addMonths,
} from 'date-fns';
import { router } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { Typography, FontFamily } from '../../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../../constants/spacing';
import { useApp } from '../../../context/AppContext';
import { getCompletionDates } from '../../../lib/streak';
import {
  IconFire,
  IconTrophy,
  IconCheckCircle,
  IconChevronLeft,
  IconChevronRight,
} from '../../../components/icons';
import { DayDetailBottomSheet } from '../../../components/DayDetailBottomSheet';

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
  const { streak, challengeLog, activeChallenge, completeChallenge, refreshAll } = useApp();
  const [completionDates, setCompletionDates] = useState<string[] | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  useEffect(() => {
    getCompletionDates().then(setCompletionDates);
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = getDay(monthStart);

  const isLoading = completionDates === null;
  const dates = completionDates ?? [];

  // Build date maps from challenge log
  const acceptedDateSet = useMemo(() => {
    const set = new Set<string>();
    for (const entry of challengeLog) {
      set.add(entry.dateAccepted);
    }
    return set;
  }, [challengeLog]);

  const completedDateSet = useMemo(() => {
    const set = new Set<string>();
    for (const entry of challengeLog) {
      if (entry.completed) {
        set.add(entry.dateAccepted);
      }
    }
    // Also include completion dates from the streak system
    for (const d of dates) {
      set.add(d);
    }
    return set;
  }, [challengeLog, dates]);

  const isCompleted = (date: Date): boolean => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return completedDateSet.has(dateStr);
  };

  const isAcceptedOnly = (date: Date): boolean => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return acceptedDateSet.has(dateStr) && !completedDateSet.has(dateStr);
  };

  // Get challenge log entries for the selected date
  const selectedLogEntries = useMemo(() => {
    if (!selectedDate) return [];
    return challengeLog.filter((e) => e.dateAccepted === selectedDate);
  }, [challengeLog, selectedDate]);

  // Get completions for the selected date
  const selectedCompletions = useMemo(() => {
    if (!selectedDate) return [];
    // Completions are loaded from a different source; filter from dates
    return [];
  }, [selectedDate]);

  const todayStr = format(new Date(), 'yyyy-MM-dd');

  const handleDayPress = (dateStr: string) => {
    setSelectedDate(dateStr);
    setSheetVisible(true);
  };

  const handleCompleteChallenge = async () => {
    setSheetVisible(false);
    await completeChallenge();
    await refreshAll();
    // Refresh completion dates
    getCompletionDates().then(setCompletionDates);
    router.push('/(auth)/celebration');
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
            const accepted = isAcceptedOnly(day);
            const today = isToday(day);
            const dateStr = format(day, 'yyyy-MM-dd');

            return (
              <TouchableOpacity
                key={day.toISOString()}
                style={styles.dayCell}
                onPress={() => handleDayPress(dateStr)}
                activeOpacity={0.6}
              >
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
                {/* Terracotta dot for accepted-but-not-completed */}
                {accepted && (
                  <View style={styles.acceptedDot} />
                )}
              </TouchableOpacity>
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
          <View style={[styles.legendDot, { backgroundColor: Colors.terracotta }]} />
          <Text style={styles.legendText}>Accepted</Text>
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
      </Animated.View>

      {/* Day detail bottom sheet */}
      <DayDetailBottomSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        date={selectedDate ?? todayStr}
        completions={selectedCompletions}
        activeChallenge={
          selectedDate === todayStr ? activeChallenge : null
        }
        challengeLogEntries={selectedLogEntries}
        onCompleteChallenge={
          selectedDate === todayStr && activeChallenge && !activeChallenge.completed
            ? handleCompleteChallenge
            : undefined
        }
      />
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
  acceptedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.terracotta,
    marginTop: 2,
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
