import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mountain, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-white/95 backdrop-blur-sm"
    } border-b border-gray-200`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-playfair font-bold text-forest flex items-center">
            <Mountain className="text-sage mr-2" size={28} />
            Moon Valley
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("home")} className="text-gray-700 hover:text-forest transition-colors duration-300">
              Home
            </button>
            <button onClick={() => scrollToSection("rooms")} className="text-gray-700 hover:text-forest transition-colors duration-300">
              Rooms
            </button>
            <button onClick={() => scrollToSection("amenities")} className="text-gray-700 hover:text-forest transition-colors duration-300">
              Amenities
            </button>
            <button onClick={() => scrollToSection("activities")} className="text-gray-700 hover:text-forest transition-colors duration-300">
              Activities
            </button>
            <button onClick={() => scrollToSection("gallery")} className="text-gray-700 hover:text-forest transition-colors duration-300">
              Gallery
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-gray-700 hover:text-forest transition-colors duration-300">
              Contact
            </button>
            <Button 
              onClick={() => scrollToSection("booking")}
              className="bg-forest text-white hover:bg-forest/90 rounded-full px-6 py-2 transition-all duration-300 hover:shadow-lg"
            >
              Book Now
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-forest"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              <button onClick={() => scrollToSection("home")} className="text-gray-700 hover:text-forest transition-colors duration-300 text-left">
                Home
              </button>
              <button onClick={() => scrollToSection("rooms")} className="text-gray-700 hover:text-forest transition-colors duration-300 text-left">
                Rooms
              </button>
              <button onClick={() => scrollToSection("amenities")} className="text-gray-700 hover:text-forest transition-colors duration-300 text-left">
                Amenities
              </button>
              <button onClick={() => scrollToSection("activities")} className="text-gray-700 hover:text-forest transition-colors duration-300 text-left">
                Activities
              </button>
              <button onClick={() => scrollToSection("gallery")} className="text-gray-700 hover:text-forest transition-colors duration-300 text-left">
                Gallery
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-gray-700 hover:text-forest transition-colors duration-300 text-left">
                Contact
              </button>
              <Button 
                onClick={() => scrollToSection("booking")}
                className="bg-forest text-white hover:bg-forest/90 rounded-full w-fit"
              >
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
