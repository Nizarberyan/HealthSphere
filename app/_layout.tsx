import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import migrations from '@/drizzle/migrations';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { WorkoutProvider } from '@/src/context/WorkoutContext';
import { db } from '@/src/db';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (success) {
      SplashScreen.hideAsync();
    }
  }, [success]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading database...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <WorkoutProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="add-workout" options={{ presentation: 'modal', title: 'Ajouter une séance' }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
        </WorkoutProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
