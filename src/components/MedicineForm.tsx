import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { usePharmacy } from '@/contexts/PharmacyContext';
import { Medicine } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface MedicineFormProps {
  medicineId: string | null;
  onClose: () => void;
}

const MedicineForm = ({ medicineId, onClose }: MedicineFormProps) => {
  const { medicines, addMedicine, updateMedicine } = usePharmacy();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    symptoms: '',
    price: '',
    stock: '',
    expiryDate: '',
    description: ''
  });

  useEffect(() => {
    if (medicineId) {
      const medicine = medicines.find(m => m.id === medicineId);
      if (medicine) {
        setFormData({
          name: medicine.name,
          category: medicine.category,
          symptoms: medicine.symptoms.join(', '),
          price: medicine.price.toString(),
          stock: medicine.stock.toString(),
          expiryDate: medicine.expiryDate,
          description: medicine.description
        });
      }
    }
  }, [medicineId, medicines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.price || !formData.stock || !formData.expiryDate) {
      toast({
        title: 'Error',
        description: 'Please fill all required fields',
        variant: 'destructive'
      });
      return;
    }

    const medicine: Medicine = {
      id: medicineId || Date.now().toString(),
      name: formData.name,
      category: formData.category,
      symptoms: formData.symptoms.split(',').map(s => s.trim()).filter(s => s),
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      expiryDate: formData.expiryDate,
      description: formData.description
    };

    if (medicineId) {
      updateMedicine(medicineId, medicine);
      toast({
        title: 'Success',
        description: 'Medicine updated successfully'
      });
    } else {
      addMedicine(medicine);
      toast({
        title: 'Success',
        description: 'Medicine added successfully'
      });
    }

    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{medicineId ? 'Edit Medicine' : 'Add New Medicine'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Medicine Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Paracetamol 500mg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Pain Relief"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="symptoms">Symptoms (comma-separated)</Label>
            <Input
              id="symptoms"
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
              placeholder="e.g., fever, headache, body pain"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock *</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date *</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the medicine"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {medicineId ? 'Update Medicine' : 'Add Medicine'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MedicineForm;
