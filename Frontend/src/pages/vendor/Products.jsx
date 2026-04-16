import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, Search, SlidersHorizontal, MoreVertical, 
  ChevronLeft, ChevronRight, ShoppingBag, Box, AlertTriangle
} from "lucide-react";

const Products = () => {
  const [activeTab, setActiveTab] = useState("All Products");

  const tabs = [
    { name: "All Products", count: 12, color: "bg-sabi-primary text-white" },
    { name: "In Stock", count: 9, color: "bg-emerald-50 text-emerald-700" },
    { name: "Low Stock", count: 2, color: "bg-orange-50 text-orange-700" },
    { name: "Out of Stock", count: 1, color: "bg-red-50 text-red-700" },
  ];

  const products = [
    { id: 1, name: "Ankara Print Shirt", price: "₦15,000", stock: 8, status: "In Stock", category: "Fashion & Clothing", added: "2 days ago", img: "👕" },
    { id: 2, name: "Lace Fabric - Blue", price: "₦12,500", stock: 5, status: "In Stock", category: "Fashion & Clothing", added: "5 days ago", img: "👗" },
    { id: 3, name: "Ready-to-wear Gown", price: "₦28,000", stock: 2, status: "Low Stock", category: "Fashion & Clothing", added: "1 week ago", img: "👘" },
    { id: 4, name: "Ladies Handbag", price: "₦8,500", stock: 0, status: "Out of Stock", category: "Bags & Accessories", added: "2 weeks ago", img: "👜" },
    { id: 5, name: "Men's Slides", price: "₦6,000", stock: 15, status: "In Stock", category: "Footwear", added: "3 weeks ago", img: "🩴" },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "In Stock": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Low Stock": return "bg-orange-50 text-orange-700 border-orange-200";
      case "Out of Stock": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full">
      <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900">Products</h1>
          <Link to="/dashboard/products/new" className="hidden sm:flex items-center gap-2 bg-sabi-primary hover:bg-sabi-primaryDark text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-sm">
            <Plus className="w-5 h-5" /> Add Product
          </Link>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex gap-3">
          <div className="relative grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary font-medium text-gray-900"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors shrink-0">
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        {/* TABS (SCROLLABLE ON MOBILE) */}
        <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map((tab) => (
            <button 
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm shrink-0 transition-colors border ${
                activeTab === tab.name ? 'bg-sabi-primary text-white border-sabi-primary' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {tab.name}
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.name ? 'bg-emerald-600 text-white' : tab.color}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* PRODUCTS LIST */}
        <div className="bg-white border border-gray-200 rounded-4xl overflow-hidden shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h3 className="font-bold text-gray-900">12 Products</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500 hidden sm:inline">Sort by:</span>
              <select className="bg-transparent font-bold text-sm text-gray-900 focus:outline-none cursor-pointer">
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Price: High to Low</option>
                <option>Price: Low to High</option>
              </select>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {products.map((product) => (
              <div key={product.id} className="p-4 sm:p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-xl flex items-center justify-center text-3xl shrink-0 border border-gray-200">
                  {product.img}
                </div>
                <div className="grow min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate pr-4">{product.name}</h4>
                    <span className="font-extrabold text-gray-900 text-sm sm:text-base">{product.price}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                    <span className="text-xs font-medium text-gray-500">Stock: {product.stock}</span>
                  </div>
                  <p className="text-xs font-medium text-gray-400 truncate">
                    {product.category} <span className="mx-1">•</span> Added {product.added}
                  </p>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors shrink-0">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="p-4 sm:p-6 border-t border-gray-100 flex items-center justify-center gap-2 bg-gray-50/50">
            <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-sabi-primary text-white font-bold flex items-center justify-center shadow-sm">
              1
            </button>
            <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 font-bold hover:bg-white hover:text-gray-900 transition-colors">
              2
            </button>
            <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRODUCTS SUMMARY CARD */}
        <div className="bg-[#F0FDF4] border border-emerald-100 rounded-4xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5 text-sabi-primary" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Products Summary</h4>
              <p className="text-xs font-medium text-gray-500">Last updated today, 10:30 AM</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 divide-x divide-emerald-200">
            <div className="text-center px-2">
              <h3 className="text-2xl font-extrabold text-gray-900 flex justify-center items-center gap-2">
                <Box className="w-4 h-4 text-blue-500" /> 12
              </h3>
              <p className="text-[10px] sm:text-xs font-bold text-gray-500 mt-1 uppercase tracking-wide">Total Products</p>
            </div>
            <div className="text-center px-2">
              <h3 className="text-2xl font-extrabold text-gray-900 flex justify-center items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div></span> 9
              </h3>
              <p className="text-[10px] sm:text-xs font-bold text-gray-500 mt-1 uppercase tracking-wide">In Stock</p>
            </div>
            <div className="text-center px-2">
              <h3 className="text-2xl font-extrabold text-gray-900 flex justify-center items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" /> 2
              </h3>
              <p className="text-[10px] sm:text-xs font-bold text-gray-500 mt-1 uppercase tracking-wide">Low Stock</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Products;