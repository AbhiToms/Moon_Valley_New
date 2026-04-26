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
    if (theme === "dark") {
      setShowNightView(true);
      const timer = setTimeout(() => setShowNightView(false), 11000);
      return () => clearTimeout(timer);
    } else {
      setShowNightView(false);
    }
  }, [theme]);

  return (
    <section
      id="home"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Day background */}
      <img
        src={heroImage}
        alt="Moon Valley Resort"
        className="absolute inset-0 w-full h-full object-cover z-0"
        loading="eager"
      />

      {/* Night overlay */}
      {theme === "dark" && (
        <img
          src={nightModeHero}
          alt="Moon Valley Resort Night View"
          className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-1000 ease-in-out ${
            showNightView ? "opacity-100" : "opacity-0"
          }`}
          loading="eager"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/65 z-20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-30 text-center text-white w-full max-w-4xl mx-auto px-5 py-24 sm:py-32 flex flex-col items-center">

        {/* Location pill */}
        <div className="mb-3 sm:mb-5">
          <div className="inline-flex items-center bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/30">
            <Sparkles size={13} className="mr-1.5 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-white">Palakkayam Thattu, Kerala</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-poppins font-bold leading-tight drop-shadow-lg mb-3 sm:mb-4">
          <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white">Moon Valley</span>
          <span className="block text-base sm:text-xl md:text-2xl lg:text-3xl font-light mt-1 text-white/85">
            A Tropical Hut Experience
          </span>
        </h1>

        {/* Description */}
        <p className="text-xs sm:text-sm md:text-base lg:text-lg max-w-xl mx-auto leading-relaxed text-white/85 mb-5 sm:mb-8 px-2">
          Perched at <strong>3,500 feet</strong> above sea level — breathtaking 360° panoramic views,
          premium accommodations, and immersive nature in the heart of Kerala's Western Ghats.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center mb-6 sm:mb-10">
          <Button
            onClick={() => openWhatsAppChat()}
            className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-7 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[0_8px_30px_rgba(37,211,102,0.4)] w-full sm:w-auto"
          >
            Book on WhatsApp
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const el = document.getElementById("accommodations");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="border-2 border-white/60 text-white px-7 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:bg-white/20 backdrop-blur-sm transition-all duration-300 bg-transparent w-full sm:w-auto"
          >
            View Rooms
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-xs sm:max-w-sm mx-auto">
          {[
            { value: "4.4★", label: "Google Rating" },
            { value: "360°", label: "Panoramic" },
            { value: "3,500ft", label: "Altitude" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="text-center bg-white/10 backdrop-blur-sm rounded-xl py-2 sm:py-3 border border-white/20"
            >
              <div className="text-sm sm:text-lg md:text-xl font-bold text-[#25D366]">{value}</div>
              <div className="text-[10px] sm:text-xs text-white/75 mt-0.5 leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center text-white/70 animate-bounce z-30 pointer-events-none">
        <ChevronDown size={32} strokeWidth={1.5} />
      </div>
    </section>
  );
}
