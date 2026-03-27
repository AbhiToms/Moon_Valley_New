import { useState, lazy, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Users, Eye, Wifi, Star } from "lucide-react";
import LazyImage from "./lazy-image";
import { openWhatsAppChat } from "@/utils/whatsapp";
import type { Room } from "@shared/schema";

const RoomGallery = lazy(() => import("@/components/room-gallery"));

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  WiFi: <Wifi size={11} />,
};

export default function RoomsSection() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const { data: rooms, isLoading } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  const openRoomGallery = (room: Room) => {
    setSelectedRoom(room);
    setIsGalleryOpen(true);
  };

  const closeRoomGallery = () => {
    setIsGalleryOpen(false);
    setSelectedRoom(null);
  };

  if (isLoading) {
    return (
      <section id="accommodations" className="py-16 lg:py-24 bg-gradient-to-br from-surface to-neutral dark:from-surface dark:to-bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="w-32 h-8 bg-gray-200 dark:bg-mist rounded-full mx-auto mb-4 animate-pulse" />
            <div className="w-80 h-10 bg-gray-200 dark:bg-mist rounded-xl mx-auto mb-4 animate-pulse" />
            <div className="w-96 h-6 bg-gray-200 dark:bg-mist rounded-full mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-mist rounded-3xl animate-pulse h-[460px]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="accommodations" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-surface to-neutral dark:from-surface dark:to-bg-secondary">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-20">
          <div className="inline-block bg-primary/10 dark:bg-tropical/20 rounded-full px-5 py-2 mb-5">
            <span className="text-primary dark:text-tropical font-semibold text-xs sm:text-sm tracking-widest">ACCOMMODATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-primary dark:text-text-primary mb-4">
            Tropical <span className="text-tropical">Hut</span> Experiences
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto leading-relaxed px-4">
            Four uniquely designed accommodations blending modern comfort with authentic tropical architecture,
            each with stunning panoramic views of the Western Ghats.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
          {rooms?.map((room) => (
            <div
              key={room.id}
              className="group bg-white dark:bg-bg-secondary rounded-3xl overflow-hidden shadow-md hover:shadow-2xl dark:shadow-lg dark:hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-52 sm:h-56 flex-shrink-0">
                <LazyImage
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full"
                  imgClassName="group-hover:scale-110 transition-transform duration-700"
                />

                {/* Rating badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  <Star size={11} fill="currentColor" className="text-yellow-400" />
                  {room.rating}
                </div>

                {/* View Details hover button */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <button
                    onClick={() => openRoomGallery(room)}
                    className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold border border-white/40 px-3 py-1.5 rounded-full hover:bg-white hover:text-primary transition-colors duration-200"
                  >
                    <Eye size={13} />
                    View Details
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <h3 className="text-base sm:text-lg font-poppins font-bold text-primary dark:text-text-primary mb-1.5 leading-tight">
                  {room.name}
                </h3>
                <p className="text-gray-500 dark:text-white/60 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
                  {room.description}
                </p>

                {/* Amenity chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium bg-tropical/10 dark:bg-tropical/20 text-tropical px-2 py-0.5 rounded-full"
                    >
                      {AMENITY_ICONS[amenity] ?? null}
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="text-[10px] sm:text-xs font-medium text-gray-400 dark:text-white/40 px-1 py-0.5">
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-white/60 mb-4 border-t border-gray-100 dark:border-white/10 pt-3">
                  <div className="flex items-center gap-1">
                    <Bed size={13} className="text-tropical" />
                    <span>{room.beds} {room.beds === 1 ? "Bed" : "Beds"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath size={13} className="text-tropical" />
                    <span>{room.baths} {room.baths === 1 ? "Bath" : "Baths"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={13} className="text-tropical" />
                    <span>Up to {room.beds * 2}</span>
                  </div>
                </div>

                {/* Price + Button */}
                <div className="mt-auto">
                  <div className="flex items-baseline mb-3">
                    <span className="text-xl sm:text-2xl font-bold text-primary dark:text-tropical">
                      ₹{room.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-gray-400 dark:text-white/50 text-xs ml-1">/night</span>
                  </div>
                  <button
                    onClick={() => openWhatsAppChat(room.name)}
                    className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full py-2.5 text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-[0_4px_20px_rgba(37,211,102,0.4)]"
                  >
                    Reserve on WhatsApp
                  </button>
                </div>
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
              onBookNow={closeRoomGallery}
            />
          )}
        </Suspense>
      </div>
    </section>
  );
}
