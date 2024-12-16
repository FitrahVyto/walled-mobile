// transfer.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

export default function Transfer() {
    const [toAccount, setToAccount] = useState('9000008940208');
    const [amount, setAmount] = useState('100000');
    const [notes, setNotes] = useState('');

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Transfer</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.label}>To:</Text>
                <TextInput
                    style={styles.input}
                    value={toAccount}
                    onChangeText={setToAccount}
                    placeholder="Enter account number"
                    keyboardType="number-pad"
                />

                <Text style={styles.label}>Amount (IDR):</Text>
                <TextInput
                    style={styles.input}
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="Enter amount"
                    keyboardType="number-pad"
                />

                <Text style={styles.balance}>Balance: IDR 10.000.000</Text>

                <Text style={styles.label}>Notes:</Text>
                <TextInput
                    style={styles.input}
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Add a note"
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Transfer</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    formContainer: {
        width: '100%',
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    balance: {
        marginBottom: 10,
        color: 'gray',
    },
    button: {
        backgroundColor: '#008080',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
