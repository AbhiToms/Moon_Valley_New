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
    <footer className="bg-primary dark:bg-bg-primary text-white dark:text-text-primary py-20 border-t border-primary/20 dark:border-mist/20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div>
            <div className="text-3xl font-poppins font-bold mb-6 flex items-center">
              <Mountain className="text-tropical mr-3" size={32} />
              <span className="bg-gradient-to-r from-white to-tropical bg-clip-text text-transparent">
                Moon Valley
              </span>
            </div>
            <p className="text-white/80 dark:text-text-secondary mb-8 leading-relaxed">
              Experience authentic tropical hut living in harmony with nature at our mountain retreat destination in Kerala's Western Ghats.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/60 dark:text-text-secondary hover:text-tropical transition-colors duration-300 p-2 bg-white/10 dark:bg-bg-secondary rounded-lg hover:bg-tropical/20">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-white/60 dark:text-text-secondary hover:text-tropical transition-colors duration-300 p-2 bg-white/10 dark:bg-bg-secondary rounded-lg hover:bg-tropical/20">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-white/60 dark:text-text-secondary hover:text-tropical transition-colors duration-300 p-2 bg-white/10 dark:bg-bg-secondary rounded-lg hover:bg-tropical/20">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-white/60 dark:text-text-secondary hover:text-tropical transition-colors duration-300 p-2 bg-white/10 dark:bg-bg-secondary rounded-lg hover:bg-tropical/20">
                <Youtube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-poppins font-bold mb-6 text-tropical">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button 
                    onClick={() => scrollToSection(link)}
                    className="text-white/70 dark:text-text-secondary hover:text-tropical transition-colors duration-300 text-left text-lg"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-xl font-poppins font-bold mb-6 text-tropical">Amenities</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <button 
                    onClick={() => scrollToSection("amenities")}
                    className="text-white/70 dark:text-text-secondary hover:text-tropical transition-colors duration-300 text-left text-lg"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div>
            <h3 className="text-xl font-poppins font-bold mb-6 text-tropical">Contact Info</h3>
            <div className="space-y-4 text-white/80 dark:text-text-secondary mb-8">
              <p className="flex items-center text-lg"><Mountain className="mr-3 text-tropical" size={20} />Palakkayam Thattu, Kannur, Kerala</p>
              <p className="text-lg">📞 +91 9446 98 68 82</p>
              <p className="text-lg">✉️ info@moonvalleyresort.com</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-tropical">Newsletter</h4>
              <div className="flex rounded-xl overflow-hidden">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 rounded-r-none bg-white dark:bg-bg-secondary text-gray-800 dark:text-text-primary border-0 py-3"
                />
                <Button className="bg-gradient-to-r from-secondary to-tropical text-white rounded-l-none hover:scale-105 transition-all duration-300 px-6">
                  <ArrowRight size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 dark:border-mist/20 pt-10 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 dark:text-text-secondary text-lg">
              © 2025 Moon Valley - A Tropical Hut. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              {legalLinks.map((link) => (
                <a key={link} href="#" className="text-white/60 dark:text-text-secondary hover:text-tropical text-lg transition-colors duration-300">
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
