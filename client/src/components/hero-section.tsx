import { Button } from "@/components/ui/button";
import { ChevronDown, Play, Sparkles } from "lucide-react";

export default function HeroSection() {
  const scrollToRooms = () => {
    const element = document.getElementById("rooms");
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
      
      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-tropical/60 to-accent/70 dark:from-primary/70 dark:via-tropical/50 dark:to-accent/60" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: "1s" }}></div>
      
      <div className="relative z-10 text-center text-white max-w-5xl px-6">
        <div className="mb-4 flex justify-center">
          <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-white/30 dark:border-white/20">
            <span className="text-sm font-medium flex items-center text-white">
              <Sparkles className="mr-2" size={16} />
              Palakkayam Thattu, Kerala
            </span>
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-poppins font-bold mb-6 sm:mb-8 leading-tight">
          <span className="block bg-gradient-to-r from-white via-white to-secondary dark:from-white dark:via-neutral dark:to-tropical bg-clip-text text-transparent animate-fadeInUp">
            Moon Valley
          </span>
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mt-2 text-white animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            A Tropical Hut Experience
          </span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
          Perched at <strong>3,500 feet</strong> above sea level, experience breathtaking 360° panoramic views, 
          luxury accommodations, and immersive nature encounters in the heart of Kerala's Western Ghats.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
          <Button 
            onClick={scrollToRooms}
            className="bg-white dark:bg-neutral text-primary dark:text-primary px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-neutral dark:hover:bg-white hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Discover Rooms
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-white/50 dark:border-white/40 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-sm transition-all duration-300 bg-transparent"
          >
            <Play className="mr-2" size={18} />
            Virtual Tour
          </Button>
        </div>
        
        {/* Statistics */}
        <div className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: "0.8s" }}>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary">4.4★</div>
            <div className="text-xs sm:text-sm opacity-80">Google Rating</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary">360°</div>
            <div className="text-xs sm:text-sm opacity-80">Panoramic Views</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary">3,500ft</div>
            <div className="text-xs sm:text-sm opacity-80">Above Sea Level</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce">
        <ChevronDown size={40} strokeWidth={1} />
      </div>
    </section>
  );
}
