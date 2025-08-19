import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bath, Wifi, Star } from "lucide-react";
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
      <section id="rooms" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-forest mb-4">
              Luxurious Accommodations
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl animate-pulse h-96" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rooms" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-forest mb-4">
            Luxurious Accommodations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each room is thoughtfully designed to provide comfort and tranquility while maintaining harmony with the natural surroundings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rooms?.map((room) => (
            <Card key={room.id} className="bg-white rounded-2xl card-shadow hover-lift overflow-hidden border-0">
              <div className="relative">
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-playfair font-semibold text-forest mb-2">
                  {room.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {room.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-forest">₹{room.price.toLocaleString()}</span>
                    <span className="text-gray-500 text-sm">/night</span>
                  </div>
                  <div className="flex items-center text-gold">
                    <Star className="fill-current" size={16} />
                    <span className="text-sm ml-1">{room.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-4 gap-4">
                  <div className="flex items-center">
                    <Bed size={16} className="mr-1" />
                    <span>{room.beds} Bed{room.beds > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath size={16} className="mr-1" />
                    <span>{room.baths} Bath{room.baths > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center">
                    <Wifi size={16} className="mr-1" />
                    <span>WiFi</span>
                  </div>
                </div>
                
                <Button 
                  onClick={scrollToBooking}
                  className="w-full bg-forest text-white hover:bg-forest/90 rounded-full transition-all duration-300"
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
