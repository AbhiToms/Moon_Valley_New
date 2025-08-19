import { Card, CardContent } from "@/components/ui/card";
import { Waves, Sparkles, Utensils, Dumbbell, ChefHat, Presentation } from "lucide-react";

const amenities = [
  {
    icon: Waves,
    title: "Infinity Pool",
    description: "Heated infinity pool with panoramic mountain views and integrated spa jets",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: Sparkles,
    title: "Spa & Wellness",
    description: "Full-service spa offering therapeutic treatments with organic mountain herbs",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: Utensils,
    title: "Fine Dining",
    description: "Award-winning cuisine featuring local ingredients and international flavors",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "State-of-the-art equipment with personal trainers and mountain views",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: ChefHat,
    title: "Common Kitchen",
    description: "Fully equipped communal kitchen with dining area for cooking enthusiasts",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: Presentation,
    title: "Conference Hall",
    description: "Professional meeting spaces with advanced AV technology and natural lighting",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  }
];

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-20 bg-sage/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-forest mb-4">
            World-Class Amenities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every facility is designed to enhance your connection with nature while providing modern comfort and convenience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => {
            const IconComponent = amenity.icon;
            return (
              <Card key={index} className="bg-white rounded-2xl card-shadow hover-lift overflow-hidden border-0">
                <div className="relative">
                  <img 
                    src={amenity.image} 
                    alt={amenity.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <CardContent className="p-6">
                  <div className="text-forest text-2xl mb-3">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-forest mb-3">
                    {amenity.title}
                  </h3>
                  <p className="text-gray-600">
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
