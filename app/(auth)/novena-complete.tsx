import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, {
  FadeIn,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Typography, FontFamily } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { ConfettiAnimation } from '../../components/ConfettiAnimation';
import { useApp } from '../../context/AppContext';
import { SAINTS } from '../../constants/saints';
import { IconNavNovenas } from '../../components/icons';
import { NOVENAS } from '../../constants/novenas';

export default function NovenaCompleteScreen() {
  const { userNovenaId } = useLocalSearchParams<{ userNovenaId: string }>();
  const { userNovenas, saveNovenaReflection } = useApp();

  const userNovena = userNovenas.find((n) => n.id === userNovenaId);
  const saint = userNovena ? SAINTS.find((s) => s.id === userNovena.saintId) : null;
  const saintName = saint?.name ?? userNovena?.saintName ?? 'Saint';

  const [showConfetti, setShowConfetti] = useState(true);
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState(false);

  const iconScale = useSharedValue(0);

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    iconScale.value = withDelay(
      100,
      withSequence(
        withSpring(1.1, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 12 })
      )
    );
  }, []);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const handleSaveReflection = async () => {
    if (!userNovena || !reflection.trim()) return;
    await saveNovenaReflection(userNovena.id, reflection.trim());
    setSaved(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleStartAnother = () => {
    const firstNovena = NOVENAS[0];
    router.replace({
      pathname: '/(auth)/start-novena',
      params: { novenaId: firstNovena.id, saintId: firstNovena.saintId },
    });
  };

  const handleGoHome = () => {
    router.replace('/(auth)/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {showConfetti && <ConfettiAnimation count={50} onFinish={() => setShowConfetti(false)} />}

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View style={[styles.iconContainer, iconStyle]}>
          <IconNavNovenas size={80} color={Colors.sage} />
        </Animated.View>

        <Animated.View entering={FadeIn.delay(400).duration(500)}>
          <Text style={styles.title}>Novena Complete!</Text>
          <Text style={styles.saintName}>{saintName}</Text>
          {userNovena?.personalIntention ? (
            <Text style={styles.intention}>
              "{userNovena.personalIntention}"
            </Text>
          ) : null}
        </Animated.View>

        <Animated.View entering={FadeIn.delay(600).duration(500)} style={styles.reflectionSection}>
          <Text style={styles.reflectionLabel}>Reflection (optional)</Text>
          <TextInput
            style={styles.reflectionInput}
            placeholder="How has this novena touched your heart?"
            placeholderTextColor={Colors.charcoalSubtle}
            value={reflection}
            onChangeText={setReflection}
            multiline
            maxLength={500}
            editable={!saved}
            accessibilityLabel="Novena reflection"
          />
          {!saved && reflection.trim().length > 0 && (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveReflection}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Save reflection"
            >
              <Text style={styles.saveButtonText}>Save Reflection</Text>
            </TouchableOpacity>
          )}
          {saved && (
            <Text style={styles.savedText}>Reflection saved</Text>
          )}
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(800).duration(500)} style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.anotherButton}
            onPress={handleStartAnother}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Start another novena"
          >
            <Text style={styles.anotherButtonText}>Start Another Novena</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={handleGoHome}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Back to home"
          >
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: 60,
    paddingBottom: Spacing.xl,
  },
  iconContainer: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h1,
    color: Colors.charcoal,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  saintName: {
    ...Typography.saintName,
    color: Colors.sage,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  intention: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: Spacing.lg,
  },
  reflectionSection: {
    width: '100%',
    maxWidth: 340,
  },
  reflectionLabel: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
    marginBottom: Spacing.xs,
  },
  reflectionInput: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    ...Typography.body,
    color: Colors.charcoal,
    borderWidth: 1,
    borderColor: Colors.creamDark,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: Spacing.sm,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.sage,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  saveButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
  savedText: {
    ...Typography.bodySmall,
    color: Colors.sage,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  bottomSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.safeBottom,
    gap: Spacing.sm,
  },
  anotherButton: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.button,
  },
  anotherButtonText: {
    ...Typography.buttonLarge,
    color: Colors.white,
  },
  homeButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.creamDark,
  },
  homeButtonText: {
    ...Typography.button,
    color: Colors.charcoalMuted,
  },
});
