import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Notice the paths include '/' so hash links work from any page
  const navLinks = [
    { name: "Features", path: "/features" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Pricing", path: "/pricing" },
    { name: "Success Stories", path: "/success-stories" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        <Link to="/" className="shrink-0 flex items-center gap-2">
          <Logo className="w-8 h-8" showText={false} />
          <span className="text-2xl font-bold text-gray-900 tracking-tight">
            SabiSell
          </span>
        </Link>

        <nav className="hidden lg:flex space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <a
                key={link.name}
                href={link.path}
                className={`font-semibold text-sm transition-colors ${
                  isActive
                    ? "text-sabi-primary border-b-2 border-sabi-primary pb-1"
                    : "text-gray-900 hover:text-sabi-primary"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <Link
            to="/login"
            className="px-6 py-2.5 border border-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="bg-sabi-primary hover:bg-sabi-primaryDark text-white px-6 py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-2 text-sm shadow-sm"
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
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <a
                key={link.name}
                href={link.path}
                className={`block font-semibold text-base py-2 ${
                  isActive ? "text-sabi-primary" : "text-gray-800"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            );
          })}
          <div className="pt-4 flex flex-col gap-3">
            <Link
              to="/login"
              className="w-full text-center py-3 border border-gray-300 rounded-lg font-semibold text-gray-800"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="w-full text-center py-3 bg-sabi-primary text-white rounded-lg font-semibold"
            >
              Start Free Store →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
