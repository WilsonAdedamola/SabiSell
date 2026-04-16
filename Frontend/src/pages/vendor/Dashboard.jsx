import { Link } from "react-router-dom";
import {
  Store,
  ExternalLink,
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  ChevronRight,
  Share2,
  Plus,
  Tag,
  ClipboardList,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full">
      <div className="max-w-7xl mx-auto space-y-6 w-full animate-in fade-in duration-500">
        {/* 1. WELCOME BANNER */}
        <div className="bg-[#044e3b] rounded-4xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>

          <div className="flex flex-col sm:flex-row items-center gap-5 z-10 w-full md:w-auto text-center sm:text-left">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg p-2 border-4 border-emerald-800/50">
              {/* Replace with actual store logo */}
              <div className="w-full h-full bg-emerald-50 rounded-full flex items-center justify-center">
                <span className="text-sabi-primary font-bold text-xl italic">
                  Zara
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-white mb-1 flex items-center justify-center sm:justify-start gap-2">
                Welcome back, Zara! <span className="text-2xl">👋</span>
              </h1>
              <p className="text-emerald-100/90 text-sm lg:text-base font-medium">
                Here's what's happening with your store today.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 z-10 w-full md:w-auto">
            <div className="bg-emerald-900/50 border border-emerald-700/50 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between gap-6">
              <span className="text-emerald-100 text-xs font-bold uppercase tracking-wider">
                Store Status
              </span>
              <div className="flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-emerald-300 text-xs font-bold">Online</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 transition-colors rounded-xl p-3 cursor-pointer">
              <span className="text-emerald-50 text-sm font-medium truncate max-w-45">
                sabisell.com/zara-stitches
              </span>
              <ExternalLink className="w-4 h-4 text-emerald-300 ml-auto shrink-0" />
            </div>
          </div>
        </div>

        {/* 2. DATE FILTER & STAT CARDS */}
        <div>
          <div className="flex justify-end mb-4">
            <select className="bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sabi-primary/20">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Total Sales */}
            <div className="bg-[#F0FDF4] rounded-2xl p-5 border border-emerald-100">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <Store className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-gray-600 text-sm font-bold mb-1">Total Sales</p>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                ₦125,000
              </h3>
              <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5" /> 12%{" "}
                <span className="text-gray-500 font-medium">from last month</span>
              </div>
            </div>

            {/* Total Orders */}
            <div className="bg-[#EFF6FF] rounded-2xl p-5 border border-blue-100">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-gray-600 text-sm font-bold mb-1">Total Orders</p>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">36</h3>
              <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5" /> 8%{" "}
                <span className="text-gray-500 font-medium">from last month</span>
              </div>
            </div>

            {/* Customers */}
            <div className="bg-[#FAF5FF] rounded-2xl p-5 border border-purple-100">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-gray-600 text-sm font-bold mb-1">Customers</p>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">28</h3>
              <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5" /> 15%{" "}
                <span className="text-gray-500 font-medium">from last month</span>
              </div>
            </div>

            {/* Pending Orders */}
            <div className="bg-[#FFF7ED] rounded-2xl p-5 border border-orange-100 flex flex-col">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <Package className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-gray-600 text-sm font-bold mb-1">
                Pending Orders
              </p>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">5</h3>
              <Link
                to="/dashboard/orders"
                className="mt-auto flex items-center gap-1 text-orange-600 text-xs font-bold hover:text-orange-700"
              >
                View Orders <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3. CHARTS & RECENT ORDERS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-8 bg-white rounded-4xl p-6 border border-gray-100 shadow-sm flex flex-col h-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">
                  Sales Overview
                </h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                    <span className="w-2 h-2 rounded-full bg-sabi-primary"></span>{" "}
                    This Month
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-200"></span>{" "}
                    Last Month
                  </div>
                </div>
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-extrabold text-gray-900">
                  ₦125,000
                </h3>
                <div className="flex items-center justify-end gap-1 text-emerald-600 text-xs font-bold mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> 12% vs last month
                </div>
              </div>
            </div>

            {/* Custom SVG Chart Placeholder mimicking Recharts */}
            <div className="flex-1 relative w-full border-b border-l border-gray-100 pb-6 pl-2 mt-4">
              {/* Y-Axis Labels */}
              <div className="absolute -left-2 top-0 h-full flex flex-col justify-between text-[10px] font-bold text-gray-400 -translate-x-full">
                <span>₦40k</span>
                <span>₦30k</span>
                <span>₦20k</span>
                <span>₦10k</span>
                <span>₦0</span>
              </div>

              {/* X-Axis Labels */}
              <div className="absolute -bottom-6 left-0 w-full flex justify-between text-[10px] font-bold text-gray-400 px-2">
                <span>1 Jun</span>
                <span>5 Jun</span>
                <span>10 Jun</span>
                <span>15 Jun</span>
                <span>20 Jun</span>
                <span>25 Jun</span>
                <span>30 Jun</span>
              </div>

              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-full border-b border-gray-50/50 h-0"
                  ></div>
                ))}
              </div>

              {/* SVG Graph Lines */}
              <svg
                className="w-full h-full absolute inset-0 overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                {/* Last Month (Light Green) */}
                <path
                  d="M0,80 L15,75 L30,85 L45,65 L60,50 L75,65 L90,45 L100,55"
                  fill="none"
                  stroke="#A7F3D0"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  vectorEffect="non-scaling-stroke"
                />

                {/* This Month (Dark Green) */}
                <path
                  d="M0,70 L15,55 L30,60 L45,40 L60,45 L75,20 L90,35 L100,25"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Data Points */}
                <circle
                  cx="0"
                  cy="70"
                  r="4"
                  fill="#059669"
                  className="stroke-white stroke-2"
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx="15"
                  cy="55"
                  r="4"
                  fill="#059669"
                  className="stroke-white stroke-2"
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx="30"
                  cy="60"
                  r="4"
                  fill="#059669"
                  className="stroke-white stroke-2"
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx="45"
                  cy="40"
                  r="4"
                  fill="#059669"
                  className="stroke-white stroke-2"
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx="60"
                  cy="45"
                  r="4"
                  fill="#059669"
                  className="stroke-white stroke-2"
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx="75"
                  cy="20"
                  r="4"
                  fill="#059669"
                  className="stroke-white stroke-2"
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx="90"
                  cy="35"
                  r="4"
                  fill="#059669"
                  className="stroke-white stroke-2"
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx="100"
                  cy="25"
                  r="4"
                  fill="#059669"
                  className="stroke-white stroke-2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>

          {/* Recent Orders Section */}
          <div className="lg:col-span-4 bg-white rounded-4xl p-6 border border-gray-100 shadow-sm flex flex-col h-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-extrabold text-gray-900">
                Recent Orders
              </h3>
              <Link
                to="/dashboard/orders"
                className="text-sabi-primary text-sm font-bold flex items-center hover:underline"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex-1 flex flex-col gap-4 overflow-y-auto hide-scrollbar pr-2">
              {[
                {
                  name: "Grace Ade",
                  id: "#SB-1024",
                  time: "Today, 10:30 AM",
                  status: "Pending",
                  amount: "₦25,000",
                  color: "bg-orange-100 text-orange-700",
                },
                {
                  name: "Mary Daniel",
                  id: "#SB-1023",
                  time: "Yesterday, 4:15 PM",
                  status: "Paid",
                  amount: "₦18,500",
                  color: "bg-emerald-100 text-emerald-700",
                },
                {
                  name: "Chidera Williams",
                  id: "#SB-1022",
                  time: "Jun 20, 2:20 PM",
                  status: "Delivered",
                  amount: "₦22,000",
                  color: "bg-blue-100 text-blue-700",
                },
              ].map((order, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer bg-gray-50/50"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${order.name}`}
                      alt={order.name}
                      className="w-10 h-10 rounded-full bg-white border border-gray-200"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        {order.name}
                      </h4>
                      <p className="text-[10px] font-medium text-gray-500">
                        {order.id} • {order.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${order.color}`}
                    >
                      {order.status}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-extrabold text-gray-900">
                        {order.amount}
                      </span>
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. BOTTOM WIDGETS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Top Products */}
          <div className="lg:col-span-4 bg-white rounded-4xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-extrabold text-gray-900">
                Top Products
              </h3>
              <Link
                to="/dashboard/products"
                className="text-sabi-primary text-sm font-bold flex items-center hover:underline"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {[
                {
                  name: "Ankara Print Shirt",
                  sales: "8 sales",
                  amount: "₦15,000",
                  stock: "In Stock",
                  stockColor: "text-emerald-600 bg-emerald-50",
                  img: "👕",
                },
                {
                  name: "Lace Fabric - Blue",
                  sales: "5 sales",
                  amount: "₦12,500",
                  stock: "In Stock",
                  stockColor: "text-emerald-600 bg-emerald-50",
                  img: "👗",
                },
                {
                  name: "Ready-to-wear Gown",
                  sales: "3 sales",
                  amount: "₦28,000",
                  stock: "Low Stock",
                  stockColor: "text-orange-600 bg-orange-50",
                  img: "👘",
                },
              ].map((prod, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xl shrink-0 border border-gray-200">
                    {prod.img}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">
                      {prod.name}
                    </h4>
                    <p className="text-xs font-medium text-gray-500">
                      {prod.sales}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <h4 className="text-sm font-extrabold text-gray-900 mb-1">
                      {prod.amount}
                    </h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${prod.stockColor}`}
                    >
                      {prod.stock}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="lg:col-span-4 bg-white rounded-4xl p-6 border border-gray-100 shadow-sm flex flex-col">
            <h3 className="text-lg font-extrabold text-gray-900 mb-6">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3 flex-1">
              <button className="flex flex-col items-start justify-center p-4 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 transition-colors text-left group">
                <div className="w-10 h-10 rounded-full bg-sabi-primary text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Plus className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-0.5">
                  Add Product
                </h4>
                <p className="text-[10px] font-medium text-gray-500">
                  List a new product
                </p>
              </button>
              <button className="flex flex-col items-start justify-center p-4 rounded-2xl bg-blue-50/50 hover:bg-blue-50 border border-blue-100 transition-colors text-left group">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-0.5">Orders</h4>
                <p className="text-[10px] font-medium text-gray-500">
                  Manage incoming
                </p>
              </button>
              <button className="flex flex-col items-start justify-center p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors text-left group">
                <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Share2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-0.5">
                  Share Store
                </h4>
                <p className="text-[10px] font-medium text-gray-500">
                  Get link & QR
                </p>
              </button>
              <button className="flex flex-col items-start justify-center p-4 rounded-2xl bg-purple-50/50 hover:bg-purple-50 border border-purple-100 transition-colors text-left group">
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Tag className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-0.5">
                  Discounts
                </h4>
                <p className="text-[10px] font-medium text-gray-500">
                  Run a promo
                </p>
              </button>
            </div>
          </div>

          {/* Promo Banner */}
          <div className="lg:col-span-4 bg-[#064e3b] rounded-4xl p-6 border border-[#065f46] shadow-xl relative overflow-hidden flex flex-col justify-center">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/30 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <span className="inline-block bg-emerald-400 text-emerald-950 text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-md mb-4">
                New
              </span>
              <h3 className="text-xl font-extrabold text-white mb-2 leading-tight">
                Start Getting Paid Faster!
              </h3>
              <p className="text-emerald-100/90 text-sm font-medium mb-6 leading-relaxed">
                Connect Paystack or Flutterwave to receive payments directly from
                customers securely.
              </p>
              <button className="bg-white text-sabi-primary w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors shadow-lg">
                Set Up Payments <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;