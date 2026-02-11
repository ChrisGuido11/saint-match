import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Typography, FontFamily } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { useApp } from '../../context/AppContext';
import { getNovenaById } from '../../constants/novenas';
import { SAINTS } from '../../constants/saints';
import { NovenaProgressDots } from '../../components/NovenaProgressDots';
import { IconChevronLeft, IconNavNovenas } from '../../components/icons';

export default function NovenaPrayerScreen() {
  const { userNovenaId } = useLocalSearchParams<{ userNovenaId: string }>();
  const { userNovenas, markNovenaDayPrayed } = useApp();

  const userNovena = userNovenas.find((n) => n.id === userNovenaId);
  const novena = userNovena ? getNovenaById(userNovena.novenaId) : null;
  const saint = userNovena ? SAINTS.find((s) => s.id === userNovena.saintId) : null;
  const saintName = saint?.name ?? userNovena?.saintName ?? 'Saint';

  const [expandedSection, setExpandedSection] = useState<'opening' | 'daily' | 'closing' | null>('daily');
  const [isMarking, setIsMarking] = useState(false);

  if (!userNovena) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Novena not found.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} accessibilityRole="button">
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Prefer AI-generated prayers, fall back to static novena
  const prayers = userNovena.generatedPrayers;
  const dayIndex = userNovena.currentDay - 1;
  const openingPrayer = prayers?.openingPrayer ?? novena?.openingPrayer ?? '';
  const dailyPrayer = prayers?.dailyPrayers[dayIndex] ?? novena?.dailyPrayers[dayIndex] ?? novena?.dailyPrayers[novena.dailyPrayers.length - 1] ?? '';
  const closingPrayer = prayers?.closingPrayer ?? novena?.closingPrayer ?? '';

  const toggleSection = (section: 'opening' | 'daily' | 'closing') => {
    setExpandedSection((prev) => (prev === section ? null : section));
    Haptics.selectionAsync();
  };

  const handlePrayed = async () => {
    setIsMarking(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const result = await markNovenaDayPrayed(userNovena.id);

      if (result.alreadyPrayed) {
        Alert.alert(
          'Already Prayed',
          "You've already prayed today. Come back tomorrow for the next day.",
          [{ text: 'OK' }]
        );
        return;
      }

      if (result.completed) {
        router.replace({
          pathname: '/(auth)/novena-complete',
          params: { userNovenaId: userNovena.id },
        });
      } else {
        router.replace({
          pathname: '/(auth)/novena-celebration',
          params: {
            saintName,
            dayCompleted: userNovena.currentDay.toString(),
            completedDays: JSON.stringify(userNovena.completedDays.map((v, i) => v || i === userNovena.currentDay - 1)),
            ...(userNovena.personalIntention ? { intention: userNovena.personalIntention } : {}),
          },
        });
      }
    } finally {
      setIsMarking(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backNav} accessibilityLabel="Go back" accessibilityRole="button">
            <IconChevronLeft size={24} color={Colors.charcoal} />
          </TouchableOpacity>
          <Text style={styles.dayLabel}>Day {userNovena.currentDay} of 9</Text>
        </Animated.View>

        {/* Saint info */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.saintSection}>
          <IconNavNovenas size={28} color={Colors.sage} />
          <Text style={styles.saintName}>{saintName}</Text>
        </Animated.View>

        {/* Intention */}
        {userNovena.personalIntention ? (
          <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.intentionCard}>
            <Text style={styles.intentionLabel}>YOUR INTENTION</Text>
            <Text style={styles.intentionText}>{userNovena.personalIntention}</Text>
          </Animated.View>
        ) : null}

        {/* Prayer Sections */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)}>
          {/* Opening Prayer */}
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => toggleSection('opening')}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ expanded: expandedSection === 'opening' }}
          >
            <Text style={styles.accordionTitle}>Opening Prayer</Text>
            <Text style={styles.accordionToggle}>{expandedSection === 'opening' ? '\u2212' : '+'}</Text>
          </TouchableOpacity>
          {expandedSection === 'opening' && openingPrayer ? (
            <View style={styles.prayerContent}>
              <Text style={styles.prayerText}>{openingPrayer}</Text>
            </View>
          ) : null}

          {/* Daily Prayer */}
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => toggleSection('daily')}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ expanded: expandedSection === 'daily' }}
          >
            <Text style={styles.accordionTitle}>Today's Prayer</Text>
            <Text style={styles.accordionToggle}>{expandedSection === 'daily' ? '\u2212' : '+'}</Text>
          </TouchableOpacity>
          {expandedSection === 'daily' && dailyPrayer ? (
            <View style={styles.prayerContent}>
              <Text style={styles.prayerText}>{dailyPrayer}</Text>
            </View>
          ) : null}

          {/* Closing Prayer */}
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => toggleSection('closing')}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ expanded: expandedSection === 'closing' }}
          >
            <Text style={styles.accordionTitle}>Closing Prayer</Text>
            <Text style={styles.accordionToggle}>{expandedSection === 'closing' ? '\u2212' : '+'}</Text>
          </TouchableOpacity>
          {expandedSection === 'closing' && closingPrayer ? (
            <View style={styles.prayerContent}>
              <Text style={styles.prayerText}>{closingPrayer}</Text>
            </View>
          ) : null}
        </Animated.View>

        {/* Progress */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.progressSection}>
          <NovenaProgressDots
            completedDays={userNovena.completedDays}
            currentDay={userNovena.currentDay}
          />
        </Animated.View>
      </ScrollView>

      {/* I Prayed Today button */}
      <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.prayedButton, isMarking && styles.prayedButtonDisabled]}
          onPress={handlePrayed}
          disabled={isMarking}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="I prayed today"
        >
          <Text style={styles.prayedButtonText}>
            {isMarking ? 'Marking...' : 'I Prayed Today'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  backNav: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.subtle,
    marginRight: Spacing.md,
  },
  dayLabel: {
    ...Typography.label,
    color: Colors.terracotta,
  },
  saintSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  saintName: {
    ...Typography.saintName,
    color: Colors.charcoal,
  },
  intentionCard: {
    backgroundColor: Colors.sageMuted,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  intentionLabel: {
    ...Typography.label,
    color: Colors.sage,
    marginBottom: Spacing.xxs,
  },
  intentionText: {
    ...Typography.body,
    color: Colors.charcoal,
    fontStyle: 'italic',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.creamDark,
  },
  accordionTitle: {
    ...Typography.h3,
    color: Colors.charcoal,
  },
  accordionToggle: {
    fontSize: 22,
    color: Colors.charcoalMuted,
    lineHeight: 24,
  },
  prayerContent: {
    paddingVertical: Spacing.md,
  },
  prayerText: {
    fontFamily: FontFamily.serif,
    fontSize: 18,
    lineHeight: 30,
    color: Colors.charcoal,
  },
  progressSection: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  bottomSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.safeBottom,
    paddingTop: Spacing.md,
  },
  prayedButton: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.button,
  },
  prayedButtonDisabled: {
    opacity: 0.6,
  },
  prayedButtonText: {
    ...Typography.buttonLarge,
    color: Colors.white,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: Colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  errorText: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  backButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.sage,
    borderRadius: BorderRadius.md,
  },
  backButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
});
