import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { FavoritesProvider } from '@/src/context/FavoritesContext';
import { WorkoutProvider } from '@/src/context/WorkoutContext';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <WorkoutProvider>
          <FavoritesProvider>
            <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? '#121212' : '#F8F9FA' }}>
              <Stack screenOptions={{ contentStyle: { backgroundColor: colorScheme === 'dark' ? '#121212' : '#F8F9FA' } }}>
                <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
                <Stack.Screen name="add-workout" options={{ presentation: 'modal', title: 'Ajouter une séance' }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                <Stack.Screen
                  name="workout/[id]"
                  options={{
                    headerShown: false,
                    contentStyle: { backgroundColor: colorScheme === 'dark' ? '#121212' : '#F8F9FA' },
                  }}
                />
              </Stack>
            </View>
            <StatusBar style="auto" />
          </FavoritesProvider>
        </WorkoutProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
