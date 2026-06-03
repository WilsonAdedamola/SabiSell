import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Store,
  Image as ImageIcon,
  Palette,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Rocket,
  Check,
  PlayCircle,
  Smartphone
} from "lucide-react";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";

const HowItWorks = () => {
  // --- Framer Motion Variants ---
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const slideRight = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const slideLeft = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const steps = [
    {
      icon: Store,
      title: "Create Your Account",
      desc: "Sign up in 60 seconds. Enter your basic details, launch your storefront from your new dashboard, and securely link your bank account to automate your Paystack payouts.",
      color: "text-blue-600",
      bg: "bg-blue-50",
      borderColor: "border-blue-100",
      mockup: (
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <div className="space-y-4">
            <div>
              <div className="h-3 w-20 bg-gray-200 rounded mb-2"></div>
              <div className="h-10 w-full bg-gray-50 border border-gray-200 rounded-lg flex items-center px-3"><div className="h-3 w-32 bg-gray-300 rounded"></div></div>
            </div>
            <div>
              <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-10 w-full bg-gray-50 border border-gray-200 rounded-lg flex items-center px-3"><div className="h-3 w-40 bg-gray-300 rounded"></div></div>
            </div>
            <div className="pt-2">
              <div className="h-12 w-full bg-[#044e3b] rounded-xl flex items-center justify-center"><div className="h-4 w-24 bg-white/90 rounded"></div></div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: ImageIcon,
      title: "Upload Your Products",
      desc: "Snap a few pictures of your items. Add your prices, available stock quantities, and product descriptions (like sizes or colors, and attributes). Our smart inventory handles the rest.",
      color: "text-orange-600",
      bg: "bg-orange-50",
      borderColor: "border-orange-100",
      mockup: (
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-4">
          <div className="flex gap-4 mb-4">
            <div className="w-24 h-24 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center"><ImageIcon className="w-6 h-6 text-gray-400" /></div>
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
              <div className="h-6 w-1/3 bg-emerald-100 rounded mt-2"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
            <span className="text-sm font-bold text-gray-600">Stock Available</span>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-400">-</div>
              <span className="font-bold text-gray-900">24</span>
              <div className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-900">+</div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: Palette,
      title: "Customize Your Storefront",
      desc: "Make it yours. Upload your brand logo, pick your theme colors, and set a custom banner. Starter and Growth plans can even connect a custom domain name.",
      color: "text-purple-600",
      bg: "bg-purple-50",
      borderColor: "border-purple-100",
      mockup: (
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
          <div className="h-24 bg-purple-100 relative">
            <div className="absolute -bottom-6 left-6 w-12 h-12 bg-white rounded-full border-4 border-white shadow-sm flex items-center justify-center"><Store className="w-5 h-5 text-purple-600" /></div>
          </div>
          <div className="p-6 pt-8">
            <div className="h-5 w-32 bg-gray-800 rounded mb-2"></div>
            <div className="h-3 w-48 bg-gray-400 rounded mb-6"></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-20 bg-gray-50 border border-gray-100 rounded-lg"></div>
              <div className="h-20 bg-gray-50 border border-gray-100 rounded-lg"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: TrendingUp,
      title: "Share & Get Paid Instantly",
      desc: "Paste your SabiSell link in your Instagram bio or send it to customers on WhatsApp. They shop, they pay securely, and the money drops straight into your bank account.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      borderColor: "border-emerald-100",
      mockup: (
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-1">Payment Successful!</h4>
          <p className="text-sm text-gray-500 mb-6">₦15,000 has been routed to your account.</p>
          <div className="w-full flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
            <Smartphone className="w-5 h-5 text-gray-400" />
            <div className="text-sm font-bold text-gray-600 truncate">storename.sabisell.com</div>
          </div>
        </div>
      )
    }
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
              <PlayCircle className="w-4 h-4 fill-emerald-600 text-white" /> Quick & Easy Setup
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-6">
              From sign up to first sale <br className="hidden md:block" />
              <span className="text-sabi-primary">in under 5 minutes.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              We stripped away the complex coding and confusing dashboards. SabiSell gives you exactly what you need to start making money today.
            </motion.p>
          </motion.div>
        </section>

        {/* 2. THE TIMELINE SECTION */}
        <section className="py-12 pb-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            
            {/* The Central Line (Visible on Desktop) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-100 -translate-x-1/2 rounded-full"></div>
            
            {/* The Left Line (Visible on Mobile) */}
            <div className="block lg:hidden absolute left-8 sm:left-10 top-0 bottom-0 w-1 bg-gray-100 rounded-full"></div>

            <div className="space-y-24 lg:space-y-32 relative z-10">
              {steps.map((step, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <div key={idx} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                    
                    {/* Text Content - Added 'amount: 0.4' so it triggers when 40% visible */}
                    <motion.div 
                      initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} 
                      variants={isEven ? slideRight : slideLeft} 
                      className={`w-full lg:w-1/2 flex ${isEven ? 'lg:justify-end lg:pr-20' : 'lg:justify-start lg:pl-20'} pl-16 sm:pl-20 lg:pl-${isEven ? '0' : '20'}`}
                    >
                      <div className="max-w-md relative">
                        {/* Mobile Number Indicator */}
                        <div className={`lg:hidden absolute -left-16 sm:-left-20 top-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-xl border-4 border-white shadow-md ${step.bg} ${step.color}`}>
                          {idx + 1}
                        </div>

                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${step.bg} ${step.borderColor}`}>
                          <step.icon className={`w-7 h-7 ${step.color}`} />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">{step.title}</h3>
                        <p className="text-lg text-gray-600 leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>

                    {/* Desktop Center Number Node - Added 'amount: 0.5' */}
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ delay: 0.2, type: "spring" }}
                      className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full items-center justify-center font-black text-2xl border-8 border-white shadow-lg z-20 ${step.bg} ${step.color}`}
                    >
                      {idx + 1}
                    </motion.div>

                    {/* Mockup UI - Added 'amount: 0.4' */}
                    <motion.div 
                      initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} 
                      variants={isEven ? slideLeft : slideRight} 
                      className={`w-full lg:w-1/2 flex justify-center ${isEven ? 'lg:justify-start lg:pl-20' : 'lg:justify-end lg:pr-20'} pl-16 sm:pl-20 lg:pl-${isEven ? '20' : '0'}`}
                    >
                      <div className="relative">
                        <div className={`absolute inset-0 blur-3xl opacity-20 rounded-full scale-150 ${step.bg}`}></div>
                        <div className="relative z-10 hover:-translate-y-2 transition-transform duration-500">
                          {step.mockup}
                        </div>
                      </div>
                    </motion.div>

                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. QUICK STATS / TRUST SECTION - Added 'amount: 0.3' */}
        <section className="py-16 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
            >
              <div>
                <div className="text-4xl font-black text-sabi-primary mb-2">1.5%</div>
                <p className="text-gray-600 font-medium">Low platform fees, capped at ₦1500 (Starter)</p>
              </div>
              <div>
                <div className="text-4xl font-black text-sabi-primary mb-2">₦0</div>
                <p className="text-gray-600 font-medium">Setup costs to get started</p>
              </div>
              <div>
                <div className="text-4xl font-black text-sabi-primary mb-2">24hr</div>
                <p className="text-gray-600 font-medium">Automated bank settlements</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. BOTTOM CTA BANNER - Added 'amount: 0.4' */}
        <motion.section 
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-20"
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

export default HowItWorks;