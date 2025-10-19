-- Add offer price validation constraint
ALTER TABLE public.offers 
ADD CONSTRAINT reasonable_offer_price 
CHECK (offer_price > 0 AND offer_price < 1000000000);

-- Add message length constraint
ALTER TABLE public.messages
ADD CONSTRAINT message_length_limit
CHECK (length(message) > 0 AND length(message) <= 5000);