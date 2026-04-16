import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, CheckCircle, User, Phone, MapPin, 
  MessageCircle, Printer, CreditCard, Calendar, Truck
} from "lucide-react";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Reads the ID from the URL

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
             <p className="text-xs font-bold text-gray-500">#{id || "SB-1024"}</p>
          </div>
          {/* Spacer to keep the title perfectly centered*/}
          <div className="w-10"></div> 
        </div>

        {/* STATUS BANNER (Updated to Paid) */}
        <div className="bg-[#F0FDF4] border border-emerald-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                 <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                 <h4 className="font-bold text-gray-900 text-sm">Paid</h4>
                 <p className="text-xs font-medium text-emerald-700 mt-0.5">Payment confirmed, ready for delivery</p>
              </div>
           </div>
           <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-gray-900">Today</p>
              <p className="text-[10px] font-medium text-gray-500 mt-0.5">10:30 AM</p>
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
                 GA
              </div>
              <div className="space-y-2 flex-grow">
                 <h4 className="font-bold text-gray-900 text-base">Grace Ade</h4>
                 <p className="text-xs font-medium text-gray-600 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400" /> 0812 345 6789 
                    <MessageCircle className="w-3.5 h-3.5 text-sabi-primary fill-sabi-primary/20 cursor-pointer" />
                 </p>
                 <p className="text-xs font-medium text-gray-600 flex items-start gap-2 leading-relaxed">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" /> 
                    23 Allen Avenue, Ikeja, <br className="hidden sm:block" /> Lagos State.
                 </p>
              </div>
           </div>
        </div>

        {/* ORDER ITEMS */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-sm">
           <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
              <h3 className="font-extrabold text-gray-900 text-sm">Order Items</h3>
              <span className="text-xs font-bold text-gray-500">2 items • <span className="text-gray-900">₦25,000</span></span>
           </div>
           
           <div className="space-y-4 mb-6">
              <div className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                 <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center text-2xl shrink-0 border border-gray-300">👗</div>
                 <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 text-sm">Ankara Print Dress</h4>
                    <p className="text-[11px] font-medium text-gray-500 mt-1">Size: M <span className="mx-2">•</span> Qty: 1</p>
                 </div>
                 <div className="text-right">
                    <span className="font-extrabold text-gray-900 text-sm">₦18,000</span>
                 </div>
              </div>

              <div className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                 <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center text-2xl shrink-0 border border-gray-300">👳🏾‍♀️</div>
                 <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 text-sm">Matching Headwrap</h4>
                    <p className="text-[11px] font-medium text-gray-500 mt-1">Qty: 1</p>
                 </div>
                 <div className="text-right">
                    <span className="font-extrabold text-gray-900 text-sm">₦7,000</span>
                 </div>
              </div>
           </div>

           <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm">
                 <span className="font-medium text-gray-500">Subtotal</span>
                 <span className="font-bold text-gray-900">₦25,000</span>
              </div>
              <div className="flex justify-between text-sm">
                 <span className="font-medium text-gray-500 flex items-center gap-1.5"><Truck className="w-4 h-4" /> Delivery Fee</span>
                 <span className="font-bold text-gray-900">₦1,500</span>
              </div>
              <div className="flex justify-between text-base pt-3 border-t border-gray-100">
                 <span className="font-extrabold text-gray-900">Total Amount</span>
                 <span className="font-extrabold text-sabi-primary">₦26,500</span>
              </div>
           </div>
        </div>

        {/* PAYMENT & FULFILLMENT */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-sm">
           <h3 className="font-extrabold text-gray-900 text-sm mb-4">Payment & Fulfillment</h3>
           
           <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-sm">
                 <span className="font-medium text-gray-500 flex items-center gap-2"><CreditCard className="w-4 h-4 text-gray-400" /> Payment Status</span>
                 <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 text-xs">Paid</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                 <span className="font-medium text-gray-500 flex items-center gap-2"><User className="w-4 h-4 text-gray-400" /> Payment Method</span>
                 <span className="font-bold text-gray-900">Bank Transfer</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                 <span className="font-medium text-gray-500 flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-400" /> Order Date</span>
                 <span className="font-bold text-gray-900 text-xs">June 24, 2026 • 10:30 AM</span>
              </div>
           </div>

           {/* Only "Mark as Delivered" remains since order is already paid */}
           <button className="w-full py-3.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm shadow-sm">
              <Truck className="w-4 h-4" /> Mark as Delivered
           </button>
        </div>

        {/* CUSTOMER NOTE */}
        <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-200">
           <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4 text-sabi-primary" />
              <h4 className="font-bold text-gray-900 text-sm">Customer Note</h4>
           </div>
           <p className="text-sm font-medium text-gray-600 italic">"Please make sure the dress is well-packaged. It's a gift."</p>
        </div>

        {/* BOTTOM ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
           <button className="w-full py-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm shadow-sm">
              <MessageCircle className="w-4 h-4 text-emerald-500" /> Contact Customer
           </button>
           <button className="w-full py-3.5 bg-[#044e3b] hover:bg-sabi-primaryDark text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 text-sm">
              <Printer className="w-4 h-4" /> Print Receipt
           </button>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;