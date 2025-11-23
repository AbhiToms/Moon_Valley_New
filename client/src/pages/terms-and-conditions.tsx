import { Link } from "wouter";
import Navigation from "@/components/navigation";

export default function TermsAndConditions() {
  return (
    <>
      <Navigation />
      <div className="pt-32 pb-12 bg-white dark:bg-bg-secondary min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Link href="/" className="text-tropical hover:text-primary mb-8 inline-block transition-colors duration-300">
            ← Back to Home
          </Link>

          <h1 className="text-4xl sm:text-5xl font-poppins font-bold text-primary dark:text-text-primary mb-8">
            Terms and Conditions
          </h1>

          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-text-secondary space-y-6">
            <p className="text-lg">
              Last updated: November 2025
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using this website and making a booking with Moon Valley, you accept and agree to be bound by and comply with these Terms and Conditions. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">2. Booking and Reservation</h2>
              <p>
                All bookings are subject to availability. A booking is confirmed only after we receive full payment or a valid payment method. Prices are subject to change without notice and are displayed in Indian Rupees (INR).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">3. Cancellation and Refund Policy</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cancellations made 5 days before check-in: Full refund</li>
                <li>Cancellations made 3 days before check-in: 50% refund</li>
                <li>Cancellations made less than 2 days before check-in: No refund</li>
              </ul>
              <p className="mt-4">
                Refunds will be processed within 5-7 business days to the original payment method.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">4. Check-In and Check-Out</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Check-in time: 3:00 PM</li>
                <li>Check-out time: 12:00 PM (Noon)</li>
                <li>Early check-in and late check-out are subject to availability and may incur additional charges</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">5. Guest Conduct</h2>
              <p>
                Guests agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Respect the property and other guests</li>
                <li>Not engage in disruptive or illegal activities</li>
                <li>Follow all resort rules and regulations</li>
                <li>Be responsible for any damage caused during their stay</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">6. Liability</h2>
              <p>
                Moon Valley is not liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Loss, theft, or damage to personal belongings</li>
                <li>Injuries or accidents on the premises (except where due to our negligence)</li>
                <li>Weather-related cancellations or changes to activities</li>
                <li>Service interruptions beyond our control</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">7. Payment Terms</h2>
              <p>
                Payment must be made in full at the time of booking or as per the payment schedule provided. We accept major credit cards, debit cards, and online payment methods. Late payments may result in booking cancellation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">8. Age Restrictions</h2>
              <p>
                Guests must be 18 years or older to make a booking. Children under 18 must be accompanied by a responsible adult.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">9. Modification of Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">10. Contact Information</h2>
              <div className="bg-surface dark:bg-bg-primary p-4 rounded-lg">
                <p>Moon Valley - A Tropical Hut</p>
                <p>Palakkayam Thattu, Alakode</p>
                <p>Kannur 670571, Kerala, India</p>
                <p>Email: info@moonvalleyresort.com</p>
                <p>Phone: +91 9446986882</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
