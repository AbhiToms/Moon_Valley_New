import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mountain, Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";

const quickLinks = ["Home", "Rooms", "Amenities", "Activities", "Gallery", "Contact"];
const services = ["Restaurant", "Swimming Pool", "Adventure Sports", "Common Kitchen", "Nature Trails", "Free WiFi"];
const legalLinks = ["Privacy Policy", "Terms & Conditions", "Cookie Policy"];

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-forest text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-playfair font-bold mb-4 flex items-center">
              <Mountain className="text-sage mr-2" size={28} />
              Moon Valley
            </div>
            <p className="text-white/80 mb-6">
              Experience luxury in harmony with nature at our mountain retreat destination.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button 
                    onClick={() => scrollToSection(link)}
                    className="text-white/60 hover:text-white transition-colors duration-300 text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Amenities</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <button 
                    onClick={() => scrollToSection("amenities")}
                    className="text-white/60 hover:text-white transition-colors duration-300 text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-white/80 mb-6">
              <p><Mountain className="inline mr-2" size={16} />Himachal Pradesh, India</p>
              <p>📞 +91 98765 43210</p>
              <p>✉️ info@moonvalleyresort.com</p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-2">Newsletter</h4>
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 rounded-r-none bg-white text-gray-800 border-0"
                />
                <Button className="bg-gold text-forest rounded-l-none hover:bg-gold/90 transition-colors duration-300">
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2024 Moon Valley Resort. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {legalLinks.map((link) => (
                <a key={link} href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-300">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
