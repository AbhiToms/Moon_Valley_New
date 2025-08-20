import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Room } from "@shared/schema";

const bookingSchema = z.object({
  roomType: z.string().min(1, "Please select a room type"),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  guests: z.number().min(1, "Number of guests is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  specialRequests: z.string().optional(),
  terms: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: rooms } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      roomType: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
      terms: false,
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const bookingData = {
        ...data,
        checkIn: new Date(data.checkIn),
        checkOut: new Date(data.checkOut),
      };
      return apiRequest("POST", "/api/bookings", bookingData);
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed!",
        description: "Your reservation has been successfully submitted. We'll contact you shortly.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your reservation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookingFormData) => {
    bookingMutation.mutate(data);
  };

  return (
    <section id="booking" className="py-24 bg-gradient-to-br from-surface to-neutral dark:from-bg-primary dark:to-bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block bg-secondary/10 dark:bg-secondary/20 rounded-full px-6 py-2 mb-6">
            <span className="text-secondary font-semibold text-sm">RESERVATIONS</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-poppins font-bold text-primary dark:text-text-primary mb-6">
            Reserve Your <span className="text-secondary">Stay</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Book your perfect mountain retreat and experience the tranquility of nature at its finest. Secure your tropical hut experience today.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white dark:bg-bg-secondary border-0 shadow-2xl dark:shadow-xl rounded-3xl">
            <CardContent className="p-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="checkIn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary dark:text-text-primary font-semibold">Check-in Date</FormLabel>
                          <FormControl>
                            <Input 
                              type="date" 
                              {...field}
                              className="bg-surface dark:bg-bg-primary text-gray-800 dark:text-text-primary border-neutral dark:border-mist focus:border-tropical focus:ring-tropical dark:focus:border-tropical dark:focus:ring-tropical rounded-xl"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="checkOut"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary dark:text-text-primary font-semibold">Check-out Date</FormLabel>
                          <FormControl>
                            <Input 
                              type="date" 
                              {...field}
                              className="bg-surface dark:bg-bg-primary text-gray-800 dark:text-text-primary border-neutral dark:border-mist focus:border-tropical focus:ring-tropical dark:focus:border-tropical dark:focus:ring-tropical rounded-xl"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="roomType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary dark:text-text-primary font-semibold">Room Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-surface dark:bg-bg-primary text-gray-800 dark:text-text-primary border-neutral dark:border-mist focus:border-tropical focus:ring-tropical dark:focus:border-tropical dark:focus:ring-tropical rounded-xl">
                                <SelectValue placeholder="Select a room" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {rooms?.map((room) => (
                                <SelectItem key={room.id} value={room.name}>
                                  {room.name} - ₹{room.price.toLocaleString()}/night
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary dark:text-text-primary font-semibold">Number of Guests</FormLabel>
                          <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                            <FormControl>
                              <SelectTrigger className="bg-surface dark:bg-bg-primary text-gray-800 dark:text-text-primary border-neutral dark:border-mist focus:border-tropical focus:ring-tropical dark:focus:border-tropical dark:focus:ring-tropical rounded-xl">
                                <SelectValue placeholder="Select guests" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1 Guest</SelectItem>
                              <SelectItem value="2">2 Guests</SelectItem>
                              <SelectItem value="3">3 Guests</SelectItem>
                              <SelectItem value="4">4 Guests</SelectItem>
                              <SelectItem value="5">5+ Guests</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary dark:text-text-primary font-semibold">Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              className="bg-surface dark:bg-bg-primary text-gray-800 dark:text-text-primary border-neutral dark:border-mist focus:border-tropical focus:ring-tropical dark:focus:border-tropical dark:focus:ring-tropical rounded-xl"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary dark:text-text-primary font-semibold">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              {...field}
                              className="bg-surface dark:bg-bg-primary text-gray-800 dark:text-text-primary border-neutral dark:border-mist focus:border-tropical focus:ring-tropical dark:focus:border-tropical dark:focus:ring-tropical rounded-xl"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary dark:text-text-primary font-semibold">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            {...field}
                            className="bg-surface dark:bg-bg-primary text-gray-800 dark:text-text-primary border-neutral dark:border-mist focus:border-tropical focus:ring-tropical dark:focus:border-tropical dark:focus:ring-tropical rounded-xl"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary dark:text-text-primary font-semibold">Special Requests</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field}
                            placeholder="Any special requirements or requests..."
                            className="bg-surface dark:bg-bg-primary text-gray-800 dark:text-text-primary border-neutral dark:border-mist focus:border-tropical focus:ring-tropical dark:focus:border-tropical dark:focus:ring-tropical rounded-xl"
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-primary dark:border-text-primary data-[state=checked]:bg-tropical data-[state=checked]:border-tropical"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-primary dark:text-text-primary text-sm">
                            I agree to the{" "}
                            <span className="text-secondary hover:underline cursor-pointer">Terms & Conditions</span>
                            {" "}and{" "}
                            <span className="text-secondary hover:underline cursor-pointer">Privacy Policy</span>
                          </FormLabel>
                          <FormMessage className="text-red-500" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="text-center pt-4">
                    <Button 
                      type="submit" 
                      disabled={bookingMutation.isPending}
                      className="bg-gradient-to-r from-secondary to-tropical text-white px-16 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                      {bookingMutation.isPending ? "Processing..." : "Reserve Now"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
