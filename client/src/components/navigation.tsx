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
      ? "bg-white/95 dark:bg-slate-900/97 backdrop-blur-xl shadow-2xl border-b border-neutral/15 dark:border-slate-700/30"
      : "bg-transparent"
      }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl sm:text-2xl md:text-3xl font-poppins font-extrabold text-primary dark:text-text-primary flex items-center group cursor-pointer">
            <Palmtree className="text-tropical dark:text-tropical mr-2 sm:mr-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" size={26} />
            <span className="bg-gradient-to-r from-primary via-tropical to-secondary bg-clip-text text-transparent">
              Moon Valley
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {["home", "rooms", "amenities", "gallery", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section === "rooms" ? "accommodations" : section)}
                className="text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-tropical transition-all duration-300 capitalize px-4 py-2 rounded-lg relative font-medium text-sm after:absolute after:bottom-1 after:left-4 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-tropical after:to-secondary after:transition-all after:duration-300 hover:after:w-[calc(100%-2rem)] hover:bg-gradient-to-r hover:from-primary/5 hover:to-tropical/5 dark:hover:from-tropical/10 dark:hover:to-secondary/10 nav-text-enhanced"
              >
                {section}
              </button>
            ))}
            <div className="ml-4 pl-4 border-l border-neutral/20 dark:border-mist/20">
              <ThemeToggle />
            </div>
          </div>

          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
