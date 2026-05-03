import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Store, ExternalLink, TrendingUp, ShoppingCart, Users, Package,
  ChevronRight, Share2, Plus, Tag, ClipboardList, Lock,
  ShoppingBag, Headphones, PlayCircle, CheckCircle2, PackageOpen, CreditCard, Loader2
} from "lucide-react";
import api from '../../utils/api';
import { DashboardSkeleton } from "../../components/shared/Skeletons";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Real Dynamic State
  const [vendor, setVendor] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeDashboard = async () => {
      // 1. Grab the user data
      const savedVendor = localStorage.getItem('sabisell_vendor');
      
      if (!savedVendor) {
        navigate('/login');
        return;
      }

      const parsedVendor = JSON.parse(savedVendor);
      setVendor(parsedVendor);

      // 2. If they haven't set up their store, stop here. We know they are in State 1.
      if (!parsedVendor.isOnline) {
        setIsLoading(false);
        return;
      }

      // 3. If they have a store, fetch their real stats from our backend API
      try {
        const response = await api.get('/vendors/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeDashboard();
  }, [navigate]);

  // Loading Screen
  if (isLoading) {
    return <DashboardSkeleton />
  }

  if (!vendor) return null;

  // Determine the current state based on real data
  let dashboardState = "not-started";
  if (vendor.isOnline) {
    if (dashboardData?.stats?.totalProducts === 0) {
      dashboardState = "no-products";
    } else {
      dashboardState = "active";
    }
  }

  // --- DYNAMIC STORE URL LOGIC ---
  const isFreeHost = window.location.hostname.includes('vercel.app') || window.location.hostname.includes('localhost');
  const storeUrl = vendor?.storeLink 
    ? (isFreeHost 
        ? `/store/${vendor.storeLink}` 
        : `${window.location.protocol}//${vendor.storeLink}.${window.location.host.replace('www.', '')}`)
    : "#";

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full relative">
      <div className="max-w-7xl mx-auto w-full animate-in fade-in duration-500 mt-4 sm:mt-0">
        
        {/* STATE 1: BEFORE ANY SETUP (Not Started) */}
        {dashboardState === "not-started" && (
          <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center pt-8 sm:pt-16 pb-10">
             
             {/* Illustration Approximation */}
             <div className="relative w-48 h-48 mb-8">
                <div className="absolute inset-0 bg-emerald-100 rounded-full blur-2xl opacity-60"></div>
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                   <Store className="w-28 h-28 text-emerald-800" />
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2 bg-orange-100 border border-orange-200 text-orange-800 text-[10px] font-extrabold px-3 py-1 rounded shadow-sm rotate-[-5deg]">
                      CLOSED
                   </div>
                   <ShoppingBag className="absolute bottom-2 right-4 w-12 h-12 text-sabi-primary fill-sabi-primary/20" />
                </div>
             </div>

             <div className="text-center w-full">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Let's Set Up Your Store 🚀</h1>
                <p className="text-gray-500 text-sm font-medium mb-8 max-w-sm mx-auto leading-relaxed">
                   You're just a few steps away from starting your online business on SabiSell.
                </p>

                {/* Feature List */}
                <div className="bg-[#F8FAFC] border border-gray-100 rounded-3xl p-6 text-left mb-8 shadow-sm">
                   <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">💡</span>
                      <h4 className="font-extrabold text-gray-900 text-sm">What you'll get:</h4>
                   </div>
                   <ul className="space-y-3">
                      {[
                         "A free online store link",
                         "Add products & start selling",
                         "Receive orders from customers",
                         "Get paid securely"
                      ].map((item, i) => (
                         <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                            <CheckCircle2 className="w-5 h-5 text-sabi-primary shrink-0" />
                            {item}
                         </li>
                      ))}
                   </ul>
                </div>

                {/* Progress Bar */}
                <div className="w-full text-left mb-6">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-gray-900">Complete Setup <span className="text-gray-500 font-medium">(Takes less than 2 minutes)</span></span>
                      <span className="text-xs font-extrabold text-gray-900">0%</span>
                   </div>
                   <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-sabi-primary rounded-full w-[5%]"></div>
                   </div>
                </div>

                {/* Primary CTA */}
                <Link to="/onboarding" className="w-full flex flex-col items-center justify-center py-4 bg-[#044e3b] hover:bg-sabi-primaryDark text-white rounded-2xl transition-all shadow-lg mb-8">
                   <span className="flex items-center gap-2 font-bold text-base"><Store className="w-5 h-5" /> Start Store Setup</span>
                   <span className="text-xs font-medium text-emerald-300 mt-0.5">Create your store in 3 quick steps</span>
                </Link>

                <div className="relative flex items-center py-4 mb-4">
                   <div className="grow border-t border-gray-200"></div>
                   <span className="shrink-0 mx-4 text-gray-400 text-xs font-medium">Need help getting started?</span>
                   <div className="grow border-t border-gray-200"></div>
                </div>

                {/* Support CTA */}
                <Link to="/contact" className="w-full bg-white border border-gray-200 hover:bg-gray-50 rounded-2xl p-4 flex items-center justify-between transition-colors shadow-sm">
                   <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                         <Headphones className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                         <h4 className="font-bold text-gray-900 text-sm">Contact Support</h4>
                         <p className="text-xs font-medium text-gray-500">We're here to help you launch</p>
                      </div>
                   </div>
                   <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>

             </div>
          </div>
        )}

       
        {/* STATE 2: AFTER ONBOARDING, NO SALES/PRODUCTS YET */}
        {dashboardState === "no-products" && (
          <div className="space-y-6 w-full">
            
            {/* 1. WELCOME BANNER (Great Start Variant) */}
            <div className="bg-[#044e3b] rounded-4xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl">
              <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>

              <div className="flex flex-col sm:flex-row items-center gap-5 z-10 w-full md:w-auto text-center sm:text-left">
                {vendor.logoUrl && vendor.logoUrl !== "null" ? (
                  <img src={vendor.logoUrl} alt="Store Logo" className="w-20 h-20 rounded-full object-cover shadow-lg border-4 border-emerald-800/50 bg-white" />
                ) : (
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg p-2 border-4 border-emerald-800/50">
                    <div className="w-full h-full bg-emerald-50 rounded-full flex items-center justify-center">
                      <span className="text-sabi-primary font-bold text-xl uppercase">{vendor.storeName?.substring(0, 2)}</span>
                    </div>
                  </div>
                )}
                
                <div>
                  <h1 className="text-2xl lg:text-3xl font-extrabold text-white mb-1 flex items-center justify-center sm:justify-start gap-2">
                    Great start, {vendor.fullName.split(' ')[0]}! <span className="text-2xl">👋</span>
                  </h1>
                  <p className="text-emerald-100/90 text-sm lg:text-base font-medium">
                    Your store <strong>{vendor.storeName}</strong> is ready. Let's add products!
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 z-10 w-full md:w-auto items-center md:items-end">
                <div className="flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1.5 rounded-full border border-emerald-500/30 w-fit">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-emerald-100 text-xs font-bold uppercase tracking-wider">Online</span>
                </div>
                {/* --- FIXED: View Store Link --- */}
                <a href={storeUrl} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 border border-white/20 transition-colors rounded-xl px-6 py-2.5 flex items-center gap-2 text-white font-bold text-sm w-full md:w-auto justify-center">
                  View Store <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* 2. STAT CARDS (Zero State) */}
            <div>
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-extrabold text-gray-900">Overview</h3>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <div className="bg-[#F0FDF4] rounded-2xl p-4 sm:p-5 border border-emerald-100">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                    <Lock className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm font-bold mb-1">Total Sales</p>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-1">₦0</h3>
                  <p className="text-[10px] sm:text-xs font-medium text-gray-500">No sales yet</p>
                </div>

                <div className="bg-[#EFF6FF] rounded-2xl p-4 sm:p-5 border border-blue-100">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm font-bold mb-1">Total Orders</p>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-1">0</h3>
                  <p className="text-[10px] sm:text-xs font-medium text-gray-500">No orders yet</p>
                </div>

                <div className="bg-[#FAF5FF] rounded-2xl p-4 sm:p-5 border border-purple-100">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm font-bold mb-1">Customers</p>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-1">0</h3>
                  <p className="text-[10px] sm:text-xs font-medium text-gray-500">No customers yet</p>
                </div>

                <div className="bg-[#FFF7ED] rounded-2xl p-4 sm:p-5 border border-orange-100">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                    <Package className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm font-bold mb-1">Pending Orders</p>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-1">0</h3>
                  <p className="text-[10px] sm:text-xs font-medium text-gray-500">No pending orders</p>
                </div>
              </div>
            </div>

            {/* 3. EMPTY STATE PROMPT */}
            <div className="bg-white rounded-4xl p-8 sm:p-12 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
               <div className="relative w-32 h-32 mb-6">
                  <div className="absolute inset-0 bg-emerald-50 rounded-full animate-pulse"></div>
                  <PackageOpen className="absolute bottom-4 left-2 w-16 h-16 text-yellow-600/80" />
                  <ShoppingBag className="absolute top-2 right-2 w-16 h-16 text-sabi-primary fill-sabi-primary/20" />
               </div>
               <h3 className="text-xl font-extrabold text-gray-900 mb-2">You haven't added any products yet</h3>
               <p className="text-gray-500 text-sm font-medium mb-8 max-w-sm">
                  Add your first product to start receiving orders and grow your business.
               </p>
               <Link to="/dashboard/products/new" className="bg-[#044e3b] hover:bg-sabi-primaryDark text-white px-8 py-3.5 rounded-full font-bold flex items-center gap-2 shadow-lg mb-4 transition-colors">
                  <Plus className="w-5 h-5" /> Add Your First Product
               </Link>
               <button className="flex items-center gap-2 text-sabi-primary font-bold text-sm hover:underline">
                  <PlayCircle className="w-4 h-4" /> Watch how to add a product (30s)
               </button>
            </div>

          </div>
        )}

       
        {/* STATE 3: FULLY ACTIVE */}
        {dashboardState === "active" && dashboardData && (
          <div className="space-y-6 w-full">
            {/* 1. WELCOME BANNER */}
            <div className="bg-[#044e3b] rounded-4xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl">
              <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>

              <div className="flex flex-col sm:flex-row items-center gap-5 z-10 w-full md:w-auto text-center sm:text-left">
                {vendor.logoUrl && vendor.logoUrl !== "null" ? (
                  <img src={vendor.logoUrl} alt="Store Logo" className="w-20 h-20 rounded-full object-cover shadow-lg border-4 border-emerald-800/50 bg-white" />
                ) : (
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg p-2 border-4 border-emerald-800/50">
                    <div className="w-full h-full bg-emerald-50 rounded-full flex items-center justify-center">
                      <span className="text-sabi-primary font-bold text-xl uppercase">{vendor.storeName?.substring(0, 2)}</span>
                    </div>
                  </div>
                )}
                <div>
                  <h1 className="text-2xl lg:text-3xl font-extrabold text-white mb-1 flex items-center justify-center sm:justify-start gap-2">
                    Welcome back, {vendor.fullName.split(' ')[0]}! <span className="text-2xl">👋</span>
                  </h1>
                  <p className="text-emerald-100/90 text-sm lg:text-base font-medium">
                    Here's what's happening with <strong>{vendor.storeName}</strong> today.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 z-10 w-full md:w-auto">
                <div className="bg-emerald-900/50 border border-emerald-700/50 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between gap-6">
                  <span className="text-emerald-100 text-xs font-bold uppercase tracking-wider">Store Status</span>
                  <div className="flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-emerald-300 text-xs font-bold">Online</span>
                  </div>
                </div>
                {/* --- FIXED: Clickable Store Link in Welcome Banner --- */}
                <a 
                  href={storeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 transition-colors rounded-xl p-3 cursor-pointer"
                >
                  <span className="text-emerald-50 text-sm font-medium truncate max-w-45">
                    {window.location.host.replace('www.', '')}/store/{vendor.storeLink}
                  </span>
                  <ExternalLink className="w-4 h-4 text-emerald-300 ml-auto shrink-0" />
                </a>
              </div>
            </div>

            {/* 2. STAT CARDS (Real Data) */}
            <div>
              <div className="flex justify-end mb-4">
                <select className="bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sabi-primary/20">
                  <option>All Time</option>
                </select>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <div className="bg-[#F0FDF4] rounded-2xl p-5 border border-emerald-100">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <Store className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="text-gray-600 text-sm font-bold mb-1">Total Revenue</p>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">₦{parseFloat(dashboardData.stats.totalRevenue).toLocaleString()}</h3>
                </div>

                <div className="bg-[#EFF6FF] rounded-2xl p-5 border border-blue-100">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-gray-600 text-sm font-bold mb-1">Total Orders</p>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">{dashboardData.stats.totalOrders}</h3>
                </div>

                <div className="bg-[#FAF5FF] rounded-2xl p-5 border border-purple-100">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-gray-600 text-sm font-bold mb-1">Total Products</p>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">{dashboardData.stats.totalProducts}</h3>
                </div>

                <div className="bg-[#FFF7ED] rounded-2xl p-5 border border-orange-100 flex flex-col">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                    <Users className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-gray-600 text-sm font-bold mb-1">Store Visits</p>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">--</h3>
                  <p className="text-[10px] sm:text-xs font-medium text-gray-500">Coming soon</p>
                </div>
              </div>
            </div>

            {/* 3. RECENT ORDERS (Real Data) */}
            <div className="bg-white rounded-4xl p-6 border border-gray-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-extrabold text-gray-900">Recent Orders</h3>
                <Link to="/dashboard/orders" className="text-sabi-primary text-sm font-bold flex items-center hover:underline">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {dashboardData.recentOrders.length === 0 ? (
                <div className="text-center py-6 text-gray-500 text-sm font-medium border border-dashed border-gray-200 rounded-xl">
                  No recent orders to show. Share your store link!
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-4 overflow-y-auto hide-scrollbar pr-2">
                  {dashboardData.recentOrders.map((order, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer bg-gray-50/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold border border-gray-200 uppercase">
                          {order.customer.fullName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">{order.customer.fullName}</h4>
                          <p className="text-[10px] font-medium text-gray-500">{order.orderNumber}</p>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          order.status === "PENDING" ? "bg-orange-100 text-orange-700" : 
                          order.status === "PAID" || order.status === "DELIVERED" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"
                        }`}>{order.status}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-extrabold text-gray-900">₦{parseFloat(order.totalAmount).toLocaleString()}</span>
                          <ChevronRight className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;