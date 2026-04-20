import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Eye, EyeOff, ChevronRight, ChevronLeft, 
  Lock, Mail, ArrowRight, ShieldCheck, 
  Zap, ShoppingCart, MessageSquare, 
  Headphones, Clock, MessageCircle, AlertCircle 
} from "lucide-react";
import Logo from "../../components/shared/Logo";
import loginImg from "../../assets/Login-image.jpg"
import api from '../../utils/api';

const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear any previous errors when the user starts typing again
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Send login credentials
      const response = await api.post('/auth/login', formData);

      // 2. Save the token
      localStorage.setItem('sabisell_token', response.data.token);
      localStorage.setItem('sabisell_vendor', JSON.stringify(response.data.vendor));
      
        navigate('/dashboard');

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
                    <h3 className="font-semibold text-emerald-50 text-base">Chat with customers instantly</h3>
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
                    "Logging in..."
                  ) : (
                    <>
                      <ArrowRight className="w-5 h-5" /> Log In to Dashboard
                    </>
                  )}
               </button>

               {/* Divider */}
               <div className="relative flex items-center py-2">
                 <div className="grow border-t border-gray-200"></div>
                 <span className="shrink-0 mx-4 text-gray-400 text-sm font-medium">or continue with</span>
                 <div className="grow border-t border-gray-200"></div>
               </div>

               {/* Google Login */}
               <button type="button" className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-sm">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Continue with Google
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
               By logging in, you agree to our <a href="#" className="text-sabi-primary hover:underline">Terms of Service</a> and <a href="#" className="text-sabi-primary hover:underline">Privacy Policy</a>
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
              <div>
                 <h4 className="font-bold text-gray-900 text-sm">Need Help?</h4>
                 <p className="text-gray-500 text-xs mt-0.5">Our support team is ready to assist you</p>
              </div>
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
                 <p className="text-gray-500 text-xs mt-0.5">+234 901 234 5678</p>
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