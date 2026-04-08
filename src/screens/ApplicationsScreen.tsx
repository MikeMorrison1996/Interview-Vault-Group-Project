import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getApplications } from '../storage/applicationStorage';
import { Application } from '../types/Application';
import ApplicationCard from '../components/ApplicationCard';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';

export default function ApplicationsScreen({ navigation }: any) {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    // useFocusEffect reloads every time this screen comes into focus
    // — so returning from Add/Edit or Details always shows fresh data
    useFocusEffect(
        useCallback(() => {
            loadApplications();
        }, [])
    );

    const loadApplications = async () => {
        setLoading(true);
        try {
            const data = await getApplications();
            setApplications(data || []);
        } catch (error) {
            console.error('Error loading applications:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingState message="Loading applications..." />;
    if (applications.length === 0) {
        return (
            <View style={{ flex: 1 }}>
                <EmptyState message="No applications yet. Tap + to add one." />
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => navigation.navigate('AddEditApplication')}
                >
                    <Text style={styles.fabText}>+</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={applications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ApplicationCard
                        application={item}
                        onPress={() =>
                            navigation.navigate('ApplicationDetails', { application: item })
                        }
                    />
                )}
                contentContainerStyle={styles.list}
            />
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddEditApplication')}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f8fa' },
    list: { padding: 16, paddingBottom: 100 },
    fab: {
        position: 'absolute',
        bottom: 28,
        right: 24,
        backgroundColor: '#1a1a2e',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    fabText: { color: '#fff', fontSize: 28, fontWeight: '300', lineHeight: 32 },
});
