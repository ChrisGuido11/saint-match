import { Stack } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.cream },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="saint-match"
        options={{ animation: 'slide_from_bottom', gestureEnabled: true }}
      />
      <Stack.Screen
        name="active-challenge"
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="celebration"
        options={{ animation: 'fade', gestureEnabled: false }}
      />
      <Stack.Screen
        name="weekly-checkin"
        options={{ animation: 'slide_from_bottom', presentation: 'modal' }}
      />
      <Stack.Screen
        name="start-novena"
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="novena-prayer"
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="novena-complete"
        options={{ animation: 'fade', gestureEnabled: false }}
      />
    </Stack>
  );
}
