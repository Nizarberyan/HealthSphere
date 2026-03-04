import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, ImageBackground, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useWorkouts } from '@/src/context/WorkoutContext';
import { getWorkoutImage } from '@/src/utils/images';

const AVATAR_IMAGE_URL = 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop';

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
  const { workouts, refresh, isRefreshing } = useWorkouts();

  const completedWorkouts = workouts.filter(w => w.status === 'terminé');

  // Global stats
  const totalWorkouts = completedWorkouts.length;
  const totalDuration = completedWorkouts.reduce((acc, current) => acc + current.duration, 0);
  const totalCalories = totalDuration * 8; // approx 8 calories per minute

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={[]}>
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

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} tintColor="#FF99CC" />}
      >
        <Text style={[styles.pageTitle, { color: theme.textPrimary }]}>Statistiques</Text>

        {/* Global Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: theme.card }]}>
            <MaterialCommunityIcons name="dumbbell" size={28} color="#FF99CC" />
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>{totalWorkouts}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Séances</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.card }]}>
            <MaterialCommunityIcons name="clock-outline" size={28} color="#A0E8CF" />
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>{totalDuration}m</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Temps</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.card }]}>
            <MaterialCommunityIcons name="fire" size={28} color="#FFD166" />
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>{totalCalories}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Kcal</Text>
          </View>
        </View>

        {/* Hero Card */}
        <TouchableOpacity activeOpacity={0.9} onPress={() => router.push('/add-workout')} style={styles.heroCardContainer}>
          <ImageBackground source={{ uri: getWorkoutImage('All') }} style={styles.heroImage} imageStyle={styles.heroImageStyle}>
            <View style={styles.heroOverlay}>
              <View style={styles.addBtnContainer}>
                <View style={styles.addBtn}>
                  <MaterialCommunityIcons name="plus" size={32} color="#000" />
                </View>
              </View>

              <View style={styles.heroContent}>
                <Text style={styles.heroBigText} numberOfLines={1} adjustsFontSizeToFit>SÉANCES</Text>
                <View style={styles.heroStatsRow}>
                  <Text style={styles.heroStatsBig}>{totalDuration}</Text>
                  <Text style={styles.heroStatsSmall}>MIN TOTALES</Text>
                </View>
              </View>

              <View style={styles.heroRightBar}>
                <Text style={styles.heroRightBarText}>{totalWorkouts} S.</Text>
                <View style={styles.barTrack}>
                  <View style={styles.barFill}></View>
                </View>
              </View>
            </View>
          </ImageBackground>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 16,
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
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
    fontSize: 36,
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
    fontSize: 36,
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
});