import { Link } from "react-router-dom";
import { Bed, Bath, Square } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PropertyCardProps {
  id: string | number;
  title?: string;
  image: string;
  price: string | number;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  type?: string;
}

const PropertyCard = ({ id, title, image, price, address, beds, baths, sqft, type = "For Sale" }: PropertyCardProps) => {
  const priceNum = typeof price === 'string' ? parseFloat(price) : price;
  
  return (
    <Link to={`/property/${id}`}>
      <Card className="overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-[var(--card-shadow-hover)]">
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={image} 
            alt={title || address}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-2xl font-bold text-foreground">
              ${priceNum.toLocaleString()}
            </p>
            <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded">
              {type}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{address}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{beds} bd</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{baths} ba</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span>{sqft.toLocaleString()} sqft</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default PropertyCard;
