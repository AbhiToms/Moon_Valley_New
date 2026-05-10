import { useState, useEffect, useRef } from "react";
import { Palmtree, Menu, X } from "lucide-react";
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
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeId,    setActiveId]    = useState("home");
  const lastScrollY = useRef(0);

  /* ── scroll behaviour ───────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY;
      setIsScrolled(cur > 60);
      setIsVisible(cur < lastScrollY.current || cur < 100);
      lastScrollY.current = cur;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── active section via IntersectionObserver ─────────────────── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  /* ── lock body scroll when mobile menu is open ───────────────── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const nav = document.querySelector("nav");
    const offset = nav ? nav.offsetHeight + 16 : 80;
    window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
  };

  /* ── derived states ─────────────────────────────────────────── */
  const isSolid = isScrolled;

  const navBg = isSolid
    ? isDark
      ? "bg-[hsl(155_15%_7%)] border-b border-white/8 shadow-2xl"
      : "bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200/60"
    : "bg-transparent";

  const linkBase = `text-sm font-medium transition-all duration-200 relative
    after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5
    after:bg-tropical after:transition-all after:duration-300 hover:after:w-full`;

  const linkColour = (id: string) => {
    const isActive = activeId === id;
    if (isSolid) {
      return isDark
        ? isActive ? "text-tropical after:w-full" : "text-white/80 hover:text-tropical"
        : isActive ? "text-primary after:w-full" : "text-gray-700 hover:text-primary";
    }
    return isActive ? "text-white after:w-full" : "text-white/90 hover:text-white drop-shadow";
  };

  const logoTextClass = isSolid
    ? isDark ? "text-white" : "text-primary"
    : "text-white drop-shadow";

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

            {/* Desktop links + theme toggle */}
            <div className="hidden lg:flex items-center gap-7">
              {navSections.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`${linkBase} ${linkColour(id)}`}
                >
                  {label}
                </button>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(v => !v)}
                aria-label="Toggle navigation menu"
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isSolid
                    ? isDark ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 lg:hidden flex flex-col
          ${isDark ? "bg-[hsl(155_15%_7%)]" : "bg-white"}
          shadow-2xl transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className={`flex items-center justify-between px-6 h-16 border-b ${isDark ? "border-white/10" : "border-gray-100"}`}>
          <div className="flex items-center gap-2">
            <Palmtree size={20} className="text-tropical" />
            <span className={`font-poppins font-bold ${isDark ? "text-white" : "text-primary"}`}>Moon Valley</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className={`p-1.5 rounded-lg ${isDark ? "text-white/70 hover:bg-white/10" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navSections.map(({ label, id }, i) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms" }}
              className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold
                transition-all duration-200
                ${mobileOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}
                ${activeId === id
                  ? "bg-tropical/10 text-tropical"
                  : isDark
                    ? "text-white/80 hover:bg-white/8 hover:text-white"
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                }
              `}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Drawer footer CTA */}
        <div className="px-6 pb-8 pt-4 border-t border-gray-100 dark:border-white/10">
          <a
            href="https://wa.me/919446986882?text=Hi%2C%20I%20am%20interested%20in%20booking%20at%20Moon%20Valley."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full py-3 text-sm font-bold shadow-lg transition-all duration-200"
          >
            Book on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
