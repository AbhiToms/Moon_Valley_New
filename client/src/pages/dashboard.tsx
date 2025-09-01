import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
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
  RefreshCw,
  Loader2,
  UserCircle,
  Camera,
  Save,
  X,
  IndianRupee,
  Home
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
  address?: string;
  profilePicture?: string;
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
  guestAddress?: string;
  address?: string;
  specialRequests?: string;
}

interface BookingCardProps {
  booking: Booking;
  activeTab: 'confirmed' | 'past' | 'cancelled';
  onViewDetails: (booking: Booking) => void;
  onCancel: (booking: Booking) => void;
  canCancel: boolean;
  getStatusMessage: (booking: Booking) => string;
  formatDate: (date: string) => string;
  getStatusBadge: (status: string) => JSX.Element;
  isMobile: boolean;
}

interface EmptyStateProps {
  activeTab: 'confirmed' | 'past' | 'cancelled';
  onBookNow: () => void;
}

// BookingCard Component
const BookingCard = ({
  booking,
  activeTab,
  onViewDetails,
  onCancel,
  canCancel,
  getStatusMessage,
  formatDate,
  getStatusBadge,
  isMobile
}: BookingCardProps) => {
  const isPast = activeTab === 'past';
  const isCancelled = activeTab === 'cancelled';

  return (
    <Card className={`bg-white dark:bg-bg-secondary rounded-lg sm:rounded-xl lg:rounded-2xl card-shadow border-0 dark:border dark:border-mist/20 hover:shadow-lg transition-all duration-200 ${isPast || isCancelled ? 'opacity-75' : ''}`}>
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 lg:mr-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-3">
              <h3 className={`text-base sm:text-lg lg:text-xl font-semibold leading-tight ${isPast || isCancelled ? 'text-gray-500 dark:text-gray-400' : 'text-forest-green'}`}>
                {booking.roomName}
              </h3>
              <div className="self-start sm:self-center">
                {getStatusBadge(booking.status)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 mb-4">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-text-secondary">Check-in</p>
                <p className={`font-medium text-sm sm:text-base truncate ${isPast || isCancelled ? 'text-gray-600 dark:text-gray-400' : 'text-gray-700 dark:text-text-secondary'}`}>
                  {formatDate(booking.checkIn)}
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-text-secondary">Check-out</p>
                <p className={`font-medium text-sm sm:text-base truncate ${isPast || isCancelled ? 'text-gray-600 dark:text-gray-400' : 'text-gray-700 dark:text-text-secondary'}`}>
                  {formatDate(booking.checkOut)}
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-text-secondary">Guests</p>
                <p className={`font-medium text-sm sm:text-base ${isPast || isCancelled ? 'text-gray-600 dark:text-gray-400' : 'text-gray-700 dark:text-text-secondary'}`}>
                  {booking.guests}
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-text-secondary">Amount</p>
                <p className={`font-medium text-sm sm:text-base truncate ${isPast || isCancelled ? 'text-gray-600 dark:text-gray-400' : 'text-gray-700 dark:text-text-secondary'}`}>
                  ₹{booking.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-text-secondary leading-relaxed">
                {isCancelled ? 'Originally booked' : 'Booked'} on {formatDate(booking.createdAt)}
              </p>
              {!isCancelled && (
                <p className="text-xs sm:text-sm font-medium text-primary dark:text-tropical">
                  {getStatusMessage(booking)}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 lg:flex-col lg:space-y-2 lg:space-x-0">
            <Button
              size={isMobile ? "sm" : "default"}
              variant="outline"
              className={`w-full sm:w-auto ${isPast || isCancelled
                ? 'border-gray-400 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                : 'border-primary text-primary hover:bg-primary hover:text-white dark:border-tropical dark:text-tropical dark:hover:bg-tropical dark:hover:text-white'
                }`}
              onClick={() => onViewDetails(booking)}
            >
              <span className="text-xs sm:text-sm">
                {isPast || isCancelled ? 'View Details' : 'More Details'}
              </span>
            </Button>

            {activeTab === 'confirmed' && (
              <Button
                size={isMobile ? "sm" : "default"}
                variant="outline"
                className="w-full sm:w-auto border-red-500 text-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onCancel(booking)}
                disabled={!canCancel}
                title={!canCancel ? "Cannot cancel this booking" : "Cancel booking"}
              >
                <span className="text-xs sm:text-sm">Cancel</span>
              </Button>
            )}

            {activeTab === 'past' && (
              <Button
                size={isMobile ? "sm" : "default"}
                variant="outline"
                className="w-full sm:w-auto border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              >
                <span className="text-xs sm:text-sm">Book Again</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// EmptyState Component
const EmptyState = ({ activeTab, onBookNow }: EmptyStateProps) => {
  const getEmptyStateContent = () => {
    switch (activeTab) {
      case 'confirmed':
        return {
          icon: <Calendar className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto mb-4" />,
          title: 'No Confirmed Bookings Yet',
          description: 'Your confirmed bookings will appear here after successful payment.',
          action: 'Book Your Stay'
        };
      case 'past':
        return {
          icon: <CheckCircle className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto mb-4" />,
          title: 'No Past Bookings',
          description: 'Your completed stays will appear here.',
          action: 'Book Your First Stay'
        };
      case 'cancelled':
        return {
          icon: <XCircle className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto mb-4" />,
          title: 'No Cancelled Bookings',
          description: 'Any cancelled bookings will appear here.',
          action: 'Make a Booking'
        };
      default:
        return {
          icon: <Calendar className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto mb-4" />,
          title: 'No Bookings',
          description: 'Your bookings will appear here.',
          action: 'Book Now'
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <Card className="bg-white dark:bg-bg-secondary rounded-lg sm:rounded-xl lg:rounded-2xl card-shadow border-0 dark:border dark:border-mist/20">
      <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
        {content.icon}
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-600 dark:text-text-secondary mb-2">
          {content.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-500 dark:text-text-secondary mb-4 sm:mb-6 max-w-md mx-auto leading-relaxed">
          {content.description}
        </p>
        <Button
          onClick={onBookNow}
          className="bg-gradient-to-r from-primary to-tropical text-white hover:opacity-90 rounded-lg transition-all duration-300 hover:shadow-lg font-semibold w-full sm:w-auto"
          size="default"
        >
          <span className="text-sm sm:text-base">{content.action}</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cancelledBookings, setCancelledBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'confirmed' | 'past' | 'cancelled'>('confirmed');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({
    email: '',
    phone: '',
    profilePicture: null as File | null
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
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

  const refreshBookings = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Add small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));

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
    } catch (error) {
      console.error('Error refreshing bookings:', error);
      toast({
        title: "Error",
        description: "Failed to refresh bookings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [toast]);

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

      toast({
        title: 'Booking Cancelled',
        description: 'Your booking has been cancelled and the refund will be credited to the original payment method within 4 to 5 working days.',
        duration: 6000
      });
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
            id: "MV-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
            roomName: 'Tropical Hut Deluxe',
            checkIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            checkOut: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            guests: 2,
            totalAmount: 4500,
            status: 'confirmed',
            createdAt: new Date().toISOString(),
            guestName: 'Demo Guest',
            guestEmail: 'demo@moonvalleyresort.com',
            guestPhone: '+91 9446986882',
            guestAddress: '123 Demo Street, Demo City, Kerala 670001',
            specialRequests: 'Mountain view preferred'
          },
          {
            id: "MV-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
            roomName: 'Ocean Breeze Room',
            checkIn: '2024-12-30',
            checkOut: '2025-01-02',
            guests: 3,
            totalAmount: 18000,
            status: 'confirmed',
            createdAt: '2024-11-20',
            guestName: 'Sarah Wilson',
            guestEmail: 'sarah.wilson@example.com',
            guestPhone: '+91 8765432109',
            guestAddress: '456 Beach Road, Thiruvananthapuram, Kerala 695001'
          },
          {
            id: "MV-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
            roomName: 'Garden Villa',
            checkIn: '2025-01-15',
            checkOut: '2025-01-18',
            guests: 4,
            totalAmount: 32000,
            status: 'confirmed',
            createdAt: '2024-11-25',
            guestName: 'Mike Johnson',
            guestEmail: 'mike.johnson@example.com',
            guestPhone: '+91 7654321098',
            guestAddress: '789 Hill View, Munnar, Kerala 685612'
          },
          {
            id: "MV-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
            roomName: 'Lakeside Cottage',
            checkIn: '2025-02-10',
            checkOut: '2025-02-14',
            guests: 2,
            totalAmount: 28000,
            status: 'confirmed',
            createdAt: '2024-12-01',
            guestName: 'Emily Davis',
            guestEmail: 'emily.davis@example.com',
            guestPhone: '+91 6543210987',
            guestAddress: '321 Lake Side, Kumarakom, Kerala 686563'
          },
          {
            id: "MV-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
            roomName: 'Forest Retreat',
            checkIn: '2025-03-05',
            checkOut: '2025-03-08',
            guests: 3,
            totalAmount: 24000,
            status: 'confirmed',
            createdAt: '2024-12-05',
            guestName: 'David Brown',
            guestEmail: 'david.brown@example.com',
            guestPhone: '+91 5432109876',
            guestAddress: '654 Forest View, Wayanad, Kerala 673121'
          }
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

  const handleEditProfile = () => {
    if (user) {
      setEditFormData({
        email: user.email || '',
        phone: user.phone || '',
        profilePicture: null
      });
      setPreviewImage(null);
      setIsEditingProfile(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setEditFormData({
      email: '',
      phone: '',
      profilePicture: null
    });
    setPreviewImage(null);
  };

  const compressImage = (file: File, maxWidth: number = 150, quality: number = 0.7): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        // Draw and compress the image
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }

      try {
        // Compress the image
        const compressedImage = await compressImage(file, 150, 0.8);

        // Check compressed size (rough estimate)
        const compressedSize = compressedImage.length * 0.75; // Base64 is ~33% larger than binary
        if (compressedSize > 100 * 1024) { // 100KB limit for localStorage
          // Try with lower quality
          const smallerImage = await compressImage(file, 100, 0.6);
          setPreviewImage(smallerImage);
        } else {
          setPreviewImage(compressedImage);
        }

        setEditFormData(prev => ({ ...prev, profilePicture: file }));
      } catch (error) {
        toast({
          title: "Error processing image",
          description: "Failed to process the selected image. Please try another image.",
          variant: "destructive"
        });
      }
    }
  };

  const handleSaveProfile = () => {
    if (!user) return;

    // Update user data
    const updatedUser = {
      ...user,
      email: editFormData.email,
      phone: editFormData.phone,
      profilePicture: previewImage || user.profilePicture
    };

    try {
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('profileUpdated', {
        detail: { user: updatedUser }
      }));

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });

      setIsEditingProfile(false);
      setEditFormData({
        email: '',
        phone: '',
        profilePicture: null
      });
      setPreviewImage(null);
    } catch (error) {
      // Handle localStorage quota exceeded error
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        toast({
          title: "Storage Limit Exceeded",
          description: "The profile picture is too large. Please select a smaller image.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Save Failed",
          description: "Failed to save profile. Please try again.",
          variant: "destructive"
        });
      }
    }
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

  const getBookingStatusMessage = useCallback((booking: Booking) => {
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
  }, []);

  // Memoized computed values for better performance
  const dashboardStats = useMemo(() => ({
    totalBookings: bookings.length + pastBookings.length + cancelledBookings.length,
    confirmedBookings: bookings.length,
    pastBookings: pastBookings.length,
    cancelledBookings: cancelledBookings.length,
    upcomingBookings: bookings.filter(b => new Date(b.checkIn) > new Date()).length
  }), [bookings, pastBookings, cancelledBookings]);

  const currentTabBookings = useMemo(() => {
    const sortByDate = (bookingList: Booking[]) => {
      return [...bookingList].sort((a, b) => {
        const dateA = new Date(a.checkIn);
        const dateB = new Date(b.checkIn);
        return dateA.getTime() - dateB.getTime(); // Earliest dates first
      });
    };

    switch (activeTab) {
      case 'confirmed':
        return sortByDate(bookings);
      case 'past':
        return sortByDate(pastBookings);
      case 'cancelled':
        return sortByDate(cancelledBookings);
      default:
        return sortByDate(bookings);
    }
  }, [activeTab, bookings, pastBookings, cancelledBookings]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface to-neutral dark:from-bg-primary dark:to-bg-secondary flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-tropical animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium text-forest-green">Loading Dashboard</p>
            <p className="text-sm text-gray-600 dark:text-text-secondary">Preparing your booking information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface to-neutral dark:from-bg-primary dark:to-bg-secondary dashboard-container">


      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-6 lg:py-8 max-w-7xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-primary dark:text-tropical hover:text-primary/80 dark:hover:text-tropical/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1"
              aria-label="Back to Home"
            >
              <ArrowLeft size={isMobile ? 16 : 20} className="mr-1 sm:mr-2" />
              <span className="text-sm sm:text-base font-medium">Home</span>
            </Link>
          </div>

          <div className="flex items-center">
            {/* Enhanced Profile Icon for All Screens */}
            <div className="relative">
              <Button
                onClick={() => setIsProfileModalOpen(true)}
                variant="outline"
                size={isMobile ? "sm" : "default"}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-tropical dark:text-tropical dark:hover:bg-tropical dark:hover:text-white dark:bg-bg-secondary/50 dark:backdrop-blur-sm relative profile-button-enhanced transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md dark:shadow-lg dark:shadow-black/20"
                aria-label="View Profile"
              >
                <div className="relative">
                  {user.profilePicture ? (
                    <div className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} rounded-full overflow-hidden border-2 border-white dark:border-gray-800`}>
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <UserCircle size={isMobile ? 16 : 22} className="drop-shadow-sm" />
                  )}
                  {/* Indicator dot */}
                  <div className={`absolute -top-0.5 -right-0.5 ${isMobile ? 'w-2 h-2' : 'w-3 h-3'} bg-green-500 rounded-full`}></div>
                </div>
                <span className="hidden sm:inline ml-2 font-medium text-sm lg:text-base">
                  {user.firstName}
                </span>
              </Button>

              {/* Tooltip for mobile */}
              {isMobile && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 pointer-events-none transition-opacity duration-200 hover:opacity-100 shadow-lg">
                  Profile
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <section className="text-center mb-6 sm:mb-8 lg:mb-12" aria-labelledby="welcome-heading">
          <div className="inline-block bg-primary/10 dark:bg-tropical/20 rounded-full px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 mb-3 sm:mb-4 lg:mb-6">
            <span className="text-primary dark:text-tropical font-semibold text-xs sm:text-sm">WELCOME BACK</span>
          </div>
          <h1
            id="welcome-heading"
            className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-poppins font-bold text-forest-green mb-2 sm:mb-3 lg:mb-4 leading-tight"
          >
            Welcome, <span className="text-tropical">{user.firstName}</span>!
          </h1>
          <p className="text-sm sm:text-base lg:text-xl text-gray-600 dark:text-text-secondary max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed">
            Manage your bookings and profile at Moon Valley Resort
          </p>
        </section>

        {/* Dashboard Stats */}
        <section className="mb-6 sm:mb-8" aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">Booking Statistics</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:gap-6">
            <Card className="bg-white dark:bg-bg-secondary rounded-lg sm:rounded-xl lg:rounded-2xl card-shadow border-0 dark:border dark:border-mist/20 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-forest-green mb-1">{dashboardStats.totalBookings}</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-text-secondary leading-tight">Total Bookings</div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-bg-secondary rounded-lg sm:rounded-xl lg:rounded-2xl card-shadow border-0 dark:border dark:border-mist/20 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{dashboardStats.confirmedBookings}</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-text-secondary leading-tight">Confirmed</div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-bg-secondary rounded-lg sm:rounded-xl lg:rounded-2xl card-shadow border-0 dark:border dark:border-mist/20 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{dashboardStats.pastBookings}</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-text-secondary leading-tight">Completed</div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-bg-secondary rounded-lg sm:rounded-xl lg:rounded-2xl card-shadow border-0 dark:border dark:border-mist/20 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600 dark:text-red-400 mb-1">{dashboardStats.cancelledBookings}</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-text-secondary leading-tight">Cancelled</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Content - Bookings Section */}
        <main className="w-full">
          {/* Tab Navigation */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6">
            <div className="flex gap-1 bg-gray-100 dark:bg-bg-secondary p-1 rounded-lg overflow-x-auto">
              {[
                { key: 'confirmed', label: 'Confirmed', count: dashboardStats.confirmedBookings },
                { key: 'past', label: 'Past', count: dashboardStats.pastBookings },
                { key: 'cancelled', label: 'Cancelled', count: dashboardStats.cancelledBookings }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${activeTab === tab.key
                    ? 'bg-white dark:bg-bg-primary text-primary dark:text-tropical shadow-sm'
                    : 'text-gray-600 dark:text-text-secondary hover:text-primary dark:hover:text-tropical'
                    }`}
                  aria-pressed={activeTab === tab.key}
                >
                  <span className="whitespace-nowrap">{tab.label}</span>
                  {tab.count > 0 && (
                    <Badge
                      variant="secondary"
                      className={`text-xs ${activeTab === tab.key
                        ? 'bg-primary/10 text-primary dark:bg-tropical/20 dark:text-tropical'
                        : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                    >
                      {tab.count}
                    </Badge>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
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
                className="bg-gradient-to-r from-primary to-tropical text-white hover:opacity-90 rounded-lg transition-all duration-300 hover:shadow-lg font-semibold flex-shrink-0"
                size={isMobile ? "sm" : "default"}
              >
                <Plus size={isMobile ? 14 : 16} className="mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">Book</span>
              </Button>
              <Button
                onClick={refreshBookings}
                variant="outline"
                disabled={isRefreshing}
                className="border-primary text-primary hover:bg-primary hover:text-white dark:border-tropical dark:text-tropical dark:hover:bg-tropical dark:hover:text-white disabled:opacity-50 flex-shrink-0"
                size={isMobile ? "sm" : "default"}
              >
                {isRefreshing ? (
                  <Loader2 size={isMobile ? 14 : 16} className={`${isMobile ? '' : 'mr-2'} animate-spin`} />
                ) : (
                  <RefreshCw size={isMobile ? 14 : 16} className={isMobile ? '' : 'mr-2'} />
                )}
                <span className="hidden sm:inline">Refresh</span>
              </Button>
            </div>
          </div>

          {/* Booking Content */}
          <div className="min-h-[300px] sm:min-h-[400px]">
            {currentTabBookings.length === 0 ? (
              <EmptyState activeTab={activeTab} onBookNow={() => {
                setLocation('/');
                setTimeout(() => {
                  const element = document.getElementById('accommodations');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }} />
            ) : (
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                {currentTabBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    activeTab={activeTab}
                    onViewDetails={openDetails}
                    onCancel={openCancelDialog}
                    canCancel={canCancelBooking(booking)}
                    getStatusMessage={getBookingStatusMessage}
                    formatDate={formatDate}
                    getStatusBadge={getStatusBadge}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            )}
          </div>
        </main>



        {/* Enhanced Profile Modal - All Screens */}
        <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
          <DialogContent className="max-w-[98vw] w-full sm:max-w-md lg:max-w-xl max-h-[95vh] overflow-y-auto bg-white dark:bg-bg-secondary border-0 rounded-2xl sm:rounded-3xl shadow-2xl mx-1 sm:mx-2 scrollbar-thin profile-modal-enhanced">
            <DialogHeader className="text-center pb-4 sm:pb-6 px-3 sm:px-4 bg-gradient-to-br from-primary/5 to-tropical/5 dark:from-primary/10 dark:to-tropical/10 -mx-4 sm:-mx-6 -mt-4 sm:-mt-6 pt-4 sm:pt-6 rounded-t-2xl sm:rounded-t-3xl">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary via-tropical to-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 relative overflow-hidden">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={24} className="sm:w-[28px] sm:h-[28px] lg:w-[36px] lg:h-[36px] text-white" />
                )}
              </div>
              <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-poppins font-bold text-forest-green mb-2 text-center">
                Demo User
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-text-secondary text-xs sm:text-sm text-center">
                Member since 2024 • Moon Valley Resort
              </DialogDescription>
            </DialogHeader>

            <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
              {/* Contact Information / Edit Form */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-lg sm:text-xl font-bold text-forest-green mb-3 sm:mb-4 lg:mb-6 flex items-center pb-2 border-b border-gray-200 dark:border-gray-600">
                  <User size={18} className="sm:w-[20px] sm:h-[20px] mr-2 sm:mr-3" />
                  {isEditingProfile ? 'Edit Profile' : 'Contact Information'}
                </h4>

                {!isEditingProfile ? (
                  <div className="grid gap-3 sm:gap-4">
                    <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-500">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="text-blue-600 dark:text-blue-400" size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-600 dark:text-text-secondary uppercase tracking-wide mb-1">Email Address</p>
                        <p className="text-sm sm:text-base font-semibold text-forest-green truncate">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-200 hover:border-green-300 dark:hover:border-green-500">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="text-green-600 dark:text-green-400" size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-600 dark:text-text-secondary uppercase tracking-wide mb-1">Phone Number</p>
                        <p className="text-sm sm:text-base font-semibold text-forest-green">{user.phone}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Profile Picture Upload */}
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <div className="w-24 h-24 profile-avatar-enhanced rounded-full flex items-center justify-center overflow-hidden border-4 border-primary/20 dark:border-tropical/30">
                          {previewImage ? (
                            <img src={previewImage} alt="Profile Preview" className="w-full h-full object-cover" />
                          ) : user.profilePicture ? (
                            <img src={user.profilePicture} alt="Current Profile" className="w-full h-full object-cover" />
                          ) : (
                            <User size={36} className="text-white" />
                          )}
                        </div>
                        <label htmlFor="profile-picture" className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary hover:bg-primary/90 dark:bg-tropical dark:hover:bg-tropical/90 rounded-full flex items-center justify-center cursor-pointer transition-colors shadow-lg">
                          <Camera size={16} className="text-white" />
                        </label>
                        <input
                          id="profile-picture"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Click the camera icon to upload a new profile picture</p>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="edit-email" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <Mail size={16} className="mr-2" />
                        Email Address
                      </Label>
                      <Input
                        id="edit-email"
                        type="email"
                        value={editFormData.email}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 focus:border-primary dark:focus:border-tropical rounded-lg h-12"
                        placeholder="Enter your email address"
                      />
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                      <Label htmlFor="edit-phone" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <Phone size={16} className="mr-2" />
                        Phone Number
                      </Label>
                      <Input
                        id="edit-phone"
                        type="tel"
                        value={editFormData.phone}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 focus:border-primary dark:focus:border-tropical rounded-lg h-12"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-500">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-purple-600 dark:text-purple-400" size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-600 dark:text-text-secondary uppercase tracking-wide mb-1">Location</p>
                    <p className="text-sm sm:text-base font-semibold text-forest-green">Kerala, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Statistics */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 sm:pt-6">
              <h4 className="text-lg sm:text-xl font-bold text-forest-green mb-3 sm:mb-4 lg:mb-6 flex items-center pb-2 border-b border-gray-200 dark:border-gray-600">
                <Calendar size={18} className="sm:w-[20px] sm:h-[20px] mr-2 sm:mr-3" />
                Booking Statistics
              </h4>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="text-center p-2 sm:p-3 lg:p-4 bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-700 rounded-lg sm:rounded-xl hover:shadow-lg hover:border-green-300 dark:hover:border-green-600 transition-all duration-200">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">{dashboardStats.confirmedBookings}</div>
                  <div className="text-xs font-bold text-green-700 dark:text-green-300 mt-1 uppercase tracking-wide">Active</div>
                </div>
                <div className="text-center p-2 sm:p-3 lg:p-4 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 rounded-lg sm:rounded-xl hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400">{dashboardStats.pastBookings}</div>
                  <div className="text-xs font-bold text-blue-700 dark:text-blue-300 mt-1 uppercase tracking-wide">Completed</div>
                </div>
                <div className="text-center p-2 sm:p-3 lg:p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-700 dark:text-gray-300">{dashboardStats.totalBookings}</div>
                  <div className="text-xs font-bold text-gray-600 dark:text-gray-400 mt-1 uppercase tracking-wide">Total</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              {!isEditingProfile ? (
                <Button
                  className="w-full bg-gradient-to-r from-primary to-tropical text-white hover:opacity-90 rounded-lg transition-all duration-300 hover:shadow-lg font-semibold profile-action-button"
                  onClick={handleEditProfile}
                >
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:opacity-90 rounded-lg transition-all duration-300 hover:shadow-lg font-semibold profile-action-button"
                    onClick={handleSaveProfile}
                  >
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-400 text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:border-gray-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 profile-action-button"
                    onClick={handleCancelEdit}
                  >
                    <X size={16} className="mr-2" />
                    Cancel
                  </Button>
                </div>
              )}



              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-4">
                <Button
                  onClick={() => {
                    handleLogout();
                    setIsProfileModalOpen(false);
                  }}
                  variant="outline"
                  className="w-full border-red-500 text-red-600 hover:bg-red-500 hover:text-white dark:border-red-400 dark:text-red-400 dark:hover:bg-red-500 profile-action-button"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Booking Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-[98vw] w-full sm:max-w-2xl lg:max-w-4xl max-h-[95vh] overflow-y-auto bg-white dark:bg-bg-secondary border-0 rounded-lg sm:rounded-2xl lg:rounded-3xl shadow-2xl mx-1 sm:mx-2 scrollbar-thin">
            <DialogHeader className="text-center pb-3 sm:pb-4 lg:pb-6 px-1 sm:px-2">
              <DialogTitle className="text-lg sm:text-xl lg:text-3xl font-poppins font-bold text-primary dark:text-text-primary">
                Booking Details
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-text-secondary text-sm sm:text-base lg:text-lg">
                Complete information about your reservation
              </DialogDescription>
            </DialogHeader>

            {selectedBooking && (
              <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
                {/* Booking ID Card */}
                <Card className="bg-gradient-to-r from-tropical to-secondary text-white border-0 shadow-lg sm:shadow-2xl rounded-xl sm:rounded-2xl lg:rounded-3xl">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <h2 className="text-lg sm:text-xl font-bold mb-2">Booking Reference</h2>
                    <p className="text-2xl sm:text-3xl font-mono font-bold tracking-wider">{selectedBooking?.id}</p>
                    <div className="flex items-center justify-center mt-3">
                      {selectedBooking && getStatusBadge(selectedBooking.status)}
                    </div>
                  </CardContent>
                </Card>

                {/* Guest Information */}
                <Card className="bg-white dark:bg-bg-secondary border-0 shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl lg:rounded-3xl">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-poppins font-bold text-primary dark:text-text-primary mb-4 sm:mb-6">
                      Guest Information
                    </h3>
                    <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-tropical/10 dark:bg-tropical/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                            <User className="w-5 h-5 sm:w-6 sm:h-6 text-tropical" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-text-secondary">Guest Name</p>
                            <p className="font-semibold text-sm sm:text-base text-primary dark:text-text-primary truncate">
                              {selectedBooking?.guestName || user?.firstName + ' ' + user?.lastName || 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-tropical/10 dark:bg-tropical/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-tropical" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-text-secondary">Email Address</p>
                            <p className="font-semibold text-sm sm:text-base text-primary dark:text-text-primary truncate">
                              {selectedBooking?.guestEmail || user?.email || 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-tropical/10 dark:bg-tropical/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0 mt-1">
                            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-tropical" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-text-secondary">Address</p>
                            <p className="font-semibold text-sm sm:text-base text-primary dark:text-text-primary">
                              {selectedBooking?.address || selectedBooking?.guestAddress || user?.address || 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-tropical/10 dark:bg-tropical/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-tropical" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-text-secondary">Phone Number</p>
                            <p className="font-semibold text-sm sm:text-base text-primary dark:text-text-primary">
                              {selectedBooking?.guestPhone || user?.phone || 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-tropical/10 dark:bg-tropical/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-tropical" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-text-secondary">Number of Guests</p>
                            <p className="font-semibold text-sm sm:text-base text-primary dark:text-text-primary">
                              {selectedBooking?.guests} Guest{(selectedBooking?.guests || 0) > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Booking Details */}
                <Card className="bg-white dark:bg-bg-secondary border-0 shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl lg:rounded-3xl">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-poppins font-bold text-primary dark:text-text-primary mb-4 sm:mb-6">
                      Reservation Details
                    </h3>

                    {/* Mobile-first single column layout, then responsive grid */}
                    <div className="space-y-4 sm:space-y-6">
                      {/* 1. Room Type */}
                      <div className="flex items-start">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/10 dark:bg-amber-500/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-1 flex-shrink-0">
                          <Home className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-text-secondary">Room Type</p>
                          <p className="font-semibold text-primary dark:text-text-primary text-base sm:text-lg">{selectedBooking?.roomName}</p>
                        </div>
                      </div>

                      {/* 2. Check-in */}
                      <div className="flex items-start">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/10 dark:bg-green-500/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-1 flex-shrink-0">
                          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-text-secondary">Check-in</p>
                          <p className="font-semibold text-primary dark:text-text-primary text-sm sm:text-base">{selectedBooking?.checkIn && formatDate(selectedBooking.checkIn)}</p>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-text-secondary">After 2:00 PM</p>
                        </div>
                      </div>

                      {/* 3. Duration */}
                      <div className="flex items-start">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/10 dark:bg-blue-500/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-1 flex-shrink-0">
                          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-text-secondary">Duration</p>
                          <p className="font-semibold text-primary dark:text-text-primary text-base sm:text-lg">
                            {selectedBooking?.checkIn && selectedBooking?.checkOut && (() => {
                              const nights = calculateNights(selectedBooking.checkIn, selectedBooking.checkOut);
                              return `${nights} Night${nights > 1 ? 's' : ''}`;
                            })()}
                          </p>
                        </div>
                      </div>

                      {/* 4. Check-out */}
                      <div className="flex items-start">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/10 dark:bg-orange-500/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-1 flex-shrink-0">
                          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-text-secondary">Check-out</p>
                          <p className="font-semibold text-primary dark:text-text-primary text-sm sm:text-base">{selectedBooking?.checkOut && formatDate(selectedBooking.checkOut)}</p>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-text-secondary">Before 11:00 AM</p>
                        </div>
                      </div>

                      {/* 5. Booked On */}
                      <div className="flex items-start">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/10 dark:bg-purple-500/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-1 flex-shrink-0">
                          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-text-secondary">Booked On</p>
                          <p className="font-semibold text-primary dark:text-text-primary text-sm sm:text-base">{selectedBooking?.createdAt && formatDate(selectedBooking.createdAt)}</p>
                        </div>
                      </div>

                      {/* 6. Total Amount */}
                      <div className="flex items-start">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-1 flex-shrink-0">
                          <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-text-secondary">Total Amount</p>
                          <p className="font-bold text-xl sm:text-2xl text-emerald-600 dark:text-emerald-400">₹{selectedBooking?.totalAmount?.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {selectedBooking?.specialRequests && (
                      <div className="mt-4 sm:mt-6 lg:mt-8 p-4 sm:p-6 bg-tropical/10 dark:bg-bg-primary rounded-lg sm:rounded-xl lg:rounded-2xl">
                        <h4 className="font-semibold text-primary dark:text-text-primary mb-2 text-sm sm:text-base">Special Requests</h4>
                        <p className="text-gray-700 dark:text-text-secondary text-xs sm:text-sm">{selectedBooking.specialRequests}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Resort Contact Information */}
                <Card className="bg-white dark:bg-bg-secondary border-0 shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl lg:rounded-3xl">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-poppins font-bold text-primary dark:text-text-primary mb-4 sm:mb-6">
                      Resort Contact Information
                    </h3>
                    <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-tropical mr-3 mt-1 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-primary dark:text-text-primary text-sm sm:text-base">Moon Valley Resort</p>
                            <p className="text-gray-600 dark:text-text-secondary text-xs sm:text-sm">Palakkayam Thattu, Alakode</p>
                            <p className="text-gray-600 dark:text-text-secondary text-xs sm:text-sm">Kannur 670571, Kerala, India</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-tropical mr-3 mt-1 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-primary dark:text-text-primary text-sm sm:text-base">+91 9446986882</p>
                            <p className="text-gray-600 dark:text-text-secondary text-xs sm:text-sm">24/7 Support Available</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start">
                          <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-tropical mr-3 mt-1 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-primary dark:text-text-primary text-sm sm:text-base break-all">bookings@moonvalleyresort.com</p>
                            <p className="text-gray-600 dark:text-text-secondary text-xs sm:text-sm">For booking inquiries</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-tropical mr-3 mt-1 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-primary dark:text-text-primary text-sm sm:text-base">Best visiting hours</p>
                            <p className="text-gray-600 dark:text-text-secondary text-xs sm:text-sm">6-7:30 AM or 5-6:30 PM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Important Information */}
                <Card className="bg-gradient-to-r from-tropical/10 to-secondary/10 dark:from-tropical/20 dark:to-secondary/20 border-0 rounded-xl sm:rounded-2xl lg:rounded-3xl">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-primary dark:text-text-primary mb-3 sm:mb-4">Important Information</h3>
                    <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 text-xs sm:text-sm">
                      <div>
                        <h4 className="font-semibold text-primary dark:text-text-primary mb-2 text-sm sm:text-base">Check-in Policy</h4>
                        <ul className="space-y-1 text-gray-600 dark:text-text-secondary">
                          <li>• Check-in: 2:00 PM onwards</li>
                          <li>• Valid ID required at check-in</li>
                          <li>• Early check-in subject to availability</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary dark:text-text-primary mb-2 text-sm sm:text-base">Check-out Policy</h4>
                        <ul className="space-y-1 text-gray-600 dark:text-text-secondary">
                          <li>• Check-out: 11:00 AM</li>
                          <li>• Late check-out available (charges apply)</li>
                          <li>• Express check-out available</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary dark:text-text-primary mb-2 text-sm sm:text-base">Cancellation Policy</h4>
                        <ul className="space-y-1 text-gray-600 dark:text-text-secondary">
                          <li>• Free cancellation 48 hours before</li>
                          <li>• 50% refund 24-48 hours before</li>
                          <li>• No refund within 24 hours</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary dark:text-text-primary mb-2 text-sm sm:text-base">What to Bring</h4>
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
          <DialogContent className="max-w-[90vw] w-full sm:max-w-sm max-h-[80vh] overflow-y-auto dialog-no-scrollbar bg-white dark:bg-bg-secondary border-0 rounded-xl sm:rounded-2xl shadow-xl" style={{ marginLeft: '5vw', marginRight: '5vw' }}>
            <div className="text-center p-4 sm:p-4">
              {/* Warning Icon */}
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-xl font-poppins font-bold text-red-600 dark:text-red-400 mb-4">
                Cancel Booking?
              </h3>

              {/* Booking Details */}
              {bookingToCancel && (
                <div className="bg-gray-50 dark:bg-bg-primary rounded-xl p-4 mb-5 text-left">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500 dark:text-text-secondary">Room</span>
                    <span className="font-semibold text-base text-primary dark:text-text-primary">{bookingToCancel?.roomName}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500 dark:text-text-secondary">Dates</span>
                    <span className="font-semibold text-base text-primary dark:text-text-primary">
                      {bookingToCancel?.checkIn && bookingToCancel?.checkOut &&
                        `${new Date(bookingToCancel.checkIn).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} - ${new Date(bookingToCancel.checkOut).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-text-secondary">Total Amount</span>
                    <span className="font-bold text-lg text-primary dark:text-text-primary">₹{bookingToCancel?.totalAmount?.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Warning Message */}
              <p className="text-base text-gray-600 dark:text-text-secondary mb-6 leading-relaxed">
                This action cannot be undone. Your booking will be cancelled and you may be subject to our cancellation policy.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => setIsCancelOpen(false)}
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-xl py-3 font-semibold text-base"
                >
                  Keep Booking
                </Button>
                <Button
                  onClick={confirmCancel}
                  className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 font-semibold text-base"
                >
                  Yes, Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Cancellation Policy Confirmation Dialog */}
        <Dialog open={isPolicyOpen} onOpenChange={setIsPolicyOpen}>
          <DialogContent className="max-w-[90vw] w-full sm:max-w-sm max-h-[85vh] overflow-y-auto dialog-no-scrollbar bg-white dark:bg-bg-secondary border-0 rounded-xl shadow-xl" style={{ marginLeft: '5vw', marginRight: '5vw' }}>
            <div className="text-center p-4 sm:p-4">
              {/* Info Icon */}
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-lg font-poppins font-bold text-blue-600 dark:text-blue-400 mb-3">
                Cancellation Policy
              </h3>

              {/* Policy Details */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3 text-left">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 text-xs">Review cancellation policy:</h4>
                {bookingToCancel && (() => {
                  const refundInfo = calculateRefundAmount(bookingToCancel.checkIn, bookingToCancel.totalAmount);
                  const now = new Date();
                  const checkInDate = new Date(bookingToCancel.checkIn);
                  const hoursUntilCheckIn = Math.max(0, (checkInDate.getTime() - now.getTime()) / (1000 * 60 * 60));
                  const daysUntilCheckIn = Math.ceil(hoursUntilCheckIn / 24);

                  return (
                    <div className="space-y-2">
                      {/* Time Remaining */}
                      <div className="bg-white dark:bg-blue-900/30 rounded-lg p-2 mb-2">
                        <div className="text-center mb-1">
                          <span className="text-xs text-blue-600 dark:text-blue-300">Time until check-in</span>
                        </div>
                        <div className="text-center">
                          <span className="text-sm font-bold text-blue-800 dark:text-blue-200">
                            {daysUntilCheckIn > 0 ? `${daysUntilCheckIn} day${daysUntilCheckIn > 1 ? 's' : ''}` : `${Math.ceil(hoursUntilCheckIn)} hour${Math.ceil(hoursUntilCheckIn) > 1 ? 's' : ''}`}
                          </span>
                        </div>
                      </div>

                      {/* Policy Breakdown */}
                      <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300 mb-2">
                        <div className={`flex items-center justify-between p-2 rounded ${hoursUntilCheckIn >= 48 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                            <strong>48+ hrs:</strong> Full refund
                          </span>
                          <span className={`font-semibold ${hoursUntilCheckIn >= 48 ? 'text-green-700 dark:text-green-300' : 'text-gray-500'}`}>
                            {hoursUntilCheckIn >= 48 ? '✓' : '✗'}
                          </span>
                        </div>
                        <div className={`flex items-center justify-between p-2 rounded ${hoursUntilCheckIn >= 24 && hoursUntilCheckIn < 48 ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                            <strong>24-48 hrs:</strong> 50% refund
                          </span>
                          <span className={`font-semibold ${hoursUntilCheckIn >= 24 && hoursUntilCheckIn < 48 ? 'text-yellow-700 dark:text-yellow-300' : 'text-gray-500'}`}>
                            {hoursUntilCheckIn >= 24 && hoursUntilCheckIn < 48 ? '✓' : '✗'}
                          </span>
                        </div>
                        <div className={`flex items-center justify-between p-2 rounded ${hoursUntilCheckIn < 24 ? 'bg-red-100 dark:bg-red-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                            <strong>&lt;24 hrs:</strong> No refund
                          </span>
                          <span className={`font-semibold ${hoursUntilCheckIn < 24 ? 'text-red-700 dark:text-red-300' : 'text-gray-500'}`}>
                            {hoursUntilCheckIn < 24 ? '✓' : '✗'}
                          </span>
                        </div>
                      </div>

                      {/* Detailed Calculation Breakdown */}
                      <div className="bg-white dark:bg-blue-900/30 rounded-lg p-2">
                        <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 text-center text-xs">Refund Calculation</h5>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between items-center py-1 border-b border-blue-100 dark:border-blue-800">
                            <span className="text-blue-700 dark:text-blue-300">Total Amount:</span>
                            <span className="font-semibold text-blue-800 dark:text-blue-200 text-sm">₹{bookingToCancel?.totalAmount?.toLocaleString()}</span>
                          </div>

                          {hoursUntilCheckIn >= 48 ? (
                            <div className="flex justify-between items-center py-1 border-b border-blue-100 dark:border-blue-800">
                              <span className="text-green-600 dark:text-green-400">Charges:</span>
                              <span className="font-semibold text-green-600 dark:text-green-400 text-sm">₹0</span>
                            </div>
                          ) : hoursUntilCheckIn >= 24 ? (
                            <div className="flex justify-between items-center py-1 border-b border-blue-100 dark:border-blue-800">
                              <span className="text-yellow-600 dark:text-yellow-400">Charges:</span>
                              <span className="font-semibold text-yellow-600 dark:text-yellow-400 text-sm">₹{((bookingToCancel?.totalAmount || 0) * 0.5).toLocaleString()}</span>
                            </div>
                          ) : (
                            <div className="flex justify-between items-center py-1 border-b border-blue-100 dark:border-blue-800">
                              <span className="text-red-600 dark:text-red-400">Charges:</span>
                              <span className="font-semibold text-red-600 dark:text-red-400 text-sm">₹{bookingToCancel?.totalAmount?.toLocaleString()}</span>
                            </div>
                          )}

                          <div className="flex justify-between items-center py-2 bg-green-50 dark:bg-green-900/20 rounded px-2 mt-2">
                            <span className="font-bold text-green-700 dark:text-green-300 text-sm">Refund:</span>
                            <span className="font-bold text-base text-green-600 dark:text-green-400">₹{refundInfo.amount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Final Warning */}
              <p className="text-gray-600 dark:text-text-secondary mb-4 leading-relaxed text-sm">
                <strong>Final confirmation:</strong> Are you sure you want to cancel? This will be processed immediately.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={closeAllDialogs}
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-xl py-3 font-semibold text-base"
                >
                  Keep Booking
                </Button>
                <Button
                  onClick={finalCancel}
                  className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 font-semibold text-base"
                >
                  Cancel & Refund
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div >
  );
}