import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp, Users, ShoppingCart, Package, Lock, Star, 
  ChevronDown, Calendar, ArrowUpRight, ArrowDownRight, Globe, Store, Filter, Loader2
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import api from '../../utils/api';
import { DashboardSkeleton } from "../../components/shared/Skeletons";
import Toast from "../../components/shared/Toast";

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState("Last 7 Days");
  const [error, setError] = useState(null);
  
  // Real Data State
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

    const fetchAnalytics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch real analytics, passing the selected date range to the backend
        const response = await api.get('/analytics', {
          params: { range: dateRange }
        });
        setData(response.data);
      } catch (err) {
        console.error("Failed to load analytics", err);
        setError("Failed to load analytics data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [isFree, dateRange]); // Re-fetch whenever dateRange changes!

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

  if (error || !data) {
    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-bold mb-4">{error || "Something went wrong."}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-gray-900 text-white rounded-xl">Retry</button>
        </div>
      </div>
    );
  }

  // --- RECHARTS CUSTOM TOOLTIPS ---
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white p-3 rounded-xl shadow-xl border border-gray-700">
          <p className="text-gray-400 text-xs font-bold mb-1">{label}</p>
          <p className="text-lg font-black tracking-tight">
            ₦{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.color }}></div>
          <div>
            <p className="text-gray-500 text-xs font-bold">{payload[0].name}</p>
            <p className="text-gray-900 text-sm font-black">₦{payload[0].value.toLocaleString()}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Data for the Donut Chart
  const pieData = [
    { name: 'Online Sales', value: data.overview.onlineRevenue, color: '#2563EB' },
    { name: 'Offline Sales', value: data.overview.offlineRevenue, color: '#EA580C' }
  ];

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
          {/* Revenue */}
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

          {/* Orders */}
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
          
          {/* RECHARTS: SALES TREND BAR CHART */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm lg:col-span-2 flex flex-col min-h-[400px]">
            <h3 className="text-lg font-extrabold text-gray-900 mb-4">Revenue Trend</h3>
            <div className="w-full mt-auto min-w-0">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.salesTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis 
                    dataKey="label" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#9CA3AF', fontWeight: 600 }} 
                    dy={10} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#9CA3AF', fontWeight: 600 }} 
                    tickFormatter={(value) => `₦${value/1000}k`} 
                  />
                  <RechartsTooltip cursor={{ fill: '#F9FAFB' }} content={<CustomBarTooltip />} />
                  <Bar 
                    dataKey="sales" 
                    fill={isGrowth ? '#044e3b' : '#34D399'} 
                    radius={[6, 6, 0, 0]} 
                    barSize={40} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RECHARTS: CHANNEL BREAKDOWN DONUT CHART */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col relative overflow-hidden min-h-[400px]">
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">Sales by Channel</h3>
            
            {isGrowth ? (
              <div className="flex flex-col h-full mt-4">
                <div className="w-full mb-6 min-w-0">
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie 
                        data={pieData} 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={60} 
                        outerRadius={85} 
                        paddingAngle={5} 
                        dataKey="value"
                        stroke="none"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip content={<CustomPieTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend Below Chart */}
                <div className="mt-auto space-y-4">
                  <div className="flex justify-between items-center bg-blue-50/50 p-3 rounded-xl border border-blue-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-bold text-gray-700">Online</span>
                    </div>
                    <span className="text-sm font-black text-gray-900">
                      {data.overview.totalRevenue > 0 
                        ? Math.round((data.overview.onlineRevenue / data.overview.totalRevenue) * 100) 
                        : 0}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-orange-50/50 p-3 rounded-xl border border-orange-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <Store className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-sm font-bold text-gray-700">Offline</span>
                    </div>
                    <span className="text-sm font-black text-gray-900">
                      {data.overview.totalRevenue > 0 
                        ? Math.round((data.overview.offlineRevenue / data.overview.totalRevenue) * 100) 
                        : 0}%
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3 shadow-sm">
                  <Star className="w-6 h-6 text-purple-600 fill-purple-600" />
                </div>
                <h4 className="font-extrabold text-gray-900 mb-2 text-lg">Advanced Insights</h4>
                <p className="text-xs font-medium text-gray-600 mb-6 px-4">
                  Upgrade to Growth to unlock channel breakdowns, conversion tracking, and more.
                </p>
                <Link to="/dashboard/billing" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-purple-600/20 transition-all text-sm w-full">
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
          
          {data.topProducts.length === 0 ? (
            <div className="p-10 text-center text-gray-500 font-medium text-sm border-t border-gray-100">
               No product sales recorded yet.
            </div>
          ) : (
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
          )}
          
          {/* Add prompt at bottom of table if they are Starter seeing limited list */}
          {!isGrowth && data.topProducts.length > 0 && (
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