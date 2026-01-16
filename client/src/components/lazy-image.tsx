import { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  width,
  height,
  priority = false 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.01,
        rootMargin: '200px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Optimize Unsplash images by adding format and quality parameters
  const optimizedSrc = src.includes('unsplash.com') 
    ? `${src}${src.includes('?') ? '&' : '?'}auto=format&q=75&w=${width || 800}`
    : src;

  return (
    <div className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${className}`}>
      {(isInView || priority) && (
        <img
          ref={imgRef}
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      )}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200/50 dark:bg-gray-700/50 animate-pulse" />
      )}
    </div>
  );
}
