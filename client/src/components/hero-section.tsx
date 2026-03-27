import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";
import { openWhatsAppChat } from "@/utils/whatsapp";
import heroImage from "@assets/hero-perfect-fit.png";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import nightModeHero from "@assets/night-mode-hero.jpg";

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
      <img
        src={heroImage}
        alt="Moon Valley Resort"
        className="absolute inset-0 w-full h-full object-cover z-0"
        loading="eager"
      />

      {/* Overlay Background Image (Night) with Fade Animation */}
      {theme === 'dark' && (
        <img
          src={nightModeHero}
          alt="Moon Valley Resort Night View"
          className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-1000 ease-in-out ${showNightView ? "opacity-100" : "opacity-0"}`}
          loading="eager"
        />
      )}

      {/* Gradient overlay — stronger at top (nav readability) and bottom (text readability) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/65 z-20" />

      <div className="relative z-30 text-center text-white max-w-5xl px-6">
        <div className="mb-5 flex justify-center">
          <div className="bg-white/15 backdrop-blur-sm rounded-full px-5 py-2 border border-white/30">
            <span className="text-sm font-medium flex items-center text-white drop-shadow">
              <Sparkles className="mr-2" size={15} />
              Palakkayam Thattu, Kerala
            </span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-poppins font-bold mb-4 sm:mb-6 leading-tight drop-shadow-lg">
          <span className="block text-white">Moon Valley</span>
          <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mt-1 sm:mt-2 text-white/90">
            A Tropical Hut Experience
          </span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed text-white/90 px-4 drop-shadow">
          Perched at <strong>3,500 feet</strong> above sea level, experience breathtaking 360° panoramic views,
          premium accommodations, and immersive nature encounters in the heart of Kerala's Western Ghats.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <Button
            onClick={handleBooking}
            className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-4 rounded-full text-base font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[0_8px_30px_rgba(37,211,102,0.4)] w-full sm:w-auto"
          >
            Book on WhatsApp
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const el = document.getElementById("accommodations");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="border-2 border-white/60 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/20 backdrop-blur-sm transition-all duration-300 bg-transparent w-full sm:w-auto"
          >
            View Rooms
          </Button>
        </div>

        {/* Statistics */}
        <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto px-4">
          {[
            { value: "4.4★", label: "Google Rating" },
            { value: "360°", label: "Panoramic Views" },
            { value: "3,500ft", label: "Above Sea Level" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center bg-white/10 backdrop-blur-sm rounded-xl py-3 border border-white/20">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#25D366]">{value}</div>
              <div className="text-xs text-white/80 mt-0.5 leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center text-white/80 animate-bounce z-30">
        <ChevronDown size={40} strokeWidth={1} />
      </div>
    </section>
  );
}
