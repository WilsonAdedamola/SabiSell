import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, CheckCircle, User, Phone, MapPin, 
  MessageCircle, Printer, CreditCard, Calendar, Truck,
  Loader2, AlertCircle
} from "lucide-react";
import api from '../../utils/api'; // Ready for backend integration
import {OrderDetailsSkeleton} from '../../components/shared/Skeletons';

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // --- STATE MANAGEMENT ---
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // --- FETCH ORDER DATA ---
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // TODO: Replace with real API call -> await api.get(`/orders/${id}`);
        // Simulating network delay and backend response
        setTimeout(() => {
          setOrder({
            id: id || "SB-1024",
            status: "PAID", 
            deliveryStatus: "PROCESSING", // PENDING, PROCESSING, SHIPPED, DELIVERED
            date: "June 24, 2026",
            time: "10:30 AM",
            note: "Please make sure the dress is well-packaged. It's a gift.",
            customer: {
              name: "Grace Ade",
              initials: "GA",
              phone: "0812 345 6789",
              address: "23 Allen Avenue, Ikeja, Lagos State."
            },
            items: [
              { id: 1, name: "Ankara Print Dress", size: "M", qty: 1, price: 18000, emoji: "👗" },
              { id: 2, name: "Matching Headwrap", size: null, qty: 1, price: 7000, emoji: "👳🏾‍♀️" }
            ],
            summary: {
              subtotal: 25000,
              deliveryFee: 1500,
              total: 26500
            },
            payment: {
              method: "Bank Transfer",
              status: "Paid"
            }
          });
          setIsLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to load order details.");
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  // --- UPDATE ORDER STATUS ---
  const handleDeliveryUpdate = async () => {
    setIsUpdating(true);
    try {
      // TODO: Replace with real API call -> await api.put(`/orders/${id}/status`, { status: 'DELIVERED' });
      setTimeout(() => {
        setOrder(prev => ({ ...prev, deliveryStatus: "DELIVERED" }));
        setIsUpdating(false);
      }, 600);
    } catch (err) {
      console.error("Failed to update status");
      setIsUpdating(false);
    }
  };

  // --- RENDER LOADING / ERROR STATES ---
  if (isLoading) {
    return (
      // <div className="flex-1 h-full flex flex-col items-center justify-center bg-gray-50/50">
      //   <Loader2 className="w-10 h-10 text-sabi-primary animate-spin mb-4" />
      //   <p className="text-gray-500 font-bold">Loading order details...</p>
      // </div>
      <OrderDetailsSkeleton />
    );
  }

  if (error || !order) {
    return (
      <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
        <h3 className="text-lg font-bold text-gray-900 mb-2">Order Not Found</h3>
        <p className="text-gray-500 mb-6">{error || "The order you are looking for does not exist."}</p>
        <button onClick={() => navigate('/dashboard/orders')} className="text-sabi-primary font-bold hover:underline">
          &larr; Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full">
      <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="text-center">
             <h1 className="text-lg sm:text-xl font-extrabold text-gray-900">Order Details</h1>
             <p className="text-xs font-bold text-gray-500">#{order.id}</p>
          </div>
          <div className="w-10"></div> 
        </div>

        {/* STATUS BANNER */}
        <div className="bg-[#F0FDF4] border border-emerald-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                 <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                 <h4 className="font-bold text-gray-900 text-sm">{order.payment.status}</h4>
                 <p className="text-xs font-medium text-emerald-700 mt-0.5">
                   {order.deliveryStatus === "DELIVERED" ? "Order successfully completed" : "Payment confirmed, ready for delivery"}
                 </p>
              </div>
           </div>
           <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-gray-900">Today</p>
              <p className="text-[10px] font-medium text-gray-500 mt-0.5">{order.time}</p>
           </div>
        </div>

        {/* CUSTOMER INFORMATION */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-sm">
           <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-gray-900 text-sm">Customer Information</h3>
              <button className="text-xs font-bold text-sabi-primary hover:underline">View Profile</button>
           </div>
           <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm border-2 border-emerald-50">
                 {order.customer.initials}
              </div>
              <div className="space-y-2 grow">
                 <h4 className="font-bold text-gray-900 text-base">{order.customer.name}</h4>
                 <p className="text-xs font-medium text-gray-600 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400" /> {order.customer.phone} 
                    <a href={`https://wa.me/${order.customer.phone.replace(/\s+/g, '')}`} target="_blank" rel="noreferrer">
                      <MessageCircle className="w-3.5 h-3.5 text-sabi-primary fill-sabi-primary/20 cursor-pointer" />
                    </a>
                 </p>
                 <p className="text-xs font-medium text-gray-600 flex items-start gap-2 leading-relaxed whitespace-pre-line">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" /> 
                    {order.customer.address}
                 </p>
              </div>
           </div>
        </div>

        {/* ORDER ITEMS */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-sm">
           <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
              <h3 className="font-extrabold text-gray-900 text-sm">Order Items</h3>
              <span className="text-xs font-bold text-gray-500">
                {order.items.length} items • <span className="text-gray-900">₦{order.summary.subtotal.toLocaleString()}</span>
              </span>
           </div>
           
           <div className="space-y-4 mb-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                   <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center text-2xl shrink-0 border border-gray-300">
                     {item.emoji}
                   </div>
                   <div className="grow">
                      <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                      <p className="text-[11px] font-medium text-gray-500 mt-1">
                        {item.size && `Size: ${item.size} • `}Qty: {item.qty}
                      </p>
                   </div>
                   <div className="text-right">
                      <span className="font-extrabold text-gray-900 text-sm">₦{(item.price * item.qty).toLocaleString()}</span>
                   </div>
                </div>
              ))}
           </div>

           <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm">
                 <span className="font-medium text-gray-500">Subtotal</span>
                 <span className="font-bold text-gray-900">₦{order.summary.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                 <span className="font-medium text-gray-500 flex items-center gap-1.5"><Truck className="w-4 h-4" /> Delivery Fee</span>
                 <span className="font-bold text-gray-900">₦{order.summary.deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base pt-3 border-t border-gray-100">
                 <span className="font-extrabold text-gray-900">Total Amount</span>
                 <span className="font-extrabold text-sabi-primary">₦{order.summary.total.toLocaleString()}</span>
              </div>
           </div>
        </div>

        {/* PAYMENT & FULFILLMENT */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-sm">
           <h3 className="font-extrabold text-gray-900 text-sm mb-4">Payment & Fulfillment</h3>
           
           <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-sm">
                 <span className="font-medium text-gray-500 flex items-center gap-2"><CreditCard className="w-4 h-4 text-gray-400" /> Payment Status</span>
                 <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 text-xs">{order.payment.status}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                 <span className="font-medium text-gray-500 flex items-center gap-2"><User className="w-4 h-4 text-gray-400" /> Payment Method</span>
                 <span className="font-bold text-gray-900">{order.payment.method}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                 <span className="font-medium text-gray-500 flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-400" /> Order Date</span>
                 <span className="font-bold text-gray-900 text-xs">{order.date} • {order.time}</span>
              </div>
           </div>

           <button 
             onClick={handleDeliveryUpdate}
             disabled={order.deliveryStatus === "DELIVERED" || isUpdating}
             className={`w-full py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm shadow-sm cursor-pointer ${
               order.deliveryStatus === "DELIVERED" 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700"
             }`}
           >
              {isUpdating ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</>
              ) : order.deliveryStatus === "DELIVERED" ? (
                <><CheckCircle className="w-4 h-4" /> Delivered</>
              ) : (
                <><Truck className="w-4 h-4" /> Mark as Delivered</>
              )}
           </button>
        </div>

        {/* CUSTOMER NOTE */}
        {order.note && (
          <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-200">
             <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-sabi-primary" />
                <h4 className="font-bold text-gray-900 text-sm">Customer Note</h4>
             </div>
             <p className="text-sm font-medium text-gray-600 italic">"{order.note}"</p>
          </div>
        )}

        {/* BOTTOM ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
           <a href={`tel:${order.customer.phone}`} className="w-full py-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm shadow-sm">
              <Phone className="w-4 h-4 text-emerald-500" /> Call Customer
           </a>
           <button className="w-full py-3.5 bg-[#044e3b] hover:bg-sabi-primaryDark text-white cursor-pointer rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 text-sm">
              <Printer className="w-4 h-4" /> Download Receipt
           </button>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;