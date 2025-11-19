import { Medicine } from '@/types';

export const initialMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    symptoms: ['fever', 'headache', 'body pain'],
    price: 25,
    stock: 150,
    expiryDate: '2025-12-31',
    description: 'Effective pain reliever and fever reducer'
  },
  {
    id: '2',
    name: 'Dolo 650',
    category: 'Pain Relief',
    symptoms: ['fever', 'headache', 'body pain', 'cold'],
    price: 30,
    stock: 200,
    expiryDate: '2025-11-30',
    description: 'Paracetamol 650mg for fever and pain relief'
  },
  {
    id: '3',
    name: 'Cetirizine 10mg',
    category: 'Allergy',
    symptoms: ['allergy', 'cold', 'runny nose', 'sneezing'],
    price: 40,
    stock: 100,
    expiryDate: '2026-03-15',
    description: 'Antihistamine for allergic reactions'
  },
  {
    id: '4',
    name: 'Azithromycin 500mg',
    category: 'Antibiotic',
    symptoms: ['infection', 'throat infection', 'bacterial infection'],
    price: 120,
    stock: 80,
    expiryDate: '2025-09-20',
    description: 'Broad-spectrum antibiotic'
  },
  {
    id: '5',
    name: 'ORS Powder',
    category: 'Rehydration',
    symptoms: ['dehydration', 'diarrhea', 'vomiting'],
    price: 15,
    stock: 250,
    expiryDate: '2026-06-30',
    description: 'Oral rehydration solution'
  },
  {
    id: '6',
    name: 'Calpol Syrup',
    category: 'Pain Relief',
    symptoms: ['fever', 'headache', 'pain'],
    price: 85,
    stock: 120,
    expiryDate: '2025-10-15',
    description: 'Paracetamol suspension for children'
  },
  {
    id: '7',
    name: 'Allegra 120mg',
    category: 'Allergy',
    symptoms: ['allergy', 'cold', 'sneezing', 'itching'],
    price: 180,
    stock: 90,
    expiryDate: '2026-01-20',
    description: 'Fexofenadine for allergies'
  },
  {
    id: '8',
    name: 'Strepsils Lozenges',
    category: 'Throat Care',
    symptoms: ['sore throat', 'throat pain', 'cough'],
    price: 55,
    stock: 180,
    expiryDate: '2026-04-10',
    description: 'Throat lozenges for sore throat relief'
  },
  {
    id: '9',
    name: 'Ibuprofen 400mg',
    category: 'Pain Relief',
    symptoms: ['pain', 'inflammation', 'fever', 'headache'],
    price: 45,
    stock: 140,
    expiryDate: '2025-12-25',
    description: 'NSAID for pain and inflammation'
  },
  {
    id: '10',
    name: 'Pantoprazole 40mg',
    category: 'Gastric',
    symptoms: ['acidity', 'heartburn', 'stomach pain', 'gastritis'],
    price: 95,
    stock: 110,
    expiryDate: '2026-02-28',
    description: 'Proton pump inhibitor for acid reflux'
  },
  {
    id: '11',
    name: 'Amoxicillin 500mg',
    category: 'Antibiotic',
    symptoms: ['infection', 'bacterial infection', 'respiratory infection'],
    price: 110,
    stock: 95,
    expiryDate: '2025-08-30',
    description: 'Penicillin antibiotic'
  },
  {
    id: '12',
    name: 'Crocin Advance',
    category: 'Pain Relief',
    symptoms: ['fever', 'headache', 'body pain'],
    price: 35,
    stock: 160,
    expiryDate: '2026-01-15',
    description: 'Fast-acting paracetamol'
  },
  {
    id: '13',
    name: 'Vicks Action 500',
    category: 'Cold & Flu',
    symptoms: ['cold', 'fever', 'headache', 'body pain'],
    price: 50,
    stock: 130,
    expiryDate: '2025-11-20',
    description: 'Multi-symptom cold relief'
  },
  {
    id: '14',
    name: 'Betadine Solution',
    category: 'Antiseptic',
    symptoms: ['wound', 'cut', 'infection prevention'],
    price: 75,
    stock: 85,
    expiryDate: '2026-05-10',
    description: 'Povidone-iodine antiseptic solution'
  },
  {
    id: '15',
    name: 'Electral Powder',
    category: 'Rehydration',
    symptoms: ['dehydration', 'diarrhea', 'vomiting', 'electrolyte imbalance'],
    price: 20,
    stock: 200,
    expiryDate: '2026-07-15',
    description: 'Electrolyte replacement solution'
  }
];
