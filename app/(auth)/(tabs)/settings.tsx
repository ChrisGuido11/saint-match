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
import { resetProStatus } from '../../../lib/purchases';
import { signOut, isSupabaseConfigured, deleteUserAccount } from '../../../lib/supabase';
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
  onPress: () => void;
  destructive?: boolean;
  rightText?: string;
}

function SettingRow({ label, subtitle, onPress, destructive, rightText }: SettingRowProps) {
  return (
    <TouchableOpacity style={styles.settingRow} onPress={onPress} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel={`${label}${subtitle ? ` — ${subtitle}` : ''}`}>
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
  const { refreshAll, session } = useApp();
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [notifPrefs, setNotifPrefs] = useState<NotificationPreferences>(DEFAULT_PREFS);
  const [hapticOn, setHapticOn] = useState(true);
  const userEmail = session?.user?.email;

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
              await signOut();
              router.replace('/(public)/welcome');
            } catch (error) {
              console.error('Error signing out:', error);
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
      'Are you sure? This will permanently delete all your data including streaks and Virtue Portfolio.',
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
              console.error('Error deleting account:', error);
              showToast('Error deleting account. Please try again.');
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
        showToast('Please enable notifications in your device settings.');
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

      {/* Support section */}
      <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.section}>
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

      {/* Data section */}
      <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.section}>
        <Text style={styles.sectionTitle}>YOUR DATA</Text>
        <View style={styles.sectionCard}>
          {userEmail && (
            <>
              <SettingRow
                label="Sign Out"
                subtitle={userEmail}
                onPress={handleSignOut}
              />
              <View style={styles.divider} />
            </>
          )}
          <SettingRow
            label="Delete Account"
            subtitle="Permanently delete all data"
            onPress={handleDeleteAccount}
            destructive
          />
        </View>
      </Animated.View>

      {/* App info */}
      <Animated.View entering={FadeIn.delay(600).duration(400)} style={styles.appInfo}>
        <Text style={styles.appName}>Saint Match</Text>
        <Text style={styles.appVersion}>Version 1.0.0</Text>
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
        onSuccess={(email) => {
          setShowLinkModal(false);
          refreshAll();
          showToast('Account linked successfully!');
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
