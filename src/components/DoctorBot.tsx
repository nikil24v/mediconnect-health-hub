import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Search, Plus, X } from 'lucide-react';
import { Medicine } from '@/types';
import { usePharmacy } from '@/contexts/PharmacyContext';
import { getDaysUntilExpiry, isNearExpiry } from '@/utils/dateUtils';

interface DoctorBotProps {
  open: boolean;
  onClose: () => void;
}

const DoctorBot = ({ open, onClose }: DoctorBotProps) => {
  const { medicines, addToCart, markDoctorBotShown } = usePharmacy();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Medicine[]>([]);

  const commonSymptoms = [
    'Fever', 'Headache', 'Cold', 'Cough', 'Body Pain',
    'Acidity', 'Sore Throat', 'Allergy', 'Infection', 'Stomach Pain'
  ];

  const handleSearch = (query?: string) => {
    const searchTerm = (query || searchQuery).toLowerCase().trim();
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    const filtered = medicines.filter(medicine =>
      medicine.name.toLowerCase().includes(searchTerm) ||
      medicine.category.toLowerCase().includes(searchTerm) ||
      medicine.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm))
    );

    setSuggestions(filtered);
  };

  const handleSymptomClick = (symptom: string) => {
    setSearchQuery(symptom);
    handleSearch(symptom);
  };

  const handleSkip = () => {
    markDoctorBotShown();
    onClose();
  };

  const handleAddToCart = (medicine: Medicine) => {
    addToCart(medicine, 1);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleSkip()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary">Doctor Bot - AI Symptom Checker</DialogTitle>
          <DialogDescription>
            Search by symptom, medicine name, or category to find the right treatment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Or type your symptom here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={() => handleSearch()} className="shrink-0">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Select common symptoms:</p>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom) => (
                  <Button
                    key={symptom}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSymptomClick(symptom)}
                    className="text-xs"
                  >
                    {symptom}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {suggestions.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Recommended Medicines</h3>
              <div className="grid gap-3">
                {suggestions.map((medicine) => {
                  const daysLeft = getDaysUntilExpiry(medicine.expiryDate);
                  return (
                    <Card key={medicine.id} className="p-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-foreground">{medicine.name}</h4>
                            <Badge variant="secondary">{medicine.category}</Badge>
                            {isNearExpiry(medicine.expiryDate) && (
                              <Badge variant="destructive">
                                Expires in {daysLeft} days
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {medicine.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {medicine.symptoms.map((symptom, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-4 text-sm">
                            <span className="text-primary font-semibold">₹{medicine.price}</span>
                            <span className={medicine.stock < 20 ? 'text-warning' : 'text-muted-foreground'}>
                              Stock: {medicine.stock}
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(medicine)}
                          disabled={medicine.stock === 0}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {searchQuery && suggestions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No medicines found. Try different symptoms or medicine names.
            </div>
          )}

          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" onClick={handleSkip} className="flex-1">
              Skip For Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorBot;
