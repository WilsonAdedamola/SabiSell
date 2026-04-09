import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  PlayCircle,
  Star,
  Store,
  ShoppingBag,
  MessageCircle,
  CreditCard,
  Rocket,
  Menu,
  X,
  Check,
} from "lucide-react";
import Logo from "../../components/shared/Logo";
import heroImg from "../../assets/HeroImg.svg";

const Landing = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Features", path: "#features" },
    { name: "How It Works", path: "#how-it-works" },
    { name: "Pricing", path: "/pricing" },
    { name: "Success Stories", path: "#success-stories" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <div className="min-h-screen bg-sabi-surface flex flex-col font-sans">
      {/* --- HEADER --- */}
      <header className="bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <Link to="/" className="shrink-0 flex items-center gap-2">
            <Logo className="w-8 h-8" showText={false} />
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              SabiSell
            </span>
          </Link>

          <nav className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-gray-900 hover:text-sabi-primary font-semibold text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/auth/login"
              className="px-6 py-2.5 border border-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm"
            >
              Log in
            </Link>
            <Link
              to="/auth/register"
              className="bg-sabi-primary hover:bg-sabi-primaryLight text-white px-6 py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-2 text-sm shadow-sm"
            >
              Start Free Store <span>→</span>
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-4 pb-6 space-y-4 shadow-xl absolute w-full z-40">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="block text-gray-800 font-semibold text-base py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Link
                to="/auth/login"
                className="w-full text-center py-3 border border-gray-300 rounded-lg font-semibold text-gray-800"
              >
                Log in
              </Link>
              <Link
                to="/auth/register"
                className="w-full text-center py-3 bg-sabi-primary text-white rounded-lg font-semibold"
              >
                Start Free Store →
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="grow flex flex-col bg-white">
        {/* 1. HERO SECTION */}
        <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-emerald-50/40 to-white -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
              {/* Hero Text */}
              <div className="space-y-8 text-center xl:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-sabi-primary text-sm font-semibold mx-auto xl:mx-0">
                  <span className="text-yellow-500 text-base">⚡</span> Your Own
                  Online Store, Ready in Minutes
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                  Sell Online Easily. <br className="hidden sm:block" />
                  Grow Your Brand with <br className="hidden sm:block" />
                  <span className="text-sabi-primary">SabiSell.</span>
                </h1>

                <p className="text-lg text-gray-600 max-w-xl mx-auto xl:mx-0 leading-relaxed">
                  Create a professional online store, add your products, chat
                  with customers and start getting paid — all from your phone or
                  computer.
                </p>

                <div className="flex flex-wrap justify-center xl:justify-start gap-4 text-sm font-semibold text-gray-800">
                  <span className="flex items-center gap-1.5 bg-emerald-50/80 px-4 py-2 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-sabi-primary fill-emerald-100" />{" "}
                    No Coding Needed
                  </span>
                  <span className="flex items-center gap-1.5 bg-emerald-50/80 px-4 py-2 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-sabi-primary fill-emerald-100" />{" "}
                    Works Offline (PWA)
                  </span>
                  <span className="flex items-center gap-1.5 bg-emerald-50/80 px-4 py-2 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-sabi-primary fill-emerald-100" />{" "}
                    Secure Payments
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row justify-center xl:justify-start gap-4 pt-2">
                  <Link
                    to="/auth/register"
                    className="bg-sabi-primary hover:bg-sabi-primaryDark text-white px-8 py-3.5 rounded-lg font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                  >
                    Start Your Free Store <span>→</span>
                  </Link>
                  <button className="px-8 py-3.5 rounded-lg font-bold text-base text-gray-800 bg-white border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <PlayCircle className="w-5 h-5 text-sabi-primary" /> See How
                    It Works
                  </button>
                </div>
              </div>

              {/* Hero Image Mockup (Stylized representation) */}
              <div className="relative w-full h-100 sm:h-125 lg:h-150 bg-transparent flex items-center justify-center">
                {/* In production, replace this div with: <img src={heroDevicesMockup} alt="SabiSell on Laptop and Mobile" className="object-contain w-full h-full" /> */}
                {/* <div className="w-full max-w-2xl bg-gray-100 rounded-2xl border border-gray-200 shadow-2xl p-8 flex flex-col items-center justify-center aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="z-10 text-center">
                    <div className="text-6xl mb-4">💻📱</div>
                    <p className="text-gray-500 font-medium">
                      Insert Hero Devices Image Here
                    </p>
                  </div>
                </div> */}
                <img src={heroImg} alt="SabiSell Hero" />
              </div>
            </div>
          </div>
        </section>

        {/* 2. SOCIAL PROOF BANNER */}
        <section className="py-8 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-emerald-50 border border-emerald-100 rounded-[30px] sm:rounded-full py-2 px-6 sm:py-2 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-200 border-2 border-white shadow-sm overflow-hidden">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Felix`}
                      alt="user"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-pink-200 border-2 border-white shadow-sm overflow-hidden">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka`}
                      alt="user"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-200 border-2 border-white shadow-sm overflow-hidden">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Mimi`}
                      alt="user"
                    />
                  </div>
                </div>
                <p className="font-semibold text-gray-800 text-sm text-center sm:text-left md:text-base">
                  Join <strong className="text-gray-900">500+</strong>{" "}
                  entrepreneurs already selling with SabiSell
                </p>
              </div>
              <div className="hidden md:block w-px h-8 bg-emerald-200"></div>
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
                <span className="font-bold text-gray-900">Excellent</span>
                <div className="flex gap-1 text-emerald-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill="currentColor" className="w-5 h-5" />
                  ))}
                </div>
                <span className="font-semibold text-gray-700">
                  4.9/5{" "}
                  <span className="font-normal text-gray-500">
                    from 200+ vendors
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURES GRID */}
        <section id="features" className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
              Everything You Need to Sell Online
            </h2>
            <p className="text-gray-600 mb-16 text-lg">
              Powerful tools designed for African entrepreneurs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {[
                {
                  icon: Store,
                  title: "Easy Store Setup",
                  desc: "Launch your store in minutes with our simple step-by-step onboarding.",
                },
                {
                  icon: ShoppingBag,
                  title: "Manage Products",
                  desc: "Add, edit and organize products with photos, prices, sizes and availability.",
                },
                {
                  icon: MessageCircle,
                  title: "Chat with Customers",
                  desc: "Chat instantly with buyers through built-in messaging or WhatsApp integration.",
                },
                {
                  icon: CreditCard,
                  title: "Get Paid Securely",
                  desc: "Receive payments safely with multiple payment options that customers trust.",
                },
              ].map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow"
                >
                  <div className="w-14 h-14 bg-emerald-50 text-sabi-primary rounded-xl flex items-center justify-center mb-6">
                    <feat.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS & PRICING SPLIT */}
        <section
          id="how-it-works"
          className="py-20 bg-gray-50/50 border-t border-gray-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
              {/* Left Column: How It Works */}
              <div className="lg:col-span-4 lg:sticky lg:top-24">
                <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
                  How It Works
                </h2>
                <p className="text-gray-600 mb-10 text-lg">
                  Start selling in 3 simple steps
                </p>

                <div className="space-y-10 relative">
                  {/* Connecting Line */}
                  <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gray-200 z-0"></div>

                  {[
                    {
                      num: "1",
                      title: "Create Your Store",
                      desc: "Sign up and set up your store details in minutes.",
                    },
                    {
                      num: "2",
                      title: "Add Your Products",
                      desc: "Upload photos, set prices and publish instantly.",
                    },
                    {
                      num: "3",
                      title: "Start Receiving Orders",
                      desc: "Customers browse, chat with you and place orders.",
                    },
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-6 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-sabi-primary text-white font-bold text-xl flex items-center justify-center flex-shrink-0 shadow-sm border-4 border-white">
                        {step.num}
                      </div>
                      <div className="pt-2">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/#how-it-works"
                  className="inline-block mt-10 text-sabi-primary font-bold hover:text-sabi-primaryDark transition-colors"
                >
                  Learn more about how it works →
                </Link>
              </div>

              {/* Right Column: Pricing Cards */}
              <div className="lg:col-span-8 flex flex-col items-center lg:items-start lg:pl-10">
                <div className="w-full flex flex-col items-center text-center mb-10">
                  <span className="bg-emerald-100 text-sabi-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                    Simple & Transparent Pricing
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-6">
                    Choose the Plan That Fits Your Business
                  </h3>

                  {/* Monthly / Yearly Toggle */}
                  <div className="bg-white border border-gray-200 rounded-full p-1 flex inline-flex items-center shadow-sm">
                    <button className="bg-sabi-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-sm">
                      Monthly
                    </button>
                    <button className="text-gray-600 px-6 py-2 rounded-full text-sm font-bold hover:text-gray-900">
                      Yearly
                    </button>
                    <span className="text-emerald-600 text-xs font-bold px-3">
                      Save 20%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  {/* Free Plan */}
                  <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col">
                    <div className="text-center mb-6">
                      <h4 className="text-gray-900 font-extrabold text-lg uppercase tracking-wide">
                        Free
                      </h4>
                      <p className="text-gray-500 text-sm mt-1">
                        Perfect to get started
                      </p>
                      <div className="my-4">
                        <span className="text-4xl font-extrabold text-gray-900">
                          ₦0
                        </span>{" "}
                        <span className="text-gray-500">/month</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {[
                        "Up to 10 products",
                        "Free SabiSell subdomain",
                        "Accept orders & payments",
                        "WhatsApp chat integration",
                        "SabiSell branding on store",
                      ].map((ft, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{ft}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full py-3 rounded-xl border border-gray-300 text-gray-800 font-bold hover:bg-gray-50 transition-colors">
                      Start Free
                    </button>
                  </div>

                  {/* Starter Plan (Most Popular) */}
                  <div className="bg-white rounded-3xl p-8 border-2 border-sabi-primary shadow-xl flex flex-col relative transform md:-translate-y-4">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sabi-primary text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" /> MOST POPULAR
                    </div>
                    <div className="text-center mb-6 mt-2">
                      <h4 className="text-sabi-primary font-extrabold text-lg uppercase tracking-wide">
                        Starter
                      </h4>
                      <p className="text-gray-500 text-sm mt-1">
                        Everything you need to grow
                      </p>
                      <div className="my-4">
                        <span className="text-4xl font-extrabold text-gray-900">
                          ₦5,000
                        </span>{" "}
                        <span className="text-gray-500">/month</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {[
                        "Up to 100 products",
                        "Custom domain (yourstore.com)",
                        "Remove SabiSell branding",
                        "Basic analytics & insights",
                        "In-app chat + WhatsApp",
                        "Multiple payment methods",
                      ].map((ft, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-700 font-medium"
                        >
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{ft}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full py-3 rounded-xl bg-sabi-primary text-white font-bold hover:bg-sabi-primaryDark transition-colors">
                      Start 7-Day Free Trial
                    </button>
                  </div>

                  {/* Growth Plan */}
                  <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-sm flex flex-col">
                    <div className="text-center mb-6">
                      <h4 className="text-purple-700 font-extrabold text-lg uppercase tracking-wide">
                        Growth
                      </h4>
                      <p className="text-gray-500 text-sm mt-1">
                        Powerful tools for scaling
                      </p>
                      <div className="my-4">
                        <span className="text-4xl font-extrabold text-gray-900">
                          ₦12,000
                        </span>{" "}
                        <span className="text-gray-500">/month</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {[
                        "Unlimited products",
                        "Staff accounts (up to 5)",
                        "Advanced analytics dashboard",
                        "Automated emails & receipts",
                        "Discount codes & promotions",
                        "Priority support",
                      ].map((ft, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                          <span>{ft}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full py-3 rounded-xl bg-purple-700 text-white font-bold hover:bg-purple-800 transition-colors">
                      Upgrade to Growth
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. BOTTOM CTA BANNER */}
        <section className="bg-white pb-0 pt-16">
          <div className="bg-[#044e3b] px-4 py-16 lg:py-20">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Rocket className="w-8 h-8 text-sabi-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight">
                    Ready to Grow Your Business?
                  </h2>
                  <p className="text-emerald-100/90 text-lg">
                    Join SabiSell today and start selling online in minutes.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-xl shadow-lg max-w-md w-full">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-transparent text-gray-900 focus:outline-none placeholder:text-gray-400 font-medium"
                />
                <Link
                  to="/auth/register"
                  className="bg-sabi-primary hover:bg-sabi-primaryDark text-white px-6 py-3 rounded-lg font-bold transition-colors whitespace-nowrap flex items-center justify-center gap-2"
                >
                  Start Free Store <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- INLINE FOOTER --- */}
      <footer className="bg-[#0f172a] py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-white">
            <Logo className="w-6 h-6" showText={false} />
            <span className="text-xl font-bold tracking-tight">SabiSell</span>
          </div>

          <div className="text-sm text-gray-400 font-medium">
            © 2026 SabiSell. All rights reserved.
          </div>

          <div className="flex items-center gap-8">
            <div className="flex space-x-5">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Youtube
              </a>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-sm text-gray-400 font-medium">
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link
                to="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
