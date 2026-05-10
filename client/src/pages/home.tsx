import { lazy, Suspense, useEffect, useRef } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import WhatsAppFloat from "@/components/whatsapp-float";

const AboutSection = lazy(() => import("@/components/about-section"));
const RoomsSection = lazy(() => import("@/components/rooms-section"));
const AmenitiesSection = lazy(() => import("@/components/amenities-section"));
const GallerySection = lazy(() => import("@/components/gallery-section"));
const TestimonialsSection = lazy(() => import("@/components/testimonials-section"));
const ContactSection = lazy(() => import("@/components/contact-section"));
const Footer = lazy(() => import("@/components/footer"));

const SectionLoader = () => (
  <div className="py-16 flex items-center justify-center">
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-32 w-full max-w-md"></div>
  </div>
);

function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const pct = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div id="scroll-progress" ref={barRef} style={{ width: "0%" }} />;
}

export default function Home() {
  return (
    <div className="font-poppins text-gray-800 dark:text-text-primary dark:bg-bg-primary min-h-screen">
      <ScrollProgressBar />
      <Navigation />
      <HeroSection />
      <WhatsAppFloat />

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
