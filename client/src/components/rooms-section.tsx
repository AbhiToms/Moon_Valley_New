import { useState, Suspense, lazy } from "react";
import { Eye, Bed, Bath, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import LazyImage from "./lazy-image";

const RoomGalleryModal = lazy(() => import("./room-gallery"));

interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  beds: number;
  baths: number;
  image: string;
}

export default function RoomsSection() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const scrollToBooking = () => {
    const element = document.getElementById("contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const rooms = [
    { id: 1, name: "Mountain View Suite", description: "Luxurious suite with panoramic mountain views", price: 4500, beds: 2, baths: 2, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400" },
    { id: 2, name: "Forest View Room", description: "Cozy room surrounded by lush forest greenery", price: 3500, beds: 2, baths: 1, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400" },
    { id: 3, name: "Valley Escape", description: "Perfect for groups with stunning valley views", price: 5500, beds: 3, baths: 2, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400" },
    { id: 4, name: "Sunset Retreat", description: "Premium room with sunset viewing deck", price: 6000, beds: 2, baths: 2, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400" }
  ];

  return (
    <section id="accommodations" className="py-20 md:py-32 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Luxury <span className="text-emerald-600 dark:text-emerald-400">Accommodations</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Four uniquely designed rooms with stunning views
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white dark:bg-slate-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden group">
                <LazyImage src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button onClick={() => setSelectedRoom(room)} className="bg-white text-gray-900 hover:bg-gray-100">
                    <Eye size={18} className="mr-2" />
                    View
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{room.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{room.description}</p>

                <div className="flex gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-slate-600">
                  <div className="flex flex-col items-center">
                    <Bed size={18} className="text-emerald-600 mb-1" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{room.beds}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Bath size={18} className="text-emerald-600 mb-1" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{room.baths}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Users size={18} className="text-emerald-600 mb-1" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{room.beds * 2}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">₹{room.price.toLocaleString()}</span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">/night</span>
                  </div>
                </div>

                <Button onClick={scrollToBooking} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
                  Reserve Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Suspense fallback={null}>
        {selectedRoom && <RoomGalleryModal room={selectedRoom} isOpen={!!selectedRoom} onClose={() => setSelectedRoom(null)} onBookNow={scrollToBooking} />}
      </Suspense>
    </section>
  );
}
