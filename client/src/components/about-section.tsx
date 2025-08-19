import { Button } from "@/components/ui/button";

export default function AboutSection() {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-slideInLeft">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-forest mb-6">
              Your Mountain Sanctuary
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Moon Valley - A Tropical Hut provides a unique hilltop experience at Palakkayam Thattu, Kerala. Our tropical accommodation offers guests breathtaking views, adventure activities, and an immersive nature experience that connects you with the beauty of the Western Ghats.
            </p>
            
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-forest mb-2">3,500</div>
                <div className="text-sm text-gray-600">Feet Above Sea Level</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-forest mb-2">360°</div>
                <div className="text-sm text-gray-600">Panoramic Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-forest mb-2">4.4</div>
                <div className="text-sm text-gray-600">Google Rating</div>
              </div>
            </div>
            
            <Button className="bg-forest text-white px-8 py-3 rounded-full hover:bg-forest/90 transition-all duration-300 hover:shadow-lg">
              Our Story
            </Button>
          </div>
          
          <div className="animate-slideInRight">
            <img 
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Cozy resort interior with mountain lodge atmosphere" 
              className="rounded-2xl shadow-2xl w-full hover-lift"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
