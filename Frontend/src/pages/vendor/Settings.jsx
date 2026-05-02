import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag, Building2, Phone, CreditCard, Truck, Palette,
  ChevronDown, Check, Plus, ChevronRight, Settings as SettingsIcon,
  Loader2, Save, AlertCircle, CheckCircle2, Lock, Star,
  MessageCircle, Mail, Image as ImageIcon,
  ExternalLink, Camera, Landmark, Wallet, Globe, XCircle, Eye, ArrowLeft, RefreshCw, Trash2
} from "lucide-react";
import FB from "../../assets/social icons/facebook.svg";
import IG from "../../assets/social icons/instagram.svg";
import X from "../../assets/social icons/x.svg";
import api from '../../utils/api';

const Settings = () => {
  const [activeView, setActiveView] = useState("menu"); 
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  const [isStoreOnline, setIsStoreOnline] = useState(true);
  const [linkStatus, setLinkStatus] = useState("idle"); 
  const [linkMessage, setLinkMessage] = useState("");
  
  const [sameAsWhatsApp, setSameAsWhatsApp] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  
  const slide1Ref = useRef(null);
  const slide2Ref = useRef(null);
  const slide3Ref = useRef(null);
  const secondaryBannerRef = useRef(null);

  const vendor = JSON.parse(localStorage.getItem('sabisell_vendor') || '{}');
 const [currentPlan, setCurrentPlan] = useState(vendor.plan || "FREE");
  
  const canEditBanner = currentPlan === "STARTER" || currentPlan === "GROWTH";
  const canUseSlideshow = currentPlan === "STARTER" || currentPlan === "GROWTH";
  const canEditTheme = currentPlan === "GROWTH";
  const canUseSecondaryBanner = currentPlan === "GROWTH";

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
    tiktok: "",   
    snapchat: "", 
    themeColor: "#044e3b",
    
    hasBanner: false,
    bannerSubtitle: "",
    bannerTitle: "",
    bannerDiscount: "",
    enableSlideshow: false,
    
    enableSecondaryBanner: false,
    secondaryBannerTitle: "",
    secondaryBannerDesc: "",
    
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
  
  const [slide1File, setSlide1File] = useState(null);
  const [slide1Preview, setSlide1Preview] = useState("");
  const [slide2File, setSlide2File] = useState(null);
  const [slide2Preview, setSlide2Preview] = useState("");
  const [slide3File, setSlide3File] = useState(null);
  const [slide3Preview, setSlide3Preview] = useState("");
  
  const [secondaryBannerFile, setSecondaryBannerFile] = useState(null);
  const [secondaryBannerPreview, setSecondaryBannerPreview] = useState("");

  const themeColors = [
    { name: "Sabi Green", hex: "#044e3b" }, { name: "Midnight Black", hex: "#111827" },
    { name: "Ocean Blue", hex: "#1e3a8a" }, { name: "Rose Pink", hex: "#be185d" },
    { name: "Royal Purple", hex: "#6b21a8" }, { name: "Sunset Orange", hex: "#c2410c" },
    { name: "Crimson Red", hex: "#dc2626" }, { name: "Amber Gold", hex: "#d97706" },
    { name: "Teal Glow", hex: "#0f766e" }, { name: "Slate Gray", hex: "#475569" },
    { name: "Coffee Brown", hex: "#78350f" }, { name: "Cyan Pop", hex: "#0e7490" }
  ];

  const settingsMenu = [
    { id: "store-info", icon: ShoppingBag, title: "Store Information", desc: "Name, category, link", color: "text-emerald-600 bg-emerald-50", border: "hover:border-emerald-200" },
    { id: "appearance", icon: Palette, title: "Store Appearance", desc: "Logo, banner, themes", color: "text-purple-600 bg-purple-50", border: "hover:border-purple-200" },
    { id: "contact", icon: Phone, title: "Contact & Social", desc: "WhatsApp, Instagram", color: "text-blue-600 bg-blue-50", border: "hover:border-blue-200" },
    { id: "business", icon: Building2, title: "Business Details", desc: "Legal name, address", color: "text-gray-600 bg-gray-100", border: "hover:border-gray-300" },
    { id: "payments", icon: CreditCard, title: "Payment Methods", desc: "Bank details, Paystack", color: "text-orange-600 bg-orange-50", border: "hover:border-orange-200" },
    { id: "delivery", icon: Truck, title: "Delivery & Shipping", desc: "Coming soon", color: "text-indigo-600 bg-indigo-50", border: "hover:border-indigo-200" },
  ];

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get('/vendors/profile'); 
        const data = response.data.vendor;

        setCurrentPlan(data.plan || "FREE"); 
        
        // 2. Silently update local storage so it stays perfectly synced with the DB
        localStorage.setItem('sabisell_vendor', JSON.stringify({ ...vendor, ...data }));
        
        // Helper function to prevent literal "null" strings
        const cleanString = (val) => (val && val !== "null") ? val : "";

        setFormData({
          storeName: cleanString(data.storeName),
          storeCategory: cleanString(data.storeCategory) || "Fashion & Clothing",
          storeDescription: cleanString(data.storeDescription),
          storeLink: cleanString(data.storeLink),
          phone: cleanString(data.phone),
          whatsapp: cleanString(data.whatsapp),
          email: cleanString(data.email),
          instagram: cleanString(data.instagram),
          facebook: cleanString(data.facebook),
          twitter: cleanString(data.twitter),
          tiktok: cleanString(data.tiktok),     
          snapchat: cleanString(data.snapchat), 
          themeColor: data.themeColor || "#044e3b",
          
          hasBanner: data.hasBanner ?? true,
          bannerTitle: cleanString(data.bannerTitle),
          bannerSubtitle: cleanString(data.bannerSubtitle),
          bannerDiscount: cleanString(data.bannerDiscount),
          enableSlideshow: data.enableSlideshow ?? false,
          
          enableSecondaryBanner: data.enableSecondaryBanner ?? false,
          secondaryBannerTitle: cleanString(data.secondaryBannerTitle),
          secondaryBannerDesc: cleanString(data.secondaryBannerDesc),

          businessName: cleanString(data.businessName),
          cacNumber: cleanString(data.cacNumber),
          businessAddress: cleanString(data.businessAddress),
          showBusinessDetails: data.showBusinessDetails ?? false,
          bankName: cleanString(data.bankName),
          accountNumber: cleanString(data.accountNumber),
          accountName: cleanString(data.accountName),
          deliveryFee: cleanString(data.deliveryFee),
          deliveryTime: data.deliveryTime || "2-3 Business Days"
        });
        
        if (data.phone && data.phone === data.whatsapp) {
          setSameAsWhatsApp(true);
        }

        setIsStoreOnline(data.isOnline ?? true);
        
        if (data.logoUrl && data.logoUrl !== "null") setLogoPreview(data.logoUrl);
        if (data.bannerImage && data.bannerImage !== "null") setBannerPreview(data.bannerImage);
        if (data.slideshowImages) {
          if (data.slideshowImages[0]) setSlide1Preview(data.slideshowImages[0]);
          if (data.slideshowImages[1]) setSlide2Preview(data.slideshowImages[1]);
          if (data.slideshowImages[2]) setSlide3Preview(data.slideshowImages[2]);
        }
        if (data.secondaryBannerImage && data.secondaryBannerImage !== "null") setSecondaryBannerPreview(data.secondaryBannerImage);

      } catch (err) {
        setFormData(prev => ({ ...prev, storeName: vendor.storeName || "", storeLink: vendor.storeLink || "" }));
        if (vendor.logoUrl) setLogoPreview(vendor.logoUrl);
      } finally {
        setIsFetching(false);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    if (!formData.storeLink || activeView !== "store-info") return;
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
  }, [formData.storeLink, vendor.storeLink, activeView]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === "phone" || name === "whatsapp") {
      const formattedNumber = value.replace(/[^\d+]/g, '').slice(0, 14);
      setFormData(prev => ({
        ...prev,
        [name]: formattedNumber,
        ...(name === "phone" && sameAsWhatsApp ? { whatsapp: formattedNumber } : {})
      }));
      setMessage({ type: "", text: "" });
      return;
    }

    if (name === "storeLink") {
      const formatted = value.toLowerCase().replace(/[^a-z0-9-]+/g, '');
      setFormData({ ...formData, storeLink: formatted });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
    setMessage({ type: "", text: "" });
  };

  const handleWhatsAppToggle = () => {
    const newState = !sameAsWhatsApp;
    setSameAsWhatsApp(newState);
    if (newState) {
      setFormData(prev => ({ ...prev, whatsapp: prev.phone }));
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: "error", text: "Image is too large. Max size is 2MB." });
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    
    switch (type) {
      case "logo": setLogoFile(file); setLogoPreview(previewUrl); break;
      case "banner": setBannerFile(file); setBannerPreview(previewUrl); break;
      case "slide1": setSlide1File(file); setSlide1Preview(previewUrl); break;
      case "slide2": setSlide2File(file); setSlide2Preview(previewUrl); break;
      case "slide3": setSlide3File(file); setSlide3Preview(previewUrl); break;
      case "secondaryBanner": setSecondaryBannerFile(file); setSecondaryBannerPreview(previewUrl); break;
      default: break;
    }
  };

  // --- NEW: Function to auto-save Store Online/Offline status ---
  const handleToggleStoreStatus = async () => {
    const newState = !isStoreOnline;
    setIsStoreOnline(newState); // Optimistic UI update

    try {
      const data = new FormData();
      // We must append all existing formData so the backend doesn't overwrite it
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      data.append("isOnline", newState);

      const response = await api.put('/vendors/settings', data);
      
      // Update local storage
      const updatedVendor = { ...vendor, ...response.data.vendor };
      localStorage.setItem('sabisell_vendor', JSON.stringify(updatedVendor));
      
    } catch (error) {
      setIsStoreOnline(!newState); // Revert on failure
      console.error("Failed to toggle store status", error);
    }
  };

  const handleSubmit = async () => {
    if (activeView === "store-info" && (linkStatus === "unavailable" || linkStatus === "checking")) {
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
      if (slide1File) data.append("slide1", slide1File);
      if (slide2File) data.append("slide2", slide2File);
      if (slide3File) data.append("slide3", slide3File);
      if (secondaryBannerFile) data.append("secondaryBannerImage", secondaryBannerFile);

      const response = await api.put('/vendors/settings', data);
      const updatedVendor = { ...vendor, ...response.data.vendor };
      localStorage.setItem('sabisell_vendor', JSON.stringify(updatedVendor));
      window.dispatchEvent(new Event("storage"));

      setMessage({ type: "success", text: "Settings saved successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      
      const scrollArea = document.getElementById("settings-scroll-area");
      if (scrollArea) scrollArea.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to save settings." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStore = async () => {
    alert("Store deletion API call would happen here!");
  };

  const openForm = (viewId) => {
    setActiveView(viewId);
    setMessage({ type: "", text: "" });
    const scrollArea = document.getElementById("settings-scroll-area");
    if (scrollArea) scrollArea.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBackToMenu = () => {
    setActiveView("menu");
    setMessage({ type: "", text: "" });
    setDeleteConfirmText(""); 
    const scrollArea = document.getElementById("settings-scroll-area");
    if (scrollArea) scrollArea.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isFetching) return <div className="flex justify-center py-32"><Loader2 className="w-8 h-8 animate-spin text-[#044e3b]" /></div>;

  return (
    <div id="settings-scroll-area" className="flex-1 overflow-y-auto bg-gray-50/50 w-full h-full relative">
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pb-32 sm:pb-12">
        
        {/* ========================================== */}
        {/* VIEW 1: MAIN MENU GRID                     */}
        {/* ========================================== */}
        {activeView === "menu" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Store Settings</h1>
              <p className="text-sm font-medium text-gray-500 mt-1">Manage your store, appearance, and payments.</p>
            </div>

            {/* Store Overview Card */}
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-[#044e3b] rounded-2xl flex flex-col items-center justify-center text-white border-4 border-emerald-50 shadow-sm shrink-0 overflow-hidden relative">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-2xl italic leading-none">{formData.storeName ? formData.storeName.substring(0,2).toUpperCase() : "ST"}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-lg leading-tight truncate max-w-[200px] sm:max-w-sm">
                    {formData.storeName || "My Store"}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 mt-0.5 truncate max-w-[200px] sm:max-w-sm">
                    {formData.storeLink}.sabisell.com
                  </p>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 mt-2 rounded-md w-fit border ${isStoreOnline ? 'bg-emerald-50 border-emerald-100' : 'bg-gray-100 border-gray-200'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isStoreOnline ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isStoreOnline ? 'text-emerald-700' : 'text-gray-600'}`}>
                      {isStoreOnline ? 'Store Online' : 'Store Offline'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-4 border-t border-gray-100 sm:border-0 pt-4 sm:pt-0 w-full sm:w-auto">
                 <a 
                   href={`/${formData.storeLink}`} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#044e3b] px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
                 >
                   <ExternalLink className="w-4 h-4" /> View Store
                 </a>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-500">Toggle Status</span>
                  {/* AUTO-SAVE TOGGLE HOOKED UP HERE */}
                  <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out shrink-0 ${isStoreOnline ? "bg-[#044e3b]" : "bg-gray-300"}`} onClick={handleToggleStoreStatus}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${isStoreOnline ? "translate-x-6" : "translate-x-0"}`}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {settingsMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => openForm(item.id)}
                  className={`bg-white border border-gray-200 p-6 rounded-[2rem] hover:shadow-md transition-all text-left flex flex-col gap-4 group ${item.border}`}
                >
                  <div className="flex justify-between items-start">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${item.color}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 group-hover:text-[#044e3b] transition-colors">{item.title}</h3>
                    <p className="text-sm font-medium text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 2: FULL SCREEN DETAIL FORMS           */}
        {/* ========================================== */}
        {activeView !== "menu" && (
          <div className="w-full bg-white rounded-[2rem] border border-gray-200 shadow-sm animate-in slide-in-from-right-8 duration-300">
            
            {/* Form Header (Sticky) */}
            <div className="h-16 sm:h-20 border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 bg-white/90 backdrop-blur-md sticky top-0 z-20 rounded-t-[2rem]">
              <div className="flex items-center gap-3">
                <button onClick={goBackToMenu} className="p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                  {settingsMenu.find((s) => s.id === activeView)?.title || "Settings"}
                </h2>
              </div>
              
              {activeView !== "delivery" && (
                <button onClick={handleSubmit} disabled={isLoading || linkStatus === "checking" || linkStatus === "unavailable"} className="text-sm font-bold bg-[#044e3b] text-white px-6 py-2.5 rounded-xl hover:bg-emerald-800 transition-colors flex items-center gap-2 disabled:opacity-70 shadow-md hover:shadow-lg">
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span className="hidden sm:block">Save Changes</span>
                  <span className="sm:hidden">Save</span>
                </button>
              )}
            </div>

            {/* Form Body Container */}
            <div className="p-5 sm:p-10">
              
              {message.text && (
                <div className={`mb-8 p-4 rounded-2xl flex items-start gap-3 ${message.type === 'error' ? 'bg-red-50 border border-red-200' : 'bg-emerald-50 border border-emerald-200'}`}>
                  {message.type === 'error' ? <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /> : <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />}
                  <p className={`text-sm font-bold ${message.type === 'error' ? 'text-red-800' : 'text-emerald-800'}`}>{message.text}</p>
                </div>
              )}

              {/* 1. STORE INFO */}
              {activeView === "store-info" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-bold text-gray-900 mb-2">Store Name <span className="text-red-500">*</span></label>
                      <input type="text" name="storeName" value={formData.storeName} onChange={handleChange} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#044e3b]/20 focus:border-[#044e3b] transition-all font-bold text-gray-900" />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-bold text-gray-900 mb-2">Custom Store Link <span className="text-red-500">*</span></label>
                      <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-[#044e3b]/20 focus-within:border-[#044e3b] transition-all">
                        <div className="bg-gray-50 border-r border-gray-200 px-3 sm:px-4 flex items-center text-gray-500 font-bold text-sm shrink-0">sabisell.com/</div>
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
                          <option>Services & Others</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Store Description</label>
                    <textarea rows="4" name="storeDescription" value={formData.storeDescription} onChange={handleChange} placeholder="Briefly describe what you sell..." className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#044e3b]/20 focus:border-[#044e3b] transition-all font-medium text-gray-700 resize-none leading-relaxed"></textarea>
                  </div>

                  <hr className="border-gray-100 my-8" />
                  
                  {/* DANGER ZONE - DELETE STORE */}
                  <div className="bg-red-50 border border-red-100 rounded-3xl p-6 sm:p-8">
                    <h3 className="text-lg font-extrabold text-red-900 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" /> Danger Zone
                    </h3>
                    <p className="text-sm font-medium text-red-700 mb-6">
                      Deleting your store is permanent and cannot be undone. All your products, orders, and customer data will be erased.
                    </p>

                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-sm font-bold text-red-900 mb-2">
                          Type <span className="bg-white px-2 py-0.5 rounded border border-red-200 font-extrabold select-all">{formData.storeName || "your store name"}</span> to confirm
                        </label>
                        <input 
                          type="text" 
                          value={deleteConfirmText}
                          onChange={(e) => setDeleteConfirmText(e.target.value)}
                          placeholder={formData.storeName}
                          className="w-full px-4 py-3.5 bg-white border border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-bold text-gray-900"
                        />
                      </div>
                      <button 
                        disabled={deleteConfirmText !== formData.storeName || !formData.storeName}
                        onClick={handleDeleteStore}
                        className="w-full sm:w-auto px-6 py-3.5 bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" /> Permanently Delete Store
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. CONTACT & SOCIAL */}
              {activeView === "contact" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Store Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                        <input 
                          type="text" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          placeholder="e.g. 08012345678" 
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-bold text-gray-900 tracking-wide" 
                        />
                      </div>
                      
                      <div className="mt-3 flex items-center gap-2 cursor-pointer w-fit" onClick={handleWhatsAppToggle}>
                        <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${sameAsWhatsApp ? 'bg-[#044e3b]' : 'bg-gray-200'}`}>
                          {sameAsWhatsApp && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-xs font-bold text-gray-600">My WhatsApp is the same number</span>
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
                  <h3 className="text-base font-bold text-gray-900 mb-2">Chat & Social Media Links</h3>
                  <p className="text-sm font-bold text-gray-900 mb-4">Username only</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* WhatsApp */}
                    <div>
                      <div className="relative">
                        <MessageCircle className="absolute left-4 top-3.5 w-5 h-5 text-green-500" />
                        <input 
                          type="text" 
                          name="whatsapp" 
                          value={formData.whatsapp} 
                          onChange={handleChange} 
                          disabled={sameAsWhatsApp}
                          placeholder="e.g. 08012345678" 
                          className={`w-full pl-11 pr-10 py-3.5 border rounded-xl focus:ring-2 focus:border-green-500 font-bold tracking-wide transition-all ${sameAsWhatsApp ? 'bg-green-50/50 border-green-100 text-gray-500 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-900'}`} 
                        />
                        {sameAsWhatsApp && <RefreshCw className="absolute right-4 top-3.5 w-4 h-4 text-green-500 animate-spin-slow" />}
                      </div>
                      {sameAsWhatsApp && <p className="text-[10px] font-bold text-green-600 mt-1">Synced with phone number</p>}
                    </div>

                    {/* Instagram */}
                    <div className="relative">
                      <img src={IG} alt="Instagram" className="absolute left-4 top-3.5 w-5 h-5" />
                      <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="Instagram Handle" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-medium text-gray-900" />
                    </div>
                    
                    {/* Facebook */}
                    <div className="relative">
                      <img src={FB} alt="Facebook" className="absolute left-4 top-3.5 w-5 h-5" />
                      <input type="text" name="facebook" value={formData.facebook} onChange={handleChange} placeholder="Facebook Page Link" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-medium text-gray-900" />
                    </div>
                    
                    {/* Twitter/X */}
                    <div className="relative">
                      <img src={X} alt="Twitter / X" className="absolute left-4 top-3.5 w-5 h-5" />
                      <input type="text" name="twitter" value={formData.twitter} onChange={handleChange} placeholder="Twitter / X Handle" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-medium text-gray-900" />
                    </div>

                    {/* TikTok */}
                    <div className="relative">
                      <div className="absolute left-4 top-3.5 font-bold text-gray-800 text-[10px] bg-gray-200 px-1 py-0.5 rounded">TT</div>
                      <input type="text" name="tiktok" value={formData.tiktok} onChange={handleChange} placeholder="TikTok Handle" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-medium text-gray-900" />
                    </div>

                    {/* Snapchat */}
                    <div className="relative">
                      <div className="absolute left-4 top-3.5 font-bold text-yellow-600 bg-yellow-100 text-[10px] px-1 py-0.5 rounded">SC</div>
                      <input type="text" name="snapchat" value={formData.snapchat} onChange={handleChange} placeholder="Snapchat Handle" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-medium text-gray-900" />
                    </div>

                  </div>
                </div>
              )}

              {/* 3. STORE APPEARANCE */}
              {activeView === "appearance" && (
                <div className="space-y-10 animate-in fade-in duration-300">
                  
                  {/* STORE LOGO */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3">Store Logo</h3>
                    <div className="flex items-center gap-4">
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

                  <hr className="border-gray-100" />

                  {/* BRAND THEME COLOR */}
                  <div className="relative">
                    {!canEditTheme && (
                      <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-6 rounded-3xl border border-gray-100">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2 border border-purple-200 shadow-sm">
                          <Lock className="w-5 h-5 text-purple-600" />
                        </div>
                        <h4 className="text-base font-extrabold text-gray-900 drop-shadow-sm bg-white/80 px-2 py-0.5 rounded">Unlock Custom Themes</h4>
                        <p className="text-xs font-bold text-gray-800 mt-1 mb-3 max-w-xs bg-white/80 px-3 py-1.5 rounded-lg shadow-sm">
                          Upgrade to the Growth Plan to completely customize your storefront's primary accent color.
                        </p>
                        <Link to="/dashboard/billing" className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 hover:scale-105">
                          <Star className="w-3.5 h-3.5 fill-white" /> Upgrade to Growth
                        </Link>
                      </div>
                    )}

                    <div className={!canEditTheme ? 'opacity-40 pointer-events-none select-none' : ''}>
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
                  </div>

                  <hr className="border-gray-100" />

                  {/* HERO BANNER SECTION */}
                  <div className={`border border-gray-200 rounded-3xl p-5 sm:p-6 bg-gray-50/50`}>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-sm font-extrabold text-gray-900">Promotional Hero Banner</h3>
                        <p className="text-xs font-medium text-gray-500 mt-0.5">Display a marketing banner at the top of your store.</p>
                      </div>
                      <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out shrink-0 ${formData.hasBanner ? "bg-[#044e3b]" : "bg-gray-300"}`} onClick={() => setFormData({ ...formData, hasBanner: !formData.hasBanner })}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${formData.hasBanner ? "translate-x-6" : "translate-x-0"}`}></div>
                      </div>
                    </div>

                    {!canEditBanner && (
                      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl flex items-start gap-3">
                         <Lock className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                         <div>
                           <p className="text-sm font-bold text-yellow-800">Upgrade to Customize</p>
                           <p className="text-xs font-medium text-yellow-700 mt-1 mb-2">Free users can toggle the default banner on or off. Upgrade to Starter to add your own custom text and images.</p>
                           <Link to="/dashboard/billing" className="text-[11px] bg-yellow-600 text-white px-3 py-1.5 rounded-lg font-bold shadow-sm w-fit block">Upgrade Plan</Link>
                         </div>
                      </div>
                    )}

                    <div className={`space-y-5 ${!canEditBanner ? 'opacity-70' : ''}`}>
                      
                      {/* Main Hero Image */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">Background Image</label>
                        <input type="file" accept="image/*" ref={bannerInputRef} onChange={(e) => handleImageChange(e, "banner")} className="hidden" disabled={!canEditBanner}/>
                        
                        {bannerPreview ? (
                           <div className="relative w-full h-32 rounded-xl overflow-hidden group border border-gray-200 shadow-sm">
                              <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
                              {canEditBanner && (
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <button type="button" onClick={() => bannerInputRef.current?.click()} className="bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-lg">Change Image</button>
                                </div>
                              )}
                           </div>
                        ) : (
                          <button type="button" onClick={() => bannerInputRef.current?.click()} disabled={!canEditBanner} className="w-full h-24 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:bg-gray-50 flex flex-col items-center justify-center gap-1 transition-colors">
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                            <span className="text-xs font-bold text-gray-500">Upload Background</span>
                          </button>
                        )}
                      </div>

                      {/* Text Inputs */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">Banner Title</label>
                        <input type="text" name="bannerTitle" value={formData.bannerTitle} onChange={handleChange} placeholder="Discover Quality & Excellence." className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-bold text-gray-900 text-sm disabled:bg-gray-50" disabled={!canEditBanner}/>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2">Subtitle</label>
                          <input type="text" name="bannerSubtitle" value={formData.bannerSubtitle} onChange={handleChange} placeholder="e.g. Welcome to our store" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-medium text-sm disabled:bg-gray-50" disabled={!canEditBanner}/>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2">Discount Text</label>
                          <input type="text" name="bannerDiscount" value={formData.bannerDiscount} onChange={handleChange} placeholder="e.g. SHOP NOW" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-bold text-yellow-600 text-sm disabled:bg-gray-50" disabled={!canEditBanner}/>
                        </div>
                      </div>
                    </div>

                    {/* HERO SLIDESHOW (Locked for Free) */}
                    <div className="mt-8 pt-8 border-t border-gray-200 relative">
                       {!canUseSlideshow && (
                         <div className="absolute inset-0 z-10 bg-gray-50/50 backdrop-blur-[1px] flex flex-col items-center justify-center rounded-2xl border border-gray-100">
                            <Lock className="w-6 h-6 text-gray-400 mb-2" />
                            <p className="text-xs font-bold text-gray-700">Slideshow requires Starter Plan</p>
                         </div>
                       )}

                       <div className={`flex items-center justify-between mb-4 ${!canUseSlideshow ? 'opacity-40' : ''}`}>
                         <div>
                           <h4 className="text-sm font-bold text-gray-900">Enable Slideshow</h4>
                           <p className="text-xs font-medium text-gray-500 mt-0.5">Add up to 3 extra images to rotate in the hero section.</p>
                         </div>
                         <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out shrink-0 ${formData.enableSlideshow ? "bg-[#044e3b]" : "bg-gray-300"}`} onClick={() => canUseSlideshow && setFormData({ ...formData, enableSlideshow: !formData.enableSlideshow })}>
                           <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${formData.enableSlideshow ? "translate-x-6" : "translate-x-0"}`}></div>
                         </div>
                       </div>

                       {formData.enableSlideshow && (
                         <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${!canUseSlideshow ? 'opacity-40 pointer-events-none' : ''}`}>
                           
                           {/* Slide 1 */}
                           <div>
                              <input type="file" accept="image/*" ref={slide1Ref} onChange={(e) => handleImageChange(e, "slide1")} className="hidden" />
                              {slide1Preview ? (
                                <div className="relative h-24 rounded-xl overflow-hidden group border border-gray-200">
                                   <img src={slide1Preview} alt="Slide 1" className="w-full h-full object-cover" />
                                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                      <button type="button" onClick={() => slide1Ref.current?.click()} className="text-[10px] font-bold bg-white text-gray-900 px-3 py-1.5 rounded-lg">Change</button>
                                   </div>
                                </div>
                              ) : (
                                <button type="button" onClick={() => slide1Ref.current?.click()} className="w-full h-24 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:bg-gray-50 flex flex-col items-center justify-center gap-1">
                                   <Plus className="w-5 h-5 text-gray-400" />
                                   <span className="text-[10px] font-bold text-gray-500">Add Slide 2</span>
                                </button>
                              )}
                           </div>
                           
                           {/* Slide 2 */}
                           <div>
                              <input type="file" accept="image/*" ref={slide2Ref} onChange={(e) => handleImageChange(e, "slide2")} className="hidden" />
                              {slide2Preview ? (
                                <div className="relative h-24 rounded-xl overflow-hidden group border border-gray-200">
                                   <img src={slide2Preview} alt="Slide 2" className="w-full h-full object-cover" />
                                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                      <button type="button" onClick={() => slide2Ref.current?.click()} className="text-[10px] font-bold bg-white text-gray-900 px-3 py-1.5 rounded-lg">Change</button>
                                   </div>
                                </div>
                              ) : (
                                <button type="button" onClick={() => slide2Ref.current?.click()} className="w-full h-24 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:bg-gray-50 flex flex-col items-center justify-center gap-1">
                                   <Plus className="w-5 h-5 text-gray-400" />
                                   <span className="text-[10px] font-bold text-gray-500">Add Slide 3</span>
                                </button>
                              )}
                           </div>

                           {/* Slide 3 */}
                           <div>
                              <input type="file" accept="image/*" ref={slide3Ref} onChange={(e) => handleImageChange(e, "slide3")} className="hidden" />
                              {slide3Preview ? (
                                <div className="relative h-24 rounded-xl overflow-hidden group border border-gray-200">
                                   <img src={slide3Preview} alt="Slide 3" className="w-full h-full object-cover" />
                                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                      <button type="button" onClick={() => slide3Ref.current?.click()} className="text-[10px] font-bold bg-white text-gray-900 px-3 py-1.5 rounded-lg">Change</button>
                                   </div>
                                </div>
                              ) : (
                                <button type="button" onClick={() => slide3Ref.current?.click()} className="w-full h-24 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:bg-gray-50 flex flex-col items-center justify-center gap-1">
                                   <Plus className="w-5 h-5 text-gray-400" />
                                   <span className="text-[10px] font-bold text-gray-500">Add Slide 4</span>
                                </button>
                              )}
                           </div>

                         </div>
                       )}
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* SECONDARY FOOTER BANNER (Requires Growth Plan) */}
                  <div className="relative">
                    {!canUseSecondaryBanner && (
                      <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-6 rounded-3xl border border-gray-100">
                        <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-3 border border-indigo-200 shadow-sm">
                          <Lock className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h4 className="text-base font-extrabold text-gray-900 drop-shadow-sm bg-white/80 px-2 py-0.5 rounded">Unlock Secondary Banner</h4>
                        <p className="text-xs font-bold text-gray-800 mt-1 mb-4 max-w-xs bg-white/80 px-3 py-1.5 rounded-lg shadow-sm">
                          Upgrade to the Growth Plan to display an extra promotional banner near your store's footer.
                        </p>
                        <Link to="/dashboard/billing" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 hover:scale-105">
                          <Star className="w-4 h-4 fill-white" /> Upgrade to Growth
                        </Link>
                      </div>
                    )}

                    <div className={`border border-gray-200 rounded-3xl p-5 sm:p-6 bg-gray-50/50 ${!canUseSecondaryBanner ? 'opacity-40 pointer-events-none select-none' : ''}`}>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-sm font-extrabold text-gray-900">Secondary Footer Banner</h3>
                          <p className="text-xs font-medium text-gray-500 mt-0.5">A wide promotional banner shown right above your store footer.</p>
                        </div>
                        <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out shrink-0 ${formData.enableSecondaryBanner ? "bg-[#044e3b]" : "bg-gray-300"}`} onClick={() => canUseSecondaryBanner && setFormData({ ...formData, enableSecondaryBanner: !formData.enableSecondaryBanner })}>
                          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${formData.enableSecondaryBanner ? "translate-x-6" : "translate-x-0"}`}></div>
                        </div>
                      </div>

                      <div className="space-y-5">
                         <div>
                            <label className="block text-xs font-bold text-gray-700 mb-2">Banner Image</label>
                            <input type="file" accept="image/*" ref={secondaryBannerRef} onChange={(e) => handleImageChange(e, "secondaryBanner")} className="hidden" />
                            
                            {secondaryBannerPreview ? (
                               <div className="relative w-full h-32 rounded-xl overflow-hidden group border border-gray-200 shadow-sm">
                                  <img src={secondaryBannerPreview} alt="Secondary Banner" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button type="button" onClick={() => secondaryBannerRef.current?.click()} className="bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-lg">Change Image</button>
                                  </div>
                               </div>
                            ) : (
                              <button type="button" onClick={() => secondaryBannerRef.current?.click()} className="w-full h-24 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:bg-gray-50 flex flex-col items-center justify-center gap-1 transition-colors">
                                <ImageIcon className="w-5 h-5 text-gray-400" />
                                <span className="text-xs font-bold text-gray-500">Upload Banner Image</span>
                              </button>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-2">Banner Title</label>
                            <input type="text" name="secondaryBannerTitle" value={formData.secondaryBannerTitle} onChange={handleChange} placeholder="Look Good. Feel Unstoppable." className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-bold text-gray-900 text-sm" />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-2">Description Text</label>
                            <textarea rows="2" name="secondaryBannerDesc" value={formData.secondaryBannerDesc} onChange={handleChange} placeholder="Explore premium styles made to make you stand out." className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-[#044e3b] transition-all font-medium text-gray-700 text-sm resize-none"></textarea>
                          </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* 4. BUSINESS DETAILS */}
              {activeView === "business" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="space-y-5">
                    <h3 className="text-lg font-extrabold text-gray-900 mb-2 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-gray-500" /> Legal Information
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Legal Business Name</label>
                      <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="e.g. Zara Stitches Ltd." className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-bold text-gray-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">CAC Registration Number (Optional)</label>
                      <input type="text" name="cacNumber" value={formData.cacNumber} onChange={handleChange} placeholder="e.g. RC 1234567" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-medium text-gray-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Business / Physical Address</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <textarea rows="3" name="businessAddress" value={formData.businessAddress} onChange={handleChange} placeholder="123 Market Street, Lagos" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#044e3b] font-medium text-gray-900 resize-none"></textarea>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-center justify-between mt-6 cursor-pointer" onClick={() => setFormData({...formData, showBusinessDetails: !formData.showBusinessDetails})}>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                          <Eye className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">Public Business Details</h4>
                          <p className="text-xs font-medium text-gray-500 mt-0.5">Show address and CAC number on your storefront footer.</p>
                        </div>
                      </div>
                      <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 ${formData.showBusinessDetails ? 'bg-blue-600' : 'bg-gray-300'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${formData.showBusinessDetails ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* 5. PAYMENTS */}
              {activeView === "payments" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                        <Landmark className="w-5 h-5 text-orange-500" /> Bank Account for Payouts
                      </h3>
                      <p className="text-xs font-medium text-gray-500 mt-1 mb-6">This is where your funds from online sales will be sent.</p>
                    </div>
                    
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Account Number</label>
                        <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="0123456789" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-orange-500 font-bold text-gray-900 tracking-widest" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Account Name</label>
                        <input type="text" name="accountName" value={formData.accountName} onChange={handleChange} placeholder="Zara Stitches Ltd" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-orange-500 font-bold text-gray-900" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                     <div className="flex items-center gap-4">
                       <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                         <Wallet className="w-7 h-7 text-blue-600" />
                       </div>
                       <div>
                         <h4 className="text-base font-bold text-gray-900">Accept Online Payments</h4>
                         <p className="text-xs font-medium text-gray-500 mt-0.5">Let customers pay securely via Paystack.</p>
                       </div>
                     </div>
                     <button type="button" className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-sm transition-colors whitespace-nowrap w-full sm:w-auto">
                       Connect Paystack
                     </button>
                  </div>
                </div>
              )}

              {/* 6. DELIVERY & SHIPPING (COMING SOON) */}
              {activeView === "delivery" && (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <Truck className="w-8 h-8 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2">Delivery Settings</h3>
                  <p className="text-sm font-medium text-gray-500 max-w-xs leading-relaxed">
                    Advanced delivery zones, custom shipping rates, and logistics integrations are coming very soon.
                  </p>
                </div>
              )}

              {/* FALLBACK FOR UNIMPLEMENTED TABS */}
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
            
            <div className="h-24 w-full shrink-0"></div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Settings;