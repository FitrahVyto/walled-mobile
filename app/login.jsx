import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, StyleSheet, Image } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import LoginIcon from '../assets/icon.png';
import { Link, useNavigation, router } from 'expo-router';
import { set, z } from "zod";
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(5, { message: 'Password must be at least 5 characters long' }),
})

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Login() {
    const [form, setForm] = useState({

    })
    const [errorsMsg, setErrors] = useState({})
    const [serverError, setServerError] = useState("")

    const handleInputChange = (key, value) => {
        setForm({ ...form, [key]: value })
        try {
            LoginSchema.pick({ [key]: true }).parse({ [key]: value });
            setErrors((prev) => ({ ...prev, [key]: "" }));
        } catch (err) {
            setErrors((prev) => ({ ...prev, [key]: err.errors[0].message }))
        }
    }

    const handleSubmit = async () => {
        console.log('submit!', form);
        try {
            LoginSchema.parse(form);
            const res = await axios.post("https://walled-api.vercel.app/auth/login", form);
            if (res) {
                try {
                    await AsyncStorage.setItem('token', res.data.data.token);
                    console.log('token berhasil disimpan');
                    alert('Login Berhasil!');
                    router.replace('/(home)');

                } catch (err) {
                    console.log(err, 'error menyimpan token')
                }
            }
        }catch (err) {
            console.log(err.response.data.error, 'error')
            setServerError(err.response.data.error);
            // const validation = err.errors;
            // console.log(err, 'error kedua')
            // const errors = {}
            // validation.map((item) => {
            //     const key = item.path[0];
            //     errors[key] = item.message;
            // })
            // setErrors(errors);
        }
    }
    return (
        <View style={[styles.container, { flexDirection: 'column' }]}>
            <StatusBar style="dark" />
            <Image source={LoginIcon} style={styles.iconImage} />
            <TextInput style={{ ...styles.input }} placeholder='Email' keyboardType='email-address' onChangeText={(text) => handleInputChange('email', text)} />
            {errorsMsg.email && <Text style={styles.errorMessage}>{errorsMsg.email}</Text>}
            <TextInput style={{ ...styles.input }} placeholder='Password' secureTextEntry={true} onChangeText={(text) => handleInputChange('password', text)} />
            {errorsMsg.password && <Text style={styles.errorMessage}>{errorsMsg.password}</Text>}
            <PrimaryButton text='Login' handlePress={handleSubmit}></PrimaryButton>
            <Text style={styles.serverError}>{serverError}</Text>
            <View style={{ flexDirection: 'row', width: '100%', gap: 4, marginTop: 10 }}>
                <Text style={styles.loginDesc}>Don’t have account? </Text>
                <Link href='/register'><Text style={{ fontWeight: 'bold' }}>Register Here</Text></Link>
            </View>
            {/* <Link style={{ marginTop: 20 }} href='/(home)'><Text>Ke Home!</Text></Link> */}
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
    errorMessage: {
        width: '100%',
        color: 'red',
        marginTop: -10,
        marginBottom: 10,
    },
    serverError: {
        width: '100%',
        marginTop: 10,
        color: 'red'
    }

});