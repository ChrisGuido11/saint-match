import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@saint_match_haptic_enabled';
let _enabled = true;

export async function loadHapticPreference(): Promise<boolean> {
  try {
    const val = await AsyncStorage.getItem(KEY);
    _enabled = val !== 'false';
  } catch {
    _enabled = true;
  }
  return _enabled;
}

export async function setHapticPreference(enabled: boolean): Promise<void> {
  _enabled = enabled;
  await AsyncStorage.setItem(KEY, enabled ? 'true' : 'false');
}

export function isHapticEnabled(): boolean {
  return _enabled;
}

export function hapticImpact(style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) {
  if (_enabled) Haptics.impactAsync(style);
}

export function hapticNotification(type: Haptics.NotificationFeedbackType = Haptics.NotificationFeedbackType.Success) {
  if (_enabled) Haptics.notificationAsync(type);
}

export function hapticSelection() {
  if (_enabled) Haptics.selectionAsync();
}

export { ImpactFeedbackStyle, NotificationFeedbackType } from 'expo-haptics';
