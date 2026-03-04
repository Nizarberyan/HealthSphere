import { useColorScheme } from '@/hooks/use-color-scheme';
import { useWorkouts } from '@/src/context/WorkoutContext';
import { getWorkoutImage } from '@/src/utils/images';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkoutDetailsScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { workouts, deleteWorkout, updateWorkout } = useWorkouts();

    const theme = {
        bg: isDark ? '#121212' : '#F8F9FA',
        card: isDark ? '#1E1E1E' : '#FFFFFF',
        textPrimary: isDark ? '#FFF' : '#111827',
        textSecondary: isDark ? '#aaaaaa' : '#6B7280',
        border: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        badgeBg: isDark ? 'rgba(255,153,204,0.2)' : 'rgba(255,153,204,0.2)',
        badgeText: isDark ? '#FF99CC' : '#E864A5', // Slightly darker pink for light mode text contrast
        button: isDark ? '#FFF' : '#111827',
        buttonText: isDark ? '#000' : '#FFF',
    };

    const workout = workouts.find((w) => w.id === id);

    if (!workout) {
        return (
            <SafeAreaView style={[styles.notFoundContainer, { backgroundColor: theme.bg }]}>
                <Stack.Screen options={{ headerShown: false }} />
                <Text style={[styles.notFoundText, { color: theme.textPrimary }]}>Séance introuvable.</Text>
                <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: theme.card }]}>
                    <Text style={[styles.backButtonText, { color: theme.textPrimary }]}>Retour</Text>
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
                        await deleteWorkout(id as string);
                        router.back();
                    }
                }
            ]
        );
    };

    const handleMarkAsDone = async () => {
        if (!workout) return;

        await updateWorkout({
            ...workout,
            status: 'terminé'
        });

        Alert.alert('Félicitations !', 'Votre séance a été marquée comme terminée.');
        router.back();
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.bg }]}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style="light" />

            <ImageBackground source={{ uri: getWorkoutImage(workout.type) }} style={styles.heroBackground}>
                {/* Custom Header Actions (Back & Menu) */}
                <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                            <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
                            <MaterialCommunityIcons name="delete-outline" size={24} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                {/* Main Content Area (Overlay text and Bottom Sheet) */}
                <View style={styles.mainContent}>
                    <View style={styles.heroTextContainer}>
                        <Text style={styles.heroTextType} adjustsFontSizeToFit numberOfLines={1}>
                            {workout.type.toUpperCase()}
                        </Text>
                    </View>

                    <View style={[styles.bottomSheet, { backgroundColor: theme.card }]}>
                        <ScrollView contentContainerStyle={styles.bottomSheetContent} showsVerticalScrollIndicator={false}>
                            <View style={styles.sheetHeader}>
                                <Text style={[styles.sheetTitle, { color: theme.textPrimary }]}>DÉTAILS SÉANCE</Text>
                                <View style={[styles.durationBadge, { backgroundColor: theme.badgeBg }]}>
                                    <MaterialCommunityIcons name="clock-outline" size={16} color={theme.badgeText} />
                                    <Text style={[styles.durationText, { color: theme.badgeText }]}>{workout.duration} MIN</Text>
                                </View>
                            </View>

                            <View style={[styles.infoRow, { borderBottomColor: theme.border }]}>
                                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Date</Text>
                                <Text style={[styles.infoValue, { color: theme.textPrimary }]}>{formattedDate}</Text>
                            </View>

                            <View style={[styles.infoRow, { borderBottomColor: theme.border }]}>
                                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Intensité</Text>
                                <Text style={[styles.infoValue, { color: theme.textPrimary, textTransform: 'capitalize' }]}>{workout.intensity}</Text>
                            </View>

                            <View style={[styles.infoRow, { borderBottomColor: theme.border }]}>
                                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Statut</Text>
                                <View style={{
                                    paddingHorizontal: 12,
                                    paddingVertical: 4,
                                    borderRadius: 12,
                                    backgroundColor: workout.status === 'terminé' ? 'rgba(160, 232, 207, 0.2)' : 'rgba(255, 209, 102, 0.2)',
                                }}>
                                    <Text style={{
                                        fontSize: 12,
                                        fontWeight: '800',
                                        color: workout.status === 'terminé' ? '#A0E8CF' : '#FFD166',
                                    }}>{workout.status.toUpperCase()}</Text>
                                </View>
                            </View>

                            {workout.notes ? (
                                <View style={styles.notesSection}>
                                    <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Notes</Text>
                                    <Text style={[styles.notesText, { color: theme.textPrimary }]}>{workout.notes}</Text>
                                </View>
                            ) : null}

                            {workout.status === 'prévu' ? (
                                <TouchableOpacity
                                    style={[styles.primaryButton, { backgroundColor: theme.button }]}
                                    onPress={handleMarkAsDone}
                                >
                                    <MaterialCommunityIcons name="check-bold" size={20} color={theme.buttonText} style={{ marginRight: 8 }} />
                                    <Text style={[styles.primaryButtonText, { color: theme.buttonText }]}>MARQUER COMME TERMINÉ</Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={[styles.primaryButton, { backgroundColor: '#A0E8CF', opacity: 0.8 }]}>
                                    <MaterialCommunityIcons name="medal" size={20} color="#000" style={{ marginRight: 8 }} />
                                    <Text style={[styles.primaryButtonText, { color: '#000' }]}>SÉANCE COMPLÉTÉE</Text>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0A0A',
    },
    heroBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    headerSafeArea: {
        zIndex: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContent: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    heroTextContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    heroTextType: {
        color: '#FFF',
        fontSize: 64,
        fontWeight: '900',
        lineHeight: 70,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 8,
    },
    bottomSheet: {
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: '50%',
        paddingHorizontal: 24,
        paddingTop: 32,
    },
    bottomSheetContent: {
        paddingBottom: 40,
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    sheetTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000',
    },
    durationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.4)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        gap: 4,
    },
    durationText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#000',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: 'rgba(0,0,0,0.6)',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    notesSection: {
        marginBottom: 24,
    },
    notesText: {
        marginTop: 8,
        fontSize: 16,
        lineHeight: 24,
        color: '#000',
        fontWeight: '500',
    },
    primaryButton: {
        flexDirection: 'row',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    primaryButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '800',
    },
    notFoundContainer: {
        flex: 1,
        backgroundColor: '#0A0A0A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFoundText: {
        fontSize: 18,
        color: '#FFF',
    },
    backButton: {
        marginTop: 16,
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: '#333',
        borderRadius: 12,
    },
    backButtonText: {
        color: '#FFF',
        fontWeight: '600',
    }
});
