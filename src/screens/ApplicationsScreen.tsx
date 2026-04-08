import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getApplications } from '../storage/applicationStorage';

import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';

export default function ApplicationsScreen({ navigation }: any) {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            const data = await getApplications();
            setApplications(data || []);
        } catch (error) {
            console.log('Error loading applications:', error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Loading state
    if (loading) {
        return <LoadingState message="Loading applications..." />;
    }

    // ✅ Empty state
    if (applications.length === 0) {
        return <EmptyState message="No applications yet" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Applications</Text>

            <FlatList
                data={applications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate('ApplicationDetails', { application: item })
                        }
                    >
                        <Text style={styles.company}>{item.company}</Text>
                        <Text>{item.title}</Text>
                        <Text style={styles.status}>{item.status}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
    card: {
        padding: 15,
        backgroundColor: '#eee',
        borderRadius: 10,
        marginBottom: 10,
    },
    company: { fontWeight: 'bold', fontSize: 16 },
    status: { marginTop: 5, color: 'blue' },
});