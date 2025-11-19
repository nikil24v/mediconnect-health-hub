import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '@/components/AdminDashboard';
import CustomerDashboard from '@/components/CustomerDashboard';
import DoctorBot from '@/components/DoctorBot';
import { usePharmacy } from '@/contexts/PharmacyContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { doctorBotShown } = usePharmacy();
  const [showDoctorBot, setShowDoctorBot] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }

    if (currentUser.role === 'customer' && !doctorBotShown) {
      setShowDoctorBot(true);
    }
  }, [currentUser, navigate, doctorBotShown]);

  if (!currentUser) {
    return null;
  }

  return (
    <>
      {currentUser.role === 'admin' ? <AdminDashboard /> : <CustomerDashboard />}
      {currentUser.role === 'customer' && (
        <DoctorBot
          open={showDoctorBot}
          onClose={() => setShowDoctorBot(false)}
        />
      )}
    </>
  );
};

export default Dashboard;
