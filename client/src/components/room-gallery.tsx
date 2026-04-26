import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  X, ChevronLeft, ChevronRight,
  Bed, Bath, Users, Wifi, Star, MapPin,
  Tv, Wind, Coffee, UtensilsCrossed, Waves, Mountain, MessageCircle, Check,
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
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
  ],
  "Forest Cottage": [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
  ],
  "Valley View Room": [
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
  ],
  "Premium Villa": [
    "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
  ],
};

const AMENITY_META: Record<string, { icon: React.ReactNode; label: string }> = {
  WiFi:              { icon: <Wifi size={15} />,            label: "Free WiFi" },
  Balcony:           { icon: <Mountain size={15} />,         label: "Balcony" },
  "Mountain View":   { icon: <Mountain size={15} />,         label: "Mountain View" },
  "Mini Bar":        { icon: <Coffee size={15} />,           label: "Mini Bar" },
  Fireplace:         { icon: <Coffee size={15} />,           label: "Fireplace" },
  "Garden Access":   { icon: <Mountain size={15} />,         label: "Garden Access" },
  Kitchenette:       { icon: <UtensilsCrossed size={15} />,  label: "Kitchenette" },
  Terrace:           { icon: <Mountain size={15} />,         label: "Terrace" },
  "Valley View":     { icon: <Mountain size={15} />,         label: "Valley View" },
  "Air Conditioning":{ icon: <Wind size={15} />,             label: "Air Conditioning" },
  "Private Pool":    { icon: <Waves size={15} />,            label: "Private Pool" },
  "Mountain Access": { icon: <Mountain size={15} />,         label: "Mountain Access" },
  "Full Kitchen":    { icon: <UtensilsCrossed size={15} />,  label: "Full Kitchen" },
  TV:                { icon: <Tv size={15} />,               label: "Smart TV" },
};

function getAmenityMeta(name: string) {
  return AMENITY_META[name] ?? { icon: <Check size={15} />, label: name };
}

/* ─────────────────────────────────────────────────────────────────────────────
   Image carousel (used on both sides)
──────────────────────────────────────────────────────────────────────────────*/
function ImageCarousel({
  images,
  currentIndex,
  isLoading,
  onPrev,
  onNext,
  onGoTo,
  onImageLoad,
  rating,
}: {
  images: string[];
  currentIndex: number;
  isLoading: boolean;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
  onImageLoad: () => void;
  rating: number;
}) {
  return (
    <div className="relative flex flex-col h-full bg-gray-900">
      {/* Main image */}
      <div
        className="relative flex-1 overflow-hidden"
        onTouchStart={(e) => { e.currentTarget.dataset.startX = e.touches[0].clientX.toString(); }}
        onTouchEnd={(e) => {
          const diff = e.changedTouches[0].clientX - parseFloat(e.currentTarget.dataset.startX || "0");
          if (Math.abs(diff) > 40) diff > 0 ? onPrev() : onNext();
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-gray-800 animate-pulse" />
        )}
        <img
          src={images[currentIndex]}
          alt={`Room photo ${currentIndex + 1}`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
          loading="eager"
          decoding="async"
          onLoad={onImageLoad}
          onError={onImageLoad}
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Rating badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          <Star size={10} fill="currentColor" className="text-yellow-400" />
          {rating}
        </div>

        {/* Counter */}
        <div className="absolute top-3 right-14 z-10 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button onClick={onPrev} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/70 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button onClick={onNext} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/70 transition-colors">
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex-shrink-0 flex gap-1.5 px-3 py-2.5 bg-gray-900 overflow-x-auto scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => onGoTo(i)}
              className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                i === currentIndex
                  ? "border-[#25D366] opacity-100 scale-105 shadow-lg"
                  : "border-transparent opacity-40 hover:opacity-75"
              }`}
              style={{ width: 52, height: 40 }}
            >
              <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Details panel
──────────────────────────────────────────────────────────────────────────────*/
function DetailsPanel({ room, onBook }: { room: Room; onBook: () => void }) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Scrollable body */}
      <div
        className="flex-1 overflow-y-auto overscroll-contain"
        style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        <div className="p-5 sm:p-6 lg:p-8 space-y-5">

          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl sm:text-2xl font-poppins font-bold text-primary dark:text-white leading-tight">
                {room.name}
              </DialogTitle>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-400 dark:text-white/40">
                <MapPin size={11} className="text-tropical flex-shrink-0" />
                Palakkayam Thattu, Kannur, Kerala
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-bold text-primary dark:text-tropical">
                ₹{room.price.toLocaleString("en-IN")}
              </div>
              <div className="text-[11px] text-gray-400 dark:text-white/40">per night</div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: <Bed size={17} className="text-tropical" />, value: String(room.beds), sub: room.beds === 1 ? "Bed" : "Beds" },
              { icon: <Bath size={17} className="text-tropical" />, value: String(room.baths), sub: room.baths === 1 ? "Bath" : "Baths" },
              { icon: <Users size={17} className="text-tropical" />, value: String(room.beds * 2), sub: "Guests" },
              { icon: <Wifi size={17} className="text-tropical" />, value: "Free", sub: "WiFi" },
            ].map(({ icon, value, sub }) => (
              <div key={sub} className="flex flex-col items-center gap-1.5 py-3 px-1 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/60 text-center">
                {icon}
                <span className="text-xs sm:text-sm font-bold text-primary dark:text-white leading-none">{value}</span>
                <span className="text-[10px] text-gray-400 dark:text-white/40 leading-none">{sub}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-gray-800" />

          {/* Description */}
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-white/35 uppercase tracking-widest mb-2">About this room</p>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-white/70">{room.description}</p>
          </div>

          {/* Amenities */}
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-white/35 uppercase tracking-widest mb-3">Included amenities</p>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {room.amenities.map((amenity) => {
                const meta = getAmenityMeta(amenity);
                return (
                  <div
                    key={amenity}
                    className="flex items-center gap-2.5 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700/60"
                  >
                    <span className="text-tropical flex-shrink-0">{meta.icon}</span>
                    <span className="text-xs font-medium text-gray-700 dark:text-white/70 leading-tight">{meta.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-tropical/5 dark:bg-tropical/10 border border-tropical/20 dark:border-tropical/30 rounded-2xl p-4">
            <p className="text-xs font-semibold text-tropical uppercase tracking-widest mb-2.5">Why guests love this room</p>
            <ul className="space-y-1.5">
              {[
                "Stunning panoramic views of the Western Ghats",
                "Authentic tropical hut architecture",
                "Clean, well-maintained and peaceful",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-xs text-gray-600 dark:text-white/65">
                  <Check size={13} className="text-tropical flex-shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="h-2" />
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="flex-shrink-0 p-4 sm:p-5 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={onBook}
          className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full py-3.5 text-sm sm:text-base font-bold transition-all duration-200 shadow-lg hover:shadow-[0_6px_24px_rgba(37,211,102,0.45)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <MessageCircle size={18} />
          Reserve on WhatsApp
        </button>
        <p className="text-center text-[11px] text-gray-400 dark:text-white/30 mt-2">
          Instant reply · No booking fee
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main export
──────────────────────────────────────────────────────────────────────────────*/
export default function RoomGallery({ room, isOpen, onClose }: RoomGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    if (isOpen && room) {
      setCurrentImageIndex(0);
      setIsImageLoading(false);
    }
  }, [room?.id, isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || !room) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
    },
    [isOpen, room],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  if (!room) return null;

  const images = roomImages[room.name] || [room.image];

  const next = () => { setIsImageLoading(true); setCurrentImageIndex((p) => (p + 1) % images.length); };
  const prev = () => { setIsImageLoading(true); setCurrentImageIndex((p) => (p - 1 + images.length) % images.length); };
  const goTo = (i: number) => { if (i !== currentImageIndex) { setIsImageLoading(true); setCurrentImageIndex(i); } };

  return (
    <Dialog open={isOpen}>
      <DialogPortal>
        <DialogOverlay className="bg-black/75 backdrop-blur-sm" />

        {/*
          ┌──────────────────────────────────────────────────────┐
          │ MOBILE  (< md): full-screen, stacked top→bottom      │
          │   image carousel (55% height) | details (flex-1)     │
          ├──────────────────────────────────────────────────────┤
          │ TABLET+ (≥ md): centred card 90vw × 90vh             │
          │   left half = image | right half = details           │
          └──────────────────────────────────────────────────────┘
        */}
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={`
            fixed z-50 outline-none
            bg-white dark:bg-gray-900
            shadow-2xl
            flex flex-col
            data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
            duration-300

            /* Mobile: full-screen sheet */
            inset-0 rounded-none

            /* Tablet+: centred floating card */
            md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
            md:w-[88vw] md:max-w-5xl md:h-[88vh] md:max-h-[760px]
            md:rounded-3xl md:overflow-hidden
            md:flex-row
          `}
        >
          {/* ── Close button (always top-right) ─────────────────────── */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3.5 right-3.5 z-50 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/25 text-white flex items-center justify-center hover:bg-black/80 transition-colors shadow-lg"
          >
            <X size={16} />
          </button>

          {/* ── Left / Top: Image carousel ───────────────────────────── */}
          {/* Mobile: fixed height; Tablet+: left half fills full height  */}
          <div className="flex-shrink-0 h-[52vw] max-h-[55vh] md:h-full md:max-h-none md:flex-1 md:flex md:flex-col">
            <ImageCarousel
              images={images}
              currentIndex={currentImageIndex}
              isLoading={isImageLoading}
              onPrev={prev}
              onNext={next}
              onGoTo={goTo}
              onImageLoad={() => setIsImageLoading(false)}
              rating={room.rating}
            />
          </div>

          {/* ── Right / Bottom: Details ──────────────────────────────── */}
          <div className="flex-1 min-h-0 md:flex-none md:w-[42%] md:flex md:flex-col border-t border-gray-100 dark:border-gray-800 md:border-t-0 md:border-l">
            <DetailsPanel room={room} onBook={() => openWhatsAppChat(room.name)} />
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
