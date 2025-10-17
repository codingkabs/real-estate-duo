import { useParams, Link } from "react-router-dom";
import { Bed, Bath, Square, MapPin, Heart, Share2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const PropertyDetail = () => {
  const { id } = useParams();
  
  const properties = {
    "1": {
      image: property1,
      price: 485000,
      address: "123 Maple Street",
      city: "San Francisco, CA 94102",
      beds: 3,
      baths: 2,
      sqft: 2100,
      description: "Beautiful two-story home in a desirable neighborhood. Features modern updates throughout, spacious backyard, and attached garage. Close to schools, parks, and shopping.",
      features: [
        "Central heating and cooling",
        "Hardwood floors",
        "Updated kitchen with granite countertops",
        "Master suite with walk-in closet",
        "Large backyard with patio",
        "2-car attached garage"
      ]
    },
    "2": {
      image: property2,
      price: 725000,
      address: "456 Ocean Avenue",
      city: "Los Angeles, CA 90025",
      beds: 4,
      baths: 3,
      sqft: 2850,
      description: "Stunning modern apartment in prime location. Floor-to-ceiling windows with spectacular city views. Building amenities include fitness center, pool, and concierge service.",
      features: [
        "Floor-to-ceiling windows",
        "Stainless steel appliances",
        "In-unit washer/dryer",
        "Building fitness center",
        "Rooftop pool and lounge",
        "24-hour concierge"
      ]
    },
    "3": {
      image: property3,
      price: 395000,
      address: "789 Park Lane",
      city: "Seattle, WA 98101",
      beds: 2,
      baths: 2,
      sqft: 1600,
      description: "Charming townhouse with contemporary finishes. Open floor plan perfect for entertaining. Includes private outdoor space and additional storage.",
      features: [
        "Open concept living",
        "Quartz countertops",
        "Custom cabinetry",
        "Private patio",
        "Additional storage unit",
        "HOA maintained exterior"
      ]
    }
  };

  const property = properties[id as keyof typeof properties] || properties["1"];

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
                src={property.image} 
                alt={property.address}
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
                  <p>{property.address}, {property.city}</p>
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
                <span className="font-semibold">{property.beds}</span>
                <span className="text-muted-foreground">Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">{property.baths}</span>
                <span className="text-muted-foreground">Bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Square className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">{property.sqft.toLocaleString()}</span>
                <span className="text-muted-foreground">sqft</span>
              </div>
            </div>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">About This Home</h2>
              <p className="text-muted-foreground leading-relaxed">
                {property.description}
              </p>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Features</h2>
              <ul className="grid md:grid-cols-2 gap-3">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div>
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4">Contact Agent</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  defaultValue="I'm interested in this property."
                />
                <Button className="w-full">Request Information</Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
