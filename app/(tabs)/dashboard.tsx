import { Redirect } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';
import DashboardScreen from '../../src/screens/DashboardScreen';
import AdminDashboardScreen from '../../src/screens/admin/AdminDashboardScreen';
import TrainerDashboardScreen from '../../src/screens/trainer/TrainerDashboardScreen';
import StaffDashboardScreen from '../../src/screens/staff/StaffDashboardScreen';

export default function DashboardTab() {
  const { user } = useAuth();
  const role = user?.role || 'member';

  if (role === 'admin') {
    return <AdminDashboardScreen />;
  }

  if (role === 'trainer') {
    return <TrainerDashboardScreen />;
  }

  if (role === 'staff') {
    return <StaffDashboardScreen />;
  }

  return <DashboardScreen />;
}


