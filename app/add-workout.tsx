import { useColorScheme } from '@/hooks/use-color-scheme';
import { useWorkouts } from '@/src/context/WorkoutContext';
import { IntensityLevel, WorkoutType } from '@/src/types/workout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WORKOUT_TYPES: WorkoutType[] = ['course', 'musculation', 'vélo', 'natation', 'yoga', 'autre'];
const INTENSITIES: IntensityLevel[] = ['faible', 'moyenne', 'élevée'];

export default function AddWorkoutScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const router = useRouter();
    const { addWorkout } = useWorkouts();

    const theme = {
        bg: isDark ? '#121212' : '#F8F9FA',
        card: isDark ? '#1E1E1E' : '#FFFFFF',
        textPrimary: isDark ? '#FFF' : '#111827',
        textSecondary: isDark ? '#888' : '#6B7280',
        borderColor: isDark ? '#333' : '#E5E7EB',
        modalOverlay: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.4)',
    };

    const [type, setType] = useState<WorkoutType>('course');
    const [duration, setDuration] = useState('');
    const [intensity, setIntensity] = useState<IntensityLevel>('moyenne');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [notes, setNotes] = useState('');
    const [durationError, setDurationError] = useState('');

    const handleSave = async () => {
        let isError = false;

        if (!duration.trim()) {
            setDurationError("La durée est requise.");
            isError = true;
        } else if (isNaN(Number(duration)) || Number(duration) <= 0) {
            setDurationError("Veuillez entrer une durée valide (nombre positif).");
            isError = true;
        }

        if (isError) return;

        await addWorkout({
            type,
            duration: Number(duration),
            intensity,
            date: date.toISOString(),
            status: 'prévu',
            notes
        });

        router.back();
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
            <Stack.Screen options={{
                title: 'AJOUTER',
                presentation: 'modal',
                headerStyle: { backgroundColor: theme.bg },
                headerTintColor: theme.textPrimary,
                headerTitleStyle: { fontWeight: '800' }
            }} />
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Workout Type */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Type d'activité</Text>
                    <View style={styles.chipContainer}>
                        {WORKOUT_TYPES.map((t) => {
                            const isActive = type === t;
                            return (
                                <TouchableOpacity
                                    key={t}
                                    onPress={() => setType(t)}
                                    style={[styles.chip, { borderColor: theme.borderColor }, isActive && styles.chipActive]}
                                >
                                    <Text style={[styles.chipText, { color: theme.textSecondary }, isActive && styles.chipTextActive]}>
                                        {t}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Duration */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Durée (minutes)</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.card, color: theme.textPrimary }, durationError ? styles.inputError : null]}
                        keyboardType="numeric"
                        placeholder="ex: 45"
                        placeholderTextColor={theme.textSecondary}
                        value={duration}
                        onChangeText={(text) => {
                            setDuration(text);
                            if (durationError) setDurationError('');
                        }}
                    />
                    {durationError ? (
                        <Text style={styles.errorText}>{durationError}</Text>
                    ) : null}
                </View>

                {/* Date Selection */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Date de la séance</Text>
                    {Platform.OS === 'ios' ? (
                        <>
                            <TouchableOpacity
                                onPress={() => setShowDatePicker(true)}
                                style={[styles.input, { backgroundColor: theme.card }]}
                            >
                                <Text style={[styles.inputText, { color: theme.textPrimary }]}>
                                    {date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </Text>
                            </TouchableOpacity>
                            <Modal
                                transparent={true}
                                animationType="slide"
                                visible={showDatePicker}
                                onRequestClose={() => setShowDatePicker(false)}
                            >
                                <View style={[styles.modalOverlay, { backgroundColor: theme.modalOverlay }]}>
                                    <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
                                        <View style={styles.modalHeader}>
                                            <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                                                <Text style={styles.modalActionText}>Annuler</Text>
                                            </TouchableOpacity>
                                            <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>Choisir une date</Text>
                                            <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                                                <Text style={styles.modalActionText}>Terminé</Text>
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
                                            textColor={theme.textPrimary}
                                            themeVariant={isDark ? "dark" : "light"}
                                        />
                                    </View>
                                </View>
                            </Modal>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity
                                onPress={() => setShowDatePicker(true)}
                                style={[styles.input, { backgroundColor: theme.card }]}
                            >
                                <Text style={[styles.inputText, { color: theme.textPrimary }]}>
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

                {/* Intensity */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Intensité</Text>
                    <View style={styles.chipContainer}>
                        {INTENSITIES.map((i) => {
                            const isActive = intensity === i;
                            return (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => setIntensity(i)}
                                    style={[styles.chip, { borderColor: theme.borderColor }, isActive && styles.chipActiveIntensity]}
                                >
                                    <Text style={[styles.chipText, { color: theme.textSecondary }, isActive && styles.chipTextActive]}>
                                        {i}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Notes */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Notes (Optionnel)</Text>
                    <TextInput
                        style={[styles.input, styles.textArea, { backgroundColor: theme.card, color: theme.textPrimary }]}
                        multiline
                        textAlignVertical="top"
                        placeholder="Comment s'est passée la séance ?"
                        placeholderTextColor={theme.textSecondary}
                        value={notes}
                        onChangeText={setNotes}
                    />
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSave}
                    style={styles.saveButton}
                >
                    <MaterialCommunityIcons name="content-save-outline" size={24} color="#000" style={{ marginRight: 8 }} />
                    <Text style={styles.saveButtonText}>ENREGISTRER</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 16,
        textTransform: 'uppercase',
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    chip: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#333',
        backgroundColor: 'transparent',
    },
    chipActive: {
        backgroundColor: '#FF99CC', // Pink
        borderColor: '#FF99CC',
    },
    chipActiveIntensity: {
        backgroundColor: '#A0E8CF', // Cyan for intensity
        borderColor: '#A0E8CF',
    },
    chipText: {
        color: '#888',
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    chipTextActive: {
        color: '#000',
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#1E1E1E',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 16,
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
    },
    inputText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
        textTransform: 'capitalize',
    },
    inputError: {
        borderWidth: 1,
        borderColor: '#FF4D4D',
    },
    errorText: {
        color: '#FF4D4D',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 8,
    },
    textArea: {
        height: 120,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalContent: {
        backgroundColor: '#1E1E1E',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalActionText: {
        color: '#FF99CC',
        fontSize: 16,
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: '#FF99CC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 30,
        marginTop: 16,
    },
    saveButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '900',
    },
});
