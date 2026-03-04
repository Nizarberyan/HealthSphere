import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp, LinearTransition } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WorkoutListItem } from '@/src/components/WorkoutListItem';
import { useWorkouts } from '@/src/context/WorkoutContext';
import { Workout, WorkoutType } from '@/src/types/workout';

const FILTER_TABS: { label: string; value: WorkoutType | 'All' }[] = [
    { label: 'Tous', value: 'All' },
    { label: 'Course', value: 'course' },
    { label: 'Musculation', value: 'musculation' },
    { label: 'Vélo', value: 'vélo' },
    { label: 'Natation', value: 'natation' },
    { label: 'Yoga', value: 'yoga' },
    { label: 'Autre', value: 'autre' },
];

export default function ExercisesScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const theme = {
        bg: isDark ? '#121212' : '#F8F9FA',
        card: isDark ? '#1A1A1A' : '#FFFFFF',
        textPrimary: isDark ? '#FFF' : '#111827',
        textSecondary: isDark ? '#888' : '#6B7280',
        borderColor: isDark ? '#1E1E1E' : '#FFFFFF',
        chipBorder: isDark ? '#333' : '#E5E7EB',
    };

    const router = useRouter();
    const { workouts } = useWorkouts();
    const [selectedFilter, setSelectedFilter] = useState<WorkoutType | 'All'>('All');

    const filteredWorkouts = workouts.filter((workout) => {
        return selectedFilter === 'All' ? true : workout.type === selectedFilter;
    });

    const renderItem = ({ item }: { item: Workout }) => (
        <Animated.View entering={FadeInDown} exiting={FadeOutUp} style={{ flex: 1, margin: 4, maxWidth: '48%' }}>
            <WorkoutListItem workout={item} />
        </Animated.View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
            <StatusBar style={isDark ? "light" : "dark"} />

            <View style={styles.header}>
                <Text style={[styles.pageTitle, { color: theme.textPrimary }]}>Exercices</Text>
                <TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.card }]} onPress={() => router.push('/add-workout')}>
                    <MaterialCommunityIcons name="plus" size={24} color={theme.textPrimary} />
                </TouchableOpacity>
            </View>

            <View style={styles.filterWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
                    {FILTER_TABS.map((tab) => {
                        const isActive = selectedFilter === tab.value;
                        return (
                            <TouchableOpacity
                                key={tab.value}
                                onPress={() => setSelectedFilter(tab.value as any)}
                                style={[styles.filterChip, { borderColor: theme.chipBorder }, isActive && styles.filterChipActive]}
                            >
                                <Text style={[styles.filterText, { color: theme.textSecondary }, isActive && styles.filterTextActive]}>
                                    {tab.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 16 }}>
                    <Animated.FlatList
                        data={filteredWorkouts}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        numColumns={2}
                        scrollEnabled={false}
                        itemLayoutAnimation={LinearTransition}
                        columnWrapperStyle={{ gap: 8 }}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={{ color: '#666', textAlign: 'center', marginTop: 32 }}>Aucune séance pour ce filtre.</Text>
                            </View>
                        }
                    />
                </View>
            </ScrollView>
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
    filterWrapper: {
        marginBottom: 16,
    },
    filterContainer: {
        paddingHorizontal: 16,
        gap: 12,
    },
    filterChip: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 24,
        borderWidth: 1,
        backgroundColor: 'transparent',
    },
    filterChipActive: {
        backgroundColor: '#FF99CC',
        borderColor: '#FF99CC',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
    },
    filterTextActive: {
        color: '#000',
        fontWeight: 'bold',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    emptyContainer: {
        padding: 24,
    },
});
