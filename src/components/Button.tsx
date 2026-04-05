import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { Colors, Typography } from '../constants/theme';

interface ButtonProps {
    label: string;
    onPress: () => void;
    icon?: React.ReactNode;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    label,
    onPress,
    icon,
    style,
    textStyle,
    disabled = false,
}) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                { opacity: pressed || disabled ? 0.8 : 1 },
                style,
            ]}
        >
            <View style={styles.container}>
                {icon && <View style={styles.iconContainer}>{icon}</View>}
                <Text style={[styles.text, textStyle]}>{label}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 16,
        paddingVertical: 24,
        paddingHorizontal: 24,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginRight: 10,
    },
    text: {
        color: Colors.surface,
        fontFamily: Typography.label.fontFamily,
        fontSize: Typography.label.fontSize,
        lineHeight: Typography.label.lineHeight,
        fontWeight: '600',
    },
});
