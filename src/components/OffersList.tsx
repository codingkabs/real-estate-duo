import { useOffers } from "@/hooks/useOffers";
import { useOfferMutations } from "@/hooks/useOffers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface OffersListProps {
  propertyId: string;
  isOwner: boolean;
}

export default function OffersList({ propertyId, isOwner }: OffersListProps) {
  const { offers, isLoading, refetch } = useOffers(propertyId);
  const { updateOfferStatus } = useOfferMutations();

  const handleOfferAction = async (offerId: string, status: "accepted" | "rejected") => {
    await updateOfferStatus(offerId, status);
    refetch();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-green-500">Accepted</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  if (isLoading) {
    return <p className="text-muted-foreground">Loading offers...</p>;
  }

  if (!offers.length) {
    return <p className="text-muted-foreground">No offers yet.</p>;
  }

  return (
    <div className="space-y-4">
      {offers.map((offer) => (
        <Card key={offer.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                ${offer.offer_price.toLocaleString()}
              </CardTitle>
              {getStatusBadge(offer.status)}
            </div>
            <CardDescription>
              Submitted on {new Date(offer.created_at).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          {isOwner && offer.status === "pending" && (
            <CardContent>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleOfferAction(offer.id, "accepted")}
                  className="flex-1"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleOfferAction(offer.id, "rejected")}
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
