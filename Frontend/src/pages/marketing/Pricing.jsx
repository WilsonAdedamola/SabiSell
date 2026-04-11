import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Tag,
  Star,
  Check,
  Globe,
  Users,
  Info,
  HelpCircle,
  CreditCard,
  Ban,
  Lock,
  Rocket
} from "lucide-react";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-sabi-surface flex flex-col font-sans">
      <Header />

      <main className="grow flex flex-col bg-white pb-20">
        
        {/* 1. HERO & PRICING HEADER */}
        <section className="relative pt-16 pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-emerald-50/50 to-white -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-sabi-primary text-sm font-bold border border-emerald-100 mb-6 shadow-sm">
              <Tag className="w-4 h-4 fill-sabi-primary" /> Simple & Transparent Pricing
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-4">
              Choose the Perfect Plan for Your Business
            </h1>

            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Start free and upgrade as you grow. No hidden fees, cancel anytime.
            </p>

            {/* Monthly / Yearly Toggle */}
            <div className="bg-white border border-gray-200 rounded-full p-1.5 flex items-center justify-center w-fit mx-auto shadow-sm">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                  !isYearly
                    ? "bg-sabi-primary text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 bg-transparent"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isYearly
                    ? "bg-sabi-primary text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 bg-transparent"
                }`}
              >
                Yearly
              </button>
              <span className="text-emerald-600 text-xs font-extrabold px-4 uppercase tracking-wider">
                Save 20%
              </span>
            </div>
          </div>
        </section>

        {/* 2. PRICING CARDS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
            
            {/* Free Plan */}
            <div className="bg-white rounded-4xl p-8 md:p-10 border border-gray-200 shadow-sm flex flex-col hover:shadow-lg transition-shadow">
              <div className="text-center mb-8">
                <h4 className="text-gray-900 font-extrabold text-xl uppercase tracking-wide">
                  Free
                </h4>
                <p className="text-gray-500 text-sm mt-1 font-medium">
                  Perfect to get started
                </p>
                <div className="mt-6 mb-2 flex items-center justify-center gap-1">
                  <span className="text-5xl font-extrabold text-gray-900">
                    ₦0
                  </span>
                  <span className="text-gray-500 mt-3 font-medium">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Up to 10 products",
                  { text: "Free SabiSell subdomain", sub: "yourstore.sabisell.com" },
                  "Accept orders & payments",
                  "WhatsApp chat integration",
                  "SabiSell branding on store",
                ].map((ft, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                       <Check className="w-3 h-3 text-sabi-primary" />
                    </div>
                    {typeof ft === 'string' ? (
                        <span>{ft}</span>
                    ) : (
                        <div className="flex flex-col">
                            <span>{ft.text}</span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-500 mt-1 w-fit">{ft.sub}</span>
                        </div>
                    )}
                  </li>
                ))}
              </ul>
              <Link to="/auth/register" className="w-full py-4 rounded-xl border border-gray-300 text-gray-800 font-bold hover:bg-gray-50 transition-colors text-center text-base">
                Start Selling Free
              </Link>
            </div>

            {/* Starter Plan (Most Popular) */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 border-2 border-sabi-primary shadow-2xl flex flex-col relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sabi-primary text-white px-5 py-1.5 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-md">
                <Star className="w-3.5 h-3.5 fill-white" /> MOST POPULAR
              </div>
              <div className="text-center mb-8 mt-2">
                <h4 className="text-sabi-primary font-extrabold text-xl uppercase tracking-wide">
                  Starter
                </h4>
                <p className="text-gray-500 text-sm mt-1 font-medium">
                  Everything you need to run a real business
                </p>
                <div className="mt-6 mb-2 flex flex-col items-center justify-center">
                  {isYearly && (
                    <span className="text-lg text-gray-400 line-through decoration-red-400/50 mb-[-5px] font-bold">
                      ₦60,000
                    </span>
                  )}
                  <div className="flex items-center gap-1">
                    <span className="text-5xl font-extrabold text-gray-900">
                      {isYearly ? "₦48,000" : "₦5,000"}
                    </span>
                    <span className="text-gray-500 mt-3 font-medium">
                      {isYearly ? "/year" : "/month"}
                    </span>
                  </div>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Up to 100 products",
                  { text: "Custom domain (yourstore.com)", icon: <Globe className="w-4 h-4 text-gray-400"/> },
                  "Remove SabiSell branding",
                  "Basic analytics & insights",
                  "In-app chat + WhatsApp",
                  "Multiple payment methods",
                ].map((ft, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-900 font-semibold">
                    <div className="w-5 h-5 rounded-full bg-sabi-primary flex items-center justify-center shrink-0 mt-0.5">
                       <Check className="w-3 h-3 text-white" />
                    </div>
                    {typeof ft === 'string' ? (
                        <span>{ft}</span>
                    ) : (
                        <div className="flex items-center justify-between w-full">
                            <span>{ft.text}</span>
                            {ft.icon}
                        </div>
                    )}
                  </li>
                ))}
              </ul>
              <Link to="/auth/register" className="w-full py-4 rounded-xl bg-sabi-primary text-white font-bold hover:bg-sabi-primaryDark transition-colors text-center text-base shadow-md shadow-emerald-600/20">
                Start 7-Day Free Trial
              </Link>
            </div>

            {/* Growth Plan */}
            <div className="bg-white rounded-4xl p-8 md:p-10 border border-gray-200 shadow-sm flex flex-col hover:shadow-lg transition-shadow">
              <div className="text-center mb-8">
                <h4 className="text-[#6D28D9] font-extrabold text-xl uppercase tracking-wide">
                  Growth
                </h4>
                <p className="text-gray-500 text-sm mt-1 font-medium">
                  Powerful tools for scaling
                </p>
                <div className="mt-6 mb-2 flex flex-col items-center justify-center">
                  {isYearly && (
                    <span className="text-lg text-gray-400 line-through decoration-red-400/50 -mb-1.25 font-bold">
                      ₦144,000
                    </span>
                  )}
                  <div className="flex items-center gap-1">
                    <span className="text-5xl font-extrabold text-gray-900">
                      {isYearly ? "₦115,200" : "₦12,000"}
                    </span>
                    <span className="text-gray-500 mt-3 font-medium">
                      {isYearly ? "/year" : "/month"}
                    </span>
                  </div>
                </div>
              </div>
              <ul className="space-y-4 mb-10 grow">
                {[
                  "Unlimited products",
                  { text: "Staff accounts (up to 5 users)", icon: <Users className="w-4 h-4 text-purple-400"/> },
                  "Advanced analytics dashboard",
                  "Automated emails & receipts",
                  "Discount codes & promotions",
                  "Priority support",
                ].map((ft, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                       <Check className="w-3 h-3 text-purple-600" />
                    </div>
                    {typeof ft === 'string' ? (
                        <span>{ft}</span>
                    ) : (
                        <div className="flex items-center justify-between w-full">
                            <span>{ft.text}</span>
                            <div className="bg-purple-50 p-1 rounded-md">{ft.icon}</div>
                        </div>
                    )}
                  </li>
                ))}
              </ul>
              <Link to="/auth/register" className="w-full py-4 rounded-xl bg-[#6D28D9] text-white font-bold hover:bg-[#5B21B6] transition-colors text-center text-base shadow-md shadow-purple-600/20">
                Upgrade to Growth
              </Link>
            </div>

          </div>

          {/* Info Pill */}
          <div className="flex justify-center mt-8 mb-16">
             <div className="bg-[#F0FDF4] border border-emerald-100 text-emerald-800 px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm">
                <Info className="w-4 h-4 text-sabi-primary" /> 
                <span>No setup fees • Cancel anytime • Upgrade or downgrade at any time</span>
             </div>
          </div>
        </section>

        {/* 3. COMPARE PLANS TABLE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
           <div className="bg-[#F0FDF4] rounded-4xl p-3 lg:p-12 border border-emerald-50">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                 
                 {/* Left side text */}
                 <div className="lg:col-span-4 lg:sticky lg:top-28">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Compare Plans</h2>
                    <p className="text-gray-600 text-lg">See what's included in each plan.</p>
                 </div>

                 {/* Right side table */}
                 <div className="lg:col-span-8 overflow-x-auto hide-scrollbar bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <table className="w-full min-w-150 text-left border-collapse">
                       <thead>
                          <tr className="border-b border-gray-100 bg-gray-50/50">
                             <th className="py-5 px-6 font-bold text-gray-900 text-sm">Features</th>
                             <th className="py-5 px-6 font-bold text-gray-600 text-sm text-center">Free</th>
                             <th className="py-5 px-6 font-bold text-sabi-primary text-sm text-center bg-emerald-50/30">Starter</th>
                             <th className="py-5 px-6 font-bold text-gray-600 text-sm text-center">Growth</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100">
                          {[
                             { name: "Products", f: "Up to 10", s: "Up to 100", g: "Unlimited" },
                             { name: "Custom Domain", f: false, s: true, g: true },
                             { name: "Remove SabiSell Branding", f: false, s: true, g: true },
                             { name: "Analytics & Insights", f: "—", s: "Basic", g: "Advanced" },
                             { name: "Staff Accounts", f: "—", s: "1 Admin", g: "Up to 5 Users" },
                             { name: "Automated Emails", f: false, s: false, g: true },
                             { name: "Priority Support", f: false, s: false, g: true },
                          ].map((row, idx) => (
                             <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-5 px-6 text-sm font-semibold text-gray-800">{row.name}</td>
                                
                                {/* Free Column */}
                                <td className="py-5 px-6 text-center text-sm font-medium text-gray-500">
                                   {row.f === true ? <Check className="w-5 h-5 text-sabi-primary mx-auto" /> : row.f === false ? "—" : row.f}
                                </td>
                                
                                {/* Starter Column */}
                                <td className="py-5 px-6 text-center text-sm font-bold text-gray-900 bg-emerald-50/30">
                                   {row.s === true ? <Check className="w-5 h-5 text-sabi-primary mx-auto" /> : row.s === false ? <span className="text-gray-400 font-normal">—</span> : row.s}
                                </td>

                                {/* Growth Column */}
                                <td className="py-5 px-6 text-center text-sm font-medium text-gray-700">
                                   {row.g === true ? <Check className="w-5 h-5 text-sabi-primary mx-auto" /> : row.g === false ? "—" : row.g}
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>

              </div>
           </div>
        </section>

        {/* 4. PRICING FAQs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Title */}
              <div className="lg:col-span-4">
                 <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
                 <p className="text-gray-600 mb-8 leading-relaxed pr-4">
                    Everything you need to know about SabiSell pricing.
                 </p>
                 <Link to="/faq" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-sabi-primary font-bold hover:border-sabi-primary hover:bg-emerald-50 transition-all">
                    View All FAQs →
                 </Link>
              </div>

              {/* Right Grid */}
              <div className="lg:col-span-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                       <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                          <HelpCircle className="w-5 h-5 text-sabi-primary" />
                       </div>
                       <h4 className="font-bold text-gray-900 mb-2">Can I upgrade or downgrade anytime?</h4>
                       <p className="text-sm text-gray-600 leading-relaxed">Yes! You can change your plan at any time directly from your dashboard settings.</p>
                    </div>

                    <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                       <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                          <CreditCard className="w-5 h-5 text-sabi-primary" />
                       </div>
                       <h4 className="font-bold text-gray-900 mb-2">What payment methods do you accept?</h4>
                       <p className="text-sm text-gray-600 leading-relaxed">We accept payments via bank transfer, card, Paystack and Flutterwave.</p>
                    </div>

                    <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                       <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-4 border border-red-100">
                          <Ban className="w-5 h-5 text-red-500" />
                       </div>
                       <h4 className="font-bold text-gray-900 mb-2">Is there a contract or long-term commitment?</h4>
                       <p className="text-sm text-gray-600 leading-relaxed">Nope. All plans are month-to-month or yearly, and you can cancel anytime without penalty.</p>
                    </div>

                    <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                       <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                          <Lock className="w-5 h-5 text-sabi-primary" />
                       </div>
                       <h4 className="font-bold text-gray-900 mb-2">Is my data and payments secure?</h4>
                       <p className="text-sm text-gray-600 leading-relaxed">Absolutely. We use industry-standard security and secure payment providers to protect you and your buyers.</p>
                    </div>

                 </div>
              </div>

           </div>
        </section>

        {/* 5. BOTTOM CTA BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-[#044e3b] rounded-4xl px-6 py-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>

            <div className="flex items-center gap-6 z-10 w-full md:w-auto">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg sm:flex">
                <Rocket className="w-8 h-8 text-sabi-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight">
                  Ready to Start Your Online Store?
                </h2>
                <p className="text-emerald-100/90 text-sm md:text-base">
                  Join 500+ vendors already growing with SabiSell.
                </p>
              </div>
            </div>

            <div className="z-10 w-full md:w-auto">
              <Link
                to="/auth/register"
                className="w-full md:w-auto bg-white hover:bg-gray-50 text-sabi-primary px-8 py-4 rounded-xl font-bold transition-colors whitespace-nowrap flex items-center justify-center gap-2 shadow-lg"
              >
                Start Your Free Store Now <span>→</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Pricing;