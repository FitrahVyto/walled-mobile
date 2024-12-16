import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Image, Modal, Pressable, ScrollView } from 'react-native';
import LoginIcon from '../assets/icon.png';
import { Link } from 'expo-router';
import Checkbox from 'expo-checkbox';
import PrimaryButton from '../components/PrimaryButton';
import { useState } from 'react';

export default function Register() {
    const [isChecked, setChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={[styles.container, { flexDirection: 'column' }]}>
            <StatusBar style="dark" />
            <Image source={LoginIcon} style={styles.iconImage} />
            <TextInput style={styles.input} placeholder='Fullname' keyboardType='email-address' />
            <TextInput style={styles.input} placeholder='Email' keyboardType='email-address' />
            <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} />
            <TextInput style={styles.input} placeholder='Avatar Url' keyboardType='email-address' />
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 10 }}>
                <Checkbox value={isChecked} onValueChange={setChecked} />
                <Text >I have read and agree to the <Link href='/tnc'><Text style={{ color: '#19918f' }}>Terms and Conditions </Text></Link><Text style={{ color: 'red' }}>*</Text></Text>
            </View>
            <PrimaryButton text='Register' />
            <View style={{ flexDirection: 'row', width: '100%', gap: 4, marginTop: 10 }}>
                <Text style={styles.loginDesc}>have account? </Text>
                <Link href='/login'><Text style={{ fontWeight: 'bold' }}>Login Here</Text></Link>
            </View>
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
        width: '100%',
        alignItems: 'center',
    },
    loginText: {
        fontWeight: 'bold',
        color: "#fff",
    },
    iconImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    fullModalView: {
        width: '100%',
        minHeight: '100%',
        backgroundColor: 'white'
    },
    modalContent: {
        textAlign: 'justify',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    modalHeader: {
        fontSize: 60,
        fontWeight: 'bold',
    }

});