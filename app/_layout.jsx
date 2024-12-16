import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Welcome', headerShown: false }} />
            <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
            <Stack.Screen name="(home)" options={{}} />
            <Stack.Screen name="register" options={{}} />
        </Stack >
    );
}
