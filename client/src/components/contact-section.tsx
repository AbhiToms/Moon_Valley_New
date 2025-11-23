import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  { icon: MapPin, title: "Location", text: "Palakkayam Thattu, Kannur, Kerala" },
  { icon: Phone, title: "Phone", text: "+91 9446986882" },
  { icon: Mail, title: "Email", text: "info@moonvalleyresort.com" },
  { icon: Clock, title: "Hours", text: "Open 24/7" }
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In <span className="text-emerald-600 dark:text-emerald-400">Touch</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to book your mountain escape?
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <div key={idx} className="bg-white dark:bg-slate-700 p-8 rounded-xl shadow-md text-center">
                <div className="p-3 bg-emerald-500/10 w-fit mx-auto rounded-lg mb-4">
                  <Icon size={28} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{info.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{info.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
