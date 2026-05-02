import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { 
  ShoppingBag, ArrowLeft, ArrowRight, Trash2, 
  Plus, Minus, ShieldCheck, Info
} from "lucide-react";
import { useCart } from '../../context/CartContext';
import api from '../../utils/api';

const Cart = () => {
  const { fallbackStoreLink } = useParams();
  const navigate = useNavigate();
  
  // Dynamic base path for Vercel free tier vs Subdomains
  const basePath = fallbackStoreLink ? `/store/${fallbackStoreLink}` : "";

  const { cart, updateQuantity, removeFromCart, cartTotalPrice } = useCart();
  const [store, setStore] = useState(null);

  // Fetch the store's theme color so the cart matches the storefront
  useEffect(() => {
    const hostname = window.location.hostname;
    const mainDomains = ['localhost', '127.0.0.1', 'sabisell.vercel.app', 'www.sabisell.vercel.app', 'sabisell.com', 'www.sabisell.com'];
    
    let storeLink = fallbackStoreLink || (!mainDomains.includes(hostname) ? hostname.split('.')[0] : null);

    if (storeLink) {
      api.get(`/storefront/${storeLink}`)
         .then(res => setStore(res.data.store))
         .catch(err => console.error("Error fetching store styling", err));
    }
  }, [fallbackStoreLink]);

  const themeStyle = { backgroundColor: store?.themeColor || "#044e3b" };
  const textThemeStyle = { color: store?.themeColor || "#044e3b" };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* 1. SIMPLE HEADER */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </button>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" style={textThemeStyle} />
            <h1 className="font-extrabold text-gray-900 text-lg">Your Cart</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        {cart.length === 0 ? (
          // --- EMPTY STATE ---
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm mt-8">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 font-medium mb-8 max-w-sm mx-auto">
              Looks like you haven't added anything to your cart yet. Let's change that!
            </p>
            <Link 
              to={basePath || "/"}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-white font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              style={themeStyle}
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          // --- CART ITEMS & SUMMARY ---
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* LEFT SIDE: CART ITEMS */}
            <div className="flex-1 space-y-4">
              <h2 className="font-extrabold text-gray-900 text-xl mb-4">Cart Items ({cart.length})</h2>
              
              {cart.map((item) => (
                <div key={item.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex gap-4 sm:gap-6 relative group">
                  
                  {/* Image */}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-gray-50 overflow-hidden shrink-0 flex items-center justify-center">
                    {item.imageUrls?.[0] ? (
                      <img src={item.imageUrls[0]} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                    ) : (
                      <ShoppingBag className="w-8 h-8 text-gray-300" />
                    )}
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start pr-8 sm:pr-0">
                        <Link to={`${basePath}/product/${item.id}`} className="hover:opacity-80 transition-opacity">
                          <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-2 leading-tight mb-1">{item.name}</h3>
                        </Link>
                      </div>
                      <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{item.category}</p>
                      <p className="font-extrabold text-base sm:text-lg" style={textThemeStyle}>
                        ₦{Number(item.price).toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity & Delete Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
                        <button 
                          onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm border border-gray-200 text-gray-600 hover:text-red-500 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center font-extrabold text-gray-900 text-sm">{item.cartQuantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                          disabled={item.cartQuantity >= item.stockQuantity}
                          className={`w-8 h-8 flex items-center justify-center rounded-md shadow-sm transition-colors ${
                            item.cartQuantity >= item.stockQuantity ? "bg-gray-200 text-gray-400" : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      {/* Mobile Delete (Bottom Right) & Desktop Delete (Top Right) */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors sm:absolute sm:top-4 sm:right-4"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE: ORDER SUMMARY */}
            <div className="w-full md:w-80 lg:w-96 shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                <h2 className="font-extrabold text-gray-900 text-xl mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="font-bold text-gray-900">₦{cartTotalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium flex items-center gap-1">
                      Delivery <Info className="w-3 h-3 text-gray-400" />
                    </span>
                    <span className="font-bold text-gray-500 text-xs">Calculated at checkout</span>
                  </div>
                  
                  <div className="w-full h-px bg-gray-100"></div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-base font-extrabold text-gray-900">Total</span>
                    <span className="text-2xl font-black" style={textThemeStyle}>₦{cartTotalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <Link 
                  to={`${basePath}/checkout`}
                  className="w-full py-3.5 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  style={themeStyle}
                >
                  Proceed to Checkout <ArrowRight className="w-5 h-5" />
                </Link>

                <div className="mt-6 flex items-start gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-800">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-xs font-medium leading-relaxed">
                    Secure checkout provided by Paystack. Your payment information is encrypted and safe.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;