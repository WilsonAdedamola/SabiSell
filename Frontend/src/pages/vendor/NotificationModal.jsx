import { X, Bell, Package, CreditCard, Settings, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const NotificationModal = ({ isOpen, onClose, notifications, markAsRead, markAllAsRead }) => {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIconAndColor = (type) => {
    switch(type) {
      case "order": return { icon: Package, color: "text-[#044e3b] bg-emerald-50 border-emerald-100" };
      case "payment": return { icon: CreditCard, color: "text-blue-600 bg-blue-50 border-blue-100" };
      case "alert": return { icon: AlertCircle, color: "text-orange-600 bg-orange-50 border-orange-100" };
      case "system": return { icon: Settings, color: "text-gray-600 bg-gray-50 border-gray-200" };
      default: return { icon: Bell, color: "text-[#044e3b] bg-emerald-50 border-emerald-100" };
    }
  };

  // Helper to format Postgres timestamps
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.abs(now - date) / 36e5;
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col relative z-10 animate-in slide-in-from-right duration-300">
        
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 relative">
              <Bell className="w-5 h-5 text-gray-700" />
              {unreadCount > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">Notifications</h2>
              <p className="text-xs font-medium text-gray-500">
                {unreadCount > 0 ? `You have ${unreadCount} unread messages` : "You're all caught up!"}
              </p>
            </div>
          </div>
          
          <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {unreadCount > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex justify-end">
            <button onClick={markAllAsRead} className="text-xs font-bold text-[#044e3b] hover:text-[#033d2e] flex items-center gap-1.5 transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5" /> Mark all as read
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto hide-scrollbar pb-12">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No notifications yet</h3>
              <p className="text-sm text-gray-500">When you get sales or alerts, they will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {notifications.map((notif) => {
                const { icon: Icon, color } = getIconAndColor(notif.type);
                
                return (
                  <div 
                    key={notif.id} 
                    onClick={() => { if (!notif.isRead) markAsRead(notif.id); }}
                    className={`p-6 transition-colors cursor-pointer hover:bg-gray-50 flex gap-4 relative group ${notif.isRead ? 'opacity-70' : 'bg-blue-50/30'}`}
                  >
                    {!notif.isRead && <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>}

                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${color}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-sm font-bold truncate pr-4 ${notif.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                          {notif.title}
                        </h4>
                        <span className="text-[10px] font-medium text-gray-400 whitespace-nowrap shrink-0 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {formatTime(notif.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                        {notif.message}
                      </p>
                      
                      {notif.link && (
                        <Link 
                          to={notif.link}
                          onClick={onClose} 
                          className="inline-block mt-3 text-xs font-bold text-[#044e3b] hover:underline"
                        >
                          View Details &rarr;
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;