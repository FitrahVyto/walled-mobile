import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
            <Tabs.Screen
                name="topup"
                options={{
                    title: 'Topup',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }} />
            <Tabs.Screen
                name="transfer"
                options={{
                    title: 'Transfer',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }} />

        </Tabs>
    );
}