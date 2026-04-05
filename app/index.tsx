import { StyleSheet, Text, View } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function Home() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Home' }} />
            <Text style={styles.title}>Water Tracker</Text>
            <Text>Work in Progress...</Text>
            <Link href="/settings" style={styles.link}>Go to Settings</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    link: {
        marginTop: 15,
        color: 'blue',
    },
});
