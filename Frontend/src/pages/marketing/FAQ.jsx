import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    { id: "getting-started", icon: Store, title: "Getting Started" },
    { id: "pricing", icon: CreditCard, title: "Pricing & Billing" },
    { id: "payments", icon: Wallet, title: "Payments & Payouts" },
    { id: "store", icon: ShoppingBag, title: "Store & Products" },
    { id: "orders", icon: Users, title: "Orders & Customers" },
    { id: "security", icon: ShieldCheck, title: "Security & Support" },
  ];

  // Expanded FAQ Database
  const faqs = {
    "getting-started": [
      {
        q: "Do I need any technical skills to use SabiSell?",
        a: "No! SabiSell is built for everyone. You can create and manage your store easily from your phone or computer. No coding or technical knowledge is required.",
      },
      {
        q: "How quickly can I set up my online store?",
        a: "You can set up your store in less than 5 minutes. Just sign up, add your store name, upload your logo, and add your first product to generate your unique store link.",
      },
      {
        q: "Can I sell both online and offline with SabiSell?",
        a: "Yes, you can manually record offline cash sales alongside your online orders to keep all your inventory and business records accurately in one place.",
      },
      {
        q: "Is there a free plan available?",
        a: "Yes, we have a forever-free plan that lets you upload up to 10 products and start selling immediately with standard Paystack processing fees.",
      },
    ],
    pricing: [
      {
        q: "How much does SabiSell cost?",
        a: "We have a Free plan (₦0), a Starter plan at ₦4,499/month, and a Growth plan at ₦9,499/month.",
      },
      {
        q: "How does the platform fee work?",
        a: "To maintain the platform, SabiSell takes a small percentage of successful sales. The Free plan has a 3% fee(capped at a maximum of ₦1500 per transaction), the Starter plan drops to 1.5% (capped at a maximum of ₦1,000 per transaction), and the Growth plan has 0% platform fees.",
      },
      {
        q: "Do you offer discounts for yearly plans?",
        a: "Yes! You get a 20% discount if you choose to pay annually instead of monthly.",
      },
      {
        q: "Can I cancel my subscription anytime?",
        a: "Yes, there are no lock-in contracts. You can cancel or downgrade your subscription at any time directly from your dashboard.",
      },
    ],
    payments: [
      {
        q: "How do I receive money from my sales?",
        a: "All payments are securely processed through Paystack. When a customer pays, the money is automatically routed directly to your connected local bank account.",
      },
      {
        q: "When do I get my payouts?",
        a: "Paystack processes payouts automatically. Depending on your bank, funds from successful transactions usually settle in your account within 24 hours.",
      },
      {
        q: "Can customers pay with bank transfers?",
        a: "Yes! At checkout, customers can choose to pay via card, USSD, or generate a temporary virtual bank account to make a direct transfer.",
      },
    ],
    store: [
      {
        q: "Is there a limit on how many products I can add?",
        a: "Yes. The Free plan allows you to upload up to 10 products, the starter plan allows you to upload up to 100 products, and the Growth plan allows you to upload up to 1,000 products.",
      },
      {
        q: "Can I use my own domain name (e.g., mystore.com)?",
        a: "Yes. While every store gets a free 'storename.sabisell.com' link, vendors on the Starter and Growth plans can connect their own custom domains.",
      },
      {
        q: "Does SabiSell handle delivery and logistics?",
        a: "No, SabiSell provides the software infrastructure. You are responsible for fulfilling and shipping your own orders, but you can set custom delivery fees in your dashboard for customers to pay at checkout.",
      },
    ],
    orders: [
      {
        q: "How do I know when I get a new order?",
        a: "The moment a customer pays, you will receive an instant email notification, and the order will appear immediately in your vendor dashboard.",
      },
      {
        q: "Can I chat with my customers?",
        a: "Yes, your storefront includes a quick-link button that allows customers to reach out to you directly via WhatsApp for inquiries before they buy.",
      },
      {
        q: "Does inventory update automatically?",
        a: "Yes. When an item is purchased, SabiSell automatically deducts it from your stock. If stock reaches zero, the item will show as 'Sold Out' so you never oversell.",
      },
    ],
    security: [
      {
        q: "Are my customers' payments secure?",
        a: "Absolutely. We do not store credit card details. All transactions are encrypted and processed by Paystack, a PCI-DSS certified payment gateway.",
      },
      {
        q: "How are refunds handled?",
        a: "Because payouts go directly to your bank account, you (the vendor) are responsible for issuing refunds to customers for returned or defective goods. SabiSell does not hold funds.",
      },
      {
        q: "How can I contact SabiSell support?",
        a: "You can reach our support team directly via the WhatsApp button on this page, or email us at support@sabisell.com.",
      },
    ],
  };

  // Search Logic
  const allFaqs = Object.values(faqs).flat();
  const filteredFaqs = searchQuery
    ? allFaqs.filter(
        (faq) =>
          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs[activeCategory];

  // Framer Motion Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-sabi-surface flex flex-col font-sans">
      <Header />

      <main className="grow flex flex-col bg-white pb-20 overflow-hidden">
        {/* 1. HERO SECTION */}
        <section className="relative pt-16 pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-white -z-10" />
          <motion.div 
            initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-sabi-primary text-sm font-bold border border-emerald-100 mb-6">
              <MessageCircleQuestion className="w-4 h-4" /> Frequently Asked Questions
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-6">
              Everything You Need To Know <br className="hidden md:block" /> About{" "}
              <span className="text-sabi-primary relative inline-block">
                SabiSell
                <svg className="absolute w-full h-3 -bottom-1 left-0 z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" />
                </svg>
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Find answers to common questions and get started with confidence.
            </motion.p>

            {/* Search Bar */}
            <motion.div variants={fadeUp} className="max-w-2xl mx-auto relative flex items-center">
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
            </motion.div>
          </motion.div>
        </section>

        {/* 2. CATEGORY TABS (Hides if searching) */}
        {!searchQuery && (
          <motion.section 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full overflow-hidden"
          >
            <div
              className="flex flex-nowrap overflow-x-auto gap-4 pb-4 w-full snap-x touch-pan-x xl:justify-center"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style>{`.touch-pan-x::-webkit-scrollbar { display: none; }`}</style>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenQuestion(0);
                  }}
                  className={`flex-none w-40 snap-start flex flex-col items-center justify-center p-6 rounded-2xl border transition-all ${
                    activeCategory === cat.id
                      ? "bg-emerald-50/50 border-sabi-primary shadow-sm"
                      : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <cat.icon className={`w-8 h-8 mb-3 ${activeCategory === cat.id ? "text-sabi-primary" : "text-gray-400"}`} />
                  <span className={`font-bold text-center mb-1 ${activeCategory === cat.id ? "text-gray-900" : "text-gray-700"}`}>
                    {cat.title}
                  </span>
                  <span className={`text-sm ${activeCategory === cat.id ? "text-sabi-primary" : "text-gray-400"}`}>
                    {faqs[cat.id].length} questions
                  </span>
                </button>
              ))}
            </div>
          </motion.section>
        )}

        {/* 3. MAIN CONTENT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT SIDEBAR: Still have questions? */}
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className="order-2 lg:order-1 lg:col-span-4 lg:sticky lg:top-28"
            >
              <div className="bg-[#F0FDF4] rounded-4xl p-8 border border-emerald-100 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Still have questions?</h3>
                <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                  We're here to help you succeed. Reach out to our support team and we'll get back to you quickly.
                </p>

                <div className="space-y-3 text-left">
                  {/* WhatsApp */}
                  <a href="https://wa.me/09061745089" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-50 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5 text-sabi-primary" />
                    </div>
                    <div className="grow">
                      <h4 className="font-bold text-gray-900 text-sm">Chat on WhatsApp</h4>
                      <p className="text-gray-500 text-xs">+234 901 234 5678</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </a>

                  {/* Email */}
                  <a href="mailto:support@sabisell.com" className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-50 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-sabi-primary" />
                    </div>
                    <div className="grow">
                      <h4 className="font-bold text-gray-900 text-sm">Email Support</h4>
                      <p className="text-gray-500 text-xs">support@sabisell.com</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </a>

                  {/* Hours */}
                  <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-50">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-sabi-primary" />
                    </div>
                    <div className="grow">
                      <h4 className="font-bold text-gray-900 text-sm">Support Hours</h4>
                      <p className="text-gray-500 text-xs">Mon - Sat, 8AM - 8PM WAT</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Accordion */}
            <div className="order-1 lg:order-2 lg:col-span-8 w-full">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-extrabold text-gray-900">
                  {searchQuery ? "Search Results" : categories.find((c) => c.id === activeCategory)?.title || "FAQ"}
                </h2>
                <span className="text-sm font-medium text-gray-500">
                  {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'questions'}
                </span>
              </div>

              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-gray-500 font-medium">No results found for "{searchQuery}". Try adjusting your search.</p>
                </div>
              ) : (
                <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }} className="space-y-4">
                  {filteredFaqs.map((faq, idx) => {
                    const isOpen = openQuestion === idx;

                    return (
                      <motion.div
                        variants={fadeUp}
                        key={idx}
                        className={`rounded-2xl transition-all duration-200 overflow-hidden ${
                          isOpen ? "bg-emerald-50/30 border border-sabi-primary shadow-sm" : "bg-white border border-gray-100 hover:border-gray-200"
                        }`}
                      >
                        <button
                          onClick={() => setOpenQuestion(isOpen ? null : idx)}
                          className="w-full p-5 flex items-center gap-4 text-left focus:outline-none"
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${isOpen ? "bg-sabi-primary text-white" : "bg-emerald-100/50 text-sabi-primary"}`}>
                            {idx + 1}
                          </div>
                          <span className={`grow font-semibold pr-4 ${isOpen ? "text-gray-900" : "text-gray-700"}`}>
                            {faq.q}
                          </span>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? "bg-sabi-primary text-white" : "bg-gray-100 text-gray-400"}`}>
                            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                              <ChevronDown className="w-5 h-5" />
                            </motion.div>
                          </div>
                        </button>

                        {/* Framer Motion Smooth Accordion Expansion */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <p className="px-5 pl-17 pb-6 text-gray-600 leading-relaxed pr-8">
                                {faq.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* Pricing Teaser Section (Only shows if not searching and on getting-started) */}
              {!searchQuery && activeCategory === "getting-started" && (
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
                  <div className="flex items-center justify-between mt-12 mb-6 pb-4 border-b border-gray-200">
                    <h2 className="text-2xl font-extrabold text-gray-900">Pricing & Billing</h2>
                    <span className="text-sm font-medium text-gray-500">{faqs["pricing"].length} questions</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {faqs["pricing"].map((faq, idx) => (
                      <div
                        key={`p-${idx}`}
                        className="bg-white border border-gray-100 p-4 rounded-xl flex justify-between items-center cursor-pointer hover:border-gray-200 transition-colors"
                        onClick={() => {
                          setActiveCategory("pricing");
                          setOpenQuestion(idx);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                            <Wallet className="w-4 h-4 text-blue-500" />
                          </div>
                          <span className="font-semibold text-gray-700 text-sm line-clamp-1 pr-2">
                            {faq.q}
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* 4. BOTTOM CTA BANNER */}
        <motion.section 
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8"
        >
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
              <Link to="/register" className="w-full md:w-auto bg-white hover:bg-gray-50 text-sabi-primary px-8 py-4 rounded-xl font-bold transition-colors whitespace-nowrap flex items-center justify-center gap-2 shadow-lg">
                Start Your Free Store <span>→</span>
              </Link>
              <div className="flex items-center gap-2 mt-3 text-emerald-100/80 text-xs font-medium">
                <Check className="w-3 h-3" /> No setup fees • Cancel anytime
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;