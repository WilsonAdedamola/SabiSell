import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Eye, EyeOff, ChevronRight, ChevronLeft, 
  Lock, Mail, ArrowRight, ShieldCheck, 
  Zap, ShoppingCart, MessageSquare, 
  Headphones, Clock, MessageCircle, AlertCircle 
} from "lucide-react";
import Logo from "../../components/shared/Logo";
import loginImg from "../../assets/Login-image.jpg";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- Destructured login function

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Delegate to AuthContext (Handles API call and sets state automatically via cookie)
      const response = await login(formData);

      // 2. CHECK THE FLAG AND REDIRECT
      if (response.isOnboarded) {
        navigate('/dashboard');
      } else {
        navigate('/dashboard/onboarding'); // Force vendor to finish creating a store
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sabi-surface flex flex-col font-sans">
      
      {/* MINIMAL AUTH HEADER */}
      <header className="bg-white px-4 sm:px-8 py-4 flex justify-between items-center border-b border-gray-100 z-10">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="w-7 h-7" showText={true} />
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium">
          <span className="hidden sm:inline text-gray-500">New to SabiSell?</span>
          <Link to="/register" className="px-4 py-2 text-sm md:text-base border border-gray-200 rounded-lg text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-1 font-bold shadow-sm">
            Create an Account <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="grow flex flex-col lg:flex-row w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 gap-8 items-stretch">
        
        {/* LEFT COLUMN: Marketing (Hidden on smaller screens) */}
        <div className="hidden lg:flex lg:w-[45%] bg-[#044e3b] rounded-4xl p-10 flex-col relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400 opacity-10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4"></div>
           
           <div className="relative z-10 flex flex-col h-full">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/50 text-emerald-300 text-xs font-bold border border-emerald-700 mb-8 backdrop-blur-sm w-fit">
                <Lock className="w-3.5 h-3.5" /> Vendor Login
              </div>

              <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-[1.15] tracking-tight mb-4">
                Welcome Back <br/> to <span className="text-emerald-300">SabiSell!</span>
              </h1>
              
              <p className="text-emerald-100/90 text-base leading-relaxed mb-8 max-w-sm">
                Sign in to your vendor account to manage your store, products, orders and grow your business.
              </p>

              {/* Dashboard Abstract Graphic Placeholder */}
              <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 mb-10 flex items-center justify-center backdrop-blur-sm">
                <img src={loginImg} alt="Login" className="max-w-full rounded-2xl"/>
              </div>

              {/* Feature List */}
              <div className="space-y-6 mt-auto">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                       <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    </div>
                    <h3 className="font-semibold text-emerald-50 text-base">Manage your store with ease</h3>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                       <ShoppingCart className="w-5 h-5 text-emerald-300" />
                    </div>
                    <h3 className="font-semibold text-emerald-50 text-base">Track orders & sales in real-time</h3>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                       <MessageSquare className="w-5 h-5 text-emerald-300 fill-emerald-300/20" />
                    </div>
                    <h3 className="font-semibold text-emerald-50 text-base">Chat with customers instantly <span className="font-extralight">(coming soon)</span></h3>
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: The Login Form */}
        <div className="w-full lg:w-[55%] flex flex-col items-center justify-center">
          <div className="w-full max-w-xl bg-white rounded-4xl p-6 sm:p-12 border border-gray-100 shadow-xl relative overflow-hidden">
             
             <div className="mb-10 text-center sm:text-left">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Login to Your Vendor Account</h2>
                <p className="text-gray-500 text-base">Access your dashboard and continue selling</p>
             </div>

             {/* Error Message Display */}
             {error && (
               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                 <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                 <p className="text-sm font-medium text-red-800">{error}</p>
               </div>
             )}

             <form className="space-y-6" onSubmit={handleLogin}>
               
               {/* Email Field */}
               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <Mail className="h-5 w-5 text-gray-400" />
                   </div>
                   <input 
                     type="email" 
                     required
                     name="email" 
                     value={formData.email} 
                     onChange={handleChange} 
                     placeholder="Enter your email address" 
                     className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900" 
                   />
                 </div>
               </div>

               {/* Password Field */}
               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <Lock className="h-5 w-5 text-gray-400" />
                   </div>
                   <input 
                     type={showPassword ? "text" : "password"} 
                     required
                     name="password" 
                     value={formData.password} 
                     onChange={handleChange} 
                     placeholder="Enter your password" 
                     className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900" 
                   />
                   <button 
                     type="button" 
                     onClick={() => setShowPassword(!showPassword)} 
                     className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                   >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                   </button>
                 </div>
                 
                 {/* Forgot Password Link */}
                 <div className="flex justify-end mt-2">
                    <Link to="/forgot-password" className="text-sm font-bold text-sabi-primary hover:text-sabi-primaryDark transition-colors">
                       Forgot Password?
                    </Link>
                 </div>
               </div>

               {/* Submit Button */}
               <button 
                 type="submit" 
                 disabled={isLoading}
                 className="w-full flex mt-2 bg-sabi-primary hover:bg-sabi-primaryDark text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20 items-center justify-center gap-2 text-base disabled:opacity-70 disabled:cursor-not-allowed"
               >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <ArrowRight className="w-5 h-5" /> Log In to Dashboard
                    </>
                  )}
               </button>

               {/* Security Badge */}
               <div className="bg-[#F0FDF4] border border-emerald-100 rounded-xl p-4 flex items-center gap-4 mt-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                     <ShieldCheck className="w-5 h-5 text-sabi-primary" />
                  </div>
                  <div>
                     <h4 className="font-bold text-gray-900 text-sm">Secure & Protected</h4>
                     <p className="text-gray-600 text-xs mt-0.5 font-medium">Your data is encrypted and secure with SabiSell.</p>
                  </div>
               </div>

             </form>

             <p className="text-center text-xs font-medium text-gray-500 mt-8">
               By logging in, you agree to our <Link to="/terms" className="text-sabi-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-sabi-primary hover:underline">Privacy Policy</Link>
             </p>
          </div>
        </div>

      </main>

      {/* TRUST BADGES BANNER */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:divide-y-0 md:divide-x divide-emerald-200">
           <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6 first:pt-0 first:pl-0">
              <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
                 <Headphones className="w-5 h-5 text-sabi-primary" />
              </div>
              <Link to="/contact" className="cur">
                 <h4 className="font-bold text-gray-900 text-sm">Need Help?</h4>
                 <p className="text-gray-500 text-xs mt-0.5">Our support team is ready to assist you</p>
              </Link>
           </div>
           <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
              <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
                 <Clock className="w-5 h-5 text-sabi-primary" />
              </div>
              <div>
                 <h4 className="font-bold text-gray-900 text-sm">Support Hours</h4>
                 <p className="text-gray-500 text-xs mt-0.5">Mon - Sat, 8AM - 8PM WAT</p>
              </div>
           </div>
           <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
              <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
                 <MessageCircle className="w-5 h-5 text-sabi-primary fill-sabi-primary/20" />
              </div>
              <div>
                 <h4 className="font-bold text-gray-900 text-sm">Chat on WhatsApp</h4>
                 <a href="https://wa.me/09061745089" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-xs mt-0.5">+234 901 234 5678</a>
              </div>
           </div>
        </div>
      </div>

      {/* MINIMAL FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
           <div className="flex items-center gap-2">
              <Logo className="w-5 h-5 text-gray-400" showText={false} />
              <span className="font-bold text-gray-800 text-sm">SabiSell</span>
           </div>
           <p className="text-xs font-medium text-gray-500">
              © {new Date().getFullYear()} SabiSell. All rights reserved.
           </p>
           <Link to="/" className="text-sm font-bold text-gray-600 hover:text-sabi-primary transition-colors flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" /> Back to Home
           </Link>
        </div>
      </footer>

    </div>
  );
};

export default Login;