import { Link, Stack } from 'expo-router';
import { Image, Text, View, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import DashboardBody from '../../components/DashboardBody';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import { useState, useEffect } from 'react';

// const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Home() {
    const [profile, setProfile] = useState(null); // State untuk menyimpan data profil

    useEffect(() => {
        console.log('use effect!');
        const getToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token !== null) {
                    console.log('token ada', token)
                    
                    const res = await axios.get(`https://walled-api-phi.vercel.app/profile`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    if (res.status === 200) {
                        console.log(res.data, 'ini data transaksi');
                        setProfile(res.data.data); // Simpan data profil ke state
                    }
                }
            } catch (err) {
                console.log(err, 'error get token')
            }
        }
        getToken()
    }, [])

    return (
        <View style={styles.container}>
            <Header profile={profile}/>
            {profile && (
                <DashboardBody
                    fullname={profile.fullname}
                    balance={profile.wallet.balance}
                    accountNumber={profile.wallet.account_number}
                />
            )}
            {/* <Link href='/(home)'>Ke Home</Link> */}
        </View>
    );
}

//     return (
//         <View style={styles.container}>
//             <Header />
//             <DashboardBody />
//             <Link href='/(home)'>Ke Home</Link>
//         </View >
//     );
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%'
    },
});