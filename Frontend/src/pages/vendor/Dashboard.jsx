import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Store, ExternalLink, TrendingUp, ShoppingCart, Users, Package,
  ChevronRight, Share2, Plus, Tag, ClipboardList, Lock,
  ShoppingBag, Headphones, PlayCircle, CheckCircle2, PackageOpen, CreditCard, Loader2, PowerOff
} from "lucide-react";
import api from '../../utils/api';
import { DashboardSkeleton } from "../../components/shared/Skeletons";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // 1. Secure Global State
  const { vendor, isLoading: isAuthLoading } = useAuth();
  
  // 2. Local Data State
  const [dashboardData, setDashboardData] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    // Wait for the AuthContext to finish checking the secure cookie
    if (isAuthLoading) return;

    // If no secure session exists, redirect to login
    if (!vendor) {
      navigate('/login');
      return;
    }

    // State 1 Check: Have they NEVER set up a store?
    if (!vendor.storeLink) {
      setIsDataLoading(false);
      return; 
    }

    // Fetch strictly online stats from our updated backend
    const fetchDashboardStats = async () => {
      try {
        const response = await api.get('/vendors/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchDashboardStats();
  }, [vendor, isAuthLoading, navigate]);

  // Handle Loading Screens dynamically
  if (isAuthLoading || (vendor?.storeLink && isDataLoading)) {
    return <DashboardSkeleton />
  }

  // Prevent flicker right before unauthenticated redirect
  if (!vendor) return null;

  // DETERMINE DASHBOARD STATE
  let dashboardState = "not-started";
  
  if (vendor.storeLink) {
    if (dashboardData?.stats?.totalProducts === 0) {
      dashboardState = "no-products"; // Store exists, but empty
    } else {
      dashboardState = "active"; // Store exists, has products
    }
  }

  // DYNAMIC STORE URL LOGIC
  const isFreeHost = window.location.hostname.includes('vercel.app') || window.location.hostname.includes('localhost');
  const storeUrl = vendor?.storeLink 
    ? (isFreeHost 
        ? `/store/${vendor.storeLink}` 
        : `${window.location.protocol}//${vendor.storeLink}.${window.location.host.replace('www.', '')}`)
    : "#";

  // STRICTLY FILTER OUT OFFLINE SALES FROM RECENT ORDERS
  const onlineRecentOrders = dashboardData?.recentOrders?.filter(order => order.channel !== 'OFFLINE') || [];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full relative">
      <div className="max-w-7xl mx-auto w-full animate-in fade-in duration-500 mt-4 sm:mt-0">
        
    
        {/* STATE 1: BEFORE ANY SETUP (Not Started / No StoreLink)   */}
    
        {dashboardState === "not-started" && (
          <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center pt-8 sm:pt-16 pb-10">
             
             <div className="relative w-48 h-48 mb-8">
                <div className="absolute inset-0 bg-emerald-100 rounded-full blur-2xl opacity-60"></div>
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                   <Store className="w-28 h-28 text-emerald-800" />
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2 bg-orange-100 border border-orange-200 text-orange-800 text-[10px] font-extrabold px-3 py-1 rounded shadow-sm rotate-[-5deg]">
                      UNPUBLISHED
                   </div>
                   <ShoppingBag className="absolute bottom-2 right-4 w-12 h-12 text-sabi-primary fill-sabi-primary/20" />
                </div>
             </div>

             <div className="text-center w-full">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Let's Set Up Your Store 🚀</h1>
                <p className="text-gray-500 text-sm font-medium mb-8 max-w-sm mx-auto leading-relaxed">
                   You're just a few steps away from starting your online business on SabiSell.
                </p>

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

                <div className="w-full text-left mb-6">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-gray-900">Complete Setup <span className="text-gray-500 font-medium">(Takes less than 2 minutes)</span></span>
                      <span className="text-xs font-extrabold text-gray-900">0%</span>
                   </div>
                   <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-sabi-primary rounded-full w-[5%]"></div>
                   </div>
                </div>

                <Link to="/onboarding" className="w-full flex flex-col items-center justify-center py-4 bg-[#044e3b] hover:bg-sabi-primaryDark text-white rounded-2xl transition-all shadow-lg mb-8">
                   <span className="flex items-center gap-2 font-bold text-base"><Store className="w-5 h-5" /> Start Store Setup</span>
                   <span className="text-xs font-medium text-emerald-300 mt-0.5">Create your store in 3 quick steps</span>
                </Link>

                <div className="relative flex items-center py-4 mb-4">
                   <div className="grow border-t border-gray-200"></div>
                   <span className="shrink-0 mx-4 text-gray-400 text-xs font-medium">Need help getting started?</span>
                   <div className="grow border-t border-gray-200"></div>
                </div>

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

       
    
        {/* SHARED LOGIC FOR DASHBOARDS (STATES 2 & 3)               */}
    
        {(dashboardState === "no-products" || dashboardState === "active") && (
          <div className="space-y-6 w-full">
            
            {/* OFFLINE WARNING BANNER */}
            {!vendor.isOnline && (
              <div className="bg-orange-50 border-2 border-orange-200 rounded-3xl p-5 flex items-center justify-between gap-4 animate-in slide-in-from-top-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                    <PowerOff className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-orange-900 leading-tight">Your Store is Currently Offline</h3>
                    <p className="text-sm font-medium text-orange-700 mt-0.5">
                      Customers cannot visit your link or buy products right now.
                    </p>
                  </div>
                </div>
                <Link to="/dashboard/settings" className="shrink-0 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
                  Turn Online
                </Link>
              </div>
            )}

            {/* 1. WELCOME BANNER */}
            <div className={`rounded-4xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-lg transition-colors duration-500 ${vendor.isOnline ? 'bg-[#044e3b]' : 'bg-gray-800'}`}>
              
              {vendor.isOnline ? (
                <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
              ) : (
                <div className="absolute right-0 top-0 w-64 h-64 bg-gray-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-5 z-10 w-full md:w-auto text-center sm:text-left">
                {vendor.logoUrl && vendor.logoUrl !== "null" ? (
                  <img src={vendor.logoUrl} alt="Store Logo" className={`w-20 h-20 rounded-full object-cover shadow-lg border-4 bg-white ${vendor.isOnline ? 'border-emerald-800/50' : 'border-gray-600/50'}`} />
                ) : (
                  <div className={`w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg p-2 border-4 ${vendor.isOnline ? 'border-emerald-800/50' : 'border-gray-600/50'}`}>
                    <div className={`w-full h-full rounded-full flex items-center justify-center ${vendor.isOnline ? 'bg-emerald-50' : 'bg-gray-100'}`}>
                      <span className={`font-bold text-xl uppercase ${vendor.isOnline ? 'text-sabi-primary' : 'text-gray-700'}`}>{vendor.storeName?.substring(0, 2)}</span>
                    </div>
                  </div>
                )}
                
                <div>
                  <h1 className="text-2xl lg:text-3xl font-extrabold text-white mb-1 flex items-center justify-center sm:justify-start gap-2">
                    {dashboardState === "no-products" ? `Great start, ${vendor.fullName.split(' ')[0]}!` : `Welcome back, ${vendor.fullName.split(' ')[0]}!`} <span className="text-2xl">👋</span>
                  </h1>
                  <p className="text-white/80 text-sm lg:text-base font-medium">
                    {dashboardState === "no-products" 
                      ? <>Your store <strong>{vendor.storeName}</strong> is ready. Let's add products</>
                      : <>Here's what's happening with your online store today.</>}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 z-10 w-full md:w-auto items-center md:items-end">
                <div className={`border backdrop-blur-sm rounded-xl p-3 flex items-center justify-between gap-6 ${vendor.isOnline ? 'bg-emerald-900/50 border-emerald-700/50' : 'bg-gray-900/50 border-gray-700/50'}`}>
                  <span className={`text-xs font-bold uppercase tracking-wider ${vendor.isOnline ? 'text-emerald-100' : 'text-gray-300'}`}>Store Status</span>
                  
                  {vendor.isOnline ? (
                    <div className="flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                      <span className="text-emerald-300 text-xs font-bold">Online</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-gray-500/20 px-3 py-1 rounded-full border border-gray-500/30">
                      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      <span className="text-gray-300 text-xs font-bold">Offline</span>
                    </div>
                  )}

                </div>
                
                {/* Store Link Button */}
                <a 
                  href={vendor.isOnline ? storeUrl : "#"} 
                  target={vendor.isOnline ? "_blank" : "_self"}
                  rel="noopener noreferrer" 
                  className={`flex items-center gap-2 border transition-colors rounded-xl p-3 ${vendor.isOnline ? 'bg-white/10 hover:bg-white/20 border-white/20 cursor-pointer' : 'bg-white/5 border-white/10 opacity-60 cursor-not-allowed'}`}
                >
                  <span className="text-white text-sm font-medium truncate max-w-45">
                    {window.location.host.replace('www.', '')}/store/{vendor.storeLink}
                  </span>
                  <ExternalLink className="w-4 h-4 text-white ml-auto shrink-0" />
                </a>
              </div>
            </div>

            {/* 2. STAT CARDS */}
            <div>
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-extrabold text-gray-900">Online Store Overview</h3>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <div className="bg-[#F0FDF4] rounded-3xl p-5 border border-emerald-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <Store className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm font-bold mb-1">Online Revenue</p>
                  <h3 className="text-2xl font-black text-gray-900 mb-1">₦{parseFloat(dashboardData?.stats?.totalRevenue || 0).toLocaleString()}</h3>
                </div>

                <div className="bg-[#EFF6FF] rounded-3xl p-5 border border-blue-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm font-bold mb-1">Online Orders</p>
                  <h3 className="text-2xl font-black text-gray-900 mb-1">{dashboardData?.stats?.totalOrders || 0}</h3>
                </div>

                <div className="bg-[#FAF5FF] rounded-3xl p-5 border border-purple-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm font-bold mb-1">Total Products</p>
                  <h3 className="text-2xl font-black text-gray-900 mb-1">{dashboardData?.stats?.totalProducts || 0}</h3>
                </div>

                <div className="bg-[#FFF7ED] rounded-3xl p-5 border border-orange-100 flex flex-col shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                    <Users className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm font-bold mb-1">Store Visits</p>
                  <h3 className="text-2xl font-black text-gray-900 mb-1">--</h3>
                  <p className="text-[10px] sm:text-xs font-bold text-orange-500 uppercase tracking-wider mt-auto">Coming Soon</p>
                </div>
              </div>
            </div>

        
            {/* SUB-STATE: NO PRODUCTS CALL TO ACTION                      */}
        
            {dashboardState === "no-products" && (
              <div className="bg-white rounded-4xl p-8 sm:p-12 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center mt-6">
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
              </div>
            )}

        
            {/* SUB-STATE: ACTIVE RECENT ORDERS                          */}
        
            {dashboardState === "active" && (
              <div className="bg-white rounded-4xl p-6 lg:p-8 border border-gray-100 shadow-sm flex flex-col mt-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-extrabold text-gray-900">Recent Online Orders</h3>
                  <Link to="/dashboard/orders" className="text-sabi-primary text-sm font-bold flex items-center hover:underline">
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {onlineRecentOrders.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 border border-dashed border-gray-200 rounded-2xl flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
                      <ShoppingCart className="w-6 h-6 text-gray-300" />
                    </div>
                    <p className="text-gray-500 text-sm font-bold mb-1">No online orders yet</p>
                    <p className="text-gray-400 text-xs font-medium max-w-xs mx-auto">Share your store link on social media to get your first sale!</p>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col gap-4 overflow-y-auto hide-scrollbar pr-2">
                    {onlineRecentOrders.map((order, i) => {
                      const customerName = order.customerName || order.customer?.fullName || "Guest";
                      const orderId = order.orderNumber || order.id || "N/A";
                      const amount = order.totalAmount || order.total || 0;

                      return (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-emerald-200 transition-colors cursor-pointer bg-gray-50/50 hover:bg-emerald-50/30 group">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-900 font-extrabold border border-gray-200 uppercase shadow-sm">
                              {customerName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="text-sm font-extrabold text-gray-900 group-hover:text-sabi-primary transition-colors">{customerName}</h4>
                              <p className="text-xs font-bold text-gray-400 mt-0.5">{orderId}</p>
                            </div>
                          </div>
                          <div className="text-right flex flex-col items-end gap-2">
                            <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider ${
                              order.status === "PENDING" ? "bg-orange-100 text-orange-700" : 
                              order.status === "PAID" || order.status === "DELIVERED" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-700"
                            }`}>{order.status || "COMPLETED"}</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-black text-gray-900">₦{parseFloat(amount).toLocaleString()}</span>
                              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-sabi-primary transition-colors" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;