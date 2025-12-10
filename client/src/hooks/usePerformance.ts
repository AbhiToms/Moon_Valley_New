import { useEffect } from 'react';

export function usePerformance() {
  useEffect(() => {
    // Preload critical resources (no sensitive data involved)
    // Preload critical resources (removed to fix console warnings about unused preloads)
    // The previous implementation was preloading images that weren't immediately used, causing browser warnings.


    // Optimize scroll performance (no data logging)
    const optimizeScrolling = () => {
      let ticking = false;

      const updateScrollPosition = () => {
        ticking = false;
        // Performance optimizations only - no data collection
      };

      const requestScrollUpdate = () => {
        if (!ticking) {
          requestAnimationFrame(updateScrollPosition);
          ticking = true;
        }
      };

      window.addEventListener('scroll', requestScrollUpdate, { passive: true });

      return () => {
        window.removeEventListener('scroll', requestScrollUpdate);
      };
    };

    // Reduce layout thrashing (safe DOM optimization)
    const optimizeAnimations = () => {
      try {
        // Force GPU acceleration for smooth animations
        const animatedElements = document.querySelectorAll('.hover-lift, .animate-fadeInUp');
        animatedElements.forEach(el => {
          (el as HTMLElement).style.willChange = 'transform';
        });
      } catch (error) {
        // Silent fail
      }
    };


    const cleanupScroll = optimizeScrolling();
    optimizeAnimations();

    return cleanupScroll;
  }, []);
}

export function useImagePreloader(images: string[]) {
  useEffect(() => {
    // Safe image preloading - no sensitive data involved
    const preloadImages = images.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });

    // Use allSettled to handle failures gracefully without logging
    Promise.allSettled(preloadImages);
  }, [images]);
}