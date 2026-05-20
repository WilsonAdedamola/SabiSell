import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFB] font-sans text-gray-900 pb-20">
      <header className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-serif text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-500 font-medium">Effective Date: May 2026</p>
        </div>

        <div className="prose prose-gray max-w-none text-gray-600 leading-loose space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p>
              When you make a purchase or sign up on SabiSell, we collect personal information such as your name, email address, phone number, and shipping address. We do not store your credit card details; all payments are securely processed by Paystack.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Process your transactions and send order confirmations.</li>
              <li>Arrange for shipping and delivery.</li>
              <li>Send you important updates regarding your account or platform changes.</li>
              <li>Prevent fraud and secure our platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Sharing Your Information</h2>
            <p>
              We only share your information with third parties necessary to complete your requests, such as our payment gateway (Paystack) and delivery partners. We do not sell, rent, or trade your personal information to outside parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Security</h2>
            <p>
              We take reasonable precautions and follow industry best practices to protect your personal information and ensure it is not inappropriately lost, misused, accessed, disclosed, altered, or destroyed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact</h2>
            <p>
              For requests regarding your data, please contact us at{" "}
              <a href="mailto:support@sabisell.com" className="text-[#044e3b] font-bold hover:underline">support@sabisell.com</a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;