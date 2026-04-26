import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  X, ChevronLeft, ChevronRight,
  Bed, Bath, Users, Wifi, Star, MapPin,
  Tv, Wind, Coffee, UtensilsCrossed, Waves, Mountain, MessageCircle,
} from "lucide-react";
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
  WiFi:              { icon: <Wifi size={16} />,            label: "Free WiFi" },
  Balcony:           { icon: <Mountain size={16} />,         label: "Balcony" },
  "Mountain View":   { icon: <Mountain size={16} />,         label: "Mountain View" },
  "Mini Bar":        { icon: <Coffee size={16} />,           label: "Mini Bar" },
  Fireplace:         { icon: <Coffee size={16} />,           label: "Fireplace" },
  "Garden Access":   { icon: <Mountain size={16} />,         label: "Garden Access" },
  Kitchenette:       { icon: <UtensilsCrossed size={16} />,  label: "Kitchenette" },
  Terrace:           { icon: <Mountain size={16} />,         label: "Terrace" },
  "Valley View":     { icon: <Mountain size={16} />,         label: "Valley View" },
  "Air Conditioning":{ icon: <Wind size={16} />,             label: "Air Conditioning" },
  "Private Pool":    { icon: <Waves size={16} />,            label: "Private Pool" },
  "Mountain Access": { icon: <Mountain size={16} />,         label: "Mountain Access" },
  "Full Kitchen":    { icon: <UtensilsCrossed size={16} />,  label: "Full Kitchen" },
  TV:                { icon: <Tv size={16} />,               label: "Smart TV" },
};

function getAmenityMeta(name: string) {
  return AMENITY_META[name] ?? { icon: <Coffee size={16} />, label: name };
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

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen || !room) return;
      if (event.key === "ArrowLeft") { event.preventDefault(); prevImage(); }
      if (event.key === "ArrowRight") { event.preventDefault(); nextImage(); }
      if (event.key === "Escape") { event.preventDefault(); onClose(); }
    },
    [isOpen, room],
  );

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

        {/*
          Full-screen on mobile, inset card on tablet+.
          Use 100dvh (dynamic viewport) so the modal never overflows on mobile
          when the browser chrome is visible.
        */}
        <DialogPrimitive.Content
          className="fixed inset-0 md:inset-6 lg:inset-10 xl:inset-14 z-50 bg-white dark:bg-gray-900 rounded-none md:rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden flex flex-col data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 outline-none"
          style={{ height: "100dvh", maxHeight: "100dvh" }}
          aria-describedby={undefined}
        >
          {/* ── Photo viewer ─────────────────────────────────────────── */}
          <div className="relative flex-shrink-0 bg-gray-100 dark:bg-gray-800 overflow-hidden h-[48vw] max-h-[260px] md:h-[42vh] md:max-h-[400px]">

            {/* Shimmer */}
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

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/30 text-white hover:bg-black/70 transition-colors"
            >
              <X size={15} />
            </button>

            {/* Prev / Next */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  disabled={isImageLoading}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/30 text-white hover:bg-black/70 disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextImage}
                  disabled={isImageLoading}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/30 text-white hover:bg-black/70 disabled:opacity-30 transition-colors"
                >
                  <ChevronRight size={16} />
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

            {/* Rating + counter */}
            <div className="absolute bottom-2.5 left-3 z-20 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-0.5 rounded-full border border-white/20">
              <Star size={10} fill="currentColor" className="text-yellow-400" />
              {room.rating}
            </div>
            <div className="absolute bottom-2.5 right-3 z-20 bg-black/50 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-0.5 rounded-full border border-white/20">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* ── Thumbnail strip ───────────────────────────────────────── */}
          {images.length > 1 && (
            <div className="flex-shrink-0 flex gap-1.5 px-3 py-2 overflow-x-auto bg-gray-50 dark:bg-gray-800/60 border-b border-gray-100 dark:border-gray-700 scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => goToImage(i)}
                  className={`relative flex-shrink-0 w-12 h-9 sm:w-14 sm:h-10 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                    i === currentImageIndex
                      ? "border-[#25D366] ring-1 ring-[#25D366]/30 scale-105 opacity-100"
                      : "border-transparent opacity-55 hover:opacity-90"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* ── Scrollable details ────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
            <div className="p-4 sm:p-5 lg:p-7 space-y-4 sm:space-y-5">

              {/* Name + Price */}
              <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between gap-1.5">
                <div className="flex-1 min-w-0">
                  <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-poppins font-bold text-primary dark:text-text-primary leading-tight">
                    {room.name}
                  </DialogTitle>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-white/50">
                    <MapPin size={11} className="text-tropical flex-shrink-0" />
                    <span>Palakkayam Thattu, Kerala</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="text-xl sm:text-2xl font-bold text-primary dark:text-tropical">
                    ₹{room.price.toLocaleString("en-IN")}
                  </div>
                  <div className="text-[11px] text-gray-400 dark:text-white/40">per night</div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: <Bed size={16} className="text-tropical" />, value: room.beds.toString(), label: room.beds === 1 ? "Bed" : "Beds" },
                  { icon: <Bath size={16} className="text-tropical" />, value: room.baths.toString(), label: room.baths === 1 ? "Bath" : "Baths" },
                  { icon: <Users size={16} className="text-tropical" />, value: `${room.beds * 2}`, label: "Guests" },
                  { icon: <Wifi size={16} className="text-tropical" />, value: "Free", label: "WiFi" },
                ].map(({ icon, value, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1 py-2.5 px-1 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-center">
                    {icon}
                    <span className="text-xs font-bold text-primary dark:text-text-primary leading-none">{value}</span>
                    <span className="text-[9px] sm:text-[10px] text-gray-400 dark:text-white/40 leading-none">{label}</span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-[11px] font-semibold text-gray-400 dark:text-white/40 uppercase tracking-widest mb-1.5">
                  About this room
                </h3>
                <p className="text-gray-600 dark:text-white/75 leading-relaxed text-sm">
                  {room.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-[11px] font-semibold text-gray-400 dark:text-white/40 uppercase tracking-widest mb-2">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {room.amenities.map((amenity) => {
                    const meta = getAmenityMeta(amenity);
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-2 p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
                      >
                        <span className="text-tropical flex-shrink-0">{meta.icon}</span>
                        <span className="text-xs font-medium text-gray-700 dark:text-white/75 leading-tight">{meta.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom spacer so CTA doesn't obscure last content on short screens */}
              <div className="h-1" />
            </div>
          </div>

          {/* ── Sticky Book CTA ───────────────────────────────────────── */}
          <div className="flex-shrink-0 px-4 py-3 sm:px-5 sm:py-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => openWhatsAppChat(room.name)}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full py-3 text-sm sm:text-base font-bold transition-all duration-200 shadow-lg hover:shadow-[0_6px_24px_rgba(37,211,102,0.45)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle size={17} />
              Reserve on WhatsApp
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
