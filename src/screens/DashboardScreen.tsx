import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { checkinAPI } from '../services/api';

export default function DashboardScreen() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [checkinHistory, setCheckinHistory] = useState<any[]>([]);
  const [stats, setStats] = useState({
    currentMonth: 0,
    thisWeek: 0,
    today: 0,
  });

  useEffect(() => {
    fetchMemberData();
  }, []);

  const fetchMemberData = async () => {
    try {
      setLoading(true);
      if (!user?.id) {
        console.error('User ID not available');
        return;
      }
      
      const historyResponse = await checkinAPI.getHistory(user.id, { limit: 5 });
      const sessions = historyResponse?.data?.data?.sessions || [];
      setCheckinHistory(Array.isArray(sessions) ? sessions : []);
      
      // Calculate stats from all check-ins, not just the limited ones
      const allHistoryResponse = await checkinAPI.getHistory(user.id, { limit: 1000 });
      const allSessions = allHistoryResponse?.data?.data?.sessions || [];
      
      // Calculate stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const thisWeek = new Date();
      thisWeek.setDate(thisWeek.getDate() - 7);
      const thisMonth = new Date();
      thisMonth.setDate(1);
      
      const todayCheckins = allSessions.filter(
        (checkin: any) => checkin.checkInTime && new Date(checkin.checkInTime) >= today
      );
      const weekCheckins = allSessions.filter(
        (checkin: any) => checkin.checkInTime && new Date(checkin.checkInTime) >= thisWeek
      );
      const monthCheckins = allSessions.filter(
        (checkin: any) => checkin.checkInTime && new Date(checkin.checkInTime) >= thisMonth
      );
      
      setStats({
        today: todayCheckins.length,
        thisWeek: weekCheckins.length,
        currentMonth: monthCheckins.length,
      });
    } catch (error) {
      console.error('Error fetching member data:', error);
      // Set empty data on error to prevent crashes
      setCheckinHistory([]);
      setStats({ today: 0, thisWeek: 0, currentMonth: 0 });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleCheckin = async () => {
    if (!user?.id) {
      Alert.alert('Error', 'User ID not found');
      return;
    }

    try {
      await checkinAPI.checkin(user.id, 'Mobile app check-in');
      Alert.alert('Success', 'Checked in successfully!');
      fetchMemberData();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Check-in failed');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMemberData();
  };

  if (loading && !checkinHistory.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Loading your dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" />
      }
    >
      {/* Luxury Header */}
      <View style={styles.header}>
        <View style={styles.headerLogoContainer}>
          <Image 
            source={require('../../assets/logo.png')} 
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText}>{user?.firstName} {user?.lastName}</Text>
          <Text style={styles.memberLabel}>Premium Member</Text>
        </View>
        <View style={styles.headerBadge}>
          <Text style={styles.badgeText}>VIP</Text>
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.today}</Text>
          <Text style={styles.statLabel}>Today</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.thisWeek}</Text>
          <Text style={styles.statLabel}>This Week</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.currentMonth}</Text>
          <Text style={styles.statLabel}>This Month</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity
          onPress={handleCheckin}
          style={styles.checkinButton}
          activeOpacity={0.8}
        >
          <View style={styles.checkinIcon}>
            <Text style={styles.checkinIconText}>📍</Text>
          </View>
          <View style={styles.checkinContent}>
            <Text style={styles.checkinTitle}>Check In</Text>
            <Text style={styles.checkinSubtitle}>Tap to check in to the gym</Text>
          </View>
          <View style={styles.arrow}>
            <Text style={styles.arrowText}>→</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Member Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{user?.phone}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Role</Text>
            <Text style={[styles.infoValue, styles.roleText]}>
              {user?.role?.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      {/* Recent Activity */}
      {checkinHistory.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Check-ins</Text>
          <View style={styles.activityCard}>
            {checkinHistory.map((checkin: any, index: number) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Text style={styles.activityEmoji}>💪</Text>
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Gym Check-in</Text>
                  <Text style={styles.activityTime}>
                    {new Date(checkin.checkInTime).toLocaleString()}
                  </Text>
                </View>
                <Text style={styles.activityStatus}>✓</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Logout Button */}
      <TouchableOpacity
        onPress={async () => {
          Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => await logout(),
              },
            ]
          );
        }}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 16,
    fontSize: 16,
  },
  header: {
    backgroundColor: '#1E293B',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  headerLogoContainer: {
    position: 'absolute',
    top: 50,
    left: 24,
    right: 0,
    alignItems: 'flex-start',
  },
  headerLogo: {
    width: 40,
    height: 40,
  },
  headerContent: {
    flex: 1,
    marginTop: 20,
  },
  welcomeText: {
    color: '#94A3B8',
    fontSize: 16,
    marginBottom: 4,
  },
  nameText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  memberLabel: {
    color: '#FBBF24',
    fontSize: 14,
    fontWeight: '600',
  },
  headerBadge: {
    backgroundColor: '#FBBF24',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#FBBF24',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  badgeText: {
    color: '#1E293B',
    fontSize: 12,
    fontWeight: '800',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 24,
    gap: 12,
    marginTop: -32,
    zIndex: 1,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  section: {
    padding: 24,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 16,
  },
  checkinButton: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  checkinIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  checkinIconText: {
    fontSize: 28,
  },
  checkinContent: {
    flex: 1,
  },
  checkinTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  checkinSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  arrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 20,
    color: '#1E293B',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600',
  },
  roleText: {
    color: '#3B82F6',
    fontWeight: '700',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  activityIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activityEmoji: {
    fontSize: 24,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 14,
    color: '#64748B',
  },
  activityStatus: {
    fontSize: 24,
    color: '#10B981',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 8,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
