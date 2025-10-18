-- ============================================
-- FIX CRITICAL SECURITY ISSUE: PROFILES TABLE
-- ============================================

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Users can view profiles of property owners for properties they're viewing/offering on
CREATE POLICY "Users can view property owner profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  -- Allow viewing profile if user owns a property
  id IN (
    SELECT owner_id FROM properties WHERE status = 'active'
  )
  -- Or if viewing a profile related to an offer they made/received
  OR id IN (
    SELECT p.owner_id FROM properties p
    INNER JOIN offers o ON o.property_id = p.id
    WHERE o.buyer_id = auth.uid()
  )
  -- Or if they received an offer on their property
  OR id IN (
    SELECT o.buyer_id FROM offers o
    INNER JOIN properties p ON p.id = o.property_id
    WHERE p.owner_id = auth.uid()
  )
  -- Or if admin
  OR public.has_role(auth.uid(), 'admin')
);

-- ============================================
-- IMPROVE MESSAGES SECURITY
-- ============================================

DROP POLICY IF EXISTS "Users can view their messages" ON public.messages;

-- Strengthen messages policy to verify property relationship
CREATE POLICY "Users can view their messages"
ON public.messages
FOR SELECT
TO authenticated
USING (
  (auth.uid() = sender_id OR auth.uid() = receiver_id)
  AND (
    -- If property_id is null, allow (direct messages)
    property_id IS NULL
    -- Or verify user has relationship to the property
    OR property_id IN (
      -- User owns the property
      SELECT id FROM properties WHERE owner_id = auth.uid()
      UNION
      -- User made an offer on the property
      SELECT property_id FROM offers WHERE buyer_id = auth.uid()
    )
    -- Or admin
    OR public.has_role(auth.uid(), 'admin')
  )
);