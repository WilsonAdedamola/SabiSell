import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Quote,
  TrendingUp,
  ArrowRight,
  Rocket,
  Check,
  PlayCircle,
  ShoppingBag,
  Heart,
  Zap
} from "lucide-react";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";

const SuccessStories = () => {
  // --- Framer Motion Variants ---
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" } },
  };

  // --- Merchant Stories Data ---
  const stories = [
    {
      name: "Amina Yusuf",
      brand: "Lagos Luxe Fashion",
      plan: "Growth Plan",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amina",
      icon: ShoppingBag,
      color: "text-pink-600",
      bg: "bg-pink-50",
      quote: "Upgrading to the Growth plan was a no-brainer. The 0% platform fee saves us thousands of Naira every week, and the automated Paystack settlements mean I can pay my suppliers on time without ever logging into a bank app.",
      stats: { label: "Revenue Increase", value: "+140%" }
    },
    {
      name: "Chuka Obi",
      brand: "TechGadgets NG",
      plan: "Starter Plan",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chuka",
      icon: Zap,
      color: "text-blue-600",
      bg: "bg-blue-50",
      quote: "Before SabiSell, I was losing track of inventory through DM orders and accidentally overselling out-of-stock phones. The smart inventory system fixed my business overnight. The 1.5% fee is incredibly fair for the value.",
      stats: { label: "Hours Saved Weekly", value: "15 hrs" }
    },
    {
      name: "Sarah Adebayo",
      brand: "Glow Organics",
      plan: "Free Plan",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      icon: Heart,
      color: "text-orange-600",
      bg: "bg-orange-50",
      quote: "I literally started my skincare brand with zero budget for a website. Setting up my SabiSell store took 5 minutes, and the WhatsApp chat integration lets me consult with clients right before they buy. It's magic.",
      stats: { label: "First Sale In", value: "2 Days" }
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
              <Star className="w-4 h-4 fill-emerald-600" /> Real Merchants, Real Results
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-6">
              Don't just take our <br className="hidden md:block" />
              <span className="text-sabi-primary">word for it.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Meet the ambitious African entrepreneurs who are scaling their businesses, taking back their time, and dominating their markets using SabiSell.
            </motion.p>
          </motion.div>
        </section>

        {/* 2. FEATURED CASE STUDY (Video/Highlight) */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}
              className="bg-[#044e3b] rounded-[3rem] p-4 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-400 opacity-10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3"></div>
              
              <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 relative z-10">
                {/* Simulated Video Player */}
                <div className="w-full lg:w-1/2 aspect-video bg-emerald-900/50 rounded-3xl border border-emerald-800/50 relative flex items-center justify-center overflow-hidden group cursor-pointer shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop" 
                    alt="Featured Merchant" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:bg-sabi-primary group-hover:border-sabi-primary transition-all duration-300 z-10 shadow-xl">
                    <PlayCircle className="w-10 h-10 text-white fill-white/20" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
                     <span className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10">3:42</span>
                  </div>
                </div>

                {/* Featured Quote */}
                <div className="w-full lg:w-1/2 text-white">
                  <Quote className="w-12 h-12 text-emerald-400/30 mb-6 rotate-180" />
                  <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-6">
                    "SabiSell took us from answering 200 DMs a day to running a fully automated storefront. Our revenue doubled in three months because checkout is completely frictionless."
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-800 rounded-full border-2 border-emerald-400 overflow-hidden">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=David" alt="David" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">David Okafor</div>
                      <div className="text-emerald-400 font-medium text-sm">Founder, SoleSneaks</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. WALL OF LOVE (Grid) */}
        <section className="py-24 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp} className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Built for every kind of hustle.</h2>
              <p className="text-lg text-gray-600">Whether you are selling digital products, physical goods, or booking services, our platform adapts to your business model.</p>
            </motion.div>

            {/* amount: 0.2 threshold so the tall grid triggers nicely on mobile */}
            <motion.div 
              variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {stories.map((story, idx) => (
                <motion.div key={idx} variants={scaleUp} className="bg-white rounded-[2rem] p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-shadow flex flex-col">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 border-2 border-white shadow-sm overflow-hidden">
                        <img src={story.image} alt={story.name} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{story.name}</h4>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{story.brand}</p>
                      </div>
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${story.bg}`}>
                      <story.icon className={`w-5 h-5 ${story.color}`} />
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-8 grow">
                    "{story.quote}"
                  </p>

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-gray-400 mb-1">{story.stats.label}</div>
                      <div className={`text-xl font-black ${story.color}`}>{story.stats.value}</div>
                    </div>
                    <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                      {story.plan}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. PLATFORM METRICS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}
              className="bg-emerald-50 rounded-[3rem] p-12 border border-emerald-100 grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
            >
              <div>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-sabi-primary">
                     <TrendingUp className="w-7 h-7" />
                  </div>
                </div>
                <div className="text-4xl font-black text-gray-900 mb-2">₦500M+</div>
                <p className="text-gray-600 font-medium">Processed for our merchants</p>
              </div>
              
              <div className="md:border-x md:border-emerald-200/50 px-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-sabi-primary">
                     <ShoppingBag className="w-7 h-7" />
                  </div>
                </div>
                <div className="text-4xl font-black text-gray-900 mb-2">50,000+</div>
                <p className="text-gray-600 font-medium">Orders successfully delivered</p>
              </div>

              <div>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-sabi-primary">
                     <Star className="w-7 h-7" />
                  </div>
                </div>
                <div className="text-4xl font-black text-gray-900 mb-2">4.9/5</div>
                <p className="text-gray-600 font-medium">Average merchant rating</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 5. BOTTOM CTA BANNER */}
        <motion.section 
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-20"
        >
          <div className="bg-[#044e3b] rounded-4xl px-6 py-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>

            <div className="flex items-center gap-6 z-10 w-full md:w-auto">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg sm:flex">
                <Rocket className="w-8 h-8 text-sabi-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight">
                  Be our next success story.
                </h2>
                <p className="text-emerald-100/90 text-sm md:text-base">
                  Stop struggling with DMs. Get your automated storefront today.
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

export default SuccessStories;