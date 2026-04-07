import React from 'react';
import { Tabs } from 'expo-router';
import { Droplet, Utensils, Settings } from 'lucide-react-native';
import { Colors, Typography } from '../../src/constants/theme';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                headerTitle: 'PTOS',
                headerStyle: {
                    backgroundColor: Colors.background,
                },
                headerShadowVisible: false,
                headerTintColor: Colors.primary,
                headerTitleStyle: {
                    fontFamily: Typography.appBarTitle.fontFamily,
                    fontSize: Typography.appBarTitle.fontSize,
                },
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.tertiary,
                tabBarStyle: {
                    backgroundColor: Colors.surface,
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                tabBarLabelStyle: {
                    fontFamily: 'PlusJakartaSans_600SemiBold',
                    fontSize: 12,
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Macros',
                    tabBarLabel: 'Macros',
                    tabBarIcon: ({ color }) => <Utensils size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="water-intake"
                options={{
                    title: 'Water',
                    tabBarLabel: 'Water',
                    tabBarIcon: ({ color }) => <Droplet size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color }) => <Settings size={22} color={color} />,
                }}
            />
        </Tabs>
    );
}
