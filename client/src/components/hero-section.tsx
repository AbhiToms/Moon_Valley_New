import { Button } from "@/components/ui/button";
import { ChevronDown, Play, Sparkles } from "lucide-react";

export default function HeroSection() {
  const scrollToRooms = () => {
    const element = document.getElementById("accommodations");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-[70vh] sm:h-[80vh] md:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 transition-transform duration-1000"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      />
      
      {/* Premium Gradient Overlay with Sophistication */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-primary/50 to-tropical/40 dark:from-black/50 dark:via-primary/40 dark:to-tropical/30" />
      
      {/* Animated Gradient Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-tropical/20 to-secondary/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-primary/20 to-accent/10 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: "1s" }}></div>
      
      <div className="relative z-10 text-center text-white max-w-5xl px-6">
        <div className="mb-6 flex justify-center">
          <div className="bg-white/15 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300">
            <span className="text-sm font-medium flex items-center text-white tracking-wide">
              <Sparkles className="mr-2" size={16} />
              Palakkayam Thattu, Kerala
            </span>
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-poppins font-extrabold mb-4 sm:mb-6 leading-tight">
          <span className="block bg-gradient-to-r from-white via-amber-100 to-yellow-200 dark:from-white dark:via-yellow-300 dark:to-secondary bg-clip-text text-transparent animate-fadeInUp drop-shadow-lg">
            Moon Valley
          </span>
          <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mt-1 sm:mt-2 text-white/95 animate-fadeInUp tracking-widest" style={{ animationDelay: "0.2s" }}>
            A Tropical Hut Experience
          </span>
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light animate-fadeInUp px-4 text-white/90" style={{ animationDelay: "0.4s" }}>
          Perched at <strong>3,500 feet</strong> above sea level, experience breathtaking 360° panoramic views, 
          luxury accommodations, and immersive nature encounters in the heart of Kerala's Western Ghats.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center animate-fadeInUp px-4" style={{ animationDelay: "0.6s" }}>
          <Button 
            onClick={scrollToRooms}
            className="bg-gradient-to-r from-white to-amber-50 text-primary px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl w-full sm:w-auto border border-white/30"
          >
            Discover Rooms
          </Button>
          <Button 
            variant="outline"
            className="hidden border-2 border-white/40 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:bg-white/15 backdrop-blur-md transition-all duration-300 bg-white/10 w-full sm:w-auto hover:shadow-xl"
          >
            <Play className="mr-2" size={16} />
            Virtual Tour
          </Button>
        </div>
        
        {/* Statistics */}
        <div className="mt-8 sm:mt-10 md:mt-16 grid grid-cols-3 gap-3 sm:gap-5 md:gap-8 max-w-lg sm:max-w-2xl mx-auto animate-fadeInUp px-4" style={{ animationDelay: "0.8s" }}>
          <div className="text-center backdrop-blur-md bg-white/10 rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/15 transition-all">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-amber-300">4.4★</div>
            <div className="text-xs opacity-85 leading-tight text-white">Google Rating</div>
          </div>
          <div className="text-center backdrop-blur-md bg-white/10 rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/15 transition-all">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-amber-300">360°</div>
            <div className="text-xs opacity-85 leading-tight text-white">Panoramic Views</div>
          </div>
          <div className="text-center backdrop-blur-md bg-white/10 rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/15 transition-all">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-amber-300">3,500ft</div>
            <div className="text-xs opacity-85 leading-tight text-white">Above Sea Level</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce hover:text-white transition-colors">
        <ChevronDown size={40} strokeWidth={1.5} />
      </div>
    </section>
  );
}
