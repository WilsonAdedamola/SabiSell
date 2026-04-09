import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Logo from '../components/shared/Logo';
import { Menu } from 'lucide-react';
import Button from '../components/ui/Button';

const MarketingLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Features", path: "/#features" },
    { name: "How It Works", path: "/#how-it-works" },
    { name: "Pricing", path: "/pricing" },
    { name: "Success Stories", path: "/#success-stories" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <div className="min-h-screen bg-sabi-surface text-sabi-textPrimary font-sans flex flex-col">
      {/* Sticky Header */}
      <header className="bg-white border-b border-sabi-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo className="w-8 h-8" showText={true} />
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-sabi-textSecondary hover:text-sabi-primary font-medium transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/auth/login" className="px-5 py-2.5 border border-gray-300 text-sabi-textPrimary rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Log in
            </Link>
            <Link to="/auth/register" className="bg-sabi-primary hover:bg-sabi-primaryDark text-white px-5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-sm">
              Start Free Store <span>→</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-4 shadow-lg absolute w-full">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="block text-sabi-textSecondary font-medium text-lg py-2" onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Link to="/auth/login" className="w-full text-center py-3 border border-gray-300 rounded-xl font-semibold">Log in</Link>
              <Link to="/auth/register" className="w-full text-center py-3 bg-sabi-primary text-white rounded-xl font-semibold">Start Free Store →</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content (Landing, Pricing, FAQ injected here) */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Dark Footer (From Mockups) */}
      <footer className="bg-[#0f172a] text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                 <Logo className="w-8 h-8 text-white" showText={false} />
                 <span className="text-2xl font-bold text-white">SabiSell</span>
              </div>
              <p className="text-gray-400 max-w-sm">
                The easiest way to create your online store and start selling in minutes.
              </p>
              <div className="text-sm text-gray-500 pt-6">
                © {new Date().getFullYear()} SabiSell. All rights reserved.
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/#features" className="hover:text-white transition">Features</Link></li>
                <li><Link to="/#how-it-works" className="hover:text-white transition">How It Works</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link to="/#success-stories" className="hover:text-white transition">Success Stories</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              </ul>
            </div>

            {/* Newsletter & Socials */}
            <div>
              <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
              <p className="text-sm text-gray-400 mb-4">Get tips and updates to grow your business.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg w-full focus:outline-none focus:border-sabi-primary text-sm"
                />
                <button className="bg-sabi-primary hover:bg-sabi-primaryDark px-4 py-2 rounded-lg text-white font-medium text-sm transition">
                  Subscribe
                </button>
              </div>
              <div className="flex space-x-4 mt-8">
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white">Youtube</a>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketingLayout;