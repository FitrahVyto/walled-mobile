import { View, Text, StyleSheet, Image } from "react-native";
import ProfilePhoto from "./ProfilePhoto";
import ThemeToggle from "./ThemeToggle";

export default function Header({ profile }) {
    return (
        <View style={styles.header}>
            <View style={{ flexDirection: 'row', columnGap: 10, alignItems: 'center' }}>
                <ProfilePhoto src={{ uri: profile?.avatar_url }} />
                <View>
                    <Text style={{ fontWeight: 'bold' }}>{profile?.fullname}</Text>
                    <Text>{profile?.email}</Text>
                </View>
            </View>
            <ThemeToggle />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        height: 70,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
