
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
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
import { Lock, Calendar, Users, User, Mail, Phone, Shield, MapPin, Star, Clock } from "lucide-react";
import { Link } from "wouter";

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
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

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
      const bookingData = {
        ...data,
        checkIn: new Date(data.checkIn),
        checkOut: new Date(data.checkOut),
      };
      return apiRequest("POST", "/api/bookings", bookingData);
    },
    onSuccess: (response: any) => {
      // Get the room data for accurate price calculation
      const selectedRoom = rooms?.find(r => r.name === form.getValues().roomType);
      const checkIn = new Date(form.getValues().checkIn);
      const checkOut = new Date(form.getValues().checkOut);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      const totalAmount = selectedRoom ? selectedRoom.price * Math.max(1, nights) : 0;



      // Store booking details in sessionStorage for the success page
      const bookingDetails = {
        id: response?.id || "MV-" + Math.random().toString(36).substring(2, 11).toUpperCase(),
        ...form.getValues(),
        totalAmount: totalAmount,
        createdAt: new Date().toISOString(),
      };
      sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

      // Also store in localStorage for the dashboard
      const dashboardBooking = {
        id: bookingDetails.id,
        roomName: form.getValues().roomType,
        checkIn: form.getValues().checkIn,
        checkOut: form.getValues().checkOut,
        guests: form.getValues().guests,
        totalAmount: totalAmount,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        guestName: form.getValues().name,
        guestEmail: form.getValues().email,
        guestPhone: form.getValues().phone,
        address: form.getValues().address
      };

      // Get existing bookings from localStorage
      const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      existingBookings.push(dashboardBooking);
      localStorage.setItem('userBookings', JSON.stringify(existingBookings));

      // Redirect to success page
      setLocation("/booking-success");

      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
    },
    onError: () => {
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

  if (!user) {
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
              <CardContent className="p-6 sm:p-8 lg:p-12 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 dark:bg-tropical/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Lock className="text-tropical dark:text-tropical" size={24} />
                </div>
                <h3 className="text-xl sm:text-2xl font-poppins font-bold text-primary dark:text-text-primary mb-3 sm:mb-4">
                  Sign In Required
                </h3>
                <p className="text-gray-600 dark:text-text-secondary mb-6 sm:mb-8 text-base sm:text-lg px-4">
                  Please sign in or create an account to book your stay at Moon Valley Resort.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link href="/login">
                    <Button className="bg-gradient-to-r from-primary to-tropical text-white hover:opacity-90 rounded-lg transition-all duration-300 hover:shadow-lg font-semibold px-6 sm:px-8 py-3 w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white dark:border-tropical dark:text-tropical dark:hover:bg-tropical dark:hover:text-white rounded-lg px-6 sm:px-8 py-3 w-full sm:w-auto">
                      Create Account
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

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
            Welcome back, {user.firstName}! Book your perfect mountain retreat and experience the tranquility of nature at its finest.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-2 sm:px-0">
          <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0 shadow-2xl dark:shadow-xl rounded-2xl sm:rounded-3xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-primary/10 via-tropical/10 to-secondary/10 dark:from-primary/20 dark:via-tropical/20 dark:to-secondary/20 p-4 sm:p-6 lg:p-8 border-b border-primary/10 dark:border-gray-600/30">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-tropical rounded-full flex items-center justify-center shadow-lg">
                  <Calendar className="text-white" size={28} />
                </div>
              </div>
              <h3 className="text-2xl font-poppins font-bold text-center text-primary dark:text-text-primary mb-2">
                Complete Your Reservation
              </h3>
              <p className="text-center text-gray-600 dark:text-text-secondary">
                Fill in the details below to secure your tropical getaway
              </p>
            </div>

            <CardContent className="p-4 sm:p-6 lg:p-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                  {/* Dates Section */}
                  <div className="bg-gradient-to-r from-surface/50 to-neutral/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl p-3 sm:p-4 lg:p-6 border border-primary/10 dark:border-gray-600/30">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary/20 to-tropical/20 rounded-lg flex items-center justify-center mr-3">
                        <Clock className="text-tropical dark:text-tropical" size={20} />
                      </div>
                      <h4 className="text-lg font-semibold text-primary dark:text-text-primary">Stay Duration</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                      <FormField
                        control={form.control}
                        name="checkIn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary dark:text-white font-semibold flex items-center">
                              <Calendar className="mr-2 text-tropical dark:text-tropical" size={16} />
                              Check-in Date
                            </FormLabel>
                            <FormControl>
                              <DatePicker
                                date={field.value ? new Date(field.value + 'T12:00:00') : undefined}
                                onDateChange={(date) => {
                                  if (date) {
                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                    const day = String(date.getDate()).padStart(2, '0');
                                    field.onChange(`${year}-${month}-${day}`);
                                  } else {
                                    field.onChange('');
                                  }
                                }}
                                placeholder="Select check-in date"
                                minDate={new Date()}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 dark:text-red-400" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="checkOut"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary dark:text-white font-semibold flex items-center">
                              <Calendar className="mr-2 text-tropical dark:text-tropical" size={16} />
                              Check-out Date
                            </FormLabel>
                            <FormControl>
                              <DatePicker
                                date={field.value ? new Date(field.value + 'T12:00:00') : undefined}
                                onDateChange={(date) => {
                                  if (date) {
                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                    const day = String(date.getDate()).padStart(2, '0');
                                    field.onChange(`${year}-${month}-${day}`);
                                  } else {
                                    field.onChange('');
                                  }
                                }}
                                placeholder="Select check-out date"
                                minDate={(() => {
                                  const checkInDate = form.watch('checkIn');
                                  if (checkInDate) {
                                    const nextDay = new Date(checkInDate + 'T12:00:00');
                                    nextDay.setDate(nextDay.getDate() + 1);
                                    return nextDay;
                                  }
                                  return new Date();
                                })()}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 dark:text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Room & Guests Section */}
                  <div className="bg-gradient-to-r from-surface/50 to-neutral/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl p-3 sm:p-4 lg:p-6 border border-primary/10 dark:border-gray-600/30">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-secondary/20 to-tropical/20 rounded-lg flex items-center justify-center mr-3">
                        <MapPin className="text-tropical dark:text-tropical" size={20} />
                      </div>
                      <h4 className="text-lg font-semibold text-primary dark:text-text-primary">Accommodation Details</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      <FormField
                        control={form.control}
                        name="roomType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary dark:text-white font-semibold flex items-center">
                              <Star className="mr-2 text-tropical dark:text-tropical" size={16} />
                              Room Type
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gradient-to-r from-surface to-neutral dark:from-bg-primary dark:to-bg-secondary text-gray-800 dark:text-text-primary border-2 border-primary/30 dark:border-tropical/40 focus:border-tropical focus:ring-2 focus:ring-tropical/20 dark:focus:border-tropical dark:focus:ring-tropical/20 rounded-xl h-12 shadow-sm hover:shadow-lg hover:from-surface/90 hover:to-neutral/90 dark:hover:from-bg-primary/90 dark:hover:to-bg-secondary/90 transition-all duration-300">
                                  <SelectValue placeholder="Select a room" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white dark:bg-bg-secondary border-primary/20 dark:border-tropical/30 rounded-xl shadow-xl backdrop-blur-sm">
                                {rooms?.map((room) => (
                                  <SelectItem key={room.id} value={room.name} className="hover:bg-gradient-to-r hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-800/30 dark:hover:to-teal-800/30 rounded-lg transition-all duration-200 cursor-pointer">
                                    <div className="flex flex-col">
                                      <span className="font-medium text-gray-800 dark:text-text-primary">{room.name}</span>
                                      <span className="text-sm text-primary dark:text-tropical font-semibold">₹{room.price.toLocaleString()}/night</span>
                                    </div>
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
                            <FormLabel className="text-primary dark:text-white font-semibold flex items-center">
                              <Users className="mr-2 text-tropical dark:text-tropical" size={16} />
                              Guests
                            </FormLabel>
                            <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                              <FormControl>
                                <SelectTrigger className="bg-gradient-to-r from-surface to-neutral dark:from-bg-primary dark:to-bg-secondary text-gray-800 dark:text-text-primary border-2 border-primary/30 dark:border-tropical/40 focus:border-tropical focus:ring-2 focus:ring-tropical/20 dark:focus:border-tropical dark:focus:ring-tropical/20 rounded-xl h-12 shadow-sm hover:shadow-lg hover:from-surface/90 hover:to-neutral/90 dark:hover:from-bg-primary/90 dark:hover:to-bg-secondary/90 transition-all duration-300">
                                  <SelectValue placeholder="Select guests" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white dark:bg-bg-secondary border-primary/20 dark:border-tropical/30 rounded-xl shadow-xl backdrop-blur-sm">
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                  <SelectItem key={num} value={num.toString()} className="hover:bg-gradient-to-r hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-800/30 dark:hover:to-teal-800/30 rounded-lg transition-all duration-200 cursor-pointer text-gray-800 dark:text-text-primary font-medium">
                                    {num} Guest{num > 1 ? 's' : ''}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex flex-col justify-end sm:col-span-2 lg:col-span-1">
                        <label className="text-primary dark:text-white font-semibold block mb-2 flex items-center">
                          <Shield className="mr-2 text-tropical dark:text-tropical" size={16} />
                          Total Amount
                        </label>
                        <div className="bg-gradient-to-r from-primary/5 to-tropical/5 dark:from-primary/10 dark:to-tropical/10 border-2 border-primary/20 dark:border-tropical/30 rounded-xl px-3 sm:px-4 py-3 shadow-sm">
                          <div className="text-sm text-gray-600 dark:text-text-secondary mb-1">
                            {(() => {
                              const checkIn = form.watch('checkIn');
                              const checkOut = form.watch('checkOut');

                              if (!checkIn || !checkOut) {
                                return 'Select dates to see duration';
                              }

                              const start = new Date(checkIn);
                              const end = new Date(checkOut);
                              const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

                              return `${Math.max(1, nights)} Night${Math.max(1, nights) > 1 ? 's' : ''}`;
                            })()}
                          </div>
                          <div className="text-lg sm:text-xl font-bold text-primary dark:text-tropical">
                            {(() => {
                              const selectedRoom = rooms?.find(r => r.name === form.watch('roomType'));
                              const checkIn = form.watch('checkIn');
                              const checkOut = form.watch('checkOut');

                              if (!selectedRoom || !checkIn || !checkOut) {
                                return '₹0';
                              }

                              const start = new Date(checkIn);
                              const end = new Date(checkOut);
                              const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
                              const total = selectedRoom.price * Math.max(1, nights);

                              return `₹${total.toLocaleString()}`;
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Guest Information Section */}
                  <div className="bg-gradient-to-r from-surface/50 to-neutral/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl p-3 sm:p-4 lg:p-6 border border-primary/10 dark:border-gray-600/30">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-tropical/20 to-secondary/20 rounded-lg flex items-center justify-center mr-3">
                          <User className="text-tropical dark:text-tropical" size={20} />
                        </div>
                        <h4 className="text-lg font-semibold text-primary dark:text-text-primary">Guest Information</h4>
                      </div>
                      {user && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            form.setValue('name', `${user.firstName || ''} ${user.lastName || ''}`.trim());
                            form.setValue('email', user.email || '');
                            form.setValue('phone', user.phone || '');
                          }}
                          className="text-xs bg-primary/5 hover:bg-primary/10 border-primary/30 text-primary dark:bg-tropical/10 dark:hover:bg-tropical/20 dark:border-tropical/40 dark:text-tropical w-full sm:w-auto"
                        >
                          Use My Info
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary dark:text-white font-semibold flex items-center">
                              <User className="mr-2 text-tropical dark:text-tropical" size={16} />
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-neutral/30 dark:border-gray-600/50 focus:border-tropical focus:ring-2 focus:ring-tropical/20 dark:focus:border-tropical dark:focus:ring-tropical/20 rounded-xl h-10 sm:h-12 shadow-sm hover:shadow-md transition-all duration-300"
                                placeholder="Enter your full name"
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
                            <FormLabel className="text-primary dark:text-white font-semibold flex items-center">
                              <Mail className="mr-2 text-tropical dark:text-tropical" size={16} />
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                {...field}
                                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-neutral/30 dark:border-gray-600/50 focus:border-tropical focus:ring-2 focus:ring-tropical/20 dark:focus:border-tropical dark:focus:ring-tropical/20 rounded-xl h-10 sm:h-12 shadow-sm hover:shadow-md transition-all duration-300"
                                placeholder="Enter your email address"
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
                        <FormItem className="mt-3 sm:mt-4 lg:mt-6">
                          <FormLabel className="text-primary dark:text-white font-semibold flex items-center">
                            <Phone className="mr-2 text-tropical dark:text-tropical" size={16} />
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              {...field}
                              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-neutral/30 dark:border-gray-600/50 focus:border-tropical focus:ring-2 focus:ring-tropical/20 dark:focus:border-tropical dark:focus:ring-tropical/20 rounded-xl h-10 sm:h-12 shadow-sm hover:shadow-md transition-all duration-300"
                              placeholder="Enter your phone number"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="mt-3 sm:mt-4 lg:mt-6">
                          <FormLabel className="text-primary dark:text-white font-semibold flex items-center">
                            <MapPin className="mr-2 text-tropical dark:text-tropical" size={16} />
                            Complete Address
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Enter your complete address including street, city, state, and postal code..."
                              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-neutral/30 dark:border-gray-600/50 focus:border-tropical focus:ring-2 focus:ring-tropical/20 dark:focus:border-tropical dark:focus:ring-tropical/20 rounded-xl placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-sm hover:shadow-md transition-all duration-300"
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Terms & Conditions */}
                  <div className="bg-gradient-to-r from-surface/30 to-neutral/30 dark:from-gray-800/30 dark:to-gray-700/30 rounded-2xl p-3 sm:p-4 lg:p-6 border border-primary/10 dark:border-gray-600/30">
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-4 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-2 border-primary/50 dark:border-tropical/50 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-tropical data-[state=checked]:border-tropical rounded-md mt-1"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-relaxed">
                            <FormLabel className="text-primary dark:text-white/90 text-sm cursor-pointer">
                              I agree to the{" "}
                              <span className="text-secondary hover:text-tropical hover:underline cursor-pointer font-semibold transition-colors duration-200">Terms & Conditions</span>
                              {" "}and{" "}
                              <span className="text-secondary hover:text-tropical hover:underline cursor-pointer font-semibold transition-colors duration-200">Privacy Policy</span>
                            </FormLabel>
                            <FormMessage className="text-red-500" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-4 sm:pt-6">
                    <Button
                      type="submit"
                      disabled={bookingMutation.isPending}
                      className="bg-gradient-to-r from-secondary via-tropical to-primary text-white px-8 sm:px-12 lg:px-20 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 w-full sm:w-auto min-w-[200px]"
                    >
                      {bookingMutation.isPending ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Processing...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Shield className="mr-2 text-white" size={20} />
                          Reserve Now
                        </div>
                      )}
                    </Button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                      Secure booking • Instant confirmation • Free cancellation
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div >
    </section >
  );
}
