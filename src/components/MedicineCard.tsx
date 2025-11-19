import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { Medicine } from '@/types';
import { getDaysUntilExpiry, isNearExpiry, isExpired } from '@/utils/dateUtils';

interface MedicineCardProps {
  medicine: Medicine;
  onAddToCart: (medicine: Medicine) => void;
}

const MedicineCard = ({ medicine, onAddToCart }: MedicineCardProps) => {
  const daysLeft = getDaysUntilExpiry(medicine.expiryDate);
  const expired = isExpired(medicine.expiryDate);
  const nearExpiry = isNearExpiry(medicine.expiryDate);

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-foreground">{medicine.name}</h3>
            <Badge variant="secondary" className="shrink-0">{medicine.category}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{medicine.description}</p>
        </div>

        <div className="flex flex-wrap gap-1">
          {medicine.symptoms.slice(0, 3).map((symptom, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {symptom}
            </Badge>
          ))}
          {medicine.symptoms.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{medicine.symptoms.length - 3} more
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-primary">₹{medicine.price}</span>
            <span className={`text-sm ${medicine.stock < 20 ? 'text-warning font-semibold' : 'text-muted-foreground'}`}>
              {medicine.stock > 0 ? `Stock: ${medicine.stock}` : 'Out of Stock'}
            </span>
          </div>

          {expired ? (
            <Badge variant="destructive" className="w-full justify-center">
              Expired
            </Badge>
          ) : nearExpiry ? (
            <Badge variant="destructive" className="w-full justify-center">
              Expires in {daysLeft} days
            </Badge>
          ) : (
            <Badge variant="outline" className="w-full justify-center">
              Expires: {new Date(medicine.expiryDate).toLocaleDateString()}
            </Badge>
          )}

          <Button
            onClick={() => onAddToCart(medicine)}
            disabled={medicine.stock === 0 || expired}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MedicineCard;
