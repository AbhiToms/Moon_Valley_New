import { useState, Suspense, lazy } from "react";
import LazyImage from "./lazy-image";

const ImageLightbox = lazy(() => import("./image-lightbox"));

const galleryImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
  "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
  "https://images.unsplash.com/photo-1464822759844-d150baec0494?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
];

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Resort <span className="text-emerald-600 dark:text-emerald-400">Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the beauty that awaits you at Moon Valley
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, idx) => (
            <div
              key={idx}
              onClick={() => {
                setCurrentImageIndex(idx);
                setLightboxOpen(true);
              }}
              className="relative h-48 md:h-64 rounded-lg overflow-hidden cursor-pointer group"
            >
              <LazyImage src={image} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all" />
            </div>
          ))}
        </div>
      </div>

      <Suspense fallback={null}>
        {lightboxOpen && <ImageLightbox images={galleryImages} currentIndex={currentImageIndex} onClose={() => setLightboxOpen(false)} />}
      </Suspense>
    </section>
  );
}
