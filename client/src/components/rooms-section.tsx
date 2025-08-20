import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bath, Wifi, Star, Users, Eye } from "lucide-react";
import type { Room } from "@shared/schema";

export default function RoomsSection() {
  const { data: rooms, isLoading } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <section id="rooms" className="py-24 bg-gradient-to-br from-surface to-neutral">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="w-32 h-8 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="w-96 h-6 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-3xl animate-pulse h-[450px]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rooms" className="py-24 bg-gradient-to-br from-surface to-neutral">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-6">
            <span className="text-primary font-semibold text-sm">ACCOMMODATIONS</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-poppins font-bold text-primary mb-6">
            Tropical <span className="text-tropical">Hut</span> Experiences
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Four uniquely designed accommodations that blend modern comfort with authentic tropical architecture, 
            each offering stunning panoramic views of the Western Ghats.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rooms?.map((room, index) => (
            <Card 
              key={room.id} 
              className="group bg-white rounded-3xl overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                  <Star className="text-secondary fill-current" size={14} />
                  <span className="text-sm font-semibold ml-1">{room.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-primary">
                    <Eye size={16} className="mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-poppins font-bold text-primary mb-2">
                  {room.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {room.description}
                </p>
                
                {/* Price */}
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-primary">₹{room.price.toLocaleString()}</span>
                  <span className="text-gray-500 text-sm ml-1">/night</span>
                </div>
                
                {/* Amenities */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Bed size={16} className="mr-1 text-tropical" />
                      <span>{room.beds}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath size={16} className="mr-1 text-tropical" />
                      <span>{room.baths}</span>
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="mr-1 text-tropical" />
                      <span>{room.beds * 2}</span>
                    </div>
                  </div>
                  <Wifi size={16} className="text-tropical" />
                </div>
                
                <Button 
                  onClick={scrollToBooking}
                  className="w-full bg-gradient-to-r from-primary to-tropical text-white rounded-full py-3 font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Reserve Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-white/20">
            <h3 className="text-2xl font-poppins font-bold text-primary mb-4">
              Need Help Choosing?
            </h3>
            <p className="text-gray-600 mb-6">
              Our team can help you select the perfect accommodation based on your needs and preferences.
            </p>
            <Button className="bg-secondary text-white px-8 py-3 rounded-full hover:scale-105 transition-all duration-300">
              Get Personalized Recommendations
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}