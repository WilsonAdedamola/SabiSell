import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Plus, Filter, Lock, Store, Globe, 
  Receipt, CreditCard, Banknote, Smartphone,
  TrendingUp, Download, X, CheckCircle2, Package, Loader2
} from "lucide-react";
import api from '../../utils/api';
import Toast from "../../components/shared/Toast";
import { DashboardSkeleton } from "../../components/shared/Skeletons";
import { useAuth } from "../../context/AuthContext"; 

const Sales = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  
  // 1. Secure Global State
  const { vendor, isLoading: isAuthLoading } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Data State
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  
  // UI State
  const [activeTab, setActiveTab] = useState("ALL"); // ALL, ONLINE, OFFLINE
  const [searchQuery, setSearchQuery] = useState("");
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Vendor Plan Logic
  const currentPlan = vendor?.plan || "FREE";
  const canRecordOffline = currentPlan === "STARTER" || currentPlan === "GROWTH";

  // Offline Sale Form State
  const [offlineForm, setOfflineForm] = useState({
    productId: "",
    quantity: 1,
    customerName: "",
    paymentMethod: "CASH",
    amountPaid: "",
  });

  const fetchSalesAndProducts = async () => {
    setIsLoading(true);
    try {
      const [salesRes, productsRes] = await Promise.all([
        api.get('/orders'),
        api.get('/products')
      ]);

      setSales(salesRes.data.orders || []);
      setProducts(productsRes.data.products || []);
    } catch (error) {
      setToast({ message: "Failed to load sales data.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Wait for AuthContext to finish checking secure cookie
    if (isAuthLoading) return;
    
    // Redirect if not logged in
    if (!vendor) {
      navigate('/login');
      return;
    }

    fetchSalesAndProducts();
  }, [isAuthLoading, vendor, navigate]);

  // Handlers
  const handleOfflineFormChange = (e) => {
    const { name, value } = e.target;
    
    // Auto-fill amount if a product is selected
    if (name === "productId") {
      const selectedProduct = products.find(p => p.id === value || p._id === value);
      if (selectedProduct) {
        setOfflineForm(prev => ({ 
          ...prev, 
          productId: value, 
          amountPaid: selectedProduct.price * prev.quantity 
        }));
        return;
      }
    }

    // Auto-update amount if quantity changes and a product is already selected
    if (name === "quantity" && offlineForm.productId) {
      const selectedProduct = products.find(p => p.id === offlineForm.productId || p._id === offlineForm.productId);
      if (selectedProduct) {
        setOfflineForm(prev => ({ 
          ...prev, 
          quantity: value, 
          amountPaid: selectedProduct.price * value 
        }));
        return;
      }
    }

    setOfflineForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRecordOfflineSale = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post('/orders/offline', offlineForm);
      
      // 2. Refresh the data from the database to update tables and revenue cards
      await fetchSalesAndProducts();

      // 3. Reset UI State
      setIsRecordModalOpen(false);
      setOfflineForm({ productId: "", quantity: 1, customerName: "", paymentMethod: "CASH", amountPaid: "" });
      setToast({ message: "Offline sale recorded successfully. Inventory updated.", type: "success" });
      
    } catch (error) {
      setToast({ message: error.response?.data?.message || "Failed to record sale.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculations & Filtering
  const filteredSales = sales.filter(sale => {
    const matchesTab = activeTab === "ALL" || sale.channel === activeTab;
    const matchesSearch = (sale.customerName || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (sale.id || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Total Revenue Calculations (checking both 'total' and 'totalAmount')
  const totalRevenue = sales.reduce((sum, sale) => sum + (parseFloat(sale.total || sale.totalAmount) || 0), 0);
  const onlineRevenue = sales.filter(s => s.channel === "ONLINE").reduce((sum, s) => sum + (parseFloat(s.total || s.totalAmount) || 0), 0);
  const offlineRevenue = sales.filter(s => s.channel === "OFFLINE").reduce((sum, s) => sum + (parseFloat(s.total || s.totalAmount) || 0), 0);

  if (isAuthLoading || isLoading) return <DashboardSkeleton />;
  
  // Prevent flicker right before unauthenticated redirect
  if (!vendor) return null;

  return (
    <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50/50 pb-24 relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* HEADER & ACTIONS */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Sales & Orders</h1>
            <p className="text-sm font-medium text-gray-500">
              Track your revenue across all channels in one central hub.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" /> Export
            </button>
            <button 
              onClick={() => setIsRecordModalOpen(true)}
              className="bg-[#044e3b] hover:bg-[#033c2d] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" /> Record Offline Sale
            </button>
          </div>
        </div>

        {/* SUMMARY METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Revenue</span>
            </div>
            <h3 className="text-3xl font-black text-gray-900">₦{totalRevenue.toLocaleString()}</h3>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Online Sales</span>
            </div>
            <h3 className="text-3xl font-black text-gray-900">₦{onlineRevenue.toLocaleString()}</h3>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <Store className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Offline Sales</span>
            </div>
            <h3 className="text-3xl font-black text-gray-900">₦{offlineRevenue.toLocaleString()}</h3>
          </div>
        </div>

        {/* FILTERS & TABS */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            <div className="flex items-center bg-gray-100/80 p-1 rounded-xl w-fit">
              {["ALL", "ONLINE", "OFFLINE"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === tab ? "bg-white text-[#044e3b] shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {tab === "ALL" ? "All Sales" : tab === "ONLINE" ? "Online Orders" : "Offline Sales"}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search order ID or customer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#044e3b]/20 text-sm font-medium w-full sm:w-64"
                />
              </div>
              <button className="p-2.5 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SALES TABLE */}
          {filteredSales.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Receipt className="w-8 h-8 text-gray-300" />
              </div>
              <h4 className="text-gray-900 font-bold text-lg mb-1">No sales records found</h4>
              <p className="text-gray-500 text-sm font-medium">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <>
              { /* MOBILE VIEW: Stacked Cards (No horizontal scroll) */ }
              <div className="flex flex-col sm:hidden divide-y divide-gray-100">
                {filteredSales.map((sale, idx) => (
                  <div key={idx} className="p-4 flex flex-col gap-3 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-extrabold text-[#044e3b]">{sale.id}</h4>
                        <p className="text-[10px] font-medium text-gray-500 mt-0.5">
                          {sale.date ? new Date(sale.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "N/A"}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-gray-900">
                          ₦{parseFloat(sale.total || sale.totalAmount || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900">{sale.customerName || "Guest"}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider ${
                        sale.channel === "ONLINE" ? "bg-blue-50 text-blue-700" : "bg-orange-50 text-orange-700"
                      }`}>
                        {sale.channel === "ONLINE" ? <Globe className="w-2.5 h-2.5" /> : <Store className="w-2.5 h-2.5" />}
                        {sale.channel}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <div className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                        {sale.paymentMethod === "CASH" ? <Banknote className="w-3.5 h-3.5 text-emerald-600" /> : 
                         sale.paymentMethod === "TRANSFER" ? <Smartphone className="w-3.5 h-3.5 text-purple-600" /> : 
                         <CreditCard className="w-3.5 h-3.5 text-gray-500" />}
                        {sale.paymentMethod}
                      </div>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider ${
                        sale.status === "PENDING" ? "bg-orange-100 text-orange-700" : 
                        sale.status === "PAID" || sale.status === "DELIVERED" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-700"
                      }`}>
                        {sale.status || "COMPLETED"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP VIEW: Traditional Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-bold">
                      <th className="p-4 pl-6">Order ID</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Channel</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4 text-right pr-6">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredSales.map((sale, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                        <td className="p-4 pl-6 text-sm font-extrabold text-[#044e3b] group-hover:underline">{sale.id}</td>
                        <td className="p-4 text-sm font-medium text-gray-600">
                          {sale.date ? new Date(sale.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "N/A"}
                        </td>
                        <td className="p-4 text-sm font-bold text-gray-900">{sale.customerName || "Guest"}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                            sale.channel === "ONLINE" ? "bg-blue-50 text-blue-700" : "bg-orange-50 text-orange-700"
                          }`}>
                            {sale.channel === "ONLINE" ? <Globe className="w-3 h-3" /> : <Store className="w-3 h-3" />}
                            {sale.channel}
                          </span>
                        </td>
                        <td className="p-4 text-sm font-bold text-gray-600 flex items-center gap-2">
                          {sale.paymentMethod === "CASH" ? <Banknote className="w-4 h-4 text-emerald-600" /> : 
                           sale.paymentMethod === "TRANSFER" ? <Smartphone className="w-4 h-4 text-purple-600" /> : 
                           <CreditCard className="w-4 h-4 text-gray-500" />}
                          {sale.paymentMethod}
                        </td>
                        <td className="p-4 pr-6 text-right text-sm font-black text-gray-900">
                          ₦{parseFloat(sale.total || sale.totalAmount || 0).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* RECORD OFFLINE SALE MODAL */}
      <AnimatePresence>
        {isRecordModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setIsRecordModalOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2.5rem] p-6 sm:p-8 w-full max-w-lg shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsRecordModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* PREMIUM GATE CHECK */}
              {!canRecordOffline ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">Feature Locked</h3>
                  <p className="text-gray-500 text-sm font-medium mb-8 leading-relaxed max-w-sm mx-auto">
                    Recording offline sales and synchronizing physical inventory is available exclusively on the <strong className="text-gray-900">Starter</strong> and <strong className="text-gray-900">Growth</strong> plans.
                  </p>
                  <Link to="/dashboard/billing" className="w-full inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-600/20 transition-all text-center">
                    Upgrade Plan Now
                  </Link>
                </div>
              ) : (
                /* OFFLINE SALE FORM */
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-1">Record Offline Sale</h3>
                  <p className="text-gray-500 text-sm font-medium mb-6">This will automatically deduct from your online inventory.</p>

                  <form onSubmit={handleRecordOfflineSale} className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Select Product <span className="text-red-500">*</span></label>
                      <select 
                        name="productId" 
                        required
                        value={offlineForm.productId}
                        onChange={handleOfflineFormChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#044e3b]/20 focus:border-[#044e3b] font-bold text-gray-900 appearance-none"
                      >
                        <option value="">-- Choose a product --</option>
                        {products.map(p => (
                          <option key={p.id || p._id} value={p.id || p._id}>{p.name} (₦{p.price} - Stock: {p.stockQuantity})</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Quantity <span className="text-red-500">*</span></label>
                        <input 
                          type="number" 
                          name="quantity" 
                          min="1"
                          required
                          value={offlineForm.quantity}
                          onChange={handleOfflineFormChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#044e3b]/20 font-bold text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Total Amount (₦) <span className="text-red-500">*</span></label>
                        <input 
                          type="number" 
                          name="amountPaid" 
                          required
                          value={offlineForm.amountPaid}
                          onChange={handleOfflineFormChange}
                          className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#044e3b]/20 font-extrabold text-[#044e3b]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Payment Method <span className="text-red-500">*</span></label>
                      <div className="grid grid-cols-3 gap-3">
                        {["CASH", "POS", "TRANSFER"].map(method => (
                          <div 
                            key={method}
                            onClick={() => handleOfflineFormChange({ target: { name: 'paymentMethod', value: method }})}
                            className={`px-2 py-3 rounded-xl border text-center text-xs font-bold cursor-pointer transition-all ${
                              offlineForm.paymentMethod === method ? "bg-[#044e3b] text-white border-[#044e3b] shadow-md" : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {method}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Customer Name <span className="text-gray-400 font-medium">(Optional)</span></label>
                      <div className="relative">
                        <input 
                          type="text" 
                          name="customerName" 
                          value={offlineForm.customerName}
                          onChange={handleOfflineFormChange}
                          placeholder="e.g. Walk-in Customer"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#044e3b]/20 font-medium text-gray-900"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting || !offlineForm.productId}
                      className="w-full mt-2 bg-[#044e3b] hover:bg-[#033d2e] text-white py-4 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Recording...</> : "Record & Update Inventory"}
                    </button>
                  </form>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Sales;