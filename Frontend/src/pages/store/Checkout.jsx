import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Confetti from 'react-confetti';
import { 
  Lock, ShieldCheck, CreditCard, Truck, 
  CheckCircle2, ChevronRight, ShoppingBag,
  MessageCircle, Building2, Zap, Loader2,
  Package, MapPin, Mail, ArrowRight, Phone, AlertCircle
} from "lucide-react";
import { useCart } from '../../context/CartContext';
import api from '../../utils/api';

const Checkout = () => {
  const { fallbackStoreLink } = useParams();
  const navigate = useNavigate();
  
  const basePath = fallbackStoreLink ? `/store/${fallbackStoreLink}` : "";
  const { cart, cartTotalPrice, cartTotalItems, clearCart } = useCart();
  
  const [store, setStore] = useState(null);
  const [storeSlug, setStoreSlug] = useState(""); // Track the store slug for the API call
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentStep, setCurrentStep] = useState(2);
  const [checkoutError, setCheckoutError] = useState(""); // New state for backend errors
  const [mockOrder, setMockOrder] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    apartment: "",
    state: "Lagos",
    city: "",
    landmark: "" 
  });
  
  const [phoneError, setPhoneError] = useState("");
  // Default and currently ONLY allowed option
  const [deliveryMethod, setDeliveryMethod] = useState("negotiated"); 
  const [paymentMethod, setPaymentMethod] = useState("paystack");

  const deliveryOptions = {
    standard: { name: "Standard Delivery", price: 2500, eta: "1 - 2 working days", icon: Truck },
    pickup: { name: "Pickup Station", price: 1000, eta: "2 - 3 working days", icon: Building2 },
    negotiated: { name: "Pay Delivery Later", price: 0, eta: "Vendor will contact you with fee", icon: Phone }
  };

  const deliveryFee = deliveryOptions[deliveryMethod].price;
  const total = cartTotalPrice + deliveryFee;

  useEffect(() => {
    if (cart.length === 0 && currentStep === 2) {
      navigate(basePath || "/");
      return;
    }

    const hostname = window.location.hostname;
    const mainDomains = ['localhost', '127.0.0.1', 'sabisell.vercel.app', 'www.sabisell.vercel.app', 'sabisell.com', 'www.sabisell.com'];
    let storeLink = fallbackStoreLink || (!mainDomains.includes(hostname) ? hostname.split('.')[0] : null);

    if (storeLink) {
      setStoreSlug(storeLink); // Save this for the checkout API route
      api.get(`/storefront/${storeLink}`)
         .then(res => {
           setStore(res.data.store);
           setIsLoading(false);
         })
         .catch(err => {
           console.error("Error fetching store data", err);
           setIsLoading(false);
         });
    }
  }, [fallbackStoreLink, cart.length, navigate, basePath, currentStep]);

  const validatePhone = (phone) => {
    const phoneRegex = /^(\+?234|0)[789]\d{9}$/;
    if (!phone) {
      setPhoneError("Phone number is required");
      return false;
    }
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      setPhoneError("Please enter a valid Nigerian phone number");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "phone") validatePhone(value);
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!validatePhone(formData.phone)) return;
    setCheckoutError(""); // Clear previous errors
    setCurrentStep(3);
  };

  // --- ACTUAL BACKEND API INTEGRATION ---
  useEffect(() => {
    if (currentStep === 3) {
      const processOrder = async () => {
        try {
          // Construct the payload to send to the backend
          const orderPayload = {
            customerName: formData.fullName,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            shippingAddress: {
              address: formData.address,
              apartment: formData.apartment,
              city: formData.city,
              state: formData.state,
              landmark: formData.landmark
            },
            items: cart.map(item => ({
              productId: item.productId || item.id,
              name: item.name,
              price: item.price,
              quantity: item.cartQuantity,
              size: item.size,
              color: item.color,
              image: item.imageUrls?.[0] || ""
            })),
            subtotal: cartTotalPrice,
            deliveryFee: deliveryFee,
            totalAmount: total,
            deliveryMethod: deliveryMethod,
            paymentMethod: paymentMethod 
          };

          // Hit the checkout endpoint
          const response = await api.post(`/storefront/${storeSlug}/checkout`, orderPayload);

          // Update the success screen with the real order data from the DB
          setMockOrder({
            orderNumber: response.data.order?.orderNumber || `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
            email: formData.email || "No email provided",
            address: `${formData.address}, ${formData.city}, ${formData.state}`,
            total: total,
            deliveryMethodName: deliveryOptions[deliveryMethod].name,
            deliveryEta: deliveryOptions[deliveryMethod].eta
          });
          
          clearCart();
          setCurrentStep(4);

        } catch (error) {
          console.error("Checkout processing failed:", error);
          setCheckoutError(error.response?.data?.message || "Something went wrong processing your order. Please check your connection and try again.");
          setCurrentStep(2); // Kick them back to the form so they can try again
        }
      };

      processOrder();
    }
  }, [currentStep, clearCart, formData, total, deliveryMethod, paymentMethod, cartTotalPrice, deliveryFee, cart, storeSlug]);


  if (isLoading) return null;

  const themeStyle = { backgroundColor: store?.themeColor || "#0A3224" };
  const textThemeStyle = { color: store?.themeColor || "#0A3224" };
  const borderThemeStyle = { borderColor: store?.themeColor || "#0A3224" };
  const ringThemeStyle = { '--tw-ring-color': store?.themeColor || '#0A3224' };

  return (
    <div className="min-h-screen bg-[#FDFDFB] font-sans pb-16 relative overflow-hidden">
      
      {currentStep === 4 && (
        <Confetti 
          width={window.innerWidth} 
          height={window.innerHeight} 
          recycle={false} 
          numberOfPieces={400} 
          gravity={0.2}
          className="z-[100]"
        />
      )}

      {/* HEADER */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 pt-4 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-row md:items-center justify-between gap-4 mb-4">
            <Link to={basePath || "/"} className="flex items-center gap-3">
              {store?.logoUrl && <img src={store.logoUrl} alt="Logo" className="w-8 h-8 rounded-full object-cover" />}
              <h1 className="font-serif text-xl tracking-tight text-gray-900 uppercase">
                {store?.storeName || "Store"}
              </h1>
            </Link>
            
            <div className="flex items-center gap-2 font-bold text-gray-900 text-sm bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              <Lock className="w-4 h-4 text-emerald-600" /> Secure Checkout
            </div>
          </div>

          <div className="flex items-center justify-center max-w-2xl mx-auto mt-6 mb-4 relative">
            <div className="absolute left-8 right-8 top-3 h-0.5 bg-gray-200 z-0"></div>
            <div 
              className="absolute left-8 top-3 h-0.5 z-0 transition-all duration-500" 
              style={{ ...themeStyle, right: currentStep === 2 ? '66%' : currentStep === 3 ? '33%' : '8%' }}
            ></div>
            
            <div className="flex justify-between w-full relative z-10">
              <div className="flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shadow-sm" style={themeStyle}>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-gray-900">Cart</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white px-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${currentStep >= 2 ? 'text-white' : 'border-2 border-gray-200 text-gray-400 bg-white'}`} style={currentStep >= 2 ? themeStyle : {}}>
                  {currentStep > 2 ? <CheckCircle2 className="w-4 h-4" /> : "2"}
                </div>
                <span className={`text-[10px] font-bold ${currentStep >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>Checkout</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white px-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-colors ${currentStep >= 3 ? 'text-white' : 'border-2 border-gray-200 text-gray-400 bg-white'}`} style={currentStep >= 3 ? themeStyle : {}}>
                  {currentStep > 3 ? <CheckCircle2 className="w-4 h-4" /> : "3"}
                </div>
                <span className={`text-[10px] font-bold ${currentStep >= 3 ? 'text-gray-900' : 'text-gray-400'}`}>Payment</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white px-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-colors ${currentStep >= 4 ? 'text-white' : 'border-2 border-gray-200 text-gray-400 bg-white'}`} style={currentStep >= 4 ? themeStyle : {}}>
                  4
                </div>
                <span className={`text-[10px] font-bold ${currentStep >= 4 ? 'text-gray-900' : 'text-gray-400'}`}>Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </header>


      {/* STEP 2: CHECKOUT FORM & SUMMARY */}
      {currentStep === 2 && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Error Banner */}
          {checkoutError && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 max-w-7xl mx-auto">
               <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
               <p className="text-sm font-bold text-red-800">{checkoutError}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            <div className="lg:col-span-7 xl:col-span-7">
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-10">
                
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={themeStyle}>1</div>
                    <h2 className="text-xl font-serif text-gray-900 leading-none">Contact Information</h2>
                  </div>
                  <p className="text-sm font-medium text-gray-500 mb-6 pl-9">We'll use this to send your order updates</p>
                  
                  <div className="pl-0 sm:pl-9 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <label className="absolute top-2 left-4 text-[10px] font-bold text-gray-400 uppercase">Full Name</label>
                        <input 
                          type="text" name="fullName" required value={formData.fullName} onChange={handleChange}
                          className="w-full px-4 pt-6 pb-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all font-bold text-gray-900 shadow-sm"
                          style={ringThemeStyle}
                        />
                      </div>
                      <div className="relative">
                        <label className="absolute top-2 left-4 text-[10px] font-bold text-gray-400 uppercase">Phone Number</label>
                        <input 
                          type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                          placeholder="+234..."
                          className={`w-full px-4 pt-6 pb-2 bg-white border ${phoneError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 transition-all font-bold text-gray-900 shadow-sm`}
                          style={!phoneError ? ringThemeStyle : {}}
                        />
                        {phoneError && <p className="text-[10px] text-red-500 font-bold mt-1 absolute -bottom-4 left-2">{phoneError}</p>}
                      </div>
                    </div>
                    <div className="relative">
                      <label className="absolute top-2 left-4 text-[10px] font-bold text-gray-400 uppercase">Email Address</label>
                      <input 
                        type="email" name="email" required value={formData.email} onChange={handleChange}
                        className="w-full px-4 pt-6 pb-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all font-bold text-gray-900 shadow-sm"
                        style={ringThemeStyle}
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={themeStyle}>2</div>
                      <h2 className="text-xl font-serif text-gray-900 leading-none">Delivery Address</h2>
                    </div>
                  </div>
                  <div className="pl-0 sm:pl-9 space-y-4">
                    <div className="relative">
                      <label className="absolute top-2 left-4 text-[10px] font-bold text-gray-400 uppercase">Country / Region</label>
                      <select disabled className="w-full px-4 pt-6 pb-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 appearance-none opacity-80 cursor-not-allowed">
                        <option>Nigeria</option>
                      </select>
                    </div>
                    <div className="relative">
                      <label className="absolute top-2 left-4 text-[10px] font-bold text-gray-400 uppercase">Address</label>
                      <input 
                        type="text" name="address" required value={formData.address} onChange={handleChange}
                        className="w-full px-4 pt-6 pb-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all font-bold text-gray-900 shadow-sm"
                        style={ringThemeStyle}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <label className="absolute top-2 left-4 text-[10px] font-bold text-gray-400 uppercase">Apt, suite (optional)</label>
                        <input 
                          type="text" name="apartment" value={formData.apartment} onChange={handleChange}
                          className="w-full px-4 pt-6 pb-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all font-bold text-gray-900 shadow-sm"
                          style={ringThemeStyle}
                        />
                      </div>
                      <div className="relative">
                        <label className="absolute top-2 left-4 text-[10px] font-bold text-gray-400 uppercase">State</label>
                        <select 
                          name="state" value={formData.state} onChange={handleChange}
                          className="w-full px-4 pt-6 pb-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all font-bold text-gray-900 shadow-sm appearance-none"
                          style={ringThemeStyle}
                        >
                          <option value="Lagos">Lagos</option>
                          <option value="Abuja">Abuja</option>
                          <option value="Oyo">Oyo</option>
                        </select>
                      </div>
                      <div className="relative">
                        <label className="absolute top-2 left-4 text-[10px] font-bold text-gray-400 uppercase">City</label>
                        <input 
                          type="text" name="city" required value={formData.city} onChange={handleChange}
                          className="w-full px-4 pt-6 pb-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all font-bold text-gray-900 shadow-sm"
                          style={ringThemeStyle}
                        />
                      </div>
                      
                      <div className="relative flex flex-col">
                        <div className="relative">
                          <label className="absolute top-2 left-4 text-[10px] font-bold text-gray-400 uppercase">Landmark (Optional)</label>
                          <input 
                            type="text" name="landmark" value={formData.landmark} onChange={handleChange}
                            placeholder="e.g. Beside Zenith Bank"
                            className="w-full px-4 pt-6 pb-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all font-bold text-gray-900 shadow-sm"
                            style={ringThemeStyle}
                          />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1 ml-1 leading-tight">
                          A popular building or place near you to help the driver.
                        </p>
                      </div>
                    </div>

                    {formData.city && deliveryMethod !== 'negotiated' && (
                      <div className="mt-4 flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Truck className="w-5 h-5 text-emerald-700 shrink-0" />
                          <div>
                            <h4 className="text-sm font-bold text-emerald-900">Good news! We deliver to {formData.city}</h4>
                            <p className="text-xs font-medium text-emerald-700 mt-0.5">Estimated delivery: {deliveryOptions[deliveryMethod].eta}</p>
                          </div>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 hidden sm:block" />
                      </div>
                    )}
                  </div>
                </section>

                {/* 3. Delivery Method */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={themeStyle}>3</div>
                    <h2 className="text-xl font-serif text-gray-900 leading-none">Delivery Method</h2>
                  </div>
                  
                  <div className="pl-0 sm:pl-9 space-y-3">
                    {Object.entries(deliveryOptions).map(([key, option]) => {
                      const isSelected = deliveryMethod === key;
                      const isDisabled = key !== 'negotiated'; // Disable all except negotiated
                      const Icon = option.icon;
                      
                      return (
                        <div 
                          key={key} 
                          className={`flex items-center justify-between w-full p-4 border-2 rounded-xl transition-all 
                            ${isSelected ? 'bg-gray-50' : 'border-gray-200 bg-white'} 
                            ${isDisabled ? 'opacity-40 blur-[0.8px] grayscale cursor-not-allowed pointer-events-none' : 'cursor-pointer hover:border-gray-300'}`}
                          style={isSelected ? borderThemeStyle : {}}
                          onClick={() => {
                            if (!isDisabled) setDeliveryMethod(key);
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-transparent' : 'border-gray-300'}`}>
                              {isSelected ? <CheckCircle2 className="w-6 h-6" style={textThemeStyle} /> : null}
                            </div>
                            <Icon className="w-5 h-5 text-gray-400 hidden sm:block" />
                            <div>
                              <span className="font-bold text-gray-900 block text-sm sm:text-base">{option.name}</span>
                              <span className="text-[10px] sm:text-xs font-medium text-gray-500">{option.eta}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            {option.price === 0 ? (
                               <span className="font-bold text-gray-600 text-sm block">Calculated Later</span>
                            ) : (
                               <span className="font-extrabold text-gray-900 block">₦{option.price.toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={themeStyle}>4</div>
                    <h2 className="text-xl font-serif text-gray-900 leading-none">Payment Method</h2>
                  </div>
                  <p className="text-sm font-medium text-gray-500 mb-6 pl-9">All payments are secure and encrypted</p>
                  
                  <div className="pl-0 sm:pl-9 space-y-3">
                    <label 
                      className={`flex items-center justify-between w-full p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'paystack' ? 'bg-gray-50' : 'border-gray-200 bg-white'}`}
                      style={paymentMethod === 'paystack' ? borderThemeStyle : {}}
                      onClick={() => setPaymentMethod('paystack')}
                    >
                      <div className="flex items-center gap-4">
                         <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'paystack' ? 'border-transparent' : 'border-gray-300'}`}>
                            {paymentMethod === 'paystack' ? <CheckCircle2 className="w-6 h-6" style={textThemeStyle} /> : null}
                         </div>
                        <div>
                          <span className="font-bold text-gray-900 block text-sm sm:text-base">Pay with Paystack</span>
                          <span className="text-[10px] sm:text-xs font-medium text-gray-500">Pay securely with your card or bank</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-80">
                        <span className="text-[10px] font-extrabold text-blue-800 italic pr-1">VISA</span>
                        <div className="w-5 h-3 bg-white border border-gray-200 rounded flex items-center justify-center relative overflow-hidden">
                           <div className="w-2 h-2 rounded-full bg-red-500 absolute -left-0.5"></div>
                           <div className="w-2 h-2 rounded-full bg-orange-500 absolute -right-0.5 mix-blend-multiply"></div>
                        </div>
                        <span className="text-[10px] font-extrabold text-red-600 pl-1">Verve</span>
                      </div>
                    </label>

                    <label 
                      className={`flex items-center justify-between w-full p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'bg-gray-50' : 'border-gray-200 bg-white'}`}
                      style={paymentMethod === 'transfer' ? borderThemeStyle : {}}
                      onClick={() => setPaymentMethod('transfer')}
                    >
                      <div className="flex items-center gap-4">
                         <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'transfer' ? 'border-transparent' : 'border-gray-300'}`}>
                            {paymentMethod === 'transfer' ? <CheckCircle2 className="w-6 h-6" style={textThemeStyle} /> : null}
                         </div>
                        <div>
                          <span className="font-bold text-gray-900 block text-sm sm:text-base">Bank Transfer</span>
                          <span className="text-[10px] sm:text-xs font-medium text-gray-500">Make payment directly to our bank account</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </label>
                  </div>
                </section>

                <div className="lg:hidden pt-6">
                  <button 
                    type="submit" 
                    className="w-full py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    style={themeStyle}
                  >
                    Pay ₦{total.toLocaleString()} Securely <Lock className="w-4 h-4" />
                  </button>
                </div>

              </form>
            </div>

            <div className="lg:col-span-5 xl:col-span-5">
              <div className="bg-[#FAF9F5] border border-gray-200 rounded-[2rem] p-6 sm:p-8 lg:sticky lg:top-24">
                
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                   <h2 className="text-xl font-serif text-gray-900">Order Summary</h2>
                   <span className="text-sm font-medium text-gray-500">{cartTotalItems} items</span>
                </div>
                
                <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto hide-scrollbar pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="relative w-16 h-20 shrink-0 bg-white border border-gray-200 rounded-xl overflow-hidden">
                        {item.imageUrls?.[0] ? (
                          <img src={item.imageUrls[0]} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center"><ShoppingBag className="w-5 h-5 text-gray-300" /></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight line-clamp-2">{item.name}</h4>
                        <p className="text-[11px] font-medium text-gray-500 mt-1">
                          {item.size && `Size: ${item.size} `} {item.color && `| Color: ${item.color}`}
                        </p>
                        <p className="text-[11px] font-medium text-gray-500 mt-0.5">Qty: {item.cartQuantity}</p>
                      </div>
                      <span className="text-sm font-bold text-gray-900 whitespace-nowrap">
                        ₦{(item.price * item.cartQuantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 font-medium">Subtotal</span>
                    <span className="font-bold text-gray-900">₦{cartTotalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 font-medium">Delivery Fee</span>
                    <span className="font-bold text-gray-900">
                      {deliveryMethod === 'negotiated' ? "Calculated Later" : `₦${deliveryFee.toLocaleString()}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8 pt-4 border-t border-gray-200">
                  <span className="text-lg font-serif text-gray-900">Total</span>
                  <span className="text-2xl font-black text-gray-900">₦{total.toLocaleString()}</span>
                </div>

                <button 
                  type="submit" 
                  form="checkout-form"
                  className="hidden lg:flex w-full py-4 rounded-xl text-white font-bold items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 mb-4"
                  style={themeStyle}
                >
                  Pay ₦{total.toLocaleString()} Securely <Lock className="w-4 h-4 ml-1" />
                </button>
                
                <p className="text-center text-[10px] text-gray-500 font-medium mb-8">
                   By placing your order, you agree to our <br/>
                   <a href="#" className="underline hover:text-gray-900">Terms & Conditions</a> | <a href="#" className="underline hover:text-gray-900">Privacy Policy</a>
                </p>

              </div>
            </div>

          </div>
        </main>
      )}


      {/* STEP 3: MOCK PAYMENT PROCESSING */}
      {currentStep === 3 && (
        <main className="max-w-2xl mx-auto px-4 pt-20 sm:pt-32 pb-32 text-center animate-in fade-in duration-500">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={themeStyle}></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <Loader2 className="w-16 h-16 animate-spin mb-6" style={textThemeStyle} />
              <h2 className="text-2xl font-serif text-gray-900 mb-2">Processing Order</h2>
              <p className="text-gray-500 font-medium">
                Please wait while we securely process your order via {paymentMethod === 'paystack' ? 'Paystack' : 'Bank Transfer'}. Do not close this window.
              </p>
              
              <div className="mt-8 pt-8 border-t border-gray-100 w-full">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-gray-400 uppercase tracking-widest text-[10px]">Amount</span>
                  <span className="text-gray-900 text-lg">₦{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}


      {/* STEP 4: SUCCESS / CONFIRMATION */}
      {currentStep === 4 && mockOrder && (
        <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg border-4 border-white relative z-10" style={themeStyle}>
            <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-500 font-medium text-sm sm:text-base max-w-md mx-auto mb-10">
            Thank you for shopping with us. Your order has been received and is currently being processed.
          </p>

          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-10 text-left mb-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2" style={themeStyle}></div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order Number</p>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">{mockOrder.orderNumber}</h3>
              </div>
              <div className="sm:text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Paid</p>
                <h3 className="text-lg sm:text-xl font-black" style={textThemeStyle}>₦{mockOrder.total.toLocaleString()}</h3>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Order Updates</h4>
                  <p className="text-xs font-medium text-gray-500 mt-1 leading-relaxed">
                    We've sent a confirmation email to <strong className="text-gray-900">{mockOrder.email}</strong> with your order details and receipt.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                  <MapPin className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Delivery Address</h4>
                  <p className="text-xs font-medium text-gray-500 mt-1 leading-relaxed">
                    {mockOrder.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                  {deliveryMethod === 'negotiated' ? <Phone className="w-5 h-5 text-gray-500" /> : <Package className="w-5 h-5 text-gray-500" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Delivery Method: {mockOrder.deliveryMethodName}</h4>
                  <p className="text-xs font-medium text-gray-500 mt-1 leading-relaxed">
                    {mockOrder.deliveryEta}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to={basePath || "/"}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              style={themeStyle}
            >
              <ShoppingBag className="w-5 h-5" /> Continue Shopping
            </Link>
          </div>
        </main>
      )}

    </div>
  );
};

export default Checkout;