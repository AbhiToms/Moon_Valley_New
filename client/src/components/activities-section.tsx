import { Button } from "@/components/ui/button";
import { Mountain, Bike, Wind, Camera, CheckCircle } from "lucide-react";

const adventureActivities = [
  { icon: Mountain, label: "Rock Climbing" },
  { icon: Bike, label: "Mountain Biking" },
  { icon: Wind, label: "Zip Lining" },
  { icon: Camera, label: "Photography" }
];

const hikingFeatures = [
  "Professional mountain guides",
  "All difficulty levels available",
  "Equipment provided"
];

export default function ActivitiesSection() {
  return (
    <section id="activities" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-forest mb-4">
            Mountain Adventures
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Immerse yourself in thrilling outdoor experiences designed to create unforgettable memories in nature's playground.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Guided hiking trail through mountain valleys" 
              className="rounded-2xl shadow-2xl w-full hover-lift"
            />
          </div>
          
          <div>
            <h3 className="text-3xl font-playfair font-bold text-forest mb-6">
              Guided Mountain Hiking
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Explore pristine mountain trails with our experienced guides. Discover hidden waterfalls, alpine meadows, and breathtaking viewpoints that showcase the valley's natural beauty.
            </p>
            
            <ul className="space-y-3 mb-8">
              {hikingFeatures.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="text-sage mr-3 flex-shrink-0" size={20} />
                  {feature}
                </li>
              ))}
            </ul>
            
            <Button className="bg-forest text-white px-8 py-3 rounded-full hover:bg-forest/90 transition-all duration-300 hover:shadow-lg">
              Book Adventure
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Rock climbing and adventure activities" 
              className="rounded-2xl shadow-2xl w-full hover-lift"
            />
          </div>
          
          <div className="lg:order-1">
            <h3 className="text-3xl font-playfair font-bold text-forest mb-6">
              Adventure Sports
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              For thrill-seekers, we offer an array of adrenaline-pumping activities including rock climbing, zip-lining, and mountain biking on carefully selected routes.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {adventureActivities.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <div key={index} className="text-center p-4 bg-sage/10 rounded-lg">
                    <IconComponent className="text-forest mx-auto mb-2" size={32} />
                    <div className="font-semibold text-forest">{activity.label}</div>
                  </div>
                );
              })}
            </div>
            
            <Button className="bg-gold text-forest px-8 py-3 rounded-full hover:bg-gold/90 transition-all duration-300 hover:shadow-lg font-semibold">
              View All Activities
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
