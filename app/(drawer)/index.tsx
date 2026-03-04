import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp, LinearTransition } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WorkoutListItem } from '@/src/components/WorkoutListItem';
import { useWorkouts } from '@/src/context/WorkoutContext';
import { Workout, WorkoutType } from '@/src/types/workout';
import { getWorkoutImage } from '@/src/utils/images';

const AVATAR_IMAGE_URL = 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop';

const FILTER_TABS: { label: string; value: WorkoutType | 'All' }[] = [
  { label: 'Tracker', value: 'All' },
  { label: 'Course', value: 'course' },
  { label: 'Muscul', value: 'musculation' },
  { label: 'Vélo', value: 'vélo' },
  { label: 'Natat', value: 'natation' },
  { label: 'Yoga', value: 'yoga' },
  { label: 'Autre', value: 'autre' },
];


export default function HomeScreen() {
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
  const { workouts, isLoading } = useWorkouts();
  const [selectedFilter, setSelectedFilter] = useState<WorkoutType | 'All'>('All');

  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const dateStripDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - 3 + i);

    return {
      date: d,
      day: d.toLocaleDateString('en-US', { weekday: 'narrow' }),
      num: d.getDate(),
    };
  });

  const filteredWorkouts = workouts.filter((workout) => {
    const workoutDate = new Date(workout.date);
    workoutDate.setHours(0, 0, 0, 0);

    const matchesType = selectedFilter === 'All' ? true : workout.type === selectedFilter;
    const matchesDate = workoutDate.getTime() === selectedDate.getTime();

    return matchesType && matchesDate;
  });

  const renderItem = ({ item }: { item: Workout }) => (
    <Animated.View entering={FadeInDown} exiting={FadeOutUp} style={{ flex: 1, margin: 4, maxWidth: '48%' }}>
      <WorkoutListItem workout={item} />
    </Animated.View>
  );

  const totalDuration = filteredWorkouts.reduce((acc, current) => acc + current.duration, 0);
  const heroText = selectedFilter === 'All' ? 'WORKOUT' : selectedFilter.toUpperCase();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.profileBadge, { backgroundColor: theme.card }]}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: AVATAR_IMAGE_URL }} style={styles.avatar} />
          </View>
          <View style={[styles.levelCircle, { borderColor: theme.borderColor }]}>
            <Text style={styles.levelText}>2</Text>
          </View>
          <Text style={[styles.username, { color: theme.textPrimary }]}>Challenger</Text>
          <View style={styles.fireContainer}>
            <MaterialCommunityIcons name="fire" size={16} color="#FF4D4D" />
            <Text style={[styles.scoreText, { color: theme.textPrimary }]}>145</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.card }]} onPress={() => router.push('/settings')}>
            <MaterialCommunityIcons name="bookmark-outline" size={24} color={theme.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.card }]} onPress={() => router.push('/settings')}>
            <MaterialCommunityIcons name="cog-outline" size={24} color={theme.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.pageTitle, { color: theme.textPrimary }]}>Progress</Text>

        {/* Filters */}
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

        {/* Date Strip */}
        <View style={styles.dateStrip}>
          {dateStripDays.map((item, index) => {
            const isActive = item.date.getTime() === selectedDate.getTime();
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedDate(item.date)}
                style={[
                  styles.dateItem,
                  { borderColor: theme.chipBorder, backgroundColor: theme.bg },
                  isActive && styles.dateItemActive
                ]}
              >
                <Text style={[styles.dateDay, { color: theme.textSecondary }, isActive && styles.dateDayActive]}>
                  {item.day}
                </Text>
                <Text style={[styles.dateNum, { color: theme.textPrimary }, isActive && styles.dateNumActive]}>
                  {item.num}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Hero Card */}
        <TouchableOpacity activeOpacity={0.9} onPress={() => router.push('/add-workout')} style={styles.heroCardContainer}>
          <ImageBackground source={{ uri: getWorkoutImage(selectedFilter) }} style={styles.heroImage} imageStyle={styles.heroImageStyle}>
            <View style={styles.heroOverlay}>
              <View style={styles.addBtnContainer}>
                <View style={styles.addBtn}>
                  <MaterialCommunityIcons name="plus" size={32} color="#000" />
                </View>
              </View>

              <View style={styles.heroContent}>
                <Text style={styles.heroBigText} numberOfLines={1} adjustsFontSizeToFit>{heroText}</Text>
                <View style={styles.heroStatsRow}>
                  <Text style={styles.heroStatsBig}>{totalDuration}</Text>
                  <Text style={styles.heroStatsSmall}>MIN TRAINED</Text>
                </View>
              </View>

              <View style={styles.heroRightBar}>
                <Text style={styles.heroRightBarText}>100%</Text>
                <View style={styles.barTrack}>
                  <View style={styles.barFill}></View>
                </View>
                <MaterialCommunityIcons name="cog-outline" size={20} color="#666" style={{ marginTop: 8 }} />
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Workout Grid */}
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
    paddingBottom: 24,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 6,
    paddingRight: 16,
    borderRadius: 30,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  levelCircle: {
    position: 'absolute',
    left: 30,
    top: -2,
    backgroundColor: '#FF99CC',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1E1E1E',
  },
  levelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  username: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
  },
  fireContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  scoreText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  pageTitle: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterContainer: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 24,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'transparent',
  },
  filterChipActive: {
    backgroundColor: '#FF99CC',
    borderColor: '#FF99CC',
  },
  filterText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  dateStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  dateItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 44,
    height: 72,
    borderRadius: 22,
    borderWidth: 1,
    paddingVertical: 12,
  },
  dateItemActive: {
    backgroundColor: '#FF99CC',
    borderColor: '#FF99CC',
  },
  dateDay: {
    fontSize: 12,
    fontWeight: '600',
  },
  dateNum: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateDayActive: {
    color: '#000',
  },
  dateNumActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  heroCardContainer: {
    height: 280,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 32,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroImageStyle: {
    borderRadius: 32,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
    padding: 24,
  },
  addBtnContainer: {
    flexDirection: 'row',
  },
  addBtn: {
    backgroundColor: '#FF99CC',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: {
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  heroBigText: {
    color: '#FF99CC',
    fontSize: 48,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    transform: [{ rotate: '-10deg' }],
    marginLeft: -10,
    marginBottom: 8,
  },
  heroStatsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  heroStatsBig: {
    color: '#FFF',
    fontSize: 40,
    fontWeight: 'bold',
  },
  heroStatsSmall: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 8,
    opacity: 0.8,
  },
  heroRightBar: {
    position: 'absolute',
    right: 24,
    top: 24,
    bottom: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroRightBarText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  barTrack: {
    width: 6,
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    height: '60%',
    backgroundColor: '#FF99CC',
  },
  emptyContainer: {
    padding: 24,
  },
});