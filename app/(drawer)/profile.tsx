import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// const AVATAR_IMAGE_URL = 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop';

const PROFILE = {
  username: 'Challenger',
  email: 'challenger@healthsphere.com',
  memberSince: '2026',
  favouriteSport: 'Musculation',
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop'
};

export default function ProfileScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const theme = {
    bg: isDark ? '#121212' : '#F8F9FA',
    card: isDark ? '#1A1A1A' : '#FFFFFF',
    textPrimary: isDark ? '#FFF' : '#111827',
    textSecondary: isDark ? '#888' : '#6B7280',
    border: isDark ? '#2A2A2A' : '#E5E7EB',
    accent: '#FF99CC',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Avatar */}
        <View style={styles.hero}>
          <Image
            source={{ uri: PROFILE.avatar }}
            style={[styles.avatarCircle, { borderColor: theme.accent }]}
          />
          <Text style={[styles.username, { color: theme.textPrimary }]}>{PROFILE.username}</Text>
          <Text style={[styles.email, { color: theme.textSecondary }]}>{PROFILE.email}</Text>
        </View>

        {/* Info card */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.cardTitle, { color: theme.accent }]}>Informations</Text>

          {/* Member since */}
          <View style={[styles.row, { borderBottomColor: theme.border }]}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons name="calendar-outline" size={20} color={theme.accent} />
              <Text style={[styles.rowLabel, { color: theme.textSecondary }]}>Membre depuis</Text>
            </View>
            <Text style={[styles.rowValue, { color: theme.textPrimary }]}>{PROFILE.memberSince}</Text>
          </View>

          {/* Favourite sport */}
          <View style={[styles.row, { borderBottomColor: theme.border }]}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons name="dumbbell" size={20} color={theme.accent} />
              <Text style={[styles.rowLabel, { color: theme.textSecondary }]}>Sport favori</Text>
            </View>
            <Text style={[styles.rowValue, { color: theme.textPrimary }]}>{PROFILE.favouriteSport}</Text>
          </View>

          {/* Email */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons name="email-outline" size={20} color={theme.accent} />
              <Text style={[styles.rowLabel, { color: theme.textSecondary }]}>Email</Text>
            </View>
            <Text style={[styles.rowValue, { color: theme.textPrimary }]}>{PROFILE.email}</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },

  hero: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 16,
  },
  avatarCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    overflow: 'hidden',
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },

  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowLabel: {
    fontSize: 14,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});