import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const scrollToRooms = () => {
    const element = document.getElementById("accommodations");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-tropical/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
      </div>

      {/* Background Image - subtle */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      />
      
      <div className="relative z-10 max-w-7xl px-6 sm:px-12 w-full py-20 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8 animate-fadeInUp">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 bg-tropical/10 px-4 py-2 rounded-full border border-tropical/30">
                <span className="w-2 h-2 bg-tropical rounded-full"></span>
                <span className="text-sm font-semibold text-tropical">Welcome to Paradise</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Moon Valley
                <span className="block text-tropical mt-2">Tropical Huts</span>
              </h1>

              <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
                Perched at 3,500 feet above sea level in Kerala's Western Ghats, experience authentic luxury with breathtaking panoramic views, immersive nature encounters, and world-class amenities designed for unforgettable mountain retreats.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-8">
              <Button
                onClick={scrollToRooms}
                className="bg-gradient-to-r from-tropical to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
              >
                Explore Rooms
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-tropical">4.4★</div>
                <p className="text-sm text-gray-400 mt-1">Google Rating</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-tropical">360°</div>
                <p className="text-sm text-gray-400 mt-1">Panoramic Views</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-tropical">3,500ft</div>
                <p className="text-sm text-gray-400 mt-1">Altitude</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
                alt="Moon Valley Luxury Hut"
                className="w-full h-full object-cover animate-fadeInUp"
                style={{ animationDelay: "0.2s" }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent"></div>
              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-2xl max-w-xs animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
                <p className="text-sm font-semibold text-gray-900">Unwind in Paradise</p>
                <p className="text-xs text-gray-600 mt-1">Experience luxury tropical living with modern comfort in Kerala's most stunning mountain retreat.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-tropical" />
      </div>
    </section>
  );
}
