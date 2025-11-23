import { useState, useEffect, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  User, Calendar, MapPin, Phone, Mail, LogOut, Plus, Edit, ArrowLeft, Clock,
  CheckCircle, XCircle, Users, RefreshCw, Loader2, UserCircle, Camera, Save, X,
  IndianRupee, Home
} from "lucide-react";
import { Link } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useAuth } from "@/lib/auth";

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
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
  name: string;
  email: string;
  phone: string;
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

const BookingCard = ({
  booking, activeTab, onViewDetails, onCancel, canCancel,
  getStatusMessage, formatDate, getStatusBadge, isMobile
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
                {booking.roomType}
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
              {!isCancelled && (
                <p className="text-xs sm:text-sm font-medium text-primary dark:text-tropical">
                  {getStatusMessage(booking)}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 lg:flex-col lg:space-y-2 lg:space-x-0">
            <Button size={isMobile ? "sm" : "default"} variant="outline" className={`w-full sm:w-auto ${isPast || isCancelled ? 'border-gray-400 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300' : 'border-primary text-primary hover:bg-primary hover:text-white dark:border-tropical dark:text-tropical dark:hover:bg-tropical dark:hover:text-white'}`} onClick={() => onViewDetails(booking)}>
              <span className="text-xs sm:text-sm">{isPast || isCancelled ? 'View Details' : 'More Details'}</span>
            </Button>
            {activeTab === 'confirmed' && (
              <Button size={isMobile ? "sm" : "default"} variant="outline" className="w-full sm:w-auto border-red-500 text-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => onCancel(booking)} disabled={!canCancel} title={!canCancel ? "Cannot cancel this booking" : "Cancel booking"}>
                <span className="text-xs sm:text-sm">Cancel</span>
              </Button>
            )}
            {activeTab === 'past' && (
              <Button size={isMobile ? "sm" : "default"} variant="outline" className="w-full sm:w-auto border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
                <span className="text-xs sm:text-sm">Book Again</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyState = ({ activeTab, onBookNow }: EmptyStateProps) => {
  const getEmptyStateContent = () => {
    switch (activeTab) {
      case 'confirmed': return { icon: <Calendar className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto mb-4" />, title: 'No Confirmed Bookings Yet', description: 'Your confirmed bookings will appear here after successful payment.', action: 'Book Your Stay' };
      case 'past': return { icon: <CheckCircle className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto mb-4" />, title: 'No Past Bookings', description: 'Your completed stays will appear here.', action: 'Book Your First Stay' };
      case 'cancelled': return { icon: <XCircle className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto mb-4" />, title: 'No Cancelled Bookings', description: 'Any cancelled bookings will appear here.', action: 'Make a Booking' };
      default: return { icon: <Calendar className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto mb-4" />, title: 'No Bookings', description: 'Your bookings will appear here.', action: 'Book Now' };
    }
  };
  const content = getEmptyStateContent();
  return (
    <Card className="bg-white dark:bg-bg-secondary rounded-lg sm:rounded-xl lg:rounded-2xl card-shadow border-0 dark:border dark:border-mist/20">
      <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
        {content.icon}
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-600 dark:text-text-secondary mb-2">{content.title}</h3>
        <p className="text-sm sm:text-base text-gray-500 dark:text-text-secondary mb-4 sm:mb-6 max-w-md mx-auto leading-relaxed">{content.description}</p>
        <Button onClick={onBookNow} className="bg-gradient-to-r from-primary to-tropical text-white hover:opacity-90 rounded-lg transition-all duration-300 hover:shadow-lg font-semibold w-full sm:w-auto" size="default">
          <span className="text-sm sm:text-base">{content.action}</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default function DashboardPage() {
  const { user, logoutMutation, isLoading: isAuthLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cancelledBookings, setCancelledBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'confirmed' | 'past' | 'cancelled'>('confirmed');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({ email: '', phone: '', profilePicture: null as File | null });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const handleLogout = () => logoutMutation.mutate();

  const openDetails = (booking: Booking) => { setSelectedBooking(booking); setIsDetailsOpen(true); };
  const openCancelDialog = (booking: Booking) => { setBookingToCancel(booking); setIsCancelOpen(true); };
  const isBookingPast = (checkOut: string) => { const today = new Date(); const checkOutDate = new Date(checkOut); today.setHours(0, 0, 0, 0); checkOutDate.setHours(0, 0, 0, 0); return today > checkOutDate; };
  const canCancelBooking = (booking: Booking) => { const now = new Date(); const checkInDate = new Date(booking.checkIn); if (isBookingPast(booking.checkOut)) return false; const hoursUntilCheckIn = (checkInDate.getTime() - now.getTime()) / (1000 * 60 * 60); if (hoursUntilCheckIn <= 1 && hoursUntilCheckIn >= 0) return false; return booking.status === 'confirmed'; };
  const handleEditProfile = () => { if (user) { setEditFormData({ email: user.email || '', phone: user.phone || '', profilePicture: null }); setPreviewImage(null); setIsEditingProfile(true); } };
  const handleCancelEdit = () => { setIsEditingProfile(false); setEditFormData({ email: '', phone: '', profilePicture: null }); setPreviewImage(null); };

  const compressImage = (file: File, maxWidth: number = 150, quality: number = 0.7): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d'); const img = new Image();
      img.onload = () => { const ratio = Math.min(maxWidth / img.width, maxWidth / img.height); canvas.width = img.width * ratio; canvas.height = img.height * ratio; ctx?.drawImage(img, 0, 0, canvas.width, canvas.height); const compressedDataUrl = canvas.toDataURL('image/jpeg', quality); resolve(compressedDataUrl); };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { toast({ title: "File too large", description: "Please select an image smaller than 5MB.", variant: "destructive" }); return; }
      try {
        const compressedImage = await compressImage(file, 150, 0.8);
        const compressedSize = compressedImage.length * 0.75;
        if (compressedSize > 100 * 1024) { const smallerImage = await compressImage(file, 100, 0.6); setPreviewImage(smallerImage); } else { setPreviewImage(compressedImage); }
        setEditFormData(prev => ({ ...prev, profilePicture: file }));
      } catch (error) { toast({ title: "Error processing image", description: "Failed to process the selected image.", variant: "destructive" }); }
    }
  };

  const handleSaveProfile = () => {
    if (!user) return;
    const updatedUser = { ...user, email: editFormData.email, phone: editFormData.phone, profilePicture: previewImage || user.profilePicture };
    try {
      localStorage.setItem('user', JSON.stringify(updatedUser));
      // Note: This won't update the useAuth user, but we keep it for local consistency if needed
      window.dispatchEvent(new CustomEvent('profileUpdated', { detail: { user: updatedUser } }));
      toast({ title: "Profile Updated", description: "Your profile has been successfully updated." });
      setIsEditingProfile(false); setEditFormData({ email: '', phone: '', profilePicture: null }); setPreviewImage(null);
    } catch (error) { toast({ title: "Save Failed", description: "Failed to save profile.", variant: "destructive" }); }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed': return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"><CheckCircle size={14} className="mr-1" />Confirmed</Badge>;
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"><Clock size={14} className="mr-1" />Pending</Badge>;
      case 'cancelled': return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"><XCircle size={14} className="mr-1" />Cancelled</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => { return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); };
  const calculateNights = (checkIn: string, checkOut: string) => Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
  const getBookingStatusMessage = useCallback((booking: Booking) => {
    const now = new Date(); const checkInDate = new Date(booking.checkIn); const checkOutDate = new Date(booking.checkOut);
    if (isBookingPast(booking.checkOut)) return "Stay completed";
    if (now >= checkInDate && now <= checkOutDate) return "Currently staying";
    if (now < checkInDate) { const daysUntilCheckIn = Math.ceil((checkInDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)); if (daysUntilCheckIn === 0) return "Check-in today"; if (daysUntilCheckIn === 1) return "Check-in tomorrow"; return `Check-in in ${daysUntilCheckIn} days`; }
    return "Upcoming";
  }, []);

  // Query for bookings
  const { data: bookingsData, isLoading: isBookingsLoading, refetch: refetchBookings } = useQuery<Booking[]>({
    queryKey: ["/api/bookings", user?.email],
    queryFn: () => apiRequest("GET", `/api/bookings?email=${user?.email}`).then(res => res.json()),
    enabled: !!user?.email,
  });

  useEffect(() => {
    console.log("Dashboard: bookingsData received:", bookingsData);
    if (bookingsData) {
      const confirmed = bookingsData.filter(booking => booking.status === 'confirmed' && !isBookingPast(booking.checkOut));
      const cancelled = bookingsData.filter(booking => booking.status === 'cancelled');
      const past = bookingsData.filter(booking => booking.status === 'confirmed' && isBookingPast(booking.checkOut));
      console.log("Dashboard: Filtered bookings - Confirmed:", confirmed, "Cancelled:", cancelled, "Past:", past);
      setBookings(confirmed);
      setCancelledBookings(cancelled);
      setPastBookings(past);
      setIsLoading(false);
    } else if (!isBookingsLoading) {
      setIsLoading(false);
    }
  }, [bookingsData, isBookingsLoading]);

  const refreshBookings = useCallback(async () => {
    setIsRefreshing(true);
    await refetchBookings();
    setIsRefreshing(false);
  }, [refetchBookings]);

  const handleCancel = (bookingId: string) => {
    // In a real app, this would be an API call. For now we'll just update local state.
    // TODO: Implement API endpoint for cancellation
    const bookingToCancel = bookings.find(b => b.id === bookingId);
    if (bookingToCancel) {
      setBookings(prev => prev.filter(b => b.id !== bookingId));
      const cancelledBooking = { ...bookingToCancel, status: 'cancelled' as const };
      setCancelledBookings(prev => [...prev, cancelledBooking]);
      toast({ title: 'Booking Cancelled', description: 'Your booking has been cancelled.', duration: 6000 });
    }
  };

  const confirmCancel = () => { if (bookingToCancel && !canCancelBooking(bookingToCancel)) { toast({ title: "Cannot Cancel", description: "This booking can no longer be cancelled.", variant: "destructive" }); setIsCancelOpen(false); setBookingToCancel(null); return; } setIsCancelOpen(false); setIsPolicyOpen(true); };
  const finalCancel = () => { if (bookingToCancel) { handleCancel(bookingToCancel.id); } setIsPolicyOpen(false); setBookingToCancel(null); };
  const closeAllDialogs = () => { setIsCancelOpen(false); setIsPolicyOpen(false); setBookingToCancel(null); };
  const calculateRefundAmount = (checkIn: string, totalAmount: number) => { const now = new Date(); const checkInDate = new Date(checkIn); const hoursUntilCheckIn = (checkInDate.getTime() - now.getTime()) / (1000 * 60 * 60); if (hoursUntilCheckIn >= 48) { return { amount: totalAmount, percentage: 100, policy: 'Free cancellation, full refund' }; } else if (hoursUntilCheckIn >= 24) { return { amount: totalAmount * 0.5, percentage: 50, policy: '50% refund' }; } else { return { amount: 0, percentage: 0, policy: 'No refund' }; } };

  const dashboardStats = useMemo(() => ({ totalBookings: bookings.length + pastBookings.length + cancelledBookings.length, confirmedBookings: bookings.length, pastBookings: pastBookings.length, cancelledBookings: cancelledBookings.length, upcomingBookings: bookings.filter(b => new Date(b.checkIn) > new Date()).length }), [bookings, pastBookings, cancelledBookings]);
  const currentTabBookings = useMemo(() => {
    const sortByDate = (bookingList: Booking[]) => { return [...bookingList].sort((a, b) => { const dateA = new Date(a.checkIn); const dateB = new Date(b.checkIn); return dateA.getTime() - dateB.getTime(); }); };
    switch (activeTab) { case 'confirmed': return sortByDate(bookings); case 'past': return sortByDate(pastBookings); case 'cancelled': return sortByDate(cancelledBookings); default: return sortByDate(bookings); }
  }, [activeTab, bookings, pastBookings, cancelledBookings]);

  if (isLoading || isAuthLoading) {
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

  if (!user) { return null; }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface to-neutral dark:from-bg-primary dark:to-bg-secondary dashboard-container">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-6 lg:py-8 max-w-7xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center">
            <Link href="/" className="inline-flex items-center text-primary dark:text-tropical hover:text-primary/80 dark:hover:text-tropical/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1" aria-label="Back to Home">
              <ArrowLeft size={isMobile ? 16 : 20} className="mr-1 sm:mr-2" />
              <span className="text-sm sm:text-base font-medium">Home</span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <Button onClick={() => setIsProfileModalOpen(true)} variant="outline" size={isMobile ? "sm" : "default"} className="border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-tropical dark:text-tropical dark:hover:bg-tropical dark:hover:text-white dark:bg-bg-secondary/50 dark:backdrop-blur-sm relative profile-button-enhanced transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md dark:shadow-lg dark:shadow-black/20" aria-label="View Profile">
                <div className="relative">
                  {user.profilePicture ? (
                    <div className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} rounded-full overflow-hidden border-2 border-white dark:border-gray-800`}>
                      <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <UserCircle size={isMobile ? 16 : 22} className="drop-shadow-sm" />
                  )}
                  <div className={`absolute -top-0.5 -right-0.5 ${isMobile ? 'w-2 h-2' : 'w-3 h-3'} bg-green-500 rounded-full`}></div>
                </div>
                <span className="hidden sm:inline ml-2 font-medium text-sm lg:text-base">{user.firstName}</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <section className="text-center mb-6 sm:mb-8 lg:mb-12" aria-labelledby="welcome-heading">
          <div className="inline-block bg-primary/10 dark:bg-tropical/20 rounded-full px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 mb-3 sm:mb-4 lg:mb-6">
            <span className="text-primary dark:text-tropical font-semibold text-xs sm:text-sm">WELCOME BACK</span>
          </div>
          <h1 id="welcome-heading" className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-poppins font-bold text-forest-green mb-2 sm:mb-3 lg:mb-4 leading-tight">
            Welcome, <span className="text-tropical">{user.firstName}</span>!
          </h1>
          <p className="text-sm sm:text-base lg:text-xl text-gray-600 dark:text-text-secondary max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed">Manage your bookings and profile at Moon Valley Resort</p>
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
              {[{ key: 'confirmed', label: 'Confirmed', count: dashboardStats.confirmedBookings }, { key: 'past', label: 'Past', count: dashboardStats.pastBookings }, { key: 'cancelled', label: 'Cancelled', count: dashboardStats.cancelledBookings }].map((tab) => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key as typeof activeTab)} className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${activeTab === tab.key ? 'bg-white dark:bg-bg-primary text-primary dark:text-tropical shadow-sm' : 'text-gray-600 dark:text-text-secondary hover:text-primary dark:hover:text-tropical'}`}>
                  <span>{tab.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.key ? 'bg-primary/10 text-primary dark:bg-tropical/20 dark:text-tropical' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>{tab.count}</span>
                </button>
              ))}
            </div>
            <Button onClick={refreshBookings} variant="outline" size="sm" className="hidden sm:flex items-center gap-2" disabled={isRefreshing}>
              <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
              Refresh
            </Button>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {currentTabBookings.length > 0 ? (
              currentTabBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} activeTab={activeTab} onViewDetails={openDetails} onCancel={openCancelDialog} canCancel={canCancelBooking(booking)} getStatusMessage={getBookingStatusMessage} formatDate={formatDate} getStatusBadge={getStatusBadge} isMobile={isMobile} />
              ))
            ) : (
              <EmptyState activeTab={activeTab} onBookNow={() => setLocation('/')} />
            )}
          </div>
        </main>
      </div>

      {/* Profile Modal */}
      <Dialog open={isProfileModalOpen} onOpenChange={(open) => { setIsProfileModalOpen(open); if (!open) setIsEditingProfile(false); }}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-bg-secondary border-0 dark:border dark:border-mist/20">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-forest-green dark:text-tropical">My Profile</DialogTitle>
            <DialogDescription>Manage your personal information</DialogDescription>
          </DialogHeader>
          <div className="py-4 sm:py-6">
            <div className="flex flex-col items-center mb-6 sm:mb-8">
              <div className="relative group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white dark:border-bg-primary shadow-lg mb-3 sm:mb-4">
                  {isEditingProfile && previewImage ? (
                    <img src={previewImage} alt="Profile Preview" className="w-full h-full object-cover" />
                  ) : user.profilePicture ? (
                    <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                      <UserCircle size={48} />
                    </div>
                  )}
                </div>
                {isEditingProfile && (
                  <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-primary/90 transition-colors">
                    <Camera size={16} />
                    <input id="profile-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Member since {new Date().getFullYear()}</p>
            </div>

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                {isEditingProfile ? (
                  <Input id="email" value={editFormData.email} onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })} className="bg-gray-50 dark:bg-bg-primary" />
                ) : (
                  <div className="flex items-center text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-bg-primary p-3 rounded-md">
                    <Mail size={18} className="mr-3 text-gray-400" />
                    {user.email}
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                {isEditingProfile ? (
                  <Input id="phone" value={editFormData.phone} onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })} className="bg-gray-50 dark:bg-bg-primary" />
                ) : (
                  <div className="flex items-center text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-bg-primary p-3 rounded-md">
                    <Phone size={18} className="mr-3 text-gray-400" />
                    {user.phone || 'Not provided'}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-4">
            {isEditingProfile ? (
              <>
                <Button variant="outline" onClick={handleCancelEdit} className="w-full sm:w-auto">Cancel</Button>
                <Button onClick={handleSaveProfile} className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90">Save Changes</Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900/30">
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
                <Button onClick={handleEditProfile} className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90">
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white dark:bg-bg-secondary border-0 dark:border dark:border-mist/20 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-forest-green dark:text-tropical">Booking Details</DialogTitle>
            <DialogDescription>Booking ID: {selectedBooking?.id}</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6 py-4">
              <div className="bg-gray-50 dark:bg-bg-primary p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg text-forest-green dark:text-tropical">{selectedBooking.roomType}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{calculateNights(selectedBooking.checkIn, selectedBooking.checkOut)} Nights • {selectedBooking.guests} Guests</p>
                  </div>
                  {getStatusBadge(selectedBooking.status)}
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check-in</p>
                    <p className="font-medium">{formatDate(selectedBooking.checkIn)}</p>
                    <p className="text-xs text-gray-400">2:00 PM</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check-out</p>
                    <p className="font-medium">{formatDate(selectedBooking.checkOut)}</p>
                    <p className="text-xs text-gray-400">11:00 AM</p>
                  </div>
                  <span>₹{selectedBooking.totalAmount.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Includes all taxes and fees</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Booking Dialog */}
      <AlertDialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
        <AlertDialogContent className="bg-white dark:bg-bg-secondary border-0 dark:border dark:border-mist/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600 dark:text-red-400">Cancel Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your booking for {bookingToCancel?.roomType}?
              <br /><br />
              <span className="font-medium text-gray-900 dark:text-white">Cancellation Policy:</span>
              <ul className="list-disc list-inside mt-1 text-sm">
                <li>Free cancellation up to 48 hours before check-in</li>
                <li>50% refund up to 24 hours before check-in</li>
                <li>No refund within 24 hours of check-in</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel} className="bg-red-600 hover:bg-red-700 text-white border-0">Proceed to Cancel</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancellation Policy Confirmation Dialog */}
      <AlertDialog open={isPolicyOpen} onOpenChange={setIsPolicyOpen}>
        <AlertDialogContent className="bg-white dark:bg-bg-secondary border-0 dark:border dark:border-mist/20">
          <AlertDialogHeader>
            <AlertDialogTitle>Refund Details</AlertDialogTitle>
            <AlertDialogDescription>
              Based on the cancellation policy:
              <div className="mt-4 p-4 bg-gray-50 dark:bg-bg-primary rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>Refund Amount:</span>
                  <span className="font-bold text-forest-green dark:text-tropical">
                    ₹{bookingToCancel ? calculateRefundAmount(bookingToCancel.checkIn, bookingToCancel.totalAmount).amount.toLocaleString() : 0}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {bookingToCancel ? calculateRefundAmount(bookingToCancel.checkIn, bookingToCancel.totalAmount).policy : ''}
                </p>
              </div>
              <p className="mt-4 text-sm">The refund will be processed to your original payment method within 5-7 business days.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeAllDialogs}>Go Back</AlertDialogCancel>
            <AlertDialogAction onClick={finalCancel} className="bg-red-600 hover:bg-red-700 text-white border-0">Confirm Cancellation</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}