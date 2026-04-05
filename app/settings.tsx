import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Colors, Typography } from '../src/constants/theme';
import { Card } from '../src/components/Card';
import { Button } from '../src/components/Button';
import { Check, Droplet, Sun, Moon } from 'lucide-react-native';

export default function Settings() {
    const [wakeUpTime, setWakeUpTime] = useState(new Date(new Date().setHours(7, 0, 0, 0)));
    const [sleepTime, setSleepTime] = useState(new Date(new Date().setHours(23, 0, 0, 0)));
    const [showWakePicker, setShowWakePicker] = useState(false);
    const [showSleepPicker, setShowSleepPicker] = useState(false);

    const onWakeTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowWakePicker(Platform.OS === 'ios');
        if (selectedDate) setWakeUpTime(selectedDate);
    };

    const onSleepTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowSleepPicker(Platform.OS === 'ios');
        if (selectedDate) setSleepTime(selectedDate);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };


    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <Stack.Screen options={{ title: 'PTOS' }} />

            <View style={styles.hero}>
                <Text style={Typography.h1}>Settings</Text>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Card>
                    <View style={styles.row}>
                        <Droplet size={22} color={Colors.primary} strokeWidth={2.5} />
                        <Text style={Typography.overline}>Intake Goal (ml/day)</Text>
                    </View>
                    <TextInput
                        style={styles.value}
                        placeholder="2000"
                        keyboardType="numeric"
                        onChangeText={() => null}
                    />
                </Card>

                <Card>
                    <Pressable onPress={() => setShowWakePicker(true)}>
                        <View style={styles.row}>
                            <Sun size={22} color={Colors.primary} strokeWidth={2.5} />
                            <Text style={Typography.overline}>Wake up time</Text>
                        </View>
                        <Text style={styles.value}>{formatTime(wakeUpTime)}</Text>
                    </Pressable>

                    {showWakePicker && (
                        <DateTimePicker
                            value={wakeUpTime}
                            mode="time"
                            is24Hour={true}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            accentColor={Colors.primary}
                            textColor={Colors.primary}
                            onChange={onWakeTimeChange}
                        />
                    )}
                </Card>

                <Card>
                    <Pressable onPress={() => setShowSleepPicker(true)}>
                        <View style={styles.row}>
                            <Moon size={22} color={Colors.primary} strokeWidth={2.5} />
                            <Text style={Typography.overline}>Sleep time</Text>
                        </View>
                        <Text style={styles.value}>{formatTime(sleepTime)}</Text>
                    </Pressable>

                    {showSleepPicker && (
                        <DateTimePicker
                            value={sleepTime}
                            mode="time"
                            is24Hour={true}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            accentColor={Colors.primary}
                            textColor={Colors.primary}
                            onChange={onSleepTimeChange}
                        />
                    )}
                </Card>
                <Card><Text style={Typography.body}>Theme Preferences</Text></Card>
            </ScrollView>

            <Button
                label="Save Changes"
                onPress={() => console.log('Save Changes pressed')}
                icon={<Check size={22} color={Colors.surface} strokeWidth={2.5} />}
            />

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
        marginBottom: 20,
    },
    scrollView: {
        width: '100%',
        flex: 1,
    },
    scrollContent: {
        gap: 16,
        paddingBottom: 20,
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
});
