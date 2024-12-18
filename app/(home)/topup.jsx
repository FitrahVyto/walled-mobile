import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function Topup() {
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState(''); 
    const [transaction, setTransaction] = useState(null);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        fetchBalance();
    }, []);

    const fetchBalance = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) return;

            // Gunakan endpoint /profile karena di situ terdapat data balance
            const response = await fetch('https://walled-api-phi.vercel.app/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Respons JSON
            const result = await response.json();
            
            if (response.ok && result.data && result.data.wallet && result.data.wallet.balance) {
                // Ambil balance dari result.data.wallet.balance
                setBalance(parseFloat(result.data.wallet.balance));
            } else {
                console.error("Failed to fetch balance:", result);
            }
        } catch (err) {
            console.error("Error fetching balance:", err);
        }
    };

    const handleTopUp = async () => {
        try {
            const token = await AsyncStorage.getItem('token'); 
            if (!token) {
                Alert.alert('Error', 'Token not found. Please log in again.');
                return;
            }

            const response = await fetch('https://walled-api-phi.vercel.app/transactions/topup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    amount,
                    description
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setTransaction(result.data);
                Alert.alert('Success', 'Top up successful');
                // Setelah top up berhasil, refresh balance
                fetchBalance();
            } else {
                Alert.alert('Error', result.message || 'Top up failed');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred. Please try again later.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Amount Section */}
            <View style={{ padding: 10, width: '100%', backgroundColor: 'white', marginBottom: 24 }}>
                <Text style={{ color: '#b3b3b3' }}>Amount</Text>
                <View style={{ flexDirection: 'row', borderBottomColor: '#b3b3b3', borderBottomWidth: 0.5 }}>
                    <Text style={{ fontSize: 16, marginRight: 12, marginTop: 12 }}>IDR</Text>
                    <TextInput
                        style={{ fontSize: 40 }}
                        placeholder="100000"
                        keyboardType="number-pad"
                        value={amount.toString()}
                        onChangeText={text => setAmount(parseFloat(text) || 0)} 
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={{ color: '#b3b3b3' }}>Balance</Text>
                    {/* Menampilkan balance yang diambil dari /profile */}
                    <Text style={{ color: '#19918F' }}>IDR {balance.toLocaleString('id-ID')}</Text>
                </View>
            </View>

            {/* Picker Section */}
            <View style={{ padding: 10, width: '100%', backgroundColor: 'white', marginBottom: 24 }}>
                <Text style={{ color: '#b3b3b3' }}>Payment Method</Text>
                <Picker
                    selectedValue="default"
                    style={{ width: '100%', marginBottom: 22 }}
                    onValueChange={(itemValue) => console.log(itemValue)}
                >
                    <Picker.Item label="BYOND Pay" value="option1" />
                    <Picker.Item label="OVO" value="option2" />
                    <Picker.Item label="Gopay" value="option3" />
                </Picker>
            </View>

            {/* Description Section */}
            <View style={{ padding: 10, width: '100%', backgroundColor: 'white', marginBottom: 24 }}>
                <Text style={{ color: '#b3b3b3' }}>Description</Text>
                <TextInput
                    style={{ borderBottomColor: '#b3b3b3', borderBottomWidth: 0.5 }}
                    placeholder="Dari istri"
                    value={description}
                    onChangeText={setDescription}
                />
            </View>

            {/* Button Section */}
            <TouchableOpacity
                style={{
                    backgroundColor: '#008080',
                    paddingVertical: 15,
                    alignItems: 'center',
                    borderRadius: 5,
                    marginTop: 20,
                    width: '100%',
                }}
                onPress={handleTopUp}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Top Up</Text>
            </TouchableOpacity>

            {/* Display Transaction Details */}
            {transaction && (
                <View style={{ padding: 10, backgroundColor: 'white', marginTop: 24 }}>
                    <Text style={{ color: '#b3b3b3' }}>Transaction Details</Text>
                    <Text>ID: {transaction.id}</Text>
                    <Text>Description: {transaction.description}</Text>
                    <Text>Date: {new Date(transaction.transaction_date).toLocaleString()}</Text>
                    <Text>Amount: {transaction.amount}</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    picker: {
        width: '100%',
        marginBottom: 22,
    }
});
