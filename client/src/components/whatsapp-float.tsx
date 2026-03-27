import { openWhatsAppChat } from "@/utils/whatsapp";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  return (
    <button
      onClick={() => openWhatsAppChat()}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 group"
    >
      <MessageCircle size={22} className="flex-shrink-0" />
      <span className="text-sm font-semibold whitespace-nowrap">Book on WhatsApp</span>
    </button>
  );
}
