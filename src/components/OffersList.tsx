import { usePropertyOffers } from "@/hooks/useOffers";
import { useOfferMutations } from "@/hooks/useOffers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface OffersListProps {
  propertyId: string;
  isOwner: boolean;
}

export function OffersList({ propertyId, isOwner }: OffersListProps) {
  const { offers, isLoading, refetch } = usePropertyOffers(propertyId);
  const { updateOfferStatus } = useOfferMutations();

  const handleAccept = async (offerId: string) => {
    const { data } = await updateOfferStatus(offerId, "accepted");
    if (data) refetch();
  };

  const handleReject = async (offerId: string) => {
    const { data } = await updateOfferStatus(offerId, "rejected");
    if (data) refetch();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Accepted</Badge>;
      case "rejected":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
    }
  };

  if (isLoading) {
    return <div className="text-muted-foreground">Loading offers...</div>;
  }

  if (!offers.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Offers</CardTitle>
          <CardDescription>No offers yet</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Offers ({offers.length})</CardTitle>
        <CardDescription>
          {isOwner ? "Manage offers on your property" : "Your offers"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">
                  ${offer.offer_price.toLocaleString()}
                </span>
                {getStatusBadge(offer.status)}
              </div>
              <p className="text-sm text-muted-foreground">
                Submitted {new Date(offer.created_at).toLocaleDateString()}
              </p>
            </div>
            
            {isOwner && offer.status === "pending" && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => handleAccept(offer.id)}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReject(offer.id)}
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
