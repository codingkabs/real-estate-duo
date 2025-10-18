import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Start your journey with our free listing",
    features: [
      "Basic property listing",
      "Photo gallery (up to 5 photos)",
      "Contact form",
      "30-day listing duration",
      "Basic analytics",
    ],
    popular: false,
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: "$99",
    period: "per listing",
    description: "Enhanced visibility for serious sellers",
    features: [
      "Everything in Free",
      "Unlimited photos & videos",
      "Featured listing placement",
      "90-day listing duration",
      "Advanced analytics",
      "Priority support",
      "Virtual tour support",
    ],
    popular: true,
    cta: "Choose Pro",
  },
  {
    name: "Premium",
    price: "$199",
    period: "per listing",
    description: "Maximum exposure for your property",
    features: [
      "Everything in Pro",
      "Top placement in search results",
      "180-day listing duration",
      "Professional photography service",
      "Social media promotion",
      "Dedicated account manager",
      "3D virtual tour included",
    ],
    popular: false,
    cta: "Choose Premium",
  },
];

export default function Welcome() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanSelection = (planName: string) => {
    setSelectedPlan(planName);
    // Navigate to create property page after selection
    setTimeout(() => {
      navigate("/create-property");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Welcome to Your Real Estate Journey!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your property listing
          </p>
          
          {/* Guarantees */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-5 w-5 text-primary" />
              <span>Start free, upgrade anytime</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-5 w-5 text-primary" />
              <span>Money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-5 w-5 text-primary" />
              <span>Cancel your listing anytime</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative transition-all duration-300 hover:shadow-lg ${
                plan.popular
                  ? "border-primary shadow-md scale-105"
                  : "hover:scale-102"
              } ${
                selectedPlan === plan.name ? "ring-2 ring-primary" : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-8 pt-6">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.price !== "$0" && (
                    <span className="text-muted-foreground ml-2">/ {plan.period}</span>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-card-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handlePlanSelection(plan.name)}
                  disabled={selectedPlan !== null}
                >
                  {selectedPlan === plan.name ? "Selected!" : plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="bg-muted/50 border-primary/20">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Our Commitment to You</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-muted-foreground">
                Start with our free package and experience the platform risk-free. You can upgrade at any time to unlock additional features and increase your property's visibility.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Money-Back Guarantee:</strong> Not satisfied? We offer a full refund if you're not happy with our service at any point. You can also remove your listing anytime with no questions asked.
              </p>
              <div className="pt-4">
                <Button variant="ghost" onClick={() => navigate("/")}>
                  Browse Properties First
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
