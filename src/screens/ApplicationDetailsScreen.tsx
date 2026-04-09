import React from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { deleteApplication } from '../storage/applicationStorage';
import { globalStyles } from '../styles/theme';
import CustomButton from '../components/CustomButton';

export default function ApplicationDetailsScreen({ route, navigation }: any) {
    const { application } = route.params;

    const handleEdit = () => {
        navigation.navigate('AddEditApplication', { application });
    };

    const handleDelete = () => {
        Alert.alert(
            'Delete Application',
            'Are you sure you want to delete this application?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteApplication(application.id);
                            navigation.goBack();
                        } catch (error) {
                            console.log('Error deleting application:', error);
                        }
                    },
                },
            ]
        );
    };

    return (
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