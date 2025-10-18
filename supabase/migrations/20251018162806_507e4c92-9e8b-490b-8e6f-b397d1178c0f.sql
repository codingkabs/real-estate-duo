-- Create table to track property views
CREATE TABLE IF NOT EXISTS public.property_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  property_id uuid REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  viewed_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(user_id, property_id)
);

-- Enable RLS
ALTER TABLE public.property_views ENABLE ROW LEVEL SECURITY;

-- Users can insert their own views
CREATE POLICY "Users can insert own views"
ON public.property_views
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can view their own views
CREATE POLICY "Users can view own views"
ON public.property_views
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX idx_property_views_user_id ON public.property_views(user_id);
CREATE INDEX idx_property_views_property_id ON public.property_views(property_id);

-- Function to get recommended properties
CREATE OR REPLACE FUNCTION public.get_recommended_properties(p_user_id uuid)
RETURNS TABLE (
  id uuid,
  title text,
  description text,
  address text,
  price numeric,
  bedrooms integer,
  bathrooms integer,
  area integer,
  images text[],
  status property_status,
  owner_id uuid,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  similarity_score numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  avg_price numeric;
  avg_bedrooms numeric;
  user_location text;
BEGIN
  -- Get user's average price range and bedrooms from viewed properties
  SELECT 
    AVG(p.price),
    AVG(p.bedrooms)
  INTO avg_price, avg_bedrooms
  FROM property_views pv
  JOIN properties p ON p.id = pv.property_id
  WHERE pv.user_id = p_user_id;

  -- Get most common location from viewed properties
  SELECT p.address
  INTO user_location
  FROM property_views pv
  JOIN properties p ON p.id = pv.property_id
  WHERE pv.user_id = p_user_id
  GROUP BY p.address
  ORDER BY COUNT(*) DESC
  LIMIT 1;

  -- Return recommendations based on similarity
  RETURN QUERY
  SELECT 
    p.id,
    p.title,
    p.description,
    p.address,
    p.price,
    p.bedrooms,
    p.bathrooms,
    p.area,
    p.images,
    p.status,
    p.owner_id,
    p.created_at,
    p.updated_at,
    -- Calculate similarity score (0-100)
    ROUND(
      (
        -- Price similarity (40% weight)
        CASE 
          WHEN avg_price IS NOT NULL THEN
            (1 - LEAST(ABS(p.price - avg_price) / NULLIF(avg_price, 0), 1)) * 40
          ELSE 0
        END
        +
        -- Bedroom similarity (30% weight)
        CASE 
          WHEN avg_bedrooms IS NOT NULL THEN
            (1 - LEAST(ABS(p.bedrooms - avg_bedrooms) / NULLIF(avg_bedrooms, 0), 1)) * 30
          ELSE 0
        END
        +
        -- Location similarity (30% weight)
        CASE 
          WHEN user_location IS NOT NULL AND p.address ILIKE '%' || split_part(user_location, ',', -1) || '%' THEN 30
          ELSE 0
        END
      )::numeric, 2
    ) AS similarity_score
  FROM properties p
  WHERE p.status = 'active'
    AND p.owner_id != p_user_id
    AND p.id NOT IN (
      SELECT property_id FROM property_views WHERE user_id = p_user_id
    )
  ORDER BY similarity_score DESC
  LIMIT 5;
END;
$$;