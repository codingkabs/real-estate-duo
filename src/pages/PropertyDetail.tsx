import { useParams, Link, useNavigate } from "react-router-dom";
import { Bed, Bath, Square, MapPin, Heart, Share2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import { useProperty } from "@/hooks/useProperties";
import { useAuth } from "@/hooks/useAuth";
import { MakeOfferDialog } from "@/components/MakeOfferDialog";
import MessagingPanel from "@/components/MessagingPanel";
import { OffersList } from "@/components/OffersList";
import RecommendedProperties from "@/components/RecommendedProperties";


const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { property, isLoading } = useProperty(id || "");
  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === property.owner_id;
  const propertyImage = property.images?.[0] || '/placeholder.svg';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to search
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img 
                src={propertyImage} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  ${property.price.toLocaleString()}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <p>{property.address}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">{property.bedrooms}</span>
                <span className="text-muted-foreground">Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">{property.bathrooms}</span>
                <span className="text-muted-foreground">Bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Square className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">{property.area.toLocaleString()}</span>
                <span className="text-muted-foreground">sqft</span>
              </div>
            </div>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">About This Home</h2>
              <p className="text-muted-foreground leading-relaxed">
                {property.description || property.title}
              </p>
            </Card>

            {isOwner && (
              <OffersList propertyId={property.id} isOwner={true} />
            )}

            {!isOwner && user && (
              <MessagingPanel 
                propertyId={property.id} 
                receiverId={property.owner_id} 
                title="Message Seller"
              />
            )}
          </div>

          <div>
            <Card className="p-6 sticky top-24">
              {isOwner ? (
                <div>
                  <h3 className="text-lg font-bold mb-4">Your Listing</h3>
                  <p className="text-muted-foreground mb-4">This is your property listing.</p>
                  <Button className="w-full" variant="outline" onClick={() => navigate('/create-property')}>
                    Edit Property
                  </Button>
                </div>
              ) : user ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold mb-4">Interested?</h3>
                  <MakeOfferDialog 
                    propertyId={property.id} 
                    propertyPrice={Number(property.price)}
                  />
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-bold mb-4">Get Started</h3>
                  <p className="text-muted-foreground mb-4">Sign in to make an offer or contact the seller.</p>
                  <Button className="w-full" onClick={() => navigate('/auth')}>
                    Sign In
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>

        <RecommendedProperties />
      </div>
    </div>
  );
};

export default PropertyDetail;
