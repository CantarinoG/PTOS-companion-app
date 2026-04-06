import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Settings, PlusCircle } from 'lucide-react-native';
import { Colors, Typography } from '../src/constants/theme';
import { Button } from '../src/components/Button';
import { Card } from '../src/components/Card';
import { ProgressBar } from '../src/components/ProgressBar';
import { BaseModal } from '../src/components/BaseModal';

export default function Home() {
    const router = useRouter();
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <Stack.Screen
                options={{
                    title: 'PTOS',
                    headerRight: () => (
                        <Pressable
                            onPress={() => {
                                router.push('/settings');
                            }}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                                marginRight: 10,
                            })}
                        >
                            <Settings size={22} color={Colors.primary} />
                        </Pressable>
                    ),
                }}
            />

            <View style={styles.hero}>
                <Text style={Typography.overline}>Current Status</Text>
                <Text style={Typography.h1}>Water Intake</Text>
            </View>

            <View style={styles.intake}>
                <Text style={styles.watermark}>H2O</Text>
                <Text style={Typography.display}>800 <Text style={Typography.body}>ml</Text></Text>
                <Text style={[Typography.overline, { marginLeft: 20 }]}>Goal 2000ml</Text>
            </View>

            <Card style={{ gap: 10 }}>
                <View style={styles.row}>
                    <Text style={Typography.overline}>Performance</Text>
                    <Text style={Typography.overline}>Gap</Text>
                </View>
                <View style={styles.row}>
                    <Text style={Typography.boldBody}>Behind Schedule</Text>
                    <Text style={[Typography.boldBody, { color: Colors.deficit }]}>-400ml</Text>
                </View>

                <ProgressBar
                    progress={0.35}
                    goal={0.55}
                    goalLabel="Goal: 1200ml"
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
                <Text>Modal</Text>
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
