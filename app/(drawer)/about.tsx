import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
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

        {/* Hero */}
        <View style={styles.hero}>
          <MaterialCommunityIcons name="weight-lifter" size={64} color="#FF99CC" />
          <Text style={[styles.appName, { color: theme.textPrimary }]}>HealthSphere</Text>
          <View style={[styles.versionBadge, { backgroundColor: theme.accent + '22', borderColor: theme.accent }]}>
            <Text style={[styles.versionText, { color: theme.accent }]}>Version 2.0</Text>
          </View>
        </View>

        {/* Description */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.cardTitle, { color: theme.accent }]}>Description</Text>
          <Text style={[styles.cardText, { color: theme.textSecondary }]}>
            HealthSphere est une application mobile de suivi sportif personnel. Elle te permet d'enregistrer tes séances, consulter ton historique et suivre ta progression au quotidien.
          </Text>
        </View>

        {/* Features */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.cardTitle, { color: theme.accent }]}>Fonctionnalités</Text>
          {[
            '• Suivi des séances sportives',
            '• Catalogue d\'exercices',
            '• Ajout aux favoris',
            '• Mode hors ligne',
            '• Thème sombre / clair',
          ].map((feature, index) => (
            <Text key={index} style={[styles.featureItem, { color: theme.textSecondary }]}>
              {feature}
            </Text>
          ))}
        </View>


        {/* Footer */}
        <Text style={[styles.footer, { color: theme.textSecondary }]}>
          © 2026 HealthSphere
        </Text>

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
  emoji: { fontSize: 56, marginBottom: 12 },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 10,
  },
  versionBadge: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  versionText: {
    fontSize: 13,
    fontWeight: '600',
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
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 22,
  },
  featureItem: {
    fontSize: 14,
    lineHeight: 26,
  },

  techWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techBadge: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  techText: {
    fontSize: 12,
    fontWeight: '600',
  },

  footer: {
    textAlign: 'center',
    fontSize: 13,
    marginTop: 8,
  },
});