import { Award, MapPin, Users } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 md:py-32 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="order-2 md:order-1">
            <img 
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500"
              alt="Moon Valley Resort"
              className="w-full rounded-xl shadow-xl"
            />
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">About Us</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Your Gateway to Nature's Paradise
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Moon Valley - A Tropical Hut provides a unique hilltop experience at Palakkayam Thattu, Kerala. Our tropical accommodations offer guests breathtaking views, peaceful relaxation, and an immersive nature experience.
            </p>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg h-fit">
                  <Award size={24} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Authentic Experience</h3>
                  <p className="text-gray-600 dark:text-gray-400">Unique tropical hut architecture with modern amenities</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg h-fit">
                  <MapPin size={24} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Prime Location</h3>
                  <p className="text-gray-600 dark:text-gray-400">Heart of Western Ghats with stunning panoramic vistas</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg h-fit">
                  <Users size={24} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Nature Experiences</h3>
                  <p className="text-gray-600 dark:text-gray-400">Hiking trails, scenic viewpoints, and peaceful mountain walks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
