import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import heroImage from "@/assets/hero-home.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import soldHomeImage from "@/assets/sold-home-success.jpg";
import founderImage from "@/assets/founder.png";
import Footer from "@/components/Footer";

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
            Take control of your real estate journey. Use our smart tools, AI guidance, and trusted resources to sell your home confidently - without paying thousands in commission.
          </p>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Properties for sale</h2>
            <div className="max-w-3xl bg-white rounded-lg p-2 shadow-xl">
              <div className="flex gap-2">
                <Button variant="outline" size="lg" className="gap-2">
                  <Filter className="h-5 w-5" />
                  Filter
                </Button>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${soldHomeImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
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

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            How You Can Sell Your Home Like a Pro
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Create Your Listing</h3>
              <p className="text-muted-foreground">Upload photos, describe your home, and set your price.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Get AI Recommendations</h3>
              <p className="text-muted-foreground">Our system helps you optimize for best visibility.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Connect with Buyers Directly</h3>
              <p className="text-muted-foreground">Receive offers, negotiate easily, and track progress.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">4</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Close with Confidence</h3>
              <p className="text-muted-foreground">We guide you through every step, with optional agent or legal support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Why Homeowners Love Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <div className="flex items-start gap-3 p-6 bg-card rounded-lg border">
              <span className="text-2xl">🔹</span>
              <p className="text-foreground font-medium">Save up to 6% in commissions</p>
            </div>

            <div className="flex items-start gap-3 p-6 bg-card rounded-lg border">
              <span className="text-2xl">🔹</span>
              <p className="text-foreground font-medium">AI-powered pricing & negotiation tools</p>
            </div>

            <div className="flex items-start gap-3 p-6 bg-card rounded-lg border">
              <span className="text-2xl">🔹</span>
              <p className="text-foreground font-medium">Verified legal forms & closing support</p>
            </div>

            <div className="flex items-start gap-3 p-6 bg-card rounded-lg border">
              <span className="text-2xl">🔹</span>
              <p className="text-foreground font-medium">24/7 assistance from real estate experts</p>
            </div>

            <div className="flex items-start gap-3 p-6 bg-card rounded-lg border">
              <span className="text-2xl">🔹</span>
              <p className="text-foreground font-medium">Transparent, fast, and stress-free process</p>
            </div>

            <div className="flex items-start gap-3 p-6 bg-card rounded-lg border">
              <span className="text-2xl">🔹</span>
              <p className="text-foreground font-medium">Listed on State and National MLS – Your home gets full professional exposure on major MLS networks — just like listings from top real estate agents</p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="max-w-3xl mx-auto bg-primary/5 rounded-lg p-8 border-l-4 border-primary">
            <p className="text-lg text-foreground italic mb-4">
              "I sold my home in 12 days and saved $18,000 in commissions!"
            </p>
            <p className="text-muted-foreground font-semibold">— Maria L.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Simple Pricing. No Surprises.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
            <div className="bg-card rounded-lg p-8 border shadow-sm">
              <h3 className="text-2xl font-bold text-foreground mb-2">Starter</h3>
              <p className="text-3xl font-bold text-primary mb-4">Free</p>
              <p className="text-muted-foreground mb-6">Basic listing, AI valuation, offer tracking</p>
              <Button className="w-full" variant="outline" asChild>
                <a href="/signup/seller">Get Started</a>
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-8 border-2 border-primary shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Popular
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Pro</h3>
              <p className="text-3xl font-bold text-primary mb-4">$199<span className="text-lg text-muted-foreground">/month</span></p>
              <p className="text-muted-foreground mb-6">Advanced marketing tools, legal support, featured listings</p>
              <Button className="w-full" asChild>
                <a href="/signup/seller">Start Pro</a>
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-8 border shadow-sm">
              <h3 className="text-2xl font-bold text-foreground mb-2">Premium</h3>
              <p className="text-3xl font-bold text-primary mb-4">$499<span className="text-lg text-muted-foreground"> one-time</span></p>
              <p className="text-muted-foreground mb-6">Everything included + personal coach</p>
              <Button className="w-full" variant="outline" asChild>
                <a href="/signup/seller">Go Premium</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Meet the Vision Behind the Change
          </h2>
          
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3">
              <img 
                src={founderImage} 
                alt="Roselin Samnani, Founder" 
                className="rounded-lg shadow-xl w-full"
              />
            </div>
            
            <div className="w-full md:w-2/3">
              <p className="text-lg text-foreground italic mb-4 leading-relaxed">
                "I believe everyone deserves the power to sell their home on their own terms. I started this platform to make real estate fair, simple, and empowering — for everyday homeowners."
              </p>
              <p className="text-muted-foreground font-semibold">
                — Roselin Samnani, Founder & Entrepreneur
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Try It Free Risk Free Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Money Back Guarantee
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href="/signup/seller">Start Selling Now</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
