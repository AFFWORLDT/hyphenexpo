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
import { paymentsAPI } from '../src/services/api';
import { useRouter } from 'expo-router';

export default function PaymentsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await paymentsAPI.getAll();
      if (response?.data?.data?.payments) {
        setPayments(response.data.data.payments);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPayments();
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
        <Text style={styles.headerTitle}>Payments</Text>
      </View>
      <FlatList
        data={payments}
        keyExtractor={(item) => item._id || item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.paymentCard}>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentAmount}>${item.amount?.toLocaleString()}</Text>
              <Text style={styles.paymentMember}>
                {item.member?.firstName} {item.member?.lastName}
              </Text>
              <Text style={styles.paymentDate}>
                {new Date(item.date || item.createdAt).toLocaleDateString()}
              </Text>
              <Text style={[styles.status, item.status === 'paid' ? styles.paid : styles.pending]}>
                {item.status}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No payments found</Text>
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
  paymentCard: {
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
  paymentInfo: { flex: 1 },
  paymentAmount: { fontSize: 24, fontWeight: '700', color: '#10B981', marginBottom: 4 },
  paymentMember: { fontSize: 16, fontWeight: '600', color: '#1E293B', marginBottom: 4 },
  paymentDate: { fontSize: 14, color: '#64748B', marginBottom: 4 },
  status: { fontSize: 12, fontWeight: '500', textTransform: 'capitalize' },
  paid: { color: '#10B981' },
  pending: { color: '#F59E0B' },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#64748B' },
});


