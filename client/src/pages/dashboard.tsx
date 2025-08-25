import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  LogOut,
  Plus,
  Edit,
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  RefreshCw
} from "lucide-react";
import { Link } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  name: string;
}

interface Booking {
  id: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
  specialRequests?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cancelledBookings, setCancelledBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const openDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  const openCancelDialog = (booking: Booking) => {
    setBookingToCancel(booking);
    setIsCancelOpen(true);
  };

  // Helper function to check if booking is past checkout date
  const isBookingPast = (checkOut: string) => {
    const today = new Date();
    const checkOutDate = new Date(checkOut);
    // Set time to start of day for accurate comparison
    today.setHours(0, 0, 0, 0);
    checkOutDate.setHours(0, 0, 0, 0);
    return today > checkOutDate;
  };

  // Helper function to check if booking can be cancelled (not past and not within 1 hour of check-in)
  const canCancelBooking = (booking: Booking) => {
    const now = new Date();
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);

    // Can't cancel if checkout date has passed
    if (isBookingPast(booking.checkOut)) {
      return false;
    }

    // Can't cancel if within 1 hour of check-in (you can adjust this timeframe)
    const hoursUntilCheckIn = (checkInDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    if (hoursUntilCheckIn <= 1 && hoursUntilCheckIn >= 0) {
      return false;
    }

    return booking.status === 'confirmed';
  };

  const refreshBookings = () => {
    const bookingsData = localStorage.getItem('userBookings');
    if (bookingsData) {
      const parsedBookings: Booking[] = JSON.parse(bookingsData);

      // Separate bookings by status and date
      const confirmed = parsedBookings.filter(booking =>
        booking.status === 'confirmed' && !isBookingPast(booking.checkOut)
      );
      const cancelled = parsedBookings.filter(booking => booking.status === 'cancelled');
      const past = parsedBookings.filter(booking =>
        booking.status === 'confirmed' && isBookingPast(booking.checkOut)
      );

      setBookings(confirmed);
      setCancelledBookings(cancelled);
      setPastBookings(past);
    }
  };

  const handleCancel = (bookingId: string) => {
    // Find the booking to cancel
    const bookingToCancel = bookings.find(b => b.id === bookingId);
    if (bookingToCancel) {
      // Remove from confirmed bookings
      setBookings(prev => prev.filter(b => b.id !== bookingId));

      // Add to cancelled bookings with cancelled status
      const cancelledBooking = { ...bookingToCancel, status: 'cancelled' as const };
      setCancelledBookings(prev => [...prev, cancelledBooking]);

      // Update localStorage
      const allBookings = [...bookings.filter(b => b.id !== bookingId), cancelledBooking];
      localStorage.setItem('userBookings', JSON.stringify(allBookings));

      toast({ title: 'Booking Cancelled', description: 'Your booking has been moved to cancelled bookings.' });
    }
  };

  const confirmCancel = () => {
    // Double-check if booking can still be cancelled
    if (bookingToCancel && !canCancelBooking(bookingToCancel)) {
      toast({
        title: "Cannot Cancel",
        description: "This booking can no longer be cancelled.",
        variant: "destructive"
      });
      setIsCancelOpen(false);
      setBookingToCancel(null);
      return;
    }

    setIsCancelOpen(false);
    setIsPolicyOpen(true);
  };

  const finalCancel = () => {
    if (bookingToCancel) {
      handleCancel(bookingToCancel.id);
    }
    setIsPolicyOpen(false);
    setBookingToCancel(null);
  };

  const closeAllDialogs = () => {
    setIsCancelOpen(false);
    setIsPolicyOpen(false);
    setBookingToCancel(null);
  };

  const calculateRefundAmount = (checkIn: string, totalAmount: number) => {
    const now = new Date();
    const checkInDate = new Date(checkIn);
    const hoursUntilCheckIn = (checkInDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilCheckIn >= 48) {
      return { amount: totalAmount, percentage: 100, policy: 'Free cancellation, full refund' };
    } else if (hoursUntilCheckIn >= 24) {
      return { amount: totalAmount * 0.5, percentage: 50, policy: '50% refund' };
    } else {
      return { amount: 0, percentage: 0, policy: 'No refund' };
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      setLocation('/login');
      return;
    }

    try {
      const userObj = JSON.parse(userData);
      setUser(userObj);

      // Load real bookings data from localStorage
      const bookingsData = localStorage.getItem('userBookings');
      if (bookingsData) {
        const parsedBookings: Booking[] = JSON.parse(bookingsData);

        // Separate bookings by status and date
        const confirmed = parsedBookings.filter(booking =>
          booking.status === 'confirmed' && !isBookingPast(booking.checkOut)
        );
        const cancelled = parsedBookings.filter(booking => booking.status === 'cancelled');
        const past = parsedBookings.filter(booking =>
          booking.status === 'confirmed' && isBookingPast(booking.checkOut)
        );

        setBookings(confirmed);
        setCancelledBookings(cancelled);
        setPastBookings(past);
      } else {
        // Fallback to mock data if no bookings data found
        const mockBookings: Booking[] = [
          {
            id: '1',
            roomName: 'Mountain View Suite',
            checkIn: '2024-12-25',
            checkOut: '2024-12-28',
            guests: 2,
            totalAmount: 25500,
            status: 'confirmed',
            createdAt: '2024-11-15',
            guestName: 'John Doe',
            guestEmail: 'john.doe@example.com',
            guestPhone: '+91 9876543210'
          },
        ];

        // Apply the same logic to mock data
        const confirmedMock = mockBookings.filter(booking => !isBookingPast(booking.checkOut));
        const pastMock = mockBookings.filter(booking => isBookingPast(booking.checkOut));

        setBookings(confirmedMock);
        setCancelledBookings([]);
        setPastBookings(pastMock);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      setLocation('/login');
    } finally {
      setIsLoading(false);
    }
  }, [setLocation]);

  // Listen for localStorage changes to automatically refresh bookings
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userBookings' && e.newValue) {
        try {
          refreshBookings();
        } catch (error) {
          console.error('Error parsing updated bookings:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Auto-refresh bookings every minute to check for date changes
  useEffect(() => {
    const interval = setInterval(() => {
      refreshBookings();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setLocation('/');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"><CheckCircle size={14} className="mr-1" />Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"><Clock size={14} className="mr-1" />Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"><XCircle size={14} className="mr-1" />Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateNights = (checkIn: string, checkOut: string) => Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));

  const getBookingStatusMessage = (booking: Booking) => {
    const now = new Date();
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);

    if (isBookingPast(booking.checkOut)) {
      return "Stay completed";
    }

    if (now >= checkInDate && now <= checkOutDate) {
      return "Currently staying";
    }

    if (now < checkInDate) {
      const daysUntilCheckIn = Math.ceil((checkInDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      if (daysUntilCheckIn === 0) {
        return "Check-in today";
      } else if (daysUntilCheckIn === 1) {
        return "Check-in tomorrow";
      } else {
        return `Check-in in ${daysUntilCheckIn} days`;
      }
    }

    return "Upcoming";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface to-neutral dark:from-bg-primary dark:to-bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-primary dark:text-text-primary">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface to-neutral dark:from-bg-primary dark:to-bg-secondary">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center text-primary dark:text-tropical hover:text-primary/80 dark:hover:text-tropical/80 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white dark:border-tropical dark:text-tropical dark:hover:bg-tropical dark:hover:text-white"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>

        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 dark:bg-tropical/20 rounded-full px-6 py-2 mb-6">
            <span className="text-primary dark:text-tropical font-semibold text-sm">WELCOME BACK</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-primary dark:text-text-primary mb-4">
            Welcome, <span className="text-tropical">{user.firstName}</span>!
          </h1>
          <p className="text-xl text-gray-600 dark:text-text-secondary">
            Manage your bookings and profile at Moon Valley Resort
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-bg-secondary rounded-2xl card-shadow border-0 dark:border dark:border-mist/20">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-tropical rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={32} className="text-white" />
                </div>
                <CardTitle className="text-2xl font-poppins font-bold text-primary dark:text-text-primary">
                  {user.firstName} {user.lastName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-primary dark:text-tropical" size={20} />
                  <span className="text-gray-700 dark:text-text-secondary">{user.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-primary dark:text-tropical" size={20} />
                  <span className="text-gray-700 dark:text-text-secondary">{user.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-primary dark:text-tropical" size={20} />
                  <span className="text-gray-700 dark:text-text-secondary">Kerala, India</span>
                </div>

                <Button className="w-full bg-gradient-to-r from-primary to-tropical text-white hover:opacity-90 rounded-lg transition-all duration-300 hover:shadow-lg font-semibold">
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bookings Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-poppins font-bold text-primary dark:text-text-primary">
                Confirmed Bookings
              </h2>
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={() => {
                    setLocation('/');
                    setTimeout(() => {
                      const element = document.getElementById('accommodations');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="bg-gradient-to-r from-primary to-tropical text-white hover:opacity-90 rounded-lg transition-all duration-300 hover:shadow-lg font-semibold"
                >
                  <Plus size={16} className="mr-2" />
                  New Booking
                </Button>
                <Button
                  onClick={refreshBookings}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white dark:border-tropical dark:text-tropical dark:hover:bg-tropical dark:hover:text-white"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Refresh
                </Button>
              </div>
            </div>

            {bookings.length === 0 ? (
              <Card className="bg-white dark:bg-bg-secondary rounded-2xl card-shadow border-0 dark:border dark:border-mist/20">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-text-secondary mb-2">
                    No Confirmed Bookings Yet
                  </h3>
                  <p className="text-gray-500 dark:text-text-secondary mb-6">
                    Your confirmed bookings will appear here after successful payment.
                  </p>
                  <Button 
                    onClick={() => {
                      setLocation('/');
                      setTimeout(() => {
                        const element = document.getElementById('accommodations');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                    className="bg-gradient-to-r from-primary to-tropical text-white hover:opacity-90 rounded-lg transition-all duration-300 hover:shadow-lg font-semibold"
                  >
                    Book Your Stay
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="bg-white dark:bg-bg-secondary rounded-2xl card-shadow border-0 dark:border dark:border-mist/20 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-semibold text-primary dark:text-text-primary">
                              {booking.roomName}
                            </h3>
                            {getStatusBadge(booking.status)}
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-text-secondary">Check-in</p>
                              <p className="font-medium text-gray-700 dark:text-text-primary">{formatDate(booking.checkIn)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-text-secondary">Check-out</p>
                              <p className="font-medium text-gray-700 dark:text-text-primary">{formatDate(booking.checkOut)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-text-secondary">Guests</p>
                              <p className="font-medium text-gray-700 dark:text-text-primary">{booking.guests}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-text-secondary">Total Amount</p>
                              <p className="font-medium text-gray-700 dark:text-text-primary">₹{booking.totalAmount.toLocaleString()}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500 dark:text-text-secondary">
                              Booked on {formatDate(booking.createdAt)}
                            </p>
                            <p className="text-sm font-medium text-primary dark:text-tropical">
                              {getBookingStatusMessage(booking)}
                            </p>
                          </div>
                        </div>

                        <div className="flex space-x-2 ml-4">
                          <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" onClick={() => openDetails(booking)}>
                            More Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => openCancelDialog(booking)}
                            disabled={!canCancelBooking(booking)}
                            title={!canCancelBooking(booking) ? "Cannot cancel this booking" : "Cancel booking"}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Past Bookings Section */}
        {pastBookings.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-poppins font-bold text-primary dark:text-text-primary mb-6">
              Past Bookings
            </h2>
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <Card key={booking.id} className="bg-white dark:bg-bg-secondary rounded-2xl card-shadow border-0 dark:border dark:border-mist/20 opacity-75">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-semibold text-gray-500 dark:text-text-secondary">
                            {booking.roomName}
                          </h3>
                          <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                            <CheckCircle size={14} className="mr-1" />
                            Completed
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-text-secondary">Check-in</p>
                            <p className="font-medium text-gray-600 dark:text-text-secondary">{formatDate(booking.checkIn)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-text-secondary">Check-out</p>
                            <p className="font-medium text-gray-600 dark:text-text-secondary">{formatDate(booking.checkOut)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-text-secondary">Guests</p>
                            <p className="font-medium text-gray-600 dark:text-text-secondary">{booking.guests}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-text-secondary">Total Amount</p>
                            <p className="font-medium text-gray-600 dark:text-text-secondary">₹{booking.totalAmount.toLocaleString()}</p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-500 dark:text-text-secondary">
                          Stay completed • Booked on {formatDate(booking.createdAt)}
                        </p>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline" className="border-gray-400 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" onClick={() => openDetails(booking)}>
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
                          Book Again
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Cancelled Bookings Section */}
        {cancelledBookings.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-poppins font-bold text-primary dark:text-text-primary mb-6">
              Cancelled Bookings
            </h2>
            <div className="space-y-4">
              {cancelledBookings.map((booking) => (
                <Card key={booking.id} className="bg-white dark:bg-bg-secondary rounded-2xl card-shadow border-0 dark:border dark:border-mist/20 opacity-75">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-semibold text-gray-500 dark:text-text-secondary">
                            {booking.roomName}
                          </h3>
                          {getStatusBadge(booking.status)}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-text-secondary">Check-in</p>
                            <p className="font-medium text-gray-600 dark:text-text-secondary">{formatDate(booking.checkIn)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-text-secondary">Check-out</p>
                            <p className="font-medium text-gray-600 dark:text-text-secondary">{formatDate(booking.checkOut)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-text-secondary">Guests</p>
                            <p className="font-medium text-gray-600 dark:text-text-secondary">{booking.guests}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-text-secondary">Total Amount</p>
                            <p className="font-medium text-gray-600 dark:text-text-secondary">₹{booking.totalAmount.toLocaleString()}</p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-500 dark:text-text-secondary">
                          Originally booked on {formatDate(booking.createdAt)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Booking Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-bg-secondary border-0 rounded-3xl shadow-2xl mx-4 sm:mx-auto">
            <DialogHeader className="text-center pb-6">
              <DialogTitle className="text-3xl font-poppins font-bold text-primary dark:text-text-primary">
                Booking Details
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-text-secondary text-lg">
                Complete information about your reservation
              </DialogDescription>
            </DialogHeader>

            {selectedBooking && (
              <div className="space-y-6 p-6">
                {/* Booking ID Card */}
                <Card className="bg-gradient-to-r from-tropical to-secondary text-white border-0 shadow-2xl rounded-3xl">
                  <CardContent className="p-6 text-center">
                    <h2 className="text-xl font-bold mb-2">Booking Reference</h2>
                    <p className="text-3xl font-mono font-bold tracking-wider">{selectedBooking.id}</p>
                    <div className="flex items-center justify-center mt-3">
                      {getStatusBadge(selectedBooking.status)}
                    </div>
                  </CardContent>
                </Card>

                {/* Guest Information */}
                <Card className="bg-white dark:bg-bg-secondary border-0 shadow-xl rounded-3xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-poppins font-bold text-primary dark:text-text-primary mb-6">
                      Guest Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-tropical/10 dark:bg-tropical/20 rounded-full flex items-center justify-center mr-4">
                            <User className="w-6 h-6 text-tropical" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-text-secondary">Guest Name</p>
                            <p className="font-semibold text-primary dark:text-text-primary">
                              {selectedBooking.guestName || user?.firstName + ' ' + user?.lastName || 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-tropical/10 dark:bg-tropical/20 rounded-full flex items-center justify-center mr-4">
                            <Mail className="w-6 h-6 text-tropical" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-text-secondary">Email Address</p>
                            <p className="font-semibold text-primary dark:text-text-primary">
                              {selectedBooking.guestEmail || user?.email || 'N/A'}
                            </p>
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
                            <p className="font-semibold text-primary dark:text-text-primary">
                              {selectedBooking.guestPhone || user?.phone || 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-tropical/10 dark:bg-tropical/20 rounded-full flex items-center justify-center mr-4">
                            <Users className="w-6 h-6 text-tropical" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-text-secondary">Number of Guests</p>
                            <p className="font-semibold text-primary dark:text-text-primary">
                              {selectedBooking.guests} Guest{selectedBooking.guests > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Booking Details */}
                <Card className="bg-white dark:bg-bg-secondary border-0 shadow-xl rounded-3xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-poppins font-bold text-primary dark:text-text-primary mb-6">
                      Reservation Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-full flex items-center justify-center mr-4 mt-1">
                            <MapPin className="w-6 h-6 text-secondary" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-text-secondary">Room Type</p>
                            <p className="font-semibold text-primary dark:text-text-primary text-lg">{selectedBooking.roomName}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-full flex items-center justify-center mr-4 mt-1">
                            <Calendar className="w-6 h-6 text-secondary" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-text-secondary">Check-in</p>
                            <p className="font-semibold text-primary dark:text-text-primary">{formatDate(selectedBooking.checkIn)}</p>
                            <p className="text-sm text-gray-500 dark:text-text-secondary">After 2:00 PM</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mr-4 mt-1">
                            <Calendar className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-text-secondary">Total Amount</p>
                            <p className="font-bold text-2xl text-primary dark:text-text-primary">₹{selectedBooking.totalAmount.toLocaleString()}</p>
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
                            <p className="font-semibold text-primary dark:text-text-primary text-lg">
                              {calculateNights(selectedBooking.checkIn, selectedBooking.checkOut)} Night{calculateNights(selectedBooking.checkIn, selectedBooking.checkOut) > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-full flex items-center justify-center mr-4 mt-1">
                            <Calendar className="w-6 h-6 text-secondary" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-text-secondary">Check-out</p>
                            <p className="font-semibold text-primary dark:text-text-primary">{formatDate(selectedBooking.checkOut)}</p>
                            <p className="text-sm text-gray-500 dark:text-text-secondary">Before 11:00 AM</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-green-500/10 dark:bg-green-500/20 rounded-full flex items-center justify-center mr-4 mt-1">
                            <Calendar className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-text-secondary">Booked On</p>
                            <p className="font-semibold text-primary dark:text-text-primary">{formatDate(selectedBooking.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedBooking.specialRequests && (
                      <div className="mt-8 p-6 bg-tropical/10 dark:bg-bg-primary rounded-2xl">
                        <h4 className="font-semibold text-primary dark:text-text-primary mb-2">Special Requests</h4>
                        <p className="text-gray-700 dark:text-text-secondary">{selectedBooking.specialRequests}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Resort Contact Information */}
                <Card className="bg-white dark:bg-bg-secondary border-0 shadow-xl rounded-3xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-poppins font-bold text-primary dark:text-text-primary mb-6">
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

                {/* Important Information */}
                <Card className="bg-gradient-to-r from-tropical/10 to-secondary/10 dark:from-tropical/20 dark:to-secondary/20 border-0 rounded-3xl">
                  <CardContent className="p-6">
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
            )}
          </DialogContent>
        </Dialog>

        {/* Cancel Confirmation Dialog */}
        <Dialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-bg-secondary border-0 rounded-3xl shadow-2xl mx-4 sm:mx-auto">
            <div className="text-center p-4 sm:p-6">
              {/* Warning Icon */}
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-poppins font-bold text-red-600 dark:text-red-400 mb-4">
                Cancel Booking?
              </h3>

              {/* Booking Details */}
              {bookingToCancel && (
                <div className="bg-gray-50 dark:bg-bg-primary rounded-2xl p-4 mb-6 text-left">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500 dark:text-text-secondary">Booking ID</span>
                    <span className="font-mono font-semibold text-primary dark:text-text-primary">{bookingToCancel.id}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500 dark:text-text-secondary">Room</span>
                    <span className="font-semibold text-primary dark:text-text-primary">{bookingToCancel.roomName}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500 dark:text-text-secondary">Dates</span>
                    <span className="font-semibold text-primary dark:text-text-primary">
                      {new Date(bookingToCancel.checkIn).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} - {new Date(bookingToCancel.checkOut).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500 dark:text-text-secondary">Guests</span>
                    <span className="font-semibold text-primary dark:text-text-primary">{bookingToCancel.guests}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-text-secondary">Total Amount</span>
                    <span className="font-bold text-lg text-primary dark:text-text-primary">₹{bookingToCancel.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Warning Message */}
              <p className="text-gray-600 dark:text-text-secondary mb-6 leading-relaxed">
                This action cannot be undone. Your booking will be marked as cancelled and you may be subject to our cancellation policy.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setIsCancelOpen(false)}
                  variant="outline"
                  className="flex-1 border-primary text-primary hover:bg-primary hover:text-white rounded-xl py-3 font-semibold"
                >
                  Keep My Booking
                </Button>
                <Button
                  onClick={confirmCancel}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 font-semibold"
                >
                  Yes, Cancel It
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Cancellation Policy Confirmation Dialog */}
        <Dialog open={isPolicyOpen} onOpenChange={setIsPolicyOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-bg-secondary border-0 rounded-3xl shadow-2xl mx-4 sm:mx-auto">
            <div className="text-center p-4">
              {/* Info Icon */}
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-lg font-poppins font-bold text-blue-600 dark:text-blue-400 mb-2">
                Cancellation Policy
              </h3>

              {/* Policy Details */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-2 mb-3 text-left">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 text-sm">Please review our cancellation policy:</h4>
                {bookingToCancel && (() => {
                  const refundInfo = calculateRefundAmount(bookingToCancel.checkIn, bookingToCancel.totalAmount);
                  const now = new Date();
                  const checkInDate = new Date(bookingToCancel.checkIn);
                  const hoursUntilCheckIn = Math.max(0, (checkInDate.getTime() - now.getTime()) / (1000 * 60 * 60));
                  const daysUntilCheckIn = Math.ceil(hoursUntilCheckIn / 24);

                  return (
                    <div className="space-y-2">
                      {/* Time Remaining */}
                      <div className="bg-white dark:bg-blue-900/30 rounded-xl p-1.5">
                        <div className="text-center mb-1">
                          <span className="text-xs text-blue-600 dark:text-blue-300">Time until check-in</span>
                        </div>
                        <div className="text-center">
                          <span className="text-base font-bold text-blue-800 dark:text-blue-200">
                            {daysUntilCheckIn > 0 ? `${daysUntilCheckIn} day${daysUntilCheckIn > 1 ? 's' : ''}` : `${Math.ceil(hoursUntilCheckIn)} hour${Math.ceil(hoursUntilCheckIn) > 1 ? 's' : ''}`}
                          </span>
                        </div>
                      </div>

                      {/* Policy Breakdown */}
                      <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                        <div className={`flex items-center justify-between p-1 rounded-lg ${hoursUntilCheckIn >= 48 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            <strong>48+ hours before:</strong> Full refund
                          </span>
                          <span className={`font-semibold ${hoursUntilCheckIn >= 48 ? 'text-green-700 dark:text-green-300' : 'text-gray-500'}`}>
                            {hoursUntilCheckIn >= 48 ? '✓' : '✗'}
                          </span>
                        </div>
                        <div className={`flex items-center justify-between p-1 rounded-lg ${hoursUntilCheckIn >= 24 && hoursUntilCheckIn < 48 ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                            <strong>24-48 hours before:</strong> 50% refund
                          </span>
                          <span className={`font-semibold ${hoursUntilCheckIn >= 24 && hoursUntilCheckIn < 48 ? 'text-yellow-700 dark:text-yellow-300' : 'text-gray-500'}`}>
                            {hoursUntilCheckIn >= 24 && hoursUntilCheckIn < 48 ? '✓' : '✗'}
                          </span>
                        </div>
                        <div className={`flex items-center justify-between p-1 rounded-lg ${hoursUntilCheckIn < 24 ? 'bg-red-100 dark:bg-red-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            <strong>Less than 24 hours:</strong> No refund
                          </span>
                          <span className={`font-semibold ${hoursUntilCheckIn < 24 ? 'text-red-700 dark:text-red-300' : 'text-gray-500'}`}>
                            {hoursUntilCheckIn < 24 ? '✓' : '✗'}
                          </span>
                        </div>
                      </div>

                      {/* Detailed Calculation Breakdown */}
                      <div className="bg-white dark:bg-blue-900/30 rounded-xl p-1.5">
                        <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 text-center text-sm">Refund Calculation Breakdown</h5>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between items-center py-1 border-b border-blue-100 dark:border-blue-800">
                            <span className="text-blue-700 dark:text-blue-300">Total Booking Amount:</span>
                            <span className="font-semibold text-blue-800 dark:text-blue-200">₹{bookingToCancel.totalAmount.toLocaleString()}</span>
                          </div>

                          {hoursUntilCheckIn >= 48 ? (
                            <div className="flex justify-between items-center py-1 border-b border-blue-100 dark:border-blue-800">
                              <span className="text-green-600 dark:text-green-400">Cancellation Charges:</span>
                              <span className="font-semibold text-green-600 dark:text-green-400">₹0 (Free cancellation)</span>
                            </div>
                          ) : hoursUntilCheckIn >= 24 ? (
                            <div className="flex justify-between items-center py-1 border-b border-blue-100 dark:border-blue-800">
                              <span className="text-yellow-600 dark:text-yellow-400">Cancellation Charges:</span>
                              <span className="font-semibold text-yellow-600 dark:text-yellow-400">₹{(bookingToCancel.totalAmount * 0.5).toLocaleString()}</span>
                            </div>
                          ) : (
                            <div className="flex justify-between items-center py-1 border-b border-blue-100 dark:border-blue-800">
                              <span className="text-red-600 dark:text-red-400">Cancellation Charges:</span>
                              <span className="font-semibold text-red-600 dark:text-red-400">₹{bookingToCancel.totalAmount.toLocaleString()}</span>
                            </div>
                          )}

                          <div className="flex justify-between items-center py-1 border-b border-blue-100 dark:border-blue-800">
                            <span className="text-blue-700 dark:text-blue-300">Processing Fee:</span>
                            <span className="font-semibold text-blue-800 dark:text-blue-200">₹0</span>
                          </div>

                          <div className="flex justify-between items-center py-1 bg-green-50 dark:bg-green-900/20 rounded-lg px-2">
                            <span className="font-bold text-green-700 dark:text-green-300">Final Refund Amount:</span>
                            <span className="font-bold text-lg text-green-600 dark:text-green-400">₹{refundInfo.amount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Final Warning */}
              <p className="text-gray-600 dark:text-text-secondary mb-3 leading-relaxed text-sm">
                <strong>Final confirmation:</strong> Are you absolutely sure you want to cancel this booking? This action will be processed immediately.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={closeAllDialogs}
                  variant="outline"
                  className="flex-1 border-primary text-primary hover:bg-primary hover:text-white rounded-xl py-3 font-semibold"
                >
                  Keep My Booking
                </Button>
                <Button
                  onClick={finalCancel}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 font-semibold"
                >
                  Yes, Cancel & Process Refund
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}