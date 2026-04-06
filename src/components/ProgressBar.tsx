import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors, Typography } from '../constants/theme';

interface ProgressBarProps {
    progress: number; // 0 to 1
    goal?: number; // 0 to 1
    goalLabel?: string;
    style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    goal,
    goalLabel,
    style,
}) => {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const clampedGoal = goal !== undefined ? Math.max(0, Math.min(1, goal)) : undefined;

    return (
        <View style={[styles.container, style]}>
            <View style={styles.track}>
                <View style={styles.backgroundBar} />
                <View
                    style={[
                        styles.progressBar,
                        { width: `${clampedProgress * 100}%` }
                    ]}
                />
                {clampedGoal !== undefined && (
                    <View style={[styles.goalContainer, { left: `${clampedGoal * 100}%` }]}>
                        <View style={styles.goalMarker} />
                        {goalLabel && (
                            <Text style={styles.goalLabel}>{goalLabel}</Text>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 15,
        marginBottom: 10,
    },
    track: {
        height: 4,
        width: '100%',
        position: 'relative',
        justifyContent: 'center',
    },
    backgroundBar: {
        position: 'absolute',
        height: 2,
        width: '100%',
        backgroundColor: '#EAEAEA',
        borderRadius: 1,
    },
    progressBar: {
        position: 'absolute',
        height: 4,
        backgroundColor: Colors.primary,
        borderRadius: 2,
    },
    goalContainer: {
        position: 'absolute',
        alignItems: 'center',
        width: 100,
        marginLeft: -50,
        top: -6,
    },
    goalMarker: {
        width: 2,
        height: 16,
        backgroundColor: Colors.primary,
        borderRadius: 1,
    },
    goalLabel: {
        marginTop: 4,
        fontSize: 10,
        fontFamily: Typography.overline.fontFamily,
        color: Colors.primary,
        fontWeight: '800',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
});
