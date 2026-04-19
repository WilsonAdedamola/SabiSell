import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Store, Upload, Camera, CheckCircle2, 
  ArrowLeft, Lightbulb, Tag, Image as ImageIcon,
  LayoutDashboard, ShoppingCart, AlignLeft, ChevronDown, ArrowRight, Rocket
} from "lucide-react";

const VendorOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Custom Dropdown State for Step 1
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [selectedStoreType, setSelectedStoreType] = useState(null);
  const dropdownRef = useRef(null);

  const storeTypes = [
    { id: "fashion", name: "Fashion & Clothing", icon: "👗" },
    { id: "beauty", name: "Health & Beauty", icon: "💄" },
    { id: "electronics", name: "Electronics & Gadgets", icon: "📱" },
    { id: "food", name: "Food & Groceries", icon: "🛒" },
    { id: "home", name: "Home & Furniture", icon: "🛋️" },
    { id: "services", name: "Services & Others", icon: "💼" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsTypeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const nextStep = () => { if (step < 3) setStep(step + 1); };
  const prevStep = () => { if (step > 1) setStep(step - 1); };
  const handleLaunch = () => { navigate("/dashboard"); };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
        
        {/* Top Header Row (Desktop) */}
        <div className="hidden sm:flex items-center justify-between w-full shrink-0 mb-2">
           <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Store Setup</h1>
              <p className="text-sm font-medium text-gray-500">Complete these quick steps to launch your business.</p>
           </div>
           <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-extrabold px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
              🚀 3 Quick Steps to Launch
           </div>
        </div>

        {/* MAIN ONBOARDING CARD */}
        <div className="w-full bg-white rounded-3xl sm:rounded-[2.5rem] shadow-sm border border-gray-200 flex flex-col relative overflow-hidden">
          
          {/* Progress Header */}
          <div className="px-5 sm:px-10 pt-6 sm:pt-10 pb-6 border-b border-gray-50 flex items-center justify-between shrink-0 bg-white z-20">
             <div className="flex items-center gap-4">
                <span className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-emerald-100">
                   Step {step} of 3
                </span>
                <div className="flex gap-2">
                   <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-[#044e3b]' : 'bg-gray-200'}`}></div>
                   <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-[#044e3b]' : 'bg-gray-200'}`}></div>
                   <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${step >= 3 ? 'bg-[#044e3b]' : 'bg-gray-200'}`}></div>
                </div>
             </div>
          </div>

          {/* CONTENT AREA */}
          <div className="px-5 sm:px-10 py-6 sm:py-10">
             
             {/* STEP 1: CREATE STORE */}
             {step === 1 && (
               <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                  <div className="mb-8">
                     <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Let's Create Your Store</h2>
                     <p className="text-sm sm:text-base font-medium text-gray-500">These are the details customers will see when they visit your store.</p>
                  </div>

                  {/* Grid layout to spread out on desktop */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 pb-32">
                     
                     {/* Store Name Input */}
                     <div className="lg:col-span-1">
                        <label className="block text-sm font-bold text-gray-900 mb-2">Store Name</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Store className="w-5 h-5 text-emerald-700" />
                           </div>
                           <input 
                             type="text" 
                             placeholder="e.g. Zara Stitches & Fashion" 
                             className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-gray-900 text-sm sm:text-base" 
                           />
                        </div>
                        <p className="text-[10px] sm:text-xs font-bold text-yellow-600 mt-2 flex items-center gap-1.5">
                           <Lightbulb className="w-3.5 h-3.5" /> Choose a name that represents your business
                        </p>
                     </div>

                     {/* Custom Store Type Dropdown */}
                     <div ref={dropdownRef} className="relative z-50 lg:col-span-1">
                        <label className="block text-sm font-bold text-gray-900 mb-2">Store Type</label>
                        <button 
                          type="button"
                          onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                          className={`w-full flex items-center justify-between px-4 py-4 bg-white border-2 rounded-2xl transition-all ${isTypeDropdownOpen ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-gray-100 hover:border-gray-200'}`}
                        >
                           {selectedStoreType ? (
                             <div className="flex items-center gap-3">
                               <span className="text-xl leading-none">{selectedStoreType.icon}</span>
                               <span className="font-bold text-gray-900 text-sm sm:text-base">{selectedStoreType.name}</span>
                             </div>
                           ) : (
                             <span className="font-medium text-gray-400 text-sm sm:text-base pl-1">Select your category...</span>
                           )}
                           <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Floating Dropdown Menu */}
                        {isTypeDropdownOpen && (
                          <div className="absolute top-[105%] left-0 w-full bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                             <div className="max-h-64 overflow-y-auto hide-scrollbar py-2">
                                {storeTypes.map((type) => (
                                   <button
                                     key={type.id}
                                     onClick={() => {
                                       setSelectedStoreType(type);
                                       setIsTypeDropdownOpen(false);
                                     }}
                                     className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors text-left border-l-4 ${selectedStoreType?.id === type.id ? 'border-[#044e3b] bg-emerald-50/50' : 'border-transparent'}`}
                                   >
                                      <span className="text-xl">{type.icon}</span>
                                      <span className={`text-sm sm:text-base ${selectedStoreType?.id === type.id ? 'font-bold text-[#044e3b]' : 'font-medium text-gray-700'}`}>
                                         {type.name}
                                      </span>
                                      {selectedStoreType?.id === type.id && (
                                         <CheckCircle2 className="w-5 h-5 text-[#044e3b] ml-auto" />
                                      )}
                                   </button>
                                ))}
                             </div>
                          </div>
                        )}
                     </div>

                     {/* About the Store Input (Spans full width on desktop) */}
                     <div className="lg:col-span-2">
                        <label className="block text-sm font-bold text-gray-900 mb-2">About the Store</label>
                        <div className="relative">
                           <div className="absolute top-4 left-4 flex items-center pointer-events-none">
                              <AlignLeft className="w-5 h-5 text-emerald-700" />
                           </div>
                           <textarea 
                             rows="4"
                             placeholder="Briefly describe what you sell, your brand story, or what makes your store unique..."
                             className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-gray-700 text-sm sm:text-base resize-none leading-relaxed"
                           ></textarea>
                        </div>
                     </div>

                     {/* Info Card (Spans full width) */}
                     <div className="lg:col-span-2 bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 flex gap-3 lg:items-center">
                        <div className="text-2xl shrink-0 mt-0.5 lg:mt-0">💡</div>
                        <div>
                           <h4 className="text-sm font-bold text-gray-900">Don't worry!</h4>
                           <p className="text-xs sm:text-sm font-medium text-gray-500 mt-1">
                              You can change these details anytime later from your store settings.
                           </p>
                        </div>
                     </div>

                  </div>
               </div>
             )}

             {/* STEP 2: ADD LOGO */}
             {step === 2 && (
               <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                  <div className="mb-8">
                     <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Add Your Store Logo</h2>
                     <p className="text-sm sm:text-base font-medium text-gray-500">Upload a logo to make your store look professional and trusted by customers.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                     
                     {/* Upload Area */}
                     <div className="lg:col-span-7">
                        <label className="block text-sm font-bold text-gray-900 mb-3">Store Logo</label>
                        
                        <div className="border-2 border-dashed border-emerald-200 bg-emerald-50/50 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left relative overflow-hidden group cursor-pointer transition-colors hover:bg-emerald-50">
                           
                           <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-[#044e3b] flex flex-col items-center justify-center text-white shadow-xl shrink-0 relative z-10 border-4 border-white">
                              <span className="font-bold text-3xl italic leading-none">Zara</span>
                              <span className="text-[8px] tracking-widest uppercase opacity-80 mt-1.5">Stitches & Fashion</span>
                           </div>
                           
                           <div className="flex flex-col items-center sm:items-start relative z-10">
                              <div className="flex items-center justify-center gap-2 bg-white px-5 py-3 rounded-full border border-emerald-100 shadow-sm mb-3">
                                 <Upload className="w-5 h-5 text-[#044e3b]" />
                                 <span className="text-sm font-bold text-gray-900">Tap to upload logo</span>
                              </div>
                              <p className="text-[11px] font-medium text-gray-500">PNG, JPG up to 2MB</p>
                           </div>
                        </div>

                        <div className="relative flex items-center py-6">
                           <div className="grow border-t border-gray-100"></div>
                           <span className="shrink-0 mx-4 text-gray-400 text-xs font-medium uppercase tracking-widest">or</span>
                           <div className="grow border-t border-gray-100"></div>
                        </div>

                        <button className="w-full py-4 bg-white border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-700 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-sm">
                           <Camera className="w-5 h-5 text-gray-500" /> Use Camera
                        </button>
                     </div>

                     {/* Tips Card (Side panel on desktop) */}
                     <div className="lg:col-span-5 bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 lg:h-full flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                           <Lightbulb className="w-5 h-5 text-yellow-500" />
                           <h4 className="text-base font-bold text-gray-900">Tips for a great logo:</h4>
                        </div>
                        <ul className="space-y-4">
                           <li className="flex items-start gap-3 text-sm font-bold text-gray-600">
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> 
                              <span>Use a clear, high-quality image that represents your brand.</span>
                           </li>
                           <li className="flex items-start gap-3 text-sm font-bold text-gray-600">
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> 
                              <span>Square or circular sizes work best across the platform.</span>
                           </li>
                           <li className="flex items-start gap-3 text-sm font-bold text-gray-600">
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> 
                              <span>Keep text minimal and easily readable on small screens.</span>
                           </li>
                        </ul>
                     </div>

                  </div>
               </div>
             )}

             {/* STEP 3: ADD PRODUCT */}
             {step === 3 && (
               <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                  <div className="mb-8">
                     <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Add Your First Product</h2>
                     <p className="text-sm sm:text-base font-medium text-gray-500">Let's add one product to get your store ready for customers.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                     
                     {/* Product Photo (Full width on mobile, spans 2 columns on desktop) */}
                     <div className="lg:col-span-2">
                        <label className="block text-sm font-bold text-gray-900 mb-3">Product Photo</label>
                        <div className="flex flex-wrap gap-4">
                           <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-5xl shrink-0 overflow-hidden shadow-sm">
                              👕
                           </div>
                           <button className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl border-2 border-dashed border-gray-300 bg-white hover:bg-gray-50 flex flex-col items-center justify-center gap-2 transition-colors shrink-0">
                              <ImageIcon className="w-8 h-8 text-emerald-700" />
                              <span className="text-xs font-bold text-emerald-800">Add Photo</span>
                           </button>
                        </div>
                     </div>

                     {/* Product Name (Spans 2 columns) */}
                     <div className="lg:col-span-2">
                        <label className="block text-sm font-bold text-gray-900 mb-2">Product Name</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Tag className="w-5 h-5 text-gray-400" />
                           </div>
                           <input 
                             type="text" 
                             defaultValue="Ankara Print Shirt"
                             className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-gray-900 text-sm sm:text-base" 
                           />
                        </div>
                     </div>

                     {/* Price */}
                     <div className="lg:col-span-1">
                        <label className="block text-sm font-bold text-gray-900 mb-2">Price (₦)</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                              <span className="font-extrabold text-gray-900 text-base">₦</span>
                           </div>
                           <input 
                             type="text" 
                             defaultValue="15,000"
                             className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-gray-900 text-sm sm:text-base" 
                           />
                        </div>
                     </div>

                     {/* Category */}
                     <div className="lg:col-span-1">
                        <label className="block text-sm font-bold text-gray-900 mb-2">Category</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <div className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center">
                                 <span className="text-xs">🏷️</span>
                              </div>
                           </div>
                           <select className="w-full pl-12 pr-10 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-gray-900 appearance-none text-sm sm:text-base">
                              <option>Fashion & Clothing</option>
                              <option>Electronics</option>
                           </select>
                           <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                           </div>
                        </div>
                     </div>

                     {/* Ready Tip */}
                     <div className="lg:col-span-2 bg-[#F0FDF4] border border-emerald-100 rounded-2xl p-5 flex gap-3 items-center mt-2">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                        <div>
                           <h4 className="text-sm font-bold text-gray-900">You're almost ready!</h4>
                           <p className="text-xs sm:text-sm font-medium text-emerald-800 mt-0.5">
                              You can add more products and variants later directly from your dashboard.
                           </p>
                        </div>
                     </div>

                  </div>
               </div>
             )}

          </div>

          {/* STICKY BOTTOM ACTIONS */}
          <div className="p-5 sm:p-8 border-t border-gray-100 bg-gray-50/50 shrink-0 z-20">
             {step === 1 && (
               <div className="flex justify-end">
                  <button onClick={nextStep} className="w-full sm:w-auto px-8 py-4 bg-[#044e3b] hover:bg-[#033c2d] text-white rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base">
                     Continue to Logo Upload <ArrowRight className="w-5 h-5" />
                  </button>
               </div>
             )}

             {step === 2 && (
               <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
                 <button onClick={prevStep} className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-2xl font-bold transition-all flex items-center justify-center text-sm sm:text-base">
                    <ArrowLeft className="w-5 h-5 sm:mr-2" /> <span className="ml-2 sm:ml-0">Back</span>
                 </button>
                 <button onClick={nextStep} className="w-full sm:w-auto px-8 py-4 bg-[#044e3b] hover:bg-[#033c2d] text-white rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base">
                    Continue to First Product <ArrowRight className="w-5 h-5" />
                 </button>
               </div>
             )}

             {step === 3 && (
               <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
                 <button onClick={prevStep} className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-2xl font-bold transition-all flex items-center justify-center text-sm sm:text-base">
                    <ArrowLeft className="w-5 h-5 sm:mr-2" /> <span className="ml-2 sm:ml-0">Back</span>
                 </button>
                 <button onClick={handleLaunch} className="w-full sm:w-auto px-10 py-4 bg-[#044e3b] hover:bg-[#033c2d] text-white rounded-2xl font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-3 text-sm sm:text-base">
                    <Rocket className="w-6 h-6" /> Launch My Store Dashboard
                 </button>
               </div>
             )}
          </div>
        </div>

        {/* "What happens next?" Footer Banner */}
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 shrink-0">
           <div className="bg-[#E6F4EA] rounded-4xl p-6 lg:p-8 border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              
              <div className="flex items-center gap-4 md:w-1/3 w-full">
                 <div className="w-14 h-14 rounded-2xl bg-sabi-primary text-white flex items-center justify-center shrink-0 shadow-inner">
                    <Store className="w-7 h-7" />
                 </div>
                 <div>
                    <h4 className="font-extrabold text-gray-900 text-sm sm:text-base">What happens next?</h4>
                    <p className="text-xs sm:text-sm font-medium text-emerald-800/80 leading-relaxed mt-1">
                       Your store will be created and you'll be taken to your dashboard to manage everything.
                    </p>
                 </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-3 lg:gap-6 text-emerald-800 flex-1 w-full overflow-x-auto hide-scrollbar pb-2 md:pb-0">
                 <div className="flex items-center gap-2 shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-sabi-primary" />
                    <div className="text-left">
                       <p className="font-bold text-xs sm:text-sm text-gray-900">Store Created</p>
                       <p className="text-[10px] sm:text-xs font-medium opacity-80">Your store is ready</p>
                    </div>
                 </div>
                 <ArrowRight className="w-5 h-5 text-emerald-300 shrink-0 hidden sm:block" />
                 
                 <div className="flex items-center gap-2 opacity-60 shrink-0">
                    <LayoutDashboard className="w-6 h-6 text-sabi-primary" />
                    <div className="text-left">
                       <p className="font-bold text-xs sm:text-sm text-gray-900">Go to Dashboard</p>
                       <p className="text-[10px] sm:text-xs font-medium opacity-80">Manage everything</p>
                    </div>
                 </div>
                 <ArrowRight className="w-5 h-5 text-emerald-300 shrink-0 hidden sm:block" />
                 
                 <div className="flex items-center gap-2 opacity-60 shrink-0 pr-4 md:pr-0">
                    <ShoppingCart className="w-6 h-6 text-sabi-primary" />
                    <div className="text-left">
                       <p className="font-bold text-xs sm:text-sm text-gray-900">Start Selling</p>
                       <p className="text-[10px] sm:text-xs font-medium opacity-80">Get orders</p>
                    </div>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
};

export default VendorOnboarding;