import { StyleSheet } from 'react-native';

export const COLORS = {
    primary: '#4F46E5',     // indigo
    background: '#F3F4F6',  // light grey
    card: '#FFFFFF',        // white cards
    text: '#111827',        // main text
    subtext: '#6B7280',     // secondary text
    border: '#D1D5DB',      // light borders
    danger: '#EF4444',      // delete button
    white: '#FFFFFF',
};

export const SPACING = {
    small: 8,
    medium: 16,
    large: 24,
};

export const globalStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.background,
        padding: SPACING.medium,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: SPACING.large,
        color: COLORS.text,
    },

    sectionLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: SPACING.small,
        color: COLORS.text,
    },

    valueText: {
        fontSize: 16,
        color: COLORS.text,
        marginBottom: SPACING.medium,
    },

    card: {
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: SPACING.medium,
        marginBottom: SPACING.medium,
        borderRadius: 8,
    },

    notesBox: {
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: SPACING.medium,
        minHeight: 100,
        marginBottom: SPACING.large,
        borderRadius: 8,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.small,
        marginTop: SPACING.small,
    },
});