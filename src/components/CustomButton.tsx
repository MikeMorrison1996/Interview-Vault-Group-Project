import React from 'react';
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
    ViewStyle,
} from 'react-native';

interface Props {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'danger' | 'outline';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
}

export default function CustomButton({
    label,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style,
}: Props) {
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            style={[
                styles.base,
                variant === 'primary' && styles.primary,
                variant === 'danger' && styles.danger,
                variant === 'outline' && styles.outline,
                isDisabled && styles.disabled,
                style,
            ]}
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' ? '#1a1a2e' : '#fff'} />
            ) : (
                <Text
                    style={[
                        styles.text,
                        variant === 'outline' && styles.textOutline,
                    ]}
                >
                    {label}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primary: {
        backgroundColor: '#1a1a2e',
    },
    danger: {
        backgroundColor: '#e74c3c',
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: '#1a1a2e',
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
    },
    textOutline: {
        color: '#1a1a2e',
    },
});
