import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useAuth } from '../../src/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Push Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => router.push('/(tabs)/profile')}
        >
          <Text style={styles.settingButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => router.push('/notifications')}
        >
          <Text style={styles.settingButtonText}>Notifications</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#1E293B', padding: 24, paddingTop: 60 },
  headerTitle: { fontSize: 32, fontWeight: '800', color: '#FFFFFF' },
  section: { margin: 16, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 16 },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: { fontSize: 16, color: '#1E293B' },
  settingButton: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingButtonText: { fontSize: 16, color: '#3b82f6' },
});

