import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { classesAPI } from '../../src/services/api';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ClassDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [classItem, setClassItem] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchClassDetails();
    }
  }, [id]);

  const fetchClassDetails = async () => {
    try {
      setLoading(true);
      const response = await classesAPI.getById(id as string);
      if (response?.data?.data?.class) {
        setClassItem(response.data.data.class);
      }
    } catch (error) {
      console.error('Error fetching class details:', error);
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

  if (!classItem) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Class Details</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Class not found</Text>
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
        <Text style={styles.headerTitle}>Class Details</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.name}>{classItem.name}</Text>
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Type</Text>
              <Text style={styles.infoValue}>{classItem.type || 'N/A'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Trainer</Text>
              <Text style={styles.infoValue}>
                {classItem.trainer?.firstName} {classItem.trainer?.lastName}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Capacity</Text>
              <Text style={styles.infoValue}>
                {classItem.currentMembers?.length || 0} / {classItem.capacity || 'N/A'}
              </Text>
            </View>
            {classItem.description && (
              <>
                <View style={styles.divider} />
                <View style={styles.descriptionRow}>
                  <Text style={styles.infoLabel}>Description</Text>
                  <Text style={styles.description}>{classItem.description}</Text>
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
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 8 },
  descriptionRow: { paddingVertical: 12 },
  description: { fontSize: 14, color: '#64748B', marginTop: 8 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { fontSize: 16, color: '#64748B' },
});


