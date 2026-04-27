import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag, Building2, Phone, CreditCard, Truck, Palette,
  ChevronDown, Check, Copy, ChevronRight, Settings as SettingsIcon,
  Loader2, Save, AlertCircle, CheckCircle2, Lock, Star,
  ArrowLeft, MessageCircle, Mail, Image as ImageIcon,
  ExternalLink, Camera, Landmark, Wallet, Globe, XCircle, Eye
} from "lucide-react";
import api from '../../utils/api';

const Settings = () => {
  const [activeView, setActiveView] = useState("store-info");
  const [mobileView, setMobileView] = useState("menu");
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  const [isStoreOnline, setIsStoreOnline] = useState(true);
  const [linkStatus, setLinkStatus] = useState("idle"); 
  const [linkMessage, setLinkMessage] = useState("");

  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const vendor = JSON.parse(localStorage.getItem('sabisell_vendor') || '{}');
  const currentPlan = vendor.plan || "FREE";
  const isPremium = currentPlan === "STARTER" || currentPlan === "GROWTH";

  const [formData, setFormData] = useState({
    storeName: "",
    storeCategory: "Fashion & Clothing",
    storeDescription: "",
    storeLink: "",
    phone: "",
    whatsapp: "",
    email: "",
    instagram: "",
    facebook: "",
    twitter: "",
    themeColor: "#044e3b",
    hasBanner: false,
    bannerSubtitle: "",
    bannerTitle: "",
    bannerDiscount: "",
    businessName: "",
    cacNumber: "",
    businessAddress: "",
    showBusinessDetails: false, 
    bankName: "",
    accountNumber: "",
    accountName: "",
    deliveryFee: "",
    deliveryTime: "2-3 Business Days"
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");

  const themeColors = [
    { name: "Sabi Green", hex: "#044e3b" },
    { name: "Midnight Black", hex: "#111827" },
    { name: "Ocean Blue", hex: "#1e3a8a" },
    { name: "Rose Pink", hex: "#be185d" },
    { name: "Royal Purple", hex: "#6b21a8" },
    { name: "Sunset Orange", hex: "#c2410c" },
    { name: "Crimson Red", hex: "#dc2626" },
    { name: "Amber Gold", hex: "#d97706" },
    { name: "Teal Glow", hex: "#0f766e" },
    { name: "Slate Gray", hex: "#475569" },
    { name: "Coffee Brown", hex: "#78350f" },
    { name: "Cyan Pop", hex: "#0e7490" }
  ];

  const settingsMenu = [
    { id: "store-info", icon: ShoppingBag, title: "Store Information", desc: "Name, category, description", color: "text-emerald-600 bg-emerald-50" },
    { id: "contact", icon: Phone, title: "Contact & Social", desc: "Phone, WhatsApp, Links", color: "text-blue-600 bg-blue-50" },
    { id: "appearance", icon: Palette, title: "Store Appearance", desc: "Banner, colors, theme", color: "text-purple-600 bg-purple-50" },
    { id: "business", icon: Building2, title: "Business Details", desc: "Legal name, address", color: "text-gray-600 bg-gray-50" },
    { id: "payments", icon: CreditCard, title: "Payment Methods", desc: "Bank details, payouts", color: "text-orange-600 bg-orange-50" },
    { id: "delivery", icon: Truck, title: "Delivery & Shipping", desc: "Fees, timeframes", color: "text-indigo-600 bg-indigo-50" },
  ];

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get('/vendors/profile'); 
        const data = response.data.vendor;
        
        setFormData({
          ...formData,
          ...data,
          storeCategory: data.storeCategory || "Fashion & Clothing",
          themeColor: data.themeColor || "#044e3b",
          deliveryTime: data.deliveryTime || "2-3 Business Days",
          showBusinessDetails: data.showBusinessDetails ?? false
        });
        
        setIsStoreOnline(data.isOnline ?? true);
        if (data.logoUrl) setLogoPreview(data.logoUrl);
        if (data.bannerImage) setBannerPreview(data.bannerImage);
      } catch (err) {
        setFormData(prev => ({ ...prev, storeName: vendor.storeName || "My Store", storeLink: vendor.storeLink || "my-store" }));
        if (vendor.logoUrl) setLogoPreview(vendor.logoUrl);
      } finally {
        setIsFetching(false);
      }
    };
    fetchSettings();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!formData.storeLink) {
      setLinkStatus("idle");
      setLinkMessage("");
      return;
    }

    if (formData.storeLink === vendor.storeLink) {
      setLinkStatus("available");
      setLinkMessage("This is your current active link.");
      return;
    }

    setLinkStatus("checking");
    
    const debounceTimer = setTimeout(async () => {
      try {
        const response = await api.get(`/vendors/check-link?slug=${formData.storeLink}`);
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
  }, [formData.storeLink, vendor.storeLink]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    
    if (e.target.name === "storeLink") {
      const formatted = value.toLowerCase().replace(/[^a-z0-9-]+/g, '');
      setFormData({ ...formData, storeLink: formatted });
    } else {
      setFormData({ ...formData, [e.target.name]: value });
    }
    setMessage({ type: "", text: "" });
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: "error", text: "Image is too large. Max size is 2MB." });
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    if (type === "logo") {
      setLogoFile(file);
      setLogoPreview(previewUrl);
    } else {
      setBannerFile(file);
      setBannerPreview(previewUrl);
    }
  };

  const handleSubmit = async () => {
    if (linkStatus === "unavailable" || linkStatus === "checking") {
      setMessage({ type: "error", text: "Please fix your store link before saving." });
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      
      data.append("isOnline", isStoreOnline);

      if (logoFile) data.append("logo", logoFile);
      if (bannerFile) data.append("bannerImage", bannerFile);

      const response = await api.put('/vendors/settings', data);

      const updatedVendor = { ...vendor, ...response.data.vendor };
      localStorage.setItem('sabisell_vendor', JSON.stringify(updatedVendor));
      window.dispatchEvent(new Event("storage"));

      setMessage({ type: "success", text: "Settings saved successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      
      const detailContainer = document.getElementById("detail-scroll-area");
      if (detailContainer) detailContainer.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to save settings." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
    setMobileView("detail"); 
    setMessage({ type: "", text: "" });
    
    const detailContainer = document.getElementById("detail-scroll-area");
    if (detailContainer) detailContainer.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isFetching) return <div className="flex justify-center py-32"><Loader2 className="w-8 h-8 animate-spin text-[#044e3b]" /></div>;

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-32 sm:pb-12 w-full bg-gray-50/50">
      <div className="w-full max-w-7xl mx-auto h-full flex flex-col lg:flex-row gap-6 lg:gap-8 animate-in fade-in duration-300 items-start">
        
        {/* ========================================== */}
        {/* LEFT COLUMN: MASTER MENU                   */}
        {/* ========================================== */}
        <div className={`w-full lg:w-96 xl:w-105 shrink-0 flex-col gap-6 ${mobileView === "detail" ? "hidden lg:flex" : "flex"}`}>
          <h1 className="text-2xl font-extrabold text-gray-900 hidden lg:block">Store Settings</h1>

          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#044e3b] rounded-xl flex flex-col items-center justify-center text-white border-2 border-emerald-50 shadow-sm shrink-0 overflow-hidden relative">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-xl italic leading-none">{formData.storeName ? formData.storeName.substring(0,2).toUpperCase() : "ST"}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base leading-tight truncate">
                    {formData.storeName || "My Store"}
                  </h3>
                  <div className={`flex items-center gap-1.5 px-2 py-0.5 mt-1.5 rounded-md w-fit border ${isStoreOnline ? 'bg-emerald-50 border-emerald-100' : 'bg-gray-100 border-gray-200'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isStoreOnline ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></div>
                    <span className={`text-[10px] font-bold ${isStoreOnline ? 'text-emerald-700' : 'text-gray-600'}`}>
                      {isStoreOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out shrink-0 ${isStoreOnline ? "bg-[#044e3b]" : "bg-gray-300"}`} onClick={() => setIsStoreOnline(!isStoreOnline)}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${isStoreOnline ? "translate-x-6" : "translate-x-0"}`}></div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
               <p className="text-xs font-medium text-gray-500 truncate max-w-[180px]">
                 {formData.storeLink}.sabisell.com
               </p>
               <a 
                 href={`/${formData.storeLink}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#044e3b] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0"
               >
                 <ExternalLink className="w-3.5 h-3.5" /> View Store
               </a>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
            {settingsMenu.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between p-4 transition-colors hover:bg-gray-50 ${activeView === item.id ? "bg-gray-50 lg:border-l-4 border-[#044e3b]" : "border-l-4 border-transparent"}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-bold text-sm truncate ${activeView === item.id ? 'text-[#044e3b]' : 'text-gray-900'}`}>{item.title}</h4>
                    </div>
                    <p className="text-[11px] font-medium text-gray-500 truncate">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* RIGHT COLUMN: DETAIL VIEW                  */}
        {/* ========================================== */}
        <div className={`w-full flex-1 flex-col bg-white rounded-3xl lg:rounded-[2rem] border border-gray-200 shadow-sm ${mobileView === "menu" ? "hidden lg:flex" : "flex"} sm:mx-0 h-[calc(100vh-8rem)] lg:h-auto lg:min-h-[700px]`}>
          
          <div className="h-16 sm:h-20 border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 bg-white rounded-t-3xl lg:rounded-t-[2rem] shrink-0 z-20">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileView("menu")} className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2">
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                {settingsMenu.find((s) => s.id === activeView)?.title || "Settings"}
              </h2>
            </div>
            <button onClick={handleSubmit} disabled={isLoading || linkStatus === "checking" || linkStatus === "unavailable"} className="text-sm font-bold bg-[#044e3b] text-white px-5 py-2.5 rounded-xl hover:bg-emerald-800 transition-colors flex items-center gap-2 disabled:opacity-70 shadow-sm">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span className="hidden sm:block">Save Changes</span>
              <span className="sm:hidden">Save</span>
            </button>
          </div>

          {/* ADDED HUGE PADDING BOTTOM (pb-32) TO PREVENT OVERLAP WITH MOBILE BOTTOM NAV */}
          <div id="detail-scroll-area" className="flex-1 overflow-y-auto p-4 sm:p-8 pb-32 sm:pb-12 hide-scrollbar">
            
            {message.text && (
              <div className={`mb-6 p-4 rounded-2xl flex items-start gap-3 ${message.type === 'error' ? 'bg-red-50 border border-red-200' : 'bg-emerald-50 border border-emerald-200'}`}>
                {message.type === 'error' ? <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /> : <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />}
                <p className={`text-sm font-bold ${message.type === 'error' ? 'text-red-800' : 'text-emerald-800'}`}>{message.text}</p>
              </div>
            )}

            {/* ------------------------------------------------ */}
            {/* VIEW 1: STORE INFO                               */}
            {/* ------------------------------------------------ */}
            {activeView === "store-info" && (
              <div className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-right-4 duration-300">
                
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3">Store Logo</h3>
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 rounded-full bg-[#044e3b] flex flex-col items-center justify-center text-white border-4 border-emerald-50 shadow-sm shrink-0 overflow-hidden">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <ShoppingBag className="w-8 h-8 text-emerald-100" />
                      )}
                    </div>
                    <input type="file" accept="image/*" ref={logoInputRef} onChange={(e) => handleImageChange(e, "logo")} className="hidden" />
                    <button onClick={() => logoInputRef.current?.click()} className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center gap-1 transition-colors shrink-0">
                      <Camera className="w-6 h-6 text-gray-400" />
                      <span className="text-[10px] font-bold text-gray-700">Upload Logo</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-2">Store Name <span className="text-red-500">*</span></label>
                    <input type="text" name="storeName" value={formData.storeName} onChange={handleChange} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#044e3b]/20 focus:border-[#044e3b] transition-all font-bold text-gray-900" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-2">Custom Store Link <span className="text-red-500">*</span></label>
                    <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-[#044e3b]/20 focus-within:border-[#044e3b] transition-all">
                      <div className="bg-gray-50 border-r border-gray-200 px-3 sm:px-4 flex items-center text-gray-500 font-bold text-xs sm:text-sm shrink-0">sabisell.com/</div>
                      <div className="relative flex-1">
                        <input type="text" name="storeLink" value={formData.storeLink} onChange={handleChange} className="w-full px-3 pr-10 py-3.5 focus:outline-none font-bold text-gray-900 text-sm sm:text-base" />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                           {linkStatus === "checking" && <Loader2 className="w-4 h-4 text-[#044e3b] animate-spin" />}
                           {linkStatus === "available" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                           {linkStatus === "unavailable" && <XCircle className="w-4 h-4 text-red-500" />}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 h-4">
                       {linkStatus === "available" && <p className="text-xs font-bold text-emerald-600">{linkMessage}</p>}
                       {linkStatus === "unavailable" && <p className="text-xs font-bold text-red-500">{linkMessage}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-2">Store Category</label>
                    <div className="relative">
                      <select name="storeCategory" value={formData.storeCategory} onChange={handleChange} className="w-full pl-4 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#044e3b]/20 focus:border-[#044e3b] transition-all font-bold text-gray-900 appearance-none">
                        <option>Fashion & Clothing</option>
                        <option>Electronics</option>
                        <option>Health & Beauty</option>
                        <option>Food & Groceries</option>
                        <option>Home & Furniture</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Store Description</label>
                  <textarea rows="4" name="storeDescription" value={formData.storeDescription} onChange={handleChange} placeholder="Briefly describe what you sell..." className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#044e3b]/20 focus:border-[#044e3b] transition-all font-medium text-gray-700 resize-none leading-relaxed"></textarea>
                </div>
              </div>
            )}

            {/* ------------------------------------------------ */}
            {/* VIEW 2: CONTACT & SOCIAL                         */}
            {/* ------------------------------------------------ */}
            {activeView === "contact" && (
              <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-medium text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Support Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-medium text-gray-900" />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100 my-6" />
                <h3 className="text-sm font-bold text-gray-900 mb-4">Social Media & Chat Links</h3>

                <div className="space-y-4">
                  <div className="relative">
                    <MessageCircle className="absolute left-4 top-3.5 w-5 h-5 text-green-500" />
                    <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp Number (e.g. +23480123...)" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-medium text-gray-900" />
                  </div>
                  <div className="relative">
                    IG
                    <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="Instagram Handle or Link" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-medium text-gray-900" />
                  </div>
                  <div className="relative">
                    FB
                    <input type="text" name="facebook" value={formData.facebook} onChange={handleChange} placeholder="Facebook Page Link" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-medium text-gray-900" />
                  </div>
                  <div className="relative">
                    X
                    <input type="text" name="twitter" value={formData.twitter} onChange={handleChange} placeholder="Twitter / X Handle" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-medium text-gray-900" />
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------ */}
            {/* VIEW 3: STORE APPEARANCE                         */}
            {/* ------------------------------------------------ */}
            {activeView === "appearance" && (
              <div className="space-y-10 max-w-2xl animate-in fade-in slide-in-from-right-4 duration-300">
                
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Brand Theme Color</h3>
                  <p className="text-xs font-medium text-gray-500 mb-4">Choose the primary accent color for your storefront buttons.</p>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    {themeColors.map(color => (
                      <button 
                        key={color.hex} 
                        type="button"
                        onClick={() => setFormData({ ...formData, themeColor: color.hex })}
                        className={`w-10 h-10 rounded-full border-2 transition-transform ${formData.themeColor === color.hex ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent hover:scale-105'}`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {formData.themeColor === color.hex && <Check className="w-5 h-5 text-white mx-auto drop-shadow-md" />}
                      </button>
                    ))}
                    <div className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1 bg-gray-50 sm:ml-2 shadow-sm mt-2 sm:mt-0">
                       <span className="text-xs font-bold text-gray-500">HEX:</span>
                       <input type="text" name="themeColor" value={formData.themeColor} onChange={handleChange} className="w-16 bg-transparent text-xs font-bold text-gray-900 focus:outline-none uppercase" />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div className="relative">
                  {!isPremium && (
                    <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-6 rounded-3xl border border-gray-100 mt-4">
                      <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-3 border border-yellow-200 shadow-sm">
                        <Lock className="w-6 h-6 text-yellow-600" />
                      </div>
                      <h4 className="text-base font-extrabold text-gray-900 drop-shadow-sm bg-white/80 px-2 py-0.5 rounded">Unlock Promo Banners</h4>
                      <p className="text-xs font-bold text-gray-800 mt-1 mb-4 max-w-xs bg-white/80 px-3 py-1.5 rounded-lg shadow-sm">
                        Upgrade to Starter to add customizable hero banners and run sales campaigns on your store.
                      </p>
                      <Link to="/dashboard/billing" className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 hover:scale-105">
                        <Star className="w-4 h-4 fill-white" /> Upgrade Plan
                      </Link>
                    </div>
                  )}

                  <div className={`border border-gray-200 rounded-3xl p-6 bg-gray-50/50 ${!isPremium ? 'opacity-70 pointer-events-none select-none' : ''}`}>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-sm font-extrabold text-gray-900">Promotional Hero Banner</h3>
                        <p className="text-xs font-medium text-gray-500 mt-0.5">Display a marketing banner at the top of your store.</p>
                      </div>
                      <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out shrink-0 ${formData.hasBanner ? "bg-[#044e3b]" : "bg-gray-300"}`} onClick={() => isPremium && setFormData({ ...formData, hasBanner: !formData.hasBanner })}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${formData.hasBanner ? "translate-x-6" : "translate-x-0"}`}></div>
                      </div>
                    </div>

                    <div className="space-y-5">
                      {!isPremium && !bannerPreview && (
                         <div className="w-full h-32 rounded-xl overflow-hidden relative mb-4">
                            <img src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80" alt="Preview" className="w-full h-full object-cover opacity-80" />
                            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6">
                               <span className="text-white text-xs font-bold bg-white/20 w-fit px-2 py-1 rounded backdrop-blur-md mb-1">New Arrivals</span>
                               <span className="text-white text-xl font-extrabold">Eid Collection<br/>Now Live</span>
                            </div>
                         </div>
                      )}

                      {(isPremium || bannerPreview) && (
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2">Background Image</label>
                          <input type="file" accept="image/*" ref={bannerInputRef} onChange={(e) => handleImageChange(e, "banner")} className="hidden" disabled={!isPremium}/>
                          
                          {bannerPreview ? (
                             <div className="relative w-full h-32 rounded-xl overflow-hidden group">
                                <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <button type="button" onClick={() => bannerInputRef.current?.click()} className="bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-lg">Change Image</button>
                                </div>
                             </div>
                          ) : (
                            <button type="button" onClick={() => bannerInputRef.current?.click()} disabled={!isPremium} className="w-full h-24 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:bg-gray-50 flex flex-col items-center justify-center gap-1 transition-colors">
                              <ImageIcon className="w-5 h-5 text-gray-400" />
                              <span className="text-xs font-bold text-gray-500">Upload Background</span>
                            </button>
                          )}
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">Banner Title</label>
                        <input type="text" name="bannerTitle" value={formData.bannerTitle} onChange={handleChange} placeholder="e.g. Eid Collection Now Live!" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-bold text-gray-900 text-sm" disabled={!isPremium}/>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2">Subtitle</label>
                          <input type="text" name="bannerSubtitle" value={formData.bannerSubtitle} onChange={handleChange} placeholder="e.g. Fresh styles." className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-medium text-sm" disabled={!isPremium}/>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2">Discount Text</label>
                          <input type="text" name="bannerDiscount" value={formData.bannerDiscount} onChange={handleChange} placeholder="e.g. -20% OFF" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-bold text-yellow-600 text-sm" disabled={!isPremium}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------ */}
            {/* VIEW 4: BUSINESS DETAILS                         */}
            {/* ------------------------------------------------ */}
            {activeView === "business" && (
              <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-5">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-gray-500" /> Legal Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Legal Business Name</label>
                    <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="e.g. Zara Stitches Ltd." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-bold text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">CAC Registration Number (Optional)</label>
                    <input type="text" name="cacNumber" value={formData.cacNumber} onChange={handleChange} placeholder="e.g. RC 1234567" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-medium text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Business / Physical Address</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <textarea rows="3" name="businessAddress" value={formData.businessAddress} onChange={handleChange} placeholder="123 Market Street, Lagos" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-medium text-gray-900 resize-none"></textarea>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between mt-6 cursor-pointer" onClick={() => setFormData({...formData, showBusinessDetails: !formData.showBusinessDetails})}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                        <Eye className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">Public Business Details</h4>
                        <p className="text-xs font-medium text-gray-500">Show address and CAC number on your storefront footer.</p>
                      </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 ${formData.showBusinessDetails ? 'bg-blue-600' : 'bg-gray-300'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${formData.showBusinessDetails ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ------------------------------------------------ */}
            {/* VIEW 5: PAYMENT METHODS                          */}
            {/* ------------------------------------------------ */}
            {activeView === "payments" && (
              <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-right-4 duration-300">
                
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-5">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2 flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-orange-500" /> Bank Account for Payouts
                  </h3>
                  <p className="text-xs font-medium text-gray-500 mb-4">This is where your funds from online sales will be sent.</p>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Bank Name</label>
                    <div className="relative">
                      <select name="bankName" value={formData.bankName} onChange={handleChange} className="w-full pl-4 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-gray-900 appearance-none">
                        <option value="">Select a Bank</option>
                        <option>Access Bank</option>
                        <option>Guaranty Trust Bank (GTB)</option>
                        <option>First Bank of Nigeria</option>
                        <option>Zenith Bank</option>
                        <option>United Bank for Africa (UBA)</option>
                        <option>Moniepoint Microfinance Bank</option>
                        <option>Opay</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Account Number</label>
                      <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="0123456789" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-orange-500 font-bold text-gray-900 tracking-widest" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Account Name</label>
                      <input type="text" name="accountName" value={formData.accountName} onChange={handleChange} placeholder="Zara Stitches Ltd" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-orange-500 font-bold text-gray-900" />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                   <div className="flex items-center gap-3">
                     <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                       <Wallet className="w-6 h-6 text-blue-600" />
                     </div>
                     <div>
                       <h4 className="text-sm font-bold text-gray-900">Accept Online Payments</h4>
                       <p className="text-xs font-medium text-gray-500 mt-0.5">Let customers pay securely via Paystack.</p>
                     </div>
                   </div>
                   <button type="button" className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors whitespace-nowrap">
                     Connect Paystack
                   </button>
                </div>
              </div>
            )}

            {/* ------------------------------------------------ */}
            {/* VIEW 6: DELIVERY & SHIPPING                      */}
            {/* ------------------------------------------------ */}
            {activeView === "delivery" && (
              <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-right-4 duration-300">
                
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-5">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-indigo-500" /> Delivery Settings
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Default Delivery Fee (₦)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="font-extrabold text-gray-500">₦</span>
                      </div>
                      <input type="number" name="deliveryFee" value={formData.deliveryFee} onChange={handleChange} placeholder="e.g. 2500" className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-indigo-500 font-bold text-gray-900" />
                    </div>
                    <p className="text-xs font-medium text-gray-500 mt-1.5">Leave blank if you negotiate delivery on WhatsApp.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Estimated Delivery Time</label>
                    <div className="relative">
                      <select name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} className="w-full pl-4 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-gray-900 appearance-none">
                        <option>Same Day Delivery</option>
                        <option>1-2 Business Days</option>
                        <option>2-3 Business Days</option>
                        <option>3-5 Business Days</option>
                        <option>7+ Days (Pre-orders)</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {!isPremium && (
                  <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                     <div>
                       <h4 className="text-sm font-bold text-indigo-900 mb-1">Advanced Delivery Rules</h4>
                       <p className="text-xs font-medium text-indigo-700 max-w-sm">
                         Upgrade to Starter to set specific delivery prices for different states or offer "Free Delivery" thresholds.
                       </p>
                     </div>
                     <Link to="/dashboard/billing" className="text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl shadow-sm transition-colors whitespace-nowrap shrink-0">
                       Upgrade Plan
                     </Link>
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------ */}
            {/* FALLBACK FOR UNIMPLEMENTED TABS                  */}
            {/* ------------------------------------------------ */}
            {!["store-info", "contact", "appearance", "business", "payments", "delivery"].includes(activeView) && (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mb-4">
                  <SettingsIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Coming Soon</h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  The settings configuration for <span className="font-bold">{settingsMenu.find((s) => s.id === activeView)?.title}</span> is currently under construction.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;