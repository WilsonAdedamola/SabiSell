import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, SlidersHorizontal, X, MessageCircle, 
  ShoppingBag, Sparkles, ChevronRight, Headphones
} from "lucide-react";

const Inbox = () => {
  const [activeTab, setActiveTab] = useState("All Chats");
  const [showTip, setShowTip] = useState(true);

  const tabs = [
    { name: "All Chats", count: 12, color: "bg-sabi-primary text-white" },
    { name: "Active", count: 4, color: "bg-emerald-50 text-emerald-700" },
    { name: "Orders", count: 6, color: "bg-blue-50 text-blue-700" },
    { name: "Unread", count: 2, color: "bg-gray-800 text-white" },
  ];

  const chats = [
    { id: "grace", name: "Grace Ade", tag: "Order #SB-1024", tagColor: "bg-emerald-50 text-emerald-700", time: "10:30 AM", message: "Please make sure the dress is well-packaged.", unread: 2, img: "👩🏾" },
    { id: "mary", name: "Mary Daniel", tag: "Order #SB-1023", tagColor: "bg-emerald-50 text-emerald-700", time: "Yesterday", message: "Do you have this shirt in size L?", unread: 0, img: "👩🏽" },
    { id: "chidera", name: "Chidera Williams", tag: "General Enquiry", tagColor: "bg-purple-50 text-purple-700", time: "Yesterday", message: "Thank you! How long will delivery take?", unread: 0, img: "🧑🏾" },
    { id: "fatima", name: "Fatima Ali", tag: "Order #SB-1021", tagColor: "bg-emerald-50 text-emerald-700", time: "Jun 19", message: "Okay, I have sent the payment ✔️", unread: 0, img: "🧕🏾" },
    { id: "new", name: "New Customer", tag: "New", tagColor: "bg-gray-100 text-gray-600", time: "Jun 18", message: "Is Ankara fabric available?", unread: 0, img: "NC" },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full">
      <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900">Messages</h1>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex gap-3">
          <div className="relative grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary font-medium text-gray-900 shadow-sm"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors shrink-0 shadow-sm">
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

        {/* QUICK TIP BANNER */}
        {showTip && (
          <div className="bg-[#F0FDF4] border border-emerald-100 rounded-2xl p-4 flex items-start gap-3 shadow-sm relative transition-all">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4 text-sabi-primary" />
            </div>
            <div className="pr-6">
              <h4 className="font-bold text-gray-900 text-sm">Quick Tip</h4>
              <p className="text-xs font-medium text-gray-600 mt-0.5">Respond fast to customers to increase sales!</p>
            </div>
            <button onClick={() => setShowTip(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
               <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* CHAT LIST */}
        <div className="bg-white border border-gray-200 rounded-4xl overflow-hidden shadow-sm">
          <div className="divide-y divide-gray-100">
            {chats.map((chat) => (
              <Link key={chat.id} to={`/dashboard/messages/${chat.id}`} className="block p-4 sm:p-5 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl shrink-0 border border-gray-200 ${chat.img === 'NC' ? 'bg-gray-100 text-gray-500 font-bold text-base' : 'bg-emerald-50'}`}>
                    {chat.img}
                  </div>
                  <div className="grow min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2 truncate pr-2">
                         <h4 className="font-extrabold text-gray-900 text-sm sm:text-base truncate">{chat.name}</h4>
                         <span className={`hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border border-transparent ${chat.tagColor}`}>
                           {chat.tag}
                         </span>
                      </div>
                      <span className={`text-xs whitespace-nowrap shrink-0 ${chat.unread > 0 ? 'font-bold text-sabi-primary' : 'font-medium text-gray-400'}`}>
                         {chat.time}
                      </span>
                    </div>
                    {/* Mobile-only tag view */}
                    <span className={`inline-block sm:hidden text-[10px] font-bold px-2 py-0.5 rounded-md border border-transparent mb-1 ${chat.tagColor}`}>
                       {chat.tag}
                    </span>
                    <div className="flex items-center justify-between">
                      <p className={`text-xs sm:text-sm truncate pr-4 ${chat.unread > 0 ? 'font-bold text-gray-900' : 'font-medium text-gray-500'}`}>
                         {chat.message}
                      </p>
                      <div className="shrink-0 flex items-center justify-end w-6">
                         {chat.unread > 0 ? (
                           <div className="w-5 h-5 rounded-full bg-sabi-primary text-white flex items-center justify-center text-[10px] font-bold">
                              {chat.unread}
                           </div>
                         ) : (
                           <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors" />
                         )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* BUSINESS TOOLS */}
        <div className="bg-white border border-gray-200 rounded-4xl p-5 sm:p-6 shadow-sm">
           <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-gray-900">Business Tools</h3>
              <button className="text-sabi-primary text-sm font-bold flex items-center hover:underline">
                 View All <ChevronRight className="w-4 h-4"/>
              </button>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-blue-50 border border-blue-100 hover:bg-blue-100/50 transition-colors text-center">
                 <Headphones className="w-6 h-6 text-blue-600 mb-2" />
                 <h4 className="text-sm font-bold text-gray-900">Quick Replies</h4>
                 <p className="text-[10px] font-medium text-gray-500 mt-0.5">Save & reuse messages</p>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-emerald-50 border border-emerald-100 hover:bg-emerald-100/50 transition-colors text-center">
                 <ShoppingBag className="w-6 h-6 text-emerald-600 mb-2" />
                 <h4 className="text-sm font-bold text-gray-900">Order Inquiries</h4>
                 <p className="text-[10px] font-medium text-gray-500 mt-0.5">6 active discussions</p>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-purple-50 border border-purple-100 hover:bg-purple-100/50 transition-colors text-center">
                 <Sparkles className="w-6 h-6 text-purple-600 mb-2" />
                 <h4 className="text-sm font-bold text-gray-900">Greeting Message</h4>
                 <p className="text-[10px] font-medium text-gray-500 mt-0.5">Send automatic welcome</p>
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Inbox;