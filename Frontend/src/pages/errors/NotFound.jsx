import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  AlertTriangle,
  Home,
  LayoutDashboard,
  Headphones,
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RefreshCcw,
} from "lucide-react";
import Logo from "../../components/shared/Logo";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-sabi-surface flex flex-col font-sans relative overflow-hidden selection:bg-sabi-primary selection:text-white">
      {/* Background Abstract Elements (Matching Auth Pages) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-400 opacity-10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-120 h-120 bg-sabi-primary opacity-5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Minimal Header */}
      <header className="w-full p-6 relative z-10 flex justify-center sm:justify-start">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Logo className="w-8 h-8" showText={true} />
        </Link>
      </header>

      {/* Main Content */}
      <main className="grow flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-6 sm:p-10 text-center animate-in zoom-in-95 duration-300">
          {/* Illustration */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-emerald-50 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-emerald-100 rounded-full flex items-center justify-center border border-emerald-200">
              <ShoppingBag className="w-12 h-12 text-sabi-primary opacity-80" />
            </div>
            {/* Warning Badge overlapping the bag */}
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-lg border border-gray-100">
              <div className="bg-orange-50 rounded-full p-2 border border-orange-100">
                <AlertTriangle className="w-8 h-8 text-orange-500 fill-orange-100" />
              </div>
            </div>
          </div>

          {/* Error Text */}
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Oops! Page not found
          </h1>
          <p className="text-gray-500 text-sm sm:text-base font-medium mb-8 leading-relaxed px-4">
            The page you are looking for might have been moved, deleted, or
            doesn't exist.
          </p>

          {/* Helpful Links Box */}
          <div className="bg-gray-50 rounded-2xl p-2 mb-8 text-left border border-gray-100">
            <div className="px-4 py-3 text-xs font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              Helpful Links
            </div>

            <div className="space-y-1">
              <Link
                to="/"
                className="flex items-center justify-between p-3.5 hover:bg-white rounded-xl transition-all group border border-transparent hover:border-gray-100 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-sabi-primary transition-colors">
                    <Home className="w-4 h-4 text-sabi-primary group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-bold text-gray-700 text-sm">
                    Visit Homepage
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-sabi-primary transition-colors" />
              </Link>

              <Link
                to="/dashboard"
                className="flex items-center justify-between p-3.5 hover:bg-white rounded-xl transition-all group border border-transparent hover:border-gray-100 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <LayoutDashboard className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-bold text-gray-700 text-sm">
                    Go to Dashboard
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </Link>

              <Link
                to="/contact"
                className="flex items-center justify-between p-3.5 hover:bg-white rounded-xl transition-all group border border-transparent hover:border-gray-100 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                    <Headphones className="w-4 h-4 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-bold text-gray-700 text-sm">
                    Contact Support
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-1/3 py-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <Link
              to="/"
              className="w-full sm:w-2/3 py-3.5 bg-sabi-primary hover:bg-sabi-primaryDark text-white rounded-xl font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>

      {/* Minimal Footer with Trust Signals */}
      <footer className="w-full pb-8 px-4 relative z-10 text-center">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-bold text-gray-500 mb-4">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Payments
          </span>
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-blue-500" /> Fast Delivery
          </span>
          <span className="flex items-center gap-1.5">
            <RefreshCcw className="w-4 h-4 text-purple-500" /> Easy Returns
          </span>
        </div>
        <div className="inline-flex items-center gap-1 text-xs font-medium text-gray-400">
          Powered by{" "}
          <Logo
            className="w-3 h-3 grayscale opacity-50 ml-1"
            showText={false}
          />{" "}
          <span className="font-bold text-gray-500">SabiSell</span>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
