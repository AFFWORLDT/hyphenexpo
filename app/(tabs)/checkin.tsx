import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { useAuth } from '../../src/contexts/AuthContext';
import { checkinAPI } from '../../src/services/api';

export default function CheckinScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeSessions, setActiveSessions] = useState<any[]>([]);

  useEffect(() => {
    fetchActiveSessions();
  }, []);

  const fetchActiveSessions = async () => {
    try {
      setLoading(true);
      const response = await checkinAPI.getActiveSessions();
      if (response?.data?.data?.sessions) {
        setActiveSessions(response.data.data.sessions);
      }
    } catch (error) {
      console.error('Error fetching active sessions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleCheckout = async (sessionId: string) => {
    try {
      await checkinAPI.checkout(sessionId, 'Staff checkout');
      Alert.alert('Success', 'Member checked out successfully');
      fetchActiveSessions();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Checkout failed');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchActiveSessions();
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
        <Text style={styles.headerTitle}>Check-in Management</Text>
      </View>
      <FlatList
        data={activeSessions}
        keyExtractor={(item) => item._id || item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <View style={styles.sessionCard}>
            <View style={styles.sessionInfo}>
              <Text style={styles.memberName}>
                {item.member?.firstName} {item.member?.lastName}
              </Text>
              <Text style={styles.checkinTime}>
                Check-in: {new Date(item.checkInTime).toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => handleCheckout(item._id || item.id)}
            >
              <Text style={styles.checkoutButtonText}>Check Out</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No active sessions</Text>
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
  sessionInfo: { marginBottom: 12 },
  memberName: { fontSize: 18, fontWeight: '600', color: '#1E293B', marginBottom: 4 },
  checkinTime: { fontSize: 14, color: '#64748B' },
  checkoutButton: {
    backgroundColor: '#EF4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#64748B' },
});


