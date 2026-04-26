import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { useTheme } from "@/components/theme-provider";

const socialLinks = [
  {
    name: "WhatsApp",
    href: "https://wa.me/919446986882",
    icon: FaWhatsapp,
    bg: "bg-[#25D366]/10 hover:bg-[#25D366] border-[#25D366]/30",
    text: "text-[#25D366] hover:text-white",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/moonvalley_tropicalhut",
    icon: FaInstagram,
    bg: "bg-[#E1306C]/10 hover:bg-[#E1306C] border-[#E1306C]/30",
    text: "text-[#E1306C] hover:text-white",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/moonvalleytropicalhut",
    icon: FaFacebook,
    bg: "bg-[#1877F2]/10 hover:bg-[#1877F2] border-[#1877F2]/30",
    text: "text-[#1877F2] hover:text-white",
  },
];

export default function ContactSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-bg-secondary">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block bg-primary/10 dark:bg-tropical/20 rounded-full px-5 py-2 mb-4">
            <span className="text-primary dark:text-tropical font-semibold text-xs sm:text-sm tracking-widest">CONTACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-primary dark:text-text-primary mb-3">
            Get In <span className="text-tropical">Touch</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto leading-relaxed px-4">
            Ready to plan your mountain escape? Reach out via WhatsApp for the fastest response and personalised booking help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

          {/* Left — Contact Info + Socials */}
          <div className="space-y-5">

            {/* Contact detail cards */}
            <div className="bg-gray-50 dark:bg-bg-primary rounded-2xl border border-gray-100 dark:border-mist/20 divide-y divide-gray-100 dark:divide-mist/10 overflow-hidden">

              {/* Location */}
              <div className="flex items-start gap-3 p-4 sm:p-5">
                <div className="w-10 h-10 rounded-xl bg-tropical/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={18} className="text-tropical" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 dark:text-white/40 uppercase tracking-widest mb-1">Location</p>
                  <a
                    href="https://maps.google.com/?q=Moon+Valley+Palakkayam+Thattu+Kannur+Kerala"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base text-gray-700 dark:text-white/80 hover:text-tropical dark:hover:text-tropical transition-colors leading-snug block"
                  >
                    Moon Valley — A Tropical Hut<br />
                    Palakkayam Thattu, Alakode<br />
                    Kannur 670571, Kerala, India
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 p-4 sm:p-5">
                <div className="w-10 h-10 rounded-xl bg-tropical/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-tropical" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 dark:text-white/40 uppercase tracking-widest mb-1">Phone</p>
                  <a
                    href="tel:+919446986882"
                    className="text-sm sm:text-base font-medium text-gray-700 dark:text-white/80 hover:text-tropical dark:hover:text-tropical transition-colors"
                  >
                    +91 94469 86882
                  </a>
                  <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">24/7 WhatsApp Booking Available</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 p-4 sm:p-5">
                <div className="w-10 h-10 rounded-xl bg-tropical/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-tropical" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 dark:text-white/40 uppercase tracking-widest mb-1">Email</p>
                  <a
                    href="mailto:info@moonvalleyresort.com"
                    className="text-sm sm:text-base font-medium text-gray-700 dark:text-white/80 hover:text-tropical dark:hover:text-tropical transition-colors break-all"
                  >
                    info@moonvalleyresort.com
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 p-4 sm:p-5">
                <div className="w-10 h-10 rounded-xl bg-tropical/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-tropical" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 dark:text-white/40 uppercase tracking-widest mb-1">Best Times to Visit</p>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-white/80 leading-snug">
                    6:00 – 7:30 AM &nbsp;|&nbsp; 5:00 – 6:30 PM
                  </p>
                  <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">Resort open 24 hours</p>
                </div>
              </div>
            </div>

            {/* Social media */}
            <div>
              <p className="text-xs font-semibold text-gray-400 dark:text-white/40 uppercase tracking-widest mb-3">Follow &amp; Connect</p>
              <div className="flex gap-3">
                {socialLinks.map(({ name, href, icon: Icon, bg, text }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${bg} ${text}`}
                  >
                    <Icon size={16} />
                    <span className="hidden sm:inline">{name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Primary WhatsApp CTA */}
            <a
              href="https://wa.me/919446986882?text=Hi%2C%20I%20am%20interested%20in%20booking%20at%20Moon%20Valley%20Resort%20Palakkayam%20Thattu."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full py-3.5 text-sm sm:text-base font-bold transition-all duration-200 shadow-lg hover:shadow-[0_6px_24px_rgba(37,211,102,0.45)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle size={18} />
              Chat &amp; Book on WhatsApp
            </a>
          </div>

          {/* Right — Google Map */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-mist/20 shadow-md" style={{ minHeight: "360px" }}>
            <iframe
              src="https://www.google.com/maps?q=Moon+Valley+A+Tropical+Hut+Palakkayam+Thattu+Kannur+Kerala&output=embed"
              className="w-full h-full"
              style={{
                height: "440px",
                border: "none",
                filter: isDark ? "invert(0.92) hue-rotate(180deg) brightness(1.05) saturate(0.9)" : "none",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Moon Valley Resort Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
