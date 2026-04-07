import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Colors, Typography } from '../../src/constants/theme';
import { Button } from '../../src/components/Button';
import { PlusCircle, Wheat, Beef, Droplets } from 'lucide-react-native';
import { Card } from '../../src/components/Card';
import { ProgressBar } from '../../src/components/ProgressBar';

export default function MacroIntake() {
    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <Stack.Screen options={{ title: 'Macros' }} />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.hero}>
                    <Text style={Typography.overline}>Current Status</Text>
                    <Text style={Typography.h1}>Macro Intake</Text>
                </View>

                <View style={styles.intake}>
                    <Text style={styles.watermark}>CAL</Text>
                    <Text style={Typography.display}>1500 <Text style={Typography.body}>cal</Text></Text>
                    <Text style={[Typography.overline, { marginLeft: 20 }]}>Goal 2000cal</Text>
                </View>

                <View style={{ gap: 10, width: '100%', marginTop: 20 }}>
                    <Card style={{ gap: 10 }}>
                        <View style={styles.row}>
                            <Wheat size={22} color={Colors.primary} strokeWidth={2.5} />
                            <Text style={Typography.overline}>Carbs</Text>
                        </View>
                        <Text style={Typography.display2}>150g<Text style={Typography.body}> / 200g</Text></Text>
                        <ProgressBar progress={0.75} />
                    </Card>

                    <Card style={{ gap: 10 }}>
                        <View style={styles.row}>
                            <Beef size={22} color={Colors.primary} strokeWidth={2.5} />
                            <Text style={Typography.overline}>Protein</Text>
                        </View>
                        <Text style={Typography.display2}>100g<Text style={Typography.body}> / 150g</Text></Text>
                        <ProgressBar progress={0.67} />
                    </Card>

                    <Card style={{ gap: 10 }}>
                        <View style={styles.row}>
                            <Droplets size={22} color={Colors.primary} strokeWidth={2.5} />
                            <Text style={Typography.overline}>Fat</Text>
                        </View>
                        <Text style={Typography.display2}>100g<Text style={Typography.body}> / 150g</Text></Text>
                        <ProgressBar progress={0.67} />
                    </Card>
                </View>
            </ScrollView>

            <Button
                label="Register Intake"
                onPress={() => { }}
                icon={<PlusCircle size={22} color={Colors.surface} strokeWidth={2.5} />}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },
    scrollView: {
        width: '100%',
        flex: 1,
    },
    scrollContent: {
        alignItems: 'center',
        paddingBottom: 20,
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
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        gap: 10,
    }
});
