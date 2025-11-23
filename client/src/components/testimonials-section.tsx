import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dhrupath M K",
    text: "Great place to stay! The swimming pool, kitchen, rooms were all well-maintained. Excellent hospitality and friendly service.",
    rating: 5
  },
  {
    name: "Michel Parra",
    text: "Amazing views of the surrounding valleys. Perfect for escaping city stress. The peaceful atmosphere is incredible.",
    rating: 5
  },
  {
    name: "Abhijith Vijay",
    text: "Outstanding hospitality and treehouse rooms are surprisingly spacious. Beautiful morning views and perfect for group stays.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Guest <span className="text-emerald-600 dark:text-emerald-400">Experiences</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            What our guests say about their stay
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-slate-800 p-8 rounded-xl">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">"{t.text}"</p>
              <p className="font-semibold text-gray-900 dark:text-white">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
