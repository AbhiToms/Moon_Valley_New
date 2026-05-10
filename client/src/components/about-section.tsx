import { Award, Users, MapPin } from "lucide-react";
import LazyImage from "./lazy-image";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 3500, suffix: "ft", label: "Above Sea Level",  color: "text-primary dark:text-tropical" },
  { value: 360,  suffix: "°",  label: "Panoramic Views",  color: "text-tropical" },
  { value: 4.4,  suffix: "★",  label: "Google Rating",    color: "text-secondary dark:text-secondary" },
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

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useScrollReveal(0.5);
  const isDecimal = !Number.isInteger(target);

  useEffect(() => {
    if (!visible) return;
    const duration = 1400;
    const start = performance.now();
    const raf = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(ease * target);
      if (t < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [visible, target]);

  return (
    <span ref={ref}>
      {isDecimal ? val.toFixed(1) : Math.round(val).toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const { ref: leftRef, visible: leftVisible } = useScrollReveal();
  const { ref: rightRef, visible: rightVisible } = useScrollReveal();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — Text content */}
          <div
            ref={leftRef}
            className={`space-y-6 transition-all duration-700 ${leftVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
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

            {/* Animated Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map(({ value, suffix, label, color }, i) => (
                <div
                  key={label}
                  className="text-center p-3 sm:p-4 bg-gradient-to-br from-surface to-neutral dark:from-bg-secondary dark:to-mist rounded-2xl"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className={`text-xl sm:text-2xl md:text-3xl font-bold mb-1 ${color}`}>
                    <AnimatedNumber target={value} suffix={suffix} />
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-500 dark:text-white/60 font-medium leading-tight">{label}</div>
                </div>
              ))}
            </div>

            {/* Features list */}
            <div className="space-y-3">
              {features.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  className={`flex items-start gap-3 p-3.5 sm:p-4 bg-surface dark:bg-bg-secondary rounded-xl
                    hover:shadow-md transition-all duration-300 hover:-translate-y-0.5
                    ${leftVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                  style={{ transitionDelay: `${200 + i * 100}ms`, transitionProperty: "all" }}
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
          <div
            ref={rightRef}
            className={`relative transition-all duration-700 delay-200 ${rightVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl h-60 sm:h-72 lg:h-80 relative">
              <LazyImage
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
                alt="Moon Valley tropical hut surrounded by lush greenery"
                className="w-full h-full"
                imgClassName="hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Badge cards — same width as image */}
            <div className="flex gap-3 mt-3">
              <div className="flex-1 bg-white dark:bg-bg-secondary border border-gray-100 dark:border-white/10 rounded-2xl px-4 py-3 shadow-md text-center hover:-translate-y-1 transition-transform duration-200">
                <div className="text-xl font-bold text-primary dark:text-tropical">57+</div>
                <div className="text-xs text-gray-500 dark:text-white/60">Happy Reviews</div>
              </div>
              <div className="flex-1 bg-white dark:bg-bg-secondary border border-gray-100 dark:border-white/10 rounded-2xl px-4 py-3 shadow-md text-center hover:-translate-y-1 transition-transform duration-200">
                <div className="text-xl font-bold text-tropical">24/7</div>
                <div className="text-xs text-gray-500 dark:text-white/60">Open Access</div>
              </div>
            </div>

            {/* Decorative accents */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-tropical/10 dark:bg-tropical/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/8 dark:bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
