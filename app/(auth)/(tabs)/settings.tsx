import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  ToastAndroid,
  Platform,
} from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { router } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { Typography, FontFamily } from '../../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../../constants/spacing';
import { useApp } from '../../../context/AppContext';
import { clearAllData, exportAllData } from '../../../lib/storage';
import { resetAllData } from '../../../lib/streak';
import { resetProStatus, checkProStatus } from '../../../lib/purchases';
import { signOut, isSupabaseConfigured, deleteUserAccount } from '../../../lib/supabase';
import { LinkAccountModal } from '../../../components/LinkAccountModal';
import { documentDirectory, writeAsStringAsync } from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { IconChevron } from '../../../components/icons';

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
    <TouchableOpacity style={styles.settingRow} onPress={onPress} activeOpacity={0.7}>
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

export default function SettingsScreen() {
  const { isPro, setIsPro, refreshAll, session } = useApp();
  const [isExporting, setIsExporting] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const userEmail = session?.user?.email;

  const handlePrivacyPolicy = () => {
    showToast('Link not configured');
  };

  const handleTerms = () => {
    showToast('Link not configured');
  };

  const handleSupport = () => {
    showToast('Link not configured');
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const data = await exportAllData();
      const json = JSON.stringify(data, null, 2);
      const fileUri = documentDirectory + 'saint-match-export.json';
      await writeAsStringAsync(fileUri, json);
      await Sharing.shareAsync(fileUri);
    } catch {
      showToast('Could not export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
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

  const handleManageSubscription = () => {
    if (isPro) {
      // In production, open native subscription management
      showToast('Subscription management opens in App Store/Play Store');
    } else {
      showToast('You are currently on the free plan.');
    }
  };

  const handleNotifications = () => {
    showToast('Notification settings coming soon');
  };

  // Dev mode toggle for pro
  const handleTogglePro = async () => {
    if (isPro) {
      await resetProStatus();
      setIsPro(false);
    } else {
      const { purchasePro } = await import('../../../lib/purchases');
      await purchasePro('pro_monthly');
      setIsPro(true);
    }
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
            label="Subscription"
            subtitle={isPro ? 'Pro Member' : 'Free Plan'}
            onPress={handleManageSubscription}
            rightText={isPro ? 'Manage' : 'Upgrade'}
          />
          <View style={styles.divider} />
          <SettingRow
            label="Notifications"
            subtitle="Daily reminder at 8:30 AM"
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

      {/* Legal section */}
      <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.section}>
        <Text style={styles.sectionTitle}>LEGAL</Text>
        <View style={styles.sectionCard}>
          <SettingRow label="Privacy Policy" onPress={handlePrivacyPolicy} />
          <View style={styles.divider} />
          <SettingRow label="Terms of Service" onPress={handleTerms} />
          <View style={styles.divider} />
          <SettingRow label="Support & FAQ" onPress={handleSupport} />
        </View>
      </Animated.View>

      {/* Data section */}
      <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.section}>
        <Text style={styles.sectionTitle}>YOUR DATA</Text>
        <View style={styles.sectionCard}>
          <SettingRow
            label="Export My Data"
            subtitle="Download all your data as JSON"
            onPress={handleExportData}
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

      {/* Dev mode */}
      <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.section}>
        <Text style={styles.sectionTitle}>DEVELOPER</Text>
        <View style={styles.sectionCard}>
          <SettingRow
            label="Toggle Pro Status"
            subtitle={`Current: ${isPro ? 'Pro' : 'Free'} (dev mode)`}
            onPress={handleTogglePro}
            rightText={isPro ? 'Disable' : 'Enable'}
          />
        </View>
      </Animated.View>

      {/* App info */}
      <Animated.View entering={FadeIn.delay(500).duration(400)} style={styles.appInfo}>
        <Text style={styles.appName}>Saint Match</Text>
        <Text style={styles.appVersion}>Version 1.0.0</Text>
        <Text style={styles.appTagline}>Daily virtue challenges from the saints</Text>
      </Animated.View>

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
    paddingVertical: Spacing.sm + 2,
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
