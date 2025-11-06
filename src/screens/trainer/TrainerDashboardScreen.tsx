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
import { trainersAPI, trainingSessionsAPI } from '../../services/api';
import { useRouter } from 'expo-router';

export default function TrainerDashboardScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalSessions: 0,
    todaySessions: 0,
    totalMembers: 0,
    monthlyRevenue: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const statsRes = await trainersAPI.getStats(user?.id);
      if (statsRes?.data?.data) {
        setStats({
          totalSessions: statsRes.data.data.totalSessions || 0,
          todaySessions: statsRes.data.data.todaySessions || 0,
          totalMembers: statsRes.data.data.totalMembers || 0,
          monthlyRevenue: statsRes.data.data.monthlyRevenue || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching trainer dashboard:', error);
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
        <Text style={styles.headerTitle}>Trainer Dashboard</Text>
        <Text style={styles.headerSubtitle}>Welcome back, {user?.firstName}</Text>
      </View>

      <View style={styles.statsGrid}>
        <TouchableOpacity style={styles.statCard}>
          <Text style={styles.statValue}>{stats.totalSessions}</Text>
          <Text style={styles.statLabel}>Total Sessions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.statCard}>
          <Text style={styles.statValue}>{stats.todaySessions}</Text>
          <Text style={styles.statLabel}>Today</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.statCard}>
          <Text style={styles.statValue}>{stats.totalMembers}</Text>
          <Text style={styles.statLabel}>Members</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.statCard}>
          <Text style={styles.statValue}>${stats.monthlyRevenue.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Monthly Revenue</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/(tabs)/sessions')}
        >
          <Text style={styles.actionTitle}>My Sessions</Text>
          <Text style={styles.actionSubtitle}>View and manage training sessions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/(tabs)/members')}
        >
          <Text style={styles.actionTitle}>My Members</Text>
          <Text style={styles.actionSubtitle}>View assigned members</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/calendar')}
        >
          <Text style={styles.actionTitle}>Calendar</Text>
          <Text style={styles.actionSubtitle}>View schedule</Text>
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

