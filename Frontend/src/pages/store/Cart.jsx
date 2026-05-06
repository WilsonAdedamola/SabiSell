import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { 
  ShoppingBag, ArrowLeft, Trash2, Plus, Minus, 
  ShieldCheck, Info, Lock, MessageCircle, X
} from "lucide-react";
import { useCart } from '../../context/CartContext';
import api from '../../utils/api';

const Cart = () => {
  const { fallbackStoreLink } = useParams();
  const navigate = useNavigate(); 
  
  // Dynamic base path for Vercel free tier vs Subdomains
  const basePath = fallbackStoreLink ? `/store/${fallbackStoreLink}` : "";

  const { cart, updateQuantity, removeFromCart, cartTotalPrice, cartTotalItems } = useCart();
  const [store, setStore] = useState(null);
  
  // State for the delivery info tooltip
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);

  // Fetch the store's data and styling
  useEffect(() => {
    const hostname = window.location.hostname;
    const mainDomains = ['localhost', '127.0.0.1', 'sabisell.vercel.app', 'www.sabisell.vercel.app', 'sabisell.com', 'www.sabisell.com'];
    
    let storeLink = fallbackStoreLink || (!mainDomains.includes(hostname) ? hostname.split('.')[0] : null);

    if (storeLink) {
      api.get(`/storefront/${storeLink}`)
         .then(res => setStore(res.data.store))
         .catch(err => console.error("Error fetching store data", err));
    }
  }, [fallbackStoreLink]);

  const themeStyle = { backgroundColor: store?.themeColor || "#0A3224" };
  const textThemeStyle = { color: store?.themeColor || "#0A3224" };
  const borderThemeStyle = { borderColor: store?.themeColor || "#0A3224" };

  // Delivery is calculated later, so the total is exactly the cart price
  const total = cartTotalPrice;

  // --- DYNAMIC UP-SELLS ---
  const cartItemIds = cart.map(item => item.id);
  const upsellProducts = store?.products?.filter(p => !cartItemIds.includes(p.id) && p.status === 'ACTIVE') || [];

  return (
    <div className="min-h-screen bg-[#FDFDFB] font-sans pb-16">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* --- BACK BUTTON --- */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors mb-6 w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shopping
        </button>

        {cart.length === 0 ? (
          // --- EMPTY STATE ---
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm mt-4 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-serif text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 font-medium mb-8 max-w-sm mx-auto">
              Looks like you haven't added anything to your cart yet. Let's change that!
            </p>
            <Link 
              to={basePath || "/"}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-white font-bold transition-all shadow-md hover:shadow-lg"
              style={themeStyle}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          // --- CART ITEMS & SUMMARY ---
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* LEFT COLUMN: CART ITEMS */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col order-1">
              
              <div className="mb-6 border-b border-gray-200 pb-4">
                <h1 className="text-3xl sm:text-4xl font-serif text-gray-900">Your Cart ({cart.length})</h1>
              </div>

              {/* Cart Items List */}
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 sm:gap-6 bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm relative">
                    {/* Image */}
                    <div className="w-24 h-32 sm:w-28 sm:h-36 shrink-0 bg-[#F5F2ED] rounded-xl overflow-hidden">
                      <Link to={`${basePath}/product/${item.id}`} className="block w-full h-full">
                        {item.imageUrls?.[0] ? (
                          <img src={item.imageUrls[0]} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center"><ShoppingBag className="w-8 h-8 text-gray-300" /></div>
                        )}
                      </Link>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col flex-1 py-1">
                      <div className="flex justify-between items-start mb-1 sm:mb-2 pr-6">
                        <Link to={`${basePath}/product/${item.id}`} className="hover:opacity-80 transition-opacity">
                          <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight">{item.name}</h3>
                        </Link>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.size && item.color && <span className="w-px h-3 bg-gray-300"></span>}
                        {item.color && <span>Color: {item.color}</span>}
                        {!item.size && !item.color && <span>{item.category}</span>}
                      </div>

                      <div className="mt-auto flex items-center justify-between sm:items-end">
                        <div className="sm:hidden font-bold text-gray-900 text-base">
                          ₦{Number(item.price * item.cartQuantity).toLocaleString()}
                        </div>
                        
                        <div className="flex items-center gap-4 w-auto justify-between sm:justify-start">
                          <div className="flex items-center border border-gray-200 rounded-full bg-gray-50/50">
                            <button 
                              onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-bold text-gray-900">
                              {item.cartQuantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                              disabled={item.cartQuantity >= item.stockQuantity}
                              className={`w-8 h-8 flex items-center justify-center transition-colors ${item.cartQuantity >= item.stockQuantity ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-gray-900"}`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <div className="hidden sm:block font-bold text-gray-900 text-lg">
                            ₦{(item.price * item.cartQuantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Actions */}
              <div className="flex items-center justify-end mt-6 bg-[#FAF9F5] p-4 rounded-2xl border border-gray-100">
                <button 
                  onClick={() => {
                    cart.forEach(item => removeFromCart(item.id));
                  }}
                  className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-red-500 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" /> Clear Cart
                </button>
              </div>

              {/* Up-sells / Recommended Products (Desktop) */}
              {upsellProducts.length > 0 && (
                <div className="mt-12 sm:mt-16 hidden lg:block">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">You might also love</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {upsellProducts.slice(0, 4).map((product) => (
                      <Link to={`${basePath}/product/${product.id}`} key={product.id} className="group relative block">
                        <div className="aspect-[3/4] bg-[#F5F2ED] rounded-2xl overflow-hidden mb-3 relative border border-gray-100">
                          {product.imageUrls?.[0] ? (
                            <img src={product.imageUrls[0]} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center"><ShoppingBag className="w-8 h-8 text-gray-300" /></div>
                          )}
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:opacity-70 transition-opacity">{product.name}</h4>
                        <p className="text-sm font-bold text-gray-900 mt-1">₦{Number(product.price).toLocaleString()}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY */}
            <div className="lg:col-span-5 xl:col-span-4 order-2">
              <div className="bg-white border border-gray-100 rounded-[2rem] p-6 sm:p-8 shadow-sm lg:sticky lg:top-8">
                
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                  <h2 className="text-xl font-serif text-gray-900">Order Summary</h2>
                  <span className="text-sm text-gray-500">{cartTotalItems} items</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-bold text-gray-900">₦{cartTotalPrice.toLocaleString()}</span>
                  </div>
                  
                  {/* --- UPDATED: DELIVERY FEE WITH TOOLTIP --- */}
                  <div className="flex justify-between items-center text-sm relative">
                    <button 
                      type="button"
                      onClick={() => setShowDeliveryInfo(!showDeliveryInfo)}
                      className="text-gray-600 flex items-center gap-1 hover:text-gray-900 transition-colors focus:outline-none"
                    >
                      Delivery Fee <Info className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                    <span className="font-bold text-gray-600">Calculated Later</span>
                    
                    {/* Tooltip Popover */}
                    {showDeliveryInfo && (
                      <div className="absolute top-6 left-0 w-64 bg-gray-900 text-white text-xs p-3.5 rounded-xl shadow-xl z-20 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold">Pay Delivery Later</span>
                          <X className="w-3.5 h-3.5 cursor-pointer hover:text-gray-300" onClick={() => setShowDeliveryInfo(false)} />
                        </div>
                        <p className="text-gray-300 leading-relaxed mt-1">
                          Delivery fees are calculated after checkout. The vendor will contact you to agree on the best delivery method and exact cost based on your location.
                        </p>
                        {/* Triangle pointer */}
                        <div className="absolute -top-1 left-16 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8 pt-4 border-t border-gray-100">
                  <span className="text-lg font-serif text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">₦{total.toLocaleString()}</span>
                </div>

                {/* Checkout Buttons */}
                <div className="space-y-3 mb-6">
                  <Link 
                    to={`${basePath}/checkout`}
                    className="w-full flex items-center justify-center gap-2 text-white py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    style={themeStyle}
                  >
                    <Lock className="w-4 h-4" /> Checkout Securely
                  </Link>
                  <button 
                    className="w-full flex items-center justify-center gap-2 bg-white border hover:bg-gray-50 py-4 rounded-xl font-bold transition-colors"
                    style={{ ...textThemeStyle, ...borderThemeStyle }}
                  >
                    <MessageCircle className="w-5 h-5" /> Buy via WhatsApp
                  </button>
                </div>

                {/* Trust & Payment Info */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-start gap-3 mb-4">
                    <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" style={textThemeStyle} />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Your payment is 100% secure</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">
                        We use industry-standard encryption to keep your data safe.
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">We accept</p>
                    <div className="flex items-center gap-2 opacity-80">
                      <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-extrabold text-blue-500 shadow-sm">Paystack</span>
                      <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-extrabold text-blue-800 shadow-sm italic">VISA</span>
                      <div className="w-6 h-4 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm relative overflow-hidden">
                         <div className="w-3 h-3 rounded-full bg-red-500 absolute -left-1"></div>
                         <div className="w-3 h-3 rounded-full bg-orange-500 absolute -right-1 mix-blend-multiply"></div>
                      </div>
                      <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-extrabold text-red-600 shadow-sm">Verve</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Up-sells (MOBILE ONLY) */}
            {upsellProducts.length > 0 && (
              <div className="mt-8 lg:hidden order-3">
                <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">You might also love</h3>
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {upsellProducts.slice(0, 2).map((product) => (
                    <Link to={`${basePath}/product/${product.id}`} key={product.id} className="group relative block">
                      <div className="aspect-[3/4] bg-[#F5F2ED] rounded-2xl overflow-hidden mb-3 relative border border-gray-100">
                        {product.imageUrls?.[0] ? (
                          <img src={product.imageUrls[0]} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center"><ShoppingBag className="w-8 h-8 text-gray-300" /></div>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:opacity-70 transition-opacity">{product.name}</h4>
                      <p className="text-sm font-bold text-gray-900 mt-1">₦{Number(product.price).toLocaleString()}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;