import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { equipmentAPI } from '../../src/services/api';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function EquipmentDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [equipment, setEquipment] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchEquipmentDetails();
    }
  }, [id]);

  const fetchEquipmentDetails = async () => {
    try {
      setLoading(true);
      const response = await equipmentAPI.getById(id as string);
      if (response?.data?.data?.equipment) {
        setEquipment(response.data.data.equipment);
      }
    } catch (error) {
      console.error('Error fetching equipment details:', error);
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

  if (!equipment) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Equipment Details</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Equipment not found</Text>
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
        <Text style={styles.headerTitle}>Equipment Details</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.name}>{equipment.name}</Text>
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Category</Text>
              <Text style={styles.infoValue}>{equipment.category || 'N/A'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={[styles.infoValue, equipment.status === 'available' ? styles.available : styles.unavailable]}>
                {equipment.status || 'N/A'}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{equipment.location || 'N/A'}</Text>
            </View>
            {equipment.description && (
              <>
                <View style={styles.divider} />
                <View style={styles.descriptionRow}>
                  <Text style={styles.infoLabel}>Description</Text>
                  <Text style={styles.description}>{equipment.description}</Text>
                </View>
              </>
            )}
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
  name: { fontSize: 24, fontWeight: '700', color: '#1E293B', marginBottom: 24 },
  infoSection: { marginTop: 8 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  infoLabel: { fontSize: 16, color: '#64748B' },
  infoValue: { fontSize: 16, fontWeight: '600', color: '#1E293B' },
  available: { color: '#10B981' },
  unavailable: { color: '#EF4444' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 8 },
  descriptionRow: { paddingVertical: 12 },
  description: { fontSize: 14, color: '#64748B', marginTop: 8 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { fontSize: 16, color: '#64748B' },
});


