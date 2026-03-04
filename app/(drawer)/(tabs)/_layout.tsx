import { Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const insets = useSafeAreaInsets();

    const theme = {
        bg: isDark ? '#121212' : '#F8F9FA',
        card: isDark ? '#1E1E1E' : '#FFFFFF',
        textPrimary: isDark ? '#FFF' : '#111827',
        textSecondary: isDark ? '#888' : '#6B7280',
        activeColor: '#FF99CC',
        inactiveColor: isDark ? '#888' : '#666',
        borderColor: isDark ? '#333' : '#E5E7EB',
    };

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: theme.bg },
                headerTintColor: theme.textPrimary,
                tabBarStyle: {
                    backgroundColor: theme.card,
                    borderTopColor: theme.borderColor,
                    borderTopWidth: 1,
                    height: 65 + insets.bottom,
                    paddingBottom: 8 + insets.bottom,
                    paddingTop: 4,
                },
                tabBarActiveTintColor: theme.activeColor,
                tabBarInactiveTintColor: theme.inactiveColor,
                tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="view-dashboard-outline" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="exercises"
                options={{
                    title: 'Exercices',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="dumbbell" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'Historique',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="history" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favoris',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="heart-outline" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
