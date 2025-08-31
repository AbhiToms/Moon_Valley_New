import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, MapPin } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <div className="inline-block bg-tropical/10 dark:bg-tropical/20 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
                <span className="text-tropical font-semibold text-xs sm:text-sm">ABOUT MOON VALLEY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-primary dark:text-text-primary mb-4 sm:mb-6 leading-tight">
                Your Gateway to
                <span className="block text-tropical">Nature's Paradise</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-white/80 leading-relaxed mb-6 sm:mb-8">
                Moon Valley - A Tropical Hut provides a unique hilltop experience at Palakkayam Thattu, Kerala. 
                Our tropical accommodations offer guests breathtaking views, peaceful relaxation, and an 
                immersive nature experience that connects you with the beauty of the Western Ghats.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <div className="text-center p-3 sm:p-4 md:p-6 bg-gradient-to-br from-surface to-neutral dark:from-bg-secondary dark:to-mist rounded-2xl">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary dark:text-tropical mb-1 sm:mb-2">3,500</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-white/70 font-medium leading-tight">Feet<br className="sm:hidden" /> Above<br className="sm:hidden" /> Sea Level</div>
              </div>
              <div className="text-center p-3 sm:p-4 md:p-6 bg-gradient-to-br from-surface to-neutral dark:from-bg-secondary dark:to-mist rounded-2xl">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-tropical mb-1 sm:mb-2">360°</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-white/70 font-medium leading-tight">Panoramic<br className="sm:hidden" /> Views</div>
              </div>
              <div className="text-center p-3 sm:p-4 md:p-6 bg-gradient-to-br from-surface to-neutral dark:from-bg-secondary dark:to-mist rounded-2xl">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary mb-1 sm:mb-2">4.4★</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-white/70 font-medium leading-tight">Google<br className="sm:hidden" /> Rating</div>
              </div>
            </div>
            
            {/* Features */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-surface dark:bg-bg-secondary rounded-xl">
                <Award className="text-tropical flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-primary dark:text-text-primary text-sm sm:text-base">Authentic Experience</h4>
                  <p className="text-gray-600 dark:text-white/70 text-xs sm:text-sm">Unique tropical hut architecture with modern amenities</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-surface dark:bg-bg-secondary rounded-xl">
                <MapPin className="text-tropical flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-primary dark:text-text-primary text-sm sm:text-base">Prime Location</h4>
                  <p className="text-gray-600 dark:text-white/70 text-xs sm:text-sm">Heart of Western Ghats with stunning panoramic vistas</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-surface dark:bg-bg-secondary rounded-xl">
                <Users className="text-tropical flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-primary dark:text-text-primary text-sm sm:text-base">Nature Experiences</h4>
                  <p className="text-gray-600 dark:text-white/70 text-xs sm:text-sm">Hiking trails, scenic viewpoints, and peaceful mountain walks</p>
                </div>
              </div>
            </div>
            
            <Button className="bg-gradient-to-r from-primary to-tropical text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg group w-full sm:w-auto">
              Explore Our Story
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </div>
          
          {/* Image */}
          <div className="relative mt-8 lg:mt-0">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Moon Valley tropical hut surrounded by lush greenery" 
                className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Stats Card - Hidden on mobile, visible on larger screens */}
            <div className="hidden sm:block absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 bg-white dark:bg-bg-secondary rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-neutral/20 dark:border-mist/20">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-primary dark:text-tropical mb-1">57</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-white/70">Happy Reviews</div>
              </div>
            </div>
            
            {/* Floating Stats Card - Hidden on mobile, visible on larger screens */}
            <div className="hidden sm:block absolute -top-4 sm:-top-8 -right-4 sm:-right-8 bg-white dark:bg-bg-secondary rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-neutral/20 dark:border-mist/20">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-tropical mb-1">24/7</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-white/70">Open Access</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}