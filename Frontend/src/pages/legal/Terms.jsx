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
              SabiSell provides a storefront platform for vendors to sell products to buyers. To use certain features, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Payments & Fees</h2>
            <p>
              All payments processed through SabiSell are handled securely by Paystack. By using our platform, you agree to Paystack’s terms of service. SabiSell deducts a platform fee based on your active subscription plan (e.g., Free, Starter, or Growth) at the time of the transaction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Vendor Responsibilities</h2>
            <p>
              Vendors are solely responsible for the products they list, the accuracy of their product descriptions, fulfilling orders in a timely manner, and handling their own customer disputes. SabiSell reserves the right to suspend accounts that violate our community standards or engage in fraudulent activity.
            </p>
          </section>

          <hr className="border-gray-200 my-10" />

          {/* Refund Policy Section */}
          <div className="mb-12">
            <h1 className="text-3xl font-serif text-gray-900 mb-4">Return & Refund Policy</h1>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns</h2>
            <p>
              We want you to be completely satisfied with your purchase. If you are not entirely happy, we offer a 14-day return policy. To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging. You must also provide the receipt or proof of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Refunds</h2>
            <p>
              Once we receive your returned item, we will inspect it and notify you of the status of your refund. If your return is approved, we will initiate a refund to your original method of payment. You will receive the credit within a certain amount of days, depending on your card issuer's policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Costs for Returns</h2>
            <p>
              You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Terms;