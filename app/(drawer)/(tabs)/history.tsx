import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HistoryScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const theme = {
        bg: isDark ? '#121212' : '#F8F9FA',
        text: isDark ? '#FFF' : '#111827',
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.bg }]}>
            <Text style={[styles.title, { color: theme.text }]}>Historique</Text>
            <Text style={[styles.subtitle, { color: theme.text }]}>Vos dernières séances</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.7,
    },
});
