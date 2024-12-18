import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


export default function TabLayout() {
    return (
        <Tabs 
            screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor: '#19918F',  // Warna ikon saat tab aktif
                tabBarInactiveTintColor: 'grey',   // Warna ikon saat tab tidak aktif
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="home" size={24} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="topup"
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name="money-bill-trend-up" size={24} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="transfer"
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name="paper-plane" size={24} color={color}/>
                    )
                }}
            />
        </Tabs>
    );
}
