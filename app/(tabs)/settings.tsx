import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Platform, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Toast from 'react-native-root-toast';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Colors, Typography } from '../../src/constants/theme';
import { Card } from '../../src/components/Card';
import { Button } from '../../src/components/Button';
import { Check, Droplet, Sun, Moon, Bell } from 'lucide-react-native';
import * as Notifications from 'expo-notifications';
import { useSettingsStore } from '../../src/modules/stores/settingsStore';

export default function Settings() {
    const store = useSettingsStore();
    const router = useRouter();

    const [intakeGoal, setIntakeGoal] = useState(store.intakeGoal.toString());
    const [wakeUpTime, setWakeUpTime] = useState(new Date(store.wakeUpTime));
    const [sleepTime, setSleepTime] = useState(new Date(store.sleepTime));
    const [smartReminders, setSmartReminders] = useState(store.smartReminders);

    const handleNotificationsToggle = async (value: boolean) => {
        if (value) {
            const settings = await Notifications.getPermissionsAsync();
            let isGranted = settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;

            if (!isGranted) {
                const requestType = await Notifications.requestPermissionsAsync();
                isGranted = requestType.granted || requestType.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
            }

            if (isGranted) {
                setSmartReminders(true);
            } else {
                alert('Notification permissions are required for smart reminders.');
                setSmartReminders(false);
            }
        } else {
            setSmartReminders(false);
        }
    };

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

    const handleSave = () => {
        store.setIntakeGoal(parseInt(intakeGoal) || 2000);
        store.setWakeUpTime(wakeUpTime);
        store.setSleepTime(sleepTime);
        store.setSmartReminders(smartReminders);

        Toast.show('Settings saved successfully', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: false,
            animation: true,
            hideOnPress: true,
            delay: 0,
            backgroundColor: Colors.primary,
            textColor: Colors.surface,
            textStyle: {
                fontFamily: 'PlusJakartaSans_600SemiBold',
            }
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };


    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
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
                        value={intakeGoal}
                        onChangeText={setIntakeGoal}
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
                <Card><View style={styles.row}>
                    <Bell size={22} color={Colors.primary} strokeWidth={2.5} />
                    <Text style={Typography.overline}>Smart Reminders</Text>
                    <Switch
                        style={{ marginLeft: 'auto' }}
                        value={smartReminders}
                        onValueChange={handleNotificationsToggle}
                        trackColor={{ false: '#D1D1D1', true: Colors.primary }}
                        thumbColor={Platform.OS === 'ios' ? undefined : Colors.surface}
                        ios_backgroundColor="#D1D1D1"
                    />
                </View>
                    <Text style={[Typography.body, { color: Colors.subtext }]}>You are only notified when your intake lags behind your hourly target by at least 200ml, preventing notification fatigue.</Text>
                </Card>
            </ScrollView>

            <Button
                label="Save Changes"
                onPress={handleSave}
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
