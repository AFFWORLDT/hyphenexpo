export interface User {
  id?: string;
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'admin' | 'member' | 'trainer' | 'staff';
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  isActive?: boolean;
  profileImage?: string;
  department?: string;
  position?: string;
  employeeId?: string;
}

export interface Membership {
  _id: string;
  member: User;
  plan: {
    _id: string;
    name: string;
    price: number;
  };
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'expired' | 'cancelled';
}

export interface CheckinSession {
  _id: string;
  member: User;
  checkInTime: string;
  checkOutTime?: string;
  status: 'active' | 'completed';
}


