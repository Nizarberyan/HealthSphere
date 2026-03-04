import { useColorScheme } from '@/hooks/use-color-scheme';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F8F9FA' }]}>
      <Text style={[styles.text, { color: isDark ? '#FFF' : '#111' }]}>👤 Profil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 22, fontWeight: '700' },
});