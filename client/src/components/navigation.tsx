import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Palmtree, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
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
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? "bg-white/90 backdrop-blur-md shadow-xl border-b border-neutral/20" 
        : "bg-transparent"
    }`}>
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-poppins font-bold text-primary flex items-center group cursor-pointer">
            <Palmtree className="text-tropical mr-3 transition-transform duration-300 group-hover:scale-110" size={32} />
            <span className="bg-gradient-to-r from-primary to-tropical bg-clip-text text-transparent">
              Moon Valley
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {["home", "rooms", "amenities", "activities", "gallery", "contact"].map((section) => (
              <button 
                key={section}
                onClick={() => scrollToSection(section)} 
                className="text-gray-700 hover:text-primary transition-all duration-300 font-medium capitalize relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-tropical after:transition-all after:duration-300 hover:after:w-full"
              >
                {section}
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection("booking")}
              className="bg-gradient-to-r from-primary to-tropical text-white hover:scale-105 rounded-full px-8 py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Reserve Now
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary hover:bg-tropical/10 rounded-full"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pb-6 border-t border-neutral/20 backdrop-blur-md bg-white/90 rounded-lg">
            <div className="flex flex-col space-y-6 pt-6">
              {["home", "rooms", "amenities", "activities", "gallery", "contact"].map((section) => (
                <button 
                  key={section}
                  onClick={() => scrollToSection(section)} 
                  className="text-gray-700 hover:text-primary transition-colors duration-300 text-left font-medium capitalize"
                >
                  {section}
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection("booking")}
                className="bg-gradient-to-r from-primary to-tropical text-white rounded-full w-fit px-8 py-3 shadow-lg"
              >
                Reserve Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
