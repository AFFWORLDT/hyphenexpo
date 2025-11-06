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
import { invoicesAPI } from '../src/services/api';
import { useRouter } from 'expo-router';

export default function InvoicesScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await invoicesAPI.getAll();
      if (response?.data?.data?.invoices) {
        setInvoices(response.data.data.invoices);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchInvoices();
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
        <Text style={styles.headerTitle}>Invoices</Text>
      </View>
      <FlatList
        data={invoices}
        keyExtractor={(item) => item._id || item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.invoiceCard}
            onPress={() => router.push(`/invoice-details/${item._id || item.id}`)}
          >
            <View style={styles.invoiceInfo}>
              <Text style={styles.invoiceNumber}>#{item.invoiceNumber}</Text>
              <Text style={styles.invoiceAmount}>${item.totalAmount?.toLocaleString()}</Text>
              <Text style={styles.invoiceDate}>
                {new Date(item.invoiceDate || item.createdAt).toLocaleDateString()}
              </Text>
              <Text style={[styles.status, item.status === 'paid' ? styles.paid : styles.unpaid]}>
                {item.status}
              </Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No invoices found</Text>
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
  invoiceCard: {
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
  invoiceInfo: { flex: 1 },
  invoiceNumber: { fontSize: 18, fontWeight: '600', color: '#1E293B', marginBottom: 4 },
  invoiceAmount: { fontSize: 20, fontWeight: '700', color: '#10B981', marginBottom: 4 },
  invoiceDate: { fontSize: 14, color: '#64748B', marginBottom: 4 },
  status: { fontSize: 12, fontWeight: '500', textTransform: 'capitalize' },
  paid: { color: '#10B981' },
  unpaid: { color: '#EF4444' },
  arrow: { fontSize: 20, color: '#64748B' },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#64748B' },
});


