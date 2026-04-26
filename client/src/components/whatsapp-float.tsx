import { useState, useEffect } from "react";
import { openWhatsAppChat } from "@/utils/whatsapp";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => openWhatsAppChat()}
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-5 right-4 sm:right-6 z-50 flex items-center gap-2
        bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full shadow-2xl
        hover:shadow-[0_8px_30px_rgba(37,211,102,0.55)]
        transition-all duration-300 hover:scale-105 active:scale-95
        ${scrolled ? "py-3 px-3 sm:px-4 sm:py-3" : "py-3 px-4"}
      `}
    >
      <MessageCircle size={20} className="flex-shrink-0" />
      {/* Label: always shown on desktop, hidden on mobile when scrolled */}
      <span
        className={`text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300
          ${scrolled ? "max-w-0 opacity-0 sm:max-w-[140px] sm:opacity-100" : "max-w-[140px] opacity-100"}
        `}
      >
        Book on WhatsApp
      </span>
    </button>
  );
}
