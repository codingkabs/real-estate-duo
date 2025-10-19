import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePropertyMutations } from "@/hooks/useProperties";
import { usePropertyImages } from "@/hooks/usePropertyImages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

const propertySchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters").max(200),
  description: z.string().trim().max(2000).optional(),
  address: z.string().trim().min(10, "Address must be at least 10 characters").max(500),
  price: z.number().positive("Price must be positive"),
  bedrooms: z.number().int().min(0).max(50),
  bathrooms: z.number().int().min(0).max(50),
  area: z.number().positive("Area must be positive"),
});

type PropertyFormData = z.infer<typeof propertySchema>;

export default function CreateProperty() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createProperty } = usePropertyMutations();
  const { uploadMultipleImages, isUploading } = usePropertyImages();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      address: "",
      price: 0,
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const generateDescription = async () => {
    const values = form.getValues();
    
    // Validate required fields for description generation
    if (!values.title || !values.address || !values.price || !values.bedrooms || !values.bathrooms || !values.area) {
      toast({
        title: "Missing Information",
        description: "Please fill in all property details before generating a description.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-property-description', {
        body: {
          title: values.title,
          address: values.address,
          price: values.price,
          bedrooms: values.bedrooms,
          bathrooms: values.bathrooms,
          area: values.area,
        }
      });

      if (error) throw error;

      if (data?.description) {
        form.setValue('description', data.description);
        toast({
          title: "Description Generated",
          description: "AI has created a property description for you!",
        });
      }
    } catch (error) {
      console.error("Error generating description:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data: PropertyFormData) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    setIsSubmitting(true);
    try {
      // Upload images first
      let imageUrls: string[] = [];
      if (selectedFiles.length > 0) {
        imageUrls = await uploadMultipleImages(selectedFiles, user.id);
      }

      // Create property
      const { data: property } = await createProperty({
        title: data.title,
        description: data.description || null,
        address: data.address,
        price: data.price,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area: data.area,
        images: imageUrls.length > 0 ? imageUrls : null,
        status: "active",
      });

      if (property) {
        navigate(`/property/${property.id}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>Please sign in to create a property listing</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/auth")}>Sign In</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Create Property Listing</CardTitle>
            <CardDescription>List your property for sale</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Beautiful family home" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Description</FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={generateDescription}
                          disabled={isGenerating}
                          className="gap-2"
                        >
                          <Sparkles className="h-4 w-4" />
                          {isGenerating ? "Generating..." : "AI Generate"}
                        </Button>
                      </div>
                      <FormControl>
                        <Textarea placeholder="Describe your property..." rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, City, State, ZIP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="250000" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area (sq ft)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="2000" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="3" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bathrooms</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="2" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="images">Property Images</Label>
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="mt-2"
                  />
                  {selectedFiles.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {selectedFiles.length} file(s) selected
                    </p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting || isUploading}
                >
                  {isSubmitting || isUploading ? "Creating..." : "Create Listing"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
