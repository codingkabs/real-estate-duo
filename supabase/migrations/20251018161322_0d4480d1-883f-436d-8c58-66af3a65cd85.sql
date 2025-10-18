-- Create function to update property status when offer is accepted
CREATE OR REPLACE FUNCTION public.handle_offer_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- If offer status changed to 'accepted'
  IF NEW.status = 'accepted' AND OLD.status != 'accepted' THEN
    -- Update property status to 'pending'
    UPDATE public.properties
    SET status = 'pending'
    WHERE id = NEW.property_id;
    
    -- Reject all other pending offers for this property
    UPDATE public.offers
    SET status = 'rejected'
    WHERE property_id = NEW.property_id 
      AND id != NEW.id 
      AND status = 'pending';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for offer status changes
CREATE TRIGGER on_offer_status_change
  AFTER UPDATE OF status ON public.offers
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_offer_status_change();

-- Update RLS policy for offers to allow property owners to update offer status
DROP POLICY IF EXISTS "Buyers can update own offers" ON public.offers;

CREATE POLICY "Buyers and property owners can update offers"
  ON public.offers FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = buyer_id OR 
    auth.uid() IN (SELECT owner_id FROM public.properties WHERE id = offers.property_id)
  );