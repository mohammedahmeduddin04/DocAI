
import { Disease, CityData, Doctor, MedicalTest, Vaccine } from './types';

export const REGISTRY_COUNTS = {
  DISEASES: "140+",
  DOCTORS: "150+",
  TESTS: "170+",
  VACCINES: "100+"
};

export const DISEASES: Disease[] = [
  { 
    name: "Common Cold", 
    symptoms: ["runny nose", "sore throat", "cough", "fatigue"], 
    severity: "Low", 
    specialty: "General Physician",
    protocol: {
      steps: ["Hydration", "Rest", "Symptomatic treatment"],
      medications: [
        { name: "Paracetamol", dosage: "500mg", frequency: "SOS" },
        { name: "Cetirizine", dosage: "10mg", frequency: "1-0-0" }
      ]
    }
  },
  { 
    name: "Influenza", 
    symptoms: ["fever", "body aches", "fatigue", "cough", "headache"], 
    severity: "Medium", 
    specialty: "General Physician",
    protocol: {
      steps: ["Antiviral therapy if early", "Isolation", "Fever management"],
      medications: [
        { name: "Oseltamivir", dosage: "75mg", frequency: "1-0-1" },
        { name: "Ibuprofen", dosage: "400mg", frequency: "1-0-1" }
      ]
    }
  },
  { 
    name: "Dengue Fever", 
    symptoms: ["high fever", "headache", "body aches", "fatigue", "nausea"], 
    severity: "High", 
    specialty: "General Physician",
    protocol: {
      steps: ["Platelet monitoring", "Aggressive hydration", "Avoid NSAIDs"],
      medications: [
        { name: "Paracetamol", dosage: "650mg", frequency: "1-1-1" },
        { name: "ORS Solution", dosage: "1L", frequency: "Daily" }
      ]
    }
  },
  { 
    name: "Hypertension", 
    symptoms: ["headache", "dizziness", "chest pain"], 
    severity: "High", 
    specialty: "Cardiologist",
    protocol: {
      steps: ["Salt restriction", "Daily BP monitoring", "Regular exercise"],
      medications: [
        { name: "Amlodipine", dosage: "5mg", frequency: "0-0-1" },
        { name: "Telmisartan", dosage: "40mg", frequency: "1-0-0" }
      ]
    }
  },
  { name: "Pneumonia", symptoms: ["fever", "cough", "chest pain", "difficulty breathing"], severity: "High", specialty: "Pulmonologist" },
  { name: "Migraine", symptoms: ["headache", "nausea", "dizziness"], severity: "Medium", specialty: "Neurologist" },
  { name: "Diabetes Type 2", symptoms: ["frequent urination", "excessive thirst", "fatigue", "blurred vision"], severity: "High", specialty: "Endocrinologist" },
  { name: "Hepatitis", symptoms: ["fatigue", "abdominal pain", "nausea", "vomiting"], severity: "High", specialty: "Gastroenterologist" },
];

export const DOCTORS: Doctor[] = [
  { id: "1", name: "Dr. Rajesh Kumar", specialty: "General Physician", experience: 15, rating: 4.8, reviews: 1245, hospital: "Apollo Hospitals", location: "Jubilee Hills, Hyderabad", fee: 600 },
  { id: "2", name: "Dr. Sunita Reddy", specialty: "General Physician", experience: 12, rating: 4.7, reviews: 987, hospital: "Care Hospitals", location: "Banjara Hills, Hyderabad", fee: 550 },
  { id: "3", name: "Dr. Arvind Swami", specialty: "Dermatologist", experience: 10, rating: 4.6, reviews: 450, hospital: "Skin Clinic Plus", location: "Kukatpally, Hyderabad", fee: 800 },
  { id: "4", name: "Dr. Kavita Rao", specialty: "Pediatrician", experience: 20, rating: 4.9, reviews: 2100, hospital: "Continental Hospitals", location: "Gachibowli, Hyderabad", fee: 800 },
  { id: "5", name: "Dr. Sanjay Gupta", specialty: "Orthopedic Surgeon", experience: 18, rating: 4.8, reviews: 1560, hospital: "KIMS Hospitals", location: "Secunderabad", fee: 1000 },
  { id: "6", name: "Dr. Meera Nair", specialty: "Gynecologist", experience: 14, rating: 4.7, reviews: 1120, hospital: "Rainbow Children's Hospital", location: "Banjara Hills", fee: 700 },
  { id: "7", name: "Dr. Rohan Mehra", specialty: "Psychiatrist", experience: 8, rating: 4.5, reviews: 320, hospital: "Mind Wellness Center", location: "Madhapur, Hyderabad", fee: 1200 },
  { id: "8", name: "Dr. Priya Sharma", specialty: "Ophthalmologist", experience: 11, rating: 4.7, reviews: 890, hospital: "LV Prasad Eye Institute", location: "Banjara Hills", fee: 900 },
  { id: "9", name: "Dr. Naveen Chandra", specialty: "ENT Specialist", experience: 16, rating: 4.8, reviews: 760, hospital: "Apollo Ent Center", location: "Jubilee Hills", fee: 750 },
  { id: "10", name: "Dr. Shalini Varma", specialty: "Endocrinologist", experience: 13, rating: 4.6, reviews: 540, hospital: "Care Hospitals", location: "Banjara Hills", fee: 1100 },
  { id: "11", name: "Dr. Manoj Bajpayee", specialty: "Oncologist", experience: 22, rating: 4.9, reviews: 1980, hospital: "Basavatarakam Cancer Hospital", location: "Banjara Hills", fee: 1500 },
  { id: "12", name: "Dr. Vikram Singh", specialty: "Cardiologist", experience: 25, rating: 4.9, reviews: 2134, hospital: "Apollo Hospitals", location: "Jubilee Hills, Hyderabad", fee: 1500 },
  { id: "13", name: "Dr. Deepa Malik", specialty: "Physiotherapist", experience: 7, rating: 4.8, reviews: 210, hospital: "Rehab Plus", location: "Gachibowli", fee: 500 },
  { id: "14", name: "Dr. Amit Trivedi", specialty: "Urologist", experience: 19, rating: 4.7, reviews: 670, hospital: "Yashoda Hospitals", location: "Somajiguda", fee: 1000 },
  { id: "15", name: "Dr. Sneha George", specialty: "Neurologist", experience: 15, rating: 4.8, reviews: 840, hospital: "Sunshine Hospitals", location: "Secunderabad", fee: 1300 },
  { id: "16", name: "Dr. Karthik R.", specialty: "Pulmonologist", experience: 12, rating: 4.6, reviews: 430, hospital: "Medicover Hospitals", location: "Hitech City", fee: 900 },
  { id: "17", name: "Dr. Anjali Patil", specialty: "Dentist", experience: 9, rating: 4.5, reviews: 510, hospital: "Clove Dental", location: "Kondapur", fee: 400 },
  { id: "18", name: "Dr. Suresh Raina", specialty: "Gastroenterologist", experience: 21, rating: 4.8, reviews: 1200, hospital: "AIG Hospitals", location: "Gachibowli", fee: 1200 },
  { id: "19", name: "Dr. Vidya Balan", specialty: "Rheumatologist", experience: 17, rating: 4.7, reviews: 310, hospital: "Star Hospitals", location: "Banjara Hills", fee: 1100 },
  { id: "20", name: "Dr. Farhan Akhtar", specialty: "Nephrologist", experience: 14, rating: 4.6, reviews: 290, hospital: "Kamineni Hospitals", location: "L.B. Nagar", fee: 950 },
  { id: "21", name: "Dr. Ranbir Kapoor", specialty: "Oncologist", experience: 11, rating: 4.7, reviews: 540, hospital: "Tata Memorial", location: "Mumbai", fee: 2000 },
  { id: "22", name: "Dr. Alia Bhatt", specialty: "Pediatrician", experience: 8, rating: 4.8, reviews: 720, hospital: "Reliance Hospital", location: "Mumbai", fee: 1200 },
  { id: "23", name: "Dr. Shraddha Das", specialty: "Dermatologist", experience: 13, rating: 4.6, reviews: 410, hospital: "Kaya Clinic", location: "Pune", fee: 900 },
  { id: "24", name: "Dr. Vijay Deverakonda", specialty: "Psychiatrist", experience: 10, rating: 4.5, reviews: 180, hospital: "Care Hospitals", location: "Hyderabad", fee: 1100 },
  { id: "25", name: "Dr. Rashmika Mandanna", specialty: "Gynecologist", experience: 15, rating: 4.9, reviews: 1400, hospital: "Fernandez Hospital", location: "Hyderabad", fee: 1000 },
];

export const MEDICAL_TESTS: MedicalTest[] = [
  { 
    id: "1", name: "Complete Blood Count (CBC)", category: "Blood Test", price: 350, duration: "4 hours", hospital: "PathLabs", 
    description: "Evaluates overall health and detects a wide range of disorders, including anemia, infection, and leukemia.",
    clinicalUtility: "Measures the concentration of white cells, red cells, and platelets. Abnormal counts may indicate systemic inflammation, bone marrow issues, or immune response to viral pathogens."
  },
  { 
    id: "2", name: "Lipid Profile", category: "Blood Test", price: 600, duration: "6 hours", hospital: "Dr. Lal PathLabs", 
    description: "Measures cholesterol and triglyceride levels to assess cardiovascular risk.",
    clinicalUtility: "Quantifies HDL (good), LDL (bad), and VLDL cholesterol. High LDL levels lead to arterial plaque buildup (atherosclerosis), which is a leading precursor to Myocardial Infarction (heart attack)."
  },
  { 
    id: "3", name: "HbA1c (Diabetes)", category: "Blood Test", price: 450, duration: "8 hours", hospital: "Apollo Diagnostics", 
    description: "Measures average blood sugar levels over the past three months.",
    clinicalUtility: "Tracks the percentage of hemoglobin coated with sugar (glycated hemoglobin). It provides a more stable metric for long-term glycemic control than daily finger-prick tests."
  },
  { 
    id: "4", name: "Liver Function Test (LFT)", category: "Blood Test", price: 800, duration: "5 hours", hospital: "Vijaya Diagnostics", 
    description: "Assesses liver health by measuring proteins, liver enzymes, and bilirubin.",
    clinicalUtility: "Detects liver damage or inflammation. Elevated ALT and AST enzymes suggest hepatocytes (liver cells) are rupturing, signaling hepatitis, cirrhosis, or drug toxicity."
  },
  { 
    id: "5", name: "Kidney Function Test (KFT)", category: "Blood Test", price: 750, duration: "5 hours", hospital: "Tenet Diagnostics", 
    description: "Evaluates how well your kidneys are filtering waste from your blood.",
    clinicalUtility: "Checks levels of Urea and Creatinine. High creatinine indicates a lower Glomerular Filtration Rate (GFR), which means the kidneys are struggling to clear metabolic waste."
  },
  { 
    id: "6", name: "MRI Brain (Contrast)", category: "Imaging", price: 8500, duration: "1 hour", hospital: "KIMS Hospital", 
    description: "High-resolution imaging used to visualize brain structure and detect tumors or lesions.",
    clinicalUtility: "Uses powerful magnets and radio waves to map soft tissue. Vital for diagnosing multiple sclerosis, strokes, and intra-cranial pressure changes often reported as severe headaches."
  },
  { 
    id: "7", name: "Cardiac Troponin T", category: "Blood Test", price: 1200, duration: "2 hours", hospital: "Apollo Hospitals", 
    description: "The gold standard test for detecting heart muscle damage.",
    clinicalUtility: "Troponin is a protein found in heart muscle. When the heart is damaged (e.g., during a heart attack), troponin is released into the bloodstream. Even trace amounts can signal a cardiac emergency."
  },
  { 
    id: "8", name: "Vitamin D3 (25-Hydroxy)", category: "Vitamin", price: 1400, duration: "24 hours", hospital: "Tenet Diagnostics", 
    description: "Measures the level of Vitamin D in the blood, essential for bone health.",
    clinicalUtility: "Essential for calcium absorption and immune system regulation. Deficiencies are linked to osteopenia and increased susceptibility to respiratory infections."
  },
  { 
    id: "9", name: "Chest X-Ray (PA View)", category: "Imaging", price: 450, duration: "15 mins", hospital: "Yashoda Hospitals", 
    description: "Visualizes the lungs, heart, and chest wall.",
    clinicalUtility: "Primary tool for detecting pneumonia, pleural effusion, or an enlarged heart (cardiomegaly). Identifies fluid buildup in the pulmonary alveolar sacs."
  },
  { 
    id: "10", name: "D-Dimer Test", category: "Blood Test", price: 1800, duration: "4 hours", hospital: "Medall Healthcare", 
    description: "Used to rule out blood clots (thrombosis).",
    clinicalUtility: "Measures a substance released when a blood clot dissolves. High levels can indicate Deep Vein Thrombosis (DVT) or Pulmonary Embolism, which are critical vascular events."
  },
  { 
    id: "11", name: "Thyroid Profile (T3, T4, TSH)", category: "Hormone", price: 550, duration: "24 hours", hospital: "SRL Diagnostics", 
    description: "Comprehensive screen for hypo or hyperthyroidism.",
    clinicalUtility: "TSH (Thyroid Stimulating Hormone) is the primary indicator. High TSH suggests the pituitary is overworking to stimulate an underactive thyroid (hypothyroidism)."
  },
  { 
    id: "12", name: "Double Marker Test", category: "Pregnancy", price: 2800, duration: "3 days", hospital: "Fernandez Hospital", 
    description: "Screening for chromosomal abnormalities in the first trimester.",
    clinicalUtility: "Measures PAPP-A and Free Beta hCG. Combined with ultrasound data, it calculates the risk of Down Syndrome and other trisomies."
  },
  { 
    id: "13", name: "CT Abdomen & Pelvis", category: "Imaging", price: 5500, duration: "30 mins", hospital: "Star Hospitals", 
    description: "Detailed view of abdominal organs like liver, spleen, and pancreas.",
    clinicalUtility: "Identifies appendicitis, kidney stones, and bowel obstructions. Far more sensitive than ultrasound for detecting small calcifications in the urinary tract."
  },
  { 
    id: "14", name: "Serum Electrolytes (Na, K, Cl)", category: "Blood Test", price: 400, duration: "3 hours", hospital: "Local Diagnostics", 
    description: "Measures the balance of salts in your blood.",
    clinicalUtility: "Potassium levels are critical; even slight deviations can cause fatal cardiac arrhythmias. Sodium levels affect brain function and hydration status."
  },
  { 
    id: "15", name: "ESR (Westergren)", category: "Blood Test", price: 150, duration: "2 hours", hospital: "PathLabs", 
    description: "A non-specific marker for systemic inflammation.",
    clinicalUtility: "Measures how quickly red blood cells sink to the bottom of a tube. Rapid sinking indicates heavy proteins in the blood, usually a sign of chronic infection or autoimmune flare-ups."
  }
];

export const VACCINES: Vaccine[] = [
  { id: "1", name: "COVID-19 Primary (Covishield)", category: "Viral", price: 0, ageEligibility: "18+ years", hospital: "Government Health Centers" },
  { id: "2", name: "COVID-19 Booster (Corbevax)", category: "Viral", price: 0, ageEligibility: "18+ years", hospital: "Government Health Centers" },
  { id: "3", name: "Hepatitis B", category: "Viral", price: 300, ageEligibility: "Infants, High-risk Adults", hospital: "Apollo Hospitals" },
  { id: "4", name: "BCG (Tuberculosis)", category: "Bacterial", price: 0, ageEligibility: "Newborns", hospital: "Public Health Clinics" },
  { id: "5", name: "MMR (Measles, Mumps, Rubella)", category: "Viral", price: 600, ageEligibility: "Children (9 months+)", hospital: "Rainbow Children's Hospital" },
  { id: "6", name: "Polio (IPV/OPV)", category: "Viral", price: 0, ageEligibility: "Children (Birth to 5 yrs)", hospital: "Pulse Polio Centers" },
  { id: "7", name: "Influenza (Flu) - Quadrivalent", category: "Viral", price: 500, ageEligibility: "6 months+", hospital: "Apollo Hospitals, Jubilee Hills" },
  { id: "8", name: "HPV (Cervical Cancer)", category: "Viral", price: 3500, ageEligibility: "Girls & Boys (9-26 yrs)", hospital: "Continental Hospitals" },
  { id: "9", name: "Chickenpox (Varicella)", category: "Viral", price: 1500, ageEligibility: "Children & Adults", hospital: "Yashoda Hospitals" },
  { id: "10", name: "Typhoid Conjugate", category: "Bacterial", price: 1200, ageEligibility: "Children (6 months+) & Adults", hospital: "KIMS Hospitals" },
];

export const CITIES: CityData[] = [
  { 
    name: 'Mumbai', lat: 19.0760, lng: 72.8777, predictions: 156, risk: 'Critical',
    hazardType: 'Viral Outbreak (Dengue)', popAtRisk: '2.4M', healthcareLoad: 88,
    economicImpact: '₹ 350 Cr. Est.', projectedGrowth: '14% WoW'
  },
  { 
    name: 'Delhi', lat: 28.6139, lng: 77.2090, predictions: 42, risk: 'High',
    hazardType: 'Respiratory Distress (AQI)', popAtRisk: '1.8M', healthcareLoad: 65,
    economicImpact: '₹ 230 Cr. Est.', projectedGrowth: '8% WoW'
  },
  { 
    name: 'Hyderabad', lat: 17.3850, lng: 78.4867, predictions: 12, risk: 'Low',
    hazardType: 'Seasonal Influenza', popAtRisk: '400k', healthcareLoad: 22,
    economicImpact: '₹ 35 Cr. Est.', projectedGrowth: '2% WoW'
  },
];

export const SYMPTOMS_LIST = [
  "fever", "high fever", "cough", "fatigue", "sore throat", "runny nose", "body aches", "headache", "chest pain", "difficulty breathing",
  "wheezing", "shortness of breath", "frequent urination", "excessive thirst", "dizziness", "blurred vision", "nausea", "vomiting", "abdominal pain",
  "joint pain", "muscle aches", "weakness", "pale skin", "weight gain", "weight loss", "rapid heartbeat", "cold sensitivity", "confusion"
];
