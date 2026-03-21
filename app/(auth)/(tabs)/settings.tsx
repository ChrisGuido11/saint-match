import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ToastAndroid,
  Platform,
  Linking,
  Share,
  Switch,
} from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { router } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { Typography, FontFamily } from '../../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../../constants/spacing';
import { useApp } from '../../../context/AppContext';
import { clearAllData, getNotificationPreferences, setNotificationPreferences } from '../../../lib/storage';
import { resetAllData } from '../../../lib/streak';
import { resetProStatus, restorePurchases } from '../../../lib/purchases';
import { PaywallBottomSheet } from '../../../components/PaywallBottomSheet';
import { signOut, isSupabaseConfigured, deleteUserAccount, supabase } from '../../../lib/supabase';
import { requestNotificationPermission, scheduleDailyReminder, cancelDailyReminder } from '../../../lib/notifications';
import * as Notifications from 'expo-notifications';
import { LinkAccountModal } from '../../../components/LinkAccountModal';
import { NotificationSettingsModal } from '../../../components/NotificationSettingsModal';
import { IconChevron } from '../../../components/icons';
import { NotificationPreferences } from '../../../types';
import { isHapticEnabled, setHapticPreference, loadHapticPreference } from '../../../lib/haptics';

function showToast(message: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('Info', message);
  }
}

interface SettingRowProps {
  label: string;
  subtitle?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  destructive?: boolean;
  rightText?: string;
}

function SettingRow({ label, subtitle, onPress, onLongPress, destructive, rightText }: SettingRowProps) {
  return (
    <TouchableOpacity style={styles.settingRow} onPress={onPress} onLongPress={onLongPress} activeOpacity={onPress ? 0.7 : 1} disabled={!onPress && !onLongPress} accessibilityRole="button" accessibilityLabel={`${label}${subtitle ? ` — ${subtitle}` : ''}`}>
      <View style={styles.settingContent}>
        <Text style={[styles.settingLabel, destructive && styles.settingLabelDestructive]}>
          {label}
        </Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightText ? (
        <Text style={styles.settingRight}>{rightText}</Text>
      ) : (
        <IconChevron size={20} color={Colors.charcoalSubtle} />
      )}
    </TouchableOpacity>
  );
}

const DEFAULT_PREFS: NotificationPreferences = {
  dailyReminderEnabled: true,
  dailyReminderHour: 8,
  dailyReminderMinute: 30,
  novenaReminderEnabled: false,
};

function formatReminderTime(hour: number, minute: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return minute === 0 ? `${displayHour}:00 ${period}` : `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
}

export default function SettingsScreen() {
  const { refreshAll, session, isPro, displayEmail, setIsPro } = useApp();
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [notifPrefs, setNotifPrefs] = useState<NotificationPreferences>(DEFAULT_PREFS);
  const [hapticOn, setHapticOn] = useState(true);
  const userEmail = displayEmail;

  useEffect(() => {
    getNotificationPreferences().then(setNotifPrefs);
    loadHapticPreference().then(setHapticOn);
  }, []);

  const handleToggleHaptic = async (value: boolean) => {
    setHapticOn(value);
    await setHapticPreference(value);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'I\'ve been using Saint Match to grow in virtue with daily challenges inspired by the saints. Check it out! https://saint-match.lovable.app',
      });
    } catch {
      // User cancelled or share failed
    }
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://saint-match.lovable.app/privacy');
  };

  const handleTerms = () => {
    Linking.openURL('https://saint-match.lovable.app/terms');
  };

  const handleSupport = () => {
    Linking.openURL('https://saint-match.lovable.app/support');
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'You will be signed out of your account. Your local data will remain on this device.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          onPress: async () => {
            try {
              await resetProStatus();
              await signOut();
              router.replace('/(public)/welcome');
            } catch (error) {
              if (__DEV__) console.error('Error signing out:', error);
              showToast('Could not sign out. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete all your data including streaks, novenas, and Virtue Portfolio. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Delete from Supabase first (if configured)
              if (isSupabaseConfigured()) {
                await deleteUserAccount();
              }
              // Cancel all scheduled notifications
              await Notifications.cancelAllScheduledNotificationsAsync();
              // Then clear local data
              await clearAllData();
              await resetAllData();
              await resetProStatus();
              router.replace('/(public)/welcome');
            } catch (error) {
              if (__DEV__) console.error('Error deleting account:', error);
              showToast(error instanceof Error ? error.message : 'Error deleting account. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleNotifications = () => {
    setShowNotifModal(true);
  };

  const handleSaveNotifPrefs = async (prefs: NotificationPreferences) => {
    setShowNotifModal(false);

    // Persist to storage
    await setNotificationPreferences(prefs);
    setNotifPrefs(prefs);

    // Schedule or cancel daily reminder
    if (prefs.dailyReminderEnabled) {
      const granted = await requestNotificationPermission();
      if (granted) {
        await scheduleDailyReminder(prefs.dailyReminderHour, prefs.dailyReminderMinute);
      } else {
        Alert.alert(
          'Notifications Disabled',
          'Saint Match needs notification permission to send reminders. Please enable it in Settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openURL('app-settings:') },
          ]
        );
      }
    } else {
      await cancelDailyReminder();
    }

    showToast('Notification settings saved');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </Animated.View>

      {/* Account section */}
      <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.section}>
        <Text style={styles.sectionTitle}>ACCOUNT</Text>
        <View style={styles.sectionCard}>
          <SettingRow
            label="Notifications"
            subtitle={
              notifPrefs.dailyReminderEnabled
                ? `Daily reminder at ${formatReminderTime(notifPrefs.dailyReminderHour, notifPrefs.dailyReminderMinute)}`
                : 'Notifications off'
            }
            onPress={handleNotifications}
          />
          {isSupabaseConfigured() && (
            <>
              <View style={styles.divider} />
              <SettingRow
                label="Link Account"
                subtitle={userEmail ? userEmail : 'Add email for cross-device sync'}
                onPress={() => {
                  if (userEmail) {
                    showToast('Account linked to ' + userEmail);
                  } else {
                    setShowLinkModal(true);
                  }
                }}
                rightText={userEmail ? 'Linked' : 'Add Email'}
              />
            </>
          )}
        </View>
      </Animated.View>

      {/* Preferences section */}
      <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.section}>
        <Text style={styles.sectionTitle}>PREFERENCES</Text>
        <View style={styles.sectionCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Haptic Feedback</Text>
              <Text style={styles.settingSubtitle}>Vibration on taps and actions</Text>
            </View>
            <Switch
              value={hapticOn}
              onValueChange={handleToggleHaptic}
              trackColor={{ false: Colors.creamDark, true: Colors.sageLight }}
              thumbColor={hapticOn ? Colors.sage : Colors.charcoalSubtle}
            />
          </View>
        </View>
      </Animated.View>

      {/* Subscription section */}
      <Animated.View entering={FadeInDown.delay(250).duration(400)} style={styles.section}>
        <Text style={styles.sectionTitle}>SUBSCRIPTION</Text>
        <View style={styles.sectionCard}>
          {isPro ? (
            <>
              <SettingRow
                label="Saint Match Pro"
                subtitle="Unlimited matches & novenas"
                rightText="Active"
                onLongPress={() => {
                  Alert.alert(
                    'Reset Pro Status?',
                    'This will reset your pro subscription for testing. If you have an active subscription, it will be restored on next app launch.',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Reset',
                        style: 'destructive',
                        onPress: async () => {
                          try {
                            await resetProStatus();
                            if (isSupabaseConfigured() && session?.user?.id) {
                              await supabase
                                .from('profiles')
                                .update({ is_pro: false })
                                .eq('id', session.user.id);
                            }
                            setIsPro(false);
                            showToast('Pro status reset');
                          } catch {
                            showToast('Failed to reset pro status');
                          }
                        },
                      },
                    ]
                  );
                }}
              />
              <View style={styles.divider} />
              <SettingRow
                label="Manage Subscription"
                onPress={() => Linking.openURL('https://apps.apple.com/account/subscriptions')}
              />
            </>
          ) : (
            <>
              <SettingRow
                label="Upgrade to Pro"
                subtitle="Unlimited matches, novenas & PDF export"
                onPress={() => setShowPaywall(true)}
              />
              <View style={styles.divider} />
              <SettingRow
                label="Restore Purchases"
                onPress={async () => {
                  const success = await restorePurchases();
                  if (success) {
                    refreshAll();
                    Alert.alert('Restored', 'Your Pro subscription has been restored.');
                  } else {
                    Alert.alert('No purchases found', 'We could not find any previous purchases to restore.');
                  }
                }}
              />
            </>
          )}
        </View>
      </Animated.View>

      {/* Support section */}
      <Animated.View entering={FadeInDown.delay(350).duration(400)} style={styles.section}>
        <Text style={styles.sectionTitle}>SUPPORT</Text>
        <View style={styles.sectionCard}>
          <SettingRow label="Share with a Friend" subtitle="Spread the word" onPress={handleShare} />
          <View style={styles.divider} />
          <SettingRow label="Support & FAQ" onPress={handleSupport} />
          <View style={styles.divider} />
          <SettingRow label="Privacy Policy" onPress={handlePrivacyPolicy} />
          <View style={styles.divider} />
          <SettingRow label="Terms of Service" onPress={handleTerms} />
        </View>
      </Animated.View>

      {/* Data section — only visible when a real account exists */}
      {userEmail && (
        <Animated.View entering={FadeInDown.delay(450).duration(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>YOUR DATA</Text>
          <View style={styles.sectionCard}>
            <SettingRow
              label="Sign Out"
              subtitle={userEmail}
              onPress={handleSignOut}
            />
            <View style={styles.divider} />
            <SettingRow
              label="Delete Account"
              subtitle="Permanently delete all data"
              onPress={handleDeleteAccount}
              destructive
            />
          </View>
        </Animated.View>
      )}

      {/* App info */}
      <Animated.View entering={FadeIn.delay(550).duration(400)} style={styles.appInfo}>
        <Text style={styles.appName}>Saint Match</Text>
        <Text style={styles.appVersion}>Version 1.1.0</Text>
        <Text style={styles.appTagline}>Daily virtue challenges from the saints</Text>
      </Animated.View>

      <NotificationSettingsModal
        visible={showNotifModal}
        onClose={() => setShowNotifModal(false)}
        onSave={handleSaveNotifPrefs}
        initialPrefs={notifPrefs}
      />

      <LinkAccountModal
        visible={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        onSuccess={(email, mode) => {
          setShowLinkModal(false);
          refreshAll();
          showToast(
            mode === 'signin'
              ? 'Signed in! Your progress has been restored.'
              : 'Account linked successfully!'
          );
        }}
      />

      <PaywallBottomSheet
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        reason="upgrade"
        onPurchaseSuccess={() => {
          setShowPaywall(false);
          setIsPro(true);
          showToast('Pro unlocked! Enjoy unlimited matches and novenas.');
          refreshAll();
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: 120,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h1,
    color: Colors.charcoal,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.label,
    color: Colors.charcoalMuted,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xxs,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.card,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    minHeight: 48,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    ...Typography.body,
    color: Colors.charcoal,
    fontFamily: FontFamily.sansMedium,
  },
  settingLabelDestructive: {
    color: Colors.error,
  },
  settingSubtitle: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
    marginTop: 2,
  },
  settingRight: {
    ...Typography.buttonSmall,
    color: Colors.terracotta,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.creamDark,
    marginLeft: Spacing.md,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  appName: {
    ...Typography.h3,
    color: Colors.charcoalMuted,
  },
  appVersion: {
    ...Typography.caption,
    color: Colors.charcoalSubtle,
    marginTop: 4,
  },
  appTagline: {
    ...Typography.bodySmall,
    color: Colors.charcoalSubtle,
    marginTop: 2,
    fontStyle: 'italic',
  },
});
