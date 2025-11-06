import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { appointmentsAPI } from '../src/services/api';
import { useRouter } from 'expo-router';

export default function AppointmentsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await appointmentsAPI.getAll();
      if (response?.data?.data?.appointments) {
        setAppointments(response.data.data.appointments);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchAppointments();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointments</Text>
      </View>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id || item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.appointmentCard}>
            <View style={styles.appointmentInfo}>
              <Text style={styles.appointmentDate}>
                {new Date(item.date || item.appointmentDate).toLocaleDateString()}
              </Text>
              <Text style={styles.appointmentTime}>
                {new Date(item.time || item.appointmentTime).toLocaleTimeString()}
              </Text>
              <Text style={styles.appointmentMember}>
                {item.client?.firstName} {item.client?.lastName}
              </Text>
              <Text style={[styles.status, item.status === 'confirmed' ? styles.confirmed : styles.pending]}>
                {item.status}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No appointments found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#1E293B', padding: 24, paddingTop: 60, flexDirection: 'row', alignItems: 'center' },
  backButton: { marginRight: 16 },
  backText: { color: '#FFFFFF', fontSize: 16 },
  headerTitle: { fontSize: 32, fontWeight: '800', color: '#FFFFFF' },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentInfo: { flex: 1 },
  appointmentDate: { fontSize: 18, fontWeight: '600', color: '#1E293B', marginBottom: 4 },
  appointmentTime: { fontSize: 14, color: '#64748B', marginBottom: 4 },
  appointmentMember: { fontSize: 16, color: '#1E293B', marginBottom: 4 },
  status: { fontSize: 12, fontWeight: '500', textTransform: 'capitalize' },
  confirmed: { color: '#10B981' },
  pending: { color: '#F59E0B' },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#64748B' },
});


