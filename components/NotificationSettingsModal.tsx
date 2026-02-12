import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Switch,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  type SharedValue,
} from 'react-native-reanimated';
import { Colors } from '../constants/colors';
import { Typography, FontFamily } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';
import { NotificationPreferences } from '../types';

// --- Wheel Picker ---

const ITEM_HEIGHT = 44;
const VISIBLE_COUNT = 3;

const HOURS = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
const MINUTES = Array.from({ length: 12 }, (_, i) =>
  (i * 5).toString().padStart(2, '0'),
);
const PERIODS = ['AM', 'PM'];

function to12h(hour24: number, minute: number) {
  const periodIdx = hour24 >= 12 ? 1 : 0;
  const h12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
  return {
    hourIdx: h12 - 1,
    minIdx: Math.min(Math.round(minute / 5), 11),
    periodIdx,
  };
}

function to24h(hourIdx: number, minIdx: number, periodIdx: number) {
  const h12 = hourIdx + 1;
  let hour: number;
  if (periodIdx === 0) {
    hour = h12 === 12 ? 0 : h12;
  } else {
    hour = h12 === 12 ? 12 : h12 + 12;
  }
  return { hour, minute: minIdx * 5 };
}

function WheelItem({
  label,
  index,
  scrollY,
}: {
  label: string;
  index: number;
  scrollY: SharedValue<number>;
}) {
  const style = useAnimatedStyle(() => {
    const center = index * ITEM_HEIGHT;
    const opacity = interpolate(
      scrollY.value,
      [center - ITEM_HEIGHT * 1.5, center, center + ITEM_HEIGHT * 1.5],
      [0.15, 1, 0.15],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      scrollY.value,
      [center - ITEM_HEIGHT, center, center + ITEM_HEIGHT],
      [0.8, 1, 0.8],
      Extrapolation.CLAMP,
    );
    return { opacity, transform: [{ scale }] };
  });

  return (
    <Animated.View style={[wheelStyles.item, style]}>
      <Text style={wheelStyles.itemText}>{label}</Text>
    </Animated.View>
  );
}

function WheelPicker({
  items,
  initialIndex,
  onIndexChange,
  width: pickerWidth = 60,
}: {
  items: string[];
  initialIndex: number;
  onIndexChange: (index: number) => void;
  width?: number;
}) {
  const scrollY = useSharedValue(initialIndex * ITEM_HEIGHT);
  const ref = useRef<ScrollView>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      (ref.current as any)?.scrollTo?.({
        y: initialIndex * ITEM_HEIGHT,
        animated: false,
      });
      scrollY.value = initialIndex * ITEM_HEIGHT;
    }, 50);
    return () => clearTimeout(t);
  }, [initialIndex, scrollY]);

  const handler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const onEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const idx = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
      onIndexChange(Math.max(0, Math.min(idx, items.length - 1)));
    },
    [items.length, onIndexChange],
  );

  return (
    <View
      style={[
        wheelStyles.container,
        { width: pickerWidth, height: ITEM_HEIGHT * VISIBLE_COUNT },
      ]}
    >
      <View style={wheelStyles.highlight} />
      <Animated.ScrollView
        ref={ref as any}
        onScroll={handler}
        scrollEventThrottle={16}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={onEnd}
        contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
        nestedScrollEnabled
      >
        {items.map((item, i) => (
          <WheelItem key={i} label={item} index={i} scrollY={scrollY} />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const wheelStyles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  highlight: {
    position: 'absolute',
    top: ITEM_HEIGHT,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    backgroundColor: Colors.sageMuted,
    borderRadius: BorderRadius.sm,
    zIndex: 0,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    ...Typography.h3,
    color: Colors.charcoal,
  },
});

// --- Modal ---

interface NotificationSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (prefs: NotificationPreferences) => void;
  initialPrefs: NotificationPreferences;
}

export function NotificationSettingsModal({
  visible,
  onClose,
  onSave,
  initialPrefs,
}: NotificationSettingsModalProps) {
  const [dailyEnabled, setDailyEnabled] = useState(initialPrefs.dailyReminderEnabled);
  const [novenaEnabled, setNovenaEnabled] = useState(initialPrefs.novenaReminderEnabled);

  const init = to12h(initialPrefs.dailyReminderHour, initialPrefs.dailyReminderMinute);
  const [hourIdx, setHourIdx] = useState(init.hourIdx);
  const [minIdx, setMinIdx] = useState(init.minIdx);
  const [periodIdx, setPeriodIdx] = useState(init.periodIdx);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (visible) {
      const i = to12h(initialPrefs.dailyReminderHour, initialPrefs.dailyReminderMinute);
      setHourIdx(i.hourIdx);
      setMinIdx(i.minIdx);
      setPeriodIdx(i.periodIdx);
      setDailyEnabled(initialPrefs.dailyReminderEnabled);
      setNovenaEnabled(initialPrefs.novenaReminderEnabled);
      setResetKey((k) => k + 1);
    }
  }, [visible, initialPrefs]);

  const handleSave = () => {
    const { hour, minute } = to24h(hourIdx, minIdx, periodIdx);
    onSave({
      dailyReminderEnabled: dailyEnabled,
      dailyReminderHour: hour,
      dailyReminderMinute: minute,
      novenaReminderEnabled: novenaEnabled,
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        <View style={styles.container}>
          <Text style={styles.title}>Notification Settings</Text>

          {/* Daily Reminder */}
          <View style={styles.section}>
            <View style={styles.toggleRow}>
              <Text style={styles.settingLabel}>Daily Reminder</Text>
              <Switch
                value={dailyEnabled}
                onValueChange={setDailyEnabled}
                trackColor={{ false: Colors.creamDark, true: Colors.sageLight }}
                thumbColor={dailyEnabled ? Colors.sage : Colors.charcoalSubtle}
              />
            </View>

            {dailyEnabled && (
              <View style={styles.pickerRow}>
                <WheelPicker
                  key={`h-${resetKey}`}
                  items={HOURS}
                  initialIndex={hourIdx}
                  onIndexChange={setHourIdx}
                  width={54}
                />
                <Text style={styles.colon}>:</Text>
                <WheelPicker
                  key={`m-${resetKey}`}
                  items={MINUTES}
                  initialIndex={minIdx}
                  onIndexChange={setMinIdx}
                  width={54}
                />
                <WheelPicker
                  key={`p-${resetKey}`}
                  items={PERIODS}
                  initialIndex={periodIdx}
                  onIndexChange={setPeriodIdx}
                  width={54}
                />
              </View>
            )}
          </View>

          <View style={styles.divider} />

          {/* Novena Reminder */}
          <View style={styles.section}>
            <View style={styles.toggleRow}>
              <Text style={styles.settingLabel}>Novena Reminders</Text>
              <Switch
                value={novenaEnabled}
                onValueChange={setNovenaEnabled}
                trackColor={{ false: Colors.creamDark, true: Colors.sageLight }}
                thumbColor={novenaEnabled ? Colors.sage : Colors.charcoalSubtle}
              />
            </View>
            <Text style={styles.settingDescription}>
              Daily reminders at noon for your active novenas
            </Text>
          </View>

          {/* Actions */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Save notification settings"
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            style={styles.cancelButton}
            accessibilityRole="button"
            accessibilityLabel="Cancel"
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    width: '85%',
    maxWidth: 400,
    ...Shadows.card,
  },
  title: {
    ...Typography.h2,
    color: Colors.charcoal,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.sm,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabel: {
    ...Typography.body,
    color: Colors.charcoal,
    fontFamily: FontFamily.sansMedium,
  },
  settingDescription: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
    marginTop: Spacing.xxs,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
    gap: 2,
  },
  colon: {
    ...Typography.h3,
    color: Colors.charcoal,
    marginHorizontal: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.creamDark,
    marginVertical: Spacing.sm,
  },
  saveButton: {
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm + 2,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  saveButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    marginTop: Spacing.xs,
  },
  cancelText: {
    ...Typography.body,
    color: Colors.charcoalMuted,
  },
});
