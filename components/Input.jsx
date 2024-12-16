import { View, StyleSheet, TextInput, Text } from 'react-native';

export default function Input() {
    return (
        <View style={styles.container}>
            <Text>Notes</Text>
            <TextInput />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    }
})