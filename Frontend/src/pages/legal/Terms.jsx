import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const Terms = () => {
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
          <h1 className="text-4xl sm:text-5xl font-serif text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-500 font-medium">Effective Date: May 2026</p>
        </div>

        <div className="prose prose-gray max-w-none text-gray-600 leading-loose space-y-8">
          
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-4 mb-8">
             <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-1" />
             <p className="text-sm font-medium text-emerald-900 m-0">
               By accessing or using SabiSell (the "Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
             </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Platform Usage & Accounts</h2>
            <p>
              SabiSell provides an e-commerce platform for independent vendors to sell products directly to buyers. To use certain features, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Payments & Fees</h2>
            <p>
              All payments processed through SabiSell are handled securely by our payment partner, Paystack. By using our platform, you agree to Paystack’s terms of service. SabiSell deducts a platform fee based on your active subscription plan (e.g., Free, Starter, or Growth) at the time of the transaction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Vendor Responsibilities</h2>
            <p>
              Vendors are solely responsible for the products they list, the accuracy of their product descriptions, fulfilling orders in a timely manner, and handling their own customer disputes. 
            </p>
            {/* HERE IS THE PROHIBITED ITEMS CLAUSE! */}
            <p className="mt-2 text-gray-900 font-medium">
              <strong>Prohibited Items:</strong> Vendors are strictly prohibited from selling illegal goods, counterfeit items, firearms, illicit drugs, or any items that violate local and international laws. SabiSell reserves the right to terminate any vendor account found violating this rule without notice.
            </p>
          </section>

          <hr className="border-gray-200 my-10" />

          {/* Refund Policy Section - Updated for Marketplace Protection */}
          <div className="mb-12">
            <h1 className="text-3xl font-serif text-gray-900 mb-4">Return & Refund Policy</h1>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Vendor Responsibility</h2>
            <p>
              SabiSell operates as an e-commerce marketplace platform. All products listed on individual storefronts are sold directly by the respective Vendor, not by SabiSell. Therefore, <strong>all returns, exchanges, and refunds are solely the responsibility of the Vendor.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Requesting a Refund</h2>
            <p>
              If you are unsatisfied with your purchase, you must contact the Vendor directly using the contact information provided on their storefront. Vendors are expected to clearly state their own return conditions, but we strongly encourage all Vendors to offer a minimum 7-day return window for defective or incorrectly advertised items.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Platform Mediation</h2>
            <p>
              While SabiSell does not process refunds directly or hold funds on behalf of Vendors, we hold our merchants to a high standard of customer service. If you have contacted a Vendor regarding a defective item and they refuse to communicate or honor a valid refund request, please contact SabiSell Support at <a href="mailto:support@sabisell.com" className="text-[#044e3b] font-bold hover:underline">support@sabisell.com</a>.
            </p>
            <p className="mt-2">
              SabiSell reserves the right to investigate the dispute. Vendors found to be engaging in fraudulent sales or refusing valid refunds may have their storefronts suspended or permanently removed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Chargebacks and Fraud</h2>
            <p>
              Vendors are strictly liable for any bank chargebacks resulting from undelivered goods or fraudulent activity. SabiSell reserves the right to suspend vendor payouts and recover chargeback fees directly from the offending Vendor's connected accounts.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Terms;