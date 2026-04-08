import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// ─── Placeholder for Mike ─────────────────────────────────────────────────
// Mike will replace this with: dashboard counts, API quote, navigation buttons.

export default function HomeScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Interview Vault</Text>
            <Text style={styles.subtitle}>Your job search, organised.</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Applications')}
            >
                <Text style={styles.buttonText}>View Applications</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.buttonSecondary]}
                onPress={() => navigation.navigate('AddEditApplication')}
            >
                <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                    + Add Application
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, backgroundColor: '#f7f8fa' },
    title: { fontSize: 28, fontWeight: '800', color: '#1a1a2e', marginBottom: 8 },
    subtitle: { fontSize: 15, color: '#888', marginBottom: 40 },
    button: { backgroundColor: '#1a1a2e', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 32, marginBottom: 14, width: '100%', alignItems: 'center' },
    buttonSecondary: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: '#1a1a2e' },
    buttonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
    buttonTextSecondary: { color: '#1a1a2e' },
});
