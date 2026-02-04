import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Typography, FontFamily } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { useApp } from '../../context/AppContext';
import { requestNotificationPermission, scheduleDailyReminder } from '../../lib/notifications';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  emoji: string;
  title: string;
  description: string;
  accent: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    emoji: '\u{1F91D}',
    title: 'Match with a Saint',
    description:
      'Each morning, tell us how you\'re feeling. Our AI matches you with a saint who overcame that exact struggle.',
    accent: Colors.sage,
  },
  {
    id: '2',
    emoji: '\u{26A1}',
    title: 'Accept the Challenge',
    description:
      'Get one micro-action inspired by your saint \u{2014} concrete, modern, and doable in 5\u{2013}15 minutes. No vague advice, real behavioral change.',
    accent: Colors.terracotta,
  },
  {
    id: '3',
    emoji: '\u{1F525}',
    title: 'Build Your Streak',
    description:
      'Complete challenges daily to grow your streak and Virtue Portfolio. Watch real spiritual growth happen, one small act at a time.',
    accent: Colors.streak,
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { setOnboardingComplete } = useApp();

  const handleNext = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      // Request notifications on last slide
      await requestNotificationPermission();
      await scheduleDailyReminder();
      await setOnboardingComplete();
      router.replace('/(auth)/(tabs)');
    }
  };

  const handleSkip = async () => {
    await setOnboardingComplete();
    router.replace('/(auth)/(tabs)');
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={[styles.slide, { width }]}>
      <View style={styles.slideContent}>
        <View style={[styles.emojiContainer, { backgroundColor: item.accent + '15' }]}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </View>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideDescription}>{item.description}</Text>
      </View>
    </View>
  );

  const isLast = currentIndex === SLIDES.length - 1;

  return (
    <View style={styles.container}>
      {/* Skip button */}
      <Animated.View entering={FadeIn.delay(300).duration(400)} style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        bounces={false}
      />

      {/* Bottom section */}
      <View style={styles.bottomSection}>
        {/* Dots */}
        <View style={styles.dotsContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>
            {isLast ? 'Enable Reminders & Start' : 'Continue'}
          </Text>
        </TouchableOpacity>

        {isLast && (
          <Text style={styles.notificationNote}>
            We'll send you a gentle daily reminder at 8:30 AM
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  skipContainer: {
    position: 'absolute',
    top: 60,
    right: Spacing.lg,
    zIndex: 10,
  },
  skipButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  skipText: {
    ...Typography.buttonSmall,
    color: Colors.charcoalMuted,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  slideContent: {
    alignItems: 'center',
  },
  emojiContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  emoji: {
    fontSize: 48,
  },
  slideTitle: {
    ...Typography.h1,
    color: Colors.charcoal,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  slideDescription: {
    ...Typography.bodyLarge,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: Spacing.md,
  },
  bottomSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 50,
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.charcoalSubtle,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.terracotta,
  },
  ctaButton: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.button,
  },
  ctaText: {
    ...Typography.button,
    color: Colors.white,
    fontSize: 17,
  },
  notificationNote: {
    ...Typography.bodySmall,
    color: Colors.charcoalSubtle,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
});
