import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useFavorites } from '@/src/context/FavoritesContext';
import { useWorkouts } from '@/src/context/WorkoutContext';
import { Workout, WorkoutType } from '@/src/types/workout';

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

const getCardColor = (type: WorkoutType) => {
    switch (type) {
        case 'course': return '#FF99CC';
        case 'musculation': return '#A5D6A7';
        case 'vélo': return '#80DEEA';
        case 'natation': return '#90CAF9';
        case 'yoga': return '#E1BEE7';
        default: return '#FFE082';
    }
};

export default function FavoritesScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const router = useRouter();

    const theme = {
        bg: isDark ? '#121212' : '#F8F9FA',
        card: isDark ? '#1A1A1A' : '#FFFFFF',
        textPrimary: isDark ? '#FFF' : '#111827',
        textSecondary: isDark ? '#888' : '#6B7280',
    };

    const { workouts } = useWorkouts();
    const { favoriteIds, isRefreshing, refresh, toggleFavorite } = useFavorites();

    const favoriteWorkouts = workouts.filter(w => favoriteIds.has(w.id));

    const renderCard = (item: Workout) => (
        <Animated.View key={item.id} entering={FadeInDown} style={styles.cardWrapper}>
            <TouchableOpacity
                style={[styles.card, { backgroundColor: getCardColor(item.type) }]}
                activeOpacity={0.85}
                onPress={() => router.push(`/workout/${item.id}` as any)}
            >
                <View style={styles.cardTop}>
                    <View style={styles.iconCircle}>
                        <MaterialCommunityIcons name={getIconName(item.type)} size={22} color="#000" />
                    </View>
                    <TouchableOpacity
                        onPress={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                        activeOpacity={0.6}
                    >
                        <MaterialCommunityIcons name="heart" size={24} color="#E11D48" />
                    </TouchableOpacity>
                </View>
                <View style={styles.cardBottom}>
                    <Text style={styles.cardTitle}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </Text>
                    <Text style={styles.cardMeta}>{item.duration} MIN · {item.intensity}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={[]}>
            <StatusBar style={isDark ? 'light' : 'dark'} />

            <View style={styles.header}>
                <Text style={[styles.pageTitle, { color: theme.textPrimary }]}>Favoris</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} tintColor="#FF99CC" />}
            >
                {favoriteWorkouts.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <MaterialCommunityIcons name="heart-outline" size={64} color={theme.textSecondary} style={{ marginBottom: 16 }} />
                        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                            Aucun favori pour l'instant.{'\n'}Appuyez sur ♥ pour en ajouter.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.grid}>
                        {favoriteWorkouts.map(renderCard)}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
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
    scrollContent: {
        paddingBottom: 40,
        paddingHorizontal: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    cardWrapper: {
        width: '47%',
    },
    card: {
        borderRadius: 24,
        padding: 16,
        minHeight: 130,
        justifyContent: 'space-between',
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardBottom: {
        marginTop: 16,
    },
    cardTitle: {
        color: '#000',
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 4,
    },
    cardMeta: {
        color: 'rgba(0,0,0,0.6)',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
        paddingHorizontal: 32,
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
});
