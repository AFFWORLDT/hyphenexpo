import { Tabs, Redirect } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function TabsLayout() {
  const { isAuthenticated, loading, user } = useAuth();

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

  if (!isAuth) {
    return <Redirect href="/(auth)/login" />;
  }

  const role = user?.role || 'member';

  // Role-based tab navigation
  if (role === 'admin') {
    return (
      <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#3b82f6' }}>
        <Tabs.Screen name="dashboard" options={{ title: 'Dashboard', tabBarIcon: () => null }} />
        <Tabs.Screen name="members" options={{ title: 'Members', tabBarIcon: () => null }} />
        <Tabs.Screen name="trainers" options={{ title: 'Trainers', tabBarIcon: () => null }} />
        <Tabs.Screen name="staff" options={{ title: 'Staff', tabBarIcon: () => null }} />
        <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: () => null }} />
      </Tabs>
    );
  }

  if (role === 'trainer') {
    return (
      <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#3b82f6' }}>
        <Tabs.Screen name="dashboard" options={{ title: 'Dashboard', tabBarIcon: () => null }} />
        <Tabs.Screen name="sessions" options={{ title: 'Sessions', tabBarIcon: () => null }} />
        <Tabs.Screen name="members" options={{ title: 'Members', tabBarIcon: () => null }} />
        <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: () => null }} />
      </Tabs>
    );
  }

  if (role === 'staff') {
    return (
      <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#3b82f6' }}>
        <Tabs.Screen name="dashboard" options={{ title: 'Dashboard', tabBarIcon: () => null }} />
        <Tabs.Screen name="checkin" options={{ title: 'Check-in', tabBarIcon: () => null }} />
        <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: () => null }} />
      </Tabs>
    );
  }

  // Member (default)
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#3b82f6' }}>
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard', tabBarIcon: () => null }} />
      <Tabs.Screen name="sessions" options={{ title: 'Sessions', tabBarIcon: () => null }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: () => null }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: () => null }} />
    </Tabs>
  );
}

