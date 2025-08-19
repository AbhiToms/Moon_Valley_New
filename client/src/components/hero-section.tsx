import { Button } from "@/components/ui/button";
import { ChevronDown, Play } from "lucide-react";

export default function HeroSection() {
  const scrollToRooms = () => {
    const element = document.getElementById("rooms");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />
      
      <div className="relative z-10 text-center text-white max-w-4xl px-6">
        <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 animate-fadeInUp">
          Moon Valley Resort
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
          Escape to Nature's Perfect Harmony
        </p>
        <p className="text-lg mb-12 max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
          Nestled in the heart of pristine mountains, Moon Valley Resort offers an unparalleled luxury experience surrounded by breathtaking natural beauty and tranquil serenity.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
          <Button 
            onClick={scrollToRooms}
            className="bg-gold text-forest px-8 py-4 rounded-full text-lg font-semibold hover:bg-gold/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            Explore Rooms
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-forest transition-all duration-300 hover:shadow-xl bg-transparent"
          >
            <Play className="mr-2" size={20} />
            Watch Video
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown size={32} />
      </div>
    </section>
  );
}
