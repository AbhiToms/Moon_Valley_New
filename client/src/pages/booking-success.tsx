import BookingSuccess from "@/components/booking-success";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <BookingSuccess />
      <Footer />
    </div>
  );
}