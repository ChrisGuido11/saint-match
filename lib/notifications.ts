import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermission(): Promise<boolean> {
  if (!Device.isDevice) {
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Saint Match',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  return true;
}

export async function scheduleDailyReminder(hour: number = 8, minute: number = 30): Promise<void> {
  // Cancel existing daily reminders
  await cancelDailyReminder();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Time for today\'s challenge',
      body: 'A saint is waiting to walk with you today',
      data: { type: 'daily_reminder' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
}

export async function scheduleStreakAlert(streakCount: number): Promise<void> {
  // Cancel existing streak alerts
  await cancelStreakAlert();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Your streak is at risk!',
      body: `Your ${streakCount}-day streak is at risk! Complete today's challenge before midnight.`,
      data: { type: 'streak_alert' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 20,
      minute: 0,
    },
  });
}

export async function cancelDailyReminder(): Promise<void> {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  for (const notification of scheduled) {
    if (notification.content.data?.type === 'daily_reminder') {
      await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    }
  }
}

export async function cancelStreakAlert(): Promise<void> {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  for (const notification of scheduled) {
    if (notification.content.data?.type === 'streak_alert') {
      await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    }
  }
}

// Novena reminders
export async function scheduleNovenaReminders(
  userNovena: { id: string; currentDay: number },
  saintName: string
): Promise<void> {
  const remainingDays = 9 - userNovena.currentDay + 1;

  for (let i = 0; i < remainingDays; i++) {
    const day = userNovena.currentDay + i;
    const triggerDate = new Date();
    triggerDate.setDate(triggerDate.getDate() + i);
    triggerDate.setHours(12, 0, 0, 0);

    // Don't schedule past notifications
    if (triggerDate <= new Date()) continue;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Day ${day} of 9 — ${saintName}`,
        body: day === 9 ? 'Your final day awaits' : `${saintName} intercedes for you today`,
        data: { type: 'novena_reminder', userNovenaId: userNovena.id, day },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerDate,
      },
    });
  }
}

// Traditional novena start reminders (local date trigger, no push provider).
// TODO: When an Expo push channel is set up for production, the seasonal
// start reminder could be sent server side instead. Local scheduling needs
// no APNs key and is intentionally the only mechanism for now.
export async function scheduleTraditionalNovenaStartReminder(
  novenaId: string,
  saintName: string,
  startDate: Date,
  hour: number = 9,
  minute: number = 0
): Promise<void> {
  await cancelTraditionalNovenaStartReminder(novenaId);

  const triggerDate = new Date(startDate);
  triggerDate.setHours(hour, minute, 0, 0);
  if (triggerDate <= new Date()) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${saintName} novena starts today`,
      body: 'Open Saint Match to pray day one of the published prayer.',
      data: { type: 'traditional_novena_start', novenaId },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: triggerDate,
    },
  });
}

export async function cancelTraditionalNovenaStartReminder(novenaId: string): Promise<void> {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  for (const notification of scheduled) {
    if (
      notification.content.data?.type === 'traditional_novena_start' &&
      notification.content.data?.novenaId === novenaId
    ) {
      await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    }
  }
}

export async function cancelNovenaNotifications(userNovenaId: string): Promise<void> {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  for (const notification of scheduled) {
    if (
      notification.content.data?.type === 'novena_reminder' &&
      notification.content.data?.userNovenaId === userNovenaId
    ) {
      await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    }
  }
}
