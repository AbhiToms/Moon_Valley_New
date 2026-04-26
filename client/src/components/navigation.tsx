import { useState, useEffect } from "react";
import { Palmtree, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { openWhatsAppChat } from "@/utils/whatsapp";
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
  const [mobileOpen,  setMobileOpen]  = useState(false);

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

  /* ── body-scroll lock ───────────────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const nav = document.querySelector("nav");
      const offset = nav ? nav.offsetHeight + 16 : 80;
      window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
    }, mobileOpen ? 300 : 0);
  };

  /* ── derived states ─────────────────────────────────────────── */
  const isSolid = isScrolled || mobileOpen;

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

  // Burger icon colour
  const burgerClass = isSolid
    ? isDark
      ? "text-white/90 hover:bg-white/10"
      : "text-gray-700 hover:bg-gray-100"
    : "text-white hover:bg-white/20";

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${navBg}`}
        style={{
          transform: isVisible || mobileOpen ? "translateY(0)" : "translateY(-100%)",
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

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-7">
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
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className={`md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200 ${burgerClass}`}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer panel */}
      <div
        className={`
          fixed top-0 right-0 h-full w-72 max-w-[85vw] z-50 md:hidden
          flex flex-col shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isDark ? "bg-[hsl(155_12%_10%)] border-l border-white/8" : "bg-white border-l border-gray-100"}
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className={`flex items-center justify-between px-5 py-4 border-b ${isDark ? "border-white/8" : "border-gray-100"}`}>
          <div className="flex items-center gap-2">
            <Palmtree size={20} className="text-tropical" />
            <span className={`font-poppins font-bold ${isDark ? "text-white" : "text-primary"}`}>
              Moon Valley
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${isDark ? "text-white/60 hover:bg-white/10" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {navSections.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`
                w-full flex items-center px-4 py-3.5 rounded-xl text-left text-sm font-medium mb-1
                transition-colors duration-200
                hover:bg-tropical/10 hover:text-tropical
                ${isDark ? "text-white/75 dark:hover:bg-tropical/20" : "text-gray-700"}
              `}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className={`p-4 border-t ${isDark ? "border-white/8" : "border-gray-100"}`}>
          <button
            onClick={() => { setMobileOpen(false); openWhatsAppChat(); }}
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full py-3 text-sm font-bold transition-all duration-200 shadow-md"
          >
            Book on WhatsApp
          </button>
        </div>
      </div>
    </>
  );
}
