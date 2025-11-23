import { Link } from "wouter";
import Navigation from "@/components/navigation";

export default function CookiePolicy() {
  return (
    <>
      <Navigation />
      <div className="pt-32 pb-12 bg-white dark:bg-bg-secondary min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Link href="/" className="text-tropical hover:text-primary mb-8 inline-block transition-colors duration-300">
            ← Back to Home
          </Link>

          <h1 className="text-4xl sm:text-5xl font-poppins font-bold text-primary dark:text-text-primary mb-8">
            Cookie Policy
          </h1>

          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-text-secondary space-y-6">
            <p className="text-lg">
              Last updated: November 2025
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device when you visit our website. They help us remember your preferences, track website usage, and improve your browsing experience. Cookies can be either "persistent" (lasting until deletion) or "session" (deleted when you close your browser).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">2. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-primary dark:text-text-primary mb-3 mt-4">Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function properly. They enable core functionality such as security, user authentication, and preference storage. You cannot opt-out of essential cookies.
              </p>

              <h3 className="text-xl font-semibold text-primary dark:text-text-primary mb-3 mt-4">Performance Cookies</h3>
              <p>
                These cookies help us understand how visitors interact with our website. They collect anonymous information about page visits, bounce rates, and user behavior to help us improve website performance.
              </p>

              <h3 className="text-xl font-semibold text-primary dark:text-text-primary mb-3 mt-4">Preference Cookies</h3>
              <p>
                These cookies remember your choices and preferences, such as your theme preference (light/dark mode), language selection, and other customization settings.
              </p>

              <h3 className="text-xl font-semibold text-primary dark:text-text-primary mb-3 mt-4">Marketing Cookies</h3>
              <p>
                With your consent, we use these cookies to track your activity and deliver personalized content and advertisements. You can opt-out of marketing cookies at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">3. Cookie Duration</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Session cookies: Deleted when you close your browser</li>
                <li>Persistent cookies: Remain for up to 2 years or until manually deleted</li>
                <li>Theme preference cookies: Stored indefinitely until changed by user</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">4. Third-Party Cookies</h2>
              <p>
                We may allow third parties (such as Google Analytics, payment providers, and analytics services) to set cookies on our website. These third parties have their own privacy policies governing the use of cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">5. Managing Cookies</h2>
              <p>
                You can control and manage cookies through your browser settings:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong>Edge:</strong> Settings → Privacy, search, and services → Clear browsing data</li>
              </ul>
              <p className="mt-4">
                You can also use browser extensions to block cookies. However, disabling cookies may affect the functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">6. Consent</h2>
              <p>
                By continuing to use our website, you consent to our use of cookies. You can withdraw consent at any time by managing your cookie settings through your browser or by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">7. Do Not Track</h2>
              <p>
                Some browsers include a "Do Not Track" feature. Our website currently does not respond to Do Not Track signals. If you wish to opt-out of tracking, you can manage your browser cookies and extensions as described above.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">8. Updates to Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. Changes will be effective immediately upon posting to our website. Your continued use constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-text-primary mb-4">9. Contact Us</h2>
              <p>
                If you have questions about our use of cookies or this policy, please contact us at:
              </p>
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
