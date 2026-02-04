import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { Colors } from '../constants/colors';
import { Typography, FontFamily } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';
import { purchasePro, restorePurchases } from '../lib/purchases';

interface PaywallBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onPurchaseSuccess: () => void;
  streakAtRisk?: number;
}

export function PaywallBottomSheet({
  visible,
  onClose,
  onPurchaseSuccess,
  streakAtRisk,
}: PaywallBottomSheetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');

  const handlePurchase = async () => {
    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      const identifier = selectedPlan === 'annual' ? 'pro_annual' : 'pro_monthly';
      const success = await purchasePro(identifier);
      if (success) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        onPurchaseSuccess();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async () => {
    setIsLoading(true);
    try {
      const success = await restorePurchases();
      if (success) {
        onPurchaseSuccess();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent>
      <Animated.View entering={FadeIn.duration(300)} style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <Animated.View entering={SlideInDown.duration(400).springify()} style={styles.sheet}>
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Header */}
          <Text style={styles.headerEmoji}>{'\u{2728}'}</Text>
          <Text style={styles.title}>
            {streakAtRisk
              ? `Protect your ${streakAtRisk}-day streak!`
              : "You've used all 3 free saint matches this week"}
          </Text>
          <Text style={styles.subtitle}>
            Keep your momentum going! Unlock unlimited daily saint matches, full Virtue Portfolio
            analytics, and streak protection with Pro.
          </Text>

          {/* Plan selection */}
          <View style={styles.plansContainer}>
            <TouchableOpacity
              style={[styles.planCard, selectedPlan === 'annual' && styles.planCardSelected]}
              onPress={() => setSelectedPlan('annual')}
              activeOpacity={0.8}
            >
              <View style={styles.saveBadge}>
                <Text style={styles.saveBadgeText}>SAVE 17%</Text>
              </View>
              <Text style={styles.planName}>Yearly</Text>
              <Text style={styles.planPrice}>$79/yr</Text>
              <Text style={styles.planPriceMonthly}>$6.58/mo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.planCard, selectedPlan === 'monthly' && styles.planCardSelected]}
              onPress={() => setSelectedPlan('monthly')}
              activeOpacity={0.8}
            >
              <Text style={styles.planName}>Monthly</Text>
              <Text style={styles.planPrice}>$7.99/mo</Text>
              <Text style={styles.planPriceMonthly}>billed monthly</Text>
            </TouchableOpacity>
          </View>

          {/* Features */}
          <View style={styles.features}>
            {[
              'Unlimited daily saint matches',
              'Full Virtue Portfolio analytics',
              'Weekly streak freeze protection',
              'PDF export for spiritual director',
            ].map((feature) => (
              <View key={feature} style={styles.featureRow}>
                <Text style={styles.featureCheck}>{'\u{2713}'}</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* CTA */}
          <TouchableOpacity
            style={[styles.ctaButton, isLoading && styles.ctaButtonDisabled]}
            onPress={handlePurchase}
            disabled={isLoading}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.ctaText}>
                {selectedPlan === 'annual'
                  ? 'Upgrade to Pro \u{2014} $79/yr'
                  : 'Upgrade to Pro \u{2014} $7.99/mo'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Restore */}
          <TouchableOpacity onPress={handleRestore} style={styles.restoreButton}>
            <Text style={styles.restoreText}>Restore Purchases</Text>
          </TouchableOpacity>

          {/* Dismiss */}
          <TouchableOpacity onPress={onClose} style={styles.dismissButton}>
            <Text style={styles.dismissText}>Maybe Later</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.overlay,
  },
  sheet: {
    backgroundColor: Colors.cream,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xxl,
    alignItems: 'center',
  },
  handleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.charcoalSubtle,
    marginBottom: Spacing.lg,
  },
  headerEmoji: {
    fontSize: 40,
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.h3,
    color: Colors.charcoal,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 22,
  },
  plansContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    width: '100%',
    marginBottom: Spacing.lg,
  },
  planCard: {
    flex: 1,
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.creamDark,
    alignItems: 'center',
  },
  planCardSelected: {
    borderColor: Colors.terracotta,
    backgroundColor: 'rgba(212, 115, 94, 0.04)',
  },
  saveBadge: {
    position: 'absolute',
    top: -10,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.sm,
  },
  saveBadgeText: {
    ...Typography.caption,
    color: Colors.white,
    fontFamily: FontFamily.sansBold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  planName: {
    ...Typography.buttonSmall,
    color: Colors.charcoalMuted,
    marginTop: Spacing.xs,
  },
  planPrice: {
    fontFamily: FontFamily.sansBold,
    fontSize: 22,
    color: Colors.charcoal,
    marginTop: Spacing.xxs,
  },
  planPriceMonthly: {
    ...Typography.caption,
    color: Colors.charcoalMuted,
    marginTop: 2,
  },
  features: {
    width: '100%',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  featureCheck: {
    fontSize: 16,
    color: Colors.sage,
    fontWeight: '700',
  },
  featureText: {
    ...Typography.body,
    color: Colors.charcoalLight,
  },
  ctaButton: {
    width: '100%',
    paddingVertical: Spacing.md,
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.button,
  },
  ctaButtonDisabled: {
    opacity: 0.7,
  },
  ctaText: {
    ...Typography.button,
    color: Colors.white,
  },
  restoreButton: {
    marginTop: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  restoreText: {
    ...Typography.bodySmall,
    color: Colors.sage,
    textDecorationLine: 'underline',
  },
  dismissButton: {
    marginTop: Spacing.xxs,
    paddingVertical: Spacing.xs,
  },
  dismissText: {
    ...Typography.bodySmall,
    color: Colors.charcoalSubtle,
  },
});
