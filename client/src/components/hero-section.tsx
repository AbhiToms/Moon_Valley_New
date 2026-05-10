import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, MapPin } from "lucide-react";
import { openWhatsAppChat } from "@/utils/whatsapp";
import heroImage from "@assets/hero-perfect-fit.png";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import nightModeHero from "@assets/night-mode-hero.jpg";

const stats = [
  { value: "4.4★", label: "Google Rating" },
  { value: "360°", label: "Panoramic" },
  { value: "3,500ft", label: "Altitude" },
];

export default function HeroSection() {
  const { theme } = useTheme();
  const [showNightView, setShowNightView] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  // Entrance animation trigger
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Night overlay logic
  useEffect(() => {
    if (theme === "dark") {
      setShowNightView(true);
      const timer = setTimeout(() => setShowNightView(false), 11000);
      return () => clearTimeout(timer);
    } else {
      setShowNightView(false);
    }
  }, [theme]);

  // Scroll progress for parallax hero
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("home");
      if (!el) return;
      const h = el.offsetHeight;
      setScrollPct(Math.min(window.scrollY / h, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Day background — subtle parallax */}
      <img
        src={heroImage}
        alt="Moon Valley Resort"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-75 will-change-transform"
        style={{ transform: `scale(1.06) translateY(${scrollPct * 8}%)` }}
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

      {/* Gradient overlay — stronger at bottom for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/70 z-20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-30 text-center text-white w-full max-w-4xl mx-auto px-5 py-24 sm:py-32 flex flex-col items-center">

        {/* Location pill — slides in first */}
        <div
          className={`mb-4 sm:mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
          style={{ transitionDelay: "100ms" }}
        >
          <div className="inline-flex items-center bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 gap-2">
            <MapPin size={13} className="text-tropical flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-white">Palakkayam Thattu, Kerala</span>
            <Sparkles size={12} className="text-yellow-300 flex-shrink-0" />
          </div>
        </div>

        {/* Heading */}
        <h1
          className={`font-poppins font-bold leading-tight drop-shadow-lg mb-3 sm:mb-4 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "250ms" }}
        >
          <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white">Moon Valley</span>
          <span className="block text-base sm:text-xl md:text-2xl lg:text-3xl font-light mt-1 text-white/85">
            A Tropical Hut Experience
          </span>
        </h1>

        {/* Description */}
        <p
          className={`text-xs sm:text-sm md:text-base lg:text-lg max-w-xl mx-auto leading-relaxed text-white/85 mb-6 sm:mb-9 px-2 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "400ms" }}
        >
          Perched at <strong>3,500 feet</strong> above sea level — breathtaking 360° panoramic views,
          premium accommodations, and immersive nature in the heart of Kerala's Western Ghats.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center mb-8 sm:mb-12 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "550ms" }}
        >
          <Button
            onClick={() => openWhatsAppChat()}
            className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] w-full sm:w-auto"
          >
            Book on WhatsApp
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const el = document.getElementById("accommodations");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="border-2 border-white/60 text-white px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:bg-white/20 backdrop-blur-sm transition-all duration-300 bg-transparent w-full sm:w-auto hover:border-white"
          >
            Explore Rooms
          </Button>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm mx-auto transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "700ms" }}
        >
          {stats.map(({ value, label }, i) => (
            <div
              key={label}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl py-3 sm:py-4 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${700 + i * 80}ms` }}
            >
              <div className="text-sm sm:text-xl font-bold text-tropical">{value}</div>
              <div className="text-[10px] sm:text-xs text-white/70 mt-0.5 leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-1.5 text-white/60 z-30 pointer-events-none">
        <span className="text-[10px] tracking-widest uppercase font-medium opacity-70">Scroll</span>
        <ChevronDown size={24} strokeWidth={1.5} className="animate-bounce" />
      </div>
    </section>
  );
}
