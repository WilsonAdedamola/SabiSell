import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MessageCircleQuestion,
  Store,
  CreditCard,
  Wallet,
  ShoppingBag,
  Users,
  ShieldCheck,
  Lightbulb,
  MessageCircle,
  Mail,
  Clock,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Rocket,
  Check,
} from "lucide-react";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [openQuestion, setOpenQuestion] = useState(0); 
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "getting-started", icon: Store, title: "Getting Started", count: 5 },
    { id: "pricing", icon: CreditCard, title: "Pricing & Billing", count: 4 },
    { id: "payments", icon: Wallet, title: "Payments", count: 4 },
    { id: "store", icon: ShoppingBag, title: "Store & Products", count: 4 },
    { id: "orders", icon: Users, title: "Orders & Customers", count: 3 },
    {
      id: "security",
      icon: ShieldCheck,
      title: "Security & Support",
      count: 3,
    },
  ];

  const faqs = {
    "getting-started": [
      {
        q: "Do I need any technical skills to use SabiSell?",
        a: "No! SabiSell is built for everyone. You can create and manage your store easily from your phone or computer. No coding or technical knowledge required.",
      },
      {
        q: "How quickly can I set up my online store?",
        a: "You can set up your store in less than 5 minutes. Just sign up, add your store name, upload your logo, and add your first product.",
      },
      {
        q: "Can I sell both online and offline with SabiSell?",
        a: "Yes, you can record offline cash sales alongside your online orders to keep all your inventory and records in one place.",
      },
      {
        q: "Is there a free plan available?",
        a: "Yes, we have a forever-free plan that lets you add up to 10 products and start selling immediately.",
      },
      {
        q: "Can I change my plan later?",
        a: "Absolutely. You can upgrade or downgrade your plan at any time from your dashboard.",
      },
    ],
    pricing: [
      {
        q: "How much does SabiSell cost?",
        a: "We have a Free plan, a Starter plan at ₦5,000/month, and a Growth plan at ₦12,000/month.",
      },
      {
        q: "Do you offer discounts for yearly plans?",
        a: "Yes! You get a 20% discount if you choose to pay annually instead of monthly.",
      },
      {
        q: "Can I cancel my subscription anytime?",
        a: "Yes, there are no lock-in contracts. You can cancel your subscription at any time.",
      },
      {
        q: "Are there any hidden fees?",
        a: "No. SabiSell does not charge any setup fees or hidden commission fees on your sales.",
      },
    ],
  };

  const activeFaqs = faqs[activeCategory] || faqs["getting-started"];

  return (
    <div className="min-h-screen bg-sabi-surface flex flex-col font-sans">
      <Header />

      <main className="grow flex flex-col bg-white pb-20">
        {/* 1. HERO SECTION */}
        <section className="relative pt-16 pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-emerald-50/50 to-white -z-10" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-sabi-primary text-sm font-bold border border-emerald-100 mb-6">
              <MessageCircleQuestion className="w-4 h-4" /> Frequently Asked
              Questions
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-6">
              Everything You Need To Know <br className="hidden md:block" />
              About{" "}
              <span className="text-sabi-primary relative inline-block">
                SabiSell
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 z-10"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Find answers to common questions and get started with confidence.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative flex items-center">
              <Search className="absolute left-6 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-28 py-4 bg-white border border-gray-200 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary shadow-sm text-lg"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-sabi-primary hover:bg-sabi-primaryDark text-white px-5 sm:px-8 rounded-full font-bold transition-colors">
                Search
              </button>
            </div>
          </div>
        </section>

        {/* 2. CATEGORY TABS */}
        {/* Used w-full overflow-hidden on the parent to prevent the page from shifting */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full overflow-hidden">
          {/* Hid the scrollbar with inline styles, and add flex-nowrap + overflow-x-auto */}
          <div 
            className="flex flex-nowrap overflow-x-auto gap-4 pb-4 w-full snap-x touch-pan-x" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`
              .touch-pan-x::-webkit-scrollbar { display: none; }
            `}</style>
            
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenQuestion(0);
                }}
                /* flex-none is the magic bullet here. It refuses to shrink. */
                className={`flex-none w-40 snap-start flex flex-col items-center justify-center p-6 rounded-2xl border transition-all ${
                  activeCategory === cat.id
                    ? "bg-emerald-50/50 border-sabi-primary shadow-sm"
                    : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                }`}
              >
                <cat.icon
                  className={`w-8 h-8 mb-3 ${
                    activeCategory === cat.id
                      ? "text-sabi-primary"
                      : "text-gray-400"
                  }`}
                />
                <span
                  className={`font-bold text-center mb-1 ${
                    activeCategory === cat.id
                      ? "text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  {cat.title}
                </span>
                <span
                  className={`text-sm ${
                    activeCategory === cat.id
                      ? "text-sabi-primary"
                      : "text-gray-400"
                  }`}
                >
                  {cat.count} questions
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. MAIN CONTENT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT SIDEBAR: Still have questions? (FIXED ORDER) */}
            <div className="order-2 lg:order-1 lg:col-span-4 lg:sticky lg:top-28">
              <div className="bg-[#F0FDF4] rounded-4xl p-8 border border-emerald-100 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                  Still have questions?
                </h3>
                <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                  We're here to help you succeed. Reach out to our support team
                  and we'll get back to you quickly.
                </p>

                <div className="space-y-3 text-left">
                  {/* WhatsApp */}
                  <a
                    href="#"
                    className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-50 hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5 text-sabi-primary" />
                    </div>
                    <div className="grow">
                      <h4 className="font-bold text-gray-900 text-sm">
                        Chat on WhatsApp
                      </h4>
                      <p className="text-gray-500 text-xs">+234 901 234 5678</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:support@sabisell.com"
                    className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-50 hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-sabi-primary" />
                    </div>
                    <div className="grow">
                      <h4 className="font-bold text-gray-900 text-sm">
                        Email Support
                      </h4>
                      <p className="text-gray-500 text-xs">
                        support@sabisell.com
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </a>

                  {/* Hours */}
                  <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-50">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-sabi-primary" />
                    </div>
                    <div className="grow">
                      <h4 className="font-bold text-gray-900 text-sm">
                        Support Hours
                      </h4>
                      <p className="text-gray-500 text-xs">
                        Mon - Sat, 8AM - 8PM WAT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Accordion (FIXED ORDER) */}
            <div className="order-1 lg:order-2 lg:col-span-8 w-full">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-extrabold text-gray-900">
                  {categories.find((c) => c.id === activeCategory)?.title ||
                    "FAQ"}
                </h2>
                <span className="text-sm font-medium text-gray-500">
                  {categories.find((c) => c.id === activeCategory)?.count || 0}{" "}
                  questions
                </span>
              </div>

              {/* Accordion List */}
              <div className="space-y-4">
                {activeFaqs.map((faq, idx) => {
                  const isOpen = openQuestion === idx;

                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl transition-all duration-200 overflow-hidden ${
                        isOpen
                          ? "bg-emerald-50/30 border border-sabi-primary shadow-sm"
                          : "bg-white border border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <button
                        onClick={() => setOpenQuestion(isOpen ? null : idx)}
                        className="w-full p-5 flex items-center gap-4 text-left focus:outline-none"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                            isOpen
                              ? "bg-sabi-primary text-white"
                              : "bg-emerald-100/50 text-sabi-primary"
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <span
                          className={`grow font-semibold pr-4 ${
                            isOpen ? "text-gray-900" : "text-gray-700"
                          }`}
                        >
                          {faq.q}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isOpen
                              ? "bg-sabi-primary text-white"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </button>

                      {/* Answer Expansion */}
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "max-h-96 opacity-100 pb-6"
                            : "max-h-0 opacity-0 overflow-hidden"
                        }`}
                      >
                        <p className="px-5 pl-17 text-gray-600 leading-relaxed pr-8">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* Pricing Teaser Section */}
                {activeCategory === "getting-started" && (
                  <>
                    <div className="flex items-center justify-between mt-12 mb-6 pb-4 border-b border-gray-200">
                      <h2 className="text-2xl font-extrabold text-gray-900">
                        Pricing & Billing
                      </h2>
                      <span className="text-sm font-medium text-gray-500">
                        4 questions
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {faqs["pricing"].map((faq, idx) => (
                        <div
                          key={`p-${idx}`}
                          className="bg-white border border-gray-100 p-4 rounded-xl flex justify-between items-center cursor-pointer hover:border-gray-200"
                          onClick={() => {
                            setActiveCategory("pricing");
                            setOpenQuestion(idx);
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                              <Wallet className="w-4 h-4 text-blue-500" />
                            </div>
                            <span className="font-semibold text-gray-700 text-sm">
                              {faq.q}
                            </span>
                          </div>
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 4. BOTTOM CTA BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-[#044e3b] rounded-4xl px-6 py-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>

            <div className="flex items-center gap-6 z-10 w-full md:w-auto">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg sm:flex">
                <Rocket className="w-8 h-8 text-sabi-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight">
                  Ready to Start Selling?
                </h2>
                <p className="text-emerald-100/90 text-sm md:text-base">
                  Join 500+ entrepreneurs who are already growing with SabiSell.
                </p>
              </div>
            </div>

            <div className="z-10 flex flex-col items-center md:items-end w-full md:w-auto">
              <Link
                to="/auth/register"
                className="w-full md:w-auto bg-white hover:bg-gray-50 text-sabi-primary px-8 py-4 rounded-xl font-bold transition-colors whitespace-nowrap flex items-center justify-center gap-2 shadow-lg"
              >
                Start Your Free Store <span>→</span>
              </Link>
              <div className="flex items-center gap-2 mt-3 text-emerald-100/80 text-xs font-medium">
                <Check className="w-3 h-3" /> No setup fees • Cancel anytime
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;