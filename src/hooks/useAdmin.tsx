import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface AdminOverview {
  total_users: number;
  total_listings: number;
  total_offers: number;
  total_sold: number;
}

export interface AgentData {
  user_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  active_listings: number;
  total_listings: number;
  created_at: string;
}

export function useAdminOverview() {
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const { data, error } = await supabase.rpc('get_admin_overview');

        if (error) throw error;
        if (data && typeof data === 'object') {
          setOverview(data as unknown as AdminOverview);
        }
      } catch (error: any) {
        console.error('Error fetching admin overview:', error);
        toast({
          title: "Access Denied",
          description: error.message || "You don't have permission to access this data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOverview();
  }, [toast]);

  return { overview, isLoading };
}

export function useAdminAgents() {
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const { data, error } = await supabase.rpc('get_admin_agents');

        if (error) throw error;
        setAgents(data || []);
      } catch (error: any) {
        console.error('Error fetching admin agents:', error);
        toast({
          title: "Access Denied",
          description: error.message || "You don't have permission to access this data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgents();
  }, [toast]);

  return { agents, isLoading };
}

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching role:', error);
          setRole(null);
        } else {
          setRole(data?.role || null);
        }
      } catch (error) {
        console.error('Error:', error);
        setRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();
  }, []);

  return { role, isAdmin: role === 'admin', isLoading };
}
