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
import { useAuth } from '../../src/contexts/AuthContext';
import { sessionsAPI, trainingSessionsAPI } from '../../src/services/api';
import { useRouter } from 'expo-router';

export default function SessionsScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      let response;
      if (user?.role === 'trainer') {
        response = await trainingSessionsAPI.getByTrainer(user.id);
      } else {
        response = await sessionsAPI.getByMember(user?.id);
      }
      if (response?.data?.data?.sessions) {
        setSessions(response.data.data.sessions);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchSessions();
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
        <Text style={styles.headerTitle}>Sessions</Text>
      </View>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item._id || item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.sessionCard}>
            <Text style={styles.sessionDate}>
              {new Date(item.date || item.checkInTime).toLocaleDateString()}
            </Text>
            <Text style={styles.sessionTime}>
              {new Date(item.checkInTime || item.startTime).toLocaleTimeString()}
            </Text>
            {item.status && (
              <Text style={styles.sessionStatus}>{item.status}</Text>
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No sessions found</Text>
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
  sessionCard: {
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
  sessionDate: { fontSize: 18, fontWeight: '600', color: '#1E293B', marginBottom: 4 },
  sessionTime: { fontSize: 14, color: '#64748B', marginBottom: 4 },
  sessionStatus: { fontSize: 12, color: '#3b82f6', fontWeight: '500' },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#64748B' },
});


