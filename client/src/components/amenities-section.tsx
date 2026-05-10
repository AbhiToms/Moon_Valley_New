import { Card, CardContent } from "@/components/ui/card";
import { Waves, Flame, Mountain, ChefHat, Wifi, Trees } from "lucide-react";
import LazyImage from "./lazy-image";
import { useEffect, useRef, useState } from "react";

const amenities = [
  {
    icon: Mountain,
    title: "Scenic Viewpoints",
    description: "Breathtaking panoramic vistas with stunning sunset and sunrise views over the Western Ghats",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    accent: "from-primary/20 to-tropical/20",
  },
  {
    icon: Waves,
    title: "Swimming Pool",
    description: "Large swimming pool with mountain views perfect for relaxation and family fun",
    image: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    accent: "from-tropical/20 to-blue-400/20",
  },
  {
    icon: Trees,
    title: "Nature Trails",
    description: "Direct access to hiking trails and mountain paths for outdoor enthusiasts",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    accent: "from-green-500/20 to-tropical/20",
  },
  {
    icon: Flame,
    title: "Campfire & BBQ Nights",
    description: "Cozy campfire gatherings with BBQ grilling and authentic outdoor dining experiences",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    accent: "from-orange-400/20 to-secondary/20",
  },
  {
    icon: ChefHat,
    title: "Common Kitchen",
    description: "Fully equipped communal kitchen with dining area for cooking enthusiasts and families",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    accent: "from-secondary/20 to-primary/20",
  },
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "High-speed internet connectivity throughout the resort for your convenience",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    accent: "from-blue-400/20 to-tropical/20",
  },
];

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function AmenitiesSection() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal(0.2);
  const { ref: gridRef, visible: gridVisible } = useScrollReveal(0.05);

  return (
    <section id="amenities" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-neutral to-surface dark:from-bg-primary dark:to-bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-8 sm:mb-10 lg:mb-14 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-block bg-tropical/10 dark:bg-tropical/20 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
            <span className="text-tropical font-semibold text-xs sm:text-sm tracking-widest">AMENITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-primary dark:text-text-primary mb-4 sm:mb-6">
            World-Class <span className="text-tropical">Amenities</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
            Every facility is thoughtfully designed to enhance your connection with nature while providing modern comfort and convenience.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {amenities.map((amenity, index) => {
            const IconComponent = amenity.icon;
            return (
              <Card
                key={index}
                className={`group bg-white dark:bg-bg-secondary rounded-3xl overflow-hidden border-0 shadow-lg
                  hover:shadow-2xl dark:hover:shadow-tropical/10 transition-all duration-500 hover:-translate-y-2
                  ${gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${(index % 3) * 80 + Math.floor(index / 3) * 100}ms`, transitionProperty: "all" }}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48 sm:h-52">
                  <LazyImage
                    src={amenity.image}
                    alt={amenity.title}
                    className="w-full h-full"
                    imgClassName="group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Colour tint on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${amenity.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-400 mix-blend-overlay pointer-events-none`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Icon badge — floats up on hover */}
                  <div className="absolute top-3 left-3 w-10 h-10 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md
                    group-hover:bg-tropical group-hover:text-white transition-all duration-300">
                    <IconComponent size={18} className="text-tropical group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>

                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-poppins font-bold text-primary dark:text-text-primary mb-2 sm:mb-3 group-hover:text-tropical dark:group-hover:text-tropical transition-colors duration-300">
                    {amenity.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-white/70 leading-relaxed">
                    {amenity.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
