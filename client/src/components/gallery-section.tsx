import { useState, lazy, Suspense } from "react";
import LazyImage from "./lazy-image";
import { ZoomIn } from "lucide-react";

const ImageLightbox = lazy(() => import("./image-lightbox"));

type Category = "All" | "Views" | "Rooms" | "Nature" | "Dining";

const galleryImages: { src: string; alt: string; thumb: string; category: Category }[] = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    alt: "Sunrise over mountain peaks",
    category: "Views",
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    alt: "Resort nestled in lush Western Ghats",
    category: "Views",
  },
  {
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    alt: "Infinity pool with panoramic mountain reflections",
    category: "Views",
  },
  {
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    alt: "Premium suite with panoramic windows",
    category: "Rooms",
  },
  {
    src: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    alt: "Forest hiking trail through the Western Ghats",
    category: "Nature",
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    alt: "Serene spa room surrounded by natural elements",
    category: "Rooms",
  },
  {
    src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    alt: "Fine dining with breathtaking valley sunset views",
    category: "Dining",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759844-d150baec0494?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1464822759844-d150baec0494?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    alt: "Guests exploring mountain trails and scenic viewpoints",
    category: "Nature",
  },
];

const CATEGORIES: Category[] = ["All", "Views", "Rooms", "Nature", "Dining"];

/**
 * Bento grid classes — only applied on large screens (lg+) when ALL images are
 * visible. On mobile/tablet we use a simple uniform 2-col or 3-col grid.
 *
 * Layout on lg (4-col, 3-row grid):
 *   [0: 2×2] [1: 1×1] [2: 1×1]
 *   [0: cont] [3: 1×1] [4: 1×1]
 *   [5: 1×1] [6: 2×1 ] [7: 1×1]
 */
const BENTO_LG: Record<number, string> = {
  0: "lg:col-span-2 lg:row-span-2",
  6: "lg:col-span-2",
};

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const isBentoActive = activeCategory === "All" && filtered.length === galleryImages.length;

  return (
    <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-bg-secondary">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-14">
          <div className="inline-block bg-primary/10 dark:bg-tropical/20 rounded-full px-5 py-2 mb-4">
            <span className="text-primary dark:text-tropical font-semibold text-xs sm:text-sm tracking-widest">
              GALLERY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-primary dark:text-text-primary mb-3">
            Resort <span className="text-tropical">Gallery</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-white/70 max-w-xl mx-auto leading-relaxed px-4">
            A curated window into the beauty, serenity, and adventure that awaits at Moon Valley.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-6 sm:mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-tropical text-white border-tropical shadow-md shadow-tropical/20"
                  : "bg-white dark:bg-bg-primary text-gray-500 dark:text-white/60 border-gray-200 dark:border-white/10 hover:border-tropical/60 hover:text-tropical"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className={`ml-1 text-[10px] ${activeCategory === cat ? "opacity-70" : "opacity-40"}`}>
                  {galleryImages.filter((i) => i.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/*
          Grid layout:
          • Mobile  (default):  2-col uniform squares
          • Tablet  (sm):       3-col uniform squares
          • Desktop (lg):       4-col bento with featured tiles (only when All is selected)
        */}
        <div
          className={`grid gap-2 sm:gap-3 lg:gap-4 ${
            isBentoActive
              ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:auto-rows-[200px] xl:auto-rows-[220px]"
              : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {filtered.map((image, index) => {
            const bentoClass = isBentoActive ? (BENTO_LG[index] ?? "") : "";
            // On mobile/tablet: uniform aspect-square; on lg bento: fill the grid cell
            const cellClass = isBentoActive
              ? `aspect-square lg:aspect-auto ${bentoClass}`
              : "aspect-square";

            return (
              <div
                key={image.src}
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer ${cellClass}`}
                onClick={() => openLightbox(index)}
              >
                <LazyImage
                  src={image.thumb}
                  alt={image.alt}
                  className="w-full h-full"
                  imgClassName="group-hover:scale-110 transition-transform duration-500"
                />

                {/* Hover overlay — visible on touch via active state too */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-2.5 sm:p-3">
                  {/* Category chip */}
                  <div className="flex justify-end">
                    <span className="text-[9px] sm:text-[10px] font-semibold bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full border border-white/20">
                      {image.category}
                    </span>
                  </div>
                  {/* Caption + zoom */}
                  <div className="flex items-end justify-between gap-1.5">
                    <p className="text-white text-[10px] sm:text-xs font-medium leading-snug line-clamp-2 flex-1">
                      {image.alt}
                    </p>
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <ZoomIn size={12} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Photo count hint */}
        <p className="text-center text-xs text-gray-400 dark:text-white/30 mt-4">
          {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "All" ? ` in ${activeCategory}` : " · tap any to view full screen"}
        </p>
      </div>

      <Suspense fallback={<div />}>
        {lightboxOpen && (
          <ImageLightbox
            images={filtered}
            currentIndex={currentImageIndex}
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            onNavigate={setCurrentImageIndex}
          />
        )}
      </Suspense>
    </section>
  );
}
