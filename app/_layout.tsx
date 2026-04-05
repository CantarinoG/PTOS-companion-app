import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Stack } from 'expo-router';
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

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const [loaded, error] = useFonts({
        PlusJakartaSans_400Regular,
        PlusJakartaSans_500Medium,
        PlusJakartaSans_600SemiBold,
        PlusJakartaSans_700Bold,
        PlusJakartaSans_800ExtraBold,
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

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
        />
    );
}
