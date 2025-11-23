import { Waves, ChefHat, Trees, Wifi, Dumbbell, Utensils } from "lucide-react";

const amenities = [
  { icon: Waves, title: "Swimming Pool", desc: "Large pool with mountain views" },
  { icon: ChefHat, title: "Common Kitchen", desc: "Fully equipped for cooking" },
  { icon: Trees, title: "Nature Trails", desc: "Direct access to hiking paths" },
  { icon: Wifi, title: "Free WiFi", desc: "High-speed internet throughout" },
  { icon: Dumbbell, title: "Fitness Area", desc: "Workout equipment available" },
  { icon: Utensils, title: "Dining", desc: "On-site dining with local cuisine" },
];

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-20 md:py-32 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            World-Class <span className="text-emerald-600 dark:text-emerald-400">Amenities</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need for a perfect mountain retreat
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {amenities.map((amenity, idx) => {
            const Icon = amenity.icon;
            return (
              <div key={idx} className="bg-white dark:bg-slate-700 p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="p-3 bg-emerald-500/10 w-fit rounded-lg mb-4">
                  <Icon size={28} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{amenity.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{amenity.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
