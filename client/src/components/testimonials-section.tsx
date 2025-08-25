import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    content: "Great place to stay with friends! The swimming pool, kitchen, rooms, and toilets were all well-maintained and clean. We grilled chicken with coal arranged by Joby bro. The breakfast was good, and the resort owner is very friendly.",
    name: "Dhrupath M K",
    location: "Google Reviewer • 1 month ago",
    initials: "DM"
  },
  {
    content: "A wonderful place with amazing views of the surrounding valleys. Perfect for escaping city stress or planning a romantic getaway. The swimming pool and peaceful atmosphere make it an ideal destination.",
    name: "Michel Parra",
    location: "Google Reviewer • 1 year ago", 
    initials: "MP"
  },
  {
    content: "Excellent experience with outstanding hospitality from Joby chettan. The treehouse rooms are surprisingly spacious and creatively designed inside. Beautiful morning views and great grilling facilities make this the perfect place for friends to stay together.",
    name: "Abhijith Vijay Yohan",
    location: "Google Reviewer • 3 years ago",
    initials: "AV"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-cream dark:bg-bg-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/10 dark:bg-tropical/20 rounded-full px-6 py-2 mb-6">
            <span className="text-primary dark:text-tropical font-semibold text-sm">TESTIMONIALS</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-poppins font-bold text-primary dark:text-text-primary mb-6">
            Guest <span className="text-tropical">Experiences</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-white/80 max-w-3xl mx-auto leading-relaxed">
            Discover why our guests choose Moon Valley Resort for their mountain retreats and memorable experiences.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white dark:bg-bg-secondary rounded-2xl card-shadow hover-lift border-0 dark:border dark:border-mist/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-gold dark:text-secondary">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="fill-current" size={16} />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-text-secondary mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mr-4 ${
                      index === 0 
                        ? 'bg-primary text-white dark:bg-primary dark:text-white' 
                        : index === 1 
                        ? 'bg-secondary text-white dark:bg-secondary dark:text-white' 
                        : 'bg-tropical text-white dark:bg-tropical dark:text-white'
                    }`}>
                      <span className="text-lg">{testimonial.initials}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-forest dark:text-text-primary">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 dark:text-text-secondary">{testimonial.location}</div>
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
