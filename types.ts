
export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  
  // Doctor Specific
  specialty?: string;
  licenseNumber?: string;
  hospitalAffiliation?: string;
  consultationFee?: number;
  yearsOfExperience?: number;
  bio?: string;
  
  // Admin Specific
  accessLevel?: string;
  department?: string;
  clearanceCode?: string;
  personnelCode?: string;

  // Patient / Common
  bloodGroup?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  maritalStatus?: string;
  aadharNumber?: string;
  address?: string;
  preferredHospital?: string;
  allergies?: string;
  chronicConditions?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  insuranceProvider?: string;
  insurancePolicy?: string;
  insuranceCoverage?: string;
  insuranceExpiry?: string;
}

export interface ClinicalProtocol {
  steps: string[];
  medications: { name: string; dosage: string; frequency: string }[];
}

export interface Disease {
  name: string;
  symptoms: string[];
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  specialty: string;
  protocol?: ClinicalProtocol;
}

export interface Prediction {
  id: string;
  patientId: string;
  patientName: string;
  diseaseName: string;
  confidence: number;
  symptoms: string[];
  location: string;
  timestamp: number;
  status: 'Pending' | 'Verified' | 'Rejected' | 'Modified';
  doctorNote?: string;
  verifiedBy?: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  specialty: string;
  clinicalRationale?: string; // AI generated reasoning
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: number;
  hospital: string;
  location: string;
  fee: number;
}

export interface MedicalTest {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  hospital: string;
  description: string; // The "How it helps" data
  clinicalUtility: string; // The biological mechanism
}

export interface Vaccine {
  id: string;
  name: string;
  category: string;
  price: number;
  ageEligibility: string;
  hospital: string;
}

export interface CityData {
  name: string;
  lat: number;
  lng: number;
  predictions: number;
  risk: 'Low' | 'Medium' | 'High' | 'Critical';
  hazardType: string;
  popAtRisk: string;
  healthcareLoad: number; // 0-100%
  economicImpact: string;
  projectedGrowth: string;
}

export interface Outbreak {
  id: string;
  disease: string;
  location: string;
  cases: number;
  growth: number;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical';
}
