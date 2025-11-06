import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { invoicesAPI } from '../../src/services/api';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function InvoiceDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchInvoiceDetails();
    }
  }, [id]);

  const fetchInvoiceDetails = async () => {
    try {
      setLoading(true);
      const response = await invoicesAPI.getById(id as string);
      if (response?.data?.data?.invoice) {
        setInvoice(response.data.data.invoice);
      }
    } catch (error) {
      console.error('Error fetching invoice details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (!invoice) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Invoice Details</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Invoice not found</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invoice Details</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.invoiceNumber}>Invoice #{invoice.invoiceNumber}</Text>
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Amount</Text>
              <Text style={styles.amount}>${invoice.totalAmount?.toLocaleString()}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoValue}>
                {new Date(invoice.invoiceDate || invoice.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={[styles.infoValue, invoice.status === 'paid' ? styles.paid : styles.unpaid]}>
                {invoice.status}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Member</Text>
              <Text style={styles.infoValue}>
                {invoice.member?.firstName} {invoice.member?.lastName}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#1E293B', padding: 24, paddingTop: 60, flexDirection: 'row', alignItems: 'center' },
  backButton: { marginRight: 16 },
  backText: { color: '#FFFFFF', fontSize: 16 },
  headerTitle: { fontSize: 32, fontWeight: '800', color: '#FFFFFF' },
  content: { padding: 16 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  invoiceNumber: { fontSize: 24, fontWeight: '700', color: '#1E293B', marginBottom: 24 },
  infoSection: { marginTop: 8 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  infoLabel: { fontSize: 16, color: '#64748B' },
  infoValue: { fontSize: 16, fontWeight: '600', color: '#1E293B' },
  amount: { fontSize: 24, fontWeight: '700', color: '#10B981' },
  paid: { color: '#10B981' },
  unpaid: { color: '#EF4444' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 8 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { fontSize: 16, color: '#64748B' },
});


