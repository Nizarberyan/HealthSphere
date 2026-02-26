import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Workout, WorkoutType } from '@/src/types/workout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface WorkoutListItemProps {
    workout: Workout;
}

const getIconName = (type: WorkoutType) => {
    switch (type) {
        case 'course':
            return 'run';
        case 'musculation':
            return 'weight-lifter';
        case 'vélo':
            return 'bike';
        case 'natation':
            return 'swim';
        case 'yoga':
            return 'yoga';
        default:
            return 'run';
    }
};

const getIntensityColor = (intensity: string) => {
    switch (intensity) {
        case 'faible':
            return '#4CAF50'; // Green
        case 'moyenne':
            return '#FF9800'; // Orange
        case 'élevée':
            return '#F44336'; // Red
        default:
            return '#9E9E9E'; // Grey
    }
};

export const WorkoutListItem = ({ workout }: WorkoutListItemProps) => {
    const { colorScheme } = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const router = useRouter();

    const dateObject = new Date(workout.date);
    const formattedDate = dateObject.toLocaleDateString('fr-FR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
    });

    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: theme.background }]}
            activeOpacity={0.7}
            onPress={() => router.push(`/workout/${workout.id}` as any)}
        >
            <View style={[styles.iconContainer, { backgroundColor: theme.tint + '20' }]}>
                <MaterialCommunityIcons name={getIconName(workout.type)} size={28} color={theme.tint} />
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.headerRow}>
                    <Text style={[styles.typeText, { color: theme.text }]}>
                        {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
                    </Text>
                    <Text style={[styles.dateText, { color: theme.icon }]}>{formattedDate}</Text>
                </View>

                <View style={styles.metricsRow}>
                    <View style={styles.metric}>
                        <MaterialCommunityIcons name="clock-outline" size={16} color={theme.icon} />
                        <Text style={[styles.metricText, { color: theme.icon }]}>{workout.duration} min</Text>
                    </View>

                    <View style={styles.intensityBadge}>
                        <View style={[styles.intensityDot, { backgroundColor: getIntensityColor(workout.intensity) }]} />
                        <Text style={[styles.intensityText, { color: theme.icon }]}>
                            {workout.intensity.charAt(0).toUpperCase() + workout.intensity.slice(1)}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 2,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    typeText: {
        fontSize: 18,
        fontWeight: '700',
    },
    dateText: {
        fontSize: 14,
    },
    metricsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metric: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    metricText: {
        fontSize: 14,
        marginLeft: 4,
    },
    intensityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    intensityDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    intensityText: {
        fontSize: 12,
        fontWeight: '600',
    },
});
