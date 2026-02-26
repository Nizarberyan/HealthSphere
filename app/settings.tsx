import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
    const { colorScheme, setColorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const toggleTheme = () => {
        setColorScheme(isDark ? 'light' : 'dark');
    };

    return (
        <SafeAreaView className="flex-1 bg-neutral-100 dark:bg-zinc-900">
            <Stack.Screen options={{ title: 'Paramètres' }} />

            <View className="p-4 mt-4">
                <Text className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">Affichage</Text>

                <View className="bg-white dark:bg-zinc-800 rounded-2xl p-4 flex-row items-center justify-between border border-neutral-200 dark:border-zinc-700">
                    <View className="flex-row items-center space-x-3">
                        <View className={`w-10 h-10 rounded-full items-center justify-center ${isDark ? 'bg-indigo-500/20' : 'bg-amber-500/20'}`}>
                            <MaterialCommunityIcons
                                name={isDark ? "weather-night" : "white-balance-sunny"}
                                size={24}
                                color={isDark ? "#818cf8" : "#f59e0b"}
                            />
                        </View>
                        <View className="ml-3">
                            <Text className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                                Mode Sombre
                            </Text>
                            <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                                {isDark ? 'Activé' : 'Désactivé'}
                            </Text>
                        </View>
                    </View>

                    <Switch
                        value={isDark}
                        onValueChange={toggleTheme}
                        trackColor={{ false: '#d4d4d8', true: '#4f46e5' }}
                        thumbColor={isDark ? '#ffffff' : '#f4f4f5'}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
