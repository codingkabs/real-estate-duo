import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function usePropertyImages() {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const uploadImage = async (file: File, userId: string): Promise<string | null> => {
    try {
      setIsUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('property-images')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message,
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadMultipleImages = async (files: File[], userId: string): Promise<string[]> => {
    const uploadPromises = files.map(file => uploadImage(file, userId));
    const results = await Promise.all(uploadPromises);
    return results.filter((url): url is string => url !== null);
  };

  const deleteImage = async (imageUrl: string) => {
    try {
      const urlParts = imageUrl.split('/property-images/');
      if (urlParts.length < 2) throw new Error("Invalid image URL");
      
      const filePath = urlParts[1];

      const { error } = await supabase.storage
        .from('property-images')
        .remove([filePath]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error deleting image",
        description: error.message,
      });
      return { error };
    }
  };

  return { uploadImage, uploadMultipleImages, deleteImage, isUploading };
}
