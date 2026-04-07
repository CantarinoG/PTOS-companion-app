import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import * as SplashScreen from 'expo-splash-screen';
import {
    useFonts,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold
} from '@expo-google-fonts/plus-jakarta-sans';
import { Colors, Typography } from '../src/constants/theme';
import { initializeDatabase } from '../src/modules/database/db';
import { RootSiblingParent } from 'react-native-root-siblings';

SplashScreen.preventAutoHideAsync();


export default function Layout() {
    const [loaded, error] = useFonts({
        PlusJakartaSans_400Regular,
        PlusJakartaSans_500Medium,
        PlusJakartaSans_600SemiBold,
        PlusJakartaSans_700Bold,
        PlusJakartaSans_800ExtraBold,
    });

    if (!loaded && !error) {
        return null;
    }

    return (
        <RootSiblingParent>
            <SQLiteProvider databaseName="ptos.db" onInit={initializeDatabase}>
                <MainLayout />
            </SQLiteProvider>
        </RootSiblingParent>
    );
}

function MainLayout() {
    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.background,
                },
                headerShadowVisible: false,
                headerTintColor: Colors.primary,
                headerTitle: (props) => (
                    <Text
                        style={{
                            fontFamily: Typography.appBarTitle.fontFamily,
                            fontSize: Typography.appBarTitle.fontSize,
                            lineHeight: Typography.appBarTitle.lineHeight,
                            letterSpacing: Typography.appBarTitle.letterSpacing,
                            color: Colors.primary,
                        }}
                    >
                        {props.children}
                    </Text>
                ),
                contentStyle: {
                    backgroundColor: Colors.background,
                }
            }}
        >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}
