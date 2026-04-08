import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

interface Props {
    message?: string;
}

export default function LoadingState({ message = 'Loading...' }: Props) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#1a1a2e" />
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
    },
    text: {
        marginTop: 12,
        fontSize: 15,
        color: '#666',
    },
});
