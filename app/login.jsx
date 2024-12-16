import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import LoginIcon from '../assets/icon.png';
import { Link } from 'expo-router';

export default function Login() {
    return (
        <View style={[styles.container, { flexDirection: 'column' }]}>
            <StatusBar style="dark" />
            <Image source={LoginIcon} style={styles.iconImage} />
            <TextInput style={styles.input} placeholder='Email' keyboardType='email-address' />
            <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} />
            <TextInput style={styles.input} placeholder='Alamat' secureTextEntry={true} />
            <PrimaryButton text='Login' ></PrimaryButton>
            <View style={{ flexDirection: 'row', width: '100%', gap: 4, marginTop: 10 }}>
                <Text style={styles.loginDesc}>Don’t have account? </Text>
                <Link href='/register'><Text style={{ fontWeight: 'bold' }}>Register Here</Text></Link>
            </View>
            <Link href='/(home)'><Text>Ke Home!</Text></Link>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontWeight: '800',
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        paddingTop: 100,
        padding: 35,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
    },
    button: {
        margin: 10,
        backgroundColor: '#4DB6AC',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 15,
        // height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    loginText: {
        fontWeight: 'bold',
        color: "#fff",
        // fontSize: 16,
    },
    iconImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});