import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
    message?: string;
}

export default function EmptyState({ message = 'Nothing here yet.' }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>📭</Text>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f8fa',
        padding: 40,
    },
    icon: {
        fontSize: 48,
        marginBottom: 12,
    },
    text: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
});
