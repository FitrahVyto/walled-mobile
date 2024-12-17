import { View, StyleSheet, TextInput, Text } from "react-native";

function Input({text}) {
    return (
        <View style={styles.container}>
            <Text style={styles.placeholder}>{text}</Text>
            <TextInput style={styles.input}></TextInput>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: '100%',
        backgroundColor: 'white',
    },
    input: {
        borderBottomColor: '#b3b3b3',
        borderBottomWidth: 0.5,
    },
    placeholder: {
        color: '#b3b3b3'
    }
});

export default Input