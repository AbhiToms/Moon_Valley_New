import { Palmtree, MapPin, Phone, Mail } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

const quickLinks = [
  { label: "Home",      id: "home" },
  { label: "Rooms",     id: "accommodations" },
  { label: "Amenities", id: "amenities" },
  { label: "Gallery",   id: "gallery" },
  { label: "Contact",   id: "contact" },
];

const amenities = [
  "Swimming Pool",
  "Common Kitchen",
  "Nature Trails",
  "Free WiFi",
  "Campfire & BBQ",
  "Scenic Viewpoints",
];

const socialLinks = [
  {
    href: "https://www.facebook.com/moonvalleytropicalhut",
    icon: FaFacebook,
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/moonvalley_tropicalhut",
    icon: FaInstagram,
    label: "Instagram",
  },
  {
    href: "https://wa.me/919446986882",
    icon: FaWhatsapp,
    label: "WhatsApp",
  },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-primary dark:bg-bg-primary text-white dark:text-text-primary pt-14 pb-8 border-t border-primary/20 dark:border-mist/20">
      <div className="container mx-auto px-5 sm:px-6">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10">

          {/* Brand — full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <button
              onClick={() => scrollTo("home")}
              className="flex items-center gap-2 mb-4 cursor-pointer group"
            >
              <Palmtree size={26} className="text-tropical transition-transform group-hover:scale-110" />
              <span className="text-xl font-poppins font-bold bg-gradient-to-r from-white to-tropical bg-clip-text text-transparent">
                Moon Valley
              </span>
            </button>
            <p className="text-sm text-white/70 leading-relaxed mb-5 max-w-xs">
              Authentic tropical hut living in harmony with nature at Palakkayam Thattu,
              Kerala's Western Ghats — 3,500 ft above sea level.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-tropical/30 text-white/70 hover:text-white transition-all duration-200"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-poppins font-bold mb-4 text-tropical tracking-widest uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-sm text-white/65 hover:text-tropical transition-colors duration-200 text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-sm font-poppins font-bold mb-4 text-tropical tracking-widest uppercase">
              Amenities
            </h3>
            <ul className="space-y-2.5">
              {amenities.map((a) => (
                <li key={a}>
                  <button
                    onClick={() => scrollTo("amenities")}
                    className="text-sm text-white/65 hover:text-tropical transition-colors duration-200 text-left"
                  >
                    {a}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-poppins font-bold mb-4 text-tropical tracking-widest uppercase">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin size={14} className="text-tropical mt-0.5 flex-shrink-0" />
                <span className="leading-snug">Palakkayam Thattu, Alakode<br />Kannur 670571, Kerala</span>
              </li>
              <li>
                <a
                  href="tel:+919446986882"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-tropical transition-colors duration-200"
                >
                  <Phone size={13} className="text-tropical flex-shrink-0" />
                  +91 94469 86882
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@moonvalleyresort.com"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-tropical transition-colors duration-200 break-all"
                >
                  <Mail size={13} className="text-tropical flex-shrink-0" />
                  info@moonvalleyresort.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 dark:border-mist/20 pt-6 text-center">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} Moon Valley — A Tropical Hut. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
