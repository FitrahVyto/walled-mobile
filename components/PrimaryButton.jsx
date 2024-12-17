import { TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';
export default function PrimaryButton({ text = "Click Me!", bgColor = "#19918F", handlePress = () => { } }) {
    return (
        <TouchableOpacity onPress={handlePress} style={{ ...styles.button, backgroundColor: bgColor }}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#19918F',
        padding: 15,
        borderRadius: 16,
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center'
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});