import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'green', HeaderShown: false }}>
            <Tabs.Screen
                name="index"

                options={{
                    headerShown: false,
                    tabBarIcon: (() => <FontAwesome5 name="home" size={24} color="#19918F" />)
                }}
            />
            <Tabs.Screen
                name="topup" 
                options={{
                    // headerShown: false,
                    tabBarIcon: (() => <FontAwesome6 name="money-bill-trend-up" size={24} color="#19918F" />)
                }}
            />
            <Tabs.Screen
                name="transfer"
                options={{
                    // headerShown: false,
                    tabBarIcon: (() => <FontAwesome6 name="money-bill-transfer" size={24} color="#19918F" />)
                }}
            />
        </Tabs>
    );
}