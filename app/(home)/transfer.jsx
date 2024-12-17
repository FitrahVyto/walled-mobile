import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";

export default function Transfer() {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#ddd' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={{ backgroundColor: '#19918F', paddingHorizontal: 20, paddingVertical: 8, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 18 }}>To:</Text>
                <TextInput
                    style={{ fontSize: 18, color: '#fff' }}
                    keyboardType="number-pad"
                    placeholder="insert account number"
                    placeholderTextColor="#fff"
                />
            </View>
            
            <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
                <View>
                    {/* Amount component */}
                    <View style={{ padding: 10, width: '100%', backgroundColor: 'white', marginBottom: 24 }}>
                        <Text style={{ color: '#b3b3b3' }}>Amount</Text>
                        <View style={{ flexDirection: 'row', borderBottomColor: '#b3b3b3', borderBottomWidth: 0.5 }}>
                            <Text style={{ fontSize: 16, marginRight: 12, marginTop: 12 }}>IDR</Text>
                            <TextInput style={{ fontSize: 40 }} placeholder="100.000" keyboardType="number-pad" />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <Text style={{ color: '#b3b3b3' }}>Balance</Text>
                            <Text style={{ color: '#19918F' }}>IDR 10.000.000</Text>
                        </View>
                    </View>
                    
                    {/* Input component */}
                    <View style={{ padding: 10, width: '100%', backgroundColor: 'white', marginBottom: 24 }}>
                        <Text style={{ color: '#b3b3b3' }}>Notes</Text>
                        <TextInput style={{ borderBottomColor: '#b3b3b3', borderBottomWidth: 0.5 }} placeholder="Add a note" />
                    </View>
                </View>

                {/* Button component */}
                <TouchableOpacity
                    style={{
                        backgroundColor: '#008080',
                        paddingVertical: 15,
                        alignItems: 'center',
                        borderRadius: 5,
                        marginTop: 20,
                        width: '100%',
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Transfer</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
