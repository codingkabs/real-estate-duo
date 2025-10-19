import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Property {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[] | null;
  status: "active" | "sold" | "pending";
  created_at: string;
  updated_at: string;
  
  // Extended property details (all optional)
  full_bathrooms?: number | null;
  half_bathrooms?: number | null;
  room_types?: string[] | null;
  primary_bedroom_features?: string[] | null;
  primary_bedroom_level?: string | null;
  primary_bathroom_features?: string[] | null;
  dining_room_features?: string[] | null;
  kitchen_features?: string[] | null;
  heating_types?: string[] | null;
  cooling_types?: string[] | null;
  appliances_included?: string[] | null;
  laundry_features?: string[] | null;
  interior_features?: string[] | null;
  flooring_types?: string[] | null;
  window_features?: string[] | null;
  basement_features?: string[] | null;
  attic_features?: string | null;
  fireplace_count?: number | null;
  fireplace_features?: string[] | null;
  common_walls?: boolean | null;
  total_structure_area?: number | null;
  finished_area_above_ground?: number | null;
  finished_area_below_ground?: number | null;
  virtual_tour_url?: string | null;
  virtual_tour_url_2?: string | null;
  total_parking_spaces?: number | null;
  parking_features?: string[] | null;
  attached_garage_spaces?: number | null;
  has_uncovered_spaces?: boolean | null;
  accessibility_features?: string[] | null;
  property_levels?: string | null;
  stories?: number | null;
  patio_porch_features?: string[] | null;
  exterior_features?: string[] | null;
  pool_features?: string[] | null;
  spa_features?: string[] | null;
  fencing_features?: string[] | null;
  has_view?: boolean | null;
  view_description?: string | null;
  waterfront_features?: string[] | null;
  lot_size_acres?: number | null;
  lot_dimensions?: string | null;
  lot_features?: string[] | null;
  additional_structures?: string[] | null;
  parcel_number?: string | null;
  horse_amenities?: string[] | null;
  home_type?: string | null;
  architectural_style?: string | null;
  property_subtype?: string | null;
  exterior_materials?: string[] | null;
  foundation_type?: string | null;
  roof_type?: string | null;
  is_new_construction?: boolean | null;
  year_built?: number | null;
  electric_details?: string | null;
  sewer_type?: string | null;
  water_source?: string | null;
  utilities_available?: string[] | null;
  energy_efficient_items?: string[] | null;
  energy_generation?: string[] | null;
  community_features?: string[] | null;
  security_features?: string[] | null;
  subdivision_name?: string | null;
  has_hoa?: boolean | null;
  hoa_services?: string[] | null;
  hoa_fee_amount?: number | null;
  hoa_fee_frequency?: string | null;
  hoa_phone?: string | null;
  tax_assessed_value?: number | null;
  annual_tax_amount?: number | null;
  ownership_type?: string | null;
  road_surface_type?: string | null;
}

export interface PropertyFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
}

export function useProperties(filters?: PropertyFilters) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("properties")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (filters?.city) {
        query = query.ilike("address", `%${filters.city}%`);
      }
      if (filters?.minPrice) {
        query = query.gte("price", filters.minPrice);
      }
      if (filters?.maxPrice) {
        query = query.lte("price", filters.maxPrice);
      }
      if (filters?.bedrooms) {
        query = query.eq("bedrooms", filters.bedrooms);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProperties(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching properties",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { properties, isLoading, refetch: fetchProperties };
}

export function useProperty(id: string) {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      setProperty(data);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching property",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { property, isLoading, refetch: fetchProperty };
}

export function usePropertyMutations() {
  const { toast } = useToast();

  const createProperty = async (propertyData: Omit<Property, "id" | "created_at" | "updated_at" | "owner_id">) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("properties")
        .insert({
          ...propertyData,
          owner_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property created successfully",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error creating property",
        description: error.message,
      });
      return { data: null, error };
    }
  };

  const updateProperty = async (id: string, propertyData: Partial<Property>) => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .update(propertyData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property updated successfully",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating property",
        description: error.message,
      });
      return { data: null, error };
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property deleted successfully",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error deleting property",
        description: error.message,
      });
      return { error };
    }
  };

  return { createProperty, updateProperty, deleteProperty };
}
