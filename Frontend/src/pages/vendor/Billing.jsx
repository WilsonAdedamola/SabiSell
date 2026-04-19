import { useState } from "react";
import { 
  CreditCard, Calendar, CheckCircle2, Download, 
  Zap, ShieldCheck, FileText, ArrowRight, 
  MapPin, Mail, Phone, Edit3, Lock, AlertCircle
} from "lucide-react";

const Billing = () => {
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'details'
  const [isAutoRenew, setIsAutoRenew] = useState(true);

  const invoices = [
    { id: "INV-11002", date: "Jun 12, 2026", amount: "₦5,000", plan: "Pro Plan", status: "Paid" },
    { id: "INV-10945", date: "May 12, 2026", amount: "₦5,000", plan: "Pro Plan", status: "Paid" },
    { id: "INV-10880", date: "Apr 12, 2026", amount: "₦5,000", plan: "Pro Plan", status: "Paid" },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full">
      <div className="max-w-7xl mx-auto space-y-6 w-full animate-in fade-in duration-500">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900">Subscription & Billing</h1>
              <p className="text-sm font-medium text-gray-500 mt-1">Manage your plan, payment methods, and billing history.</p>
           </div>
           <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100 w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold">Verified Business</span>
           </div>
        </div>

        {/* MOBILE TABS (Hidden on Desktop) */}
        <div className="flex bg-gray-100 p-1 rounded-xl lg:hidden">
           <button 
             onClick={() => setActiveTab('overview')}
             className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'overview' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
           >
              Subscription
           </button>
           <button 
             onClick={() => setActiveTab('details')}
             className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'details' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
           >
              Billing Details
           </button>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
           
           {/* ============================================================== */}
           {/* LEFT COLUMN: SUBSCRIPTION OVERVIEW                             */}
           {/* ============================================================== */}
           <div className={`lg:col-span-7 space-y-6 ${activeTab === 'overview' ? 'block' : 'hidden lg:block'}`}>
              
              {/* Current Plan Card */}
              <div className="bg-[#044e3b] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl border border-[#033c2d]">
                 {/* Background Blur */}
                 <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                 
                 <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <span className="inline-block bg-emerald-400 text-emerald-950 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md mb-3">
                             Active Plan
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">Pro Plan</h2>
                          <div className="flex items-baseline gap-1 text-emerald-100">
                             <span className="text-xl font-bold">₦5,000</span>
                             <span className="text-sm font-medium">/month</span>
                          </div>
                       </div>
                       <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-xl text-sm font-bold transition-colors backdrop-blur-sm">
                          Manage Plan
                       </button>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                       <p className="text-emerald-50 text-sm font-bold mb-4">Best for growing your online store</p>
                       <ul className="space-y-3">
                          <li className="flex items-center gap-3 text-sm font-medium text-emerald-100">
                             <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> 10,000 product listings
                          </li>
                          <li className="flex items-center gap-3 text-sm font-medium text-emerald-100">
                             <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Low transaction fees (1.5%)
                          </li>
                          <li className="flex items-center gap-3 text-sm font-medium text-emerald-100">
                             <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Priority 24/7 support
                          </li>
                          <li className="flex items-center gap-3 text-sm font-medium text-emerald-100">
                             <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Detailed sales & analytics reports
                          </li>
                       </ul>
                    </div>
                 </div>
              </div>

              {/* Billing Cycle Tracker */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex items-center justify-between gap-4 flex-wrap">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                       <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="text-sm font-bold text-gray-900">Next billing date</h4>
                       <p className="text-sm font-medium text-gray-500 mt-0.5">July 12, 2026 • ₦5,000</p>
                    </div>
                 </div>
                 
                 {/* Progress indicator */}
                 <div className="text-right w-full sm:w-auto">
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                       <span className="text-sabi-primary">23 days remaining</span>
                       <span className="text-gray-400">30 days</span>
                    </div>
                    <div className="w-full sm:w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full bg-sabi-primary rounded-full w-[25%]"></div>
                    </div>
                 </div>
              </div>

              {/* Billing History */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                 <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-extrabold text-gray-900">Billing History</h3>
                    <button className="text-sabi-primary text-sm font-bold hover:underline">View All</button>
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

              {/* Upgrade Banner */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-100 flex items-center justify-between gap-4">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
                       <Zap className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="text-base font-bold text-gray-900">Need more features?</h4>
                       <p className="text-xs sm:text-sm font-medium text-gray-600 mt-0.5">Upgrade to the Premium Plan to unlock advanced tools.</p>
                    </div>
                 </div>
                 <button className="shrink-0 bg-white border border-amber-200 text-amber-700 hover:bg-amber-100 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors">
                    Upgrade
                 </button>
              </div>
           </div>

           {/* ============================================================== */}
           {/* RIGHT COLUMN: BILLING DETAILS & FORM                           */}
           {/* ============================================================== */}
           <div className={`lg:col-span-5 space-y-6 ${activeTab === 'details' ? 'block' : 'hidden lg:block'}`}>
              
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                 <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-extrabold text-gray-900">Payment Method</h3>
                    <p className="text-sm font-medium text-gray-500 mt-1">Update your card details for subscription renewals.</p>
                 </div>
                 
                 <div className="p-6">
                    {/* Current Card */}
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center justify-between mb-6">
                       <div className="flex items-center gap-3">
                          <div className="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm shrink-0">
                             {/* Faux Visa Logo */}
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

                    {/* Auto-Renew Toggle */}
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
                         defaultValue="Zara Stitches & Fashion Ltd." 
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
                            defaultValue="billing@zarafashion.com" 
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-bold text-gray-900" 
                          />
                       </div>
                    </div>

                    <div>
                       <label className="block text-sm font-bold text-gray-900 mb-2">Phone Number</label>
                       <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                             <Phone className="w-5 h-5 text-gray-400" />
                          </div>
                          <input 
                            type="text" 
                            defaultValue="+234 812 345 6789" 
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-bold text-gray-900" 
                          />
                       </div>
                    </div>

                    <div>
                       <label className="block text-sm font-bold text-gray-900 mb-2">Business Address</label>
                       <div className="relative">
                          <div className="absolute top-3.5 left-4 flex items-center pointer-events-none">
                             <MapPin className="w-5 h-5 text-gray-400" />
                          </div>
                          <textarea 
                            rows="2"
                            defaultValue="23 Allen Avenue, Ikeja, Lagos State, Nigeria."
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-700 resize-none"
                          ></textarea>
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