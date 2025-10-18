import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import FloatingChatButton from "@/components/FloatingChatButton";
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
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-accent">
        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-40 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-300" />
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-700" />
          <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-500" />
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Sell Your Home. Keep Your Commission.
          </h1>
          <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto drop-shadow-md">
            List on the MLS, attract qualified buyers, and close confidently — without paying agent commissions.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href="/signup">Start Selling Now</a>
          </Button>
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
            Start Selling Today
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands who've saved on commissions
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href="/signup">Get Started</a>
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            How You Can Sell Your Home Like a Pro
          </h2>
          
          <div className="flex justify-center mb-8">
            <Button size="lg" asChild>
              <a href="/signup">Try It Free Today</a>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Create Your Listing</h3>
              <p className="text-muted-foreground">Upload photos, describe your home, and set your price in minutes.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">AI Optimization</h3>
              <p className="text-muted-foreground">Our tools fine-tune your listing for visibility and pricing accuracy.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Get MLS Exposure</h3>
              <p className="text-muted-foreground">Instantly listed on state and national MLS systems — where agents and serious buyers search.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">4</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Connect & Negotiate</h3>
              <p className="text-muted-foreground">Communicate directly with buyers and agents.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">5</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Close with Confidence</h3>
              <p className="text-muted-foreground">Use our trusted legal forms or optional agent support for a seamless close.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Everything You Need to Sell Successfully
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <div className="flex items-start gap-3 p-6 bg-card rounded-lg border">
              <span className="text-2xl">🤖</span>
              <p className="text-foreground font-medium">AI pricing & negotiation tools for faster sales.</p>
            </div>

            <div className="flex items-start gap-3 p-6 bg-card rounded-lg border">
              <span className="text-2xl">📄</span>
              <p className="text-foreground font-medium">Verified legal forms and closing support.</p>
            </div>

            <div className="flex items-start gap-3 p-6 bg-card rounded-lg border">
              <span className="text-2xl">📞</span>
              <p className="text-foreground font-medium">24/7 expert assistance when you need it.</p>
            </div>

            <div className="flex items-start gap-3 p-6 bg-card rounded-lg border">
              <span className="text-2xl">⚡</span>
              <p className="text-foreground font-medium">Fast, transparent process with no hidden fees.</p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="max-w-3xl mx-auto bg-primary/5 rounded-lg p-8 border-l-4 border-primary">
            <p className="text-lg text-foreground italic mb-4">
              🗣️ "I sold my home in 12 days and saved $18,000 in commissions!"
            </p>
            <p className="text-muted-foreground font-semibold">— Maria L.</p>
          </div>
        </div>
      </section>

      {/* MLS Exposure Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-6">
            Maximum Exposure Across All Platforms
          </h2>
          
          <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto mb-8">
            Your listing syndicates to state and national MLS systems, reaching agents, brokers, and serious buyers nationwide.
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4 text-center">With one click, your home appears on:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-card p-4 rounded-lg border text-center">
                <p className="font-semibold text-foreground">Realtor.com</p>
              </div>
              <div className="bg-card p-4 rounded-lg border text-center">
                <p className="font-semibold text-foreground">Zillow</p>
              </div>
              <div className="bg-card p-4 rounded-lg border text-center">
                <p className="font-semibold text-foreground">Redfin</p>
              </div>
              <div className="bg-card p-4 rounded-lg border text-center">
                <p className="font-semibold text-foreground">Trulia</p>
              </div>
              <div className="bg-card p-4 rounded-lg border text-center md:col-span-2">
                <p className="font-semibold text-foreground">And hundreds of agent websites via MLS feeds</p>
              </div>
            </div>
          </div>


          <div className="flex justify-center">
            <Button size="lg" asChild>
              <a href="/signup">List My Home on MLS Today</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16">
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
                <a href="/signup">Get Started for Free</a>
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-8 border-2 border-primary shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Popular
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Pro</h3>
              <p className="text-3xl font-bold text-primary mb-4">$199<span className="text-lg text-muted-foreground">/month</span></p>
              <p className="text-muted-foreground mb-6">MLS listing, advanced marketing tools, legal support</p>
              <Button className="w-full" asChild>
                <a href="/signup">Start Pro</a>
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-8 border shadow-sm">
              <h3 className="text-2xl font-bold text-foreground mb-2">Premium</h3>
              <p className="text-3xl font-bold text-primary mb-4">$499<span className="text-lg text-muted-foreground"> one-time</span></p>
              <p className="text-muted-foreground mb-6">All Pro features + personalized real estate coaching</p>
              <Button className="w-full" variant="outline" asChild>
                <a href="/signup">Go Premium</a>
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
                "I believe every homeowner deserves the power to sell their property on their own terms - with confidence, clarity, and control. I built this platform to make real estate fair, modern, and empowering for everyone."
              </p>
              <p className="text-muted-foreground font-semibold mb-4">
                — Roselin Samnani, Founder & Entrepreneur
              </p>
              <p className="text-primary font-semibold italic">
                "Empowering homeowners to earn their commission - one home at a time."
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
            <a href="/signup">Start Selling Now</a>
          </Button>
        </div>
      </section>

      <Footer />
      <FloatingChatButton />
    </div>
  );
};

export default Index;
