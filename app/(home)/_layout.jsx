import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', HeaderShown: false }}>
            <Tabs.Screen
                name="index"

                options={{
                    headerShown: false,
                    tabBarIcon: (() => <Ionicons name='home' color='black' size={32}/>)
                }}
            />
            <Tabs.Screen
                name="topup" 
                options={{
                    // headerShown: false,
                    tabBarIcon: (() => <Ionicons name='home' color='black' size={32}/>)
                }}
            />
            <Tabs.Screen
                name="transfer"
                options={{
                    // headerShown: false,
                    tabBarIcon: (() => <Ionicons name='home' color='black'size={32}/>)
                }}
            />
        </Tabs>
    );
}