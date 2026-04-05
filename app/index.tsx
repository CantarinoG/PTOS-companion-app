import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Settings, PlusCircle } from 'lucide-react-native';
import { Colors, Typography } from '../src/constants/theme';
import { Button } from '../src/components/Button';

export default function Home() {
    const router = useRouter();

    return (
        <View style={styles.container}>
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

            <View></View>

            <Button
                label="Register Intake"
                onPress={() => console.log('Register Intake pressed')}
                icon={<PlusCircle size={22} color={Colors.surface} strokeWidth={2.5} />}
            />

        </View>
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
