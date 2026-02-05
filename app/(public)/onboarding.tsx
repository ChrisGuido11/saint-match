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
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { useApp } from '../../context/AppContext';
import { requestNotificationPermission, scheduleDailyReminder } from '../../lib/notifications';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    icon: '🤝',
    title: 'Meet Your Saint',
    description: 'Each day, share how you\'re feeling. We\'ll match you with a saint who walked a similar path.',
  },
  {
    id: '2',
    icon: '✨',
    title: 'Accept the Challenge',
    description: 'Receive a simple, practical challenge inspired by your saint—something you can do in just a few minutes.',
  },
  {
    id: '3',
    icon: '🔥',
    title: 'Build Your Streak',
    description: 'Complete challenges daily to grow your streak and watch your virtues flourish over time.',
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
      await requestNotificationPermission();
      await scheduleDailyReminder();
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
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{item.icon}</Text>
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
        <TouchableOpacity onPress={handleNext}>
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
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
          activeOpacity={0.85}
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
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.sageMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  icon: {
    fontSize: 36,
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
    paddingBottom: 50,
    alignItems: 'center',
  },
  dots: {
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
  button: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.button,
  },
  buttonText: {
    ...Typography.button,
    color: Colors.white,
    fontSize: 17,
  },
});
