import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight, Lock, Mail, Send, 
  Lightbulb, Info, Headphones, MessageCircle, 
  Home, ShieldCheck 
} from "lucide-react";
import Logo from "../../components/shared/Logo";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log("Password reset requested for:", email);
  };

  return (
    <div className="min-h-screen bg-sabi-surface flex flex-col font-sans">
      
      {/* MINIMAL AUTH HEADER */}
      <header className="bg-white px-4 sm:px-8 py-4 flex justify-between items-center border-b border-gray-100 z-10">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="w-7 h-7" showText={true} />
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium">
          <span className="hidden sm:inline text-gray-500">Remember your password?</span>
          <Link to="/login" className="px-5 py-2 border border-gray-200 rounded-lg text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-1 font-bold shadow-sm">
            Back to Login <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="flex-grow flex flex-col lg:flex-row w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 gap-8 items-stretch">
        
        {/* LEFT COLUMN: Marketing & Info (Hidden on smaller screens) */}
        <div className="hidden lg:flex lg:w-[45%] bg-[#044e3b] rounded-[2rem] p-10 flex-col relative overflow-hidden shadow-2xl">
           {/* Abstract Background Elements */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-emerald-400 opacity-10 rounded-full blur-3xl"></div>
           
           <div className="relative z-10 flex flex-col h-full">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/50 text-emerald-300 text-xs font-bold border border-emerald-700 mb-8 backdrop-blur-sm w-fit">
                <Lock className="w-3.5 h-3.5" /> Password Recovery
              </div>

              <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-[1.15] tracking-tight mb-4">
                Forgot Your <br/> <span className="text-emerald-300">Password?</span>
              </h1>
              
              <p className="text-emerald-100/90 text-base leading-relaxed mb-8 max-w-sm">
                No worries! Enter your email address and we'll send you a link to reset your password quickly.
              </p>

              {/* Stylized Phone Graphic Representation */}
              <div className="w-full flex-grow flex items-center justify-center relative mb-10">
                 <div className="w-48 h-96 bg-[#0f172a] rounded-[2.5rem] border-8 border-gray-900 shadow-2xl relative flex flex-col items-center justify-center p-4 overflow-hidden">
                    {/* Notch */}
                    <div className="absolute top-0 w-24 h-5 bg-gray-900 rounded-b-xl"></div>
                    
                    {/* Screen Content */}
                    <div className="w-full h-full bg-emerald-50 rounded-2xl flex flex-col items-center justify-center p-4 text-center">
                       <Logo className="w-8 h-8 text-sabi-primary mb-6" showText={false} />
                       <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                          <Lock className="w-8 h-8 text-sabi-primary" />
                       </div>
                       <h4 className="font-bold text-gray-900 text-sm mb-4">Reset Link Sent!</h4>
                       <div className="bg-white border border-gray-200 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-sm">
                          <span className="text-[10px] text-gray-600 font-medium truncate w-24">vendor@example.com</span>
                          <ShieldCheck className="w-3 h-3 text-sabi-primary flex-shrink-0" />
                       </div>
                    </div>
                 </div>
                 
                 {/* Floating Elements */}
                 <div className="absolute right-4 bottom-16 w-12 h-12 bg-emerald-400 rounded-xl shadow-lg transform rotate-12 flex items-center justify-center">
                    <Send className="w-6 h-6 text-white" />
                 </div>
              </div>

              {/* Quick Tip */}
              <div className="mt-auto relative z-10 flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full bg-emerald-900/50 flex items-center justify-center flex-shrink-0 border border-emerald-700 backdrop-blur-sm">
                    <Lightbulb className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                 </div>
                 <div>
                    <h4 className="font-bold text-white text-base">Quick Tip</h4>
                    <p className="text-emerald-100/80 text-sm mt-1 leading-relaxed">
                       Check your spam or promotions folder if you don't see the reset email in your inbox.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: The Form */}
        <div className="w-full lg:w-[55%] flex flex-col items-center justify-center">
          <div className="w-full max-w-xl bg-white rounded-[2rem] p-6 sm:p-12 border border-gray-100 shadow-xl relative overflow-hidden">
             
             <div className="mb-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                   <Lock className="w-8 h-8 text-sabi-primary" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Reset Your Password</h2>
                <p className="text-gray-500 text-base max-w-sm">Enter the email address associated with your SabiSell vendor account.</p>
             </div>

             <form className="space-y-6" onSubmit={handleSubmit}>
               
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
                     value={email} 
                     onChange={(e) => setEmail(e.target.value)} 
                     placeholder="Enter your registered email address" 
                     className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900" 
                   />
                 </div>
               </div>

               {/* Submit Button */}
               <button type="submit" className="w-full flex bg-[#044e3b] hover:bg-sabi-primaryDark text-white py-4 rounded-xl font-bold transition-all shadow-lg items-center justify-center gap-2 text-base">
                  <Send className="w-5 h-5" /> Send Reset Link
               </button>

               {/* Divider */}
               <div className="relative flex items-center py-2">
                 <div className="flex-grow border-t border-gray-200"></div>
                 <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">or</span>
                 <div className="flex-grow border-t border-gray-200"></div>
               </div>

               {/* What Happens Next Box */}
               <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                     <Info className="w-4 h-4 text-white" />
                  </div>
                  <div>
                     <h4 className="font-bold text-gray-900 text-sm">What happens next?</h4>
                     <p className="text-gray-600 text-xs mt-1 font-medium leading-relaxed">
                        We'll send you a secure password reset link to your email. Click the link in the email to create a new password.
                     </p>
                  </div>
               </div>

             </form>

             <div className="mt-10 text-center">
                <p className="text-sm font-medium text-gray-600 mb-1">Don't have access to this email?</p>
                <Link to="/contact" className="text-sm font-bold text-sabi-primary hover:text-sabi-primaryDark transition-colors">
                   Contact Support →
                </Link>
             </div>
          </div>
        </div>

      </main>

      {/* SUPPORT BANNER */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:divide-y-0 md:divide-x divide-emerald-200">
           <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6 first:pt-0 first:pl-0">
              <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
                 <Headphones className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                 <h4 className="font-bold text-gray-900 text-sm">Need Help?</h4>
                 <p className="text-gray-500 text-xs mt-0.5">If you're having trouble resetting your password, our support team is ready to assist you.</p>
              </div>
           </div>
           <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
              <div className="w-10 h-10 bg-emerald-100 rounded-full shadow-sm flex items-center justify-center shrink-0 border border-emerald-200">
                 <MessageCircle className="w-5 h-5 text-sabi-primary fill-sabi-primary" />
              </div>
              <div>
                 <h4 className="font-bold text-gray-900 text-sm">Chat on WhatsApp</h4>
                 <p className="text-gray-500 text-xs mt-0.5">+234 901 234 5678</p>
              </div>
           </div>
           <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
              <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
                 <Mail className="w-5 h-5 text-sabi-primary" />
              </div>
              <div>
                 <h4 className="font-bold text-gray-900 text-sm">Email Support</h4>
                 <p className="text-gray-500 text-xs mt-0.5">support@sabisell.com</p>
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
           <Link to="/" className="text-sm font-bold text-gray-600 hover:text-sabi-primary transition-colors flex items-center gap-1.5">
              <Home className="w-4 h-4" /> Back to Home <ChevronRight className="w-3 h-3" />
           </Link>
        </div>
      </footer>

    </div>
  );
};

export default ForgotPassword;