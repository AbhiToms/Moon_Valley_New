import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    content: "Breathtaking mountain views and such peaceful surroundings. The common kitchen was well-equipped and the swimming pool area is perfect for relaxation. Great value for money!",
    name: "Rajesh Kumar",
    location: "Delhi, India",
    initials: "RK"
  },
  {
    content: "Amazing hiking experience with knowledgeable local guides. The rooms are comfortable and clean. The resort truly connects you with nature while providing modern amenities.",
    name: "Anita Sharma",
    location: "Mumbai, India", 
    initials: "AS"
  },
  {
    content: "Perfect family getaway! Kids enjoyed the swimming pool and we loved cooking together in the common kitchen. Staff was helpful and the mountain air was so refreshing.",
    name: "Vikram Singh",
    location: "Bangalore, India",
    initials: "VS"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-forest mb-4">
            Guest Experiences
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover why our guests choose Moon Valley Resort for their mountain retreats and memorable experiences.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white rounded-2xl card-shadow hover-lift border-0">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="fill-current" size={16} />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mr-4 ${
                      index === 0 ? 'bg-sage' : index === 1 ? 'bg-forest' : 'bg-gold'
                    }`}>
                      <span>{testimonial.initials}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-forest">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
