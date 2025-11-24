import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: Array<{ src: string; alt: string; thumb: string }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({ 
  images, 
  currentIndex, 
  isOpen, 
  onClose, 
  onNavigate 
}: ImageLightboxProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left - go to next image
      goToNext();
    } else if (isRightSwipe) {
      // Swipe right - go to previous image
      goToPrevious();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const goToPrevious = () => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  };

  const goToNext = () => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center">
      {/* Close Button - Mobile optimized */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:bg-white/20 z-20 rounded-full w-10 h-10 md:w-12 md:h-12 backdrop-blur-sm bg-black/15"
      >
        <X size={18} className="md:hidden" />
        <X size={20} className="hidden md:block" />
      </Button>

      {/* Navigation Buttons - Mobile optimized */}
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 md:left-8 text-white hover:bg-white/20 z-20 rounded-full w-12 h-12 md:w-14 md:h-14 backdrop-blur-sm bg-black/15 transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} className="md:hidden" />
        <ChevronLeft size={28} className="hidden md:block" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 md:right-8 text-white hover:bg-white/20 z-20 rounded-full w-12 h-12 md:w-14 md:h-14 backdrop-blur-sm bg-black/15 transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation"
        aria-label="Next image"
      >
        <ChevronRight size={24} className="md:hidden" />
        <ChevronRight size={28} className="hidden md:block" />
      </Button>

      {/* Image Container - Mobile optimized with swipe support */}
      <div 
        className="relative flex items-center justify-center w-full h-full px-2 py-16 md:px-4 md:py-20 touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={images[currentIndex]?.src}
            alt={images[currentIndex]?.alt}
            className="max-w-full max-h-full object-contain rounded-lg md:rounded-xl shadow-2xl transition-opacity duration-200"
            style={{ 
              maxWidth: 'calc(100vw - 16px)', 
              maxHeight: 'calc(100vh - 140px)',
              width: '100%',
              height: 'auto'
            }}
            draggable={false}
          />
        </div>
      </div>

      {/* Image Info Bar - Mobile optimized */}
      <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-1/2 md:right-auto md:-translate-x-1/2 text-white z-20">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
          {/* Image Counter */}
          <div className="bg-black/60 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
            {currentIndex + 1} of {images.length}
          </div>
          
          {/* Image Title - Mobile friendly */}
          <div className="bg-black/60 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm max-w-full md:max-w-md truncate">
            {images[currentIndex]?.alt}
          </div>
        </div>
      </div>

      {/* Mobile Swipe Indicators with animation */}
      <div className="absolute top-1/2 left-2 -translate-y-1/2 md:hidden">
        <div className="w-1 h-8 bg-white/30 rounded-full animate-pulse"></div>
        <div className="text-white/60 text-xs mt-1 -rotate-90 origin-center whitespace-nowrap">
          Swipe
        </div>
      </div>
      <div className="absolute top-1/2 right-2 -translate-y-1/2 md:hidden">
        <div className="w-1 h-8 bg-white/30 rounded-full animate-pulse"></div>
        <div className="text-white/60 text-xs mt-1 rotate-90 origin-center whitespace-nowrap">
          Swipe
        </div>
      </div>

      {/* Thumbnail Navigation - Hidden on mobile, visible on desktop */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-2 max-w-md overflow-x-auto scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onNavigate(index)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 touch-manipulation ${
              index === currentIndex 
                ? 'border-white shadow-lg scale-110' 
                : 'border-white/30 hover:border-white/60 hover:scale-105'
            }`}
            aria-label={`Go to image ${index + 1}`}
          >
            <img
              src={image.thumb}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Background Click to Close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
      />
    </div>
  );
}
