import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, SlidersHorizontal, ChevronLeft, ChevronRight, 
  Download, ShoppingBag, ShoppingCart, CheckCircle, Clock,
  Phone
} from "lucide-react";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("All Orders");

  const tabs = [
    { name: "All Orders", count: 36, color: "bg-sabi-primary text-white" },
    { name: "Paid", count: 24, color: "bg-emerald-50 text-emerald-700" },
    { name: "Delivered", count: 12, color: "bg-blue-50 text-blue-700" },
  ];

  // Dummy data
  const orders = [
    { id: "SB-1024", name: "Grace Ade", date: "Today, 10:30 AM", status: "Paid", amount: "₦25,000", items: "2 items", phone: "0812 345 6789", img: "👩🏾" },
    { id: "SB-1023", name: "Mary Daniel", date: "Yesterday, 4:15 PM", status: "Paid", amount: "₦18,500", items: "1 item", phone: "0803 456 7890", img: "👩🏽" },
    { id: "SB-1022", name: "Chidera Williams", date: "Jun 20, 2:20 PM", status: "Delivered", amount: "₦22,000", items: "3 items", phone: "0706 789 0123", img: "🧑🏾" },
    { id: "SB-1021", name: "Fatima Ali", date: "Jun 19, 11:00 AM", status: "Paid", amount: "₦12,000", items: "1 item", phone: "0810 234 5678", img: "🧕🏾" },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "Paid": return "bg-emerald-100 text-emerald-700";
      case "Delivered": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full">
      <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900">Orders</h1>
          <button className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-sabi-primary px-4 py-2.5 rounded-xl font-bold transition-colors shadow-sm text-sm">
            <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export</span>
          </button>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex gap-3">
          <div className="relative grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search orders by name or ID..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary font-medium text-gray-900"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors shrink-0">
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        {/* TABS */}
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

        {/* ORDERS SUMMARY CARDS */}
        <div className="bg-white border border-gray-200 rounded-4xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-gray-900">Orders Summary</h4>
            <select className="bg-gray-50 border border-gray-200 font-bold text-xs text-gray-700 px-3 py-1.5 rounded-lg focus:outline-none cursor-pointer">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F0FDF4] rounded-2xl p-2 sm:p-4 border border-emerald-100 flex items-center gap-2 md:gap-4">
               <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-3 h-3 md:w-5 md:h-5 text-emerald-600" />
               </div>
               <div>
                  <h3 className="md:text-xl font-extrabold text-gray-900">₦125,000</h3>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-0.5">Total Sales</p>
               </div>
            </div>
            <div className="bg-[#EFF6FF] rounded-2xl p-2 sm:p-4 border border-blue-100 flex items-center gap-2 md:gap-4">
               <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <ShoppingCart className="w-3 h-3 md:w-5 md:h-5 text-blue-600" />
               </div>
               <div>
                  <h3 className="md:text-xl font-extrabold text-gray-900">36</h3>
                  <p className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-0.5">Total Orders</p>
               </div>
            </div>
            <div className="bg-[#FFFBEB] rounded-2xl p-2 sm:p-4 border border-yellow-100 flex items-center gap-2 md:gap-4">
               <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                  <Clock className="w-3 h-3 md:w-5 md:h-5 text-yellow-600" />
               </div>
               <div>
                  <h3 className="md:text-xl font-extrabold text-gray-900">24</h3>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-0.5">Paid (Awaiting Delivery)</p>
               </div>
            </div>
            <div className="bg-[#F3E8FF] rounded-2xl p-2 sm:p-4 border border-purple-100 flex items-center gap-2 md:gap-4">
               <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-3 h-3 md:w-5 md:h-5 text-purple-600" />
               </div>
               <div>
                  <h3 className="md:text-xl font-extrabold text-gray-900">12</h3>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-0.5">Delivered</p>
               </div>
            </div>
          </div>
        </div>

        {/* RECENT ORDERS LIST */}
        <div className="bg-white border border-gray-200 rounded-4xl overflow-hidden shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h3 className="font-bold text-gray-900">Recent Orders</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500 hidden sm:inline">Sort:</span>
              <select className="bg-transparent font-bold text-sm text-sabi-primary focus:outline-none cursor-pointer">
                <option>Newest First</option>
                <option>Oldest First</option>
              </select>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {orders.map((order, idx) => (
              // Wrapping the entire card in a Link to route to the details page
              <Link key={idx} to={`/dashboard/orders/${order.id.replace('#', '')}`} className="block p-4 sm:p-6 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 rounded-full flex items-center justify-center text-2xl shrink-0 border border-gray-200">
                    {order.img}
                  </div>
                  <div className="grow min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate pr-4">{order.name}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border border-transparent ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-gray-500 mb-1.5">
                      {order.id} <span className="font-medium mx-1">•</span> <span className="font-medium text-gray-400">{order.date}</span>
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                         <Phone className="w-3 h-3" /> {order.phone}
                      </p>
                      <div className="flex items-center gap-2">
                         <div className="text-right">
                            <span className="block font-extrabold text-gray-900 text-sm">{order.amount}</span>
                            <span className="block text-[10px] font-medium text-gray-400">{order.items}</span>
                         </div>
                         <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-sabi-primary transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
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
            <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 font-bold hover:bg-white hover:text-gray-900 transition-colors">
              3
            </button>
            <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Orders;