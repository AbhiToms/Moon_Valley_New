import { useState, useEffect, useCallback, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
 X, ChevronLeft, ChevronRight,
 Bed, Bath, Users, Wifi, Star, MapPin,
 Tv, Wind, Coffee, UtensilsCrossed, Waves, Mountain, MessageCircle,
 Check, Phone, Calendar, Shield, Flame, Trees,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { openWhatsAppChat } from "@/utils/whatsapp";
import type { Room } from "@shared/schema";

const ImageLightbox = lazy(() => import("./image-lightbox"));

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
 WiFi: { icon: <Wifi size={16} />, label: "Free WiFi" },
 Balcony: { icon: <Mountain size={16} />, label: "Balcony" },
 "Mountain View": { icon: <Mountain size={16} />, label: "Mountain View" },
 "Mini Bar": { icon: <Coffee size={16} />, label: "Mini Bar" },
 Fireplace: { icon: <Flame size={16} />, label: "Fireplace" },
 "Garden Access": { icon: <Trees size={16} />, label: "Garden Access" },
 Kitchenette: { icon: <UtensilsCrossed size={16} />, label: "Kitchenette" },
 Terrace: { icon: <Mountain size={16} />, label: "Terrace" },
 "Valley View": { icon: <Mountain size={16} />, label: "Valley View" },
 "Air Conditioning": { icon: <Wind size={16} />, label: "Air Conditioning" },
 "Private Pool": { icon: <Waves size={16} />, label: "Private Pool" },
 "Mountain Access": { icon: <Mountain size={16} />, label: "Mountain Access" },
 "Full Kitchen": { icon: <UtensilsCrossed size={16} />, label: "Full Kitchen" },
 TV: { icon: <Tv size={16} />, label: "Smart TV" },
};

function getAmenityMeta(name: string) {
 return AMENITY_META[name] ?? { icon: <Check size={16} />, label: name };
}

/* ── Image Carousel ─────────────────────────────────────────────────────────*/
function ImageCarousel({
  images, currentIndex, isLoading,
  onPrev, onNext, onGoTo, onImageLoad, rating, onImageClick
}: {
 images: string[]; currentIndex: number; isLoading: boolean;
 onPrev: () => void; onNext: () => void; onGoTo: (i: number) => void;
 onImageLoad: () => void; rating: number;
  onImageClick?: () => void;
}) {
 return (
 <div className="relative flex flex-col h-full bg-surface">
 {/* Main image */}
 <div
 className="relative flex-1 overflow-hidden"
 onTouchStart={(e) => { e.currentTarget.dataset.startX = e.touches[0].clientX.toString(); }}
 onTouchEnd={(e) => {
 const diff = e.changedTouches[0].clientX - parseFloat(e.currentTarget.dataset.startX || "0");
 if (Math.abs(diff) > 40) diff > 0 ? onPrev() : onNext();
 }}
 >
 {isLoading && <div className="absolute inset-0 z-10 bg-neutral animate-pulse" />}

 <img
 src={images[currentIndex]}
 alt={`Room photo ${currentIndex + 1}`}
        onClick={onImageClick}
 className={`w-full h-full object-cover transition-opacity duration-300 ${onImageClick ? "cursor-pointer hover:opacity-95" : ""} ${isLoading ? "opacity-0" : "opacity-100"}`}
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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

/* ── Details Panel ──────────────────────────────────────────────────────────*/
function DetailsPanel({ room, onBook }: { room: Room; onBook: () => void }) {
  const highlights = roomHighlights[room.name] ?? [
    { icon: <Mountain size={14} />, text: "Stunning panoramic views of the Western Ghats" },
    { icon: <Check size={14} />, text: "Authentic tropical hut architecture" },
    { icon: <Shield size={14} />, text: "Clean, well-maintained and peaceful" },
  ];

  return (
    <div className="flex flex-col h-full bg-surface/95 backdrop-blur-3xl">
      {/* ── Scrollable body ─────────────────────────────────────────── */}
      <motion.div
        className="flex-1 overflow-y-auto overscroll-contain scrollbar-thin"
        style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <div className="p-5 sm:p-7 space-y-7">
          {/* ── Room name + price ──────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <div className="inline-block bg-primary/10 dark:bg-tropical/10 rounded-full px-3 py-1 mb-3">
              <span className="text-primary dark:text-tropical font-semibold text-xs tracking-widest uppercase">Premium Room</span>
            </div>
            <DialogTitle className="text-3xl sm:text-4xl font-poppins font-bold text-text-primary leading-tight mb-3">
              {room.name}
            </DialogTitle>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5 text-sm font-medium text-text-secondary bg-bg-secondary dark:bg-white/5 px-3 py-1.5 rounded-full border border-gray-100 dark:border-white/10">
                <MapPin size={14} className="text-tropical flex-shrink-0" />
                Palakkayam Thattu · Kannur
              </div>
            </div>
          </motion.div>

          {/* ── Quick stats ────────────────────────────────────────── */}
          <motion.div variants={fadeUp} className="grid grid-cols-4 gap-3">
            {[
              { icon: <Bed size={20} className="text-tropical" />, value: String(room.beds), sub: room.beds === 1 ? "Bed" : "Beds" },
              { icon: <Bath size={20} className="text-tropical" />, value: String(room.baths), sub: room.baths === 1 ? "Bath" : "Baths" },
              { icon: <Users size={20} className="text-tropical" />, value: `${room.beds * 2}`, sub: "Guests" },
              { icon: <Star size={20} className="text-amber-400 drop-shadow-sm" />, value: String(room.rating), sub: "Rating" },
            ].map(({ icon, value, sub }) => (
              <div
                key={sub}
                className="group flex flex-col items-center gap-2.5 py-4 bg-gradient-to-b from-bg-secondary to-surface dark:from-white/5 dark:to-transparent rounded-2xl border border-gray-100 dark:border-white/10 text-center hover:border-tropical/50 hover:shadow-lg dark:hover:shadow-tropical/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </div>
                <div>
                  <div className="text-xl font-bold text-text-primary leading-none mb-1">{value}</div>
                  <div className="text-[11px] font-medium text-text-secondary leading-none uppercase tracking-wider">{sub}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── Description ────────────────────────────────────────── */}
          <motion.div variants={fadeUp} className="relative">
            <h4 className="text-xs sm:text-sm font-bold text-text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-tropical rounded-full" />
              About this room
            </h4>
            <p className="text-base sm:text-lg leading-relaxed text-text-secondary/90">{room.description}</p>
          </motion.div>

          {/* ── Why guests love it (per-room) ──────────────────────── */}
          <motion.div variants={fadeUp} className="relative overflow-hidden bg-gradient-to-br from-tropical/10 via-primary/5 to-surface dark:from-tropical/20 dark:via-tropical/5 dark:to-transparent border border-tropical/20 dark:border-tropical/30 rounded-3xl p-6 shadow-sm group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-tropical/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 group-hover:scale-150 transition-transform duration-700" />
            <h4 className="text-xs font-bold text-tropical uppercase tracking-widest mb-5 flex items-center gap-2">
              <Star size={14} className="fill-tropical" />
              Why guests love this room
            </h4>
            <ul className="space-y-4 relative z-10">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3.5 text-sm sm:text-base text-text-primary font-medium leading-relaxed group/item">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-tropical/20 text-tropical flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                    {h.icon}
                  </span>
                  {h.text}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Amenities ──────────────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <h4 className="text-xs sm:text-sm font-bold text-text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-tropical rounded-full" />
              What's included
            </h4>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {room.amenities.map((amenity) => {
                const meta = getAmenityMeta(amenity);
                return (
                  <div
                    key={amenity}
                    className="group flex items-center gap-3.5 p-3.5 sm:p-4 bg-bg-secondary dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-tropical/50 hover:bg-tropical/5 dark:hover:bg-tropical/10 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <span className="text-tropical flex-shrink-0 group-hover:scale-110 transition-transform duration-300">{meta.icon}</span>
                    <span className="text-sm font-semibold text-text-primary leading-tight">{meta.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ── Policies ───────────────────────────────────────────── */}
          <motion.div variants={fadeUp} className="bg-bg-secondary/50 dark:bg-white/[0.02] rounded-3xl p-5 sm:p-6 border border-gray-100 dark:border-white/5">
            <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-5 flex items-center gap-2">
              Policies & info
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
              {[
                { label: "Check-in", value: "12:00 PM" },
                { label: "Check-out", value: "11:00 AM" },
                { label: "Pets", value: "Not allowed" },
                { label: "Smoking", value: "Outdoor only" },
                { label: "Breakfast", value: "Available (extra)" },
                { label: "Booking", value: "Instant via WhatsApp" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5 group">
                  <span className="text-text-secondary/70 text-xs uppercase tracking-wider">{label}</span>
                  <span className="font-semibold text-text-primary group-hover:text-tropical transition-colors duration-200">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="h-4" />
        </div>
      </motion.div>

      {/* ── Sticky CTA footer ───────────────────────────────────────── */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex-shrink-0 p-5 sm:p-6 bg-surface/90 backdrop-blur-xl border-t border-gray-100 dark:border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)] relative z-10"
      >
        <div className="flex items-end justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">Total Price</span>
            <span className="text-2xl sm:text-3xl font-poppins font-bold text-primary dark:text-tropical leading-none">
              ₹{room.price.toLocaleString("en-IN")}
            </span>
          </div>
          <span className="text-sm font-medium text-text-secondary bg-bg-secondary dark:bg-white/5 px-2 py-1 rounded-md">per night</span>
        </div>

        <button
          onClick={onBook}
          className="relative overflow-hidden w-full group flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-2xl py-4 text-base font-bold transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:-translate-y-0.5 active:translate-y-0"
        >
          <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out skew-x-12" />
          <FaWhatsapp size={22} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
          <span className="relative z-10">Reserve on WhatsApp</span>
        </button>

        <a
          href="tel:+919446986882"
          className="group w-full flex items-center justify-center gap-2 border-2 border-gray-200 dark:border-white/10 text-text-primary rounded-2xl py-3 text-sm font-semibold hover:border-primary dark:hover:border-tropical hover:text-primary dark:hover:text-tropical transition-all duration-300 mt-3 hover:bg-primary/5 dark:hover:bg-tropical/5"
        >
          <Phone size={16} className="group-hover:rotate-12 transition-transform duration-300" />
          Call to enquire · +91 94469 86882
        </a>

        <p className="text-center text-xs font-medium text-text-secondary/80 pt-4 flex justify-center items-center gap-4">
          <span className="flex items-center gap-1"><Check size={12} className="text-tropical" /> Instant reply</span>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
          <span className="flex items-center gap-1"><Check size={12} className="text-tropical" /> No booking fee</span>
        </p>
      </motion.div>
    </div>
  );
}

/* ── Main export ────────────────────────────────────────────────────────────*/
export default function RoomGallery({ room, isOpen, onClose }: RoomGalleryProps) {
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
 const [isImageLoading, setIsImageLoading] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const justClosed = useRef(false);

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
 if (!isOpen || !room || isLightboxOpen) return;
 if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
 if (e.key === "ArrowRight") { e.preventDefault(); next(); }
 if (e.key === "Escape") { e.preventDefault(); onClose(); }
 },
 [isOpen, room, isLightboxOpen, prev, next, onClose],
 );

 useEffect(() => {
 document.addEventListener("keydown", handleKey);
 return () => document.removeEventListener("keydown", handleKey);
 }, [handleKey]);

 if (!room) return null;

 return (
 <Dialog open={isOpen} onOpenChange={(open) => { if (justClosed.current) return; if (!open && !isLightboxOpen) onClose(); }}>
 <DialogPortal>
 <DialogOverlay className="bg-black/80 backdrop-blur-sm" />

 <DialogPrimitive.Content
  aria-describedby={undefined}
  onInteractOutside={(e) => { if (isLightboxOpen) e.preventDefault(); }}
 className={`
 fixed z-50 outline-none
 bg-surface 
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
              onImageClick={() => { if (justClosed.current) return; setIsLightboxOpen(true); }}
 />
 </div>

 {/* Right / Bottom: Details */}
 <div className="flex-1 min-h-0 md:flex-none md:w-[42%] md:flex md:flex-col border-t border-gray-100 dark:border-gray-800 md:border-t-0 md:border-l dark:md:border-gray-800">
 <DetailsPanel room={room} onBook={() => openWhatsAppChat(room.name)} />
 </div>
   </DialogPrimitive.Content>

  {isLightboxOpen && room && (
    <div 
      className="fixed inset-0 z-[100] pointer-events-auto"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <Suspense fallback={null}>
        <ImageLightbox
          images={images.map((src, i) => ({ src, thumb: src, alt: `${room.name} ${i + 1}` }))}
          currentIndex={currentImageIndex}
          isOpen={isLightboxOpen}
          onClose={() => { setIsLightboxOpen(false); justClosed.current = true; setTimeout(() => { justClosed.current = false; }, 500); }}
          onNavigate={goTo}
        />
      </Suspense>
    </div>
  )}

  </DialogPortal>
  </Dialog>
  );
}