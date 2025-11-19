import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Printer } from 'lucide-react';

interface InstructionSlipProps {
  open: boolean;
  onClose: () => void;
  customerName: string;
  medicines: Array<{
    name: string;
    dosage: string;
    expiryDate: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
}

const InstructionSlip = ({ open, onClose, customerName, medicines, totalAmount }: InstructionSlipProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto print:shadow-none">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-success-foreground" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Purchase Complete!</DialogTitle>
              <p className="text-sm text-muted-foreground">Your medication instruction slip</p>
            </div>
          </div>
        </DialogHeader>

        <Card className="p-6 print:shadow-none">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center border-b pb-4">
              <h2 className="text-3xl font-bold text-primary mb-2">MediConnect Pharmacy</h2>
              <p className="text-sm text-muted-foreground">Your Trusted Healthcare Partner</p>
              <p className="text-xs text-muted-foreground mt-1">
                📍 123 Medical Street, Healthcare City | 📞 +91 98765 43210
              </p>
            </div>

            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Customer Name</p>
                <p className="font-semibold">{customerName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-semibold">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <Separator />

            {/* Medicines */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Prescribed Medications</h3>
              <div className="space-y-4">
                {medicines.map((medicine, index) => (
                  <Card key={index} className="p-4 bg-accent/30">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{medicine.name}</h4>
                          <p className="text-sm text-muted-foreground">{medicine.dosage}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Qty: {medicine.quantity}</p>
                          <p className="font-semibold text-primary">₹{(medicine.price * medicine.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="bg-warning/10 border border-warning/20 rounded p-2 mt-2">
                        <p className="text-xs font-medium text-warning-foreground">
                          ⚠️ Expiry Date: {new Date(medicine.expiryDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="text-xs text-muted-foreground space-y-1 mt-2">
                        <p>💊 <strong>Dosage:</strong> As prescribed by your doctor</p>
                        <p>🕐 <strong>Timing:</strong> Follow doctor's instructions</p>
                        <p>🍽️ <strong>Food:</strong> Take as directed with/without food</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* Total */}
            <div className="bg-primary/5 rounded p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount Paid</span>
                <span className="text-2xl font-bold text-primary">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Important Instructions */}
            <Card className="p-4 bg-accent/50">
              <h4 className="font-semibold mb-3 text-foreground">⚕️ Important Instructions:</h4>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Complete the full course of medication as prescribed</li>
                <li>• Store medicines in a cool, dry place away from direct sunlight</li>
                <li>• Check expiry dates before consumption</li>
                <li>• Keep medicines out of reach of children</li>
                <li>• Consult your doctor if symptoms persist or worsen</li>
                <li>• Do not share your medications with others</li>
              </ul>
            </Card>

            {/* Footer */}
            <div className="text-center text-xs text-muted-foreground border-t pt-4">
              <p className="mb-1">For any queries, contact us at support@mediconnect.com</p>
              <p className="font-semibold">Thank you for choosing MediConnect Pharmacy!</p>
              <p className="mt-2 italic">Stay healthy, stay safe! 💚</p>
            </div>
          </div>
        </Card>

        <div className="flex gap-2 print:hidden">
          <Button onClick={handlePrint} variant="outline" className="flex-1">
            <Printer className="w-4 h-4 mr-2" />
            Print Slip
          </Button>
          <Button onClick={onClose} className="flex-1">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstructionSlip;
