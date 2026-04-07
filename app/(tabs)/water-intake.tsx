import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import Slider from '@react-native-community/slider';
import { PlusCircle, Check } from 'lucide-react-native';
import { Colors, Typography } from '../../src/constants/theme';
import { Button } from '../../src/components/Button';
import { Card } from '../../src/components/Card';
import { ProgressBar } from '../../src/components/ProgressBar';
import { BaseModal } from '../../src/components/BaseModal';
import { useSettingsStore } from '../../src/modules/stores/settingsStore';
import { useWaterIntake } from '../../src/modules/hooks/useWaterIntake';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

function getScheduleMetrics(wakeUpTime: string, sleepTime: string) {
    const wakeUp = new Date(wakeUpTime);
    const sleep = new Date(sleepTime);
    const now = new Date();

    const todayWakeUp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), wakeUp.getHours(), wakeUp.getMinutes());
    let todaySleep = new Date(now.getFullYear(), now.getMonth(), now.getDate(), sleep.getHours(), sleep.getMinutes());
    if (todaySleep < todayWakeUp) {
        todaySleep.setDate(todaySleep.getDate() + 1);
    }

    const totalAwakeMs = todaySleep.getTime() - todayWakeUp.getTime();
    const msSinceWakeUp = Math.max(0, now.getTime() - todayWakeUp.getTime());

    return { totalAwakeMs, msSinceWakeUp, todaySleep, now };
}

function calculatePerformance(currentIntake: number, intakeGoal: number, wakeUpTime: string, sleepTime: string) {
    const { totalAwakeMs, msSinceWakeUp } = getScheduleMetrics(wakeUpTime, sleepTime);
    if (totalAwakeMs <= 0) return { timeProgress: 0, expectedIntake: 0, performanceGap: currentIntake || 0, isBehind: false };

    const timeProgress = Math.min(msSinceWakeUp / totalAwakeMs, 1);
    const expectedIntake = Math.round(intakeGoal * timeProgress);

    const performanceGap = (currentIntake || 0) - expectedIntake;
    const isBehind = performanceGap < 0;

    return { timeProgress, expectedIntake, performanceGap, isBehind };
}

async function scheduleSmartReminder(
    currentIntake: number | undefined,
    intakeGoal: number,
    wakeUpTime: string,
    sleepTime: string,
    smartReminders: boolean,
    performanceGap: number
) {
    await Notifications.cancelAllScheduledNotificationsAsync();

    if (!smartReminders || currentIntake === undefined) return;

    const { totalAwakeMs, todaySleep, now } = getScheduleMetrics(wakeUpTime, sleepTime);
    if (totalAwakeMs <= 0) return;

    const ratePerMs = intakeGoal / totalAwakeMs;

    if (performanceGap <= -200) return;

    const deltaMs = (performanceGap + 200) / ratePerMs;

    const triggerDate = new Date(now.getTime() + deltaMs);

    if (triggerDate > todaySleep) return;
    if (triggerDate <= now) return;

    const secondsFromNow = Math.max(1, Math.floor(deltaMs / 1000));

    try {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Time to Hydrate! 💧",
                body: "You've fallen 200ml behind your water schedule. Grab a quick drink to catch up!",
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: secondsFromNow,
                channelId: 'default'
            },
        });
    } catch (e) {
        console.error("scheduleSmartReminder: FAILED with error", e);
    }
}

export default function WaterIntake() {
    const intakeGoal = useSettingsStore(state => state.intakeGoal);
    const wakeUpTime = useSettingsStore(state => state.wakeUpTime);
    const sleepTime = useSettingsStore(state => state.sleepTime);
    const smartReminders = useSettingsStore(state => state.smartReminders);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [amount, setAmount] = useState(250);
    const { dailyTotal: currentIntake, addIntake } = useWaterIntake();

    const progress = Math.min((currentIntake || 0) / intakeGoal, 1);
    const { timeProgress, expectedIntake, performanceGap, isBehind } = calculatePerformance(currentIntake, intakeGoal, wakeUpTime, sleepTime);

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <Stack.Screen
                options={{
                    title: 'PTOS',
                }}
            />

            <View style={styles.hero}>
                <Text style={Typography.overline}>Current Status</Text>
                <Text style={Typography.h1}>Water Intake</Text>
            </View>

            <View style={styles.intake}>
                <Text style={styles.watermark}>H2O</Text>
                <Text style={Typography.display}>{currentIntake} <Text style={Typography.body}>ml</Text></Text>
                <Text style={[Typography.overline, { marginLeft: 20 }]}>Goal {intakeGoal}ml</Text>
            </View>

            <Card style={{ gap: 10 }}>
                <View style={styles.row}>
                    <Text style={Typography.overline}>Performance</Text>
                    <Text style={Typography.overline}>Gap</Text>
                </View>
                <View style={styles.row}>
                    <Text style={Typography.boldBody}>{isBehind ? 'Behind Schedule' : 'Ahead of Schedule'}</Text>
                    <Text style={[Typography.boldBody, { color: isBehind ? Colors.deficit : Colors.surplus }]}>
                        {isBehind ? '' : '+'}{performanceGap}ml
                    </Text>
                </View>

                <ProgressBar
                    progress={progress}
                    goal={timeProgress}
                    goalLabel={`Goal: ${expectedIntake}ml`}
                />

                <View style={styles.row}>
                    <Text style={Typography.overline}>Day Start</Text>
                    <Text style={Typography.overline}>Target</Text>
                </View>
            </Card>


            <Button
                label="Register Intake"
                onPress={() => setIsModalVisible(true)}
                icon={<PlusCircle size={22} color={Colors.surface} strokeWidth={2.5} />}
            />

            <BaseModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            >
                <Text style={Typography.overline}>New Entry</Text>
                <Text style={Typography.h2}>Add Intake</Text>
                <Text style={[Typography.display, { marginVertical: 16, textAlign: 'center' }]}>{amount}<Text style={Typography.body}>ml</Text></Text>
                <Slider
                    minimumValue={50}
                    maximumValue={1000}
                    step={50}
                    value={amount}
                    onValueChange={setAmount}
                    minimumTrackTintColor={Colors.primary}
                    maximumTrackTintColor="rgba(0,0,0,0.1)"
                    thumbTintColor={Colors.primary}
                    style={{ width: '100%', height: 40 }}
                />
                <View style={[styles.row, { marginBottom: 20 }]}>
                    <Text style={Typography.overline}>50ml</Text>
                    <Text style={Typography.overline}>1000ml</Text>
                </View>
                <Button
                    label="Confirm Intake"
                    onPress={() => {
                        const newIntake = (currentIntake || 0) + amount;
                        const newGap = performanceGap + amount;
                        scheduleSmartReminder(newIntake, intakeGoal, wakeUpTime, sleepTime, smartReminders, newGap);
                        addIntake(amount);
                        setIsModalVisible(false);
                    }}
                    icon={<Check size={22} color={Colors.surface} strokeWidth={2.5} />}
                />
            </BaseModal>

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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    }
});
