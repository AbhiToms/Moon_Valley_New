import { useState, useEffect } from "react";
import { Palmtree } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/components/theme-provider";

const navSections = [
  { label: "Home",      id: "home" },
  { label: "Rooms",     id: "accommodations" },
  { label: "Amenities", id: "amenities" },
  { label: "Gallery",   id: "gallery" },
  { label: "Contact",   id: "contact" },
];

export default function Navigation() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isScrolled,  setIsScrolled]  = useState(false);
  const [isVisible,   setIsVisible]   = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  /* ── scroll behaviour ───────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY;
      setIsScrolled(cur > 60);
      setIsVisible(cur < lastScrollY || cur < 100);
      setLastScrollY(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const nav = document.querySelector("nav");
    const offset = nav ? nav.offsetHeight + 16 : 80;
    window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
  };

  /* ── derived states ─────────────────────────────────────────── */
  const isSolid = isScrolled;

  // Nav bar background
  const navBg = isSolid
    ? isDark
      ? "bg-[hsl(155_15%_7%)] border-b border-white/8 shadow-2xl"
      : "bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200/60"
    : "bg-transparent";

  // Desktop link colours
  const linkClass = isSolid
    ? isDark
      ? "text-white/80 hover:text-tropical"
      : "text-gray-700 hover:text-primary"
    : "text-white/90 hover:text-white drop-shadow";

  // Logo text colour
  const logoTextClass = isSolid
    ? isDark
      ? "text-white"          // solid white on dark solid nav
      : "text-primary"        // dark green on white nav
    : "text-white drop-shadow"; // white over hero

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${navBg}`}
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-2 group cursor-pointer shrink-0"
            >
              <Palmtree
                size={22}
                className="text-tropical transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
              />
              <span className={`text-lg sm:text-xl font-poppins font-bold transition-colors duration-300 ${logoTextClass}`}>
                Moon Valley
              </span>
            </button>

            {/* Desktop links + theme toggle — right-aligned, desktop only */}
            <div className="hidden lg:flex items-center gap-7">
              {navSections.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`
                    text-sm font-medium transition-all duration-200 relative
                    after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5
                    after:bg-tropical after:transition-all after:duration-300 hover:after:w-full
                    ${linkClass}
                  `}
                >
                  {label}
                </button>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile / tablet: theme toggle only, no burger */}
            <div className="lg:hidden flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

    </>
  );
}
