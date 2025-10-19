export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      messages: {
        Row: {
          created_at: string
          id: string
          message: string
          property_id: string | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          property_id?: string | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          property_id?: string | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          buyer_id: string
          created_at: string
          id: string
          offer_price: number
          property_id: string
          status: Database["public"]["Enums"]["offer_status"]
          updated_at: string
        }
        Insert: {
          buyer_id: string
          created_at?: string
          id?: string
          offer_price: number
          property_id: string
          status?: Database["public"]["Enums"]["offer_status"]
          updated_at?: string
        }
        Update: {
          buyer_id?: string
          created_at?: string
          id?: string
          offer_price?: number
          property_id?: string
          status?: Database["public"]["Enums"]["offer_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "offers_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          accessibility_features: string[] | null
          additional_structures: string[] | null
          address: string
          annual_tax_amount: number | null
          appliances_included: string[] | null
          architectural_style: string | null
          area: number
          attached_garage_spaces: number | null
          attic_features: string | null
          basement_features: string[] | null
          bathrooms: number
          bedrooms: number
          common_walls: boolean | null
          community_features: string[] | null
          cooling_types: string[] | null
          created_at: string
          description: string | null
          dining_room_features: string[] | null
          electric_details: string | null
          energy_efficient_items: string[] | null
          energy_generation: string[] | null
          exterior_features: string[] | null
          exterior_materials: string[] | null
          fencing_features: string[] | null
          finished_area_above_ground: number | null
          finished_area_below_ground: number | null
          fireplace_count: number | null
          fireplace_features: string[] | null
          flooring_types: string[] | null
          foundation_type: string | null
          full_bathrooms: number | null
          half_bathrooms: number | null
          has_hoa: boolean | null
          has_uncovered_spaces: boolean | null
          has_view: boolean | null
          heating_types: string[] | null
          hoa_fee_amount: number | null
          hoa_fee_frequency: string | null
          hoa_phone: string | null
          hoa_services: string[] | null
          home_type: string | null
          horse_amenities: string[] | null
          id: string
          images: string[] | null
          interior_features: string[] | null
          is_new_construction: boolean | null
          kitchen_features: string[] | null
          laundry_features: string[] | null
          lot_dimensions: string | null
          lot_features: string[] | null
          lot_size_acres: number | null
          owner_id: string
          ownership_type: string | null
          parcel_number: string | null
          parking_features: string[] | null
          patio_porch_features: string[] | null
          pool_features: string[] | null
          price: number
          primary_bathroom_features: string[] | null
          primary_bedroom_features: string[] | null
          primary_bedroom_level: string | null
          property_levels: string | null
          property_subtype: string | null
          road_surface_type: string | null
          roof_type: string | null
          room_types: string[] | null
          security_features: string[] | null
          sewer_type: string | null
          spa_features: string[] | null
          status: Database["public"]["Enums"]["property_status"]
          stories: number | null
          subdivision_name: string | null
          tax_assessed_value: number | null
          title: string
          total_parking_spaces: number | null
          total_structure_area: number | null
          updated_at: string
          utilities_available: string[] | null
          view_description: string | null
          virtual_tour_url: string | null
          virtual_tour_url_2: string | null
          water_source: string | null
          waterfront_features: string[] | null
          window_features: string[] | null
          year_built: number | null
        }
        Insert: {
          accessibility_features?: string[] | null
          additional_structures?: string[] | null
          address: string
          annual_tax_amount?: number | null
          appliances_included?: string[] | null
          architectural_style?: string | null
          area: number
          attached_garage_spaces?: number | null
          attic_features?: string | null
          basement_features?: string[] | null
          bathrooms: number
          bedrooms: number
          common_walls?: boolean | null
          community_features?: string[] | null
          cooling_types?: string[] | null
          created_at?: string
          description?: string | null
          dining_room_features?: string[] | null
          electric_details?: string | null
          energy_efficient_items?: string[] | null
          energy_generation?: string[] | null
          exterior_features?: string[] | null
          exterior_materials?: string[] | null
          fencing_features?: string[] | null
          finished_area_above_ground?: number | null
          finished_area_below_ground?: number | null
          fireplace_count?: number | null
          fireplace_features?: string[] | null
          flooring_types?: string[] | null
          foundation_type?: string | null
          full_bathrooms?: number | null
          half_bathrooms?: number | null
          has_hoa?: boolean | null
          has_uncovered_spaces?: boolean | null
          has_view?: boolean | null
          heating_types?: string[] | null
          hoa_fee_amount?: number | null
          hoa_fee_frequency?: string | null
          hoa_phone?: string | null
          hoa_services?: string[] | null
          home_type?: string | null
          horse_amenities?: string[] | null
          id?: string
          images?: string[] | null
          interior_features?: string[] | null
          is_new_construction?: boolean | null
          kitchen_features?: string[] | null
          laundry_features?: string[] | null
          lot_dimensions?: string | null
          lot_features?: string[] | null
          lot_size_acres?: number | null
          owner_id: string
          ownership_type?: string | null
          parcel_number?: string | null
          parking_features?: string[] | null
          patio_porch_features?: string[] | null
          pool_features?: string[] | null
          price: number
          primary_bathroom_features?: string[] | null
          primary_bedroom_features?: string[] | null
          primary_bedroom_level?: string | null
          property_levels?: string | null
          property_subtype?: string | null
          road_surface_type?: string | null
          roof_type?: string | null
          room_types?: string[] | null
          security_features?: string[] | null
          sewer_type?: string | null
          spa_features?: string[] | null
          status?: Database["public"]["Enums"]["property_status"]
          stories?: number | null
          subdivision_name?: string | null
          tax_assessed_value?: number | null
          title: string
          total_parking_spaces?: number | null
          total_structure_area?: number | null
          updated_at?: string
          utilities_available?: string[] | null
          view_description?: string | null
          virtual_tour_url?: string | null
          virtual_tour_url_2?: string | null
          water_source?: string | null
          waterfront_features?: string[] | null
          window_features?: string[] | null
          year_built?: number | null
        }
        Update: {
          accessibility_features?: string[] | null
          additional_structures?: string[] | null
          address?: string
          annual_tax_amount?: number | null
          appliances_included?: string[] | null
          architectural_style?: string | null
          area?: number
          attached_garage_spaces?: number | null
          attic_features?: string | null
          basement_features?: string[] | null
          bathrooms?: number
          bedrooms?: number
          common_walls?: boolean | null
          community_features?: string[] | null
          cooling_types?: string[] | null
          created_at?: string
          description?: string | null
          dining_room_features?: string[] | null
          electric_details?: string | null
          energy_efficient_items?: string[] | null
          energy_generation?: string[] | null
          exterior_features?: string[] | null
          exterior_materials?: string[] | null
          fencing_features?: string[] | null
          finished_area_above_ground?: number | null
          finished_area_below_ground?: number | null
          fireplace_count?: number | null
          fireplace_features?: string[] | null
          flooring_types?: string[] | null
          foundation_type?: string | null
          full_bathrooms?: number | null
          half_bathrooms?: number | null
          has_hoa?: boolean | null
          has_uncovered_spaces?: boolean | null
          has_view?: boolean | null
          heating_types?: string[] | null
          hoa_fee_amount?: number | null
          hoa_fee_frequency?: string | null
          hoa_phone?: string | null
          hoa_services?: string[] | null
          home_type?: string | null
          horse_amenities?: string[] | null
          id?: string
          images?: string[] | null
          interior_features?: string[] | null
          is_new_construction?: boolean | null
          kitchen_features?: string[] | null
          laundry_features?: string[] | null
          lot_dimensions?: string | null
          lot_features?: string[] | null
          lot_size_acres?: number | null
          owner_id?: string
          ownership_type?: string | null
          parcel_number?: string | null
          parking_features?: string[] | null
          patio_porch_features?: string[] | null
          pool_features?: string[] | null
          price?: number
          primary_bathroom_features?: string[] | null
          primary_bedroom_features?: string[] | null
          primary_bedroom_level?: string | null
          property_levels?: string | null
          property_subtype?: string | null
          road_surface_type?: string | null
          roof_type?: string | null
          room_types?: string[] | null
          security_features?: string[] | null
          sewer_type?: string | null
          spa_features?: string[] | null
          status?: Database["public"]["Enums"]["property_status"]
          stories?: number | null
          subdivision_name?: string | null
          tax_assessed_value?: number | null
          title?: string
          total_parking_spaces?: number | null
          total_structure_area?: number | null
          updated_at?: string
          utilities_available?: string[] | null
          view_description?: string | null
          virtual_tour_url?: string | null
          virtual_tour_url_2?: string | null
          water_source?: string | null
          waterfront_features?: string[] | null
          window_features?: string[] | null
          year_built?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      property_views: {
        Row: {
          id: string
          property_id: string
          user_id: string
          viewed_at: string
        }
        Insert: {
          id?: string
          property_id: string
          user_id: string
          viewed_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          user_id?: string
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_views_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_admin_agents: {
        Args: Record<PropertyKey, never>
        Returns: {
          active_listings: number
          created_at: string
          email: string
          full_name: string
          phone: string
          total_listings: number
          user_id: string
        }[]
      }
      get_admin_overview: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_recommended_properties: {
        Args: { p_user_id: string }
        Returns: {
          address: string
          area: number
          bathrooms: number
          bedrooms: number
          created_at: string
          description: string
          id: string
          images: string[]
          owner_id: string
          price: number
          similarity_score: number
          status: Database["public"]["Enums"]["property_status"]
          title: string
          updated_at: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "seller" | "buyer"
      offer_status: "pending" | "accepted" | "rejected"
      property_status: "active" | "sold" | "pending"
      user_role: "buyer" | "seller" | "agent" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "seller", "buyer"],
      offer_status: ["pending", "accepted", "rejected"],
      property_status: ["active", "sold", "pending"],
      user_role: ["buyer", "seller", "agent", "admin"],
    },
  },
} as const
