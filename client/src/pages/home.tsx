import { lazy, Suspense } from "react";
import { usePerformance } from "@/hooks/usePerformance";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";

// Lazy load non-critical sections
const AboutSection = lazy(() => import("@/components/about-section"));
const RoomsSection = lazy(() => import("@/components/rooms-section"));
const AmenitiesSection = lazy(() => import("@/components/amenities-section"));
const GallerySection = lazy(() => import("@/components/gallery-section"));
const BookingSection = lazy(() => import("@/components/booking-section"));
const TestimonialsSection = lazy(() => import("@/components/testimonials-section"));
const ContactSection = lazy(() => import("@/components/contact-section"));
const Footer = lazy(() => import("@/components/footer"));

// Section loader component
const SectionLoader = () => (
  <div className="py-16 flex items-center justify-center">
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-32 w-full max-w-md"></div>
  </div>
);

export default function Home() {
  usePerformance();

  return (
    <div className="font-poppins text-gray-800 dark:text-text-primary dark:bg-bg-primary min-h-screen">
      <Navigation />
      <HeroSection />
      
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <RoomsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <AmenitiesSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <GallerySection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <BookingSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
}
