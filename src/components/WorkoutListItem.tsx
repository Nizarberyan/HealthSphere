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
        case 'course': return '#FF99CC'; // Pink
        case 'musculation': return '#A5D6A7'; // Green
        case 'vélo': return '#80DEEA'; // Cyan
        case 'natation': return '#90CAF9'; // Blue
        case 'yoga': return '#E1BEE7'; // Purple
        default: return '#FFE082'; // Yellow/Orange
    }
};

export const WorkoutListItem = ({ workout }: WorkoutListItemProps) => {
    const router = useRouter();

    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: getCardColor(workout.type) }]}
            activeOpacity={0.8}
            onPress={() => router.push(`/workout/${workout.id}` as any)}
        >
            <View style={styles.topRow}>
                <View style={styles.iconCircle}>
                    <MaterialCommunityIcons name={getIconName(workout.type)} size={24} color="#000" />
                </View>
            </View>

            <View style={styles.bottomContent}>
                <Text style={styles.titleText} numberOfLines={1}>
                    {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
                </Text>
                <Text style={styles.durationText}>{workout.duration} MIN</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 130,
        padding: 16,
        borderRadius: 24,
        justifyContent: 'space-between',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContent: {
        marginTop: 16,
    },
    titleText: {
        color: '#000',
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 4,
    },
    durationText: {
        color: 'rgba(0,0,0,0.6)',
        fontSize: 14,
        fontWeight: '700',
    },
});
