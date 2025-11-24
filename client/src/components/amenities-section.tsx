import { Card, CardContent } from "@/components/ui/card";
import { Waves, Flame, Mountain, ChefHat, Wifi, Trees } from "lucide-react";

const amenities = [
  {
    icon: Mountain,
    title: "Scenic Viewpoints",
    description: "Breathtaking panoramic vistas with stunning sunset and sunrise views over the Western Ghats",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: Waves,
    title: "Swimming Pool",
    description: "Large swimming pool with mountain views perfect for relaxation and family fun",
    image: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: Trees,
    title: "Nature Trails",
    description: "Direct access to hiking trails and mountain paths for outdoor enthusiasts",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: Flame,
    title: "Campfire & BBQ Nights",
    description: "Cozy campfire gatherings with BBQ grilling and authentic outdoor dining experiences",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: ChefHat,
    title: "Common Kitchen",
    description: "Fully equipped communal kitchen with dining area for cooking enthusiasts and families",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "High-speed internet connectivity throughout the resort for your convenience",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  }
];

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-neutral to-surface dark:from-bg-primary dark:to-bg-secondary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 lg:mb-20">
          <div className="inline-block bg-tropical/10 dark:bg-tropical/20 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
            <span className="text-tropical font-semibold text-xs sm:text-sm">AMENITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-primary dark:text-text-primary mb-4 sm:mb-6">
            World-Class <span className="text-tropical">Amenities</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
            Every facility is thoughtfully designed to enhance your connection with nature while providing modern comfort and convenience for an unforgettable stay.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {amenities.map((amenity, index) => {
            const IconComponent = amenity.icon;
            return (
              <Card key={index} className="group bg-white dark:bg-bg-secondary rounded-3xl overflow-hidden border-0 shadow-lg hover:shadow-2xl dark:shadow-xl dark:hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img 
                    src={amenity.image} 
                    alt={amenity.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-48 sm:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ willChange: 'transform' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <CardContent className="p-4 sm:p-6">
                  <div className="text-tropical text-xl sm:text-2xl mb-2 sm:mb-3">
                    <IconComponent size={28} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-poppins font-bold text-primary dark:text-text-primary mb-2 sm:mb-3">
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
