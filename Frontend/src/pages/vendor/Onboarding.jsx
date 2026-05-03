import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from 'react-confetti'
import { 
  Store, Upload, Camera, CheckCircle2, XCircle,
  ArrowLeft, Lightbulb, Tag, Image as ImageIcon,
  LayoutDashboard, ShoppingCart, AlignLeft, ChevronDown, 
  ArrowRight, Rocket, Loader2, AlertCircle, 
  PartyPopper, Settings // <-- NEW: Added PartyPopper and Settings icons
} from "lucide-react";
import api from '../../utils/api';

const VendorOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Custom Dropdown State for Step 1
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [selectedStoreType, setSelectedStoreType] = useState(null);
  const dropdownRef = useRef(null);

  // --- FORM DATA STATE ---
  // Step 1: Store Details
  const [storeData, setStoreData] = useState({ storeName: "", storeLink: "", storeDescription: "" });
  
  // Link validation states
  const [linkStatus, setLinkStatus] = useState("idle"); 
  const [linkMessage, setLinkMessage] = useState("");

  // Step 2: Logo
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  // Step 3: First Product 
  const [productData, setProductData] = useState({ 
    name: "", 
    price: "", 
    description: ""
  });
  const [productPhoto, setProductPhoto] = useState(null);
  const [productPreview, setProductPreview] = useState(null);

  // Submission & Success State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // <-- NEW: Success Screen State

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

  // --- STORE LINK LIVE VALIDATION (DEBOUNCED) ---
  useEffect(() => {
    if (!storeData.storeLink) {
      setLinkStatus("idle");
      setLinkMessage("");
      return;
    }

    setLinkStatus("checking");
    
    const debounceTimer = setTimeout(async () => {
      try {
        const response = await api.get(`/vendors/check-link?slug=${storeData.storeLink}`);
        if (response.data.available) {
          setLinkStatus("available");
          setLinkMessage("This store link is available!");
        } else {
          setLinkStatus("unavailable");
          setLinkMessage(response.data.message);
        }
      } catch (err) {
        setLinkStatus("unavailable");
        setLinkMessage("Could not verify link. Please try again.");
      }
    }, 600);

    return () => clearTimeout(debounceTimer);
  }, [storeData.storeLink]);

  // --- INPUT HANDLERS ---
  const handleNameChange = (e) => {
    const newName = e.target.value;
    const currentAutoSlug = storeData.storeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    if (storeData.storeLink === "" || storeData.storeLink === currentAutoSlug) {
      const autoSlug = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setStoreData({ ...storeData, storeName: newName, storeLink: autoSlug });
    } else {
      setStoreData({ ...storeData, storeName: newName });
    }
  };

  const handleLinkChange = (e) => {
    const formatted = e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '');
    setStoreData({ ...storeData, storeLink: formatted });
    setLinkStatus("idle");
    setLinkMessage("");
  };

  const handleStoreChange = (e) => setStoreData({ ...storeData, [e.target.name]: e.target.value });
  const handleProductChange = (e) => setProductData({ ...productData, [e.target.name]: e.target.value });

  // --- 2MB FILE RESTRICTION ---
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        return setError("Logo image is too large. Please upload an image under 2MB.");
      }
      setError('');
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file)); 
    }
  };

  const handleProductPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        return setError("Product photo is too large. Please upload an image under 2MB.");
      }
      setError('');
      setProductPhoto(file);
      setProductPreview(URL.createObjectURL(file));
    }
  };

  // --- NAVIGATION VALIDATION ---
  const nextStep = () => {
    setError('');
    
    if (step === 1) {
      if (!storeData.storeName) return setError("Please enter a Store Name.");
      if (!storeData.storeLink) return setError("Please enter a Custom Store Link.");
      if (linkStatus === "checking" || linkStatus === "unavailable") {
        return setError("Please choose an available store link before proceeding.");
      }
      if (!selectedStoreType) return setError("Please select a Store Type.");
    }

    if (step < 3) setStep(step + 1); 
  };
  
  const prevStep = () => { if (step > 1) setStep(step - 1); };

  // --- FINAL SUBMISSION ---
  const handleLaunch = async () => {
    setError('');

    if (!productPhoto) return setError("Please upload a product photo.");
    if (!productData.name.trim()) return setError("Please enter a product name.");
    if (!productData.price.trim()) return setError("Please enter a product price.");
    if (!productData.description.trim()) return setError("Please enter a product description.");

    setIsLoading(true);

    try {
      // 1. Submit Store Data
      const storeFormData = new FormData();
      storeFormData.append('storeName', storeData.storeName);
      storeFormData.append('storeLink', storeData.storeLink); 
      storeFormData.append('storeCategory', selectedStoreType.name);
      storeFormData.append('storeDescription', storeData.storeDescription);
      if (logoFile) storeFormData.append('logo', logoFile);

      const storeRes = await api.put('/vendors/onboarding', storeFormData);

      // 2. Submit Product Data
      const prodFormData = new FormData();
      prodFormData.append('name', productData.name);
      prodFormData.append('description', productData.description);
      prodFormData.append('price', productData.price.replace(/,/g, ''));
      prodFormData.append('stockQuantity', 1); 
      prodFormData.append('status', "ACTIVE");
      prodFormData.append('category', "");
      if (productPhoto) prodFormData.append('images', productPhoto);

      await api.post('/products', prodFormData);

      // 3. Update localStorage
      const currentVendorData = JSON.parse(localStorage.getItem('sabisell_vendor') || '{}');
      const updatedVendor = {
        ...currentVendorData,
        storeName: storeRes.data.store.storeName,
        storeLink: storeRes.data.store.storeLink,
        logoUrl: storeRes.data.store.logoUrl,
        isOnline: true 
      };
      localStorage.setItem('sabisell_vendor', JSON.stringify(updatedVendor));
      window.dispatchEvent(new Event("storage")); 

      // 4. Trigger Success Screen!
      setIsLoading(false);
      setIsSuccess(true);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to complete setup. Please try again.');
      setIsLoading(false);
    }
  };

  // ============================================================================
  // SUCCESS SCREEN RENDER
  // ============================================================================
  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white p-4 text-center overflow-hidden">
        {/* Confetti Explosion! */}
        <Confetti 
          width={window.innerWidth} 
          height={window.innerHeight} 
          recycle={false} 
          numberOfPieces={600} 
          gravity={0.15}
        />
        
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <PartyPopper className="w-12 h-12 text-emerald-600" />
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4 animate-in slide-in-from-bottom-4 duration-500">
          Congratulations! 🎉
        </h1>
        
        <p className="text-gray-500 text-base sm:text-lg max-w-md mx-auto mb-8 font-medium animate-in slide-in-from-bottom-6 duration-700">
          Your store has been successfully created and is <strong className="text-emerald-600">live now!</strong> To finish setting up your store (like customizing your theme or bank details), head to the store settings.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in slide-in-from-bottom-8 duration-1000 delay-300">
          <button 
            onClick={() => navigate('/dashboard/settings')}
            className="w-full sm:w-auto px-8 py-4 bg-[#044e3b] hover:bg-[#033c2d] text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Settings className="w-5 h-5" /> Go to Store Settings
          </button>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto px-8 py-4 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <LayoutDashboard className="w-5 h-5" /> Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ============================================================================
  // NORMAL ONBOARDING RENDER
  // ============================================================================
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

        {/* Global Error Display */}
        {error && (
          <div className="w-full p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 animate-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

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

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 pb-10 lg:pb-32">
                     
                     {/* Store Name Input */}
                     <div className="lg:col-span-1">
                        <label className="block text-sm font-bold text-gray-900 mb-2">Store Name</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Store className="w-5 h-5 text-emerald-700" />
                           </div>
                           <input 
                             type="text" 
                             name="storeName"
                             value={storeData.storeName}
                             onChange={handleNameChange}
                             placeholder="e.g. Zara Stitches & Fashion" 
                             className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-gray-900 text-sm sm:text-base" 
                           />
                        </div>
                     </div>

                     {/* Custom Store Link Input with Live Validation */}
                     <div className="lg:col-span-1">
                        <label className="block text-sm font-bold text-gray-900 mb-2">Custom Store Link</label>
                        <div className="flex rounded-2xl overflow-hidden shadow-sm border-2 border-gray-100 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all bg-white">
                           <span className="flex items-center px-3 sm:px-4 bg-gray-50 text-gray-500 border-r-2 border-gray-100 text-xs sm:text-sm font-medium whitespace-nowrap">
                              sabisell.com/
                           </span>
                           <div className="relative flex-1">
                              <input 
                                type="text" 
                                name="storeLink"
                                value={storeData.storeLink}
                                onChange={handleLinkChange}
                                placeholder="zara-stitches" 
                                className="w-full pl-3 pr-10 py-4 bg-transparent focus:outline-none font-bold text-gray-900 text-sm sm:text-base" 
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                 {linkStatus === "checking" && <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />}
                                 {linkStatus === "available" && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                                 {linkStatus === "unavailable" && <XCircle className="w-5 h-5 text-red-500" />}
                              </div>
                           </div>
                        </div>
                        <div className="mt-2 h-4">
                           {linkStatus === "available" && <p className="text-xs font-bold text-emerald-600">{linkMessage}</p>}
                           {linkStatus === "unavailable" && <p className="text-xs font-bold text-red-500">{linkMessage}</p>}
                           {linkStatus === "idle" && storeData.storeLink && <p className="text-xs font-medium text-gray-500">This will be your public shop link.</p>}
                        </div>
                     </div>

                     {/* Custom Store Type Dropdown */}
                     <div ref={dropdownRef} className="relative z-50 lg:col-span-2">
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

                     {/* About the Store Input */}
                     <div className="lg:col-span-2">
                        <label className="block text-sm font-bold text-gray-900 mb-2">About the Store</label>
                        <div className="relative">
                           <div className="absolute top-4 left-4 flex items-center pointer-events-none">
                              <AlignLeft className="w-5 h-5 text-emerald-700" />
                           </div>
                           <textarea 
                             rows="4"
                             name="storeDescription"
                             value={storeData.storeDescription}
                             onChange={handleStoreChange}
                             placeholder="Briefly describe what you sell, your brand story, or what makes your store unique..."
                             className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-gray-700 text-sm sm:text-base resize-none leading-relaxed"
                           ></textarea>
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
                        
                        <label className="border-2 border-dashed border-emerald-200 bg-emerald-50/50 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left relative overflow-hidden group cursor-pointer transition-colors hover:bg-emerald-50">
                           <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                           
                           {logoPreview ? (
                              <img src={logoPreview} alt="Logo Preview" className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover shadow-xl shrink-0 relative z-10 border-4 border-white" />
                           ) : (
                              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-[#044e3b] flex flex-col items-center justify-center text-white shadow-xl shrink-0 relative z-10 border-4 border-white">
                                 <span className="font-bold text-3xl italic leading-none">{storeData.storeName ? storeData.storeName.substring(0, 2).toUpperCase() : "ZA"}</span>
                              </div>
                           )}
                           
                           <div className="flex flex-col items-center sm:items-start relative z-10">
                              <div className="flex items-center justify-center gap-2 bg-white px-5 py-3 rounded-full border border-emerald-100 shadow-sm mb-3 group-hover:bg-gray-50 transition-colors">
                                 <Upload className="w-5 h-5 text-[#044e3b]" />
                                 <span className="text-sm font-bold text-gray-900">{logoFile ? "Change Logo" : "Tap to upload logo"}</span>
                              </div>
                              <p className="text-[11px] font-medium text-gray-500">PNG, JPG strictly up to 2MB</p>
                           </div>
                        </label>
                     </div>

                     {/* Tips Card */}
                     <div className="lg:col-span-5 bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 lg:h-full flex flex-col justify-center border border-gray-100 shadow-sm">
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
                              <span>Keep file sizes under 2MB for fast loading times.</span>
                           </li>
                        </ul>
                     </div>

                  </div>
               </div>
             )}

             {/* STEP 3: ADD PRODUCT & PREVIEW */}
             {step === 3 && (
               <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                  <div className="mb-8">
                     <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Add Your First Product</h2>
                     <p className="text-sm sm:text-base font-medium text-gray-500">Let's add one product to get your store ready for customers.</p>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
                     
                     {/* LEFT COLUMN: Input Form */}
                     <div className="xl:col-span-7 space-y-6">
                        
                        {/* Product Photo */}
                        <div>
                           <label className="block text-sm font-bold text-gray-900 mb-3">Product Photo (Max 2MB)</label>
                           <div className="flex flex-wrap gap-4">
                              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-5xl shrink-0 overflow-hidden shadow-sm">
                                 👕
                              </div>
                              <label className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl border-2 border-dashed border-gray-300 bg-white hover:bg-gray-50 flex flex-col items-center justify-center gap-2 transition-colors shrink-0 cursor-pointer overflow-hidden relative group">
                                 <input type="file" accept="image/*" className="hidden" onChange={handleProductPhotoChange} />
                                 {productPreview ? (
                                   <img src={productPreview} alt="Product Preview" className="w-full h-full object-cover" />
                                 ) : (
                                   <>
                                     <ImageIcon className="w-8 h-8 text-emerald-700 group-hover:scale-110 transition-transform" />
                                     <span className="text-xs font-bold text-emerald-800">Add Photo</span>
                                   </>
                                 )}
                              </label>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                           {/* Product Name */}
                           <div className="sm:col-span-1">
                              <label className="block text-sm font-bold text-gray-900 mb-2">Product Name</label>
                              <div className="relative">
                                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Tag className="w-5 h-5 text-gray-400" />
                                 </div>
                                 <input 
                                   type="text" 
                                   name="name"
                                   value={productData.name}
                                   onChange={handleProductChange}
                                   placeholder="e.g. Ankara Print Shirt"
                                   className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-gray-900 text-sm sm:text-base" 
                                 />
                              </div>
                           </div>

                           {/* Price */}
                           <div className="sm:col-span-1">
                              <label className="block text-sm font-bold text-gray-900 mb-2">Price (₦)</label>
                              <div className="relative">
                                 <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <span className="font-extrabold text-gray-900 text-base">₦</span>
                                 </div>
                                 <input 
                                   type="text" 
                                   name="price"
                                   value={productData.price}
                                   onChange={handleProductChange}
                                   placeholder="e.g. 15000"
                                   className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-gray-900 text-sm sm:text-base" 
                                 />
                              </div>
                           </div>
                        </div>

                        {/* Product Description */}
                        <div>
                           <label className="block text-sm font-bold text-gray-900 mb-2">Product Description</label>
                           <div className="relative">
                              <div className="absolute top-4 left-4 flex items-center pointer-events-none">
                                 <AlignLeft className="w-5 h-5 text-gray-400" />
                              </div>
                              <textarea 
                                rows="3"
                                name="description"
                                value={productData.description}
                                onChange={handleProductChange}
                                placeholder="e.g. A beautiful, premium quality Ankara print shirt perfect for casual outings and special events."
                                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-gray-700 text-sm sm:text-base resize-none leading-relaxed"
                              ></textarea>
                           </div>
                        </div>
                     </div>

                     {/* RIGHT COLUMN: Live Summary & Info */}
                     <div className="xl:col-span-5 flex flex-col gap-6">
                        
                        {/* Info Box */}
                        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex flex-col gap-3 shadow-sm">
                           <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                <Lightbulb className="w-4 h-4 text-blue-600" />
                              </div>
                              <h4 className="font-extrabold text-blue-900 text-base">Quick Add Setup</h4>
                           </div>
                           <p className="text-sm font-medium text-blue-800/90 leading-relaxed">
                             This is a quick setup to get your first product online immediately. Once you launch your store, you can head to the <strong>Products</strong> tab in your dashboard to add multiple images, categorize your items, set up variants, and track inventory!
                           </p>
                        </div>

                        {/* Live Preview Card */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-md">
                           <div className="flex items-center justify-between mb-4">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Preview</p>
                              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                           </div>
                           
                           <div className="flex items-center gap-4">
                              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#F5F2ED] border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                                 {productPreview ? (
                                    <img src={productPreview} alt="Preview" className="w-full h-full object-cover" />
                                 ) : (
                                    <ImageIcon className="w-6 h-6 text-gray-300" />
                                 )}
                              </div>
                              <div className="flex-1">
                                 <h4 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-1">{productData.name || "Product Name"}</h4>
                                 <p className="font-extrabold text-emerald-700 text-sm mt-0.5">
                                    ₦{productData.price ? Number(productData.price.replace(/,/g, '')).toLocaleString() : "0"}
                                 </p>
                                 <p className="text-[11px] sm:text-xs font-medium text-gray-500 mt-1 line-clamp-2 leading-tight">
                                    {productData.description || "Your product description will appear here..."}
                                 </p>
                              </div>
                           </div>
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
                  <button 
                    onClick={nextStep} 
                    disabled={linkStatus === "checking" || linkStatus === "unavailable"}
                    className="w-full sm:w-auto px-8 py-4 bg-[#044e3b] hover:bg-[#033c2d] text-white rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     Continue to Logo Upload <ArrowRight className="w-5 h-5" />
                  </button>
               </div>
             )}

             {step === 2 && (
               <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
                 <button onClick={prevStep} className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-2xl font-bold transition-all flex items-center justify-center text-sm sm:text-base cursor-pointer">
                    <ArrowLeft className="w-5 h-5 sm:mr-2" /> <span className="ml-2 sm:ml-0">Back</span>
                 </button>
                 <button onClick={nextStep} className="w-full sm:w-auto px-8 py-4 bg-[#044e3b] hover:bg-[#033c2d] text-white rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer">
                    Continue to First Product <ArrowRight className="w-5 h-5" />
                 </button>
               </div>
             )}

             {step === 3 && (
               <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
                 <button onClick={prevStep} disabled={isLoading} className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-2xl font-bold transition-all flex items-center justify-center text-sm sm:text-base disabled:opacity-50 cursor-pointer">
                    <ArrowLeft className="w-5 h-5 sm:mr-2" /> <span className="ml-2 sm:ml-0">Back</span>
                 </button>
                 <button onClick={handleLaunch} disabled={isLoading} className="w-full sm:w-auto px-10 py-4 bg-[#044e3b] hover:bg-[#033c2d] text-white rounded-2xl font-bold transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 text-sm sm:text-base disabled:opacity-70 cursor-pointer">
                    {isLoading ? (
                      <>Processing <Loader2 className="w-5 h-5 animate-spin" /></>
                    ) : (
                      <>Launch My Store <Rocket className="w-6 h-6" /></>
                    )}
                 </button>
               </div>
             )}
          </div>
        </div>

        {/* Footer Banner */}
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
           </div>
        </div>

      </div>
    </div>
  );
};

export default VendorOnboarding;