import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  PlayCircle,
  Star,
  Store,
  ShoppingBag,
  MessageCircle,
  CreditCard,
  Rocket,
  Check,
  ShieldCheck,
  Zap
} from "lucide-react";
import heroImg from "../../assets/HeroImg.svg";
// import heroImg from "../../assets/HeroImg.jpg";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";

const Landing = () => {
  const [isYearly, setIsYearly] = useState(false);

  // --- Framer Motion Animation Variants ---
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

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" } },
  };

  return (
    <div className="min-h-screen bg-sabi-surface flex flex-col font-sans overflow-hidden">
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="grow flex flex-col bg-white">
        
        {/* 1. HERO SECTION */}
        <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/40 to-white -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
              
              {/* Hero Text (Animated) */}
              <motion.div 
                variants={staggerContainer} 
                initial="hidden" 
                animate="show" 
                className="space-y-8 text-center xl:text-left"
              >
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-sabi-primary text-sm font-semibold mx-auto xl:mx-0">
                  <span className="text-yellow-500 text-base">⚡</span> Your Own Online Store, Ready in Minutes
                </motion.div>

                <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                  Sell Online Easily. <br className="hidden sm:block" />
                  Grow Your Brand with <br className="hidden sm:block" />
                  <span className="text-sabi-primary">SabiSell.</span>
                </motion.h1>

                <motion.p variants={fadeUp} className="text-lg text-gray-600 max-w-xl mx-auto xl:mx-0 leading-relaxed">
                  Create a professional online store, add your products, chat with customers and start getting paid — all from your phone or computer.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap justify-center xl:justify-start gap-4 text-sm font-semibold text-gray-800">
                  <span className="flex items-center gap-1.5 bg-emerald-50/80 px-4 py-2 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-sabi-primary fill-emerald-100" /> No Coding Needed
                  </span>
                  <span className="flex items-center gap-1.5 bg-emerald-50/80 px-4 py-2 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-sabi-primary fill-emerald-100" /> Secure Payments
                  </span>
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center xl:justify-start gap-4 pt-2">
                  <Link to="/register" className="bg-sabi-primary hover:bg-sabi-primaryDark text-white px-8 py-3.5 rounded-lg font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20">
                    Start Your Free Store <span>→</span>
                  </Link>
                  <button className="px-8 py-3.5 rounded-lg font-bold text-base text-gray-800 bg-white border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <PlayCircle className="w-5 h-5 text-sabi-primary" /> See How It Works
                  </button>
                </motion.div>
              </motion.div>

              {/* Hero Image Mockup (Animated) */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative w-full h-100 sm:h-125 lg:h-150 bg-transparent flex items-center justify-center"
              >
                <img src={heroImg} alt="SabiSell Hero" className="w-full h-auto object-contain drop-shadow-2xl" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. SOCIAL PROOF BANNER */}
        {/* <section className="py-8 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={scaleUp}
              className="bg-emerald-50 border border-emerald-100 rounded-[30px] sm:rounded-full py-4 px-6 sm:py-3 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <div className="flex -space-x-3">
                  {['Felix', 'Aneka', 'Mimi'].map((seed, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden ${i === 0 ? 'bg-blue-200' : i === 1 ? 'bg-pink-200' : 'bg-purple-200'}`}>
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} alt="user" />
                    </div>
                  ))}
                </div>
                <p className="font-semibold text-gray-800 text-sm text-center sm:text-left md:text-base">
                  Join <strong className="text-gray-900">500+</strong> entrepreneurs already selling with SabiSell
                </p>
              </div>
              <div className="hidden md:block w-px h-8 bg-emerald-200"></div>
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
                <span className="font-bold text-gray-900">Excellent</span>
                <div className="flex gap-1 text-emerald-500">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-5 h-5" />)}
                </div>
                <span className="font-semibold text-gray-700">4.9/5 <span className="font-normal text-gray-500">from 200+ vendors</span></span>
              </div>
            </motion.div>
          </div>
        </section> */}

        {/* 3. FEATURES GRID */}
        <section id="features" className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">Everything You Need to Sell Online</h2>
              <p className="text-gray-600 mb-16 text-lg">Powerful tools designed for African entrepreneurs.</p>
            </motion.div>

            <motion.div 
              variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
            >
              {[
                { icon: Store, title: "Easy Store Setup", desc: "Launch your store in minutes with our simple step-by-step onboarding." },
                { icon: ShoppingBag, title: "Manage Products", desc: "Add, edit and organize products with photos, prices, sizes and availability." },
                { icon: MessageCircle, title: "Chat with Customers", desc: "Chat instantly with buyers through built-in messaging or WhatsApp integration." },
                { icon: CreditCard, title: "Get Paid Securely", desc: "Receive payments safely via Paystack, dropping straight into your local bank." },
              ].map((feat, idx) => (
                <motion.div key={idx} variants={fadeUp} className="bg-white p-8 rounded-2xl shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                  <div className="w-14 h-14 bg-emerald-50 text-sabi-primary rounded-xl flex items-center justify-center mb-6">
                    <feat.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feat.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feat.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. HOW IT WORKS & PRICING SPLIT */}
        <section id="how-it-works" className="py-20 bg-gray-50/50 border-y border-gray-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
              
              {/* Left Column: How It Works */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="lg:col-span-3 lg:sticky lg:top-24"
              >
                <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">How It Works</h2>
                <p className="text-gray-600 mb-10 text-lg">Start selling in 3 simple steps</p>

                <div className="space-y-10 relative">
                  <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gray-200 z-0"></div>
                  {[
                    { num: "1", title: "Create Your Store", desc: "Sign up and set up your store details in minutes." },
                    { num: "2", title: "Add Your Products", desc: "Upload photos, set prices and publish instantly." },
                    { num: "3", title: "Start Receiving Orders", desc: "Customers browse, chat with you and place orders securely." },
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-6 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-sabi-primary text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-sm border-4 border-white">
                        {step.num}
                      </div>
                      <div className="pt-2">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column: Pricing Cards */}
              <div className="lg:col-span-9 flex flex-col items-center lg:items-start lg:pl-10">
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="w-full flex flex-col items-center text-center mb-10">
                  <span className="bg-emerald-100 text-sabi-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">Simple & Transparent Pricing</span>
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-6">Choose the Plan That Fits Your Business</h3>

                  {/* Monthly / Yearly Toggle */}
                  <div className="bg-white border border-gray-200 rounded-full p-1 flex items-center shadow-sm">
                    <button onClick={() => setIsYearly(false)} className={`px-6 py-2 text-sm font-bold transition-colors cursor-pointer ${!isYearly ? "bg-sabi-primary text-white rounded-full shadow-sm" : "text-gray-600 hover:text-gray-900 bg-transparent"}`}>Monthly</button>
                    <button onClick={() => setIsYearly(true)} className={`px-6 py-2 text-sm font-bold transition-colors cursor-pointer ${isYearly ? "bg-sabi-primary text-white rounded-full shadow-sm" : "text-gray-600 hover:text-gray-900"}`}>Yearly</button>
                    <span className="text-emerald-600 text-xs font-bold px-3">Save 20%</span>
                  </div>
                </motion.div>

                <motion.div 
                  variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full"
                >
                  {/* 1. Free Plan */}
                  <motion.div variants={scaleUp} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col">
                    <div className="text-center mb-6">
                      <h4 className="text-gray-900 font-extrabold text-lg uppercase tracking-wide">Free</h4>
                      <div className="my-4 flex items-center justify-center gap-1">
                        <span className="text-3xl font-extrabold text-gray-900">₦0</span><span className="text-gray-500 mt-2">/month</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8 grow">
                      {["Standard Storefront", "Up to 10 Products", "Paystack Integration", "WhatsApp Chat Link", "Basic Sales Tracking"].map((ft, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> <span>{ft}</span>
                        </li>
                      ))}
                      <li className="flex items-start gap-2 text-sm font-bold text-gray-900 pt-3 border-t border-gray-100">
                        <span className="text-red-500">•</span> 3.0% Platform Fee (Capped at ₦1500)
                      </li>
                    </ul>
                    <Link to="/register" className="w-full block text-center py-3 rounded-xl border border-gray-300 text-gray-800 font-bold hover:bg-gray-50 transition-colors">Start Free</Link>
                  </motion.div>

                  {/* 2. Starter Plan */}
                  <motion.div variants={scaleUp} className="bg-white rounded-3xl p-6 border-2 border-sabi-primary shadow-xl flex flex-col relative md:-translate-y-4">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sabi-primary text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider flex items-center gap-1 whitespace-nowrap">
                      <Star className="w-3 h-3 fill-white" /> MOST POPULAR
                    </div>
                    <div className="text-center mb-6 mt-2">
                      <h4 className="text-sabi-primary font-extrabold text-lg uppercase tracking-wide">Starter</h4>
                      <div className="my-4 flex flex-col items-center justify-center">
                        {isYearly && <span className="text-sm text-gray-400 line-through decoration-red-400/50 -mb-5px">₦60,000</span>}
                        <div className="flex items-center gap-1">
                          <span className="text-3xl font-extrabold text-gray-900">{isYearly ? "₦43,190" : "₦4,499"}</span>
                          <span className="text-gray-500 mt-2">{isYearly ? "/year" : "/mo"}</span>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8 grow">
                      {["Everything in Free", "Up to 100 Products", "Custom Domain Setup", "Subtle SabiSell Branding", "Discount & Promo Codes", "Low Stock Alerts"].map((ft, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                          <Check className="w-4 h-4 text-sabi-primary shrink-0 mt-0.5" /> <span>{ft}</span>
                        </li>
                      ))}
                      <li className="flex items-start gap-2 text-sm font-bold text-sabi-primary pt-3 border-t border-emerald-50">
                        <span>↓</span> 1.5% Fee (Capped at ₦1k)
                      </li>
                    </ul>
                    <Link to="/register" className="w-full block text-center py-3 rounded-xl bg-sabi-primary text-white font-bold hover:bg-sabi-primaryDark transition-colors">Start 7-Day Trial</Link>
                  </motion.div>

                  {/* 3. Growth Plan */}
                  <motion.div variants={scaleUp} className="bg-white rounded-3xl p-6 border border-purple-200 shadow-sm flex flex-col">
                    <div className="text-center mb-6">
                      <h4 className="text-purple-700 font-extrabold text-lg uppercase tracking-wide">Growth</h4>
                      <div className="my-4 flex flex-col items-center justify-center">
                        {isYearly && <span className="text-sm text-gray-400 line-through decoration-red-400/50 -mb-5px">₦180,000</span>}
                        <div className="flex items-center gap-1">
                          <span className="text-3xl font-extrabold text-gray-900">{isYearly ? "₦91,190" : "₦9,499"}</span>
                          <span className="text-gray-500 mt-2">{isYearly ? "/year" : "/mo"}</span>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8 grow">
                      {["Everything in Starter", "Up to 1,000 Products", "Advanced Analytics", "Remove SabiSell Branding", "Automated Email Receipts", "Priority 24/7 Support"].map((ft, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" /> <span>{ft}</span>
                        </li>
                      ))}
                      <li className="flex items-start gap-2 text-sm font-bold text-purple-700 pt-3 border-t border-gray-100">
                        <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" /> 0% Platform Fee
                      </li>
                    </ul>
                    <button className="w-full py-3 rounded-xl bg-purple-50 text-purple-700 font-bold hover:bg-purple-100 transition-colors">
                      Upgrade to Growth
                    </button>
                  </motion.div>

                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. BOTTOM CTA BANNER */}
        <section className="bg-white pb-0 pt-16">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="bg-[#044e3b] px-4 py-16 lg:py-20"
          >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                  <Rocket className="w-8 h-8 text-sabi-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight">Ready to Grow Your Business?</h2>
                  <p className="text-emerald-100/90 text-lg">Join SabiSell today and start selling online in minutes.</p>
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-xl shadow-lg max-w-md">
                <input type="email" placeholder="Enter your email address" className="w-full px-4 py-3 bg-transparent text-gray-900 focus:outline-none placeholder:text-gray-400 font-medium" />
                <Link to="/register" className="bg-sabi-primary hover:bg-sabi-primaryDark text-white px-6 py-3 rounded-lg font-bold transition-colors whitespace-nowrap flex items-center justify-center gap-2">
                  Start Free Store <span>→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />  
    </div>
  );
};

export default Landing;