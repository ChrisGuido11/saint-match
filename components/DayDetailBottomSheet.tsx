import React from 'react';
import { View, Text, Pressable, StyleSheet, Modal, ScrollView } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { format, parseISO } from 'date-fns';
import { Colors } from '../constants/colors';
import { Typography, FontFamily } from '../constants/typography';
import { Spacing, BorderRadius } from '../constants/spacing';
import type { Completion, ActiveChallenge } from '../types';

interface DayDetailBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  date: string;
  completions: Completion[];
  activeChallenge: ActiveChallenge | null;
}

export function DayDetailBottomSheet({
  visible,
  onClose,
  date,
  completions,
  activeChallenge,
}: DayDetailBottomSheetProps) {
  if (!visible) return null;

  const dateObj = parseISO(date);
  const formattedDate = format(dateObj, 'EEEE, MMM d');
  const hasContent = completions.length > 0 || (activeChallenge && !activeChallenge.completed);

  return (
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent>
      <Animated.View entering={FadeIn.duration(300)} style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <Animated.View entering={SlideInDown.duration(400).springify()} style={styles.sheet}>
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Date header */}
          <Text style={styles.dateHeader}>{formattedDate}</Text>

          <ScrollView
            style={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Active challenge (today only, not completed) */}
            {activeChallenge && !activeChallenge.completed && (
              <View style={[styles.card, styles.cardPending]}>
                <View style={styles.cardHeader}>
                  <View style={styles.pendingBadge}>
                    <Text style={styles.pendingBadgeText}>In Progress</Text>
                  </View>
                </View>
                <Text style={styles.cardAction}>
                  {activeChallenge.match.microAction.actionText}
                </Text>
                <Text style={styles.cardSaint}>
                  Inspired by {activeChallenge.match.saint.name}
                </Text>
              </View>
            )}

            {/* Completed challenges */}
            {completions.map((completion) => (
              <View key={completion.id} style={[styles.card, styles.cardCompleted]}>
                <Text style={styles.cardAction}>{completion.actionText}</Text>
                <Text style={styles.cardSaint}>
                  Inspired by {completion.saintName}
                </Text>
                <Text style={styles.cardTime}>
                  {format(new Date(completion.completedAt), 'h:mm a')}
                </Text>
              </View>
            ))}

            {/* Empty state */}
            {!hasContent && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No activity this day</Text>
              </View>
            )}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.overlay,
  },
  sheet: {
    backgroundColor: Colors.cream,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xxl,
    maxHeight: '60%',
  },
  handleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.charcoalSubtle,
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  dateHeader: {
    ...Typography.h3,
    color: Colors.charcoal,
    marginBottom: Spacing.md,
  },
  scrollContent: {
    flexGrow: 0,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderLeftWidth: 4,
  },
  cardCompleted: {
    borderLeftColor: Colors.sage,
  },
  cardPending: {
    borderLeftColor: Colors.terracotta,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
  },
  pendingBadge: {
    backgroundColor: Colors.terracottaMuted,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
  },
  pendingBadgeText: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 11,
    color: Colors.terracotta,
    letterSpacing: 0.3,
  },
  cardAction: {
    ...Typography.body,
    color: Colors.charcoalLight,
    lineHeight: 22,
  },
  cardSaint: {
    ...Typography.bodySmall,
    color: Colors.sage,
    marginTop: Spacing.xs,
    fontFamily: FontFamily.sansMedium,
  },
  cardTime: {
    ...Typography.caption,
    color: Colors.charcoalSubtle,
    marginTop: 4,
  },
  emptyState: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...Typography.body,
    color: Colors.charcoalSubtle,
  },
});
