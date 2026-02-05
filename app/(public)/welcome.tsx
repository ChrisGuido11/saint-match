import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';

export default function WelcomeScreen() {
  const handleBegin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/(public)/onboarding');
  };

  return (
    <View style={styles.container}>
      {/* Subtle gradient background */}
      <LinearGradient
        colors={[Colors.cream, Colors.white]}
        style={StyleSheet.absoluteFill}
      />

      {/* Content */}
      <View style={styles.content}>
        {/* Logo */}
        <Animated.View entering={FadeIn.delay(200).duration(800)} style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={[Colors.sage, Colors.sageDark]}
              style={styles.logo}
            >
              <Text style={styles.logoIcon}>✦</Text>
            </LinearGradient>
          </View>
        </Animated.View>

        {/* Title */}
        <Animated.Text entering={FadeInDown.delay(400).duration(600)} style={styles.title}>
          Saint Match
        </Animated.Text>

        {/* Tagline */}
        <Animated.Text entering={FadeInDown.delay(550).duration(600)} style={styles.tagline}>
          Daily wisdom from the saints{'\n'}for your modern life
        </Animated.Text>

        {/* Description */}
        <Animated.Text entering={FadeInDown.delay(700).duration(600)} style={styles.description}>
          Match with a saint, receive a personal challenge, and grow in virtue—one small step at a time.
        </Animated.Text>
      </View>

      {/* CTA */}
      <Animated.View entering={FadeInDown.delay(900).duration(600)} style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleBegin}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Begin Your Journey</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  logoSection: {
    marginBottom: Spacing.xl,
  },
  logoContainer: {
    shadowColor: Colors.sage,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 40,
    color: Colors.white,
  },
  title: {
    ...Typography.heroTitle,
    color: Colors.charcoal,
    textAlign: 'center',
  },
  tagline: {
    ...Typography.h2,
    color: Colors.charcoalLight,
    textAlign: 'center',
    marginTop: Spacing.md,
    lineHeight: 32,
  },
  description: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    lineHeight: 24,
  },
  bottomSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 50,
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
