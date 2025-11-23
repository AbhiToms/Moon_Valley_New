import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Palmtree } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const nav = document.querySelector('nav');
      const navHeight = nav ? nav.offsetHeight : 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - navHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
      ? "bg-white/90 dark:bg-slate-900/95 backdrop-blur-md shadow-xl border-b border-neutral/20 dark:border-slate-700/50"
      : "bg-transparent"
      }`}>
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl sm:text-2xl md:text-3xl font-poppins font-bold text-primary dark:text-text-primary flex items-center group cursor-pointer">
            <Palmtree className="text-tropical dark:text-tropical mr-2 sm:mr-3 transition-transform duration-300 group-hover:scale-110" size={24} />
            <span className="bg-gradient-to-r from-primary to-tropical dark:from-tropical dark:to-secondary bg-clip-text text-transparent">
              Moon Valley
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {["home", "rooms", "amenities", "gallery", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section === "rooms" ? "accommodations" : section)}
                className="text-gray-700 hover:text-primary transition-all duration-300 capitalize relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-tropical after:transition-all after:duration-300 hover:after:w-full nav-text-enhanced"
              >
                {section}
              </button>
            ))}
            <ThemeToggle />
          </div>

          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
