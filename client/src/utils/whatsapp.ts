// WhatsApp integration utility
// Update this phone number with your resort's WhatsApp number
export const RESORT_WHATSAPP_NUMBER = "+918765432109"; // Replace with your number

export const createWhatsAppBookingLink = (roomName?: string) => {
  const message = roomName 
    ? `Hi, I'm interested in booking the ${roomName} at Moon Valley Resort. Can you provide more details?`
    : `Hi, I'm interested in booking a room at Moon Valley Resort. Can you help me with availability and pricing?`;
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${RESORT_WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const openWhatsAppChat = (roomName?: string) => {
  const link = createWhatsAppBookingLink(roomName);
  window.open(link, "_blank");
};
