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
