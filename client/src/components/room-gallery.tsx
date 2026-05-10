import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  X, ChevronLeft, ChevronRight,
  Bed, Bath, Users, Wifi, Star, MapPin,
  Tv, Wind, Coffee, UtensilsCrossed, Waves, Mountain, MessageCircle,
  Check, Phone, Calendar, Shield, Flame, Trees,
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

// Per-room unique highlights
const roomHighlights: Record<string, { icon: React.ReactNode; text: string }[]> = {
  "Mountain View Suite": [
    { icon: <Mountain size={14} />, text: "360° panoramic Western Ghats view from your window" },
    { icon: <Star size={14} />, text: "Most popular room — booked 3x more than others" },
    { icon: <Wifi size={14} />, text: "High-speed WiFi with mountain-air fresh atmosphere" },
  ],
  "Forest Cottage": [
    { icon: <Trees size={14} />, text: "Immersed in dense forest canopy — nature at your doorstep" },
    { icon: <Flame size={14} />, text: "Cozy fireplace for cool misty evenings" },
    { icon: <Shield size={14} />, text: "Private, secluded — perfect for couples & families" },
  ],
  "Valley View Room": [
    { icon: <Mountain size={14} />, text: "Unobstructed valley vistas with sea-of-clouds mornings" },
    { icon: <Coffee size={14} />, text: "Private kitchenette — brew your morning tea with a view" },
    { icon: <Calendar size={14} />, text: "Best booked for 2+ nights to soak in the sunrise" },
  ],
  "Premium Villa": [
    { icon: <Waves size={14} />, text: "Exclusive private pool overlooking the valley" },
    { icon: <Star size={14} />, text: "Largest space — ideal for groups or special occasions" },
    { icon: <Shield size={14} />, text: "Full kitchen & dedicated host service" },
  ],
};

const AMENITY_META: Record<string, { icon: React.ReactNode; label: string }> = {
  WiFi:               { icon: <Wifi size={16} />,             label: "Free WiFi" },
  Balcony:            { icon: <Mountain size={16} />,          label: "Balcony" },
  "Mountain View":    { icon: <Mountain size={16} />,          label: "Mountain View" },
  "Mini Bar":         { icon: <Coffee size={16} />,            label: "Mini Bar" },
  Fireplace:          { icon: <Flame size={16} />,             label: "Fireplace" },
  "Garden Access":    { icon: <Trees size={16} />,             label: "Garden Access" },
  Kitchenette:        { icon: <UtensilsCrossed size={16} />,   label: "Kitchenette" },
  Terrace:            { icon: <Mountain size={16} />,          label: "Terrace" },
  "Valley View":      { icon: <Mountain size={16} />,          label: "Valley View" },
  "Air Conditioning": { icon: <Wind size={16} />,              label: "Air Conditioning" },
  "Private Pool":     { icon: <Waves size={16} />,             label: "Private Pool" },
  "Mountain Access":  { icon: <Mountain size={16} />,          label: "Mountain Access" },
  "Full Kitchen":     { icon: <UtensilsCrossed size={16} />,   label: "Full Kitchen" },
  TV:                 { icon: <Tv size={16} />,                label: "Smart TV" },
};

function getAmenityMeta(name: string) {
  return AMENITY_META[name] ?? { icon: <Check size={16} />, label: name };
}

/* ── Image Carousel ─────────────────────────────────────────────────────────*/
function ImageCarousel({
  images, currentIndex, isLoading,
  onPrev, onNext, onGoTo, onImageLoad, rating,
}: {
  images: string[]; currentIndex: number; isLoading: boolean;
  onPrev: () => void; onNext: () => void; onGoTo: (i: number) => void;
  onImageLoad: () => void; rating: number;
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
        {isLoading && <div className="absolute inset-0 z-10 bg-gray-800 animate-pulse" />}

        <img
          src={images[currentIndex]}
          alt={`Room photo ${currentIndex + 1}`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
          loading="eager"
          decoding="async"
          onLoad={onImageLoad}
          onError={onImageLoad}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />

        {/* Rating + photo count */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-black/55 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/15">
            <Star size={11} fill="currentColor" className="text-amber-400" />
            {rating}
          </div>
        </div>

        <div className="absolute top-4 right-14 z-10">
          <div className="bg-black/55 backdrop-blur-md text-white/80 text-xs font-medium px-3 py-1.5 rounded-full border border-white/15">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/75 hover:scale-110 transition-all duration-200 shadow-lg"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={onNext}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/75 hover:scale-110 transition-all duration-200 shadow-lg"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Bottom location tag */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 text-white/75 text-xs">
          <MapPin size={11} className="text-tropical" />
          Palakkayam Thattu, Kannur, Kerala
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex-shrink-0 flex gap-2 px-3 py-3 bg-gray-950 overflow-x-auto scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => onGoTo(i)}
              className={`flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === currentIndex
                  ? "border-tropical opacity-100 scale-105 shadow-lg shadow-tropical/30"
                  : "border-transparent opacity-40 hover:opacity-70 hover:scale-102"
              }`}
              style={{ width: 64, height: 46 }}
            >
              <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Details Panel ──────────────────────────────────────────────────────────*/
function DetailsPanel({ room, onBook }: { room: Room; onBook: () => void }) {
  const highlights = roomHighlights[room.name] ?? [
    { icon: <Mountain size={14} />, text: "Stunning panoramic views of the Western Ghats" },
    { icon: <Check size={14} />, text: "Authentic tropical hut architecture" },
    { icon: <Shield size={14} />, text: "Clean, well-maintained and peaceful" },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">

      {/* ── Scrollable body ─────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto overscroll-contain scrollbar-thin"
        style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        <div className="p-5 sm:p-6 space-y-5">

          {/* ── Room name + price ──────────────────────────────────── */}
          <div>
            <DialogTitle className="text-xl sm:text-2xl font-poppins font-bold text-primary dark:text-white leading-tight mb-1">
              {room.name}
            </DialogTitle>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-white/40">
                <MapPin size={11} className="text-tropical flex-shrink-0" />
                Palakkayam Thattu · Kannur
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-primary dark:text-tropical">
                  ₹{room.price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-gray-400 dark:text-white/40">/night</span>
              </div>
            </div>
          </div>

          {/* ── Quick stats ────────────────────────────────────────── */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: <Bed size={18} className="text-tropical" />, value: String(room.beds), sub: room.beds === 1 ? "Bed" : "Beds" },
              { icon: <Bath size={18} className="text-tropical" />, value: String(room.baths), sub: room.baths === 1 ? "Bath" : "Baths" },
              { icon: <Users size={18} className="text-tropical" />, value: `${room.beds * 2}`, sub: "Guests" },
              { icon: <Star size={18} className="text-amber-400" />, value: String(room.rating), sub: "Rating" },
            ].map(({ icon, value, sub }) => (
              <div
                key={sub}
                className="flex flex-col items-center gap-1.5 py-3 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/50 text-center hover:border-tropical/40 transition-colors duration-200"
              >
                {icon}
                <span className="text-sm font-bold text-primary dark:text-white leading-none">{value}</span>
                <span className="text-[10px] text-gray-400 dark:text-white/40 leading-none">{sub}</span>
              </div>
            ))}
          </div>

          {/* ── Description ────────────────────────────────────────── */}
          <div>
            <p className="text-[11px] font-semibold text-gray-400 dark:text-white/35 uppercase tracking-widest mb-2">
              About this room
            </p>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-white/70">{room.description}</p>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800" />

          {/* ── Why guests love it (per-room) ──────────────────────── */}
          <div className="bg-gradient-to-br from-tropical/5 to-primary/5 dark:from-tropical/10 dark:to-primary/5 border border-tropical/20 dark:border-tropical/25 rounded-2xl p-4">
            <p className="text-[11px] font-bold text-tropical uppercase tracking-widest mb-3">
              ✦ Why guests love this room
            </p>
            <ul className="space-y-2.5">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-white/70">
                  <span className="text-tropical flex-shrink-0 mt-0.5">{h.icon}</span>
                  {h.text}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Amenities ──────────────────────────────────────────── */}
          <div>
            <p className="text-[11px] font-semibold text-gray-400 dark:text-white/35 uppercase tracking-widest mb-3">
              What's included
            </p>
            <div className="grid grid-cols-2 gap-2">
              {room.amenities.map((amenity) => {
                const meta = getAmenityMeta(amenity);
                return (
                  <div
                    key={amenity}
                    className="flex items-center gap-2.5 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-100 dark:border-gray-700/50 hover:border-tropical/40 hover:bg-tropical/5 dark:hover:bg-tropical/10 transition-all duration-200"
                  >
                    <span className="text-tropical flex-shrink-0">{meta.icon}</span>
                    <span className="text-xs font-medium text-gray-700 dark:text-white/75 leading-tight">{meta.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Policies ───────────────────────────────────────────── */}
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-4 border border-gray-100 dark:border-gray-700/40">
            <p className="text-[11px] font-semibold text-gray-400 dark:text-white/35 uppercase tracking-widest mb-3">
              Policies & info
            </p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-600 dark:text-white/65">
              {[
                { label: "Check-in",   value: "12:00 PM" },
                { label: "Check-out",  value: "11:00 AM" },
                { label: "Pets",       value: "Not allowed" },
                { label: "Smoking",    value: "Outdoor only" },
                { label: "Breakfast",  value: "Available (extra)" },
                { label: "Booking",    value: "Instant via WhatsApp" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span className="text-gray-400 dark:text-white/35">{label}: </span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-2" />
        </div>
      </div>

      {/* ── Sticky CTA footer ───────────────────────────────────────── */}
      <div className="flex-shrink-0 p-4 sm:p-5 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 space-y-2">
        {/* Price reminder */}
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-gray-400 dark:text-white/40">Starting from</span>
          <span className="text-lg font-bold text-primary dark:text-tropical">
            ₹{room.price.toLocaleString("en-IN")} <span className="text-xs font-normal text-gray-400">/night</span>
          </span>
        </div>

        {/* Primary WhatsApp CTA */}
        <button
          onClick={onBook}
          className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full py-3.5 text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-[0_6px_24px_rgba(37,211,102,0.45)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <MessageCircle size={18} />
          Reserve on WhatsApp
        </button>

        {/* Secondary Call CTA */}
        <a
          href="tel:+919446986882"
          className="w-full flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-white/60 rounded-full py-2.5 text-xs font-semibold hover:border-primary dark:hover:border-tropical hover:text-primary dark:hover:text-tropical transition-all duration-200"
        >
          <Phone size={14} />
          Call to enquire · +91 94469 86882
        </a>

        <p className="text-center text-[10px] text-gray-400 dark:text-white/25 pt-0.5">
          Instant reply · No booking fee · Free cancellation
        </p>
      </div>
    </div>
  );
}

/* ── Main export ────────────────────────────────────────────────────────────*/
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

  const images = room ? (roomImages[room.name] || [room.image]) : [];

  const next = useCallback(() => { setIsImageLoading(true); setCurrentImageIndex((p) => (p + 1) % images.length); }, [images.length]);
  const prev = useCallback(() => { setIsImageLoading(true); setCurrentImageIndex((p) => (p - 1 + images.length) % images.length); }, [images.length]);
  const goTo = useCallback((i: number) => { if (i !== currentImageIndex) { setIsImageLoading(true); setCurrentImageIndex(i); } }, [currentImageIndex]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || !room) return;
      if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      if (e.key === "Escape")     { e.preventDefault(); onClose(); }
    },
    [isOpen, room, prev, next, onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  if (!room) return null;

  return (
    <Dialog open={isOpen}>
      <DialogPortal>
        <DialogOverlay className="bg-black/80 backdrop-blur-sm" />

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

            inset-0 rounded-none

            md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
            md:w-[90vw] md:max-w-5xl md:h-[90vh] md:max-h-[780px]
            md:rounded-3xl md:overflow-hidden
            md:flex-row
          `}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3.5 right-3.5 z-50 w-9 h-9 rounded-full bg-black/65 backdrop-blur-sm border border-white/25 text-white flex items-center justify-center hover:bg-black/85 hover:scale-110 transition-all duration-200 shadow-xl"
          >
            <X size={16} />
          </button>

          {/* Left / Top: Image carousel */}
          <div className="flex-shrink-0 h-[52vw] max-h-[55vh] md:h-full md:max-h-none md:flex-1 md:flex md:flex-col">
            <ImageCarousel
              images={images}
              currentIndex={currentImageIndex}
              isLoading={isImageLoading}
              onPrev={prev}
              onNext={next}
              onGoTo={goTo}
              onImageLoad={() => setIsImageLoading(false)}
              rating={parseFloat(room.rating as unknown as string)}
            />
          </div>

          {/* Right / Bottom: Details */}
          <div className="flex-1 min-h-0 md:flex-none md:w-[42%] md:flex md:flex-col border-t border-gray-100 dark:border-gray-800 md:border-t-0 md:border-l dark:md:border-gray-800">
            <DetailsPanel room={room} onBook={() => openWhatsAppChat(room.name)} />
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
