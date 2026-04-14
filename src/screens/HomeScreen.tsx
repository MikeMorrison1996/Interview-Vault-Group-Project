import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

type Application = {
    id: string;
    company: string;
    role: string;
    status: string;
    interviewDate?: string;
};

export default function HomeScreen({ navigation }: any) {
    const [applications, setApplications] = useState<Application[]>([]);
    const [quote, setQuote] = useState('Loading interview tip...');
    const [loading, setLoading] = useState(true);

    const loadApplications = async () => {
        try {
            const storedData = await AsyncStorage.getItem('applications');
            if (storedData) {
                const parsed = JSON.parse(storedData);
                setApplications(parsed);
            } else {
                setApplications([]);
            }
        } catch (error) {
            console.log('Error loading applications:', error);
            setApplications([]);
        }
    };

    const loadQuote = async () => {
        try {
            const response = await fetch('https://dummyjson.com/quotes/random');
            const data = await response.json();

            if (data?.quote && data?.author) {
                setQuote(`"${data.quote}" — ${data.author}`);
            } else {
                setQuote('Stay consistent. Every application is progress.');
            }
        } catch (error) {
            console.log('Error fetching quote:', error);
            setQuote('Stay consistent. Every application is progress.');
        }
    };

    const loadDashboard = async () => {
        setLoading(true);
        await loadApplications();
        await loadQuote();
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            loadDashboard();
        }, [])
    );

    const totalApplications = applications.length;

    const upcomingInterviews = applications.filter((app) => {
        if (!app.interviewDate) return false;
        return new Date(app.interviewDate) >= new Date();
    }).length;

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Interview Vault</Text>
                <Text style={styles.subtitle}>Your job search, organised.</Text>

                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Dashboard Summary</Text>
                    <Text style={styles.summaryText}>
                        You currently have {totalApplications} application
                        {totalApplications !== 1 ? 's' : ''} tracked and {upcomingInterviews}{' '}
                        upcoming interview{upcomingInterviews !== 1 ? 's' : ''}.
                    </Text>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{totalApplications}</Text>
                        <Text style={styles.statLabel}>Total Applications</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{upcomingInterviews}</Text>
                        <Text style={styles.statLabel}>Upcoming Interviews</Text>
                    </View>
                </View>

                <View style={styles.quoteCard}>
                    <Text style={styles.quoteTitle}>Interview Tip</Text>
                    {loading ? (
                        <ActivityIndicator size="small" />
                    ) : (
                        <Text style={styles.quoteText}>{quote}</Text>
                    )}
                </View>

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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#f7f8fa',
    },
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: '#1a1a2e',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#777',
        textAlign: 'center',
        marginBottom: 30,
    },
    summaryCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 18,
        marginBottom: 18,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a2e',
        marginBottom: 8,
    },
    summaryText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18,
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    statNumber: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1a1a2e',
        marginBottom: 6,
    },
    statLabel: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
    },
    quoteCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 18,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    quoteTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a2e',
        marginBottom: 8,
    },
    quoteText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
        fontStyle: 'italic',
    },
    button: {
        backgroundColor: '#1a1a2e',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 32,
        marginBottom: 14,
        width: '100%',
        alignItems: 'center',
    },
    buttonSecondary: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: '#1a1a2e',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
    },
    buttonTextSecondary: {
        color: '#1a1a2e',
    },
});