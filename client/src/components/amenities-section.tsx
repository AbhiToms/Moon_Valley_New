import { Card, CardContent } from "@/components/ui/card";
import { Waves, Utensils, Dumbbell, ChefHat, Wifi, Trees } from "lucide-react";

const amenities = [
  {
    icon: Waves,
    title: "Swimming Pool",
    description: "Large swimming pool with mountain views perfect for relaxation and family fun",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: ChefHat,
    title: "Common Kitchen",
    description: "Fully equipped communal kitchen with dining area for cooking enthusiasts and families",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: Trees,
    title: "Nature Trails",
    description: "Direct access to hiking trails and mountain paths for outdoor enthusiasts",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "High-speed internet connectivity throughout the resort for your convenience",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: Dumbbell,
    title: "Fitness Area",
    description: "Basic fitness equipment with stunning mountain views for your workout routine",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: Utensils,
    title: "Dining Options",
    description: "On-site dining with local cuisine featuring fresh mountain ingredients",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  }
];

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-tropical/10 px-4 py-2 rounded-full border border-tropical/30 mb-6">
            <span className="w-2 h-2 bg-tropical rounded-full"></span>
            <span className="text-tropical font-semibold text-sm">WORLD-CLASS FACILITIES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Premium <span className="text-tropical">Amenities</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Every facility is thoughtfully designed to enhance your connection with nature while providing modern comfort and convenience for an unforgettable stay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity, index) => {
            const IconComponent = amenity.icon;
            return (
              <div key={index} className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative overflow-hidden h-48 sm:h-56">
                  <img 
                    src={amenity.image} 
                    alt={amenity.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />
                  <div className="absolute top-4 left-4 p-3 bg-tropical/90 rounded-lg">
                    <IconComponent size={24} className="text-white" />
                  </div>
                </div>
                
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{amenity.title}</h3>
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
