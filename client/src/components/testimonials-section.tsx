import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    content: "Great place to stay with friends! The swimming pool, kitchen, rooms, and toilets were all well-maintained and clean. We grilled chicken with coal arranged by Joby bro. The breakfast was good, and the resort owner is very friendly.",
    name: "Dhrupath M K",
    location: "Google Reviewer · 1 month ago",
    initials: "DM",
    rating: 5,
    color: "from-primary to-tropical",
  },
  {
    content: "A wonderful place with amazing views of the surrounding valleys. Perfect for escaping city stress or planning a romantic getaway. The swimming pool and peaceful atmosphere make it an ideal destination.",
    name: "Michel Parra",
    location: "Google Reviewer · 1 year ago",
    initials: "MP",
    rating: 5,
    color: "from-tropical to-secondary",
  },
  {
    content: "Excellent experience with outstanding hospitality from Joby chettan. The treehouse rooms are surprisingly spacious and creatively designed inside. Beautiful morning views and great grilling facilities make this the perfect place for friends to stay together.",
    name: "Abhijith Vijay Yohan",
    location: "Google Reviewer · 3 years ago",
    initials: "AV",
    rating: 5,
    color: "from-secondary to-primary",
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

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { ref, visible } = useScrollReveal();

  // Auto-advance every 5s
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, [isPaused]);

  const prev = () => { setIsPaused(true); setCurrent(c => (c - 1 + testimonials.length) % testimonials.length); };
  const next = () => { setIsPaused(true); setCurrent(c => (c + 1) % testimonials.length); };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-bg-primary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-10 sm:mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-block bg-primary/10 dark:bg-tropical/20 rounded-full px-4 sm:px-6 py-2 mb-4">
            <span className="text-primary dark:text-tropical font-semibold text-xs sm:text-sm tracking-widest">TESTIMONIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-primary dark:text-text-primary mb-4">
            Guest <span className="text-tropical">Experiences</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-white/70 max-w-xl mx-auto leading-relaxed px-4">
            Hear from guests who've experienced Moon Valley's magic firsthand.
          </p>
        </div>

        {/* Desktop: 3 cards grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className={`bg-white dark:bg-bg-secondary border-0 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms`, transitionProperty: "all" }}
            >
              <CardContent className="p-6 relative">
                {/* Decorative quote */}
                <Quote size={36} className="text-tropical/15 dark:text-tropical/20 absolute top-5 right-5 rotate-180" />

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-gray-600 dark:text-white/70 leading-relaxed mb-6 min-h-[96px]">
                  "{t.content}"
                </p>

                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center font-bold text-white text-sm flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-primary dark:text-text-primary">{t.name}</div>
                    <div className="text-xs text-gray-400 dark:text-white/40">{t.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile / Tablet: single-card carousel */}
        <div className="lg:hidden max-w-md mx-auto">
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
          >
            {/* Card */}
            <div className="relative overflow-hidden rounded-3xl">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 ${i === current ? "opacity-100 translate-x-0" : "opacity-0 absolute inset-0"}`}
                  style={{ transform: i === current ? "translateX(0)" : i < current ? "translateX(-100%)" : "translateX(100%)" }}
                >
                  <Card className="border-0 bg-white dark:bg-bg-secondary shadow-xl rounded-3xl">
                    <CardContent className="p-6 relative">
                      <Quote size={32} className="text-tropical/15 absolute top-5 right-5 rotate-180" />
                      <div className="flex gap-0.5 mb-4">
                        {[...Array(t.rating)].map((_, j) => (
                          <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                        "{t.content}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center font-bold text-white text-sm flex-shrink-0`}>
                          {t.initials}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-primary dark:text-text-primary">{t.name}</div>
                          <div className="text-xs text-gray-400 dark:text-white/40">{t.location}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-5">
              <button onClick={prev} className="w-9 h-9 rounded-full bg-tropical/10 dark:bg-tropical/20 flex items-center justify-center text-tropical hover:bg-tropical hover:text-white transition-all duration-200">
                <ChevronLeft size={16} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setIsPaused(true); setCurrent(i); }}
                    className={`rounded-full transition-all duration-300 ${i === current ? "bg-tropical w-5 h-2" : "bg-gray-300 dark:bg-white/20 w-2 h-2"}`}
                  />
                ))}
              </div>
              <button onClick={next} className="w-9 h-9 rounded-full bg-tropical/10 dark:bg-tropical/20 flex items-center justify-center text-tropical hover:bg-tropical hover:text-white transition-all duration-200">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Google Rating badge */}
        <div className={`mt-10 flex justify-center transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <a
            href="https://www.google.com/maps/search/Moon+Valley+Palakkayam+Thattu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 bg-white dark:bg-bg-secondary rounded-2xl shadow-md hover:shadow-lg border border-gray-100 dark:border-white/10 transition-all duration-200 hover:-translate-y-0.5 group"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < 4 ? "text-amber-400 fill-amber-400" : "text-amber-300 fill-amber-300"} />
              ))}
            </div>
            <span className="text-sm font-bold text-primary dark:text-text-primary">4.4 / 5</span>
            <span className="text-xs text-gray-400 dark:text-white/40">on Google Reviews</span>
            <span className="text-xs font-semibold text-tropical group-hover:underline">View all →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
