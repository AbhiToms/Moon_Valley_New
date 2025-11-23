import { useState, lazy, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bath, Star, Users, Eye } from "lucide-react";
import LazyImage from "./lazy-image";
import type { Room } from "@shared/schema";

const RoomGallery = lazy(() => import("@/components/room-gallery"));

export default function RoomsSection() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const { data: rooms, isLoading } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openRoomGallery = (room: Room) => {
    setSelectedRoom(room);
    setIsGalleryOpen(true);
  };

  const closeRoomGallery = () => {
    setIsGalleryOpen(false);
    setSelectedRoom(null);
  };

  const handleBookFromGallery = () => {
    closeRoomGallery();
    scrollToBooking();
  };

  if (isLoading) {
    return (
      <section id="accommodations" className="py-24 bg-gradient-to-br from-surface to-neutral dark:from-surface dark:to-bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="w-32 h-8 bg-gray-200 dark:bg-mist rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="w-96 h-6 bg-gray-200 dark:bg-mist rounded-full mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-mist rounded-3xl animate-pulse h-[450px]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="accommodations" className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-tropical/10 px-4 py-2 rounded-full border border-tropical/30 mb-6">
            <span className="w-2 h-2 bg-tropical rounded-full"></span>
            <span className="text-tropical font-semibold text-sm">PREMIUM ACCOMMODATIONS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Luxury Tropical <span className="text-tropical">Huts</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Four uniquely designed accommodations that blend modern comfort with authentic tropical architecture, each offering stunning panoramic views of the Western Ghats.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms?.map((room, index) => (
            <div
              key={room.id}
              className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden h-48 sm:h-56">
                <LazyImage
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-tropical text-white px-4 py-2 rounded-lg font-bold">
                  ₹{room.price.toLocaleString()}
                  <span className="text-xs font-normal ml-1">/night</span>
                </div>

                {/* View Details Button */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    size="sm" 
                    onClick={() => openRoomGallery(room)}
                    className="bg-white text-primary hover:bg-gray-100 shadow-lg font-semibold"
                  >
                    <Eye size={16} className="mr-1" />
                    View
                  </Button>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 sm:p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {room.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {room.description}
                  </p>
                </div>

                {/* Amenities Icons */}
                <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-slate-700 border-b">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <Bed size={18} className="text-tropical mb-1" />
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{index < 3 ? 2 : room.beds}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Bath size={18} className="text-tropical mb-1" />
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{room.baths}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Users size={18} className="text-tropical mb-1" />
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{index < 3 ? 6 : room.beds * 2}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={scrollToBooking}
                  className="w-full bg-gradient-to-r from-tropical to-emerald-600 text-white rounded-lg py-3 font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Reserve Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Room Gallery Modal */}
        <Suspense fallback={<div />}>
          {isGalleryOpen && selectedRoom && (
            <RoomGallery
              room={selectedRoom}
              isOpen={isGalleryOpen}
              onClose={closeRoomGallery}
              onBookNow={handleBookFromGallery}
            />
          )}
        </Suspense>
      </div>
    </section>
  );
}