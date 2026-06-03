import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Ticket,
  Copy,
  Check,
  ShieldCheck,
  Store,
  CreditCard,
  Box,
  X,
  ArrowRight,
  Rocket,
  Shirt,
  Laptop,
  ShoppingBag,
  ChevronDown,
  HelpCircle,
  TrendingUp
} from "lucide-react";

const Waitlist = () => {
  // --- State Management ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [vipCode, setVipCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // --- Handlers ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateVIPCode = () => {
    const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `SABI-VIP-${randomString}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API Call
    setTimeout(() => {
      const newCode = generateVIPCode();
      setVipCode(newCode);
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(vipCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // --- Pre-Launch FAQs Data ---
  const preLaunchFaqs = [
    {
      q: "When is SabiSell officially launching?",
      a: "We are currently finalizing our beta testing with a small group of early merchants. Our public launch is scheduled for later this quarter. Joining the waitlist guarantees you are the first to know the exact date."
    },
    {
      q: "What does the VIP Code actually do?",
      a: "When you sign up on launch day, you will be asked if you have a referral or VIP code. Entering your unique code will automatically upgrade your account to our premium Growth Plan (normally ₦9,499/month) absolutely free for your first 60 days. This gives you 0% platform fees while you scale."
    },
    {
      q: "Do I need to enter my credit card for the waitlist?",
      a: "No! Joining the waitlist is 100% free and requires no payment information. We only need your name and email to reserve your spot and send your code."
    },
    {
      q: "Can I use SabiSell to sell physical products?",
      a: "Yes. SabiSell is designed specifically for Nigerian entrepreneurs selling physical goods like fashion, electronics, cosmetics, and everyday retail items."
    }
  ];

  // --- Framer Motion Variants ---
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" } },
  };

  const modalBackdrop = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.3 } },
  };

  const modalContent = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", duration: 0.5, bounce: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-[#FDFDFB] font-sans overflow-hidden flex flex-col">
      
      {/* PRE-LAUNCH HEADER */}
      <header className="absolute top-0 left-0 w-full z-40 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#044e3b] rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl font-black tracking-tight text-gray-900">SabiSell</span>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-sm font-bold bg-[#044e3b] text-white px-5 py-2.5 rounded-xl hover:bg-[#033d2e] transition-colors shadow-sm hidden sm:block"
          >
            Join Waitlist
          </button>
        </div>
      </header>

      <main className="grow">
        {/* 1. HERO SECTION */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-50/60 to-white -z-10" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div variants={staggerContainer} initial="hidden" animate="show">
              
              <motion.p variants={fadeUp} className="text-[#044e3b] font-bold tracking-[0.2em] uppercase text-xs mb-8 flex items-center justify-center gap-3">
                <span className="w-8 h-px bg-[#044e3b]/30"></span>
                LAUNCHING SOON IN NIGERIA
                <span className="w-8 h-px bg-[#044e3b]/30"></span>
              </motion.p>
              
              <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-8">
                The easiest way to <br className="hidden sm:block" />
                <span className="text-[#044e3b]">sell online & get paid.</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
                Stop struggling with DM orders and manual bank transfers. SabiSell gives you a beautiful storefront, automated inventory, and instant Paystack payouts in less than 5 minutes.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-10 py-5 bg-[#044e3b] text-white rounded-2xl font-bold text-lg hover:bg-[#033d2e] transition-all hover:-translate-y-1 shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-2"
                >
                  Claim 2 Free Months <ArrowRight className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium text-gray-500">
                  <span className="text-red-500 font-bold">*</span> Limited to the first 500 merchants
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2. EXPLAINER GRID */}
        <section className="py-24 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp} className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Why thousands are waiting.</h2>
              <p className="text-lg text-gray-600">SabiSell is replacing scattered spreadsheets, unread Instagram DMs, and manual payment confirmations with a single, powerful platform.</p>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
              {[
                { icon: Store, title: "Instant Storefronts", desc: "No coding required. Upload your products and we generate a mobile-optimized website instantly." },
                { icon: CreditCard, title: "Automated Payouts", desc: "Integrated with Paystack. Customers pay via Card or Transfer, and the money drops straight into your bank." },
                { icon: Box, title: "Smart Inventory", desc: "Never oversell. Stock deducts automatically the exact second a customer completes a payment." },
                { icon: TrendingUp, title: "Zero Hidden Fees", desc: "Unlike other platforms, we don't hide our pricing. Secure your VIP code today to get 0% platform fees." }
              ].map((feat, idx) => (
                <motion.div key={idx} variants={scaleUp} className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                    <feat.icon className="w-7 h-7 text-[#044e3b]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feat.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {feat.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3. WHO IS IT FOR? */}
        <section className="py-24 bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp} className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Built for Nigerian Entrepreneurs.</h2>
              <p className="text-lg text-gray-600">SabiSell provides the perfect infrastructure to help retail and e-commerce businesses scale.</p>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { icon: Shirt, title: "Fashion & Beauty", color: "text-pink-600", bg: "bg-pink-100", desc: "Manage variations easily. Let customers choose sizes and colors before adding to cart." },
                { icon: Laptop, title: "Gadgets & Electronics", color: "text-blue-600", bg: "bg-blue-100", desc: "Build trust with professional listings, detailed specifications, and secure checkout." },
                { icon: ShoppingBag, title: "Everyday Retail & More", color: "text-orange-600", bg: "bg-orange-100", desc: "Groceries, home decor, handmade crafts, or automobile parts. If you can box it, you can sell it." }
              ].map((item, idx) => (
                <motion.div key={idx} variants={fadeUp} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${item.bg}`}>
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. PRE-LAUNCH FAQ */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp} className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-4">
                <HelpCircle className="w-6 h-6 text-[#044e3b]" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Waitlist FAQs</h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={staggerContainer} className="space-y-4">
              {preLaunchFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <motion.div key={idx} variants={fadeUp} className={`rounded-2xl transition-all duration-200 border ${isOpen ? "bg-emerald-50/30 border-[#044e3b] shadow-sm" : "bg-white border-gray-200 hover:border-gray-300"}`}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className={`font-semibold pr-4 ${isOpen ? "text-gray-900" : "text-gray-700"}`}>
                        {faq.q}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? "bg-[#044e3b] text-white" : "bg-gray-100 text-gray-400"}`}>
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                          <p className="px-6 pb-6 text-gray-600 leading-relaxed pr-8">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* 5. BOTTOM CTA BANNER */}
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}
            className="max-w-4xl mx-auto px-4 text-center"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border border-gray-100">
              <Rocket className="w-8 h-8 text-[#044e3b]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Don't miss the launch.</h2>
            <p className="text-lg text-gray-600 mb-10">We are strictly limiting our VIP reward codes to the first 500 merchants to ensure platform stability. Secure yours today.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-10 py-5 bg-[#044e3b] text-white rounded-2xl font-bold text-lg hover:bg-[#033d2e] transition-all shadow-xl shadow-emerald-900/20 inline-flex items-center justify-center gap-2"
            >
              Join the VIP Waitlist <ArrowRight className="w-5 h-5" />
            </button>
            
            {/* Ultra-subtle Paystack badge */}
            <div className="flex justify-center items-center gap-2 mt-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-300">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Secured By</span>
              <ShieldCheck className="w-3 h-3 text-gray-800" />
              <span className="text-sm font-black text-gray-800 tracking-tight">paystack</span>
            </div>
          </motion.div>
        </section>
      </main>

      {/* PRE-LAUNCH FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 bg-[#044e3b] rounded flex items-center justify-center">
            <Store className="w-3 h-3 text-white" />
          </div>
          <span className="font-serif text-lg font-black tracking-tight text-gray-900">SabiSell</span>
        </div>
        <p className="text-sm text-gray-500 font-medium">© 2026 SabiSell Technologies. Preparing for launch.</p>
        <p className="text-xs text-gray-400 mt-2">support@sabisell.com</p>
      </footer>

      {/* ========================================= */}
      {/* VIP WAITLIST MODAL POPUP                  */}
      {/* ========================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              variants={modalBackdrop} initial="hidden" animate="show" exit="hidden"
              onClick={closeModal}
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center px-4 py-10"
            >
              {/* Modal Content */}
              <motion.div 
                variants={modalContent} initial="hidden" animate="show" exit="hidden"
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-2xl border border-gray-100 relative overflow-hidden w-full max-w-md my-auto"
              >
                {/* Close Button */}
                <button 
                  onClick={closeModal}
                  className="absolute top-6 right-6 w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-500 transition-colors z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Thin green top border accent */}
                <div className="absolute top-0 left-0 w-full h-2 bg-[#044e3b]"></div>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    // --- FORM STATE ---
                    <motion.div 
                      key="form"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                    >
                      <div className="mb-8 pt-4">
                        {/* Refined the pill here too for consistency */}
                        <p className="text-[#044e3b] font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-2">
                          <Ticket className="w-4 h-4" /> ₦18,998 Reward Value
                        </p>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Secure Your Spot</h2>
                        <p className="text-gray-500 text-sm">Enter your details to generate your VIP reward code for 2 free months of Growth Plan.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                          <input 
                            type="text" id="name" name="name" required
                            value={formData.name} onChange={handleInputChange}
                            placeholder="e.g. Amina Yusuf"
                            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#044e3b]/20 focus:border-[#044e3b] transition-all font-medium text-gray-900"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
                          <input 
                            type="email" id="email" name="email" required
                            value={formData.email} onChange={handleInputChange}
                            placeholder="e.g. amina@mybusiness.com"
                            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#044e3b]/20 focus:border-[#044e3b] transition-all font-medium text-gray-900"
                          />
                        </div>

                        <button 
                          type="submit" disabled={isLoading}
                          className="w-full mt-2 bg-[#044e3b] hover:bg-[#033d2e] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              Generating Code...
                            </span>
                          ) : (
                            <>Claim VIP Code <ArrowRight className="w-5 h-5" /></>
                          )}
                        </button>

                        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium mt-4">
                          <ShieldCheck className="w-4 h-4" /> We promise not to spam your inbox.
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    // --- SUCCESS STATE ---
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", duration: 0.6 }}
                      className="text-center py-4 pt-8"
                    >
                      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                      </div>
                      <h2 className="text-2xl font-extrabold text-gray-900 mb-2">You're on the list!</h2>
                      <p className="text-gray-500 text-sm mb-8 px-4">
                        Welcome to the VIP list, <span className="font-bold text-gray-900">{formData.name.split(' ')[0]}</span>. Here is your exclusive launch code. Save it somewhere safe!
                      </p>

                      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-6 mb-6 relative group">
                         <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Your VIP Reward Code</div>
                         <div className="text-3xl font-black text-[#044e3b] tracking-widest">{vipCode}</div>
                      </div>

                      <button 
                        onClick={copyToClipboard}
                        className={`w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
                          isCopied ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/20"
                        }`}
                      >
                        {isCopied ? (
                          <><Check className="w-5 h-5" /> Code Copied!</>
                        ) : (
                          <><Copy className="w-5 h-5" /> Copy Code to Clipboard</>
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Waitlist;