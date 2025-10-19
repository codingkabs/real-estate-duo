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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

const propertySchema = z.object({
  // Basic Information (Required)
  title: z.string().trim().min(5, "Title must be at least 5 characters").max(200),
  description: z.string().trim().max(2000).optional(),
  address: z.string().trim().min(10, "Address must be at least 10 characters").max(500),
  price: z.number().positive("Price must be positive"),
  bedrooms: z.number().int().min(0).max(50),
  bathrooms: z.number().int().min(0).max(50),
  area: z.number().positive("Area must be positive"),
  
  // Detailed Bathrooms (Optional)
  full_bathrooms: z.number().int().min(0).optional(),
  half_bathrooms: z.number().int().min(0).optional(),
  
  // Rooms (Optional)
  room_types: z.string().optional(),
  
  // Primary Bedroom (Optional)
  primary_bedroom_features: z.string().optional(),
  primary_bedroom_level: z.string().optional(),
  
  // Primary Bathroom (Optional)
  primary_bathroom_features: z.string().optional(),
  
  // Dining & Kitchen (Optional)
  dining_room_features: z.string().optional(),
  kitchen_features: z.string().optional(),
  
  // Heating & Cooling (Optional)
  heating_types: z.string().optional(),
  cooling_types: z.string().optional(),
  
  // Appliances (Optional)
  appliances_included: z.string().optional(),
  laundry_features: z.string().optional(),
  
  // Interior Features (Optional)
  interior_features: z.string().optional(),
  flooring_types: z.string().optional(),
  window_features: z.string().optional(),
  basement_features: z.string().optional(),
  attic_features: z.string().optional(),
  fireplace_count: z.number().int().min(0).optional(),
  fireplace_features: z.string().optional(),
  common_walls: z.boolean().optional(),
  
  // Interior Area (Optional)
  total_structure_area: z.number().int().min(0).optional(),
  finished_area_above_ground: z.number().int().min(0).optional(),
  finished_area_below_ground: z.number().int().min(0).optional(),
  
  // Virtual Tours (Optional)
  virtual_tour_url: z.string().url().optional().or(z.literal('')),
  virtual_tour_url_2: z.string().url().optional().or(z.literal('')),
  
  // Parking (Optional)
  total_parking_spaces: z.number().int().min(0).optional(),
  parking_features: z.string().optional(),
  attached_garage_spaces: z.number().int().min(0).optional(),
  has_uncovered_spaces: z.boolean().optional(),
  
  // Accessibility (Optional)
  accessibility_features: z.string().optional(),
  
  // Property Features (Optional)
  property_levels: z.string().optional(),
  stories: z.number().int().min(0).optional(),
  patio_porch_features: z.string().optional(),
  exterior_features: z.string().optional(),
  pool_features: z.string().optional(),
  spa_features: z.string().optional(),
  fencing_features: z.string().optional(),
  has_view: z.boolean().optional(),
  view_description: z.string().optional(),
  waterfront_features: z.string().optional(),
  
  // Lot (Optional)
  lot_size_acres: z.number().min(0).optional(),
  lot_dimensions: z.string().optional(),
  lot_features: z.string().optional(),
  
  // Additional Details (Optional)
  additional_structures: z.string().optional(),
  parcel_number: z.string().optional(),
  horse_amenities: z.string().optional(),
  
  // Construction (Optional)
  home_type: z.string().optional(),
  architectural_style: z.string().optional(),
  property_subtype: z.string().optional(),
  exterior_materials: z.string().optional(),
  foundation_type: z.string().optional(),
  roof_type: z.string().optional(),
  
  // Condition (Optional)
  is_new_construction: z.boolean().optional(),
  year_built: z.number().int().min(1800).max(new Date().getFullYear() + 2).optional(),
  
  // Utilities (Optional)
  electric_details: z.string().optional(),
  sewer_type: z.string().optional(),
  water_source: z.string().optional(),
  utilities_available: z.string().optional(),
  energy_efficient_items: z.string().optional(),
  energy_generation: z.string().optional(),
  
  // Community & HOA (Optional)
  community_features: z.string().optional(),
  security_features: z.string().optional(),
  subdivision_name: z.string().optional(),
  has_hoa: z.boolean().optional(),
  hoa_services: z.string().optional(),
  hoa_fee_amount: z.number().min(0).optional(),
  hoa_fee_frequency: z.string().optional(),
  hoa_phone: z.string().optional(),
  
  // Financial (Optional)
  tax_assessed_value: z.number().min(0).optional(),
  annual_tax_amount: z.number().min(0).optional(),
  ownership_type: z.string().optional(),
  road_surface_type: z.string().optional(),
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

      // Helper function to convert comma-separated strings to arrays
      const toArray = (str?: string) => str ? str.split(',').map(s => s.trim()).filter(Boolean) : null;

      // Create property with all fields
      const { data: property } = await createProperty({
        // Basic fields
        title: data.title,
        description: data.description || null,
        address: data.address,
        price: data.price,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area: data.area,
        images: imageUrls.length > 0 ? imageUrls : null,
        status: "active",
        
        // Additional detailed fields
        full_bathrooms: data.full_bathrooms || null,
        half_bathrooms: data.half_bathrooms || null,
        room_types: toArray(data.room_types),
        primary_bedroom_features: toArray(data.primary_bedroom_features),
        primary_bedroom_level: data.primary_bedroom_level || null,
        primary_bathroom_features: toArray(data.primary_bathroom_features),
        dining_room_features: toArray(data.dining_room_features),
        kitchen_features: toArray(data.kitchen_features),
        heating_types: toArray(data.heating_types),
        cooling_types: toArray(data.cooling_types),
        appliances_included: toArray(data.appliances_included),
        laundry_features: toArray(data.laundry_features),
        interior_features: toArray(data.interior_features),
        flooring_types: toArray(data.flooring_types),
        window_features: toArray(data.window_features),
        basement_features: toArray(data.basement_features),
        attic_features: data.attic_features || null,
        fireplace_count: data.fireplace_count || 0,
        fireplace_features: toArray(data.fireplace_features),
        common_walls: data.common_walls || false,
        total_structure_area: data.total_structure_area || null,
        finished_area_above_ground: data.finished_area_above_ground || null,
        finished_area_below_ground: data.finished_area_below_ground || null,
        virtual_tour_url: data.virtual_tour_url || null,
        virtual_tour_url_2: data.virtual_tour_url_2 || null,
        total_parking_spaces: data.total_parking_spaces || null,
        parking_features: toArray(data.parking_features),
        attached_garage_spaces: data.attached_garage_spaces || null,
        has_uncovered_spaces: data.has_uncovered_spaces || false,
        accessibility_features: toArray(data.accessibility_features),
        property_levels: data.property_levels || null,
        stories: data.stories || null,
        patio_porch_features: toArray(data.patio_porch_features),
        exterior_features: toArray(data.exterior_features),
        pool_features: toArray(data.pool_features),
        spa_features: toArray(data.spa_features),
        fencing_features: toArray(data.fencing_features),
        has_view: data.has_view || false,
        view_description: data.view_description || null,
        waterfront_features: toArray(data.waterfront_features),
        lot_size_acres: data.lot_size_acres || null,
        lot_dimensions: data.lot_dimensions || null,
        lot_features: toArray(data.lot_features),
        additional_structures: toArray(data.additional_structures),
        parcel_number: data.parcel_number || null,
        horse_amenities: toArray(data.horse_amenities),
        home_type: data.home_type || 'SingleFamily',
        architectural_style: data.architectural_style || null,
        property_subtype: data.property_subtype || null,
        exterior_materials: toArray(data.exterior_materials),
        foundation_type: data.foundation_type || null,
        roof_type: data.roof_type || null,
        is_new_construction: data.is_new_construction || false,
        year_built: data.year_built || null,
        electric_details: data.electric_details || null,
        sewer_type: data.sewer_type || null,
        water_source: data.water_source || null,
        utilities_available: toArray(data.utilities_available),
        energy_efficient_items: toArray(data.energy_efficient_items),
        energy_generation: toArray(data.energy_generation),
        community_features: toArray(data.community_features),
        security_features: toArray(data.security_features),
        subdivision_name: data.subdivision_name || null,
        has_hoa: data.has_hoa || false,
        hoa_services: toArray(data.hoa_services),
        hoa_fee_amount: data.hoa_fee_amount || null,
        hoa_fee_frequency: data.hoa_fee_frequency || null,
        hoa_phone: data.hoa_phone || null,
        tax_assessed_value: data.tax_assessed_value || null,
        annual_tax_amount: data.annual_tax_amount || null,
        ownership_type: data.ownership_type || null,
        road_surface_type: data.road_surface_type || null,
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

                {/* Additional Property Details in Accordion */}
                <Accordion type="multiple" className="w-full">
                  {/* Bathroom Details */}
                  <AccordionItem value="bathrooms">
                    <AccordionTrigger>Bathroom Details</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="full_bathrooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Bathrooms</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="2" 
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="half_bathrooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Half Bathrooms</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="1" 
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Rooms & Features */}
                  <AccordionItem value="rooms">
                    <AccordionTrigger>Rooms & Features</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="room_types"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Room Types (comma-separated)</FormLabel>
                              <FormControl>
                                <Input placeholder="Family Room, Laundry, Office" {...field} />
                              </FormControl>
                              <FormDescription>Separate multiple values with commas</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="primary_bedroom_features"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Primary Bedroom Features (comma-separated)</FormLabel>
                              <FormControl>
                                <Input placeholder="Walk-In Closet, En-Suite" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="primary_bathroom_features"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Primary Bathroom Features (comma-separated)</FormLabel>
                              <FormControl>
                                <Input placeholder="Separate His/Hers, Separate Tub/Shower" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="dining_room_features"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Dining Room Features (comma-separated)</FormLabel>
                              <FormControl>
                                <Input placeholder="Separate Dining Room" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="kitchen_features"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kitchen Features (comma-separated)</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Eat-in Kitchen, Pantry Walk-In, Granite Counters" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Heating, Cooling & Appliances */}
                  <AccordionItem value="hvac">
                    <AccordionTrigger>Heating, Cooling & Appliances</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="heating_types"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Heating Types (comma-separated)</FormLabel>
                              <FormControl>
                                <Input placeholder="Central, Forced Air, Natural Gas" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cooling_types"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cooling Types (comma-separated)</FormLabel>
                              <FormControl>
                                <Input placeholder="Central Air, Zoned" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="appliances_included"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Appliances Included (comma-separated)</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Dishwasher, Dryer, Electric Cooktop, Refrigerator" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="laundry_features"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Laundry Features (comma-separated)</FormLabel>
                              <FormControl>
                                <Input placeholder="Laundry Room, Main Level" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Interior Features */}
                  <AccordionItem value="interior">
                    <AccordionTrigger>Interior Features</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="interior_features"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Interior Features (comma-separated)</FormLabel>
                              <FormControl>
                                <Textarea placeholder="High Ceilings, Walk-In Closets, Crown Molding" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="flooring_types"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Flooring Types (comma-separated)</FormLabel>
                              <FormControl>
                                <Input placeholder="Hardwood, Carpet, Tile" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="basement_features"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Basement Features (comma-separated)</FormLabel>
                              <FormControl>
                                <Input placeholder="Full, Finished, Walk-Out" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="fireplace_count"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Fireplaces</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="1" 
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="fireplace_features"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Fireplace Features</FormLabel>
                                <FormControl>
                                  <Input placeholder="Gas Log, Wood Burning" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="common_walls"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value || false} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Has Common Walls</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Property Exterior & Parking */}
                  <AccordionItem value="exterior">
                    <AccordionTrigger>Property Exterior & Parking</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="stories"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Stories</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="2" 
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="total_parking_spaces"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Total Parking Spaces</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="2" 
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="parking_features"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Parking Features (comma-separated)</FormLabel>
                              <FormControl>
                                <Input placeholder="Attached Garage, Driveway, Garage Door Opener" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="exterior_features"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Exterior Features (comma-separated)</FormLabel>
                              <FormControl>
                                <Input placeholder="Deck, Patio, Private Yard" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="fencing_features"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fencing Features (comma-separated)</FormLabel>
                              <FormControl>
                                <Input placeholder="Back Yard, Fenced" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="has_view"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value || false} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Has View</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="view_description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>View Description</FormLabel>
                              <FormControl>
                                <Input placeholder="Trees/Woods, Mountain" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Lot & Land */}
                  <AccordionItem value="lot">
                    <AccordionTrigger>Lot & Land</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="lot_size_acres"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Lot Size (Acres)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    step="0.01"
                                    placeholder="1.00" 
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lot_dimensions"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Lot Dimensions</FormLabel>
                                <FormControl>
                                  <Input placeholder="99x510x79x436" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="lot_features"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Lot Features (comma-separated)</FormLabel>
                              <FormControl>
                                <Input placeholder="Landscaped, Wooded, Level" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="parcel_number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Parcel Number</FormLabel>
                              <FormControl>
                                <Input placeholder="R6014 126" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Construction & Condition */}
                  <AccordionItem value="construction">
                    <AccordionTrigger>Construction & Condition</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="year_built"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Year Built</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="1992" 
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="home_type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Home Type</FormLabel>
                              <FormControl>
                                <Input placeholder="SingleFamily" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="architectural_style"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Architectural Style</FormLabel>
                              <FormControl>
                                <Input placeholder="Traditional, Contemporary" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="exterior_materials"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Exterior Materials (comma-separated)</FormLabel>
                              <FormControl>
                                <Input placeholder="Brick, Vinyl Siding" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="roof_type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Roof Type</FormLabel>
                              <FormControl>
                                <Input placeholder="Composition, Shingle" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="is_new_construction"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value || false} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>New Construction</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Utilities */}
                  <AccordionItem value="utilities">
                    <AccordionTrigger>Utilities & Energy</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="water_source"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Water Source</FormLabel>
                              <FormControl>
                                <Input placeholder="Public, Well" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="sewer_type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sewer Type</FormLabel>
                              <FormControl>
                                <Input placeholder="Septic Tank, Public Sewer" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="utilities_available"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Utilities Available (comma-separated)</FormLabel>
                              <FormControl>
                                <Input placeholder="Cable, Underground Utilities" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="energy_efficient_items"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Energy Efficient Items (comma-separated)</FormLabel>
                              <FormControl>
                                <Input placeholder="Solar Panels, LED Lighting" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Community & HOA */}
                  <AccordionItem value="community">
                    <AccordionTrigger>Community & HOA</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="subdivision_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subdivision Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Grahams Port" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="community_features"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Community Features (comma-separated)</FormLabel>
                              <FormControl>
                                <Input placeholder="Pool, Clubhouse, Tennis" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="has_hoa"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value || false} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Has HOA</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="hoa_fee_amount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>HOA Fee Amount ($)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="420" 
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="hoa_fee_frequency"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>HOA Fee Frequency</FormLabel>
                                <FormControl>
                                  <Input placeholder="Monthly, Annually" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="hoa_phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>HOA Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="256-468-6640" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Financial Details */}
                  <AccordionItem value="financial">
                    <AccordionTrigger>Financial Details</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="tax_assessed_value"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tax Assessed Value ($)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="442400" 
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="annual_tax_amount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Annual Tax Amount ($)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="6637" 
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="ownership_type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ownership Type</FormLabel>
                              <FormControl>
                                <Input placeholder="Fee Simple" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Virtual Tours */}
                  <AccordionItem value="virtual">
                    <AccordionTrigger>Virtual Tours</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="virtual_tour_url"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Virtual Tour URL</FormLabel>
                              <FormControl>
                                <Input type="url" placeholder="https://tour.example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="virtual_tour_url_2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>2nd Virtual Tour URL</FormLabel>
                              <FormControl>
                                <Input type="url" placeholder="https://tour2.example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

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
