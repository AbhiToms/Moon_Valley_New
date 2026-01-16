import { Button } from "@/components/ui/button";
import { ChevronDown, Play, Sparkles } from "lucide-react";
import { openWhatsAppChat } from "@/utils/whatsapp";
import heroImage from "@assets/hero-perfect-fit.png";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import nightModeHero from "@assets/night-mode-hero.jpg";
import LazyImage from "./lazy-image";

export default function HeroSection() {
  const { theme } = useTheme();
  const [showNightView, setShowNightView] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      setShowNightView(true);
      const timer = setTimeout(() => {
        setShowNightView(false);
      }, 11000);
      return () => clearTimeout(timer);
    } else {
      setShowNightView(false);
    }
  }, [theme]);

  const handleBooking = () => {
    openWhatsAppChat();
  };

  return (
    <section id="home" className="relative h-[70vh] sm:h-[80vh] md:h-screen flex items-center justify-center overflow-hidden">
      {/* Base Background Image (Day) */}
      <div className="absolute inset-0 z-0">
        <LazyImage
          src={heroImage}
          alt="Moon Valley Resort View"
          className="w-full h-full"
          priority={true}
        />
      </div>

      {/* Overlay Background Image (Night) with Fade Animation */}
      <div
        className={`absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out ${showNightView ? "opacity-100" : "opacity-0"
          }`}
      >
        <LazyImage
          src={nightModeHero}
          alt="Moon Valley Resort Night View"
          className="w-full h-full"
        />
      </div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-20" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse z-20"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/20 rounded-full blur-lg animate-pulse z-20" style={{ animationDelay: "1s" }}></div>

      <div className="relative z-30 text-center text-white max-w-5xl px-6">
        <div className="mb-4 flex justify-center">
          <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-white/30 dark:border-white/20">
            <span className="text-sm font-medium flex items-center text-white">
              <Sparkles className="mr-2" size={16} />
              Palakkayam Thattu, Kerala
            </span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-poppins font-bold mb-4 sm:mb-6 leading-tight">
          <span className="block bg-gradient-to-r from-white via-white to-secondary dark:from-white dark:via-neutral dark:to-tropical bg-clip-text text-transparent animate-fadeInUp">
            Moon Valley
          </span>
          <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mt-1 sm:mt-2 text-white animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            A Tropical Hut Experience
          </span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed font-light animate-fadeInUp px-4" style={{ animationDelay: "0.4s" }}>
          Perched at <strong>3,500 feet</strong> above sea level, experience breathtaking 360° panoramic views,
          premium accommodations, and immersive nature encounters in the heart of Kerala's Western Ghats.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fadeInUp px-4" style={{ animationDelay: "0.6s" }}>
          <Button
            onClick={handleBooking}
            className="bg-white dark:bg-neutral text-primary dark:text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:bg-neutral dark:hover:bg-white hover:scale-105 transition-all duration-300 shadow-2xl w-full sm:w-auto"
          >
            Book on WhatsApp
          </Button>
          <Button
            variant="outline"
            className="hidden border-2 border-white/50 dark:border-white/40 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-sm transition-all duration-300 bg-transparent w-full sm:w-auto"
          >
            <Play className="mr-2" size={16} />
            Virtual Tour
          </Button>
        </div>

        {/* Statistics */}
        <div className="mt-6 sm:mt-8 md:mt-12 grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 max-w-lg sm:max-w-xl mx-auto animate-fadeInUp px-4" style={{ animationDelay: "0.8s" }}>
          <div className="text-center">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-secondary">4.4★</div>
            <div className="text-xs opacity-80 leading-tight">Google Rating</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-secondary">360°</div>
            <div className="text-xs opacity-80 leading-tight">Panoramic Views</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-secondary">3,500ft</div>
            <div className="text-xs opacity-80 leading-tight">Above Sea Level</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center text-white/80 animate-bounce z-30">
        <ChevronDown size={40} strokeWidth={1} />
      </div>
    </section>
  );
}
