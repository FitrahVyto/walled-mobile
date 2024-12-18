import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';



export default function Topup() {
    const [amount, setAmount] = useState(0);
    const [transaction, setTransaction] = useState(null);

    const handleTopUp = async () => {
        try {
            const token = await AsyncStorage.getItem('token'); // Ambil token dari AsyncStorage
            
            if (!token) {
                Alert.alert('Error', 'Token not found. Please log in again.');
                return;
            }

            const response = await fetch('https://walled-api.vercel.app/transactions/topup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Tambahkan Authorization header
                },
                body: JSON.stringify({ amount }),
            });

            if (response.ok) {
                const result = await response.json();
                setTransaction(result.data); // Simpan data transaksi

                Alert.alert('Success', 'Top up successful');
                // Optionally, navigate to another screen or perform other actions
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Top up failed');
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
                        placeholder="100.000"
                        keyboardType="number-pad"
                        value={amount.toString()}
                        onChangeText={text => setAmount(parseFloat(text) || 0)} // Parsing value
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={{ color: '#b3b3b3' }}>Balance</Text>
                    <Text style={{ color: '#19918F' }}>IDR 10.000.000</Text>
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

            {/* Notes Section */}
            <View style={{ padding: 10, width: '100%', backgroundColor: 'white', marginBottom: 24 }}>
                <Text style={{ color: '#b3b3b3' }}>Notes</Text>
                <TextInput
                    style={{ borderBottomColor: '#b3b3b3', borderBottomWidth: 0.5 }}
                    placeholder="Add a note"
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
                    <Text>Name: {transaction.id}</Text>
                    <Text>Type: {transaction.description}</Text>
                    <Text>Date: {new Date(transaction.transaction_date).toLocaleString()}</Text>
                    <Text>Amount: {transaction.transactionAmountMinus}</Text>
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
