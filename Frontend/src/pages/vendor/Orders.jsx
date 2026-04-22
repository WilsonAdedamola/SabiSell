import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search, SlidersHorizontal, MoreVertical, 
  ChevronLeft, ChevronRight, Package, Truck, 
  CheckCircle2, Clock, Download, Eye, Phone // <-- Added Phone
} from "lucide-react";
import api from '../../utils/api'; 

const Orders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Orders");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // MOCK DATA (Updated with phone numbers to match your layout)
  const [orders, setOrders] = useState([
    { id: "ORD-9023", customer: "Chioma Adebayo", email: "chioma@example.com", phone: "08012345678", date: "2026-04-21T10:30:00Z", total: 45000, items: 3, status: "Pending" },
    { id: "ORD-9022", customer: "Emeka Okafor", email: "emeka.o@example.com", phone: "09087654321", date: "2026-04-20T14:15:00Z", total: 15000, items: 1, status: "Processing" },
    { id: "ORD-9021", customer: "Amina Bello", email: "amina.b@example.com", phone: "07011223344", date: "2026-04-19T09:45:00Z", total: 85000, items: 4, status: "Shipped" },
    { id: "ORD-9020", customer: "Tunde Bakare", email: "tbakare@example.com", phone: "08122334455", date: "2026-04-18T16:20:00Z", total: 12500, items: 1, status: "Delivered" },
    { id: "ORD-9019", customer: "Sarah Johnson", email: "sarah.j@example.com", phone: "09055667788", date: "2026-04-18T11:10:00Z", total: 32000, items: 2, status: "Delivered" },
    { id: "ORD-9018", customer: "David Nwachukwu", email: "davidn@example.com", phone: "08099887766", date: "2026-04-17T13:05:00Z", total: 7500, items: 1, status: "Cancelled" },
  ]);

  const [sortOption, setSortOption] = useState("Newest First");

  // --- HELPER FUNCTIONS ---
  const getStatusDetails = (status) => {
    switch(status) {
      case "Pending": return { color: "bg-orange-50 text-orange-700 border-orange-200", icon: Clock };
      case "Processing": return { color: "bg-blue-50 text-blue-700 border-blue-200", icon: Package };
      case "Shipped": return { color: "bg-purple-50 text-purple-700 border-purple-200", icon: Truck };
      case "Delivered": return { color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 };
      case "Cancelled": return { color: "bg-red-50 text-red-700 border-red-200", icon: Clock }; 
      default: return { color: "bg-gray-50 text-gray-700 border-gray-200", icon: Package };
    }
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // --- FILTER & SORT LOGIC ---
  let filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === "All Orders" || order.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  filteredOrders = filteredOrders.sort((a, b) => {
    if (sortOption === "Newest First") return new Date(b.date) - new Date(a.date);
    if (sortOption === "Oldest First") return new Date(a.date) - new Date(b.date);
    return 0;
  });

  // --- TABS DATA ---
  const tabs = [
    { name: "All Orders", count: orders.length },
    { name: "Pending", count: orders.filter(o => o.status === "Pending").length },
    { name: "Processing", count: orders.filter(o => o.status === "Processing").length },
    { name: "Shipped", count: orders.filter(o => o.status === "Shipped").length },
    { name: "Delivered", count: orders.filter(o => o.status === "Delivered").length },
  ];

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, activeTab, sortOption]);

  // Metrics Calculations
  const totalRevenue = orders.filter(o => o.status !== "Cancelled").reduce((sum, order) => sum + order.total, 0);
  const pendingCount = orders.filter(o => o.status === "Pending").length;
  const completedCount = orders.filter(o => o.status === "Delivered").length;

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full relative bg-sabi-surface">
      <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Orders</h1>
            <p className="text-sm font-medium text-gray-500 mt-1">Track and manage your customer fulfillments.</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-xl font-bold transition-colors shadow-sm w-full sm:w-auto justify-center">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-500">Total Revenue</h3>
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                <span className="font-extrabold text-emerald-600">₦</span>
              </div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">₦{totalRevenue.toLocaleString()}</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-500">Pending Orders</h3>
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{pendingCount}</p>
            <p className="text-xs font-medium text-orange-600 mt-1">Requires your attention</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-500">Completed</h3>
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{completedCount}</p>
            <p className="text-xs font-medium text-gray-500 mt-1">Successfully delivered</p>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex gap-3">
          <div className="relative grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer Name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.name ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ORDERS LIST CONTAINER */}
        <div className="bg-white border border-gray-200 rounded-3xl sm:rounded-4xl overflow-hidden shadow-sm">
          
          <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
             <h3 className="font-bold text-gray-900">Recent Orders</h3>
             <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500 hidden sm:inline">Sort:</span>
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-transparent font-bold text-sm text-sabi-primary focus:outline-none cursor-pointer"
                >
                   <option>Newest First</option>
                   <option>Oldest First</option>
                </select>
             </div>
          </div>

          {currentOrders.length === 0 ? (
            <div className="p-16 text-center border-b border-gray-100">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-gray-900 font-extrabold text-lg mb-1">No orders found</h3>
              <p className="text-gray-500 font-medium text-sm">
                {searchQuery ? "No orders matched your search." : `You have no ${activeTab.toLowerCase()} orders right now.`}
              </p>
            </div>
          ) : (
            <>
              {/* MOBILE VIEW: Card List (Hidden on Large Screens) */}
              <div className="lg:hidden divide-y divide-gray-100">
                {currentOrders.map((order) => {
                  const statusStyle = getStatusDetails(order.status);
                  return (
                    <Link key={order.id} to={`/dashboard/orders/${order.id}`} className="block p-4 sm:p-6 hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-xl shrink-0 border border-emerald-200">
                          {order.customer.charAt(0)}
                        </div>
                        <div className="grow min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate pr-4">{order.customer}</h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border border-transparent ${statusStyle.color}`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-gray-500 mb-1.5">
                            {order.id} <span className="font-medium mx-1">•</span> <span className="font-medium text-gray-400">{formatDate(order.date)}</span>
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                              <Phone className="w-3 h-3" /> {order.phone}
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <span className="block font-extrabold text-gray-900 text-sm">₦{order.total.toLocaleString()}</span>
                                <span className="block text-[10px] font-medium text-gray-400">{order.items} item{order.items > 1 ? 's' : ''}</span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-sabi-primary transition-colors" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* DESKTOP VIEW: Table (Hidden on Mobile/Tablet) */}
              <div className="hidden lg:block overflow-x-auto border-b border-gray-100">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-bold">
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Total</th>
                      <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentOrders.map((order) => {
                      const statusStyle = getStatusDetails(order.status);
                      const StatusIcon = statusStyle.icon;

                      return (
                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <span className="font-bold text-gray-900">{order.id}</span>
                            <p className="text-xs font-medium text-gray-500 mt-0.5">{order.items} item{order.items > 1 ? 's' : ''}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                                {order.customer.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 text-sm">{order.customer}</p>
                                <p className="text-xs font-medium text-gray-500 truncate max-w-[150px]">{order.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-600">
                            {formatDate(order.date)}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${statusStyle.color}`}>
                              <StatusIcon className="w-3 h-3" />
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-extrabold text-gray-900 text-right">
                            ₦{order.total.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center">
                              <Link 
                                to={`/dashboard/orders/${order.id}`}
                                className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1.5 font-bold text-xs shadow-sm"
                              >
                                <Eye className="w-3.5 h-3.5" /> View Details
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* PAGINATION */}
          {filteredOrders.length > itemsPerPage && (
            <div className="p-4 sm:p-6 flex items-center justify-center gap-2 bg-gray-50/50">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button 
                  key={idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center transition-colors ${
                    currentPage === idx + 1 
                      ? 'bg-sabi-primary text-white shadow-sm' 
                      : 'border border-gray-200 text-gray-600 hover:bg-white hover:text-gray-900'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Orders;