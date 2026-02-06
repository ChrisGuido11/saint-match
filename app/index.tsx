import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useApp } from '../context/AppContext';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { IconLogo } from '../components/icons/IconLogo';

export default function SplashRedirect() {
  const { isLoading, isOnboarded } = useApp();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        if (isOnboarded) {
          router.replace('/(auth)/(tabs)');
        } else {
          router.replace('/(public)/welcome');
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isOnboarded]);

  return (
    <Animated.View entering={FadeIn.duration(600)} exiting={FadeOut.duration(300)} style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={{ marginBottom: 24 }}>
          <IconLogo size={80} />
        </View>
        <Text style={styles.title}>Saint Match</Text>
        <Text style={styles.tagline}>Daily virtue challenges from the saints</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  title: {
    ...Typography.heroTitle,
    color: Colors.charcoal,
  },
  tagline: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    marginTop: 8,
  },
});
