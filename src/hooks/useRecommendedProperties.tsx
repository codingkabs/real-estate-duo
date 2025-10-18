import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface RecommendedProperty {
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

export function useRecommendedProperties() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['recommended-properties', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .rpc('get_recommended_properties', { p_user_id: user.id });

      if (error) throw error;
      return data as RecommendedProperty[];
    },
    enabled: !!user,
  });
}

export async function trackPropertyView(propertyId: string) {
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
    });
}
