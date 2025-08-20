import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    content: "Great place to stay with friends! The swimming pool, kitchen, rooms, and toilets were all well-maintained and clean. We grilled chicken with coal arranged by Joby bro. The breakfast was good, and the resort owner is very friendly.",
    name: "Dhrupath Mk",
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
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-forest dark:text-text-primary mb-4">
            Guest Experiences
          </h2>
          <p className="text-lg text-gray-600 dark:text-text-secondary max-w-2xl mx-auto">
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
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mr-4 ${
                      index === 0 ? 'bg-sage dark:bg-primary' : index === 1 ? 'bg-forest dark:bg-secondary' : 'bg-gold dark:bg-tropical'
                    }`}>
                      <span>{testimonial.initials}</span>
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
