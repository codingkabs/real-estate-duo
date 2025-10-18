-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'seller', 'buyer');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users can view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Only admins can insert/update/delete roles
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to get admin overview
CREATE OR REPLACE FUNCTION public.get_admin_overview()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result json;
BEGIN
  -- Check if user is admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  SELECT json_build_object(
    'total_users', (SELECT COUNT(*) FROM auth.users),
    'total_listings', (SELECT COUNT(*) FROM properties),
    'total_offers', (SELECT COUNT(*) FROM offers),
    'total_sold', (SELECT COUNT(*) FROM properties WHERE status = 'sold')
  ) INTO result;

  RETURN result;
END;
$$;

-- Function to get agents with listing counts
CREATE OR REPLACE FUNCTION public.get_admin_agents()
RETURNS TABLE (
  user_id uuid,
  full_name text,
  email text,
  phone text,
  active_listings bigint,
  total_listings bigint,
  created_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if user is admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  RETURN QUERY
  SELECT 
    p.id AS user_id,
    p.full_name,
    p.email,
    p.phone,
    COUNT(CASE WHEN props.status = 'active' THEN 1 END) AS active_listings,
    COUNT(props.id) AS total_listings,
    p.created_at
  FROM profiles p
  INNER JOIN user_roles ur ON ur.user_id = p.id
  LEFT JOIN properties props ON props.owner_id = p.id
  WHERE ur.role = 'seller'
  GROUP BY p.id, p.full_name, p.email, p.phone, p.created_at
  ORDER BY active_listings DESC, p.full_name;
END;
$$;