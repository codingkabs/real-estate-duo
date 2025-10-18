import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import heroImage from "@/assets/hero-home.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const Index = () => {
  const featuredProperties = [
    {
      id: 1,
      image: property1,
      price: 485000,
      address: "123 Maple Street, San Francisco, CA",
      beds: 3,
      baths: 2,
      sqft: 2100,
      type: "For Sale"
    },
    {
      id: 2,
      image: property2,
      price: 725000,
      address: "456 Ocean Avenue, Los Angeles, CA",
      beds: 4,
      baths: 3,
      sqft: 2850,
      type: "For Sale"
    },
    {
      id: 3,
      image: property3,
      price: 395000,
      address: "789 Park Lane, Seattle, WA",
      beds: 2,
      baths: 2,
      sqft: 1600,
      type: "For Sale"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Sell Your Home. Earn Your Commission. Be Your Own Agent.
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Take control of your sale with our smart platform - no middleman, no hidden fees, just results.
          </p>
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg p-2 shadow-2xl">
            <div className="flex gap-2">
              <Input 
                placeholder="Enter an address, neighborhood, city, or ZIP code"
                className="flex-1 border-0 focus-visible:ring-0 text-lg"
              />
              <Button size="lg" className="gap-2">
                <Search className="h-5 w-5" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Properties for sale</h2>
            <p className="text-muted-foreground">Discover our hand-picked selection of premium listings</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Sell Your Home?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            List your property with us and reach millions of potential buyers
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href="/signup/seller">Get Started</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
