import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";

export default function Topup() {
    const [amount, setAmount] = useState(0);

    const handleTopUp = async () => {
        try {
            const response = await fetch('http://localhost:8080/topup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Top up successful');
            } else {
                Alert.alert('Error', 'Top up failed');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred');
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
                        onChangeText={setAmount}
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
                    selectedValue={"default"}
                    style={{ width: '100%', marginBottom: 22 }}
                    onValueChange={(itemValue, itemIndex) => console.log(itemValue)}
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
