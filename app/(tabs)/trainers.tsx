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
import { trainersAPI } from '../../src/services/api';
import { useRouter } from 'expo-router';

export default function TrainersScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [trainers, setTrainers] = useState<any[]>([]);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const response = await trainersAPI.getAll();
      if (response?.data?.data?.trainers) {
        setTrainers(response.data.data.trainers);
      }
    } catch (error) {
      console.error('Error fetching trainers:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchTrainers();
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
        <Text style={styles.headerTitle}>Trainers</Text>
      </View>
      <FlatList
        data={trainers}
        keyExtractor={(item) => item._id || item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.trainerCard}
            onPress={() => router.push(`/trainer-details/${item._id || item.id}` as any)}
          >
            <View style={styles.trainerInfo}>
              <Text style={styles.trainerName}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={styles.trainerEmail}>{item.email}</Text>
              {item.specialization && (
                <Text style={styles.specialization}>{item.specialization}</Text>
              )}
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No trainers found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#1E293B', padding: 24, paddingTop: 60 },
  headerTitle: { fontSize: 32, fontWeight: '800', color: '#FFFFFF' },
  trainerCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trainerInfo: { flex: 1 },
  trainerName: { fontSize: 18, fontWeight: '600', color: '#1E293B', marginBottom: 4 },
  trainerEmail: { fontSize: 14, color: '#64748B', marginBottom: 4 },
  specialization: { fontSize: 12, color: '#3b82f6', fontWeight: '500' },
  arrow: { fontSize: 20, color: '#64748B' },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#64748B' },
});

