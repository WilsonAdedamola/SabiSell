import { useNavigate, useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, Phone, MoreVertical, ShoppingBag, 
  ArrowRight, Paperclip, Smile, Send, Store, Box
} from "lucide-react";

const ChatScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="flex-1 flex flex-col w-full h-full pb-16 lg:pb-0 animate-in fade-in duration-300">
      <div className="flex-1 flex flex-col w-full mx-auto bg-white sm:border-x sm:border-gray-200 shadow-sm overflow-hidden">
        
        {/* CHAT HEADER */}
        <div className="h-16 sm:h-20 bg-white border-b border-gray-100 flex items-center justify-between px-2 sm:px-6 shrink-0 z-10">
           <div className="flex items-center gap-3 sm:gap-4">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2">
                 <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-50 flex items-center justify-center text-xl shrink-0 border border-gray-200">
                    👩🏾
                 </div>
                 <div>
                    <h2 className="text-sm sm:text-base font-extrabold text-gray-900 leading-tight">Grace Ade</h2>
                    <div className="flex items-center gap-2 mt-0.5">
                       <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1 border border-emerald-100">
                          Order #SB-1024
                       </span>
                       <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Online
                       </span>
                    </div>
                 </div>
              </div>
           </div>
           <div className="flex items-center gap-1 sm:gap-2">
              <button className="p-2 sm:p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-full transition-colors">
                 <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button className="p-2 sm:p-2.5 hover:bg-gray-100 text-gray-700 rounded-full transition-colors">
                 <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
           </div>
        </div>

        {/* MESSAGES AREA */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/30 hide-scrollbar flex flex-col gap-4">
           
           {/* Embedded Order Summary Card */}
           <div className="bg-white border border-gray-100 rounded-2xl p-4 flex justify-between items-center shadow-[0_2px_10px_rgb(0,0,0,0.02)] mb-2">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-5 h-5 text-sabi-primary" />
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900 text-sm">Order Summary</h4>
                    <p className="text-[11px] font-medium text-gray-500 mt-0.5">2 items <span className="mx-1">•</span> ₦25,000 <span className="mx-1">•</span> Pending</p>
                 </div>
              </div>
              <Link to="/dashboard/orders/SB-1024" className="text-sabi-primary text-xs font-bold flex items-center gap-1 hover:underline">
                 View Order <ArrowRight className="w-3 h-3" />
              </Link>
           </div>

           {/* Date Separator */}
           <div className="flex justify-center my-2">
              <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Today</span>
           </div>

           {/* Incoming Message */}
           <div className="self-start max-w-[85%] sm:max-w-[75%]">
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-3.5 shadow-sm">
                 <p className="text-sm font-medium text-gray-700 leading-relaxed">
                    Hello! I just placed an order for the <span className="font-bold text-gray-900">Ankara Print Dress</span>. Please I want to confirm something.
                 </p>
              </div>
              <p className="text-[10px] font-medium text-gray-400 mt-1 ml-1">10:15 AM</p>
           </div>

           {/* Outgoing Message */}
           <div className="self-end max-w-[85%] sm:max-w-[75%]">
              <div className="bg-[#e6f4ea] border border-emerald-100 rounded-2xl rounded-tr-sm p-3.5 shadow-sm">
                 <p className="text-sm font-medium text-gray-800 leading-relaxed">
                    Hello Grace! 👋<br/><br/>
                    Yes, I see your order <span className="font-bold">#SB-1024</span>.<br/>
                    How can I help you?
                 </p>
              </div>
              <p className="text-[10px] font-medium text-gray-400 mt-1 mr-1 text-right flex items-center justify-end gap-1">
                 10:16 AM <span className="text-emerald-500 font-bold">✓✓</span>
              </p>
           </div>

           {/* Incoming Message */}
           <div className="self-start max-w-[85%] sm:max-w-[75%]">
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-3.5 shadow-sm">
                 <p className="text-sm font-medium text-gray-700 leading-relaxed">
                    Please make sure the dress is well-packaged. It's for a birthday gift.
                 </p>
              </div>
              <p className="text-[10px] font-medium text-gray-400 mt-1 ml-1">10:18 AM</p>
           </div>

           {/* Outgoing Message */}
           <div className="self-end max-w-[85%] sm:max-w-[75%]">
              <div className="bg-[#e6f4ea] border border-emerald-100 rounded-2xl rounded-tr-sm p-3.5 shadow-sm">
                 <p className="text-sm font-medium text-gray-800 leading-relaxed">
                    Noted ✅<br/>
                    We will package it carefully and ensure it gets to you in perfect condition.
                 </p>
              </div>
              <p className="text-[10px] font-medium text-gray-400 mt-1 mr-1 text-right flex items-center justify-end gap-1">
                 10:20 AM <span className="text-emerald-500 font-bold">✓✓</span>
              </p>
           </div>

           {/* System Notification Message */}
           <div className="self-center w-full max-w-[90%] sm:max-w-[80%] my-2">
              <div className="bg-[#F3E8FF] border border-purple-100 rounded-2xl p-4 shadow-sm flex items-start gap-3">
                 <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center shrink-0 mt-0.5">
                    <ShoppingBag className="w-4 h-4 text-purple-700" />
                 </div>
                 <div>
                    <div className="flex items-center gap-2 mb-1">
                       <span className="font-bold text-gray-900 text-sm">Order Update</span>
                       <span className="text-[10px] font-medium text-gray-500">• 10:25 AM</span>
                    </div>
                    <p className="text-sm font-bold text-purple-900 mb-0.5">Your order is being prepared!</p>
                    <p className="text-xs font-medium text-purple-700/80">We'll notify you when it's ready for delivery.</p>
                 </div>
              </div>
           </div>

           {/* Incoming Message */}
           <div className="self-start max-w-[85%] sm:max-w-[75%] mb-4">
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-3.5 shadow-sm">
                 <p className="text-sm font-medium text-gray-700 leading-relaxed">
                    Thank you so much! 🙏
                 </p>
              </div>
              <p className="text-[10px] font-medium text-gray-400 mt-1 ml-1">10:28 AM</p>
           </div>

        </div>

        {/* BOTTOM INPUT AREA */}
        <div className="bg-white border-t border-gray-100 p-3 sm:p-4 shrink-0 flex flex-col gap-3">
           
           {/* Quick Actions Scroll Row */}
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar grow pr-4">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:block">Quick Actions</span>
                 <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition-colors shrink-0">
                    <Box className="w-3.5 h-3.5" /> Order Details
                 </button>
                 <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg text-xs font-bold transition-colors shrink-0">
                    <Store className="w-3.5 h-3.5" /> Share Store
                 </button>
                 <button className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-100 text-purple-700 rounded-lg text-xs font-bold transition-colors shrink-0">
                    <ShoppingBag className="w-3.5 h-3.5" /> Send Catalogue
                 </button>
              </div>
              <button className="text-xs font-bold text-sabi-primary shrink-0 hover:underline">Manage</button>
           </div>

           {/* Input Box */}
           <div className="flex items-end gap-2">
              <div className="flex-grow bg-gray-50 border border-gray-200 rounded-[1.5rem] flex items-center px-2 py-1 focus-within:ring-2 focus-within:ring-sabi-primary/20 focus-within:border-sabi-primary transition-all">
                 <button className="p-2 text-gray-400 hover:text-gray-700 rounded-full transition-colors shrink-0">
                    <Paperclip className="w-5 h-5" />
                 </button>
                 <textarea 
                    rows="1" 
                    placeholder="Type a message..." 
                    className="flex-grow bg-transparent border-none focus:ring-0 focus:outline-none text-sm font-medium text-gray-900 py-2.5 px-1 resize-none max-h-24 overflow-y-auto"
                 ></textarea>
                 <button className="p-2 text-gray-400 hover:text-gray-700 rounded-full transition-colors shrink-0">
                    <Smile className="w-5 h-5" />
                 </button>
              </div>
              <button className="w-12 h-12 rounded-full bg-[#044e3b] hover:bg-sabi-primaryDark text-white flex items-center justify-center shrink-0 shadow-md transition-colors">
                 <Send className="w-5 h-5 -ml-0.5" />
              </button>
           </div>

        </div>
      </div>
    </div>
  );
};

export default ChatScreen;