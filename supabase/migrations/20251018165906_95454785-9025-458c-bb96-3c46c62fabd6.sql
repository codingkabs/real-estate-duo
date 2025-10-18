-- ============================================
-- CREATE SECURE PUBLIC PROFILE VIEW
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view property owner profiles" ON public.profiles;

-- Users can ALWAYS view their own complete profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Users can view LIMITED profile info for property owners (only name, no contact info)
-- This requires creating a separate view or handling in application layer
-- For now, restrict to business relationships only

CREATE POLICY "Users can view profiles with business relationship"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  -- Can view if user has an active offer on a property owned by this profile
  id IN (
    SELECT p.owner_id FROM properties p
    INNER JOIN offers o ON o.property_id = p.id
    WHERE o.buyer_id = auth.uid()
  )
  -- Can view if this user made an offer on your property
  OR id IN (
    SELECT o.buyer_id FROM offers o
    INNER JOIN properties p ON p.id = o.property_id
    WHERE p.owner_id = auth.uid()
  )
  -- Can view if user sent or received a message with this profile
  OR id IN (
    SELECT sender_id FROM messages WHERE receiver_id = auth.uid()
    UNION
    SELECT receiver_id FROM messages WHERE sender_id = auth.uid()
  )
  -- Or if admin
  OR public.has_role(auth.uid(), 'admin')
);

-- ============================================
-- SIMPLIFY MESSAGES POLICY
-- ============================================

DROP POLICY IF EXISTS "Users can view their messages" ON public.messages;

-- Simple and secure: only sender or receiver can view
CREATE POLICY "Users can view their messages"
ON public.messages
FOR SELECT
TO authenticated
USING (
  auth.uid() = sender_id 
  OR auth.uid() = receiver_id
  OR public.has_role(auth.uid(), 'admin')
);

-- ============================================
-- ADD PROFILE DELETION POLICY
-- ============================================

-- Users can delete their own profile (or admin)
CREATE POLICY "Users can delete own profile"
ON public.profiles
FOR DELETE
TO authenticated
USING (
  auth.uid() = id
  OR public.has_role(auth.uid(), 'admin')
);