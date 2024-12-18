import React, { useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Platform, 
    Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Transfer() {
    const [recipientAccount, setRecipientAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [transaction, setTransaction] = useState(null);
    const [balance, setBalance] = useState(10000000); // Jika ingin dinamis, fetch dari endpoint profile seperti pada topup.

    const handleTransfer = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                Alert.alert("Error", "Token not found. Please log in again.");
                return;
            }

            // Validasi input
            if (!recipientAccount || !amount) {
                Alert.alert("Error", "Please fill in the recipient account and amount.");
                return;
            }

            const response = await fetch('https://walled-api-phi.vercel.app/transactions/transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: parseFloat(amount),
                    recipientWalletId: recipientAccount,
                    description: description || "No description"
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setTransaction(result.data);
                Alert.alert('Success', 'Transfer successful');
                // Reset form
                setRecipientAccount("");
                setAmount("");
                setDescription("");
            } else {
                Alert.alert('Error', result.message || 'Transfer failed');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred. Please try again later.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* Recipient Input */}
            <View style={styles.header}>
                <Text style={styles.headerText}>To:</Text>
                <TextInput
                    style={styles.inputRecipient}
                    keyboardType="number-pad"
                    placeholder="insert account number"
                    placeholderTextColor="#fff"
                    value={recipientAccount}
                    onChangeText={setRecipientAccount}
                />
            </View>
            
            <View style={styles.contentContainer}>
                <View>
                    {/* Amount Section */}
                    <View style={styles.amountContainer}>
                        <Text style={styles.amountLabel}>Amount</Text>
                        <View style={styles.amountInputContainer}>
                            <Text style={styles.currencyText}>IDR</Text>
                            <TextInput 
                                style={styles.amountInput} 
                                placeholder="100000" 
                                keyboardType="number-pad" 
                                value={amount}
                                onChangeText={setAmount}
                            />
                        </View>
                        <View style={styles.balanceRow}>
                            <Text style={styles.balanceLabel}>Balance</Text>
                            <Text style={styles.balanceValue}>IDR {balance.toLocaleString('id-ID')}</Text>
                        </View>
                    </View>
                    
                    {/* Notes Section */}
                    <View style={styles.notesContainer}>
                        <Text style={styles.notesLabel}>Notes</Text>
                        <TextInput 
                            style={styles.notesInput}
                            placeholder="Add a note"
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>
                </View>

                {/* Transfer Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleTransfer}
                >
                    <Text style={styles.buttonText}>Transfer</Text>
                </TouchableOpacity>

                {transaction && (
                    <View style={styles.transactionDetails}>
                        <Text style={styles.transactionDetailsLabel}>Transaction Details</Text>
                        <Text>ID: {transaction.id}</Text>
                        <Text>Type: {transaction.transaction_type}</Text>
                        <Text>Description: {transaction.description}</Text>
                        <Text>Date: {new Date(transaction.transaction_date).toLocaleString()}</Text>
                        <Text>Amount: {transaction.amount}</Text>
                        <Text>Recipient Wallet ID: {transaction.recipient_wallet_id}</Text>
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    header: {
        backgroundColor: '#19918F',
        paddingHorizontal: 20,
        paddingVertical: 8,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        marginRight: 10,
    },
    inputRecipient: {
        fontSize: 18,
        color: '#fff',
        flex: 1
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    amountContainer: {
        padding: 10,
        width: '100%',
        backgroundColor: 'white',
        marginBottom: 24,
    },
    amountLabel: {
        color: '#b3b3b3',
    },
    amountInputContainer: {
        flexDirection: 'row',
        borderBottomColor: '#b3b3b3',
        borderBottomWidth: 0.5,
    },
    currencyText: {
        fontSize: 16,
        marginRight: 12,
        marginTop: 12,
    },
    amountInput: {
        fontSize: 40,
    },
    balanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    balanceLabel: {
        color: '#b3b3b3',
    },
    balanceValue: {
        color: '#19918F',
    },
    notesContainer: {
        padding: 10,
        width: '100%',
        backgroundColor: 'white',
        marginBottom: 24,
    },
    notesLabel: {
        color: '#b3b3b3',
    },
    notesInput: {
        borderBottomColor: '#b3b3b3',
        borderBottomWidth: 0.5,
    },
    button: {
        backgroundColor: '#008080',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    transactionDetails: {
        padding: 10,
        backgroundColor: 'white',
        marginTop: 24,
    },
    transactionDetailsLabel: {
        color: '#b3b3b3',
    }
});
