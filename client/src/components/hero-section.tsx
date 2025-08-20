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
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 transition-transform duration-1000"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      />
      
      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-tropical/60 to-accent/70" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: "1s" }}></div>
      
      <div className="relative z-10 text-center text-white max-w-5xl px-6">
        <div className="mb-4 flex justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 border border-white/30">
            <span className="text-sm font-medium flex items-center">
              <Sparkles className="mr-2" size={16} />
              Palakkayam Thattu, Kerala
            </span>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-poppins font-bold mb-8 leading-tight">
          <span className="block bg-gradient-to-r from-white via-white to-secondary bg-clip-text text-transparent animate-fadeInUp">
            Moon Valley
          </span>
          <span className="block text-4xl md:text-5xl font-light mt-2 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            A Tropical Hut Experience
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
          Perched at <strong>3,500 feet</strong> above sea level, experience breathtaking 360° panoramic views, 
          adventure activities, and immersive nature encounters in the heart of Kerala's Western Ghats.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
          <Button 
            onClick={scrollToRooms}
            className="bg-white text-primary px-10 py-4 rounded-full text-lg font-semibold hover:bg-neutral hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Discover Rooms
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-white/50 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/20 backdrop-blur-sm transition-all duration-300 bg-transparent"
          >
            <Play className="mr-2" size={20} />
            Virtual Tour
          </Button>
        </div>
        
        {/* Statistics */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: "0.8s" }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary">4.4★</div>
            <div className="text-sm opacity-80">Google Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary">360°</div>
            <div className="text-sm opacity-80">Panoramic Views</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary">3,500ft</div>
            <div className="text-sm opacity-80">Above Sea Level</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce">
        <ChevronDown size={40} strokeWidth={1} />
      </div>
    </section>
  );
}
