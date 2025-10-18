import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type Property = Database["public"]["Tables"]["properties"]["Row"];
type PropertyInsert = Database["public"]["Tables"]["properties"]["Insert"];
type PropertyUpdate = Database["public"]["Tables"]["properties"]["Update"];

interface PropertyFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
}

export function useProperties() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // GET /properties - List all active properties with filters
  const getProperties = async (filters?: PropertyFilters) => {
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
      return data;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching properties",
        description: error.message,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // GET /properties/:id - Get single property
  const getProperty = async (id: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching property",
        description: error.message,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // POST /properties - Create new property (seller/agent only)
  const createProperty = async (property: PropertyInsert) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in to create a property");

      const { data, error } = await supabase
        .from("properties")
        .insert({
          ...property,
          owner_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Property created successfully",
      });
      return data;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error creating property",
        description: error.message,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // PUT /properties/:id - Update property (owner only)
  const updateProperty = async (id: string, updates: PropertyUpdate) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("properties")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Property updated successfully",
      });
      return data;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating property",
        description: error.message,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE /properties/:id - Delete property (owner only)
  const deleteProperty = async (id: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Property deleted successfully",
      });
      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error deleting property",
        description: error.message,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty,
  };
}
