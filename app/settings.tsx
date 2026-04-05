import { StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';

export default function Settings() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Configurações' }} />
            <Text style={styles.title}>Configurações</Text>
            <Text>Aqui você poderá definir sua meta e horários.</Text>
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
});
