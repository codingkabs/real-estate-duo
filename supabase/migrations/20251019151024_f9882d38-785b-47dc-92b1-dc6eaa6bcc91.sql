-- Add detailed property information columns to properties table

-- Bedrooms & Bathrooms details
ALTER TABLE public.properties 
ADD COLUMN full_bathrooms integer,
ADD COLUMN half_bathrooms integer,
ADD COLUMN room_types text[],

-- Primary bedroom
ADD COLUMN primary_bedroom_features text[],
ADD COLUMN primary_bedroom_level text,

-- Primary bathroom  
ADD COLUMN primary_bathroom_features text[],

-- Dining room
ADD COLUMN dining_room_features text[],

-- Kitchen
ADD COLUMN kitchen_features text[],

-- Heating & Cooling
ADD COLUMN heating_types text[],
ADD COLUMN cooling_types text[],

-- Appliances
ADD COLUMN appliances_included text[],
ADD COLUMN laundry_features text[],

-- Interior Features
ADD COLUMN interior_features text[],
ADD COLUMN flooring_types text[],
ADD COLUMN window_features text[],
ADD COLUMN basement_features text[],
ADD COLUMN attic_features text,
ADD COLUMN fireplace_count integer DEFAULT 0,
ADD COLUMN fireplace_features text[],
ADD COLUMN common_walls boolean DEFAULT false,

-- Interior Area
ADD COLUMN total_structure_area integer,
ADD COLUMN finished_area_above_ground integer,
ADD COLUMN finished_area_below_ground integer,

-- Virtual Tours
ADD COLUMN virtual_tour_url text,
ADD COLUMN virtual_tour_url_2 text,

-- Parking
ADD COLUMN total_parking_spaces integer,
ADD COLUMN parking_features text[],
ADD COLUMN attached_garage_spaces integer,
ADD COLUMN has_uncovered_spaces boolean DEFAULT false,

-- Accessibility
ADD COLUMN accessibility_features text[],

-- Property Features
ADD COLUMN property_levels text,
ADD COLUMN stories integer,
ADD COLUMN patio_porch_features text[],
ADD COLUMN exterior_features text[],
ADD COLUMN pool_features text[],
ADD COLUMN spa_features text[],
ADD COLUMN fencing_features text[],
ADD COLUMN has_view boolean DEFAULT false,
ADD COLUMN view_description text,
ADD COLUMN waterfront_features text[],

-- Lot
ADD COLUMN lot_size_acres numeric,
ADD COLUMN lot_dimensions text,
ADD COLUMN lot_features text[],

-- Additional Details
ADD COLUMN additional_structures text[],
ADD COLUMN parcel_number text,
ADD COLUMN horse_amenities text[],

-- Construction
ADD COLUMN home_type text DEFAULT 'SingleFamily',
ADD COLUMN architectural_style text,
ADD COLUMN property_subtype text,
ADD COLUMN exterior_materials text[],
ADD COLUMN foundation_type text,
ADD COLUMN roof_type text,

-- Condition
ADD COLUMN is_new_construction boolean DEFAULT false,
ADD COLUMN year_built integer,

-- Utilities
ADD COLUMN electric_details text,
ADD COLUMN sewer_type text,
ADD COLUMN water_source text,
ADD COLUMN utilities_available text[],
ADD COLUMN energy_efficient_items text[],
ADD COLUMN energy_generation text[],

-- Community & HOA
ADD COLUMN community_features text[],
ADD COLUMN security_features text[],
ADD COLUMN subdivision_name text,
ADD COLUMN has_hoa boolean DEFAULT false,
ADD COLUMN hoa_services text[],
ADD COLUMN hoa_fee_amount numeric,
ADD COLUMN hoa_fee_frequency text,
ADD COLUMN hoa_phone text,

-- Financial Details
ADD COLUMN tax_assessed_value numeric,
ADD COLUMN annual_tax_amount numeric,
ADD COLUMN ownership_type text,
ADD COLUMN road_surface_type text;

COMMENT ON COLUMN public.properties.full_bathrooms IS 'Number of full bathrooms';
COMMENT ON COLUMN public.properties.half_bathrooms IS 'Number of half bathrooms';
COMMENT ON COLUMN public.properties.lot_size_acres IS 'Lot size in acres';
COMMENT ON COLUMN public.properties.hoa_fee_amount IS 'HOA fee amount';
COMMENT ON COLUMN public.properties.hoa_fee_frequency IS 'HOA fee frequency (monthly, annually, etc)';
