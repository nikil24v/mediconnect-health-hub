import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Search, Bot, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { usePharmacy } from '@/contexts/PharmacyContext';
import { useNavigate } from 'react-router-dom';
import MedicineCard from './MedicineCard';
import DoctorBot from './DoctorBot';
import Cart from './Cart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CustomerDashboard = () => {
  const { currentUser, logout } = useAuth();
  const { medicines, addToCart, cart, resetDoctorBot } = usePharmacy();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showDoctorBot, setShowDoctorBot] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleLogout = () => {
    resetDoctorBot();
    logout();
    navigate('/');
  };

  const categories = ['all', ...Array.from(new Set(medicines.map(m => m.category)))];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || medicine.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">MediConnect</h1>
              <p className="text-sm text-muted-foreground">Welcome, {currentUser?.name}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowDoctorBot(true)}>
                <Bot className="w-4 h-4 mr-2" />
                Doctor Bot
              </Button>
              <Button variant="outline" onClick={() => setShowCart(true)} className="relative">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search medicines or symptoms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.slice(1).map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">All Medicines</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedicines.map((medicine) => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
              onAddToCart={(med) => addToCart(med, 1)}
            />
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No medicines found</p>
          </Card>
        )}
      </main>

      <DoctorBot open={showDoctorBot} onClose={() => setShowDoctorBot(false)} />
      <Cart open={showCart} onClose={() => setShowCart(false)} />
    </div>
  );
};

export default CustomerDashboard;
