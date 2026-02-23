import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { WorkoutListItem } from '@/src/components/WorkoutListItem';
import { Workout } from '@/src/types/workout';

const DUMMY_WORKOUTS: Workout[] = [
  {
    id: '1',
    type: 'course',
    duration: 45,
    intensity: 'élevée',
    date: new Date().toISOString(),
    notes: 'Course matinale',
  },
  {
    id: '2',
    type: 'musculation',
    duration: 60,
    intensity: 'moyenne',
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    notes: 'Séance haut du corps',
  },
  {
    id: '3',
    type: 'vélo',
    duration: 120,
    intensity: 'faible',
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  // We'll use state here initially just to show it works, 
  // later we'll move this to Context API and AsyncStorage
  const [workouts, setWorkouts] = useState<Workout[]>(DUMMY_WORKOUTS);

  const renderItem = ({ item }: { item: Workout }) => (
    <WorkoutListItem workout={item} />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Mes Séances</Text>
      </View>

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="clipboard-text-outline" size={48} color={theme.icon} />
            <Text style={[styles.emptyText, { color: theme.icon }]}>Aucune séance enregistrée.</Text>
            <Text style={[styles.emptySubtext, { color: theme.icon }]}>
              Commencez par ajouter votre première séance !
            </Text>
          </View>
        }
      />

      {/* Floating Action Button (FAB) for adding a new workout */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.tint }]}
        onPress={() => {
          // TODO: Navigate to AddWorkoutScreen
          console.log('Navigate to add workout');
        }}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="plus" size={32} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 100, // Extra padding for the FAB
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
