import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";



const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    content: ["Moon Valley - A Tropical Hut", "Palakkayam Thattu, Alakode", "Kannur 670571, Kerala, India"]
  },
  {
    icon: Phone,
    title: "Phone",
    content: ["+91 9446986882", "24/7 Booking Available"]
  },
  {
    icon: Mail,
    title: "Email",
    content: ["info@moonvalleyresort.com", "bookings@moonvalleyresort.com"]
  },
  {
    icon: Clock,
    title: "Hours",
    content: ["24 Hours Open", "Best visiting: 6-7:30 AM or 5-6:30 PM"]
  }
];

const socialLinks = [
  { name: "WhatsApp", href: "#", icon: FaWhatsapp },
  { name: "Instagram", href: "#", icon: FaInstagram },
  { name: "Facebook", href: "#", icon: FaFacebook }
];

export default function ContactSection() {

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-bg-secondary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-block bg-primary/10 dark:bg-tropical/20 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
            <span className="text-primary dark:text-tropical font-semibold text-xs sm:text-sm">CONTACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-primary dark:text-text-primary mb-4 sm:mb-6">
            Get In <span className="text-tropical">Touch</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
            Ready to plan your mountain escape? Contact our friendly team for personalized assistance and special offers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Contact Info - Left Side */}
          <div>
            <Card className="bg-surface dark:bg-bg-primary rounded-xl sm:rounded-2xl card-shadow border-0 dark:border dark:border-mist/20 h-full">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="space-y-4 sm:space-y-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <div key={index} className="flex items-start">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-white flex items-center justify-center mr-3 sm:mr-4 mt-1 flex-shrink-0">
                          <IconComponent size={18} className="sm:w-[20px] sm:h-[20px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-primary dark:text-text-primary mb-1">{info.title}</h3>
                          {info.content.map((line, lineIndex) => (
                            <p key={lineIndex} className="text-sm sm:text-base text-gray-700 dark:text-text-secondary break-words leading-relaxed">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Google Map - Right Side */}
          <div className="flex">
            <Card className="bg-surface dark:bg-bg-primary rounded-xl sm:rounded-2xl card-shadow border-0 dark:border dark:border-mist/20 overflow-hidden w-full">
              <div className="relative w-full h-80 sm:h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3938.729!2d75.510!3d12.138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba447d308cdffbd%3A0x1d879072295fc4ab!2sMoon%20Valley%20Tropical%20Hut!5e0!3m2!1sen!2sin!4v1700000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Moon Valley Location"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
