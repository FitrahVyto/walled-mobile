import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header'; // Header yang sudah ada
import DashboardBody from './components/DashboardBody'; // Komponen baru
import PrimaryButton from './components/PrimaryButton';
import Input from './components/Input';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      {/* Tambahan tampilan sesuai desain, dengan dummy icon */}
      <DashboardBody />
      <StatusBar style="auto" />
      
      {/* <PrimaryButton/>   */}
      {/* <Input></Input> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height : '100%'
  },
});
