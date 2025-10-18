import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Offer {
  id: string;
  property_id: string;
  buyer_id: string;
  offer_price: number;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
  updated_at: string;
}

export function usePropertyOffers(propertyId: string) {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (propertyId) fetchOffers();
  }, [propertyId]);

  const fetchOffers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("offers")
        .select("*")
        .eq("property_id", propertyId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching offers",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { offers, isLoading, refetch: fetchOffers };
}

export function useMyOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMyOffers();
  }, []);

  const fetchMyOffers = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("offers")
        .select("*")
        .eq("buyer_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching your offers",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { offers, isLoading, refetch: fetchMyOffers };
}

export function useOfferMutations() {
  const { toast } = useToast();

  const createOffer = async (propertyId: string, offerPrice: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("offers")
        .insert({
          property_id: propertyId,
          buyer_id: user.id,
          offer_price: offerPrice,
          status: "pending",
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Offer submitted",
        description: "Your offer has been sent to the property owner.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error creating offer",
        description: error.message,
      });
      return { data: null, error };
    }
  };

  const updateOfferStatus = async (offerId: string, status: "accepted" | "rejected") => {
    try {
      const { data, error } = await supabase
        .from("offers")
        .update({ status })
        .eq("id", offerId)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Offer updated",
        description: `Offer has been ${status}.`,
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating offer",
        description: error.message,
      });
      return { data: null, error };
    }
  };

  return { createOffer, updateOfferStatus };
}
