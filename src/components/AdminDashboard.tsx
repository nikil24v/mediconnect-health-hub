import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { usePharmacy } from '@/contexts/PharmacyContext';
import { useNavigate } from 'react-router-dom';
import { getDaysUntilExpiry, isNearExpiry } from '@/utils/dateUtils';
import MedicineForm from './MedicineForm';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const { medicines, deleteMedicine, resetDoctorBot } = usePharmacy();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<string | null>(null);

  const handleLogout = () => {
    resetDoctorBot();
    logout();
    navigate('/');
  };

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (id: string) => {
    setEditingMedicine(id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this medicine?')) {
      deleteMedicine(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">MediConnect Admin</h1>
              <p className="text-sm text-muted-foreground">Welcome, {currentUser?.name}</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Medicine Inventory</h2>
          <Button onClick={() => { setEditingMedicine(null); setShowForm(true); }}>
            <Plus className="w-4 h-4 mr-2" />
            Add Medicine
          </Button>
        </div>

        <Card className="p-4 mb-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </Card>

        <div className="grid gap-4">
          {filteredMedicines.map((medicine) => {
            const daysLeft = getDaysUntilExpiry(medicine.expiryDate);
            return (
              <Card key={medicine.id} className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{medicine.name}</h3>
                      <Badge variant="secondary">{medicine.category}</Badge>
                      {isNearExpiry(medicine.expiryDate) && (
                        <Badge variant="destructive">Expires in {daysLeft} days</Badge>
                      )}
                      {medicine.stock < 20 && (
                        <Badge variant="outline" className="border-warning text-warning">
                          Low Stock
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{medicine.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Price: </span>
                        <span className="font-semibold text-primary">₹{medicine.price}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Stock: </span>
                        <span className="font-semibold">{medicine.stock}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Expiry: </span>
                        <span className="font-semibold">
                          {new Date(medicine.expiryDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Symptoms: </span>
                        <span className="font-semibold">{medicine.symptoms.length}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(medicine.id)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(medicine.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredMedicines.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No medicines found</p>
          </Card>
        )}
      </main>

      {showForm && (
        <MedicineForm
          medicineId={editingMedicine}
          onClose={() => {
            setShowForm(false);
            setEditingMedicine(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
