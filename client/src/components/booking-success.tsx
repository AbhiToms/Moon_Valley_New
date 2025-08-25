import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Calendar, Users, MapPin, Phone, Mail, Clock, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookingDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string;
  createdAt: string;
}

export default function BookingSuccess() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  useEffect(() => {
    // Get booking details from sessionStorage
    const storedDetails = sessionStorage.getItem('bookingDetails');
    if (storedDetails) {
      try {
        setBookingDetails(JSON.parse(storedDetails));
        // Clear the booking details from sessionStorage after displaying them
        sessionStorage.removeItem('bookingDetails');
      } catch (error) {
        console.error('Error parsing booking details:', error);
        // Clear invalid data and redirect to home
        sessionStorage.removeItem('bookingDetails');
        setLocation('/');
      }
    } else {
      // For demo purposes, show sample booking details
      // In production, you might want to redirect to home or show an error
      const mockBookingDetails: BookingDetails = {
        id: "MV-DEMO" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        name: "Demo Guest",
        email: "demo@moonvalleyresort.com",
        phone: "+91 9446986882",
        roomType: "Tropical Hut Deluxe",
        checkIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
        checkOut: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 days from now
        guests: 2,
        specialRequests: "Mountain view preferred",
        createdAt: new Date().toISOString(),
      };
      setBookingDetails(mockBookingDetails);
    }
  }, [setLocation]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleShare = () => {
    if (navigator.share && bookingDetails) {
      navigator.share({
        title: 'Moon Valley Resort Booking Confirmation',
        text: `Booking confirmed! ID: ${bookingDetails.id}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Booking confirmation link copied to clipboard.",
      });
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your booking confirmation PDF is being prepared.",
    });
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface to-neutral dark:from-bg-primary dark:to-bg-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-tropical"></div>
      </div>
    );
  }

  const nights = calculateNights(bookingDetails.checkIn, bookingDetails.checkOut);

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface to-neutral dark:from-bg-primary dark:to-bg-secondary py-12">
      <div className="container mx-auto px-6">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-primary dark:text-text-primary mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600 dark:text-white/80 max-w-2xl mx-auto">
            Thank you for choosing Moon Valley Resort. Your tropical mountain retreat awaits!
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Booking ID Card */}
          <Card className="bg-gradient-to-r from-tropical to-secondary text-white border-0 shadow-2xl rounded-3xl">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Booking Reference</h2>
              <p className="text-4xl font-mono font-bold tracking-wider">{bookingDetails.id}</p>
              <p className="text-white/90 mt-2">Please save this reference number for your records</p>
            </CardContent>
          </Card>

          {/* Guest Information */}
          <Card className="bg-white dark:bg-bg-secondary border-0 shadow-xl rounded-3xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-poppins font-bold text-primary dark:text-text-primary mb-6">
                Guest Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-tropical/10 dark:bg-tropical/20 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-tropical" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-text-secondary">Full Name</p>
                      <p className="font-semibold text-primary dark:text-text-primary">{bookingDetails.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-tropical/10 dark:bg-tropical/20 rounded-full flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-tropical" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-text-secondary">Email Address</p>
                      <p className="font-semibold text-primary dark:text-text-primary">{bookingDetails.email}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-tropical/10 dark:bg-tropical/20 rounded-full flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-tropical" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-text-secondary">Phone Number</p>
                      <p className="font-semibold text-primary dark:text-text-primary">{bookingDetails.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-tropical/10 dark:bg-tropical/20 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-tropical" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-text-secondary">Number of Guests</p>
                      <p className="font-semibold text-primary dark:text-text-primary">{bookingDetails.guests} Guest{bookingDetails.guests > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card className="bg-white dark:bg-bg-secondary border-0 shadow-xl rounded-3xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-poppins font-bold text-primary dark:text-text-primary mb-6">
                Booking Details
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-full flex items-center justify-center mr-4 mt-1">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-text-secondary">Room Type</p>
                      <p className="font-semibold text-primary dark:text-text-primary text-lg">{bookingDetails.roomType}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Calendar className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-text-secondary">Check-in</p>
                      <p className="font-semibold text-primary dark:text-text-primary">{formatDate(bookingDetails.checkIn)}</p>
                      <p className="text-sm text-gray-500 dark:text-text-secondary">After 2:00 PM</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Clock className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-text-secondary">Duration</p>
                      <p className="font-semibold text-primary dark:text-text-primary text-lg">{nights} Night{nights > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Calendar className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-text-secondary">Check-out</p>
                      <p className="font-semibold text-primary dark:text-text-primary">{formatDate(bookingDetails.checkOut)}</p>
                      <p className="text-sm text-gray-500 dark:text-text-secondary">Before 11:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>

              {bookingDetails.specialRequests && (
                <div className="mt-8 p-6 bg-tropical/10 dark:bg-bg-primary rounded-2xl">
                  <h4 className="font-semibold text-primary dark:text-text-primary mb-2">Special Requests</h4>
                  <p className="text-gray-700 dark:text-text-secondary">{bookingDetails.specialRequests}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white dark:bg-bg-secondary border-0 shadow-xl rounded-3xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-poppins font-bold text-primary dark:text-text-primary mb-6">
                Resort Contact Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-tropical mr-3" />
                    <div>
                      <p className="font-semibold text-primary dark:text-text-primary">Moon Valley Resort</p>
                      <p className="text-gray-600 dark:text-text-secondary">Palakkayam Thattu, Alakode</p>
                      <p className="text-gray-600 dark:text-text-secondary">Kannur 670571, Kerala, India</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-tropical mr-3" />
                    <div>
                      <p className="font-semibold text-primary dark:text-text-primary">+91 9446986882</p>
                      <p className="text-gray-600 dark:text-text-secondary">24/7 Support Available</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-tropical mr-3" />
                    <div>
                      <p className="font-semibold text-primary dark:text-text-primary">bookings@moonvalleyresort.com</p>
                      <p className="text-gray-600 dark:text-text-secondary">For booking inquiries</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-6 h-6 text-tropical mr-3" />
                    <div>
                      <p className="font-semibold text-primary dark:text-text-primary">Best visiting hours</p>
                      <p className="text-gray-600 dark:text-text-secondary">6-7:30 AM or 5-6:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleDownload}
              className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Confirmation
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="border-tropical text-tropical hover:bg-tropical hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Booking
            </Button>
            <Button
              onClick={() => setLocation("/")}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              Back to Home
            </Button>
          </div>

          {/* Important Information */}
          <Card className="bg-gradient-to-r from-tropical/10 to-secondary/10 dark:from-tropical/20 dark:to-secondary/20 border-0 rounded-3xl">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-primary dark:text-text-primary mb-4">Important Information</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-primary dark:text-text-primary mb-2">Check-in Policy</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-text-secondary">
                    <li>• Check-in: 2:00 PM onwards</li>
                    <li>• Valid ID required at check-in</li>
                    <li>• Early check-in subject to availability</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-primary dark:text-text-primary mb-2">Check-out Policy</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-text-secondary">
                    <li>• Check-out: 11:00 AM</li>
                    <li>• Late check-out available (charges apply)</li>
                    <li>• Express check-out available</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-primary dark:text-text-primary mb-2">Cancellation Policy</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-text-secondary">
                    <li>• Free cancellation 48 hours before</li>
                    <li>• 50% refund 24-48 hours before</li>
                    <li>• No refund within 24 hours</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-primary dark:text-text-primary mb-2">What to Bring</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-text-secondary">
                    <li>• Comfortable hiking shoes</li>
                    <li>• Light jacket for evenings</li>
                    <li>• Camera for stunning views</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}