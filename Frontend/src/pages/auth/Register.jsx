// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { 
//   Check, Eye, EyeOff, ChevronLeft, Zap, Smartphone, ShieldCheck, 
//   Store, User, Mail, Phone, Lock, UploadCloud, ChevronRight, 
//   MapPin, Banknote, HelpCircle, RefreshCcw, Rocket, Star, ChevronDown, Lightbulb
// } from "lucide-react";
// import Logo from "../../components/shared/Logo";
// import api from '../../utils/api';

// const Register = () => {

//    const navigate = useNavigate();

//   const [step, setStep] = useState(1);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState('');

//   // Form State
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     storeName: "",
//     storeCategory: "Fashion & Clothing",
//     businessType: "owner",
//     storeDescription: "",
//     location: "Nigeria",
//     currency: "NGN",
//     contactPhone: ""
//   });

//   const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
//   const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
// const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       // 1. Send the data to our backend
//       const response = await api.post('/auth/signup', formData);

//       // 2. Save the secure token to localStorage
//       localStorage.setItem('sabisell_token', response.data.token);
      
//       // Optional: Save user data so you can display their name in the header
//       localStorage.setItem('sabisell_vendor', JSON.stringify(response.data.vendor));

//       // 3. Redirect them to the Onboarding page to set up their store!
//       navigate('/onboarding'); 

//     } catch (err) {
//       setError(err.response?.data?.message || 'Something went wrong. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // STEP 1: ACCOUNT INFORMATION
  
//   const renderStep1 = () => (
//     <div className="animate-in fade-in slide-in-from-right-4 duration-300">
//       <div className="mb-6">
//         <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Account Information</h2>
//         <p className="text-gray-500 text-sm">Let's start with your basic details</p>
//       </div>

//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <User className="h-5 w-5 text-gray-400" />
//             </div>
//             <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900" />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Mail className="h-5 w-5 text-gray-400" />
//             </div>
//             <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900" />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone / WhatsApp Number</label>
//           <div className="flex gap-2">
//              <div className="relative w-1/3 sm:w-1/4">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Phone className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <select className="w-full pl-10 pr-2 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none font-medium text-gray-900 appearance-none">
//                    <option>+234</option>
//                 </select>
//              </div>
//              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="801 234 5678" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900" />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Lock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Create a strong password" className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900" />
//             <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
//                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//             </button>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-bold text-gray-700 mb-1.5">Confirm Password</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Lock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900" />
//             <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
//                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//             </button>
//           </div>
//         </div>

//         {/* Password Requirements Box */}
//         <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 mt-2">
//            <p className="text-xs font-bold text-gray-800 mb-2">Password must contain:</p>
//            <ul className="space-y-1.5">
//              {["At least 8 characters", "One uppercase letter", "One number or symbol"].map((req, i) => (
//                 <li key={i} className="flex items-center gap-2 text-xs font-medium text-emerald-800">
//                    <div className="w-3.5 h-3.5 rounded-full bg-sabi-primary flex items-center justify-center">
//                      <Check className="w-2.5 h-2.5 text-white" />
//                    </div>
//                    {req}
//                 </li>
//              ))}
//            </ul>
//         </div>

//         <button type="button" onClick={handleNext} className="w-full mt-6 bg-sabi-primary hover:bg-sabi-primaryDark text-white py-3.5 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2">
//            Continue to Store Details <ChevronRight className="w-5 h-5" />
//         </button>

//         <div className="relative flex items-center py-4">
//           <div className="grow border-t border-gray-200"></div>
//           <span className="shrink-0 mx-4 text-gray-400 text-sm font-medium">or sign up with</span>
//           <div className="grow border-t border-gray-200"></div>
//         </div>

//         <button type="button" className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-sm">
//            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
//            Continue with Google
//         </button>
//       </div>
//     </div>
//   );

  
//   // STEP 2: STORE DETAILS
  
//   const renderStep2 = () => (
//     <div className="animate-in fade-in slide-in-from-right-4 duration-300">
//       <div className="mb-6">
//         <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Store Details</h2>
//         <p className="text-gray-500 text-sm">Tell us about your business and brand</p>
//       </div>

//       <div className="space-y-5">
//         <div>
//           <label className="block text-sm font-bold text-gray-700 mb-1.5">Store Name</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Store className="h-5 w-5 text-gray-400" />
//             </div>
//             <input type="text" name="storeName" value={formData.storeName} onChange={handleChange} placeholder="e.g. Zara Stitches & Fashion" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900" />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-bold text-gray-700 mb-1.5">Store Category</label>
//           <div className="relative">
//             <select name="storeCategory" value={formData.storeCategory} onChange={handleChange} className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900 appearance-none">
//                <option>Fashion & Clothing</option>
//                <option>Electronics & Gadgets</option>
//                <option>Health & Beauty</option>
//                <option>Food & Groceries</option>
//                <option>Other</option>
//             </select>
//             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//               <ChevronDown className="h-5 w-5 text-gray-400" />
//             </div>
//           </div>
//         </div>

//         <div>
//            <div className="flex items-center gap-1 mb-1.5">
//              <label className="block text-sm font-bold text-gray-700">Business Type</label>
//              <HelpCircle className="w-4 h-4 text-gray-400" />
//            </div>
//            <div className="grid grid-cols-2 gap-3">
//               <button type="button" onClick={() => setFormData({...formData, businessType: 'owner'})} className={`p-4 rounded-xl border-2 text-left transition-all ${formData.businessType === 'owner' ? 'border-sabi-primary bg-emerald-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
//                  <Store className={`w-6 h-6 mb-2 ${formData.businessType === 'owner' ? 'text-sabi-primary' : 'text-gray-400'}`} />
//                  <h4 className="font-bold text-gray-900 text-sm mb-1">Business Owner</h4>
//                  <p className="text-xs text-gray-500 font-medium">I own the business</p>
//               </button>
//               <button type="button" onClick={() => setFormData({...formData, businessType: 'staff'})} className={`p-4 rounded-xl border-2 text-left transition-all ${formData.businessType === 'staff' ? 'border-sabi-primary bg-emerald-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
//                  <User className={`w-6 h-6 mb-2 ${formData.businessType === 'staff' ? 'text-sabi-primary' : 'text-gray-400'}`} />
//                  <h4 className="font-bold text-gray-900 text-sm mb-1">Staff/Manager</h4>
//                  <p className="text-xs text-gray-500 font-medium">I manage it for someone</p>
//               </button>
//            </div>
//         </div>

//         <div>
//           <div className="flex justify-between items-center mb-1.5">
//              <label className="block text-sm font-bold text-gray-700">Store Description</label>
//              <span className="text-xs font-medium text-gray-400">0/150</span>
//           </div>
//           <textarea rows="3" name="storeDescription" value={formData.storeDescription} onChange={handleChange} placeholder="We sell quality and stylish outfits for men, women and children." className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900 resize-none"></textarea>
//         </div>

//         <div>
//           <label className="block text-sm font-bold text-gray-700 mb-1.5">Store Logo <span className="text-gray-400 font-medium">(Optional)</span></label>
//           <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center">
//              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-3">
//                <UploadCloud className="w-6 h-6 text-gray-400" />
//              </div>
//              <p className="font-bold text-sm text-gray-900">Tap to upload logo</p>
//              <p className="text-xs text-gray-500 font-medium mt-1">PNG, JPG up to 2MB</p>
//           </div>
//         </div>

//         <div className="flex gap-3 mt-6">
//           <button type="button" onClick={handleBack} className="px-6 py-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 w-1/3">
//              <ChevronLeft className="w-5 h-5" /> Back
//           </button>
//           <button type="button" onClick={handleNext} className="w-2/3 bg-sabi-primary hover:bg-sabi-primaryDark text-white py-3.5 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2">
//              Continue to Finish Setup <ChevronRight className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );

  
//   // STEP 3: FINISH SETUP
  
//   const renderStep3 = () => (
//     <div className="animate-in fade-in slide-in-from-right-4 duration-300">
//       <div className="mb-6">
//         <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Finish Setup</h2>
//         <p className="text-gray-500 text-sm">Finalize your account and you're ready to sell!</p>
//       </div>

//       <div className="space-y-5">
//         <div>
//           <label className="text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-2"><MapPin className="w-4 h-4 text-sabi-primary"/> Business Location</label>
//           <div className="relative">
//             <select name="location" value={formData.location} onChange={handleChange} className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900 appearance-none">
//                <option>Nigeria</option>
//                <option>Ghana</option>
//                <option>Kenya</option>
//             </select>
//             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//               <ChevronDown className="h-5 w-5 text-gray-400" />
//             </div>
//           </div>
//         </div>

//         <div>
//           <label className="text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-2"><Banknote className="w-4 h-4 text-sabi-primary"/> Preferred Currency</label>
//           <div className="relative mb-2">
//             <select name="currency" value={formData.currency} onChange={handleChange} className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900 appearance-none">
//                <option>Nigerian Naira (₦)</option>
//                <option>US Dollar ($)</option>
//             </select>
//             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//               <ChevronDown className="h-5 w-5 text-gray-400" />
//             </div>
//           </div>
//           <p className="text-xs text-gray-500 font-medium leading-relaxed">
//             You can receive payments in NGN via Paystack, Flutterwave and bank transfer.
//           </p>
//         </div>

//         <div>
//           <label className="text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-2"><Phone className="w-4 h-4 text-sabi-primary"/> Contact for Customers</label>
//           <p className="text-xs text-gray-500 font-medium mb-2">This number will be shown to customers</p>
//           <div className="relative">
//              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <span className="text-gray-500 font-medium text-xs sm:text-sm">+234</span>
//              </div>
//              <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} placeholder="801 234 5678" className="w-full pl-14 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900" />
//           </div>
//         </div>

//         <div className="pt-2">
//           <label className="flex items-start gap-3 cursor-pointer group">
//             <div className="relative flex items-center justify-center mt-0.5">
//                <input type="checkbox" className="peer sr-only" defaultChecked />
//                <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-sabi-primary peer-checked:border-sabi-primary transition-colors"></div>
//                <Check className="w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none" />
//             </div>
//             <span className="text-sm font-medium text-gray-700">
//                I agree to the SabiSell <a href="#" className="text-sabi-primary hover:underline">Terms of Service</a> and <a href="#" className="text-sabi-primary hover:underline">Privacy Policy</a>
//             </span>
//           </label>
//         </div>

//         {/* Store Preview Card */}
//         <div className="bg-[#0f172a] rounded-2xl p-6 mt-4 relative overflow-hidden shadow-lg">
//            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
//            <div className="relative z-10 flex flex-col items-center text-center">
//               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3">
//                  <Check className="w-6 h-6 text-sabi-primary" />
//               </div>
//               <h3 className="font-bold text-white text-lg mb-1">You're Almost Done!</h3>
//               <p className="text-gray-400 text-sm font-medium mb-6">Your vendor account is ready to be created.</p>
              
//               <div className="w-full bg-white/10 border border-white/10 rounded-xl p-4 flex items-center gap-4 text-left backdrop-blur-sm">
//                  <div className="w-12 h-12 rounded-xl bg-emerald-900 flex items-center justify-center shrink-0 border border-emerald-700">
//                     <Store className="w-6 h-6 text-emerald-400" />
//                  </div>
//                  <div>
//                     <h4 className="font-bold text-white text-base">{formData.storeName || "Your Store Name"}</h4>
//                     <p className="text-emerald-400 text-xs font-medium mt-0.5">{formData.storeCategory} • {formData.location}</p>
//                  </div>
//               </div>
//            </div>
//         </div>

//         <div className="flex flex-col gap-3 mt-6">
//           <Link to="/dashboard" className="w-full py-4 bg-sabi-primary hover:bg-sabi-primaryDark text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 text-base">
//              🎉 Create My Store Account
//           </Link>
//           <button type="button" onClick={handleBack} className="w-full py-3 text-gray-500 hover:text-gray-800 font-bold transition-colors flex items-center justify-center gap-2 text-sm">
//              <ChevronLeft className="w-4 h-4" /> Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-sabi-surface flex flex-col font-sans">
      
//       {/* MINIMAL AUTH HEADER */}
//       <header className="bg-white px-4 sm:px-8 py-4 flex justify-between items-center border-b border-gray-100 z-10">
//         <Link to="/" className="flex items-center gap-2">
//           <Logo className="w-7 h-7" showText={true} />
//         </Link>
//         <div className="flex items-center gap-4 text-sm font-medium">
//           <span className="hidden sm:inline text-gray-500">Already have an account?</span>
//           <Link to="/login" className="px-5 py-2 border border-gray-200 rounded-lg text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-1 font-bold">
//             Log in <ChevronRight className="w-4 h-4" />
//           </Link>
//         </div>
//       </header>

//       {/* MAIN LAYOUT */}
//       <main className="grow flex flex-col lg:flex-row w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 gap-8 items-stretch">
        
//         {/* LEFT COLUMN: Marketing (Hidden on smaller screens, shown on desktop) */}
//         <div className="hidden lg:flex lg:w-[45%] bg-[#044e3b] rounded-4xl p-10 flex-col relative overflow-hidden shadow-2xl">
//            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
           
//            <div className="relative z-10">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/50 text-emerald-300 text-xs font-bold border border-emerald-700 mb-8 backdrop-blur-sm">
//                 <Rocket className="w-3.5 h-3.5" /> Create Your Store in Minutes
//               </div>

//               <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-[1.15] tracking-tight mb-4">
//                 Start Selling Online with <span className="text-emerald-300">SabiSell</span>
//               </h1>
              
//               <p className="text-emerald-100/90 text-base leading-relaxed mb-10 max-w-sm">
//                 Join thousands of vendors already growing their business with their own online store.
//               </p>

//               <div className="space-y-8 mb-12">
//                  <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
//                        <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
//                     </div>
//                     <div>
//                        <h3 className="font-bold text-white text-lg">Quick & Easy Setup</h3>
//                        <p className="text-emerald-200/80 text-sm mt-1">Launch your store in less than 5 minutes</p>
//                     </div>
//                  </div>
//                  <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
//                        <Smartphone className="w-6 h-6 text-emerald-300" />
//                     </div>
//                     <div>
//                        <h3 className="font-bold text-white text-lg">Sell from Anywhere</h3>
//                        <p className="text-emerald-200/80 text-sm mt-1">Manage products & orders from your phone</p>
//                     </div>
//                  </div>
//                  <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
//                        <ShieldCheck className="w-6 h-6 text-emerald-300" />
//                     </div>
//                     <div>
//                        <h3 className="font-bold text-white text-lg">Secure & Reliable</h3>
//                        <p className="text-emerald-200/80 text-sm mt-1">Your business and payments are protected</p>
//                     </div>
//                  </div>
//               </div>
//            </div>

//            {/* Testimonial */}
//            <div className="mt-auto relative z-10 bg-emerald-900/40 border border-emerald-700/50 rounded-2xl p-6 backdrop-blur-md">
//               <p className="text-emerald-50 text-sm italic leading-relaxed mb-4">
//                 "SabiSell helped me turn my small business into a real online store. Super easy to use!"
//               </p>
//               <div className="flex items-center justify-between">
//                  <span className="font-bold text-white text-sm">— Amaka B., Fashion Vendor</span>
//                  <div className="flex gap-1 text-yellow-400">
//                     <Star className="w-4 h-4 fill-yellow-400" />
//                     <Star className="w-4 h-4 fill-yellow-400" />
//                     <Star className="w-4 h-4 fill-yellow-400" />
//                     <Star className="w-4 h-4 fill-yellow-400" />
//                     <Star className="w-4 h-4 fill-yellow-400" />
//                  </div>
//               </div>
//            </div>
//         </div>

//         {/* RIGHT COLUMN: The Form */}
//         <div className="w-full lg:w-[55%] flex flex-col items-center">
//           <div className="w-full max-w-xl bg-white rounded-4xl p-6 sm:p-10 border border-gray-100 shadow-xl relative overflow-hidden">
             
//              {/* Progress Stepper */}
//              <div className="mb-10 mt-2">
//                 <div className="flex items-center justify-between relative">
//                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full z-0"></div>
                   
//                    {/* Step 1 */}
//                    <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
//                       <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 1 ? 'bg-sabi-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
//                          {step > 1 ? <Check className="w-4 h-4" /> : 1}
//                       </div>
//                       <span className={`text-xs font-bold ${step >= 1 ? 'text-sabi-primary' : 'text-gray-400'}`}>Account Info</span>
//                    </div>

//                    {/* Step 2 */}
//                    <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
//                       <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 2 ? 'bg-sabi-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
//                          {step > 2 ? <Check className="w-4 h-4" /> : 2}
//                       </div>
//                       <span className={`text-xs font-bold ${step >= 2 ? 'text-sabi-primary' : 'text-gray-400'}`}>Store Details</span>
//                    </div>

//                    {/* Step 3 */}
//                    <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
//                       <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 3 ? 'bg-sabi-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
//                          3
//                       </div>
//                       <span className={`text-xs font-bold ${step >= 3 ? 'text-sabi-primary' : 'text-gray-400'}`}>Finish Setup</span>
//                    </div>
//                 </div>
//              </div>

//              {/* Render Active Step */}
//              {step === 1 && renderStep1()}
//              {step === 2 && renderStep2()}
//              {step === 3 && renderStep3()}
             
//              {/* Tiny legal text on step 1 */}
//              {step === 1 && (
//                <p className="text-center text-xs font-medium text-gray-500 mt-6">
//                  By creating an account, you agree to our <a href="#" className="text-sabi-primary hover:underline">Terms of Service</a> and <a href="#" className="text-sabi-primary hover:underline">Privacy Policy</a>.
//                </p>
//              )}
//           </div>
//         </div>

//       </main>

//       {/* TRUST BADGES & "WHAT HAPPENS NEXT" BANNER */}
//       <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 space-y-4">
        
//         {/* Trust Badges */}
//         <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6  md:divide-y-0 md:divide-x divide-emerald-200">
//            <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6 first:pt-0 first:pl-0">
//               <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
//                  <ShieldCheck className="w-5 h-5 text-sabi-primary" />
//               </div>
//               <div>
//                  <h4 className="font-bold text-gray-900 text-sm">No Setup Fees</h4>
//                  <p className="text-gray-500 text-xs mt-0.5">Start free, upgrade when you grow</p>
//               </div>
//            </div>
//            <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
//               <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
//                  <RefreshCcw className="w-5 h-5 text-sabi-primary" />
//               </div>
//               <div>
//                  <h4 className="font-bold text-gray-900 text-sm">Cancel Anytime</h4>
//                  <p className="text-gray-500 text-xs mt-0.5">You're in control always</p>
//               </div>
//            </div>
//            <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
//               <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
//                  <Phone className="w-5 h-5 text-sabi-primary" />
//               </div>
//               <div>
//                  <h4 className="font-bold text-gray-900 text-sm">Need Help?</h4>
//                  <p className="text-gray-500 text-xs mt-0.5">Chat with us on <a href="#" className="text-sabi-primary font-bold hover:underline">WhatsApp</a></p>
//               </div>
//            </div>
//         </div>

//         {/* What Happens Next - Shown on step 2 & 3 */}
//         {step > 1 && (
//           <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
//              <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center shrink-0">
//                    <Lightbulb className="w-6 h-6 text-yellow-500 fill-yellow-500" />
//                 </div>
//                 <div>
//                    <h4 className="font-bold text-gray-900 text-base">What Happens Next?</h4>
//                    <p className="text-gray-500 text-sm mt-0.5">After creating your account, you'll be taken to your dashboard where you can add products.</p>
//                 </div>
//              </div>
//              <div className="items-center gap-6 hidden sm:flex">
//                 <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
//                    <div className="w-6 h-6 rounded-full bg-sabi-primary text-white flex items-center justify-center text-xs">1</div> Access Dashboard
//                 </div>
//                 <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
//                    <div className="w-6 h-6 rounded-full bg-sabi-primary text-white flex items-center justify-center text-xs">2</div> Add Your Products
//                 </div>
//                 <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
//                    <div className="w-6 h-6 rounded-full bg-sabi-primary text-white flex items-center justify-center text-xs">3</div> Start Selling
//                 </div>
//              </div>
//           </div>
//         )}
//       </div>

//       {/* MINIMAL FOOTER */}
//       <footer className="bg-white border-t border-gray-100 py-6 mt-auto">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
//            <div className="flex items-center gap-2">
//               <Logo className="w-5 h-5 text-gray-400" showText={false} />
//               <span className="font-bold text-gray-800 text-sm">SabiSell</span>
//            </div>
//            <p className="text-xs font-medium text-gray-500">
//               © {new Date().getFullYear()} SabiSell. All rights reserved.
//            </p>
//            <Link to="/" className="text-sm font-bold text-gray-600 hover:text-sabi-primary transition-colors flex items-center gap-1">
//               <ChevronLeft className="w-4 h-4" /> Back to Home
//            </Link>
//         </div>
//       </footer>

//     </div>
//   );
// };

// export default Register;



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Check, Eye, EyeOff, ChevronRight, Zap, Smartphone, ShieldCheck, 
  User, Mail, Phone, Lock, Rocket, Star, ChevronLeft, AlertCircle, RefreshCcw
} from "lucide-react";
import Logo from "../../components/shared/Logo";
import api from '../../utils/api';

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear any previous errors when the user starts typing again
    if (error) setError('');
  };

  // Live Password Validation Checks
  const hasLength = formData.password.length >= 8;
  const hasUpper = /[A-Z]/.test(formData.password);
  // Checks for at least one number (0-9) OR one special character
  const hasNumberOrSymbol = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password);

  const handleSignup = async (e) => {
    e.preventDefault(); 
    setError('');

    // 1. Frontend Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Your passwords do not match!");
      return;
    }

    if (!hasLength) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (!hasUpper) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!hasNumberOrSymbol) {
      setError("Password must contain at least one number or symbol.");
      return;
    }

    setIsLoading(true);

    try {
      // 2. Prepare data for backend (excluding confirmPassword)
      const dataToSend = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      };

      // 3. Send the data to our backend
      const response = await api.post('/auth/signup', dataToSend);

      // 4. Save the secure token and vendor data to localStorage
      localStorage.setItem('sabisell_token', response.data.token);
      localStorage.setItem('sabisell_vendor', JSON.stringify(response.data.vendor));

      navigate('/dashboard'); 

    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
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
          <span className="hidden sm:inline text-gray-500">Already have an account?</span>
          <Link to="/login" className="px-5 py-2 border border-gray-200 rounded-lg text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-1 font-bold">
            Log in <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="grow flex flex-col lg:flex-row w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 gap-8 items-stretch">
        
        {/* LEFT COLUMN: Marketing */}
        <div className="hidden lg:flex lg:w-[45%] bg-[#044e3b] rounded-4xl p-10 flex-col relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
           
           <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/50 text-emerald-300 text-xs font-bold border border-emerald-700 mb-8 backdrop-blur-sm">
                <Rocket className="w-3.5 h-3.5" /> Create Your Store in Minutes
              </div>

              <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-[1.15] tracking-tight mb-4">
                Start Selling Online with <span className="text-emerald-300">SabiSell</span>
              </h1>
              
              <p className="text-emerald-100/90 text-base leading-relaxed mb-10 max-w-sm">
                Join thousands of vendors already growing their business with their own online store.
              </p>

              <div className="space-y-8 mb-12">
                 <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                       <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div>
                       <h3 className="font-bold text-white text-lg">Quick & Easy Setup</h3>
                       <p className="text-emerald-200/80 text-sm mt-1">Launch your store in less than 5 minutes</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                       <Smartphone className="w-6 h-6 text-emerald-300" />
                    </div>
                    <div>
                       <h3 className="font-bold text-white text-lg">Sell from Anywhere</h3>
                       <p className="text-emerald-200/80 text-sm mt-1">Manage products & orders from your phone</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                       <ShieldCheck className="w-6 h-6 text-emerald-300" />
                    </div>
                    <div>
                       <h3 className="font-bold text-white text-lg">Secure & Reliable</h3>
                       <p className="text-emerald-200/80 text-sm mt-1">Your business and payments are protected</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Testimonial */}
           <div className="mt-auto relative z-10 bg-emerald-900/40 border border-emerald-700/50 rounded-2xl p-6 backdrop-blur-md">
              <p className="text-emerald-50 text-sm italic leading-relaxed mb-4">
                "SabiSell helped me turn my small business into a real online store. Super easy to use!"
              </p>
              <div className="flex items-center justify-between">
                 <span className="font-bold text-white text-sm">— Amaka B., Fashion Vendor</span>
                 <div className="flex gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400" />
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: The Form */}
        <div className="w-full lg:w-[55%] flex flex-col items-center justify-center">
          <div className="w-full max-w-xl bg-white rounded-4xl p-6 sm:p-10 border border-gray-100 shadow-xl relative overflow-hidden">
             
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Create Account</h2>
              <p className="text-gray-500 text-sm">Let's start with your basic details</p>
            </div>

            {/* Error Message Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" required name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="email" required name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone / WhatsApp Number</label>
                <div className="flex gap-2">
                   <div className="relative w-1/3 sm:w-1/4">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <select className="w-full pl-10 pr-2 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none font-medium text-gray-900 appearance-none">
                         <option>+234</option>
                      </select>
                   </div>
                   <input type="tel" required name="phone" value={formData.phone} onChange={handleChange} placeholder="801 234 5678" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type={showPassword ? "text" : "password"} required name="password" value={formData.password} onChange={handleChange} placeholder="Create a strong password" className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type={showConfirmPassword ? "text" : "password"} required name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-900" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                     {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* DYNAMIC Password Requirements Box */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mt-2">
                 <p className="text-xs font-bold text-gray-800 mb-2">Password must contain:</p>
                 <ul className="space-y-1.5">
                    <li className={`flex items-center gap-2 text-xs font-medium transition-colors ${hasLength ? 'text-emerald-700' : 'text-gray-500'}`}>
                       <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors ${hasLength ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                         <Check className="w-2.5 h-2.5 text-white" />
                       </div>
                       At least 8 characters
                    </li>
                    <li className={`flex items-center gap-2 text-xs font-medium transition-colors ${hasUpper ? 'text-emerald-700' : 'text-gray-500'}`}>
                       <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors ${hasUpper ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                         <Check className="w-2.5 h-2.5 text-white" />
                       </div>
                       One uppercase letter
                    </li>
                    <li className={`flex items-center gap-2 text-xs font-medium transition-colors ${hasNumberOrSymbol ? 'text-emerald-700' : 'text-gray-500'}`}>
                       <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors ${hasNumberOrSymbol ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                         <Check className="w-2.5 h-2.5 text-white" />
                       </div>
                       One number or symbol
                    </li>
                 </ul>
              </div>

              <button type="submit" disabled={isLoading} className="w-full mt-6 bg-sabi-primary hover:bg-sabi-primaryDark text-white py-3.5 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                 {isLoading ? "Creating Account..." : "Create Account"} <ChevronRight className="w-5 h-5" />
              </button>

              <div className="relative flex items-center py-4">
                <div className="grow border-t border-gray-200"></div>
                <span className="shrink-0 mx-4 text-gray-400 text-sm font-medium">or sign up with</span>
                <div className="grow border-t border-gray-200"></div>
              </div>

              <button type="button" className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-sm">
                 <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                 Continue with Google
              </button>

              <p className="text-center text-xs font-medium text-gray-500 mt-6">
                By creating an account, you agree to our <a href="#" className="text-sabi-primary hover:underline">Terms of Service</a> and <a href="#" className="text-sabi-primary hover:underline">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* TRUST BADGES */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 space-y-4">
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6  md:divide-y-0 md:divide-x divide-emerald-200">
           <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6 first:pt-0 first:pl-0">
              <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
                 <ShieldCheck className="w-5 h-5 text-sabi-primary" />
              </div>
              <div>
                 <h4 className="font-bold text-gray-900 text-sm">No Setup Fees</h4>
                 <p className="text-gray-500 text-xs mt-0.5">Start free, upgrade when you grow</p>
              </div>
           </div>
           <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
              <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
                 <RefreshCcw className="w-5 h-5 text-sabi-primary" />
              </div>
              <div>
                 <h4 className="font-bold text-gray-900 text-sm">Cancel Anytime</h4>
                 <p className="text-gray-500 text-xs mt-0.5">You're in control always</p>
              </div>
           </div>
           <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
              <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
                 <Phone className="w-5 h-5 text-sabi-primary" />
              </div>
              <div>
                 <h4 className="font-bold text-gray-900 text-sm">Need Help?</h4>
                 <p className="text-gray-500 text-xs mt-0.5">Chat with us on <a href="#" className="text-sabi-primary font-bold hover:underline">WhatsApp</a></p>
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

export default Register;