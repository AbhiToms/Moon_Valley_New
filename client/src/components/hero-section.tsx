import { Button } from "@/components/ui/button";
import { ChevronDown, Leaf } from "lucide-react";

export default function HeroSection() {
  const scrollToRooms = () => {
    const element = document.getElementById("accommodations");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
          <Leaf size={16} className="text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-300">Luxury Mountain Retreat</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Moon Valley
          <span className="block text-emerald-300 mt-2">Tropical Huts</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed">
          Experience authentic luxury at 3,500 feet above sea level. Breathtaking panoramic views, world-class amenities, and immersive nature encounters await you in Kerala's Western Ghats.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            onClick={scrollToRooms}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
          >
            Explore Rooms
          </Button>
          <Button
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold"
          >
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto text-center">
          <div>
            <div className="text-3xl font-bold text-emerald-300">4.4★</div>
            <p className="text-sm text-gray-300 mt-1">Google Rating</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-300">360°</div>
            <p className="text-sm text-gray-300 mt-1">Views</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-300">3,500ft</div>
            <p className="text-sm text-gray-300 mt-1">Altitude</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-emerald-300" />
      </div>
    </section>
  );
}
