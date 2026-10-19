import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

const variants = {
 enter: (direction: number) => {
 return {
 x: direction > 0 ? 300 : -300,
 opacity: 0,
 scale: 0.95,
 };
 },
 center: {
 zIndex: 1,
 x: 0,
 opacity: 1,
 scale: 1,
 },
 exit: (direction: number) => {
 return {
 zIndex: 0,
 x: direction < 0 ? 300 : -300,
 opacity: 0,
 scale: 0.95,
 };
 }
};

export default function TestimonialsSection() {
 const [[page, direction], setPage] = useState([0, 0]);
 const [isPaused, setIsPaused] = useState(false);

 // Auto-advance every 5s
 useEffect(() => {
 if (isPaused) return;
 const t = setInterval(() => {
 paginate(1);
 }, 5000);
 return () => clearInterval(t);
 }, [isPaused, page]);

 const paginate = (newDirection: number) => {
 setPage([page + newDirection, newDirection]);
 };

 const imageIndex = Math.abs(page % testimonials.length);
 const currentTestimonial = testimonials[imageIndex];

 return (
 <section className="py-12 sm:py-16 lg:py-20 bg-surface overflow-hidden">
 <div className="container mx-auto px-4 sm:px-6">

 {/* Header */}
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-100px" }}
 transition={{ duration: 0.7 }}
 className="text-center mb-10 sm:mb-14"
 >
 <div className="inline-block bg-primary/10 dark:bg-tropical/20 rounded-full px-4 sm:px-6 py-2 mb-4">
 <span className="text-primary dark:text-tropical font-semibold text-xs sm:text-sm tracking-widest">TESTIMONIALS</span>
 </div>
 <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-primary dark:text-text-primary mb-4">
 Guest <span className="text-tropical">Experiences</span>
 </h2>
 <p className="text-base sm:text-lg text-text-secondary text-text-secondary max-w-xl mx-auto leading-relaxed px-4">
 Hear from guests who've experienced Moon Valley's magic firsthand.
 </p>
 </motion.div>

 {/* Desktop: 3 cards grid */}
 <div className="hidden lg:grid grid-cols-3 gap-6 max-w-5xl mx-auto">
 {testimonials.map((t, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-50px" }}
 transition={{ duration: 0.6, delay: i * 0.15, type: "spring", stiffness: 100 }}
 >
 <Card className="bg-surface/50 backdrop-blur-sm border border-gray-100 dark:border-white/5 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full">
 <CardContent className="p-6 relative flex flex-col h-full">
 <Quote size={36} className="text-tropical/15 dark:text-tropical/20 absolute top-5 right-5 rotate-180" />
 <div className="flex gap-0.5 mb-4">
 {[...Array(t.rating)].map((_, j) => (
 <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
 ))}
 </div>
 <p className="text-sm text-text-secondary text-text-secondary leading-relaxed mb-6 flex-grow">
 "{t.content}"
 </p>
 <div className="flex items-center gap-3">
 <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center font-bold text-white text-sm flex-shrink-0`}>
 {t.initials}
 </div>
 <div>
 <div className="font-semibold text-sm text-primary dark:text-text-primary">{t.name}</div>
 <div className="text-xs text-text-secondary text-text-secondary">{t.location}</div>
 </div>
 </div>
 </CardContent>
 </Card>
 </motion.div>
 ))}
 </div>

 {/* Mobile / Tablet: Framer Motion Swipe Carousel */}
 <div className="lg:hidden max-w-md mx-auto">
 <div
 className="relative h-[280px] sm:h-[260px] w-full flex items-center justify-center"
 onMouseEnter={() => setIsPaused(true)}
 onMouseLeave={() => setIsPaused(false)}
 onTouchStart={() => setIsPaused(true)}
 >
 <AnimatePresence initial={false} custom={direction}>
 <motion.div
 key={page}
 custom={direction}
 variants={variants}
 initial="enter"
 animate="center"
 exit="exit"
 transition={{
 x: { type: "spring", stiffness: 300, damping: 30 },
 opacity: { duration: 0.2 }
 }}
 drag="x"
 dragConstraints={{ left: 0, right: 0 }}
 dragElastic={1}
 onDragEnd={(e, { offset, velocity }) => {
 const swipe = Math.abs(offset.x) * velocity.x;
 if (swipe < -10000 || offset.x < -50) {
 paginate(1);
 } else if (swipe > 10000 || offset.x > 50) {
 paginate(-1);
 }
 }}
 className="absolute w-full px-2"
 >
 <Card className="border border-gray-100 dark:border-white/5 bg-surface/80 backdrop-blur-md shadow-xl rounded-3xl h-full">
 <CardContent className="p-6 relative">
 <Quote size={32} className="text-tropical/15 absolute top-5 right-5 rotate-180" />
 <div className="flex gap-0.5 mb-4">
 {[...Array(currentTestimonial.rating)].map((_, j) => (
 <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
 ))}
 </div>
 <p className="text-sm text-text-secondary text-text-secondary leading-relaxed mb-6 min-h-[100px]">
 "{currentTestimonial.content}"
 </p>
 <div className="flex items-center gap-3">
 <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${currentTestimonial.color} flex items-center justify-center font-bold text-white text-sm flex-shrink-0`}>
 {currentTestimonial.initials}
 </div>
 <div>
 <div className="font-semibold text-sm text-primary dark:text-text-primary">{currentTestimonial.name}</div>
 <div className="text-xs text-text-secondary text-text-secondary">{currentTestimonial.location}</div>
 </div>
 </div>
 </CardContent>
 </Card>
 </motion.div>
 </AnimatePresence>
 </div>

 {/* Controls */}
 <div className="flex items-center justify-center gap-4 mt-8">
 <button onClick={() => paginate(-1)} className="w-9 h-9 rounded-full bg-tropical/10 dark:bg-tropical/20 flex items-center justify-center text-tropical hover:bg-tropical hover:text-white transition-all duration-200">
 <ChevronLeft size={16} />
 </button>
 <div className="flex gap-2">
 {testimonials.map((_, i) => (
 <button
 key={i}
 onClick={() => {
 setIsPaused(true);
 setPage([i, i > imageIndex ? 1 : -1]);
 }}
 className={`rounded-full transition-all duration-300 ${i === imageIndex ? "bg-tropical w-5 h-2" : "bg-gray-300 dark:bg-gray-700 w-2 h-2"}`}
 />
 ))}
 </div>
 <button onClick={() => paginate(1)} className="w-9 h-9 rounded-full bg-tropical/10 dark:bg-tropical/20 flex items-center justify-center text-tropical hover:bg-tropical hover:text-white transition-all duration-200">
 <ChevronRight size={16} />
 </button>
 </div>
 </div>

 {/* Google Rating badge */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.4 }}
 className="mt-10 flex justify-center"
 >
 <a
 href="https://www.google.com/maps/search/Moon+Valley+Palakkayam+Thattu"
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-3 px-5 py-3 bg-surface/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-lg border border-gray-100 dark:border-white/10 transition-all duration-200 hover:-translate-y-0.5 group"
 >
 <div className="flex gap-0.5">
 {[...Array(5)].map((_, i) => (
 <Star key={i} size={14} className={i < 4 ? "text-amber-400 fill-amber-400" : "text-amber-300 fill-amber-300"} />
 ))}
 </div>
 <span className="text-sm font-bold text-primary dark:text-text-primary">4.4 / 5</span>
 <span className="text-xs text-text-secondary text-text-secondary">on Google Reviews</span>
 <span className="text-xs font-semibold text-tropical group-hover:underline">View all →</span>
 </a>
 </motion.div>
 </div>
 </section>
 );
}
