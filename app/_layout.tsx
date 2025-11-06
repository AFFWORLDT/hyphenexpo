import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Slot } from 'expo-router';
import { AuthProvider } from '../src/contexts/AuthContext';
import { View, StyleSheet } from 'react-native';
import '../global.css';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

