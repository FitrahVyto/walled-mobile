import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Header from '../../components/Header';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', HeaderShown: false }}>
            <Tabs.Screen
                name="index"
            />
            <Tabs.Screen
                name="topup" />
            <Tabs.Screen
                name="transfer"
            />
        </Tabs>
    );
}