import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf"; 
import { 
  Search, SlidersHorizontal, MoreVertical, 
  ChevronLeft, ChevronRight, Package, Truck, 
  CheckCircle2, Clock, Download, Eye, Phone,
  Loader2, AlertCircle, X, MapPin, Mail, Calendar,
  RefreshCw, MessageCircle, ChevronDown, FileText, Globe
} from "lucide-react";
import api from '../../utils/api'; 
import { OrdersSkeleton } from "../../components/shared/Skeletons";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Orders");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const itemsPerPage = 8;

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/orders');
      setOrders(response.data.orders);
    } catch (err) {
      console.error("Fetch Orders Error:", err);
      setError("Failed to sync orders with database.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      }
      setIsStatusDropdownOpen(false);
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const getStatusDetails = (status) => {
    switch(status) {
      case "Pending": return { color: "bg-orange-50 text-orange-700 border-orange-200", icon: Clock };
      case "Processing": return { color: "bg-blue-50 text-blue-700 border-blue-200", icon: Package };
      case "Shipped": return { color: "bg-purple-50 text-purple-700 border-purple-200", icon: Truck };
      case "Delivered": return { color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 };
      case "Cancelled": return { color: "bg-red-50 text-red-700 border-red-200", icon: X }; 
      default: return { color: "bg-gray-50 text-gray-700 border-gray-200", icon: Package };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const formatWhatsAppNumber = (phone) => {
    if (!phone) return "";
    let formatted = phone.replace(/\D/g, '');
    if (formatted.startsWith('0')) {
      formatted = '234' + formatted.slice(1);
    }
    return formatted;
  };

  const handleDownloadInvoice = (order) => {
    const doc = new jsPDF();
    let y = 20;

    // 1. Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("INVOICE", 105, y, { align: "center" });
    y += 15;

    // 2. Order & Customer Info
    doc.setFontSize(10);
    
    doc.setFont("helvetica", "bold");
    doc.text("Order Details:", 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(`Order ID: ${order.orderNumber}`, 20, y + 6);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, y + 12);
    doc.text(`Status: ${order.status}`, 20, y + 18);

    doc.setFont("helvetica", "bold");
    doc.text("Billed To:", 120, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${order.customerName}`, 120, y + 6);
    doc.text(`${order.customerPhone}`, 120, y + 12);
    if (order.customerEmail) doc.text(`${order.customerEmail}`, 120, y + 18);

    y += 30;

    // 3. Shipping Address
    doc.setFont("helvetica", "bold");
    doc.text("Shipping Address:", 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${order.shippingAddress?.address || "N/A"}`, 20, y + 6);
    const apt = order.shippingAddress?.apartment ? `${order.shippingAddress.apartment}, ` : "";
    doc.text(`${apt}${order.shippingAddress?.city}, ${order.shippingAddress?.state}, ${order.shippingAddress?.country || "Nigeria"}`, 20, y + 12);
    if (order.shippingAddress?.landmark) {
      doc.text(`Landmark: ${order.shippingAddress.landmark}`, 20, y + 18);
      y += 6;
    }
    
    y += 25;

    // 4. Items Table Header
    doc.setFillColor(245, 245, 245);
    doc.rect(20, y - 5, 170, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.text("Item Description", 22, y);
    doc.text("Qty", 120, y);
    doc.text("Unit Price", 140, y);
    doc.text("Total", 170, y);
    
    y += 10;
    doc.setFont("helvetica", "normal");

    // 5. Items Loop
    order.items.forEach(item => {
      const itemTotal = item.quantity * Number(item.priceAtPurchase);
      const splitName = doc.splitTextToSize(item.name, 90); 
      doc.text(splitName, 22, y);
      
      doc.text(`${item.quantity}`, 120, y);
      doc.text(`NGN ${Number(item.priceAtPurchase).toLocaleString()}`, 140, y);
      doc.text(`NGN ${itemTotal.toLocaleString()}`, 170, y);
      
      y += splitName.length * 6 + 4; 
    });

    y += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, 190, y); 
    y += 8;

    // 6. Totals Section
    doc.text("Subtotal:", 130, y);
    doc.text(`NGN ${Number(order.subtotal).toLocaleString()}`, 170, y);
    y += 8;
    
    doc.text("Delivery Fee:", 130, y);
    doc.text(order.deliveryMethod === 'negotiated' ? 'Negotiated' : `NGN ${Number(order.deliveryFee).toLocaleString()}`, 170, y);
    y += 8;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Total Amount:", 130, y);
    doc.text(`NGN ${Number(order.totalAmount).toLocaleString()}`, 170, y);

    // 7. Footer Note
    y += 25;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Thank you for your business", 105, y, { align: "center" });

    doc.save(`Invoice_${order.orderNumber}.pdf`);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All Orders" || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const totalRevenue = orders.filter(o => o.status !== "Cancelled").reduce((sum, o) => sum + Number(o.totalAmount), 0);
  const pendingCount = orders.filter(o => o.status === "Pending").length;
  const completedCount = orders.filter(o => o.status === "Delivered").length;

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // --- NEW: Dynamic Tabs Data with Counts ---
  const tabsData = [
    { name: "All Orders", count: orders.length },
    { name: "Pending", count: pendingCount },
    { name: "Processing", count: orders.filter(o => o.status === "Processing").length },
    { name: "Shipped", count: orders.filter(o => o.status === "Shipped").length },
    { name: "Delivered", count: completedCount }
  ];

  if (isLoading) return <OrdersSkeleton />;

  const allStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full relative bg-sabi-surface">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Orders</h1>
            <p className="text-sm font-medium text-gray-500 mt-1">Real-time data from your storefront.</p>
          </div>
          <button 
            onClick={fetchOrders} 
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-xl font-bold transition-colors shadow-sm w-full sm:w-auto justify-center"
          >
            <RefreshCw className="w-4 h-4" /> Refresh Data
          </button>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 mb-4">Total Revenue</h3>
            <p className="text-2xl font-extrabold text-gray-900">₦{totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 mb-4">Pending Orders</h3>
            <p className="text-2xl font-extrabold text-gray-900">{pendingCount}</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 mb-4">Completed</h3>
            <p className="text-2xl font-extrabold text-gray-900">{completedCount}</p>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by Order ID or Customer Name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#044e3b]/20 font-medium text-gray-900 shadow-sm"
          />
        </div>

        {/* --- UPDATED TABS WITH COUNTS --- */}
        <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2">
          {tabsData.map((tab) => (
            <button 
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm shrink-0 transition-colors border ${
                activeTab === tab.name ? 'bg-[#044e3b] text-white border-[#044e3b]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {tab.name}
              <span className={`px-2 py-0.5 rounded-full text-[10px] transition-colors ${
                activeTab === tab.name ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ORDERS LIST */}
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
          {currentOrders.length === 0 ? (
            <div className="p-16 text-center">
              <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <h3 className="text-gray-900 font-extrabold text-lg">No orders found</h3>
            </div>
          ) : (
            <>
              {/* MOBILE VIEW */}
              <div className="lg:hidden divide-y divide-gray-100">
                {currentOrders.map((order) => (
                  <div key={order.id} onClick={() => setSelectedOrder(order)} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-gray-900 flex items-center gap-2">
                        {order.orderNumber}
                        {order.shippingAddress?.country === 'International Shipping' && (
                          <Globe className="w-3.5 h-3.5 text-blue-500" />
                        )}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusDetails(order.status).color}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm font-bold text-gray-700">{order.customerName}</p>
                        <p className="text-xs text-gray-400">{formatDate(order.createdAt)}</p>
                      </div>
                      <p className="font-black text-gray-900">₦{Number(order.totalAmount).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP VIEW */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-bold">
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Total</th>
                      <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-bold text-gray-900 flex items-center gap-2">
                            {order.orderNumber}
                            {order.shippingAddress?.country === 'International Shipping' && (
                              <Globe className="w-4 h-4 text-blue-500" title="International Order" />
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <p className="font-bold text-gray-900">{order.customerName}</p>
                          <p className="text-xs text-gray-400">{order.customerPhone}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{formatDate(order.createdAt)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase border ${getStatusDetails(order.status).color}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-black text-gray-900 text-right">₦{Number(order.totalAmount).toLocaleString()}</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center">
                            <button 
                              onClick={() => setSelectedOrder(order)}
                              className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1.5 font-bold text-xs shadow-sm"
                            >
                              <Eye className="w-3.5 h-3.5" /> View Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
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
                      ? 'bg-[#044e3b] text-white shadow-sm' 
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

      {/* --- DETAILED SIDE DRAWER MODAL --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg h-full bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300 relative">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white z-10 relative">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900">{selectedOrder.orderNumber}</h2>
                <p className="text-xs font-medium text-gray-500">Placed on {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => { setSelectedOrder(null); setIsStatusDropdownOpen(false); }} className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
              
              {/* Customer Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Customer Details</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#044e3b]">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{selectedOrder.customerName}</p>
                        <p className="text-xs text-gray-500">{selectedOrder.customerEmail || "No email provided"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <Phone className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-bold text-gray-900">{selectedOrder.customerPhone}</p>
                    </div>
                    <a 
                      href={`https://wa.me/${formatWhatsAppNumber(selectedOrder.customerPhone)}?text=Hello ${selectedOrder.customerName}, this is regarding your order ${selectedOrder.orderNumber}...`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#25D366] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-[#20b958] transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* --- NEW: International Delivery Alert --- */}
              {selectedOrder.shippingAddress?.country === 'International Shipping' && (
                <div className="flex gap-3 bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm">
                  <Globe className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-blue-900">International Delivery Request</p>
                    <p className="text-blue-800 mt-1 leading-relaxed">
                      This buyer requires international shipping. Please contact them via WhatsApp or email to confirm their full delivery address, calculate the shipping cost based on weight/distance, and arrange payment.
                    </p>
                  </div>
                </div>
              )}

              {/* Pay Delivery Later Reminder */}
              {selectedOrder.deliveryMethod === 'negotiated' && !selectedOrder.shippingAddress?.country && (
                <div className="flex gap-3 bg-orange-50 border border-orange-200 rounded-2xl p-4 text-sm">
                  <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-orange-900">Action Required: Delivery Fee</p>
                    <p className="text-orange-800 mt-1 leading-relaxed">
                      This buyer selected <span className="font-bold">"Pay Delivery Later"</span>. Please contact them via WhatsApp or Phone to agree on a delivery fee before shipping.
                    </p>
                  </div>
                </div>
              )}

              {/* Customer Note */}
              {selectedOrder.customerNote && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Customer Note</h3>
                  <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 text-sm">
                    <p className="text-yellow-900 font-medium italic">"{selectedOrder.customerNote}"</p>
                  </div>
                </div>
              )}

              {/* Delivery Address */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Delivery Address</h3>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-700 font-medium leading-relaxed">
                      <p>{selectedOrder.shippingAddress?.address}</p>
                      {selectedOrder.shippingAddress?.apartment && <p>{selectedOrder.shippingAddress.apartment}</p>}
                      <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state}, {selectedOrder.shippingAddress?.country || "Nigeria"}</p>
                      {selectedOrder.shippingAddress?.landmark && (
                        <p className="text-xs text-orange-600 mt-2 font-bold italic">Landmark: {selectedOrder.shippingAddress.landmark}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                      <div className="w-14 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                        {item.image ? (
                          <img src={item.image} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300"><Package className="w-5 h-5" /></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate mb-1">{item.name}</p>
                        <p className="text-[11px] text-gray-500 font-medium">Price: ₦{Number(item.priceAtPurchase).toLocaleString()}</p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-1.5 pl-2">
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 font-black rounded-lg text-xs">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-sm font-black text-gray-900">
                          ₦{(item.quantity * Number(item.priceAtPurchase)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900">₦{Number(selectedOrder.subtotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Delivery Fee</span>
                  <span className="font-bold text-gray-900">
                    {selectedOrder.deliveryMethod === 'negotiated' ? 'Negotiated' : `₦${Number(selectedOrder.deliveryFee).toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 mt-1 border-t border-gray-100 text-lg">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-black text-[#044e3b]">₦{Number(selectedOrder.totalAmount).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 grid grid-cols-2 gap-3 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
              
              <div className="relative">
                <button 
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${getStatusDetails(selectedOrder.status).color.split(' ')[0]}`}></span>
                    {selectedOrder.status}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isStatusDropdownOpen && (
                  <div className="absolute bottom-full left-0 w-full mb-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                    {allStatuses.map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(selectedOrder.id, status)}
                        className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors hover:bg-gray-50 ${
                          selectedOrder.status === status ? 'text-[#044e3b] bg-emerald-50/50' : 'text-gray-700'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button 
                onClick={() => handleDownloadInvoice(selectedOrder)}
                className="px-4 py-3.5 bg-[#044e3b] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#033d2e] transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;