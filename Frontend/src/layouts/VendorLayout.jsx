import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Store, Package, ClipboardList, Users, 
  BarChart2, Tag, QrCode, CreditCard, Settings, HelpCircle,
  Search, Bell, ExternalLink, Menu, X, Plus, MoreHorizontal,
  ChevronRight, Rocket, MessageCircle
} from "lucide-react";
import Logo from "../components/shared/Logo";

const VendorLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const location = useLocation();

  const navigation = [
    { section: "STORE", items: [
      { name: "My Store", icon: Store, path: "/dashboard/store" },
      { name: "Products", icon: Package, path: "/dashboard/products", badge: "12" },
      { name: "Orders", icon: ClipboardList, path: "/dashboard/orders", badge: "36", badgeColor: "bg-emerald-100 text-emerald-800" },
      { name: "Customers", icon: Users, path: "/dashboard/customers" },
      { name: "Analytics", icon: BarChart2, path: "/dashboard/analytics" },
    ]},
    { section: "SALES & MARKETING", items: [
      { name: "Discounts & Coupons", icon: Tag, path: "/dashboard/discounts" },
      { name: "Store Link & QR Code", icon: QrCode, path: "/dashboard/link" },
    ]},
    { section: "SETTINGS", items: [
      { name: "Payments", icon: CreditCard, path: "/dashboard/payments" },
      { name: "Store Settings", icon: Settings, path: "/dashboard/settings" },
    ]}
  ];

  const bottomNav = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Products", icon: Package, path: "/dashboard/products" },
    { name: "Orders", icon: ClipboardList, path: "/dashboard/orders" },
    { name: "Customers", icon: Users, path: "/dashboard/customers" },
    { name: "Chat", icon: MessageCircle, path: "/dashboard/messages" },
  ];

  // Reusable Sidebar Content (Accepts a `collapsed` prop)
  const SidebarContent = ({ collapsed = false }) => (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Sidebar Header / Logo */}
      <div className={`h-20 flex items-center ${collapsed ? 'justify-center' : 'px-6 justify-between lg:justify-start'} border-b border-gray-100 shrink-0 transition-all duration-300`}>
        <Link to="/dashboard" className="flex items-center gap-2">
          <Logo className="w-8 h-8 shrink-0" showText={!collapsed} />
        </Link>
        {!collapsed && (
          <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        )}
      </div>

      {/* Sidebar Links */}
      <div className={`flex-1 overflow-y-auto py-6 ${collapsed ? 'px-3' : 'px-4'} space-y-6 hide-scrollbar transition-all duration-300`}>
        {/* Main Dashboard Button */}
        <Link 
          to="/dashboard" 
          title={collapsed ? "Dashboard" : ""}
          className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl font-bold transition-all ${
            location.pathname === "/dashboard" ? "bg-sabi-primary text-white shadow-md shadow-emerald-600/20" : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <LayoutDashboard className="w-5 h-5 shrink-0" /> 
          {!collapsed && <span className="whitespace-nowrap">Dashboard</span>}
        </Link>

        {navigation.map((group, idx) => (
          <div key={idx} className={collapsed ? "mt-6" : ""}>
            {!collapsed ? (
              <p className="px-4 text-xs font-extrabold text-gray-400 tracking-wider mb-3 truncate transition-all duration-300">
                {group.section}
              </p>
            ) : (
              <div className="w-full h-px bg-gray-100 my-4"></div>
            )}
            <div className="space-y-1.5">
              {group.items.map((item, itemIdx) => {
                const isActive = location.pathname.includes(item.path);
                return (
                  <Link 
                    key={itemIdx} 
                    to={item.path} 
                    title={collapsed ? item.name : ""}
                    className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between px-4'} py-3 rounded-xl font-semibold transition-all ${
                      isActive ? "bg-emerald-50 text-sabi-primary" : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
                      <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-sabi-primary" : "text-gray-400"}`} />
                      {!collapsed && <span className="whitespace-nowrap">{item.name}</span>}
                    </div>
                    {!collapsed && item.badge && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-gray-100 text-gray-600'}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Promo / Support (Hidden when collapsed) */}
      {!collapsed && (
        <div className="p-4 shrink-0 border-t border-gray-100 transition-all duration-300">
          <div className="bg-emerald-50 rounded-2xl p-4 relative overflow-hidden">
             <div className="flex items-start gap-3 relative z-10">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                   <Rocket className="w-4 h-4 text-sabi-primary" />
                </div>
                <div>
                   <h4 className="font-bold text-gray-900 text-sm">Grow Your Business</h4>
                   <p className="text-xs text-gray-600 mt-1 mb-3">Add more products and start sharing your store link.</p>
                   <button className="w-full bg-sabi-primary text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-1 hover:bg-sabi-primaryDark transition-colors">
                      View Tips <ChevronRight className="w-4 h-4" />
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50/50 font-sans overflow-hidden">
      
      {/* DESKTOP SIDEBAR */}
      <aside 
        className={`hidden lg:block ${isDesktopCollapsed ? 'w-22' : 'w-70'} h-full border-r border-gray-200 shrink-0 z-20 transition-all duration-300 ease-in-out`}
      >
        <SidebarContent collapsed={isDesktopCollapsed} />
      </aside>

      {/* MOBILE SLIDE-OUT MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="w-70 h-full bg-white shadow-2xl relative z-50 animate-in slide-in-from-left-4 duration-200">
             {/* Always expanded on mobile */}
             <SidebarContent collapsed={false} />
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        
        {/* DESKTOP HEADER */}
        <header className="hidden lg:flex h-20 bg-white border-b border-gray-200 items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors shrink-0"
              title="Toggle Sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative w-72 xl:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search orders, products..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary text-sm font-medium transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-sm font-bold text-gray-700 transition-colors shadow-sm">
              <HelpCircle className="w-4 h-4 text-sabi-primary" /> Help & Support
            </button>
            <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-sm font-bold text-gray-700 transition-colors shadow-sm">
              <ExternalLink className="w-4 h-4 text-sabi-primary" /> View Store
            </a>
            <div className="w-px h-8 bg-gray-200 mx-2"></div>
            <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="flex items-center gap-3 pl-2">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Zara" alt="Profile" className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-200" />
              <div className="text-left hidden xl:block">
                <p className="text-sm font-bold text-gray-900">Zara Stitches</p>
                <p className="text-xs font-medium text-gray-500">Fashion & Clothing</p>
              </div>
            </button>
          </div>
        </header>

        {/* MOBILE HEADER */}
        <header className="lg:hidden flex h-16 bg-white border-b border-gray-200 items-center justify-between px-4 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-1.5 -ml-1.5 text-gray-600">
              <Menu className="w-6 h-6" />
            </button>
            <Logo className="w-7 h-7" showText={true} />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-1.5 text-gray-600">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative p-1.5 text-gray-600">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Zara" alt="Profile" className="w-8 h-8 rounded-full bg-emerald-100" />
          </div>
        </header>

        {/* MAIN OUTLET CONTAINER */}
        <main className="flex-1 overflow-y-auto w-full pb-24 lg:pb-8">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
             <Outlet />
          </div>
        </main>

        {/* MOBILE BOTTOM NAVIGATION */}
        <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-40 pb-safe">
          <div className="flex items-center justify-between px-2 h-16 relative">
            
            {/* Floating Action Button */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
               <Link to="/dashboard/products/new" className="flex items-center justify-center w-14 h-14 bg-sabi-primary hover:bg-sabi-primaryDark text-white rounded-full shadow-lg border-4 border-white transition-transform active:scale-95">
                  <Plus className="w-6 h-6" />
               </Link>
            </div>

            {bottomNav.map((item, idx) => {
              const isActive = location.pathname === item.path;
              if (idx === 2) return <div key="spacer" className="w-14"></div>;

              return item.action ? (
                 <button key={idx} onClick={item.action} className="flex flex-col items-center justify-center w-[20%] py-1">
                    <item.icon className="w-6 h-6 mb-1 text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-400">{item.name}</span>
                 </button>
              ) : (
                 <Link key={idx} to={item.path} className="flex flex-col items-center justify-center w-[20%] py-1">
                    <item.icon className={`w-6 h-6 mb-1 ${isActive ? 'text-sabi-primary fill-emerald-100' : 'text-gray-400'}`} />
                    <span className={`text-[10px] font-bold ${isActive ? 'text-sabi-primary' : 'text-gray-400'}`}>{item.name}</span>
                 </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default VendorLayout;