import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import RoomsSection from "@/components/rooms-section";
import AmenitiesSection from "@/components/amenities-section";
import ActivitiesSection from "@/components/activities-section";
import GallerySection from "@/components/gallery-section";
import BookingSection from "@/components/booking-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="font-inter text-gray-800">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <RoomsSection />
      <AmenitiesSection />
      <ActivitiesSection />
      <GallerySection />
      <BookingSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
