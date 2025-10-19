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
import { z } from "zod";

const offerSchema = z.object({
  price: z.number()
    .positive("Offer price must be positive")
    .max(999999999, "Offer price exceeds maximum ($999,999,999)")
    .min(1, "Minimum offer is $1"),
});

interface MakeOfferDialogProps {
  propertyId: string;
  propertyPrice: number;
  onOfferSubmitted?: () => void;
}

export function MakeOfferDialog({ propertyId, propertyPrice, onOfferSubmitted }: MakeOfferDialogProps) {
  const [open, setOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { createOffer } = useOfferMutations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const price = parseFloat(offerPrice);
    
    // Validate using Zod schema
    const validation = offerSchema.safeParse({ price });
    
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await createOffer(propertyId, price);
      if (data) {
        setOpen(false);
        setOfferPrice("");
        setError("");
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
              onChange={(e) => {
                setOfferPrice(e.target.value);
                setError("");
              }}
              min="1"
              max="999999999"
              step="1000"
              required
              className="mt-2"
            />
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
            <p className="text-sm text-muted-foreground mt-2">
              Maximum offer: $999,999,999
            </p>
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
