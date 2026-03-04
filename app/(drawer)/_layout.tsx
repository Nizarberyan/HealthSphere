import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DrawerLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const bg = isDark ? '#121212' : '#F8F9FA';
  const active = '#FF99CC';
  const inactive = isDark ? '#888' : '#666';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          drawerStyle: { backgroundColor: bg },
          drawerActiveTintColor: active,
          drawerInactiveTintColor: inactive,
          drawerLabelStyle: { fontSize: 15, fontWeight: '600' },
          headerStyle: { backgroundColor: bg },
          headerTintColor: isDark ? '#FFF' : '#111',
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Accueil',
            title: 'HealthSphere',
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="home-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'Profil',
            title: 'Profil',
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="account-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: 'Paramètres',
            title: 'Paramètres',
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="cog-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: 'À propos',
            title: 'À propos',
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="information-outline" size={22} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}