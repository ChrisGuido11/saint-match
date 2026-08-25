import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { hapticSelection } from '@/lib/haptics';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import {
  listTraditionalNovenas,
  describeCalendar,
  nextStartYear,
  formatCalendarDay,
  TraditionalNovena,
} from '../../constants/traditionalNovenas';
import { SAINTS } from '../../constants/saints';
import { IconChevronLeft, IconNavNovenas } from '../../components/icons';
import { useApp } from '../../context/AppContext';
import { PaywallBottomSheet } from '../../components/PaywallBottomSheet';

function saintNameFor(novena: TraditionalNovena): string {
  return SAINTS.find((s) => s.id === novena.saintId)?.name ?? novena.title.replace(/ Novena$/, '');
}

export default function TraditionalNovenasScreen() {
  const { userNovenas, isPro, refreshAll, setIsPro } = useApp();
  const isNovenaLimited = !isPro && userNovenas.filter((n) => !n.completed).length >= 1;
  const [showPaywall, setShowPaywall] = useState(false);

  const novenas = listTraditionalNovenas();

  const handleSelect = (novena: TraditionalNovena) => {
    if (isNovenaLimited) {
      setShowPaywall(true);
      return;
    }
    hapticSelection();
    router.push({
      pathname: '/(auth)/start-novena',
      params: {
        novenaId: novena.id,
        saintId: novena.saintId,
        saintName: saintNameFor(novena),
        source: 'traditional',
      },
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <IconChevronLeft size={20} color={Colors.charcoal} />
        </TouchableOpacity>
        <Text style={styles.title}>Traditional Novenas</Text>
        <View style={styles.backButton} />
      </Animated.View>

      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(100).duration(400)}>
          <Text style={styles.intro}>
            Published prayers, shipped word for word with their source. Nine days of the same published prayer, with your intention read at the place the prayer asks for it.
          </Text>
        </Animated.View>

        {novenas.map((novena, index) => {
          const year = nextStartYear(novena.calendar);
          return (
            <Animated.View key={novena.id} entering={FadeInDown.delay(150 + index * 80).duration(400)}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => handleSelect(novena)}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel={`Start ${novena.title}`}
              >
                <View style={styles.cardHeader}>
                  <IconNavNovenas size={24} color={Colors.sage} />
                  <Text style={styles.cardTitle}>{novena.title}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Traditional published prayer</Text>
                </View>
                <Text style={styles.cardDescription}>{novena.description}</Text>
                <Text style={styles.calendarText}>{describeCalendar(novena.calendar)}</Text>
                <Text style={styles.calendarSub}>
                  Next window begins {formatCalendarDay(novena.calendar.startMonth, novena.calendar.startDay)} {year}. You can pray it any time of year.
                </Text>
                <Text style={styles.sourceText}>Source: {novena.sourceName}</Text>
                <View style={styles.startButton}>
                  <Text style={styles.startButtonText}>Choose this novena</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>

      <PaywallBottomSheet
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        reason="novenas"
        onPurchaseSuccess={() => {
          setShowPaywall(false);
          setIsPro(true);
          refreshAll();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: Spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.subtle,
  },
  title: {
    ...Typography.h2,
    color: Colors.charcoal,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: 100,
  },
  intro: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    marginBottom: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  cardTitle: {
    ...Typography.cardTitle,
    color: Colors.charcoal,
    flex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.sageMuted,
    borderRadius: BorderRadius.sm,
    paddingVertical: 3,
    paddingHorizontal: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  badgeText: {
    ...Typography.caption,
    color: Colors.sageDark,
  },
  cardDescription: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    marginBottom: Spacing.sm,
  },
  calendarText: {
    ...Typography.bodySmall,
    color: Colors.terracotta,
    marginBottom: Spacing.xxs,
  },
  calendarSub: {
    ...Typography.caption,
    color: Colors.charcoalSubtle,
    marginBottom: Spacing.xs,
  },
  sourceText: {
    ...Typography.caption,
    color: Colors.charcoalSubtle,
  },
  startButton: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.sage,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  startButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
});
