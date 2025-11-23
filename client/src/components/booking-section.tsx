
import { useState, useEffect } from "react";
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
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Room } from "@shared/schema";
import { Lock, Calendar, Users, Mail, Phone, Shield, MapPin, Star, Clock } from "lucide-react";

const bookingSchema = z.object({
  roomType: z.string().min(1, "Please select a room type"),
  checkIn: z.string()
    .min(1, "Check-in date is required")
    .refine((date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const checkInDate = new Date(date);
      return checkInDate >= today;
    }, "Check-in date cannot be in the past"),
  checkOut: z.string()
    .min(1, "Check-out date is required")
    .refine((date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const checkOutDate = new Date(date);
      return checkOutDate >= today;
    }, "Check-out date cannot be in the past"),
  guests: z.number().min(1, "Number of guests is required").max(6, "Maximum 6 guests allowed"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  terms: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
}).refine((data) => {
  const checkIn = new Date(data.checkIn);
  const checkOut = new Date(data.checkOut);
  return checkOut > checkIn;
}, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"],
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      address: "",
      terms: false,
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      // Calculate total amount
      const selectedRoom = rooms?.find(r => r.name === data.roomType);
      const checkIn = new Date(data.checkIn);
      const checkOut = new Date(data.checkOut);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      const totalAmount = selectedRoom ? selectedRoom.price * Math.max(1, nights) : 0;

      const bookingData = {
        ...data,
        checkIn: new Date(data.checkIn),
        checkOut: new Date(data.checkOut),
        totalAmount,
      };
      return apiRequest("POST", "/api/bookings", bookingData);
    },
    onSuccess: async (response: Response) => {
      const createdBooking = await response.json();

      const bookingDetails = {
        id: createdBooking.id,
        name: createdBooking.name,
        email: createdBooking.email,
        phone: createdBooking.phone,
        address: createdBooking.address,
        roomType: createdBooking.roomType,
        checkIn: createdBooking.checkIn,
        checkOut: createdBooking.checkOut,
        guests: createdBooking.guests,
        totalAmount: createdBooking.totalAmount,
        specialRequests: createdBooking.specialRequests,
        createdAt: createdBooking.createdAt,
      };
      sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

      toast({
        title: "Success!",
        description: "Your reservation has been submitted. Check your email for confirmation.",
      });

      form.reset();
      setIsSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your reservation. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: BookingFormData) => {
    setIsSubmitting(true);
    bookingMutation.mutate(data);
  };

  return (
    <section id="booking" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-surface to-neutral dark:from-bg-primary dark:to-bg-secondary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 lg:mb-20">
          <div className="inline-block bg-secondary/10 dark:bg-secondary/20 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
            <span className="text-secondary font-semibold text-xs sm:text-sm">RESERVATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-primary dark:text-text-primary mb-4 sm:mb-6">
            Reserve Your <span className="text-secondary">Stay</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
            Book your perfect mountain retreat and experience the tranquility of nature at its finest. Secure your tropical hut experience today.
          </p>
        </div>

        <div className="max-w-2xl mx-auto px-2 sm:px-0">
          <Card className="bg-white dark:bg-bg-secondary border-0 shadow-2xl dark:shadow-xl rounded-2xl sm:rounded-3xl">
            <CardContent className="p-6 sm:p-8 lg:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                  {/* Room Selection */}
                  <FormField
                    control={form.control}
                    name="roomType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-primary dark:text-text-primary flex items-center">
                          <Shield size={16} className="mr-2 text-tropical" />
                          Select Room Type
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-primary/20 dark:border-tropical/30 rounded-lg focus:border-primary dark:focus:border-tropical focus:ring-2 focus:ring-primary/20 dark:focus:ring-tropical/20">
                              <SelectValue placeholder="Choose a room..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-lg">
                            {rooms?.map((room) => (
                              <SelectItem key={room.id} value={room.name}>
                                {room.name} - Rs. {room.price.toLocaleString()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Check-in and Check-out Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="checkIn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-primary dark:text-text-primary flex items-center">
                            <Calendar size={16} className="mr-2 text-tropical" />
                            Check-in Date
                          </FormLabel>
                          <FormControl>
                            <DatePicker
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Select date"
                              className="border-primary/20 dark:border-tropical/30 rounded-lg focus:border-primary dark:focus:border-tropical focus:ring-2 focus:ring-primary/20 dark:focus:ring-tropical/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="checkOut"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-primary dark:text-text-primary flex items-center">
                            <Calendar size={16} className="mr-2 text-tropical" />
                            Check-out Date
                          </FormLabel>
                          <FormControl>
                            <DatePicker
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Select date"
                              className="border-primary/20 dark:border-tropical/30 rounded-lg focus:border-primary dark:focus:border-tropical focus:ring-2 focus:ring-primary/20 dark:focus:ring-tropical/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Guests */}
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-primary dark:text-text-primary flex items-center">
                          <Users size={16} className="mr-2 text-tropical" />
                          Number of Guests
                        </FormLabel>
                        <Select onValueChange={(v) => field.onChange(parseInt(v))} defaultValue={field.value?.toString()}>
                          <FormControl>
                            <SelectTrigger className="border-primary/20 dark:border-tropical/30 rounded-lg focus:border-primary dark:focus:border-tropical focus:ring-2 focus:ring-primary/20 dark:focus:ring-tropical/20">
                              <SelectValue placeholder="Select guests..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-lg">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} Guest{num > 1 ? 's' : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Personal Information */}
                  <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 border-t border-primary/10 dark:border-tropical/20">
                    <h3 className="text-sm font-semibold text-primary dark:text-text-primary">Guest Information</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-primary dark:text-text-primary flex items-center">
                              <Shield size={16} className="mr-2 text-tropical" />
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Your full name"
                                className="border-primary/20 dark:border-tropical/30 rounded-lg focus:border-primary dark:focus:border-tropical focus:ring-2 focus:ring-primary/20 dark:focus:ring-tropical/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-primary dark:text-text-primary flex items-center">
                              <Mail size={16} className="mr-2 text-tropical" />
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="your@email.com"
                                className="border-primary/20 dark:border-tropical/30 rounded-lg focus:border-primary dark:focus:border-tropical focus:ring-2 focus:ring-primary/20 dark:focus:ring-tropical/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-primary dark:text-text-primary flex items-center">
                              <Phone size={16} className="mr-2 text-tropical" />
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="+1 (555) 000-0000"
                                className="border-primary/20 dark:border-tropical/30 rounded-lg focus:border-primary dark:focus:border-tropical focus:ring-2 focus:ring-primary/20 dark:focus:ring-tropical/20"
                              />
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
                            <FormLabel className="text-sm font-semibold text-primary dark:text-text-primary flex items-center">
                              <MapPin size={16} className="mr-2 text-tropical" />
                              Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Street address"
                                className="border-primary/20 dark:border-tropical/30 rounded-lg focus:border-primary dark:focus:border-tropical focus:ring-2 focus:ring-primary/20 dark:focus:ring-tropical/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 pt-4 sm:pt-6 border-t border-primary/10 dark:border-tropical/20">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1 border-primary/30 dark:border-tropical/40 rounded focus:ring-2 focus:ring-primary/20 dark:focus:ring-tropical/20"
                          />
                        </FormControl>
                        <div className="space-y-1.5">
                          <FormLabel className="text-sm font-semibold text-primary dark:text-text-primary cursor-pointer">
                            I agree to the terms and conditions
                          </FormLabel>
                          <p className="text-xs text-gray-600 dark:text-text-secondary">
                            By booking, you agree to our cancellation policy and terms of service.
                          </p>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="pt-6 sm:pt-8">
                    <Button
                      type="submit"
                      disabled={isSubmitting || bookingMutation.isPending}
                      className="w-full bg-gradient-to-r from-primary to-tropical text-white hover:opacity-90 rounded-lg transition-all duration-300 hover:shadow-lg font-semibold py-3 sm:py-4 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting || bookingMutation.isPending ? "Processing..." : "Book This Room"}
                    </Button>
                  </div>

                  <p className="text-xs sm:text-sm text-center text-gray-600 dark:text-text-secondary pt-4">
                    Your booking information is secure and encrypted.
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
