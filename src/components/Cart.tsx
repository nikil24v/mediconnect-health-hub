import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Trash2, Plus, Minus } from 'lucide-react';
import { usePharmacy } from '@/contexts/PharmacyContext';
import InstructionSlip from './InstructionSlip';
import { useAuth } from '@/contexts/AuthContext';

interface CartProps {
  open: boolean;
  onClose: () => void;
}

const Cart = ({ open, onClose }: CartProps) => {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = usePharmacy();
  const { currentUser } = useAuth();
  const [showInstructionSlip, setShowInstructionSlip] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowInstructionSlip(true);
  };

  const handleCloseSlip = () => {
    setShowInstructionSlip(false);
    clearCart();
    onClose();
  };

  if (showInstructionSlip) {
    return (
      <InstructionSlip
        open={showInstructionSlip}
        onClose={handleCloseSlip}
        customerName={currentUser?.name || 'Customer'}
        medicines={cart.map(item => ({
          name: item.medicine.name,
          dosage: item.medicine.description,
          expiryDate: item.medicine.expiryDate,
          quantity: item.quantity,
          price: item.medicine.price
        }))}
        totalAmount={total}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Shopping Cart</DialogTitle>
        </DialogHeader>

        {cart.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            Your cart is empty
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <Card key={item.medicine.id} className="p-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.medicine.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.medicine.category}
                    </p>
                    <p className="text-primary font-semibold">
                      ₹{item.medicine.price} × {item.quantity} = ₹{(item.medicine.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateCartQuantity(item.medicine.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val > 0) {
                          updateCartQuantity(item.medicine.id, val);
                        }
                      }}
                      className="w-16 text-center"
                      min="1"
                      max={item.medicine.stock}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateCartQuantity(item.medicine.id, item.quantity + 1)}
                      disabled={item.quantity >= item.medicine.stock}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeFromCart(item.medicine.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-4 bg-accent/50">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (5%):</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-primary">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            <div className="flex gap-2">
              <Button onClick={handleCheckout} className="flex-1">
                Proceed to Checkout
              </Button>
              <Button variant="outline" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Cart;
