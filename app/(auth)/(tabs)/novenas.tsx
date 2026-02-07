import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../../constants/spacing';
import { useApp } from '../../../context/AppContext';
import { SAINTS } from '../../../constants/saints';
import { getNovenaById, NOVENAS } from '../../../constants/novenas';
import { NovenaProgressDots } from '../../../components/NovenaProgressDots';
import { NovenaInfoModal } from '../../../components/NovenaInfoModal';
import { IconNavNovenas } from '../../../components/icons';

export default function NovenasScreen() {
  const { userNovenas, refreshAll } = useApp();
  const [refreshing, setRefreshing] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const activeNovenas = userNovenas.filter((n) => !n.completed);
  const completedNovenas = userNovenas.filter((n) => n.completed);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshAll();
    setRefreshing(false);
  }, [refreshAll]);

  const handleContinue = (userNovenaId: string) => {
    router.push({
      pathname: '/(auth)/novena-prayer',
      params: { userNovenaId },
    });
  };

  const handleStartNovena = () => {
    // Navigate to start-novena with the first available novena
    const firstNovena = NOVENAS[0];
    router.push({
      pathname: '/(auth)/start-novena',
      params: { novenaId: firstNovena.id, saintId: firstNovena.saintId },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.sage} />
      }
    >
      <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
        <Text style={styles.title}>My Novenas</Text>
        <TouchableOpacity onPress={() => setShowInfo(true)} accessibilityRole="button" accessibilityLabel="What's a novena?">
          <Text style={styles.infoLink}>What's a Novena?</Text>
        </TouchableOpacity>
      </Animated.View>

      {activeNovenas.length === 0 && completedNovenas.length === 0 ? (
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.emptyState}>
          <IconNavNovenas size={64} color={Colors.charcoalSubtle} />
          <Text style={styles.emptyTitle}>No novenas yet</Text>
          <Text style={styles.emptySubtitle}>
            Start a 9-day prayer journey with a saint. Get matched on the Home tab, or pick one below.
          </Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartNovena}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Start a novena"
          >
            <Text style={styles.startButtonText}>Start a Novena</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <>
          {/* Active Novenas */}
          {activeNovenas.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Active</Text>
              {activeNovenas.map((userNovena, index) => {
                const saint = SAINTS.find((s) => s.id === userNovena.saintId);
                const displayName = saint?.name ?? userNovena.saintName ?? 'Saint';
                const displayInitials = saint?.initials ?? (displayName
                  .split(' ')
                  .filter((w) => w[0] === w[0].toUpperCase())
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join('') || '?');
                return (
                  <Animated.View
                    key={userNovena.id}
                    entering={FadeInDown.delay(100 + index * 80).duration(400)}
                  >
                    <TouchableOpacity
                      style={styles.novenaCard}
                      onPress={() => handleContinue(userNovena.id)}
                      activeOpacity={0.85}
                      accessibilityRole="button"
                      accessibilityLabel={`Continue ${displayName} day ${userNovena.currentDay}`}
                    >
                      <View style={styles.cardHeader}>
                        <View style={styles.avatar}>
                          <Text style={styles.avatarText}>{displayInitials}</Text>
                        </View>
                        <View style={styles.cardHeaderText}>
                          <Text style={styles.cardSaintName}>{displayName}</Text>
                          <Text style={styles.cardDayLabel}>Day {userNovena.currentDay} of 9</Text>
                        </View>
                      </View>
                      {userNovena.personalIntention ? (
                        <Text style={styles.cardIntention} numberOfLines={1}>
                          {userNovena.personalIntention}
                        </Text>
                      ) : null}
                      <NovenaProgressDots
                        completedDays={userNovena.completedDays}
                        currentDay={userNovena.currentDay}
                      />
                      <View style={styles.continueButton}>
                        <Text style={styles.continueButtonText}>Continue</Text>
                      </View>
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
          )}

          {/* Completed Novenas */}
          {completedNovenas.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Completed</Text>
              {completedNovenas.map((userNovena, index) => {
                const saint = SAINTS.find((s) => s.id === userNovena.saintId);
                const displayName = saint?.name ?? userNovena.saintName ?? 'Saint';
                const displayInitials = saint?.initials ?? (displayName
                  .split(' ')
                  .filter((w) => w[0] === w[0].toUpperCase())
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join('') || '?');
                const completedDate = userNovena.completedAt
                  ? new Date(userNovena.completedAt).toLocaleDateString()
                  : '';
                return (
                  <Animated.View
                    key={userNovena.id}
                    entering={FadeInDown.delay(100 + index * 80).duration(400)}
                  >
                    <View style={styles.completedCard}>
                      <View style={styles.completedRow}>
                        <View style={styles.avatarSmall}>
                          <Text style={styles.avatarTextSmall}>{displayInitials}</Text>
                        </View>
                        <View style={styles.completedInfo}>
                          <Text style={styles.completedSaintName}>{displayName}</Text>
                          <Text style={styles.completedDate}>{completedDate}</Text>
                        </View>
                      </View>
                      {userNovena.personalIntention ? (
                        <Text style={styles.completedIntention} numberOfLines={1}>
                          {userNovena.personalIntention}
                        </Text>
                      ) : null}
                    </View>
                  </Animated.View>
                );
              })}
            </View>
          )}

          {/* Start another */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleStartNovena}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Start another novena"
          >
            <Text style={styles.addButtonText}>Start Another Novena</Text>
          </TouchableOpacity>
        </>
      )}

      <NovenaInfoModal visible={showInfo} onClose={() => setShowInfo(false)} />
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
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h1,
    color: Colors.charcoal,
  },
  infoLink: {
    ...Typography.bodySmall,
    color: Colors.sage,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyTitle: {
    ...Typography.h2,
    color: Colors.charcoal,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  emptySubtitle: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: Spacing.lg,
  },
  startButton: {
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.xl,
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.md,
    ...Shadows.button,
  },
  startButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.label,
    color: Colors.charcoalMuted,
    marginBottom: Spacing.sm,
  },
  novenaCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    ...Shadows.card,
  },
  cardHeader: {
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
  cardHeaderText: {
    flex: 1,
  },
  cardSaintName: {
    ...Typography.cardTitle,
    color: Colors.charcoal,
  },
  cardDayLabel: {
    ...Typography.caption,
    color: Colors.charcoalMuted,
  },
  cardIntention: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
  },
  continueButton: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.sage,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  continueButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
  completedCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.xs,
    ...Shadows.subtle,
  },
  completedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.creamDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  avatarTextSmall: {
    ...Typography.caption,
    color: Colors.charcoalMuted,
  },
  completedInfo: {
    flex: 1,
  },
  completedSaintName: {
    ...Typography.body,
    color: Colors.charcoal,
  },
  completedDate: {
    ...Typography.caption,
    color: Colors.charcoalSubtle,
  },
  completedIntention: {
    ...Typography.caption,
    color: Colors.charcoalSubtle,
    fontStyle: 'italic',
    marginTop: Spacing.xxs,
    marginLeft: 44,
  },
  addButton: {
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.sage,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  addButtonText: {
    ...Typography.button,
    color: Colors.sage,
  },
});
