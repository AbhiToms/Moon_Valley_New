import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, MapPin } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-block bg-tropical/10 rounded-full px-6 py-2 mb-6">
                <span className="text-tropical font-semibold text-sm">ABOUT MOON VALLEY</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-poppins font-bold text-primary mb-6 leading-tight">
                Your Gateway to
                <span className="block text-tropical">Nature's Paradise</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Moon Valley - A Tropical Hut provides a unique hilltop experience at Palakkayam Thattu, Kerala. 
                Our tropical accommodations offer guests breathtaking views, adventure activities, and an 
                immersive nature experience that connects you with the beauty of the Western Ghats.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-surface to-neutral rounded-2xl">
                <div className="text-3xl font-bold text-primary mb-2">3,500</div>
                <div className="text-sm text-gray-600 font-medium">Feet Above Sea Level</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-surface to-neutral rounded-2xl">
                <div className="text-3xl font-bold text-tropical mb-2">360°</div>
                <div className="text-sm text-gray-600 font-medium">Panoramic Views</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-surface to-neutral rounded-2xl">
                <div className="text-3xl font-bold text-secondary mb-2">4.4★</div>
                <div className="text-sm text-gray-600 font-medium">Google Rating</div>
              </div>
            </div>
            
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-surface rounded-xl">
                <Award className="text-tropical" size={24} />
                <div>
                  <h4 className="font-semibold text-primary">Authentic Experience</h4>
                  <p className="text-gray-600 text-sm">Unique tropical hut architecture with modern amenities</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-surface rounded-xl">
                <MapPin className="text-tropical" size={24} />
                <div>
                  <h4 className="font-semibold text-primary">Prime Location</h4>
                  <p className="text-gray-600 text-sm">Heart of Western Ghats with stunning panoramic vistas</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-surface rounded-xl">
                <Users className="text-tropical" size={24} />
                <div>
                  <h4 className="font-semibold text-primary">Adventure Activities</h4>
                  <p className="text-gray-600 text-sm">Zorbing, zip lining, and rope courses for thrill-seekers</p>
                </div>
              </div>
            </div>
            
            <Button className="bg-gradient-to-r from-primary to-tropical text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg group">
              Explore Our Story
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Moon Valley tropical hut surrounded by lush greenery" 
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl border border-neutral/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">57</div>
                <div className="text-sm text-gray-600">Happy Reviews</div>
              </div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-xl border border-neutral/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-tropical mb-1">24/7</div>
                <div className="text-sm text-gray-600">Open Access</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}