import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useWorkouts } from '@/src/context/WorkoutContext';
import { Workout, WorkoutType } from '@/src/types/workout';

// Helper for icon names
const getIconName = (type: WorkoutType) => {
    switch (type) {
        case 'course': return 'run';
        case 'musculation': return 'weight-lifter';
        case 'vélo': return 'bike';
        case 'natation': return 'swim';
        case 'yoga': return 'yoga';
        default: return 'run';
    }
};

// Helper for icon background colors
const getIconBgColor = (type: WorkoutType) => {
    switch (type) {
        case 'course': return '#FF99CC'; // Pink
        case 'musculation': return '#A0E8CF'; // Cyan/Green
        case 'vélo': return '#FFD166'; // Yellow
        case 'natation': return '#4FC3F7'; // Blue
        case 'yoga': return '#E1BEE7'; // Purple
        default: return '#FFE082'; // Orange/Yellow
    }
};

export default function HistoryScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const theme = {
        bg: isDark ? '#121212' : '#F8F9FA',
        card: isDark ? '#1A1A1A' : '#FFFFFF',
        textPrimary: isDark ? '#FFF' : '#111827',
        textSecondary: isDark ? '#888' : '#6B7280',
        sectionHeader: isDark ? '#2C2C2C' : '#E5E7EB',
    };

    const router = useRouter();
    const { workouts } = useWorkouts();

    // Group workouts by month and year
    const groupedWorkouts = useMemo(() => {
        const groups: { [key: string]: Workout[] } = {};

        const completedWorkouts = workouts.filter(w => w.status === 'terminé');

        completedWorkouts.forEach((workout) => {
            const date = new Date(workout.date);
            const monthYear = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
            // Capitalize first letter of month
            const formattedKey = monthYear.charAt(0).toUpperCase() + monthYear.slice(1);

            if (!groups[formattedKey]) {
                groups[formattedKey] = [];
            }
            groups[formattedKey].push(workout);
        });

        return Object.keys(groups).map((title) => ({
            title,
            data: groups[title],
        }));
    }, [workouts]);

    const renderItem = ({ item, index }: { item: Workout; index: number }) => {
        const dateObj = new Date(item.date);
        const timeString = dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

        return (
            <Animated.View entering={FadeInDown.delay(index * 50)}>
                <TouchableOpacity
                    style={[styles.historyItem, { backgroundColor: theme.card }]}
                    activeOpacity={0.7}
                    onPress={() => router.push(`/workout/${item.id}` as any)}
                >
                    <View style={[styles.itemIconContainer, { backgroundColor: getIconBgColor(item.type) }]}>
                        <MaterialCommunityIcons name={getIconName(item.type)} size={24} color="#000" />
                    </View>
                    <View style={styles.itemMeta}>
                        <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </Text>
                        <Text style={[styles.itemDate, { color: theme.textSecondary }]}>
                            {dateObj.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric' })} • {timeString}
                        </Text>
                    </View>
                    <View style={styles.itemStats}>
                        <Text style={[styles.itemDuration, { color: theme.textPrimary }]}>{item.duration}m</Text>
                        <View style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: item.intensity === 'élevée' ? '#FF4D4D' : item.intensity === 'moyenne' ? '#FFD166' : '#A0E8CF'
                        }} />
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
        <View style={[styles.sectionHeaderContainer, { backgroundColor: theme.sectionHeader }]}>
            <Text style={[styles.sectionHeaderText, { color: theme.textPrimary }]}>{title}</Text>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
            <StatusBar style={isDark ? "light" : "dark"} />

            <View style={styles.header}>
                <Text style={[styles.pageTitle, { color: theme.textPrimary }]}>Historique</Text>
            </View>

            <SectionList
                sections={groupedWorkouts}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                contentContainerStyle={styles.listContent}
                stickySectionHeadersEnabled={false}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <MaterialCommunityIcons name="history" size={64} color={theme.textSecondary} style={{ marginBottom: 16 }} />
                        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>Aucune séance enregistrée pour le moment.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 16,
    },
    pageTitle: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContent: {
        paddingBottom: 80,
        paddingHorizontal: 16,
    },
    sectionHeaderContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginBottom: 12,
        marginTop: 16,
        alignSelf: 'flex-start',
    },
    sectionHeaderText: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
    },
    itemIconContainer: {
        width: 52,
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    itemMeta: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 4,
    },
    itemDate: {
        fontSize: 13,
        fontWeight: '500',
        textTransform: 'capitalize',
    },
    itemStats: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    itemDuration: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 4,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 64,
        paddingHorizontal: 32,
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
});
