-- Ensure RLS is enabled on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES TABLE POLICIES
-- ============================================

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Users can view all profiles (needed for property listings to show owner info)
CREATE POLICY "Users can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Users can update their own profile OR admins can update any profile
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (
  auth.uid() = id 
  OR public.has_role(auth.uid(), 'admin')
);

-- ============================================
-- PROPERTIES TABLE POLICIES
-- ============================================

DROP POLICY IF EXISTS "Anyone can view active properties" ON public.properties;
DROP POLICY IF EXISTS "Owners can insert properties" ON public.properties;
DROP POLICY IF EXISTS "Owners can update own properties" ON public.properties;
DROP POLICY IF EXISTS "Owners can delete own properties" ON public.properties;

-- Anyone can view active properties, owners can view their own
CREATE POLICY "Anyone can view active properties"
ON public.properties
FOR SELECT
TO authenticated
USING (
  status = 'active' 
  OR owner_id = auth.uid()
  OR public.has_role(auth.uid(), 'admin')
);

-- Sellers can insert properties
CREATE POLICY "Owners can insert properties"
ON public.properties
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = owner_id
  AND (
    public.has_role(auth.uid(), 'seller')
    OR public.has_role(auth.uid(), 'admin')
  )
);

-- Only owner or admin can update properties
CREATE POLICY "Owners can update own properties"
ON public.properties
FOR UPDATE
TO authenticated
USING (
  auth.uid() = owner_id
  OR public.has_role(auth.uid(), 'admin')
);

-- Only owner or admin can delete properties
CREATE POLICY "Owners can delete own properties"
ON public.properties
FOR DELETE
TO authenticated
USING (
  auth.uid() = owner_id
  OR public.has_role(auth.uid(), 'admin')
);

-- ============================================
-- OFFERS TABLE POLICIES
-- ============================================

DROP POLICY IF EXISTS "Property owners and offer creators can view offers" ON public.offers;
DROP POLICY IF EXISTS "Buyers can create offers" ON public.offers;
DROP POLICY IF EXISTS "Buyers and property owners can update offers" ON public.offers;

-- Only buyer, property owner, or admin can view offers
CREATE POLICY "Property owners and offer creators can view offers"
ON public.offers
FOR SELECT
TO authenticated
USING (
  auth.uid() = buyer_id
  OR auth.uid() IN (
    SELECT owner_id FROM properties WHERE id = offers.property_id
  )
  OR public.has_role(auth.uid(), 'admin')
);

-- Buyers can create offers for their own account
CREATE POLICY "Buyers can create offers"
ON public.offers
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = buyer_id
  AND (
    public.has_role(auth.uid(), 'buyer')
    OR public.has_role(auth.uid(), 'admin')
  )
);

-- Buyers can update their own offers, property owners can update offers on their properties
CREATE POLICY "Buyers and property owners can update offers"
ON public.offers
FOR UPDATE
TO authenticated
USING (
  auth.uid() = buyer_id
  OR auth.uid() IN (
    SELECT owner_id FROM properties WHERE id = offers.property_id
  )
  OR public.has_role(auth.uid(), 'admin')
);

-- ============================================
-- MESSAGES TABLE POLICIES
-- ============================================

DROP POLICY IF EXISTS "Users can view their messages" ON public.messages;
DROP POLICY IF EXISTS "Users can send messages" ON public.messages;

-- Only sender, receiver, or admin can view messages
CREATE POLICY "Users can view their messages"
ON public.messages
FOR SELECT
TO authenticated
USING (
  auth.uid() = sender_id
  OR auth.uid() = receiver_id
  OR public.has_role(auth.uid(), 'admin')
);

-- Users can send messages as themselves
CREATE POLICY "Users can send messages"
ON public.messages
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = sender_id
);

-- ============================================
-- PROPERTY_VIEWS TABLE POLICIES
-- ============================================

DROP POLICY IF EXISTS "Users can insert own views" ON public.property_views;
DROP POLICY IF EXISTS "Users can view own views" ON public.property_views;

-- Users can track their own property views
CREATE POLICY "Users can insert own views"
ON public.property_views
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can view their own viewing history, admins can view all
CREATE POLICY "Users can view own views"
ON public.property_views
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id
  OR public.has_role(auth.uid(), 'admin')
);