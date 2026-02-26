import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { WorkoutListItem } from '@/src/components/WorkoutListItem';
import { useWorkouts } from '@/src/context/WorkoutContext';
import { Workout } from '@/src/types/workout';
import { Link, useRouter } from 'expo-router'; // Added Link


export default function HomeScreen() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const router = useRouter();

  const { workouts, isLoading } = useWorkouts();

  const renderItem = ({ item }: { item: Workout }) => (
    <WorkoutListItem workout={item} />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Mes Séances</Text>
        {/* Added settings button */}
        <Link href="/settings" asChild>
          <TouchableOpacity style={styles.settingsButton}>
            <MaterialCommunityIcons name="cog-outline" size={28} color={theme.text} />
          </TouchableOpacity>
        </Link>
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
          router.push('/add-workout');
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
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  settingsButton: {
    padding: 8,
    borderRadius: 8,
  },
});