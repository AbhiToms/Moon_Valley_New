import { useState, useEffect, useRef } from "react";
import { openWhatsAppChat } from "@/utils/whatsapp";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const [scrolled, setScrolled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Show tooltip briefly after first scroll past threshold
  useEffect(() => {
    if (scrolled) {
      tooltipTimer.current = setTimeout(() => setShowTooltip(true), 600);
      const hide = setTimeout(() => setShowTooltip(false), 4000);
      return () => { clearTimeout(tooltipTimer.current!); clearTimeout(hide); };
    }
  }, [scrolled]);

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-50">
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-xl shadow-xl whitespace-nowrap animate-fadeInUp pointer-events-none">
          Need help? Chat with us!
          <span className="absolute bottom-[-5px] right-4 w-2.5 h-2.5 bg-gray-900 rotate-45" />
        </div>
      )}

      <button
        onClick={() => openWhatsAppChat()}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat on WhatsApp"
        className={`relative flex items-center gap-2
          bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full shadow-2xl
          hover:shadow-[0_8px_30px_rgba(37,211,102,0.55)]
          transition-all duration-300 hover:scale-105 active:scale-95
          ${scrolled ? "py-3 px-3 sm:px-4 sm:py-3" : "py-3 px-4"}
        `}
      >
        <MessageCircle size={20} className="flex-shrink-0" />
        <span
          className={`text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300
            ${scrolled ? "max-w-0 opacity-0 sm:max-w-[140px] sm:opacity-100" : "max-w-[140px] opacity-100"}
          `}
        >
          Book on WhatsApp
        </span>
      </button>
    </div>
  );
}
