import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Colors, Typography } from '../../src/constants/theme';

export default function MacroIntake() {
    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <Stack.Screen options={{ title: 'Macros' }} />

            <View style={styles.hero}>
                <Text style={Typography.overline}>Current Status</Text>
                <Text style={Typography.h1}>Macro Intake</Text>
            </View>

            <View style={styles.intake}>
                <Text style={styles.watermark}>CAL</Text>
                <Text style={Typography.display}>1500 <Text style={Typography.body}>cal</Text></Text>
                <Text style={[Typography.overline, { marginLeft: 20 }]}>Goal 2000cal</Text>
            </View>

            <View></View>

            <View></View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    hero: {
        width: '100%',
        alignItems: 'flex-start',
    },
    intake: {
        width: '100%',
        alignItems: 'flex-start',
        position: 'relative',
    },
    watermark: {
        position: 'absolute',
        fontSize: 120,
        fontFamily: 'PlusJakartaSans_800ExtraBold',
        color: Colors.primary,
        opacity: 0.05,
        bottom: -30,
        right: -10,
    },
});
