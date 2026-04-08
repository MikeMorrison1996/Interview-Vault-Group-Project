import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { saveApplication, updateApplication } from '../storage/applicationStorage';
import { Application, ApplicationStatus } from '../types/Application';

// All valid statuses — rendered as a picker row
const STATUS_OPTIONS: ApplicationStatus[] = [
    'Applied',
    'Interview Scheduled',
    'Interviewed',
    'Offer Received',
    'Rejected',
    'Withdrawn',
];

// Simple date validator: expects YYYY-MM-DD
const isValidDate = (value: string): boolean => {
    if (!value) return true; // empty is allowed (interviewDate is optional)
    return /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(new Date(value).getTime());
};

export default function AddEditApplicationScreen({ navigation, route }: any) {
    // If route.params.application is present → edit mode
    const existingApp: Application | undefined = route?.params?.application;
    const isEditing = !!existingApp;

    // ─── Form state ──────────────────────────────────────────────────────────
    const [company, setCompany] = useState(existingApp?.company ?? '');
    const [title, setTitle] = useState(existingApp?.title ?? '');
    const [status, setStatus] = useState<ApplicationStatus>(
        existingApp?.status ?? 'Applied'
    );
    const [applicationDate, setApplicationDate] = useState(
        existingApp?.applicationDate ?? new Date().toISOString().split('T')[0]
    );
    const [interviewDate, setInterviewDate] = useState(
        existingApp?.interviewDate ?? ''
    );
    const [notes, setNotes] = useState(existingApp?.notes ?? '');

    // ─── UI state ────────────────────────────────────────────────────────────
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Application' : 'Add Application',
        });
    }, [isEditing, navigation]);

    // ─── Validation ──────────────────────────────────────────────────────────
    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!company.trim()) newErrors.company = 'Company name is required.';
        if (!title.trim()) newErrors.title = 'Job title is required.';
        if (!applicationDate.trim()) {
            newErrors.applicationDate = 'Application date is required.';
        } else if (!isValidDate(applicationDate)) {
            newErrors.applicationDate = 'Use YYYY-MM-DD format.';
        }
        if (interviewDate && !isValidDate(interviewDate)) {
            newErrors.interviewDate = 'Use YYYY-MM-DD format.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ─── Submit ──────────────────────────────────────────────────────────────
    const handleSave = async () => {
        if (!validate()) return;

        setSaving(true);
        try {
            const payload = {
                company: company.trim(),
                title: title.trim(),
                status,
                applicationDate,
                interviewDate,
                notes: notes.trim(),
            };

            if (isEditing && existingApp) {
                await updateApplication(existingApp.id, payload);
            } else {
                await saveApplication(payload);
            }

            // Go back — let the previous screen reload from storage
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to save application. Please try again.');
            console.error('handleSave error:', error);
        } finally {
            setSaving(false);
        }
    };

    // ─── Render helpers ──────────────────────────────────────────────────────
    const renderField = (
        label: string,
        value: string,
        onChange: (v: string) => void,
        options: {
            placeholder?: string;
            multiline?: boolean;
            errorKey?: string;
        } = {}
    ) => {
        const { placeholder, multiline = false, errorKey } = options;
        const errorMsg = errorKey ? errors[errorKey] : undefined;

        return (
            <View style={styles.fieldWrapper}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                    style={[
                        styles.input,
                        multiline && styles.textArea,
                        errorMsg ? styles.inputError : null,
                    ]}
                    value={value}
                    onChangeText={onChange}
                    placeholder={placeholder ?? label}
                    placeholderTextColor="#aaa"
                    multiline={multiline}
                    numberOfLines={multiline ? 4 : 1}
                    textAlignVertical={multiline ? 'top' : 'center'}
                />
                {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
            </View>
        );
    };

    // ─── Render ──────────────────────────────────────────────────────────────
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.heading}>
                    {isEditing ? 'Edit Application' : 'New Application'}
                </Text>

                {renderField('Company', company, setCompany, {
                    placeholder: 'e.g. Google',
                    errorKey: 'company',
                })}

                {renderField('Job Title', title, setTitle, {
                    placeholder: 'e.g. Software Engineer Intern',
                    errorKey: 'title',
                })}

                {/* Status picker */}
                <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>Status</Text>
                    <View style={styles.statusRow}>
                        {STATUS_OPTIONS.map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[
                                    styles.statusChip,
                                    status === option && styles.statusChipActive,
                                ]}
                                onPress={() => setStatus(option)}
                            >
                                <Text
                                    style={[
                                        styles.statusChipText,
                                        status === option && styles.statusChipTextActive,
                                    ]}
                                >
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {renderField('Application Date', applicationDate, setApplicationDate, {
                    placeholder: 'YYYY-MM-DD',
                    errorKey: 'applicationDate',
                })}

                {renderField(
                    'Interview Date (optional)',
                    interviewDate,
                    setInterviewDate,
                    { placeholder: 'YYYY-MM-DD', errorKey: 'interviewDate' }
                )}

                {renderField('Notes', notes, setNotes, {
                    placeholder: 'Add any notes, contacts, or interview prep...',
                    multiline: true,
                })}

                <TouchableOpacity
                    style={[styles.saveButton, saving && styles.saveButtonDisabled]}
                    onPress={handleSave}
                    disabled={saving}
                >
                    {saving ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveButtonText}>
                            {isEditing ? 'Save Changes' : 'Add Application'}
                        </Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f8fa',
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    heading: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a1a2e',
        marginBottom: 24,
    },
    fieldWrapper: {
        marginBottom: 18,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444',
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: '#1a1a2e',
    },
    inputError: {
        borderColor: '#e74c3c',
    },
    textArea: {
        height: 100,
        paddingTop: 12,
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 12,
        marginTop: 4,
    },
    statusRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    statusChip: {
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        marginBottom: 4,
    },
    statusChipActive: {
        backgroundColor: '#1a1a2e',
        borderColor: '#1a1a2e',
    },
    statusChipText: {
        fontSize: 13,
        color: '#555',
    },
    statusChipTextActive: {
        color: '#fff',
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: '#1a1a2e',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonDisabled: {
        opacity: 0.6,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});
