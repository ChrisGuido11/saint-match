import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Typography, FontFamily } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/(public)/onboarding');
  };

  return (
    <View style={styles.container}>
      {/* Decorative background elements */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />
      <View style={styles.bgCircle3} />

      {/* Logo section */}
      <View style={styles.content}>
        <Animated.View entering={FadeIn.delay(200).duration(800)} style={styles.logoSection}>
          <View style={styles.logoWrapper}>
            <View style={styles.haloOuter}>
              <LinearGradient
                colors={[Colors.sage, Colors.sageDark]}
                style={styles.haloInner}
              >
                <View style={styles.flameContainer}>
                  <View style={styles.flame} />
                  <View style={styles.flameSmall} />
                </View>
              </LinearGradient>
            </View>
            {/* Decorative halo ring */}
            <View style={styles.haloDecoration} />
          </View>
        </Animated.View>

        <Animated.Text entering={FadeInDown.delay(400).duration(600)} style={styles.title}>
          Saint Match
        </Animated.Text>

        <Animated.Text entering={FadeInDown.delay(550).duration(600)} style={styles.tagline}>
          Daily virtue challenges{'\n'}from the saints
        </Animated.Text>

        <Animated.Text entering={FadeInDown.delay(700).duration(600)} style={styles.description}>
          It's Duolingo for becoming a better person {'\u{2014}'} match with a saint, accept a
          micro-challenge, and watch your virtues grow.
        </Animated.Text>
      </View>

      {/* Bottom CTA */}
      <Animated.View entering={FadeInDown.delay(900).duration(600)} style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={handleGetStarted}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Get Started</Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          For Catholics seeking daily virtue growth
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
    paddingHorizontal: Spacing.lg,
  },
  bgCircle1: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: Colors.sageMuted,
    opacity: 0.5,
  },
  bgCircle2: {
    position: 'absolute',
    bottom: 120,
    left: -100,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: Colors.terracottaMuted,
    opacity: 0.3,
  },
  bgCircle3: {
    position: 'absolute',
    top: '40%',
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.sageSubtle,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  logoSection: {
    marginBottom: Spacing.xl,
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  haloOuter: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: Colors.sageLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  haloInner: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  haloDecoration: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: Colors.sageMuted,
    borderStyle: 'dashed',
  },
  flameContainer: {
    alignItems: 'center',
  },
  flame: {
    width: 20,
    height: 32,
    borderRadius: 10,
    backgroundColor: Colors.terracotta,
  },
  flameSmall: {
    width: 10,
    height: 16,
    borderRadius: 5,
    backgroundColor: Colors.terracottaLight,
    marginTop: -10,
  },
  title: {
    ...Typography.heroTitle,
    color: Colors.charcoal,
    textAlign: 'center',
    fontSize: 44,
    lineHeight: 50,
  },
  tagline: {
    ...Typography.h2,
    color: Colors.charcoalLight,
    textAlign: 'center',
    marginTop: Spacing.sm,
    lineHeight: 34,
  },
  description: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.md,
    lineHeight: 24,
  },
  bottomSection: {
    paddingBottom: 50,
    alignItems: 'center',
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
    fontSize: 18,
  },
  footerNote: {
    ...Typography.bodySmall,
    color: Colors.charcoalSubtle,
    marginTop: Spacing.md,
  },
});
