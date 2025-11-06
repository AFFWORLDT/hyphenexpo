import { Redirect } from 'expo-router';
import { useAuth } from '../src/contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
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

  return <Redirect href="/(auth)/login" />;
}

