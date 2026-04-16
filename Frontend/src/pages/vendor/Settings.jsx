import { useState } from "react";
import { 
  ShoppingBag, Building2, Phone, CreditCard, Truck, 
  Palette, Bell, Shield, Edit3, Share2, ArrowLeft, 
  Camera, ChevronDown, Check, Copy, Clock, ChevronRight,
  Settings as SettingsIcon 
} from "lucide-react";

const Settings = () => {
  // activeView tracks which setting form is currently displayed on the right
  const [activeView, setActiveView] = useState("store-info");
  
  // mobileView tracks whether a mobile user is looking at the "menu" or the "detail" form
  const [mobileView, setMobileView] = useState("menu"); 
  
  const [isStoreOnline, setIsStoreOnline] = useState(true);

  const settingsMenu = [
    { id: 'store-info', icon: ShoppingBag, title: "Store Information", desc: "Name, category, description", color: "text-emerald-600 bg-emerald-50" },
    { id: 'business', icon: Building2, title: "Business Details", desc: "Business type, address, ID", color: "text-purple-600 bg-purple-50" },
    { id: 'contact', icon: Phone, title: "Contact & Social", desc: "Phone, WhatsApp, Email", color: "text-emerald-600 bg-emerald-50" },
    { id: 'payments', icon: CreditCard, title: "Payment Methods", desc: "Bank, wallet, payout settings", color: "text-orange-600 bg-orange-50" },
    { id: 'delivery', icon: Truck, title: "Delivery & Shipping", desc: "Fees, areas, partners", color: "text-blue-600 bg-blue-50" },
    { id: 'appearance', icon: Palette, title: "Store Appearance", desc: "Banner, colors, theme", color: "text-purple-600 bg-purple-50", badge: "New" },
    { id: 'notifications', icon: Bell, title: "Notifications", desc: "Alerts, emails, SMS", color: "text-red-600 bg-red-50" },
    { id: 'security', icon: Shield, title: "Account & Security", desc: "Password, 2FA, sessions", color: "text-blue-600 bg-blue-50" },
  ];

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
    setMobileView("detail"); // Switch to detail view on mobile
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full">
      <div className="w-full max-w-7xl mx-auto h-full flex flex-col lg:flex-row gap-6 lg:gap-8 animate-in fade-in duration-300 items-start">
        
        {/* ================= LEFT COLUMN: MASTER MENU ================= */}
        <div className={`w-full lg:w-[380px] xl:w-[420px] shrink-0 flex-col gap-6 ${mobileView === 'detail' ? 'hidden lg:flex' : 'flex'}`}>
          
          <h1 className="text-2xl font-extrabold text-gray-900 hidden lg:block">Store Settings</h1>

          {/* Store Overview Card */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex items-center justify-between gap-4">
             <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-900 rounded-xl flex flex-col items-center justify-center text-white border-2 border-emerald-100 shadow-sm shrink-0">
                   <span className="font-bold text-xl italic leading-none">Zara</span>
                   <span className="text-[6px] tracking-widest uppercase opacity-80 mt-0.5">Fashion</span>
                </div>
                <div>
                   <h3 className="font-bold text-gray-900 text-base leading-tight">Zara Stitches & Fashion</h3>
                   <p className="text-xs font-medium text-gray-500 mb-2">zara-fashion.sabisell.com</p>
                   <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-md w-fit border border-emerald-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-[10px] font-bold text-emerald-700">Online</span>
                   </div>
                </div>
             </div>
             
             {/* Custom Toggle Switch */}
             <div 
               className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out shrink-0 ${isStoreOnline ? 'bg-sabi-primary' : 'bg-gray-300'}`}
               onClick={() => setIsStoreOnline(!isStoreOnline)}
             >
               <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${isStoreOnline ? 'translate-x-6' : 'translate-x-0'}`}></div>
             </div>
          </div>

          {/* Quick Actions Grid */}
          <div>
             <h3 className="text-sm font-extrabold text-gray-900 mb-3">Quick Actions</h3>
             <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleNavClick('store-info')}
                  className="flex flex-col items-start p-4 rounded-2xl bg-orange-50/50 hover:bg-orange-50 border border-orange-100 transition-colors text-left cursor-pointer"
                >
                   <div className="flex items-center gap-2 mb-1">
                      <Edit3 className="w-4 h-4 text-orange-600" />
                      <h4 className="text-sm font-bold text-gray-900">Edit Store</h4>
                   </div>
                   <p className="text-[10px] font-medium text-gray-500">Update details</p>
                </button>
                <button 
                  onClick={() => handleNavClick('store-info')}
                  className="flex flex-col items-start p-4 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 transition-colors text-left cursor-pointer"
                >
                   <div className="flex items-center gap-2 mb-1">
                      <Share2 className="w-4 h-4 text-emerald-600" />
                      <h4 className="text-sm font-bold text-gray-900">Share Store</h4>
                   </div>
                   <p className="text-[10px] font-medium text-gray-500">Copy link</p>
                </button>
                <button 
                  onClick={() => handleNavClick('payments')}
                  className="flex flex-col items-start p-4 rounded-2xl bg-blue-50/50 hover:bg-blue-50 border border-blue-100 transition-colors text-left cursor-pointer"
                >
                   <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <h4 className="text-sm font-bold text-gray-900">Payment</h4>
                   </div>
                   <p className="text-[10px] font-medium text-gray-500">Manage payouts</p>
                </button>
                <button 
                  onClick={() => handleNavClick('delivery')}
                  className="flex flex-col items-start p-4 rounded-2xl bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100 transition-colors text-left cursor-pointer"
                >
                   <div className="flex items-center gap-2 mb-1">
                      <Truck className="w-4 h-4 text-indigo-600" />
                      <h4 className="text-sm font-bold text-gray-900">Delivery</h4>
                   </div>
                   <p className="text-[10px] font-medium text-gray-500">Set options</p>
                </button>
             </div>
          </div>

          {/* Settings List */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
             {settingsMenu.map((item) => (
               <button 
                 key={item.id} 
                 onClick={() => handleNavClick(item.id)}
                 className={`w-full flex items-center justify-between p-4 transition-colors hover:bg-gray-50 ${activeView === item.id ? 'bg-gray-50 lg:border-l-4 border-sabi-primary' : 'border-l-4 border-transparent'}`}
               >
                  <div className="flex items-center gap-4">
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                     </div>
                     <div className="text-left flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                           <h4 className="font-bold text-gray-900 text-sm truncate">{item.title}</h4>
                           {item.badge && <span className="bg-purple-600 text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded">{item.badge}</span>}
                        </div>
                        <p className="text-[11px] font-medium text-gray-500 truncate">{item.desc}</p>
                     </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
               </button>
             ))}
          </div>

        </div>

        {/* ================= RIGHT COLUMN: DETAIL VIEW ================= */}
        {/* Hidden on mobile when viewing the menu, always visible on desktop */}
        <div className={`w-full flex-1 flex-col bg-white lg:rounded-4xl border-x lg:border border-gray-200 lg:shadow-sm overflow-hidden ${mobileView === 'menu' ? 'hidden lg:flex' : 'flex'} min-h-[600px] -mx-4 sm:mx-0 sm:border-x-0`}>
          
          {/* Detail Header */}
          <div className="h-16 border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 sticky top-0 bg-white z-10 shrink-0">
             <div className="flex items-center gap-3">
                <button 
                  onClick={() => setMobileView("menu")} 
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
                >
                   <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <h2 className="text-lg font-extrabold text-gray-900">
                   {settingsMenu.find(s => s.id === activeView)?.title || "Settings"}
                </h2>
             </div>
             <button className="text-sm font-bold text-sabi-primary hover:text-sabi-primaryDark transition-colors">
                Save Changes
             </button>
          </div>

          {/* Dynamic Detail Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 hide-scrollbar">
             
             {/* CONDITIONAL RENDER: Store Information Page */}
             {activeView === 'store-info' ? (
               <div className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-right-4 duration-300 pb-8">
                  
                  {/* Store Logo Section */}
                  <div>
                     <h3 className="text-sm font-bold text-gray-900 mb-3">Store Logo</h3>
                     <div className="flex gap-4">
                        {/* Current Logo */}
                        <div className="relative w-24 h-24 rounded-full bg-emerald-900 flex flex-col items-center justify-center text-white border-4 border-emerald-50 shadow-sm shrink-0">
                           <span className="font-bold text-2xl italic leading-none">Zara</span>
                           <span className="text-[8px] tracking-widest uppercase opacity-80 mt-1">Fashion</span>
                           <button className="absolute -bottom-1 bg-white border border-gray-200 text-gray-700 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm hover:bg-gray-50 transition-colors">
                              Edit
                           </button>
                        </div>
                        
                        {/* Upload Box */}
                        <button className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center gap-1 transition-colors shrink-0">
                           <Camera className="w-6 h-6 text-gray-400" />
                           <span className="text-[10px] font-bold text-gray-700">Upload Logo</span>
                           <span className="text-[8px] font-medium text-gray-400">JPG, PNG • Max 2MB</span>
                        </button>
                     </div>
                  </div>

                  {/* Store Name */}
                  <div>
                     <label className="block text-sm font-bold text-gray-900 mb-2">Store Name <span className="text-red-500">*</span></label>
                     <input type="text" defaultValue="Zara Stitches & Fashion" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-bold text-gray-900" />
                  </div>

                  {/* Store Category */}
                  <div>
                     <label className="block text-sm font-bold text-gray-900 mb-2">Store Category <span className="text-red-500">*</span></label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                           <div className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center">
                              <span className="text-xs">👕</span>
                           </div>
                        </div>
                        <select className="w-full pl-12 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-bold text-gray-900 appearance-none">
                           <option>Fashion & Clothing</option>
                           <option>Electronics</option>
                           <option>Health & Beauty</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                           <ChevronDown className="w-5 h-5 text-gray-400" />
                        </div>
                     </div>
                  </div>

                  {/* Description */}
                  <div>
                     <label className="block text-sm font-bold text-gray-900 mb-2">Store Description</label>
                     <div className="relative">
                        <textarea 
                          rows="4" 
                          defaultValue="We create stylish and high-quality outfits for men, women & kids. Custom tailoring available."
                          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-700 resize-none leading-relaxed"
                        ></textarea>
                        <div className="absolute bottom-3 right-4 text-xs font-bold text-gray-400">
                           120/300
                        </div>
                     </div>
                  </div>

                  {/* Store Link */}
                  <div>
                     <label className="block text-sm font-bold text-gray-900 mb-2">Store Link</label>
                     <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-sabi-primary/20 focus-within:border-sabi-primary transition-all">
                        <input type="text" defaultValue="zara-fashion" className="w-full px-4 py-3.5 focus:outline-none font-bold text-gray-900" />
                        <div className="bg-gray-50 border-l border-gray-200 px-4 flex items-center text-gray-500 font-bold text-sm shrink-0">
                           .sabisell.com
                        </div>
                        <button className="bg-gray-50 border-l border-gray-200 px-4 flex items-center text-gray-400 hover:text-gray-700 transition-colors shrink-0">
                           <Copy className="w-4 h-4" />
                        </button>
                     </div>
                     <div className="flex items-center gap-1.5 mt-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-600">Your store link is live</span>
                     </div>
                  </div>

                  {/* Business Hours Card */}
                  <div>
                     <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-bold text-gray-900">Business Hours</label>
                        <button className="text-xs font-bold text-sabi-primary flex items-center gap-1 hover:underline">
                           <Edit3 className="w-3 h-3" /> Edit
                        </button>
                     </div>
                     <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                        <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                        <div>
                           <p className="text-sm font-bold text-gray-900">Mon - Sat: 9:00 AM - 6:00 PM</p>
                           <p className="text-sm font-medium text-gray-500 mt-0.5">Sunday: Closed</p>
                        </div>
                     </div>
                  </div>

               </div>
             ) : (
               /* CONDITIONAL RENDER: ALL OTHER SETTING PAGES */
               <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mb-4">
                     <SettingsIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Coming Soon</h3>
                  <p className="text-sm text-gray-500 max-w-sm">
                     The settings configuration for <span className="font-bold">{settingsMenu.find(s => s.id === activeView)?.title}</span> is currently under construction.
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