import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function CalendarScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Calendar View</Text>
          <Text style={styles.placeholderSubtext}>Calendar functionality coming soon</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#1E293B', padding: 24, paddingTop: 60, flexDirection: 'row', alignItems: 'center' },
  backButton: { marginRight: 16 },
  backText: { color: '#FFFFFF', fontSize: 16 },
  headerTitle: { fontSize: 32, fontWeight: '800', color: '#FFFFFF' },
  content: { flex: 1 },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  placeholderText: { fontSize: 24, fontWeight: '600', color: '#1E293B', marginBottom: 8 },
  placeholderSubtext: { fontSize: 16, color: '#64748B' },
});

