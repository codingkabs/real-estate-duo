import { useState } from "react";
import { useOfferMutations } from "@/hooks/useOffers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DollarSign } from "lucide-react";

interface MakeOfferDialogProps {
  propertyId: string;
  propertyPrice: number;
  onOfferCreated?: () => void;
}

export default function MakeOfferDialog({ propertyId, propertyPrice, onOfferCreated }: MakeOfferDialogProps) {
  const [open, setOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState(propertyPrice);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createOffer } = useOfferMutations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (offerPrice <= 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await createOffer(propertyId, offerPrice);
      
      if (!error) {
        setOpen(false);
        setOfferPrice(propertyPrice);
        onOfferCreated?.();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <DollarSign className="h-4 w-4 mr-2" />
          Make an Offer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Make an Offer</DialogTitle>
          <DialogDescription>
            Submit your offer for this property. The owner will review it.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="offerPrice">Offer Price</Label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="offerPrice"
                type="number"
                min="0"
                step="1000"
                value={offerPrice}
                onChange={(e) => setOfferPrice(parseFloat(e.target.value))}
                className="pl-7"
                required
              />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Listed price: ${propertyPrice.toLocaleString()}
            </p>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Offer"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
