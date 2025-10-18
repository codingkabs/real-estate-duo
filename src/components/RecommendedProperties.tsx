import { useRecommendedProperties } from "@/hooks/useRecommendedProperties";
import PropertyCard from "./PropertyCard";
import { Skeleton } from "./ui/skeleton";

const RecommendedProperties = () => {
  const { data: recommendations, isLoading } = useRecommendedProperties();

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[400px] rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">Recommended for You</h2>
        <p className="text-muted-foreground mb-8">
          Based on your viewing history and preferences
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((property) => (
            <div key={property.id} className="relative">
              <PropertyCard 
                id={parseInt(property.id)}
                image={property.images?.[0] || '/placeholder.svg'}
                price={Number(property.price)}
                address={property.address}
                beds={property.bedrooms}
                baths={property.bathrooms}
                sqft={property.area}
                type="For Sale"
              />
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                {property.similarity_score}% match
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProperties;
