import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
    const { colorScheme, setColorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const router = useRouter();

    const theme = {
        bg: isDark ? '#121212' : '#F8F9FA',
        card: isDark ? '#1E1E1E' : '#FFFFFF',
        textPrimary: isDark ? '#FFF' : '#111827',
        textSecondary: isDark ? '#888' : '#6B7280',
        switchTrackOff: isDark ? '#333' : '#E5E7EB',
    };

    const toggleTheme = () => {
        setColorScheme(isDark ? 'light' : 'dark');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
            <Stack.Screen options={{
                title: 'PARAMÈTRES',
                headerStyle: { backgroundColor: theme.bg },
                headerTintColor: theme.textPrimary,
                headerTitleStyle: { fontWeight: '800' },
               
            }} />

            <View style={styles.content}>
                <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Préférences</Text>

                <View style={[styles.settingCard, { backgroundColor: theme.card }]}>
                    <View style={styles.settingRow}>
                        <View style={[styles.iconContainer, { backgroundColor: isDark ? 'rgba(255,153,204,0.2)' : 'rgba(160,232,207,0.2)' }]}>
                            <MaterialCommunityIcons
                                name={isDark ? "weather-night" : "white-balance-sunny"}
                                size={24}
                                color={isDark ? "#FF99CC" : "#A0E8CF"}
                            />
                        </View>
                        <View style={styles.settingTextContainer}>
                            <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>Mode Sombre</Text>
                            <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
                                {isDark ? 'Activé' : 'Désactivé'}
                            </Text>
                        </View>
                    </View>

                    <Switch
                        value={isDark}
                        onValueChange={toggleTheme}
                        trackColor={{ false: theme.switchTrackOff, true: '#FF99CC' }}
                        thumbColor={'#ffffff'}
                    />
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    content: {
        padding: 24,
    },
    sectionTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 16,
        textTransform: 'uppercase',
    },
    settingCard: {
        backgroundColor: '#1E1E1E',
        borderRadius: 24,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    settingTextContainer: {
        flex: 1,
    },
    settingTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 4,
    },
    settingSubtitle: {
        color: '#888',
        fontSize: 14,
        fontWeight: '500',
    },
    infoText: {
        color: '#666',
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 8,
        textAlign: 'center'
    }
});
