import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white mb-6">
              <Logo className="w-8 h-8" showText={false} />
              <span className="text-2xl font-bold tracking-tight">SabiSell</span>
            </div>
            <p className="text-sm text-gray-400 font-medium max-w-xs leading-relaxed">
              The easiest way to create your online store and start selling in minutes.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-medium">
              <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition">How It Works</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition">Pricing</Link></li>
              <li><Link to="/success-stories" className="hover:text-white transition">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-medium">
              <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Stay Updated</h4>
            <p className="text-sm text-gray-400 font-medium mb-4">Get tips and updates to grow your business.</p>
            <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent w-full px-3 text-white focus:outline-none text-sm placeholder:text-gray-500" 
              />
              <button className="bg-sabi-primary text-white px-4 py-2 rounded-md text-sm font-bold">Subscribe</button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500 font-medium">
            © {new Date().getFullYear()} SabiSell. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" target="blank" className="text-gray-500 hover:text-white transition-colors">Instagram</a>
            <a href="#" target="blank" className="text-gray-500 hover:text-white transition-colors">Facebook</a>
            <a href="#" target="blank" className="text-gray-500 hover:text-white transition-colors">X</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;