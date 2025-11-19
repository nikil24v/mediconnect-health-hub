export interface Medicine {
  id: string;
  name: string;
  category: string;
  symptoms: string[];
  price: number;
  stock: number;
  expiryDate: string;
  description: string;
}

export interface User {
  username: string;
  password: string;
  role: 'admin' | 'customer';
  name: string;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface InstructionSlip {
  customerName: string;
  medicines: Array<{
    name: string;
    dosage: string;
    expiryDate: string;
  }>;
  totalAmount: number;
  date: string;
}
