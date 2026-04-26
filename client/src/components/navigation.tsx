import { useState, useEffect } from "react";
import { Palmtree, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { openWhatsAppChat } from "@/utils/whatsapp";

const navSections = [
  { label: "Home",      id: "home" },
  { label: "Rooms",     id: "accommodations" },
  { label: "Amenities", id: "amenities" },
  { label: "Gallery",   id: "gallery" },
  { label: "Contact",   id: "contact" },
];

export default function Navigation() {
  const [isScrolled,   setIsScrolled]   = useState(false);
  const [isVisible,    setIsVisible]    = useState(true);
  const [lastScrollY,  setLastScrollY]  = useState(0);
  const [mobileOpen,   setMobileOpen]   = useState(false);

  /* ── Scroll-hide / scroll-solid ─────────────────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      const cur = window.scrollY;
      setIsScrolled(cur > 60);
      setIsVisible(cur < lastScrollY || cur < 100);
      setLastScrollY(cur);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  /* ── Lock body scroll when drawer is open ────────────────────── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── Smooth scroll helper ────────────────────────────────────── */
  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const nav = document.querySelector("nav");
      const offset = nav ? nav.offsetHeight + 16 : 80;
      window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
    }, mobileOpen ? 300 : 0); // wait for drawer close animation
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled || mobileOpen
            ? "bg-white/95 dark:bg-slate-900/97 backdrop-blur-md shadow-xl border-b border-neutral/20 dark:border-slate-700/50"
            : "bg-transparent"
        }`}
        style={{
          transform: isVisible || mobileOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18">

            {/* Logo */}
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center group cursor-pointer shrink-0"
            >
              <Palmtree
                size={22}
                className="text-tropical mr-2 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-lg sm:text-xl font-poppins font-bold bg-gradient-to-r from-primary to-tropical dark:from-tropical dark:to-secondary bg-clip-text text-transparent">
                Moon Valley
              </span>
            </button>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-7">
              {navSections.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-sm font-medium transition-all duration-200 relative
                    after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5
                    after:bg-tropical after:transition-all after:duration-300 hover:after:w-full
                    ${isScrolled
                      ? "text-gray-700 dark:text-white/80 hover:text-primary dark:hover:text-tropical"
                      : "text-white/90 hover:text-white drop-shadow"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Right side: theme toggle + mobile burger */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className={`md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200 ${
                  isScrolled || mobileOpen
                    ? "text-primary dark:text-white/90 hover:bg-gray-100 dark:hover:bg-white/10"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer overlay ───────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile drawer panel ─────────────────────────────────── */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] z-50 md:hidden
          bg-white dark:bg-slate-900 shadow-2xl flex flex-col
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Palmtree size={20} className="text-tropical" />
            <span className="font-poppins font-bold text-primary dark:text-white">Moon Valley</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-4">
          {navSections.map(({ label, id }, i) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="w-full flex items-center px-4 py-3.5 rounded-xl text-left font-medium text-gray-700 dark:text-white/85 hover:bg-tropical/10 dark:hover:bg-tropical/20 hover:text-tropical dark:hover:text-tropical transition-colors duration-200 mb-1"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Drawer footer CTA */}
        <div className="p-4 border-t border-gray-100 dark:border-slate-700">
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
