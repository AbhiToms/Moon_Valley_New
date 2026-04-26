import { Award, Users, MapPin } from "lucide-react";
import LazyImage from "./lazy-image";

const stats = [
  { value: "3,500", unit: "ft", label: "Above Sea Level", color: "text-primary dark:text-tropical" },
  { value: "360°", unit: "", label: "Panoramic Views", color: "text-tropical" },
  { value: "4.4★", unit: "", label: "Google Rating", color: "text-secondary dark:text-secondary" },
];

const features = [
  {
    icon: Award,
    title: "Authentic Experience",
    desc: "Unique tropical hut architecture blending modern comfort with nature",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    desc: "Palakkayam Thattu — heart of Kerala's Western Ghats at 3,500 ft",
  },
  {
    icon: Users,
    title: "Nature & Adventure",
    desc: "Hiking trails, scenic viewpoints, campfire nights, and peaceful walks",
  },
];

export default function AboutSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — Text content */}
          <div className="space-y-6">
            <div>
              <div className="inline-block bg-tropical/10 dark:bg-tropical/20 rounded-full px-5 py-2 mb-4">
                <span className="text-tropical font-semibold text-xs sm:text-sm tracking-widest">ABOUT MOON VALLEY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-primary dark:text-text-primary mb-4 leading-tight">
                Your Gateway to
                <span className="block text-tropical">Nature's Paradise</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-white/70 leading-relaxed">
                Moon Valley — A Tropical Hut offers a rare hilltop experience at Palakkayam Thattu, Kerala.
                Our tropical accommodations bring breathtaking views, peaceful relaxation, and an immersive
                connection with the beauty of the Western Ghats.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map(({ value, unit, label, color }) => (
                <div
                  key={label}
                  className="text-center p-3 sm:p-4 bg-gradient-to-br from-surface to-neutral dark:from-bg-secondary dark:to-mist rounded-2xl"
                >
                  <div className={`text-xl sm:text-2xl md:text-3xl font-bold mb-1 ${color}`}>
                    {value}<span className="text-base sm:text-lg">{unit}</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-500 dark:text-white/60 font-medium leading-tight">{label}</div>
                </div>
              ))}
            </div>

            {/* Features list */}
            <div className="space-y-3">
              {features.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 p-3.5 sm:p-4 bg-surface dark:bg-bg-secondary rounded-xl"
                >
                  <div className="w-9 h-9 rounded-xl bg-tropical/10 dark:bg-tropical/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className="text-tropical" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary dark:text-text-primary text-sm mb-0.5">{title}</h4>
                    <p className="text-gray-500 dark:text-white/60 text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Image with overlay badge */}
          <div className="relative">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-[3/4]">
              <LazyImage
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
                alt="Moon Valley tropical hut surrounded by lush greenery"
                className="w-full h-full"
                imgClassName=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Small overlay info card — positioned inside the image, not overflowing */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-3">
              <div className="flex-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl text-center">
                <div className="text-xl font-bold text-primary dark:text-tropical">57+</div>
                <div className="text-xs text-gray-500 dark:text-white/60">Happy Reviews</div>
              </div>
              <div className="flex-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl text-center">
                <div className="text-xl font-bold text-tropical">24/7</div>
                <div className="text-xs text-gray-500 dark:text-white/60">Open Access</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
