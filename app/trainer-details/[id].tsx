import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { trainersAPI } from '../../src/services/api';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function TrainerDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [trainer, setTrainer] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchTrainerDetails();
    }
  }, [id]);

  const fetchTrainerDetails = async () => {
    try {
      setLoading(true);
      const response = await trainersAPI.getById(id as string);
      if (response?.data?.data?.trainer) {
        setTrainer(response.data.data.trainer);
      }
    } catch (error) {
      console.error('Error fetching trainer details:', error);
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

  if (!trainer) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Trainer Details</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Trainer not found</Text>
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
        <Text style={styles.headerTitle}>Trainer Details</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {trainer.firstName?.charAt(0)}{trainer.lastName?.charAt(0)}
              </Text>
            </View>
            <Text style={styles.name}>
              {trainer.firstName} {trainer.lastName}
            </Text>
            <Text style={styles.email}>{trainer.email}</Text>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Specialization</Text>
              <Text style={styles.infoValue}>{trainer.specialization || 'N/A'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{trainer.phone || 'N/A'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={[styles.infoValue, trainer.isActive ? styles.active : styles.inactive]}>
                {trainer.isActive ? 'Active' : 'Inactive'}
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: { alignItems: 'center', marginBottom: 24 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF' },
  name: { fontSize: 24, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
  email: { fontSize: 16, color: '#64748B' },
  infoSection: { marginTop: 24 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  infoLabel: { fontSize: 16, color: '#64748B' },
  infoValue: { fontSize: 16, fontWeight: '600', color: '#1E293B' },
  active: { color: '#10B981' },
  inactive: { color: '#EF4444' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 8 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { fontSize: 16, color: '#64748B' },
});


