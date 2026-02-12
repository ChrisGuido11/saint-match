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
import { hapticImpact, ImpactFeedbackStyle } from '@/lib/haptics';
import Animated, {
  FadeInDown,
  FadeIn,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { useApp } from '../../context/AppContext';
import { requestNotificationPermission, scheduleDailyReminder } from '../../lib/notifications';
import { setNotificationPreferences } from '../../lib/storage';
import { IconMeetSaint, IconChallenge, IconStreak } from '../../components/icons';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  illustration: React.ReactNode;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Meet Your Saint',
    description:
      'Each day, share how you\'re feeling. We\'ll match you with a saint who walked a similar path.',
    illustration: <IconMeetSaint size={120} />,
  },
  {
    id: '2',
    title: 'Accept the Challenge',
    description:
      'Receive a simple, practical challenge inspired by your saint—something you can do in just a few minutes.',
    illustration: <IconChallenge size={120} />,
  },
  {
    id: '3',
    title: 'Build Your Streak',
    description:
      'Complete challenges daily to grow your streak and watch your virtues flourish over time.',
    illustration: <IconStreak size={120} />,
  },
];

function AnimatedDot({ isActive }: { isActive: boolean }) {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(isActive ? 24 : 8, { duration: 200 }),
    backgroundColor: withTiming(isActive ? Colors.terracotta : Colors.charcoalSubtle, { duration: 200 }),
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { setOnboardingComplete } = useApp();

  const handleNext = async () => {
    hapticImpact(ImpactFeedbackStyle.Light);

    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      await requestNotificationPermission();
      await scheduleDailyReminder();
      await setNotificationPreferences({
        dailyReminderEnabled: true,
        dailyReminderHour: 8,
        dailyReminderMinute: 30,
        novenaReminderEnabled: false,
      });
      await setOnboardingComplete();
      router.replace('/(auth)/(tabs)');
    }
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={[styles.slide, { width }]}>
      <View style={styles.illustrationContainer}>
        {item.illustration}
      </View>
      <Text style={styles.slideTitle}>{item.title}</Text>
      <Text style={styles.slideDescription}>{item.description}</Text>
    </View>
  );

  const isLast = currentIndex === SLIDES.length - 1;

  return (
    <View style={styles.container}>
      {/* Skip */}
      <Animated.View entering={FadeIn.delay(300)} style={styles.skipContainer}>
        <TouchableOpacity onPress={handleNext} accessibilityRole="button" accessibilityLabel="Skip onboarding">
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

      {/* Bottom */}
      <View style={styles.bottom}>
        {/* Dots */}
        <View style={styles.dots}>
          {SLIDES.map((_, index) => (
            <AnimatedDot key={index} isActive={index === currentIndex} />
          ))}
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel={isLast ? 'Get started' : 'Continue to next slide'}
        >
          <Text style={styles.buttonText}>
            {isLast ? 'Get Started' : 'Continue'}
          </Text>
        </TouchableOpacity>
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
  skipText: {
    ...Typography.buttonSmall,
    color: Colors.charcoalMuted,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  illustrationContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.sageMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  slideTitle: {
    ...Typography.h1,
    color: Colors.charcoal,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  slideDescription: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 320,
  },
  bottom: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.safeBottom,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  button: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.button,
  },
  buttonText: {
    ...Typography.buttonLarge,
    color: Colors.white,
  },
});
