import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
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

            {user ? (
              <div className="relative">
                <Button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  variant="ghost"
                  size="icon"
                  className="text-tropical dark:text-tropical hover:bg-tropical/10 rounded-full relative user-menu-trigger p-1 bg-gradient-to-r from-primary/10 to-tropical/10 dark:from-primary/20 dark:to-tropical/20 border border-primary/20 dark:border-tropical/30 hover:border-primary/40 dark:hover:border-tropical/50 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary via-tropical to-primary flex items-center justify-center">
                    {profilePicture ? (
                      <img
                        src={profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={20} className="text-white" />
                    )}
                  </div>
                </Button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-72 max-w-[calc(100vw-2rem)] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-slate-700/50 overflow-hidden user-menu">
                    <div className="bg-gradient-to-br from-primary/8 via-tropical/6 to-primary/8 dark:from-primary/15 dark:via-tropical/12 dark:to-primary/15 p-4 border-b border-gradient-to-r from-primary/20 via-tropical/30 to-primary/20 dark:from-primary/30 dark:via-tropical/40 dark:to-primary/30">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary via-tropical to-primary rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white/20 dark:ring-slate-800/30 overflow-hidden">
                          {profilePicture ? (
                            <img
                              src={profilePicture}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User size={20} className="text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-sm text-primary dark:text-text-primary">
                            {user.firstName} {user.lastName}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-text-secondary opacity-80 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link href="/dashboard">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full h-9 text-xs border-primary/40 bg-white/60 dark:bg-slate-800/60 text-primary hover:bg-primary hover:text-white dark:border-tropical/50 dark:text-tropical dark:hover:bg-tropical dark:hover:text-white transition-all duration-300 rounded-lg font-semibold shadow-sm hover:shadow-lg hover:scale-[1.02] transform"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Dashboard
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full h-9 text-xs border-emerald-500/40 bg-white/60 dark:bg-slate-800/60 text-emerald-600 hover:bg-emerald-500 hover:text-white dark:border-emerald-400/50 dark:text-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-white transition-all duration-300 rounded-lg font-semibold shadow-sm hover:shadow-lg hover:scale-[1.02] transform"
                          onClick={() => {
                            scrollToSection('booking');
                            setIsUserMenuOpen(false);
                          }}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>

                    <div className="p-3">
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center px-4 py-2.5 text-sm rounded-lg bg-gradient-to-r from-red-50/80 to-red-100/60 dark:from-red-900/20 dark:to-red-800/30 text-red-600 dark:text-red-400 hover:from-red-100 hover:to-red-200 dark:hover:from-red-900/40 dark:hover:to-red-800/50 hover:text-red-700 dark:hover:text-red-300 transition-all duration-500 border border-red-200/60 dark:border-red-800/40 hover:border-red-300 dark:hover:border-red-700 font-semibold shadow-sm hover:shadow-lg hover:scale-[1.02] transform"
                      >
                        <LogOut size={14} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-tropical dark:text-tropical hover:bg-tropical/10 rounded-full relative profile-icon-trigger bg-gradient-to-r from-primary/10 to-tropical/10 dark:from-primary/20 dark:to-tropical/20 border border-primary/20 dark:border-tropical/30 hover:border-primary/40 dark:hover:border-tropical/50 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <User size={20} />
                </Button>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              {user ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="text-tropical dark:text-tropical hover:bg-tropical/10 rounded-full relative user-menu-trigger p-1"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary via-tropical to-primary flex items-center justify-center">
                    {profilePicture ? (
                      <img
                        src={profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={20} className="text-white" />
                    )}
                  </div>
                </Button>
              ) : (
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-tropical dark:text-tropical hover:bg-tropical/10 rounded-full relative profile-icon-trigger bg-gradient-to-r from-primary/10 to-tropical/10 dark:from-primary/20 dark:to-tropical/20 border border-primary/20 dark:border-tropical/30 hover:border-primary/40 dark:hover:border-tropical/50 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <User size={20} />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile User Menu */}
        {user && isUserMenuOpen && (
          <div className="md:hidden absolute right-2 mt-2 w-[calc(100vw-1rem)] max-w-sm bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-slate-700/50 z-50 user-menu overflow-hidden">
            <div className="bg-gradient-to-br from-primary/8 via-tropical/6 to-primary/8 dark:from-primary/15 dark:via-tropical/12 dark:to-primary/15 p-4 border-b border-gradient-to-r from-primary/20 via-tropical/30 to-primary/20 dark:from-primary/30 dark:via-tropical/40 dark:to-primary/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary via-tropical to-primary rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white/20 dark:ring-slate-800/30 overflow-hidden">
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base text-primary dark:text-text-primary">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-text-secondary opacity-80 truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="w-full h-10 text-sm border-primary/40 bg-white/60 dark:bg-slate-800/60 text-primary hover:bg-primary hover:text-white dark:border-tropical/50 dark:text-tropical dark:hover:bg-tropical dark:hover:text-white transition-all duration-300 rounded-xl font-semibold shadow-sm hover:shadow-lg hover:scale-[1.02] transform"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full h-10 text-sm border-emerald-500/40 bg-white/60 dark:bg-slate-800/60 text-emerald-600 hover:bg-emerald-500 hover:text-white dark:border-emerald-400/50 dark:text-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-white transition-all duration-300 rounded-xl font-semibold shadow-sm hover:shadow-lg hover:scale-[1.02] transform"
                  onClick={() => {
                    scrollToSection('booking');
                    setIsUserMenuOpen(false);
                  }}
                >
                  Book Now
                </Button>
              </div>
            </div>

            <div className="p-4">
              <button
                onClick={() => {
                  handleLogout();
                  setIsUserMenuOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-3 text-sm rounded-xl bg-gradient-to-r from-red-50/80 to-red-100/60 dark:from-red-900/20 dark:to-red-800/30 text-red-600 dark:text-red-400 hover:from-red-100 hover:to-red-200 dark:hover:from-red-900/40 dark:hover:to-red-800/50 hover:text-red-700 dark:hover:text-red-300 transition-all duration-500 border border-red-200/60 dark:border-red-800/40 hover:border-red-300 dark:hover:border-red-700 font-semibold shadow-sm hover:shadow-lg hover:scale-[1.02] transform"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}



      </div>

    </nav>
  );
}
