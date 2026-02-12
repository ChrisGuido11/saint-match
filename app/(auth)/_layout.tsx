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
        name="celebration"
        options={{ animation: 'fade', gestureEnabled: false }}
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
        name="choose-intention"
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="browse-novenas"
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="novena-celebration"
        options={{ animation: 'fade', gestureEnabled: false }}
      />
      <Stack.Screen
        name="novena-complete"
        options={{ animation: 'fade', gestureEnabled: false }}
      />
    </Stack>
  );
}
