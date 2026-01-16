import { lazy, Suspense, useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import LoadingScreen from "@/components/loading-screen";
import heroImage from "@assets/hero-perfect-fit.png";
import { AnimatePresence, motion } from "framer-motion";

// Lazy load non-critical sections
const AboutSection = lazy(() => import("@/components/about-section"));
const RoomsSection = lazy(() => import("@/components/rooms-section"));
const AmenitiesSection = lazy(() => import("@/components/amenities-section"));
const GallerySection = lazy(() => import("@/components/gallery-section"));
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = heroImage;

    // Show custom Moon Valley loader immediately for a better brand experience
    // and transition seamlessly to content once ready
    const handleLoad = () => setIsLoading(false);

    if (img.complete) {
      handleLoad();
    } else {
      img.onload = handleLoad;
      img.onerror = handleLoad;
    }
  }, [heroImage]);

  return (
    <div className="font-poppins text-gray-800 dark:text-text-primary dark:bg-bg-primary min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-50"
          >
            <LoadingScreen />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
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
              <TestimonialsSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <ContactSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <Footer />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
