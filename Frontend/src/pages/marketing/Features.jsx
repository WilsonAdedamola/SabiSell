import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Store,
  CreditCard,
  Box,
  MessageCircle,
  Globe,
  Users,
  TicketPercent,
  BarChart3,
  ShieldCheck,
  Smartphone,
  Check,
  Rocket,
  ArrowRight,
  Zap,
  RefreshCcw
} from "lucide-react";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";

const Features = () => {
  // --- Framer Motion Variants ---
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" } },
  };

  // --- Grid Features Data ---
  const gridFeatures = [
    {
      icon: MessageCircle,
      title: "WhatsApp Integration",
      desc: "Connect directly with your buyers. Customers can send inquiries straight to your WhatsApp from any product page.",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: Globe,
      title: "Custom Domains",
      desc: "Build brand trust. Connect your own unique domain name (e.g., mystore.com) to your SabiSell storefront.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: TicketPercent,
      title: "Discounts & Promos",
      desc: "Run flash sales, create percentage discounts, or offer fixed-amount promo codes to drive more sales.",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      desc: "Know your numbers. Track total sales, top-performing products, and customer behavior right from your dashboard.",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      icon: Users,
      title: "Staff Accounts",
      desc: "Don't do it alone. Invite team members to manage inventory or process orders without sharing your login details.",
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
    {
      icon: RefreshCcw,
      title: "Offline Sales Tracking",
      desc: "Selling physical items in a shop? Record cash sales manually to keep your digital inventory perfectly synced.",
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
  ];

  return (
    <div className="min-h-screen bg-sabi-surface flex flex-col font-sans overflow-hidden">
      <Header />

      <main className="grow flex flex-col bg-white">
        {/* 1. HERO SECTION */}
        <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/40 to-white -z-10" />
          <motion.div 
            initial="hidden" animate="show" variants={staggerContainer}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-sabi-primary text-sm font-bold border border-emerald-100 mb-6">
              <Zap className="w-4 h-4 fill-emerald-600" /> Powerful Infrastructure
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-6">
              Everything you need to <br className="hidden md:block" />
              <span className="text-sabi-primary">sell, scale, and succeed.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              We handle the heavy lifting—from storefront design to payment routing—so you can focus entirely on growing your business.
            </motion.p>
            
            <motion.div variants={fadeUp}>
              <Link to="/register" className="inline-flex items-center gap-2 bg-sabi-primary hover:bg-sabi-primaryDark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 shadow-lg shadow-emerald-600/20">
                Start Selling for Free <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* 2. DEEP DIVE (ZIG-ZAG SECTIONS) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
            
            {/* Feature A: Storefront */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeLeft} className="w-full lg:w-1/2">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 border border-emerald-100">
                  <Store className="w-8 h-8 text-sabi-primary" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                  A beautiful storefront, <br />ready in minutes.
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  No coding required. Simply upload your logo, pick a brand color, and add your products. SabiSell instantly generates a mobile-optimized, lightning-fast website that looks perfect on every device.
                </p>
                <ul className="space-y-4">
                  {["Mobile-first design for faster checkouts", "Customizable theme colors to match your brand", "Lightning fast page loading speeds", "Built-in SEO to help customers find you"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeRight} className="w-full lg:w-1/2">
                <div className="aspect-square sm:aspect-[4/3] lg:aspect-square bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-inner flex items-center justify-center p-8 relative overflow-hidden">
                  {/* Mockup UI Placeholder */}
                  <div className="absolute inset-x-12 -bottom-12 top-12 bg-white rounded-t-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
                    <div className="h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-gray-50/50">
                      <div className="w-24 h-4 bg-gray-200 rounded-full"></div>
                      <div className="w-8 h-8 bg-emerald-100 rounded-full"></div>
                    </div>
                    <div className="p-6 grid grid-cols-2 gap-4">
                      <div className="aspect-square bg-gray-100 rounded-xl"></div>
                      <div className="aspect-square bg-gray-100 rounded-xl"></div>
                      <div className="aspect-square bg-gray-100 rounded-xl"></div>
                      <div className="aspect-square bg-gray-100 rounded-xl"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Feature B: Payments (Reversed) */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeRight} className="w-full lg:w-1/2 lg:order-last">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                  Seamless payments, <br />automated payouts.
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Stop confirming bank transfers manually. We've integrated directly with Paystack so your customers can pay securely via Card, USSD, or Bank Transfer. The best part? The money drops straight into your connected local bank account.
                </p>
                <ul className="space-y-4">
                  {["Accept Card, USSD, and Bank Transfers", "Zero manual reconciliation needed", "PCI-DSS certified secure checkout", "Dynamic platform fee splitting built-in"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                      <Check className="w-5 h-5 text-blue-500 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeLeft} className="w-full lg:w-1/2 lg:order-first">
                <div className="aspect-square sm:aspect-[4/3] lg:aspect-square bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-inner flex items-center justify-center p-8 relative overflow-hidden">
                   {/* Mockup UI Placeholder */}
                   <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-gray-100 p-6 z-10">
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Paystack</span>
                        <ShieldCheck className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div className="space-y-4">
                        <div className="h-14 border-2 border-emerald-500 rounded-xl flex items-center justify-between px-4 bg-emerald-50">
                          <span className="font-bold text-gray-900">Pay with Card</span>
                          <div className="w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></div>
                        </div>
                        <div className="h-14 border border-gray-200 rounded-xl flex items-center px-4">
                          <span className="font-bold text-gray-500">Pay with Bank Transfer</span>
                        </div>
                      </div>
                      <div className="mt-8 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold">
                        Pay ₦12,500
                      </div>
                   </div>
                </div>
              </motion.div>
            </div>

            {/* Feature C: Inventory */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeLeft} className="w-full lg:w-1/2">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 border border-orange-100">
                  <Box className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                  Smart inventory that <br />works while you sleep.
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Never accidentally sell an item you don't have. SabiSell automatically deducts stock the exact second a customer completes a payment. When stock hits zero, the product automatically updates to "Sold Out".
                </p>
                <ul className="space-y-4">
                  {["Real-time stock deduction", "Low-stock email notifications", "Manage product variants (Colors & Sizes)", "Hide products out of season"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                      <Check className="w-5 h-5 text-orange-500 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeRight} className="w-full lg:w-1/2">
                <div className="aspect-square sm:aspect-[4/3] lg:aspect-square bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-inner flex items-center justify-center p-8 relative overflow-hidden">
                   {/* Mockup UI Placeholder */}
                   <div className="w-full max-w-sm space-y-4">
                      {[
                        { title: "Classic White Sneaker", stock: "12 in stock", status: "text-emerald-600 bg-emerald-50" },
                        { title: "Vintage Denim Jacket", stock: "2 in stock", status: "text-orange-600 bg-orange-50" },
                        { title: "Leather Crossbody Bag", stock: "0 in stock", status: "text-red-600 bg-red-50", strike: true },
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg shrink-0"></div>
                          <div className="grow">
                            <h4 className={`font-bold text-gray-900 text-sm ${item.strike ? 'line-through opacity-50' : ''}`}>{item.title}</h4>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded mt-1 inline-block ${item.status}`}>{item.stock}</span>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* 3. THE KITCHEN SINK (GRID) */}
        <section className="py-24 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Everything else you need.</h2>
              <p className="text-lg text-gray-600">We didn't cut any corners. Your SabiSell dashboard is packed with enterprise-grade features simplified for everyday use.</p>
            </motion.div>

            <motion.div 
              variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {gridFeatures.map((feat, idx) => (
                <motion.div key={idx} variants={scaleUp} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feat.bg}`}>
                    <feat.icon className={`w-6 h-6 ${feat.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feat.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{feat.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. SECURITY & TECH HIGHLIGHT */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#044e3b] rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
               
               <div className="md:w-1/2 z-10 text-white space-y-6">
                 <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">Built on enterprise-grade infrastructure.</h2>
                 <p className="text-emerald-50 text-lg">Your store shouldn't crash when you go viral. SabiSell is hosted on globally distributed servers to guarantee 99.9% uptime, blazing fast load speeds, and strict data protection.</p>
                 <div className="flex flex-wrap gap-4 pt-4">
                    <div className="flex items-center gap-2 bg-emerald-900/50 border border-emerald-800 px-4 py-2 rounded-full text-sm font-bold text-emerald-100">
                      <Smartphone className="w-4 h-4" /> Progressive Web App
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-900/50 border border-emerald-800 px-4 py-2 rounded-full text-sm font-bold text-emerald-100">
                      <ShieldCheck className="w-4 h-4" /> SSL Secured
                    </div>
                 </div>
               </div>
               
               <div className="md:w-1/2 z-10 w-full flex justify-center lg:justify-end">
                 {/* Visual representation of tech stack or security badge */}
                 <div className="w-48 h-48 sm:w-64 sm:h-64 border-[8px] border-emerald-800/30 rounded-full flex items-center justify-center relative">
                    <div className="w-32 h-32 sm:w-44 sm:h-44 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                      <ShieldCheck className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* 5. BOTTOM CTA BANNER (Consistent with FAQ/Landing) */}
        <motion.section 
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-20"
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
              <Link
                to="/register"
                className="w-full md:w-auto bg-white hover:bg-gray-50 text-sabi-primary px-8 py-4 rounded-xl font-bold transition-colors whitespace-nowrap flex items-center justify-center gap-2 shadow-lg"
              >
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

export default Features;