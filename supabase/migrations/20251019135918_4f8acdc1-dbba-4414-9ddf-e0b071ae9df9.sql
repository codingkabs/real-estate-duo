-- Fix 1: Add message immutability policies
CREATE POLICY "Messages are immutable"
ON public.messages
FOR UPDATE
USING (false);

CREATE POLICY "Messages cannot be deleted"
ON public.messages
FOR DELETE
USING (false);

-- Fix 2: Add offer deletion protection (admin-only)
CREATE POLICY "Only admins can delete offers"
ON public.offers
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Fix 3: Fix handle_updated_at() function with proper security
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;