import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS } from '../styles/theme';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  disabled = false,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          variant === 'primary' && styles.primaryText,
          variant === 'danger' && styles.primaryText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },

  primary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  secondary: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
  },

  danger: {
    backgroundColor: COLORS.danger,
    borderColor: COLORS.danger,
  },

  text: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: '600',
  },

  primaryText: {
    color: COLORS.white,
  },

  disabled: {
    opacity: 0.5,
  },
});