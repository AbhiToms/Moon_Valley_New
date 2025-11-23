import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight, Bed, Bath, Users, Wifi, Star, MapPin, Heart } from "lucide-react";
import type { Room } from "@shared/schema";

interface RoomGalleryProps {
    room: Room | null;
    isOpen: boolean;
    onClose: () => void;
    onBookNow: () => void;
}

// Sample room images - in a real app, these would come from the database
const roomImages: Record<string, string[]> = {
    "Mountain View Suite": [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    "Forest Cottage": [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1540518614846-7eded47432f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    "Valley View Room": [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    "Luxury Villa": [
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ]
};

export default function RoomGallery({ room, isOpen, onClose, onBookNow }: RoomGalleryProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);

    // Reset image index when room changes
    useEffect(() => {
        if (isOpen && room) {
            setCurrentImageIndex(0);
            setIsImageLoading(true);

            // Fallback timeout to prevent stuck loading state
            const loadingTimeout = setTimeout(() => {
                setIsImageLoading(false);
            }, 3000); // 3 second timeout

            return () => clearTimeout(loadingTimeout);
        }
    }, [room?.id, isOpen]);

    // Add timeout for image loading to prevent stuck state
    useEffect(() => {
        if (isImageLoading) {
            const loadingTimeout = setTimeout(() => {
                setIsImageLoading(false);
            }, 2000); // 2 second timeout for individual images

            return () => clearTimeout(loadingTimeout);
        }
    }, [isImageLoading, currentImageIndex]);

    // Keyboard navigation
    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (!isOpen || !room) return;

        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                prevImage();
                break;
            case 'ArrowRight':
                event.preventDefault();
                nextImage();
                break;
            case 'Escape':
                event.preventDefault();
                onClose();
                break;
        }
    }, [isOpen, room]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    // Early return after all hooks are declared
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
        setIsImageLoading(true);
        setCurrentImageIndex(index);
    };

    const handleImageLoad = () => {
        setIsImageLoading(false);
    };

    const handleImageError = () => {
        setIsImageLoading(false);
    };

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    return (
        <>
            <Dialog open={isOpen}>
                <DialogPortal>
                    <DialogOverlay />
                    <DialogPrimitive.Content className="fixed inset-0 md:left-8 md:right-8 md:top-2 md:bottom-2 lg:left-12 lg:right-12 lg:top-4 lg:bottom-4 xl:left-16 xl:right-16 xl:top-6 xl:bottom-6 2xl:left-20 2xl:right-20 2xl:top-8 2xl:bottom-8 z-50 w-full md:w-auto border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-2xl dark:shadow-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-none md:rounded-2xl lg:rounded-3xl p-0 max-h-screen md:max-h-[96vh] lg:max-h-[98vh] overflow-y-auto overflow-x-hidden scrollbar-hide">
                        {/* Close Button - Sticky within dialog */}
                        <Button
                            onClick={onClose}
                            variant="ghost"
                            size="sm"
                            className="sticky top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 float-right z-[60] bg-black/40 dark:bg-black/30 backdrop-blur-xl hover:bg-black/60 dark:hover:bg-black/50 text-white border-2 border-white/60 dark:border-white/50 hover:border-white/80 dark:hover:border-white/70 rounded-full w-12 h-12 sm:w-11 sm:h-11 md:w-12 md:h-12 p-0 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/15 before:to-black/10 before:pointer-events-none mb-[-48px]"
                        >
                            <X size={18} className="sm:w-5 sm:h-5 md:w-5 md:h-5 relative z-10 drop-shadow-lg" />
                        </Button>
                        <div className="relative w-full">

                            {/* Main Image */}
                            <div className="group relative w-full h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh] overflow-hidden rounded-t-none md:rounded-t-xl lg:rounded-t-2xl bg-gray-100 dark:bg-gray-800">
                                {/* Loading Skeleton */}
                                {isImageLoading && (
                                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                                        <div className="text-gray-400 dark:text-gray-500">Loading...</div>
                                    </div>
                                )}

                                <img
                                    src={images[currentImageIndex]}
                                    alt={`${room.name} - Image ${currentImageIndex + 1}`}
                                    className={`w-full h-full object-cover object-center transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'
                                        }`}
                                    onLoad={handleImageLoad}
                                    onError={handleImageError}
                                    loading="eager"
                                />

                                {/* Image Overlay Controls */}
                                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex gap-2">
                                    <Button
                                        onClick={toggleLike}
                                        variant="ghost"
                                        size="sm"
                                        className={`backdrop-blur-xl rounded-full w-11 h-11 sm:w-10 sm:h-10 p-0 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation before:absolute before:inset-0 before:rounded-full before:pointer-events-none ${isLiked
                                            ? 'bg-red-500/40 dark:bg-red-500/35 border-2 border-red-300/60 dark:border-red-400/50 hover:bg-red-500/60 dark:hover:bg-red-500/55 hover:border-red-300/80 dark:hover:border-red-400/70 text-red-100 before:bg-gradient-to-br before:from-red-200/20 before:to-red-800/10'
                                            : 'bg-black/40 dark:bg-black/30 border-2 border-white/60 dark:border-white/50 hover:bg-black/60 dark:hover:bg-black/50 hover:border-white/80 dark:hover:border-white/70 text-white before:bg-gradient-to-br before:from-white/15 before:to-black/10'
                                            }`}
                                    >
                                        <Heart size={16} className={`sm:w-4 sm:h-4 relative z-10 drop-shadow-lg ${isLiked ? 'fill-current' : ''}`} />
                                    </Button>
                                </div>

                                {/* Navigation Arrows */}
                                {images.length > 1 && (
                                    <>
                                        <Button
                                            onClick={prevImage}
                                            variant="ghost"
                                            size="sm"
                                            className="absolute left-1 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 bg-black/40 dark:bg-black/30 backdrop-blur-xl hover:bg-black/60 dark:hover:bg-black/50 text-white border-2 border-white/60 dark:border-white/50 hover:border-white/80 dark:hover:border-white/70 rounded-full w-12 h-12 sm:w-11 sm:h-11 md:w-12 md:h-12 p-0 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 opacity-90 hover:opacity-100 z-10 touch-manipulation disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/15 before:to-black/10 before:pointer-events-none"
                                            disabled={isImageLoading}
                                        >
                                            <ChevronLeft size={18} className="sm:w-5 sm:h-5 md:w-5 md:h-5 relative z-10 drop-shadow-lg" />
                                        </Button>
                                        <Button
                                            onClick={nextImage}
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-1 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 bg-black/40 dark:bg-black/30 backdrop-blur-xl hover:bg-black/60 dark:hover:bg-black/50 text-white border-2 border-white/60 dark:border-white/50 hover:border-white/80 dark:hover:border-white/70 rounded-full w-12 h-12 sm:w-11 sm:h-11 md:w-12 md:h-12 p-0 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 opacity-90 hover:opacity-100 z-10 touch-manipulation disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/15 before:to-black/10 before:pointer-events-none"
                                            disabled={isImageLoading}
                                        >
                                            <ChevronRight size={18} className="sm:w-5 sm:h-5 md:w-5 md:h-5 relative z-10 drop-shadow-lg" />
                                        </Button>
                                    </>
                                )}

                                {/* Swipe Area for Mobile */}
                                <div
                                    className="absolute inset-0 touch-pan-y"
                                    onTouchStart={(e) => {
                                        const touch = e.touches[0];
                                        e.currentTarget.dataset.startX = touch.clientX.toString();
                                    }}
                                    onTouchEnd={(e) => {
                                        const touch = e.changedTouches[0];
                                        const startX = parseFloat(e.currentTarget.dataset.startX || '0');
                                        const diffX = touch.clientX - startX;

                                        if (Math.abs(diffX) > 50) { // Minimum swipe distance
                                            if (diffX > 0) {
                                                prevImage();
                                            } else {
                                                nextImage();
                                            }
                                        }
                                    }}
                                />

                                {/* Image Counter */}
                                <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-black/50 dark:bg-black/60 backdrop-blur-lg text-white px-4 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-sm font-semibold border border-white/40 dark:border-white/50 shadow-xl">
                                    <span className="drop-shadow-md">{currentImageIndex + 1} / {images.length}</span>
                                </div>
                            </div>

                            {/* Thumbnail Strip */}
                            {images.length > 1 && (
                                <div className="bg-gradient-to-r from-surface/50 to-neutral/50 dark:from-gray-800/50 dark:to-gray-700/50 p-3 sm:p-4 md:p-6 border-b border-primary/10 dark:border-gray-600/30">
                                    <div className="max-w-4xl mx-auto">
                                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                                            <h4 className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-white/70">
                                                Gallery ({images.length} photos)
                                            </h4>

                                        </div>
                                        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide w-full">
                                            {images.map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => goToImage(index)}
                                                    className={`relative flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-18 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${index === currentImageIndex
                                                        ? "border-tropical shadow-lg ring-2 ring-tropical/20"
                                                        : "border-gray-200 dark:border-gray-600 hover:border-tropical/50 shadow-sm"
                                                        }`}
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    {index === currentImageIndex && (
                                                        <div className="absolute inset-0 bg-tropical/20 flex items-center justify-center">
                                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                                        </div>
                                                    )}
                                                    <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 bg-black/50 text-white text-[10px] sm:text-xs px-1 rounded">
                                                        {index + 1}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Room Details */}
                            <div className="p-3 sm:p-4 md:p-6 lg:p-8 max-w-none w-full space-y-2 sm:space-y-3 md:space-y-4">
                                {/* Header Section */}
                                <div className="bg-gradient-to-r from-primary/10 via-tropical/10 to-secondary/10 dark:from-primary/20 dark:via-tropical/20 dark:to-secondary/20 p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl border border-primary/10 dark:border-gray-600/30">
                                    <div className="flex flex-col lg:flex-row items-start justify-between gap-3 lg:gap-6 w-full">
                                        <div className="flex-1 min-w-0 w-full lg:w-auto">
                                            <DialogTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-poppins font-bold text-primary dark:text-text-primary mb-2 leading-tight break-words">
                                                {room.name}
                                            </DialogTitle>
                                            <div className="flex items-center text-gray-600 dark:text-white/70 mb-4 flex-wrap">
                                                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 bg-gradient-to-r from-tropical/20 to-secondary/20 rounded-lg flex items-center justify-center mr-2 flex-shrink-0">
                                                    <MapPin size={10} className="sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-tropical" />
                                                </div>
                                                <span className="font-medium text-xs sm:text-sm md:text-sm lg:text-base break-words">Palakkayam Thattu, Kerala</span>
                                            </div>
                                        </div>
                                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg lg:rounded-xl p-3 lg:p-4 xl:p-5 border border-primary/20 dark:border-gray-600/30 w-full lg:w-auto lg:min-w-[280px] xl:min-w-[320px]">
                                            <div className="text-center lg:text-right">
                                                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary dark:text-tropical whitespace-nowrap">
                                                    ₹{room.price.toLocaleString()}
                                                </div>
                                                <div className="text-gray-500 dark:text-white/60 text-xs md:text-sm font-medium whitespace-nowrap">per night</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                {/* Room Features */}
                                <div className="bg-gradient-to-r from-surface/50 to-neutral/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg p-3 md:p-4 lg:p-5 border border-primary/10 dark:border-gray-600/30">
                                    <div className="flex items-center mb-3">
                                        <div className="w-7 h-7 bg-gradient-to-r from-primary/20 to-tropical/20 rounded-lg flex items-center justify-center mr-2">
                                            <Star className="text-primary dark:text-tropical" size={16} />
                                        </div>
                                        <h3 className="text-sm md:text-base font-poppins font-bold text-primary dark:text-text-primary">Room Features</h3>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
                                        <div className="flex items-center p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 touch-manipulation">
                                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-tropical/20 to-secondary/20 rounded-lg flex items-center justify-center mr-2 md:mr-3">
                                                <Bed size={16} className="text-tropical md:w-5 md:h-5" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-primary dark:text-text-primary text-sm md:text-base">{room.beds}</div>
                                                <div className="text-xs text-gray-600 dark:text-white/70 font-medium">Beds</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 touch-manipulation">
                                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-tropical/20 to-secondary/20 rounded-lg flex items-center justify-center mr-2 md:mr-3">
                                                <Bath size={16} className="text-tropical md:w-5 md:h-5" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-primary dark:text-text-primary text-sm md:text-base">{room.baths}</div>
                                                <div className="text-xs text-gray-600 dark:text-white/70 font-medium">Baths</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 touch-manipulation">
                                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-tropical/20 to-secondary/20 rounded-lg flex items-center justify-center mr-2 md:mr-3">
                                                <Users size={16} className="text-tropical md:w-5 md:h-5" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-primary dark:text-text-primary text-sm md:text-base">6</div>
                                                <div className="text-xs text-gray-600 dark:text-white/70 font-medium">Guests</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 touch-manipulation">
                                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-tropical/20 to-secondary/20 rounded-lg flex items-center justify-center mr-2 md:mr-3">
                                                <Wifi size={16} className="text-tropical md:w-5 md:h-5" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-primary dark:text-text-primary text-sm md:text-base">Free</div>
                                                <div className="text-xs text-gray-600 dark:text-white/70 font-medium">WiFi</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="bg-gradient-to-r from-surface/50 to-neutral/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg p-3 md:p-4 lg:p-5 border border-primary/10 dark:border-gray-600/30">
                                    <div className="flex items-center mb-3">
                                        <div className="w-7 h-7 bg-gradient-to-r from-secondary/20 to-tropical/20 rounded-lg flex items-center justify-center mr-2">
                                            <MapPin className="text-secondary dark:text-tropical" size={16} />
                                        </div>
                                        <h3 className="text-sm md:text-base font-poppins font-bold text-primary dark:text-text-primary">About This Room</h3>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4 shadow-sm">
                                        <p className="text-gray-600 dark:text-white/80 leading-relaxed text-sm md:text-base">
                                            {room.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Amenities */}
                                <div className="bg-gradient-to-r from-surface/50 to-neutral/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg p-3 md:p-4 lg:p-5 border border-primary/10 dark:border-gray-600/30">
                                    <div className="flex items-center mb-3">
                                        <div className="w-7 h-7 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mr-2">
                                            <Wifi className="text-primary dark:text-primary" size={16} />
                                        </div>
                                        <h3 className="text-sm md:text-base font-poppins font-bold text-primary dark:text-text-primary">Amenities</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2 md:gap-3">
                                        {room.amenities.filter(amenity => amenity !== "Mini Bar").map((amenity, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 dark:from-gray-800 dark:to-gray-900 dark:text-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-800 dark:border-gray-600 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold rounded-full transition-all duration-300 shadow-sm touch-manipulation"
                                            >
                                                {amenity}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* Sticky Book Now Button */}
                            <div className="sticky bottom-4 left-0 right-0 p-4 md:p-6">
                                <div className="flex justify-center">
                                    <Button
                                        onClick={onBookNow}
                                        className="bg-gradient-to-r from-primary to-tropical text-white rounded-full py-3 md:py-4 px-8 md:px-12 text-sm md:text-base font-poppins font-bold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl touch-manipulation min-w-[200px] md:min-w-[250px]"
                                    >
                                        Book This Room
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </DialogPrimitive.Content>
                </DialogPortal>
            </Dialog>
        </>
    );
}