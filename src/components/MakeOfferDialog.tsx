import { useState } from "react";
import { useOfferMutations } from "@/hooks/useOffers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DollarSign } from "lucide-react";

interface MakeOfferDialogProps {
  propertyId: string;
  propertyPrice: number;
  onOfferSubmitted?: () => void;
}

export function MakeOfferDialog({ propertyId, propertyPrice, onOfferSubmitted }: MakeOfferDialogProps) {
  const [open, setOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createOffer } = useOfferMutations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(offerPrice);
    
    if (!price || price <= 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await createOffer(propertyId, price);
      if (data) {
        setOpen(false);
        setOfferPrice("");
        onOfferSubmitted?.();
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
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Make an Offer</DialogTitle>
            <DialogDescription>
              Submit your offer for this property. Asking price: ${propertyPrice.toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="offer-price">Your Offer ($)</Label>
            <Input
              id="offer-price"
              type="number"
              placeholder={propertyPrice.toString()}
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              min="0"
              step="1000"
              required
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Offer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
