import { useColorScheme } from '@/hooks/use-color-scheme';
import { useWorkouts } from '@/src/context/WorkoutContext';
import { IntensityLevel, WorkoutType } from '@/src/types/workout';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WORKOUT_TYPES: WorkoutType[] = ['course', 'musculation', 'vélo', 'natation', 'yoga', 'autre'];
const INTENSITIES: IntensityLevel[] = ['faible', 'moyenne', 'élevée'];

export default function AddWorkoutScreen() {
    const { colorScheme } = useColorScheme();
    const router = useRouter();
    const { addWorkout } = useWorkouts();

    const [type, setType] = useState<WorkoutType>('course');
    const [duration, setDuration] = useState('');
    const [intensity, setIntensity] = useState<IntensityLevel>('moyenne');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [notes, setNotes] = useState('');

    const handleSave = async () => {
        if (!duration || isNaN(Number(duration))) {
            Alert.alert('Erreur', 'Veuillez entrer une durée valide en minutes.');
            return;
        }

        await addWorkout({
            type,
            duration: Number(duration),
            intensity,
            date: date.toISOString(),
            notes
        });

        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-neutral-100 dark:bg-zinc-900">
            <ScrollView className="flex-1 px-4 pt-6">
                <Stack.Screen options={{ title: 'Ajouter une séance', presentation: 'modal' }} />

                <View className="mb-6">
                    <Text className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-2 uppercase">Type d'activité</Text>
                    <View className="flex-row flex-wrap gap-2">
                        {WORKOUT_TYPES.map((t) => (
                            <TouchableOpacity
                                key={t}
                                onPress={() => setType(t)}
                                className={`px-4 py-2 rounded-full border ${type === t ? 'bg-blue-500 border-blue-500' : 'bg-white dark:bg-zinc-800 border-neutral-300 dark:border-zinc-700'}`}
                            >
                                <Text className={`${type === t ? 'text-white font-semibold' : 'text-neutral-800 dark:text-neutral-200'} capitalize`}>{t}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View className="mb-6">
                    <Text className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-2 uppercase">Durée (minutes)</Text>
                    <TextInput
                        className="bg-white dark:bg-zinc-800 border border-neutral-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-lg text-black dark:text-white"
                        keyboardType="numeric"
                        placeholder="ex: 45"
                        placeholderTextColor={colorScheme === 'dark' ? '#71717a' : '#a1a1aa'}
                        value={duration}
                        onChangeText={setDuration}
                    />
                </View>

                <View className="mb-6">
                    <Text className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-2 uppercase">Date de la séance</Text>
                    {Platform.OS === 'ios' ? (
                        <>
                            <TouchableOpacity
                                onPress={() => setShowDatePicker(true)}
                                className="bg-white dark:bg-zinc-800 border border-neutral-300 dark:border-zinc-700 rounded-xl px-4 py-3"
                            >
                                <Text className="text-lg text-black dark:text-white capitalize">
                                    {date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </Text>
                            </TouchableOpacity>
                            <Modal
                                transparent={true}
                                animationType="slide"
                                visible={showDatePicker}
                                onRequestClose={() => setShowDatePicker(false)}
                            >
                                <View className="flex-1 justify-end bg-black/50">
                                    <View className="bg-white dark:bg-zinc-900 rounded-t-3xl p-4 pb-8">
                                        <View className="flex-row justify-between items-center mb-4">
                                            <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                                                <Text className="text-blue-500 font-semibold text-lg">Annuler</Text>
                                            </TouchableOpacity>
                                            <Text className="text-black dark:text-white font-bold text-lg">Choisir une date</Text>
                                            <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                                                <Text className="text-blue-500 font-semibold text-lg">Terminé</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <DateTimePicker
                                            value={date}
                                            mode="date"
                                            display="inline"
                                            minimumDate={new Date()}
                                            onChange={(e: any, selected?: Date) => {
                                                if (selected) setDate(selected);
                                            }}
                                            textColor={colorScheme === 'dark' ? 'white' : 'black'}
                                            themeVariant={colorScheme ?? 'light'}
                                        />
                                    </View>
                                </View>
                            </Modal>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity
                                onPress={() => setShowDatePicker(true)}
                                className="bg-white dark:bg-zinc-800 border border-neutral-300 dark:border-zinc-700 rounded-xl px-4 py-3"
                            >
                                <Text className="text-lg text-black dark:text-white capitalize">
                                    {date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </Text>
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    minimumDate={new Date()}
                                    onChange={(event: any, selectedDate?: Date) => {
                                        setShowDatePicker(false);
                                        if (selectedDate) setDate(selectedDate);
                                    }}
                                />
                            )}
                        </>
                    )}
                </View>

                <View className="mb-6">
                    <Text className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-2 uppercase">Intensité</Text>
                    <View className="flex-row flex-wrap gap-2">
                        {INTENSITIES.map((i) => (
                            <TouchableOpacity
                                key={i}
                                onPress={() => setIntensity(i)}
                                className={`px-4 py-2 rounded-full border ${intensity === i ? 'bg-orange-500 border-orange-500' : 'bg-white dark:bg-zinc-800 border-neutral-300 dark:border-zinc-700'}`}
                            >
                                <Text className={`${intensity === i ? 'text-white font-semibold' : 'text-neutral-800 dark:text-neutral-200'} capitalize`}>{i}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View className="mb-6">
                    <Text className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-2 uppercase">Notes (Optionnel)</Text>
                    <TextInput
                        className="bg-white dark:bg-zinc-800 border border-neutral-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-lg text-black dark:text-white h-24"
                        multiline
                        textAlignVertical="top"
                        placeholder="Comment s'est passée la séance ?"
                        placeholderTextColor={colorScheme === 'dark' ? '#71717a' : '#a1a1aa'}
                        value={notes}
                        onChangeText={setNotes}
                    />
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSave}
                    className="bg-blue-600 py-4 rounded-xl items-center mt-4 mb-12 shadow-sm"
                >
                    <Text className="text-white font-bold text-lg">Enregistrer la séance</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
