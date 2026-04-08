import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Application } from '../types/Application';

// Maps each status to a colour dot so the list is scannable at a glance
const STATUS_COLORS: Record<string, string> = {
    'Applied': '#3498db',
    'Interview Scheduled': '#f39c12',
    'Interviewed': '#9b59b6',
    'Offer Received': '#27ae60',
    'Rejected': '#e74c3c',
    'Withdrawn': '#95a5a6',
};

interface Props {
    application: Application;
    onPress: () => void;
}

export default function ApplicationCard({ application, onPress }: Props) {
    const statusColor = STATUS_COLORS[application.status] ?? '#888';

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
            <View style={styles.row}>
                <View style={styles.info}>
                    <Text style={styles.company}>{application.company}</Text>
                    <Text style={styles.title}>{application.title}</Text>
                    <Text style={styles.date}>Applied: {application.applicationDate}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColor + '22', borderColor: statusColor }]}>
                    <Text style={[styles.statusText, { color: statusColor }]}>
                        {application.status}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    info: {
        flex: 1,
    },
    company: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a2e',
        marginBottom: 2,
    },
    title: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    date: {
        fontSize: 12,
        color: '#aaa',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
        maxWidth: 130,
        alignItems: 'center',
    },
    statusText: {
        fontSize: 11,
        fontWeight: '600',
        textAlign: 'center',
    },
});
