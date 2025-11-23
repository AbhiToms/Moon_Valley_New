import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf size={24} className="text-emerald-400" />
              <span className="text-xl font-bold text-white">Moon Valley</span>
            </div>
            <p className="text-sm">Experience luxury tropical living in the heart of Kerala's Western Ghats.</p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-emerald-400 transition">Home</a></li>
              <li><a href="#accommodations" className="hover:text-emerald-400 transition">Rooms</a></li>
              <li><a href="#amenities" className="hover:text-emerald-400 transition">Amenities</a></li>
              <li><a href="#gallery" className="hover:text-emerald-400 transition">Gallery</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Amenities</h4>
            <ul className="space-y-2 text-sm">
              <li>Swimming Pool</li>
              <li>Free WiFi</li>
              <li>Nature Trails</li>
              <li>Dining Options</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <p className="text-sm mb-2">+91 9446986882</p>
            <p className="text-sm">Palakkayam Thattu<br/>Kannur, Kerala 670571</p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; 2024 Moon Valley Resort. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
