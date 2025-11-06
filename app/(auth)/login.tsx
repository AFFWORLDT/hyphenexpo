import { Redirect } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';
import LoginScreen from '../../src/screens/LoginScreen';
import { View, ActivityIndicator } from 'react-native';

export default function LoginPage() {
  const { isAuthenticated, loading } = useAuth();

  // Ensure boolean types for React Native
  const isLoading = Boolean(loading);
  const isAuth = Boolean(isAuthenticated);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (isAuth) {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  return <LoginScreen />;
}

