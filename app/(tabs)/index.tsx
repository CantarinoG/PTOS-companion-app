import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Colors, Typography } from '../../src/constants/theme';
import { Button } from '../../src/components/Button';
import { PlusCircle, Wheat, Beef, Droplets, Sparkles, MessageSquare, Check } from 'lucide-react-native';
import { Card } from '../../src/components/Card';
import { ProgressBar } from '../../src/components/ProgressBar';
import { BaseModal } from '../../src/components/BaseModal';

export default function MacroIntake() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState('');
    const [carbs, setCarbs] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [generatedMacros, setGeneratedMacros] = useState(false)

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
                onPress={() => {
                    setIsModalVisible(true)
                    setCalories("")
                    setCarbs("")
                    setProtein("")
                    setFat("")
                    setDescription("")
                    setGeneratedMacros(false)
                }}
                icon={<PlusCircle size={22} color={Colors.surface} strokeWidth={2.5} />}
            />

            <BaseModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            >
                <Text style={Typography.overline}>New Entry</Text>
                <Text style={Typography.h2}>Meal</Text>

                <Card style={{ marginVertical: 12 }}>
                    <View style={styles.row}>
                        <MessageSquare size={22} color={Colors.primary} strokeWidth={2.5} />
                        <Text style={Typography.overline}>Description</Text>
                    </View>
                    <TextInput
                        style={styles.value}
                        placeholder="Describe your meal"
                        value={description}
                        onChangeText={setDescription}
                    />
                </Card>

                {generatedMacros && (
                    <View style={styles.macroGrid}>
                        <View style={styles.macroColumn}>
                            <Card style={styles.compactCard}>
                                <View style={styles.row}>
                                    <Sparkles size={18} color={Colors.primary} strokeWidth={2.5} />
                                    <Text style={Typography.overline}>Calories</Text>
                                </View>
                                <TextInput
                                    style={styles.compactValue}
                                    placeholder="0"
                                    keyboardType="numeric"
                                    value={calories}
                                    onChangeText={setCalories}
                                />
                            </Card>
                            <Card style={styles.compactCard}>
                                <View style={styles.row}>
                                    <Beef size={18} color={Colors.primary} strokeWidth={2.5} />
                                    <Text style={Typography.overline}>Protein</Text>
                                </View>
                                <TextInput
                                    style={styles.compactValue}
                                    placeholder="0g"
                                    keyboardType="numeric"
                                    value={protein}
                                    onChangeText={setProtein}
                                />
                            </Card>
                        </View>
                        <View style={styles.macroColumn}>
                            <Card style={styles.compactCard}>
                                <View style={styles.row}>
                                    <Wheat size={18} color={Colors.primary} strokeWidth={2.5} />
                                    <Text style={Typography.overline}>Carbs</Text>
                                </View>
                                <TextInput
                                    style={styles.compactValue}
                                    placeholder="0g"
                                    keyboardType="numeric"
                                    value={carbs}
                                    onChangeText={setCarbs}
                                />
                            </Card>
                            <Card style={styles.compactCard}>
                                <View style={styles.row}>
                                    <Droplets size={18} color={Colors.primary} strokeWidth={2.5} />
                                    <Text style={Typography.overline}>Fat</Text>
                                </View>
                                <TextInput
                                    style={styles.compactValue}
                                    placeholder="0g"
                                    keyboardType="numeric"
                                    value={fat}
                                    onChangeText={setFat}
                                />
                            </Card>
                        </View>
                    </View>
                )}

                {generatedMacros ? (<Button
                    label="Confirm"
                    onPress={() => {
                        setIsModalVisible(false);
                    }}
                    icon={<Check size={22} color={Colors.surface} strokeWidth={2.5} />}
                />) : (<Button
                    label="Extract macros"
                    onPress={
                        () => {
                            setGeneratedMacros(true);
                        }
                    }
                    icon={<Sparkles size={22} color={Colors.surface} strokeWidth={2.5} />}
                />)}

            </BaseModal>

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
    },
    value: {
        ...Typography.boldBody,
        paddingVertical: 10,
        textAlignVertical: 'center',
    },
    macroGrid: {
        flexDirection: 'row',
        gap: 12,
        marginVertical: 12,
        width: '100%',
    },
    macroColumn: {
        flex: 1,
        gap: 12,
    },
    compactCard: {
        padding: 16,
        gap: 4,
    },
    compactValue: {
        ...Typography.h2,
        paddingVertical: 4,
        textAlignVertical: 'center',
    },
});
