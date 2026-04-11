import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { deleteApplication } from '../storage/applicationStorage';
import { Application } from '../types/Application';

// ─── Placeholder for Natasha ──────────────────────────────────────────────
// Natasha will complete styling, polish, and the full details layout.
// Delete logic is wired up here so the flow works end-to-end.

export default function ApplicationDetailsScreen({ navigation, route }: any) {
    const application: Application = route.params.application;

    const handleDelete = () => {
        Alert.alert(
            'Delete Application',
            `Remove ${application.company} – ${application.title}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
<<<<<<< HEAD
                        await deleteApplication(application.id);
                        navigation.goBack();
=======
                        try {
                            await deleteApplication(application.id);
                            navigation.goBack();
                        } catch (error) {
                            console.log('Error deleting application:', error);
                        }
>>>>>>> 896a0b61dd89a72863a8dc0675de32981128a9b9
                    },
                },
            ]
        );
    };

    return (
<<<<<<< HEAD
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.company}>{application.company}</Text>
            <Text style={styles.title}>{application.title}</Text>
            <Text style={styles.status}>{application.status}</Text>

            <View style={styles.row}>
                <Text style={styles.label}>Applied:</Text>
                <Text style={styles.value}>{application.applicationDate}</Text>
            </View>
            {!!application.interviewDate && (
                <View style={styles.row}>
                    <Text style={styles.label}>Interview:</Text>
                    <Text style={styles.value}>{application.interviewDate}</Text>
                </View>
            )}
            {!!application.notes && (
                <View style={styles.notesBox}>
                    <Text style={styles.label}>Notes</Text>
                    <Text style={styles.notes}>{application.notes}</Text>
                </View>
            )}

            <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                    navigation.navigate('AddEditApplication', { application })
                }
            >
                <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f8fa' },
    content: { padding: 24, paddingBottom: 40 },
    company: { fontSize: 24, fontWeight: '800', color: '#1a1a2e', marginBottom: 4 },
    title: { fontSize: 17, color: '#555', marginBottom: 8 },
    status: { fontSize: 14, color: '#3498db', fontWeight: '600', marginBottom: 20 },
    row: { flexDirection: 'row', marginBottom: 10 },
    label: { fontSize: 14, fontWeight: '600', color: '#888', width: 80 },
    value: { fontSize: 14, color: '#1a1a2e' },
    notesBox: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginTop: 12, marginBottom: 12 },
    notes: { fontSize: 14, color: '#444', marginTop: 6, lineHeight: 21 },
    editButton: { backgroundColor: '#1a1a2e', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 20, marginBottom: 10 },
    editButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
    deleteButton: { backgroundColor: '#e74c3c', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
    deleteButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
=======
        <ScrollView contentContainerStyle={globalStyles.container}>
            <Text style={globalStyles.sectionLabel}>Company Name</Text>
            <Text style={globalStyles.valueText}>{application.company}</Text>

            <Text style={globalStyles.sectionLabel}>Application Title</Text>
            <Text style={globalStyles.valueText}>{application.title}</Text>

            <Text style={globalStyles.sectionLabel}>Status</Text>
            <Text style={globalStyles.valueText}>{application.status}</Text>

            <Text style={globalStyles.sectionLabel}>Application Date</Text>
            <Text style={globalStyles.valueText}>
                {application.applicationDate || 'Not provided'}
            </Text>

            <Text style={globalStyles.sectionLabel}>Interview Date</Text>
            <Text style={globalStyles.valueText}>
                {application.interviewDate || 'Not provided'}
            </Text>

            <Text style={globalStyles.sectionLabel}>Notes</Text>
            <View style={globalStyles.notesBox}>
                <Text style={globalStyles.valueText}>
                    {application.notes || 'No notes added.'}
                </Text>
            </View>

            <View style={globalStyles.row}>
                <CustomButton
                    title="Edit"
                    onPress={handleEdit}
                    variant="primary"
                    style={{ flex: 1 }}
                />

                <CustomButton
                    title="Delete"
                    onPress={handleDelete}
                    variant="danger"
                    style={{ flex: 1 }}
                />
            </View>
        </ScrollView>
    );
}
>>>>>>> 896a0b61dd89a72863a8dc0675de32981128a9b9
