import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useAuth } from '../../src/contexts/AuthContext';
import { membersAPI } from '../../src/services/api';
import { useRouter } from 'expo-router';

export default function MembersScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await membersAPI.getAll();
      if (response?.data?.data?.members) {
        setMembers(response.data.data.members);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMembers();
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
        <Text style={styles.headerTitle}>Members</Text>
      </View>
      <FlatList
        data={members}
        keyExtractor={(item) => item._id || item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.memberCard}
            onPress={() => router.push(`/member-details/${item._id || item.id}` as any)}
          >
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={styles.memberEmail}>{item.email}</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No members found</Text>
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
  memberCard: {
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
  memberInfo: { flex: 1 },
  memberName: { fontSize: 18, fontWeight: '600', color: '#1E293B', marginBottom: 4 },
  memberEmail: { fontSize: 14, color: '#64748B' },
  arrow: { fontSize: 20, color: '#64748B' },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#64748B' },
});

