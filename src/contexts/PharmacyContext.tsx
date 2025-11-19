import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Medicine, CartItem } from '@/types';
import { initialMedicines } from '@/data/medicines';

interface PharmacyContextType {
  medicines: Medicine[];
  cart: CartItem[];
  doctorBotShown: boolean;
  addMedicine: (medicine: Medicine) => void;
  updateMedicine: (id: string, medicine: Medicine) => void;
  deleteMedicine: (id: string) => void;
  addToCart: (medicine: Medicine, quantity: number) => void;
  updateCartQuantity: (medicineId: string, quantity: number) => void;
  removeFromCart: (medicineId: string) => void;
  clearCart: () => void;
  markDoctorBotShown: () => void;
  resetDoctorBot: () => void;
}

const PharmacyContext = createContext<PharmacyContextType | undefined>(undefined);

export const PharmacyProvider = ({ children }: { children: ReactNode }) => {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [doctorBotShown, setDoctorBotShown] = useState(false);

  const addMedicine = (medicine: Medicine) => {
    setMedicines([...medicines, medicine]);
  };

  const updateMedicine = (id: string, updatedMedicine: Medicine) => {
    setMedicines(medicines.map(m => m.id === id ? updatedMedicine : m));
  };

  const deleteMedicine = (id: string) => {
    setMedicines(medicines.filter(m => m.id !== id));
  };

  const addToCart = (medicine: Medicine, quantity: number) => {
    const existingItem = cart.find(item => item.medicine.id === medicine.id);
    if (existingItem) {
      updateCartQuantity(medicine.id, existingItem.quantity + quantity);
    } else {
      setCart([...cart, { medicine, quantity }]);
    }
  };

  const updateCartQuantity = (medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
    } else {
      setCart(cart.map(item =>
        item.medicine.id === medicineId ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (medicineId: string) => {
    setCart(cart.filter(item => item.medicine.id !== medicineId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const markDoctorBotShown = () => {
    setDoctorBotShown(true);
  };

  const resetDoctorBot = () => {
    setDoctorBotShown(false);
  };

  return (
    <PharmacyContext.Provider value={{
      medicines,
      cart,
      doctorBotShown,
      addMedicine,
      updateMedicine,
      deleteMedicine,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      markDoctorBotShown,
      resetDoctorBot
    }}>
      {children}
    </PharmacyContext.Provider>
  );
};

export const usePharmacy = () => {
  const context = useContext(PharmacyContext);
  if (context === undefined) {
    throw new Error('usePharmacy must be used within a PharmacyProvider');
  }
  return context;
};
