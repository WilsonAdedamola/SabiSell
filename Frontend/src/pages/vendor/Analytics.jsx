import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp, Users, ShoppingCart, Package, Lock, Star, 
  ChevronDown, Calendar, ArrowUpRight, ArrowDownRight, Globe, Store, Filter, CheckCircle2
} from "lucide-react";
import api from '../../utils/api';
import { DashboardSkeleton } from "../../components/shared/Skeletons";

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState("Last 7 Days");
  
  // Simulated Analytics Data (Ready to be replaced with real API call)
  const [data, setData] = useState(null);

  // Vendor Plan Logic
  const vendor = JSON.parse(localStorage.getItem('sabisell_vendor') || '{}');
  const currentPlan = vendor.plan?.toUpperCase() || "FREE";
  
  const isFree = currentPlan === "FREE";
  const isStarter = currentPlan === "STARTER";
  const isGrowth = currentPlan === "GROWTH";

  useEffect(() => {
    // If they are on Free, don't bother fetching data
    if (isFree) {
      setIsLoading(false);
      return;
    }

    // Simulate fetching analytics data from backend
    setTimeout(() => {
      setData({
        overview: {
          totalRevenue: 854000,
          revenueGrowth: 12.5,
          totalOrders: 142,
          ordersGrowth: 8.2,
          storeVisits: 3840,
          visitsGrowth: -2.4,
          conversionRate: 3.7,
          conversionGrowth: 1.1,
          onlineRevenue: 524000,
          offlineRevenue: 330000,
        },
        salesTrend: [
          { label: "Mon", sales: 45000 },
          { label: "Tue", sales: 82000 },
          { label: "Wed", sales: 55000 },
          { label: "Thu", sales: 110000 },
          { label: "Fri", sales: 95000 },
          { label: "Sat", sales: 145000 },
          { label: "Sun", sales: 120000 },
        ],
        topProducts: [
          { id: 1, name: "Luxury Silk Agbada", category: "Men's Wear", sold: 42, revenue: 315000, stock: 8 },
          { id: 2, name: "Gold Plated Chronograph", category: "Accessories", sold: 28, revenue: 140000, stock: 15 },
          { id: 3, name: "Leather Tote Bag", category: "Women's Wear", sold: 19, revenue: 114000, stock: 3 },
          { id: 4, name: "Vintage Sunglasses", category: "Accessories", sold: 15, revenue: 45000, stock: 0 },
        ]
      });
      setIsLoading(false);
    }, 1000);
  }, [isFree]);

  if (isLoading) return <DashboardSkeleton />;

  // --- STATE 1: FREE PLAN (LOCKED) ---
  if (isFree) {
    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50/50 pb-24 relative flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 sm:p-10 text-center border border-gray-100 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 border-4 border-white shadow-sm">
            <Lock className="w-10 h-10 text-purple-600" />
          </div>
          
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3 relative z-10 tracking-tight">Analytics Locked</h2>
          <p className="text-gray-500 text-sm font-medium mb-8 leading-relaxed relative z-10">
            Understand your customers, track your revenue growth, and find your best-selling products. Upgrade to unlock powerful insights.
          </p>

          <div className="bg-gray-50 rounded-2xl p-4 mb-8 text-left space-y-3 relative z-10">
            <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Visual Sales Charts
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Top Performing Products
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Store Traffic & Conversion
            </div>
          </div>

          <Link to="/dashboard/billing" className="w-full inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-600/20 transition-all relative z-10">
            Upgrade Plan to Unlock
          </Link>
        </div>
      </div>
    );
  }

  // Find max sales for the chart scaling
  const maxSales = Math.max(...(data?.salesTrend.map(d => d.sales) || [0]));

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50/50 pb-24 relative">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Analytics</h1>
              <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-widest ${isGrowth ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-sabi-primary'}`}>
                {isGrowth ? 'Advanced' : 'Basic'}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500">
              Track your store's performance and revenue metrics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="w-4 h-4 text-gray-400" />
              </div>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#044e3b]/20 text-sm font-bold text-gray-700 shadow-sm appearance-none cursor-pointer"
              >
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Month</option>
                <option>Last Month</option>
                {isGrowth && <option>All Time</option>}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            {isGrowth && (
              <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-3 py-2.5 rounded-xl transition-all shadow-sm">
                <Filter className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* OVERVIEW METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Revenue (Available to both) */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-sabi-primary" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${data.overview.revenueGrowth >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                {data.overview.revenueGrowth >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(data.overview.revenueGrowth)}%
              </div>
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Revenue</p>
            <h3 className="text-2xl font-black text-gray-900">₦{data.overview.totalRevenue.toLocaleString()}</h3>
          </div>

          {/* Orders (Available to both) */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${data.overview.ordersGrowth >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                {data.overview.ordersGrowth >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(data.overview.ordersGrowth)}%
              </div>
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Orders</p>
            <h3 className="text-2xl font-black text-gray-900">{data.overview.totalOrders.toLocaleString()}</h3>
          </div>

          {/* Store Visits (Growth Only) */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex flex-col relative overflow-hidden">
            {!isGrowth && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                <Lock className="w-5 h-5 text-gray-400 mb-1" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Growth Plan</span>
              </div>
            )}
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${data.overview.visitsGrowth >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                {data.overview.visitsGrowth >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(data.overview.visitsGrowth)}%
              </div>
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Store Visits</p>
            <h3 className="text-2xl font-black text-gray-900">{data.overview.storeVisits.toLocaleString()}</h3>
          </div>

          {/* Conversion Rate (Growth Only) */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex flex-col relative overflow-hidden">
             {!isGrowth && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                <Lock className="w-5 h-5 text-gray-400 mb-1" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Growth Plan</span>
              </div>
            )}
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${data.overview.conversionGrowth >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                {data.overview.conversionGrowth >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(data.overview.conversionGrowth)}%
              </div>
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Conversion Rate</p>
            <h3 className="text-2xl font-black text-gray-900">{data.overview.conversionRate}%</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* SALES TREND CHART (CSS Based) */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm lg:col-span-2 flex flex-col">
            <h3 className="text-lg font-extrabold text-gray-900 mb-6">Revenue Trend</h3>
            
            <div className="flex-1 flex items-end gap-2 sm:gap-4 h-64 mt-auto">
              {data.salesTrend.map((day, idx) => {
                const heightPercentage = (day.sales / maxSales) * 100;
                return (
                  <div key={idx} className="flex flex-col items-center flex-1 group">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded absolute -mt-8 whitespace-nowrap pointer-events-none z-10">
                      ₦{day.sales.toLocaleString()}
                    </div>
                    {/* Bar */}
                    <div className="w-full bg-emerald-50 rounded-t-lg relative overflow-hidden h-full flex items-end">
                      <div 
                        className={`w-full rounded-t-lg transition-all duration-700 ease-out ${isGrowth ? 'bg-[#044e3b]' : 'bg-emerald-300'}`}
                        style={{ height: `${heightPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-gray-500 mt-3">{day.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CHANNEL BREAKDOWN (Growth Only) or UPSELL (Starter) */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col relative overflow-hidden">
            <h3 className="text-lg font-extrabold text-gray-900 mb-6">Sales by Channel</h3>
            
            {isGrowth ? (
              <div className="flex flex-col justify-center h-full">
                {/* Visual Representation of Donut Chart using Progress Bars */}
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-bold text-gray-700">Online Store</span>
                      </div>
                      <span className="text-sm font-black text-gray-900">
                        {Math.round((data.overview.onlineRevenue / data.overview.totalRevenue) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(data.overview.onlineRevenue / data.overview.totalRevenue) * 100}%` }}></div>
                    </div>
                    <p className="text-xs font-medium text-gray-500 mt-1">₦{data.overview.onlineRevenue.toLocaleString()}</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-bold text-gray-700">Offline (Walk-in)</span>
                      </div>
                      <span className="text-sm font-black text-gray-900">
                         {Math.round((data.overview.offlineRevenue / data.overview.totalRevenue) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(data.overview.offlineRevenue / data.overview.totalRevenue) * 100}%` }}></div>
                    </div>
                    <p className="text-xs font-medium text-gray-500 mt-1">₦{data.overview.offlineRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Star className="w-6 h-6 text-purple-600 fill-purple-600" />
                </div>
                <h4 className="font-extrabold text-gray-900 mb-2">Advanced Insights</h4>
                <p className="text-xs font-medium text-gray-600 mb-6">
                  Upgrade to the Growth plan to unlock channel breakdowns, conversion tracking, and more.
                </p>
                <Link to="/dashboard/billing" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-md transition-colors text-sm w-full">
                  Upgrade Plan
                </Link>
              </div>
            )}
          </div>

        </div>

        {/* TOP PRODUCTS TABLE */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col mb-8">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-extrabold text-gray-900">Top Performing Products</h3>
            <Link to="/dashboard/products" className="text-sabi-primary text-sm font-bold hover:underline">
              View Inventory
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-bold">
                  <th className="p-4 pl-6">Product Name</th>
                  <th className="p-4 text-center">Units Sold</th>
                  <th className="p-4 text-right">Revenue Generated</th>
                  <th className="p-4 text-center pr-6">Current Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(isGrowth ? data.topProducts : data.topProducts.slice(0, 2)).map((product, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
                          <Package className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">{product.name}</h4>
                          <p className="text-[10px] font-medium text-gray-500">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center text-sm font-bold text-gray-600">
                      {product.sold}
                    </td>
                    <td className="p-4 text-right text-sm font-black text-[#044e3b]">
                      ₦{product.revenue.toLocaleString()}
                    </td>
                    <td className="p-4 pr-6 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                        product.stock === 0 ? "bg-red-50 text-red-700" : 
                        product.stock <= 5 ? "bg-orange-50 text-orange-700" : "bg-emerald-50 text-emerald-700"
                      }`}>
                        {product.stock === 0 ? 'Out of Stock' : `${product.stock} in stock`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Add prompt at bottom of table if they are Starter seeing limited list */}
          {!isGrowth && (
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-xs font-bold text-gray-500">
                Showing top 2 products. <Link to="/dashboard/billing" className="text-purple-600 hover:underline">Upgrade to Growth</Link> to see full analytics list.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Analytics;