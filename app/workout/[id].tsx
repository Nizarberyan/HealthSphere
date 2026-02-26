import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useWorkouts } from '@/src/context/WorkoutContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const getIconName = (type: string) => {
    switch (type) {
        case 'course': return 'run';
        case 'musculation': return 'weight-lifter';
        case 'vélo': return 'bike';
        case 'natation': return 'swim';
        case 'yoga': return 'yoga';
        default: return 'run';
    }
};

const getIntensityColor = (intensity: string) => {
    switch (intensity) {
        case 'faible': return '#4CAF50';
        case 'moyenne': return '#FF9800';
        case 'élevée': return '#F44336';
        default: return '#9E9E9E';
    }
};

export default function WorkoutDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { colorScheme } = useColorScheme();
    const router = useRouter();
    const { workouts, deleteWorkout } = useWorkouts();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const workout = workouts.find((w) => w.id === id);

    if (!workout) {
        return (
            <SafeAreaView className="flex-1 bg-neutral-100 dark:bg-zinc-900 justify-center items-center">
                <Stack.Screen options={{ title: 'Introuvable' }} />
                <Text className="text-lg text-neutral-600 dark:text-neutral-400">Séance introuvable.</Text>
                <TouchableOpacity onPress={() => router.back()} className="mt-4 px-6 py-3 bg-blue-500 rounded-xl">
                    <Text className="text-white font-semibold">Retour</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const dateObject = new Date(workout.date);
    const formattedDate = dateObject.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const handleDelete = () => {
        Alert.alert(
            'Supprimer la séance',
            'Êtes-vous sûr de vouloir supprimer cette séance ? Cette action est irréversible.',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: async () => {
                        await deleteWorkout(id);
                        router.back();
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-neutral-100 dark:bg-zinc-900">
            <Stack.Screen options={{ title: 'Détails de la séance', headerBackTitle: 'Retour' }} />

            <ScrollView className="flex-1 px-4 pt-6">
                <View className="bg-white dark:bg-zinc-800 rounded-3xl p-6 shadow-sm mb-6 items-center">
                    <View className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/40 justify-center items-center mb-4">
                        <MaterialCommunityIcons name={getIconName(workout.type)} size={48} color={theme.tint} />
                    </View>
                    <Text className="text-3xl font-bold text-neutral-800 dark:text-white capitalize mb-2">
                        {workout.type}
                    </Text>
                    <Text className="text-lg text-neutral-500 dark:text-neutral-400 capitalize">
                        {formattedDate}
                    </Text>
                </View>

                <View className="bg-white dark:bg-zinc-800 rounded-2xl p-5 shadow-sm mb-6">
                    <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-neutral-100 dark:border-zinc-700">
                        <View className="flex-row items-center">
                            <MaterialCommunityIcons name="clock-outline" size={24} color={theme.icon} />
                            <Text className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 ml-3">Durée</Text>
                        </View>
                        <Text className="text-lg text-neutral-800 dark:text-white font-bold">{workout.duration} min</Text>
                    </View>

                    <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center">
                            <MaterialCommunityIcons name="lightning-bolt" size={24} color={theme.icon} />
                            <Text className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 ml-3">Intensité</Text>
                        </View>
                        <View className="flex-row items-center">
                            <View
                                style={{ backgroundColor: getIntensityColor(workout.intensity) }}
                                className="w-3 h-3 rounded-full mr-2"
                            />
                            <Text className="text-lg text-neutral-800 dark:text-white font-semibold capitalize">
                                {workout.intensity}
                            </Text>
                        </View>
                    </View>
                </View>

                {workout.notes && (
                    <View className="bg-white dark:bg-zinc-800 rounded-2xl p-5 shadow-sm mb-6">
                        <View className="flex-row items-center mb-3">
                            <MaterialCommunityIcons name="text-box-outline" size={24} color={theme.icon} />
                            <Text className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 ml-3">Notes</Text>
                        </View>
                        <Text className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {workout.notes}
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    onPress={handleDelete}
                    className="flex-row justify-center items-center py-4 bg-red-100 dark:bg-red-500/10 rounded-2xl mt-4 mb-12"
                >
                    <MaterialCommunityIcons name="delete-outline" size={24} color="#EF4444" />
                    <Text className="text-red-500 font-bold text-lg ml-2">Supprimer la séance</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}
