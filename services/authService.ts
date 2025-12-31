
import { User, UserRole } from '../types';

class AuthService {
  private currentUser: User | null = null;

  private MOCK_USERS: Record<UserRole, any> = {
    [UserRole.PATIENT]: { 
      id: 'p1', 
      name: 'John Doe', 
      email: 'patient@docai.com', 
      password: 'password', 
      role: UserRole.PATIENT,
      phone: '+91 9876543210',
      dob: '1990-01-15',
      gender: 'Male',
      bloodGroup: 'O+',
      maritalStatus: 'Married',
      aadharNumber: '1234 5678 9012',
      address: '123, Jubilee Hills, Hyderabad, Telangana - 500033',
      preferredHospital: 'Apollo Hospitals, Jubilee Hills',
      allergies: 'Peanuts, Shellfish, Dust Mites',
      chronicConditions: 'Mild Seasonal Asthma',
      emergencyContact: 'Jane Doe',
      emergencyPhone: '+91 9876543211',
      insuranceProvider: 'Star Health Insurance',
      insurancePolicy: 'SH-2024-99182',
      insuranceCoverage: '₹5,00,000',
      insuranceExpiry: '2025-12-31'
    },
    [UserRole.DOCTOR]: { 
      id: 'd1', 
      name: 'Dr. Sarah Smith', 
      email: 'doctor@docai.com', 
      password: 'password', 
      role: UserRole.DOCTOR, 
      specialty: 'Neurology',
      licenseNumber: 'MD-AI-9922-K',
      hospitalAffiliation: 'DocAI Research Hospital & Clinic',
      consultationFee: 1500,
      yearsOfExperience: 14,
      bio: 'Senior Neurologist specializing in neuro-degenerative diseases, cognitive therapy, and AI-assisted clinical diagnosis. Dedicated to patient-centric digital health integration.'
    },
    [UserRole.ADMIN]: { 
      id: 'a1', 
      name: 'Admin Supervisor', 
      email: 'admin@docai.com', 
      password: 'password', 
      role: UserRole.ADMIN,
      accessLevel: 'Level 5 (Superuser)',
      department: 'Global Health Surveillance & Crisis Management',
      clearanceCode: 'GAMMA-X-88',
      personnelCode: 'ADM-2024-001'
    }
  };

  login(role: UserRole, email?: string, password?: string): User | null {
    const stored = localStorage.getItem('docai_user');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.role === role && (!email || parsed.email === email)) {
        this.currentUser = parsed;
        return this.currentUser;
      }
    }

    if (email && password) {
      const mockUser = this.MOCK_USERS[role];
      if (mockUser.email === email && mockUser.password === password) {
        const { password: _, ...user } = mockUser;
        this.currentUser = user as User;
        localStorage.setItem('docai_user', JSON.stringify(this.currentUser));
        return this.currentUser;
      }
      return null;
    }

    const { password: _, ...user } = this.MOCK_USERS[role];
    this.currentUser = user as User;
    localStorage.setItem('docai_user', JSON.stringify(this.currentUser));
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('docai_user');
  }

  updateUser(updatedData: Partial<User>): User | null {
    const current = this.getCurrentUser();
    if (current) {
      const newUser = { ...current, ...updatedData };
      this.currentUser = newUser;
      localStorage.setItem('docai_user', JSON.stringify(newUser));
      return newUser;
    }
    return null;
  }

  getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser;
    const stored = localStorage.getItem('docai_user');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }
    return null;
  }
}

export const authService = new AuthService();
