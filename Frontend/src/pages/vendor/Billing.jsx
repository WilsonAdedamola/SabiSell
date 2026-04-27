import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CreditCard, Calendar, CheckCircle2, Download, 
  ShieldCheck, FileText, MapPin, Mail, Phone, Edit3, Lock, Loader2, Star, TrendingUp
} from "lucide-react";
import api from '../../utils/api';

const Billing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview"); 
  const [isAutoRenew, setIsAutoRenew] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [upgradeError, setUpgradeError] = useState("");
  
  // Dynamic state for vendor and usage
  const [vendorData, setVendorData] = useState({ plan: "FREE" });
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    // 1. Get vendor plan from local storage to load UI instantly
    const storedVendor = JSON.parse(localStorage.getItem('sabisell_vendor') || '{}');
    if (storedVendor) {
      setVendorData(storedVendor);
    }

    // 2. Fetch fresh usage stats to show accurate limits
    const fetchStats = async () => {
      try {
        const response = await api.get('/vendors/dashboard');
        if (response.data.stats) {
          setProductCount(response.data.stats.totalProducts);
        }
      } catch (err) {
        console.error("Failed to fetch billing stats", err);
      }
    };
    
    fetchStats();
  }, []);

  const handleUpgrade = async (newPlan) => {
    if (vendorData.plan === newPlan) return; // Don't upgrade if already on this plan
    
    setIsLoading(true);
    setUpgradeError("");

    try {
      // Hit the API endpoint you already built!
      const response = await api.put('/subscription/upgrade', { newPlan });
      
      // Update local storage so the rest of the app knows about the upgrade instantly
      const updatedVendor = { ...vendorData, plan: response.data.plan };
      localStorage.setItem('sabisell_vendor', JSON.stringify(updatedVendor));
      setVendorData(updatedVendor);
      
      // Force a re-render of layout components (like Sidebar limits)
      window.dispatchEvent(new Event("storage"));
      
      // Smooth scroll to top to see success state
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {
      setUpgradeError(err.response?.data?.message || "Failed to process upgrade. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- LIMIT CALCULATIONS ---
  const getProductLimit = (plan) => {
    if (plan === "FREE") return 10;
    if (plan === "STARTER") return 100;
    return "Unlimited";
  };

  const limit = getProductLimit(vendorData.plan);
  const usagePercentage = limit !== "Unlimited" ? Math.min(100, (productCount / limit) * 100) : 0;
  const isLimitReached = limit !== "Unlimited" && productCount >= limit;

  // --- HARDCODED FOR DEMO ---
  const invoices = [
    { id: "INV-11002", date: "Jun 12, 2026", amount: "₦3,000", plan: "Starter Plan", status: "Paid" },
    { id: "INV-10945", date: "May 12, 2026", amount: "₦3,000", plan: "Starter Plan", status: "Paid" },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full">
      <div className="max-w-7xl mx-auto space-y-6 w-full animate-in fade-in duration-500">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900">Subscription & Billing</h1>
              <p className="text-sm font-medium text-gray-500 mt-1">Manage your plan, limits, and billing history.</p>
           </div>
           <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100 w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold">Verified Business</span>
           </div>
        </div>

        {upgradeError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm font-bold text-red-800">
            {upgradeError}
          </div>
        )}

        {/* MOBILE TABS */}
        <div className="flex bg-gray-100 p-1 rounded-xl lg:hidden">
           <button onClick={() => setActiveTab('overview')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'overview' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Subscription</button>
           <button onClick={() => setActiveTab('details')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'details' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Billing Details</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
           
           {/* ================= LEFT COLUMN ================= */}
           <div className={`lg:col-span-7 space-y-6 ${activeTab === 'overview' ? 'block' : 'hidden lg:block'}`}>
              
              {/* --- CURRENT USAGE TRACKER --- */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
                 <h3 className="text-lg font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                   <TrendingUp className="w-5 h-5 text-sabi-primary" /> Current Plan Usage
                 </h3>
                 
                 <div className="space-y-4">
                   <div>
                     <div className="flex justify-between items-end mb-2">
                       <div>
                         <p className="text-sm font-bold text-gray-900">Products ({vendorData.plan} Plan)</p>
                         <p className="text-xs font-medium text-gray-500">You are using {productCount} out of {limit} product slots.</p>
                       </div>
                       <span className={`text-sm font-extrabold ${isLimitReached ? 'text-red-500' : 'text-sabi-primary'}`}>
                         {usagePercentage.toFixed(0)}%
                       </span>
                     </div>
                     
                     {limit !== "Unlimited" ? (
                       <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                         <div className={`h-full transition-all duration-500 ${isLimitReached ? 'bg-red-500' : 'bg-sabi-primary'}`} style={{ width: `${usagePercentage}%` }}></div>
                       </div>
                     ) : (
                       <div className="w-full h-2.5 bg-emerald-100 rounded-full overflow-hidden">
                         <div className="h-full bg-emerald-500 w-full"></div>
                       </div>
                     )}
                   </div>
                 </div>
              </div>

              {/* --- PRICING TIERS --- */}
              <h3 className="text-xl font-extrabold text-gray-900 mt-8 mb-4">Available Plans</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Starter Plan Card */}
                <div className={`rounded-3xl p-6 border-2 transition-all relative ${vendorData.plan === "STARTER" ? "border-sabi-primary bg-emerald-50/30" : "border-gray-200 bg-white"}`}>
                  {vendorData.plan === "STARTER" && (
                    <span className="absolute top-0 right-6 -translate-y-1/2 bg-sabi-primary text-white text-[10px] font-extrabold uppercase px-2 py-1 rounded-md">
                      Current Plan
                    </span>
                  )}
                  <h4 className="text-lg font-extrabold text-gray-900">Starter Plan</h4>
                  <div className="mt-2 mb-4">
                    <span className="text-2xl font-black text-gray-900">₦3,000</span>
                    <span className="text-xs font-bold text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Up to 100 Products
                    </li>
                    <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> 3 Images per Product
                    </li>
                    <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Dynamic Storefront Banner
                    </li>
                    <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Custom Delivery Rules
                    </li>
                  </ul>
                  <button 
                    onClick={() => handleUpgrade("STARTER")}
                    disabled={isLoading || vendorData.plan === "STARTER"}
                    className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${vendorData.plan === "STARTER" ? "bg-emerald-100 text-emerald-700 cursor-not-allowed" : "bg-sabi-primary hover:bg-sabi-primaryDark text-white shadow-md"}`}
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : vendorData.plan === "STARTER" ? "Active" : "Upgrade to Starter"}
                  </button>
                </div>

                {/* Growth Plan Card */}
                <div className={`rounded-3xl p-6 border-2 transition-all relative overflow-hidden ${vendorData.plan === "GROWTH" ? "border-gray-900 bg-gray-900 text-white" : "border-[#044e3b] bg-[#044e3b] text-white"}`}>
                  {vendorData.plan === "GROWTH" && (
                    <span className="absolute top-0 right-6 -translate-y-1/2 bg-yellow-400 text-yellow-900 text-[10px] font-extrabold uppercase px-2 py-1 rounded-md">
                      Current Plan
                    </span>
                  )}
                  <div className="absolute -right-10 -top-10 text-emerald-400/20"><Star className="w-32 h-32 fill-current" /></div>
                  <h4 className="text-lg font-extrabold relative z-10">Growth Plan</h4>
                  <div className="mt-2 mb-4 relative z-10">
                    <span className="text-2xl font-black">₦8,000</span>
                    <span className="text-xs font-bold text-emerald-100">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6 relative z-10">
                    <li className="flex items-start gap-2 text-sm font-medium text-emerald-50">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Unlimited Products
                    </li>
                    <li className="flex items-start gap-2 text-sm font-medium text-emerald-50">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> 5 Images per Product
                    </li>
                    <li className="flex items-start gap-2 text-sm font-medium text-emerald-50">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Remove "SabiSell" Branding
                    </li>
                    <li className="flex items-start gap-2 text-sm font-medium text-emerald-50">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Advanced Analytics
                    </li>
                  </ul>
                  <button 
                    onClick={() => handleUpgrade("GROWTH")}
                    disabled={isLoading || vendorData.plan === "GROWTH"}
                    className={`w-full py-3 rounded-xl font-bold transition-all relative z-10 flex items-center justify-center gap-2 ${vendorData.plan === "GROWTH" ? "bg-white/10 text-white cursor-not-allowed" : "bg-white text-[#044e3b] hover:bg-emerald-50 shadow-md"}`}
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : vendorData.plan === "GROWTH" ? "Active" : "Upgrade to Growth"}
                  </button>
                </div>
              </div>

              {/* Billing History (Only visible if not on free plan) */}
              {vendorData.plan !== "FREE" && (
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col mt-8">
                   <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="text-lg font-extrabold text-gray-900">Billing History</h3>
                   </div>
                   <div className="divide-y divide-gray-100">
                      {invoices.map((invoice, idx) => (
                         <div key={idx} className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center shrink-0 border border-gray-200">
                                  <FileText className="w-5 h-5" />
                               </div>
                               <div>
                                  <h4 className="text-sm font-bold text-gray-900">{invoice.id} <span className="mx-1 text-gray-300">•</span> {invoice.plan}</h4>
                                  <p className="text-xs font-medium text-gray-500 mt-0.5">{invoice.date}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-4">
                               <div className="text-right">
                                  <p className="text-sm font-extrabold text-gray-900">{invoice.amount}</p>
                                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block border border-emerald-100">
                                     {invoice.status}
                                  </span>
                               </div>
                               <button className="p-2 text-gray-400 hover:text-sabi-primary hover:bg-emerald-50 rounded-lg transition-colors hidden sm:block">
                                  <Download className="w-5 h-5" />
                               </button>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
              )}
           </div>

           {/* ================= RIGHT COLUMN (Billing Details) ================= */}
           <div className={`lg:col-span-5 space-y-6 ${activeTab === 'details' ? 'block' : 'hidden lg:block'}`}>
              
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                 <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-extrabold text-gray-900">Payment Method</h3>
                    <p className="text-sm font-medium text-gray-500 mt-1">Update your card details for subscription renewals.</p>
                 </div>
                 
                 <div className="p-6">
                    {vendorData.plan === "FREE" ? (
                      <div className="text-center py-6">
                        <CreditCard className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm font-bold text-gray-900">No payment method added.</p>
                        <p className="text-xs font-medium text-gray-500">Upgrade your plan to add a card.</p>
                      </div>
                    ) : (
                      <>
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center justify-between mb-6">
                           <div className="flex items-center gap-3">
                              <div className="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm shrink-0">
                                 <span className="text-[#1434CB] font-extrabold italic text-sm">VISA</span>
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-gray-900">•••• •••• •••• 4242</p>
                                 <p className="text-xs font-medium text-gray-500">Expires 12/28</p>
                              </div>
                           </div>
                           <button className="text-sabi-primary text-sm font-bold flex items-center gap-1 hover:underline">
                              <Edit3 className="w-4 h-4" /> Edit
                           </button>
                        </div>

                        <div className="flex items-start justify-between gap-4 cursor-pointer" onClick={() => setIsAutoRenew(!isAutoRenew)}>
                           <div>
                              <h4 className="text-sm font-bold text-gray-900">Auto-Renew Subscription</h4>
                              <p className="text-xs font-medium text-gray-500 mt-1 leading-relaxed max-w-[250px]">
                                 Automatically renew and charge my payment method every month.
                              </p>
                           </div>
                           <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 mt-1 ${isAutoRenew ? 'bg-sabi-primary' : 'bg-gray-300'}`}>
                              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${isAutoRenew ? 'translate-x-6' : 'translate-x-0'}`}></div>
                           </div>
                        </div>
                      </>
                    )}
                 </div>
              </div>

              {/* Billing Address Form */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                 <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                       <h3 className="text-lg font-extrabold text-gray-900">Billing Address</h3>
                       <p className="text-sm font-medium text-gray-500 mt-1">This appears on your invoices.</p>
                    </div>
                 </div>
                 
                 <div className="p-6 space-y-5">
                    <div>
                       <label className="block text-sm font-bold text-gray-900 mb-2">Legal Business Name</label>
                       <input 
                         type="text" 
                         defaultValue={vendorData.storeName || ""} 
                         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-bold text-gray-900" 
                       />
                    </div>
                    
                    <div>
                       <label className="block text-sm font-bold text-gray-900 mb-2">Billing Email</label>
                       <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                             <Mail className="w-5 h-5 text-gray-400" />
                          </div>
                          <input 
                            type="email" 
                            defaultValue={vendorData.email || ""} 
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-bold text-gray-900" 
                          />
                       </div>
                    </div>

                    <div className="pt-2">
                       <button className="w-full py-4 bg-sabi-primary hover:bg-sabi-primaryDark text-white rounded-xl font-bold transition-all shadow-md text-base">
                          Save Changes
                       </button>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-gray-400 mt-4">
                       <Lock className="w-3.5 h-3.5" /> Secure 256-bit SSL encryption
                    </div>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
};

export default Billing;