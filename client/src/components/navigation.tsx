import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Palmtree, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const navSections = [
  { label: "Home", id: "home" },
  { label: "Rooms", id: "accommodations" },
  { label: "Amenities", id: "amenities" },
  { label: "Gallery", id: "gallery" },
  { label: "Contact", id: "contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 80);
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setMobileOpen(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const nav = document.querySelector("nav");
      const navHeight = nav ? nav.offsetHeight : 80;
      const offsetPosition = element.offsetTop - navHeight - 20;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/95 backdrop-blur-md shadow-xl border-b border-neutral/20 dark:border-slate-700/50"
          : "bg-transparent"
      }`}
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease-in-out, background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-poppins font-bold text-primary dark:text-text-primary flex items-center group cursor-pointer">
            <Palmtree className="text-tropical mr-2 transition-transform duration-300 group-hover:scale-110" size={24} />
            <span className="bg-gradient-to-r from-primary to-tropical dark:from-tropical dark:to-secondary bg-clip-text text-transparent">
              Moon Valley
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navSections.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-gray-700 dark:text-white/80 hover:text-primary dark:hover:text-tropical transition-all duration-300 capitalize relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-tropical after:transition-all after:duration-300 hover:after:w-full font-medium"
              >
                {label}
              </button>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isScrolled
                  ? "text-primary dark:text-white hover:bg-primary/10 dark:hover:bg-white/10"
                  : "text-white hover:bg-white/20"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/98 backdrop-blur-md border-t border-neutral/20 dark:border-slate-700/50 shadow-lg">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
            {navSections.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-left px-4 py-3 text-gray-700 dark:text-white/80 hover:text-primary dark:hover:text-tropical hover:bg-primary/5 dark:hover:bg-white/5 rounded-lg transition-all duration-200 font-medium capitalize"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
