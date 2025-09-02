import { useEffect } from 'react';

export function usePerformance() {
  useEffect(() => {
    // Preload critical resources (no sensitive data involved)
    const preloadCriticalImages = () => {
      const criticalImages = [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
      ];

      criticalImages.forEach(src => {
        try {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          document.head.appendChild(link);
        } catch (error) {
          // Silent fail - don't log errors that might contain sensitive info
        }
      });
    };

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

    preloadCriticalImages();
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