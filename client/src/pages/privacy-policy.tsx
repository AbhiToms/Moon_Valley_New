import { Link } from "wouter";
import Navigation from "@/components/navigation";

export default function PrivacyPolicy() {
  return (
    <>
      <Navigation />
      <div className="pt-32 pb-12 bg-white dark:bg-bg-secondary min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Link href="/" className="text-tropical hover:text-primary mb-8 inline-block transition-colors duration-300">
            ← Back to Home
          </Link>

          <h1 className="text-4xl sm:text-5xl font-poppins font-bold text-primary dark:text-text-primary mb-8">
            Privacy Policy
          </h1>

          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-text-secondary space-y-6">
            <p className="text-lg">
              Last updated: November 2025
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">1. Introduction</h2>
              <p>
                Moon Valley ("we", "us", "our", or "the resort") operates the www.moonvalley.com website and our related services (collectively, the "Service").
              </p>
              <p>
                This Privacy Policy explains our practices regarding the collection, use, disclosure, and safeguarding of your information when you visit our website, including any content, functionality, and services offered on or through the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">2. Information We Collect</h2>
              <p>
                We collect information in the following ways:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Personal Information:</strong> When you make a booking or contact us, we collect information such as your name, email address, phone number, and billing address.
                </li>
                <li>
                  <strong>Automatically Collected Data:</strong> We automatically collect certain information about your device when you access our website, including IP address, browser type, operating system, and pages visited.
                </li>
                <li>
                  <strong>Cookies and Tracking:</strong> We use cookies and similar tracking technologies to enhance your browsing experience and understand usage patterns.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">3. How We Use Your Information</h2>
              <p>
                We use the information we collect for various purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To process and manage your bookings and reservations</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To send you promotional emails and updates (with your consent)</li>
                <li>To analyze website usage and improve our services</li>
                <li>To ensure the security and integrity of our website</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">5. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of external sites. We encourage you to review the privacy policies of any third-party services before providing your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">6. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (subject to legal obligations)</li>
                <li>Opt-out of promotional communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="bg-surface dark:bg-bg-primary p-4 rounded-lg mt-4">
                <p>Moon Valley - A Tropical Hut</p>
                <p>Palakkayam Thattu, Alakode</p>
                <p>Kannur 670571, Kerala, India</p>
                <p>Email: info@moonvalleyresort.com</p>
                <p>Phone: +91 9446986882</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">8. Policy Updates</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the updated policy on our website with an updated "Last updated" date.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
