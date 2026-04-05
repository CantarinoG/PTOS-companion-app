import { StyleSheet, Text, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Colors } from '../src/constants/theme';

export default function Home() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Home' }} />
            <Text style={styles.title}>Water Tracker</Text>
            <Text style={styles.subtitle}>Seu progresso diário aparecerá aqui.</Text>
            <Link href="/settings" style={styles.link}>Configurações</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontFamily: 'PlusJakartaSans_800ExtraBold',
        color: Colors.primary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'PlusJakartaSans_400Regular',
        color: Colors.secondary,
        marginBottom: 24,
    },
    link: {
        fontSize: 16,
        fontFamily: 'PlusJakartaSans_600SemiBold',
        color: '#528DBD',
        textDecorationLine: 'underline',
    },
});
