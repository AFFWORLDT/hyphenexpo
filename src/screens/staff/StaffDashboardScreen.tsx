import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { checkinAPI } from '../../services/api';
import { useRouter } from 'expo-router';

export default function StaffDashboardScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    todayCheckins: 0,
    activeSessions: 0,
    totalCheckins: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [todayRes, activeRes] = await Promise.all([
        checkinAPI.getTodaySessions(),
        checkinAPI.getActiveSessions(),
      ]);

      setStats({
        todayCheckins: todayRes?.data?.data?.stats?.total || 0,
        activeSessions: activeRes?.data?.data?.sessions?.length || 0,
        totalCheckins: todayRes?.data?.data?.stats?.total || 0,
      });
    } catch (error) {
      console.error('Error fetching staff dashboard:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Staff Dashboard</Text>
        <Text style={styles.headerSubtitle}>Welcome back, {user?.firstName}</Text>
      </View>

      <View style={styles.statsGrid}>
        <TouchableOpacity style={styles.statCard}>
          <Text style={styles.statValue}>{stats.todayCheckins}</Text>
          <Text style={styles.statLabel}>Today Check-ins</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.statCard}>
          <Text style={styles.statValue}>{stats.activeSessions}</Text>
          <Text style={styles.statLabel}>Active Sessions</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/(tabs)/checkin')}
        >
          <Text style={styles.actionTitle}>Check-in Management</Text>
          <Text style={styles.actionSubtitle}>Manage member check-ins</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#1E293B', padding: 24, paddingTop: 60 },
  headerTitle: { fontSize: 32, fontWeight: '800', color: '#FFFFFF', marginBottom: 8 },
  headerSubtitle: { fontSize: 16, color: '#94A3B8' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: { fontSize: 28, fontWeight: '800', color: '#1E293B', marginBottom: 4 },
  statLabel: { fontSize: 14, color: '#64748B' },
  quickActions: { padding: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1E293B', marginBottom: 16 },
  actionCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionTitle: { fontSize: 18, fontWeight: '600', color: '#1E293B', marginBottom: 4 },
  actionSubtitle: { fontSize: 14, color: '#64748B' },
});

