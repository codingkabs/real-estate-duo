import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RecommendedProperty {
  id: string;
  title: string;
  description: string | null;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[] | null;
  status: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  similarity_score: number;
}

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState<RecommendedProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase.rpc('get_recommended_properties', {
          p_user_id: user.id
        });

        if (error) throw error;
        setRecommendations(data || []);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        toast({
          title: "Error",
          description: "Failed to load recommendations",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [toast]);

  const trackPropertyView = async (propertyId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('property_views')
        .upsert({
          user_id: user.id,
          property_id: propertyId,
          viewed_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,property_id',
          ignoreDuplicates: false,
        });
    } catch (error) {
      console.error('Error tracking property view:', error);
    }
  };

  return {
    recommendations,
    isLoading,
    trackPropertyView,
  };
}
