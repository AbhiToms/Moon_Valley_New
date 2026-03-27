import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight, Bed, Bath, Users, Wifi, Star, MapPin, Tv, Wind, Coffee, UtensilsCrossed, Waves, Mountain, MessageCircle } from "lucide-react";
import { openWhatsAppChat } from "@/utils/whatsapp";
import type { Room } from "@shared/schema";

interface RoomGalleryProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

const roomImages: Record<string, string[]> = {
  "Mountain View Suite": [
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  ],
  "Forest Cottage": [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  ],
  "Valley View Room": [
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  ],
  "Premium Villa": [
    "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  ],
};

const AMENITY_META: Record<string, { icon: React.ReactNode; label: string }> = {
  WiFi:             { icon: <Wifi size={18} />,            label: "Free WiFi" },
  Balcony:          { icon: <Mountain size={18} />,         label: "Balcony" },
  "Mountain View":  { icon: <Mountain size={18} />,         label: "Mountain View" },
  "Mini Bar":       { icon: <Coffee size={18} />,           label: "Mini Bar" },
  Fireplace:        { icon: <Coffee size={18} />,           label: "Fireplace" },
  "Garden Access":  { icon: <Mountain size={18} />,         label: "Garden Access" },
  Kitchenette:      { icon: <UtensilsCrossed size={18} />,  label: "Kitchenette" },
  Terrace:          { icon: <Mountain size={18} />,         label: "Terrace" },
  "Valley View":    { icon: <Mountain size={18} />,         label: "Valley View" },
  "Air Conditioning":{ icon: <Wind size={18} />,            label: "Air Conditioning" },
  "Private Pool":   { icon: <Waves size={18} />,            label: "Private Pool" },
  "Mountain Access":{ icon: <Mountain size={18} />,         label: "Mountain Access" },
  "Full Kitchen":   { icon: <UtensilsCrossed size={18} />,  label: "Full Kitchen" },
  TV:               { icon: <Tv size={18} />,               label: "Smart TV" },
};

function getAmenityMeta(name: string) {
  return AMENITY_META[name] ?? { icon: <Coffee size={18} />, label: name };
}

export default function RoomGallery({ room, isOpen, onClose }: RoomGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    if (isOpen && room) {
      setCurrentImageIndex(0);
      setIsImageLoading(false);
    }
  }, [room?.id, isOpen]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isOpen || !room) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); prevImage(); }
    if (event.key === "ArrowRight") { event.preventDefault(); nextImage(); }
    if (event.key === "Escape") { event.preventDefault(); onClose(); }
  }, [isOpen, room]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  if (!room) return null;

  const images = roomImages[room.name] || [room.image];

  const nextImage = () => {
    setIsImageLoading(true);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIsImageLoading(true);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    if (index === currentImageIndex) return;
    setIsImageLoading(true);
    setCurrentImageIndex(index);
  };

  return (
    <Dialog open={isOpen}>
      <DialogPortal>
        <DialogOverlay className="bg-black/70 backdrop-blur-sm" />
        <DialogPrimitive.Content className="fixed inset-0 md:inset-6 lg:inset-10 xl:inset-14 z-50 bg-white dark:bg-gray-900 rounded-none md:rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-screen md:max-h-[calc(100vh-3rem)] lg:max-h-[calc(100vh-5rem)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">

          {/* ── Image viewer ─────────────────────────────────────────── */}
          <div className="relative flex-shrink-0 h-[52vw] min-h-[240px] max-h-[420px] md:h-[48vh] lg:h-[52vh] bg-gray-100 dark:bg-gray-800 overflow-hidden">

            {/* Shimmer while loading */}
            {isImageLoading && (
              <div className="absolute inset-0 z-10 bg-gray-200 dark:bg-gray-700 animate-pulse" />
            )}

            <img
              src={images[currentImageIndex]}
              alt={`${room.name} — photo ${currentImageIndex + 1}`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoading ? "opacity-0" : "opacity-100"}`}
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
              loading="eager"
              decoding="async"
            />

            {/* Dark gradient for readability of overlaid elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25 pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 text-white hover:bg-black/60 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Prev / Next arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  disabled={isImageLoading}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 text-white hover:bg-black/60 disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextImage}
                  disabled={isImageLoading}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 text-white hover:bg-black/60 disabled:opacity-30 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {/* Swipe support */}
            <div
              className="absolute inset-0 touch-pan-y z-10"
              onTouchStart={(e) => { e.currentTarget.dataset.startX = e.touches[0].clientX.toString(); }}
              onTouchEnd={(e) => {
                const diff = e.changedTouches[0].clientX - parseFloat(e.currentTarget.dataset.startX || "0");
                if (Math.abs(diff) > 50) diff > 0 ? prevImage() : nextImage();
              }}
            />

            {/* Photo counter */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
              {currentImageIndex + 1} / {images.length}
            </div>

            {/* Rating badge */}
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20">
              <Star size={11} fill="currentColor" className="text-yellow-400" />
              {room.rating}
            </div>
          </div>

          {/* ── Thumbnail strip ───────────────────────────────────────── */}
          {images.length > 1 && (
            <div className="flex-shrink-0 flex gap-2 px-4 py-3 overflow-x-auto bg-gray-50 dark:bg-gray-800/60 border-b border-gray-100 dark:border-gray-700 scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => goToImage(i)}
                  className={`relative flex-shrink-0 w-16 h-11 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    i === currentImageIndex
                      ? "border-[#25D366] ring-2 ring-[#25D366]/30 scale-105"
                      : "border-transparent hover:border-gray-300 dark:hover:border-gray-500 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* ── Scrollable details pane ───────────────────────────────── */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="p-4 sm:p-6 lg:p-8 space-y-6">

              {/* Header: name + price */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <DialogTitle className="text-xl sm:text-2xl lg:text-3xl font-poppins font-bold text-primary dark:text-text-primary leading-tight">
                    {room.name}
                  </DialogTitle>
                  <div className="flex items-center gap-1.5 mt-1.5 text-sm text-gray-500 dark:text-white/60">
                    <MapPin size={13} className="text-tropical flex-shrink-0" />
                    <span>Palakkayam Thattu, Kerala</span>
                  </div>
                </div>
                <div className="sm:text-right flex-shrink-0">
                  <div className="text-2xl sm:text-3xl font-bold text-primary dark:text-tropical">
                    ₹{room.price.toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-white/50 mt-0.5">per night</div>
                </div>
              </div>

              {/* Quick stats row */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: <Bed size={18} className="text-tropical" />, value: room.beds.toString(), label: room.beds === 1 ? "Bed" : "Beds" },
                  { icon: <Bath size={18} className="text-tropical" />, value: room.baths.toString(), label: room.baths === 1 ? "Bath" : "Baths" },
                  { icon: <Users size={18} className="text-tropical" />, value: `${room.beds * 2}`, label: "Guests" },
                  { icon: <Wifi size={18} className="text-tropical" />, value: "Free", label: "WiFi" },
                ].map(({ icon, value, label }) => (
                  <div key={label} className="flex flex-col items-center justify-center gap-1.5 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-center">
                    {icon}
                    <span className="text-sm font-bold text-primary dark:text-text-primary leading-none">{value}</span>
                    <span className="text-[10px] text-gray-500 dark:text-white/50 leading-none">{label}</span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 dark:text-white/40 uppercase tracking-widest mb-2">About this room</h3>
                <p className="text-gray-600 dark:text-white/80 leading-relaxed text-sm sm:text-base">
                  {room.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 dark:text-white/40 uppercase tracking-widest mb-3">Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {room.amenities.map((amenity) => {
                    const meta = getAmenityMeta(amenity);
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-2.5 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
                      >
                        <span className="text-tropical flex-shrink-0">{meta.icon}</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-white/80 leading-tight">{meta.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Spacer so CTA button doesn't overlap last content on mobile */}
              <div className="h-2" />
            </div>
          </div>

          {/* ── Sticky Book CTA ───────────────────────────────────────── */}
          <div className="flex-shrink-0 px-4 sm:px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => openWhatsAppChat(room.name)}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full py-3.5 text-base font-bold transition-all duration-200 shadow-lg hover:shadow-[0_6px_24px_rgba(37,211,102,0.45)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle size={18} />
              Reserve on WhatsApp
            </button>
          </div>

        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
