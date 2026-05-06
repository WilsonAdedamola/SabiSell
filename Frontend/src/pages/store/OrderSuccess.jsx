// import { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import Confetti from 'react-confetti';
// import { 
//   CheckCircle2, Package, MapPin, ArrowRight, 
//   ShoppingBag, ShieldCheck, Mail
// } from "lucide-react";
// import api from '../../utils/api';

// const OrderSuccess = () => {
//   const { fallbackStoreLink } = useParams();
//   const basePath = fallbackStoreLink ? `/store/${fallbackStoreLink}` : "";
  
//   const [store, setStore] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Mock Order Data (In a real app, you'd pass this via route state or fetch it using an order ID)
//   const mockOrder = {
//     orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
//     email: "customer@example.com",
//     address: "15, Adekule Street, Surulere, Lagos",
//     total: 65500,
//     deliveryEta: "1 - 2 working days"
//   };

//   // Fetch the store's data and styling
//   useEffect(() => {
//     const hostname = window.location.hostname;
//     const mainDomains = ['localhost', '127.0.0.1', 'sabisell.vercel.app', 'www.sabisell.vercel.app', 'sabisell.com', 'www.sabisell.com'];
//     let storeLink = fallbackStoreLink || (!mainDomains.includes(hostname) ? hostname.split('.')[0] : null);

//     if (storeLink) {
//       api.get(`/storefront/${storeLink}`)
//          .then(res => {
//            setStore(res.data.store);
//            setIsLoading(false);
//          })
//          .catch(err => {
//            console.error("Error fetching store data", err);
//            setIsLoading(false);
//          });
//     } else {
//       setIsLoading(false);
//     }
//   }, [fallbackStoreLink]);

//   if (isLoading) return null; // Or add a skeleton loader here

//   const themeStyle = { backgroundColor: store?.themeColor || "#0A3224" };
//   const textThemeStyle = { color: store?.themeColor || "#0A3224" };

//   return (
//     <div className="min-h-screen bg-[#FDFDFB] font-sans pb-16 relative overflow-hidden">
      
//       {/* Celebration Confetti! (Stops automatically after falling) */}
//       <Confetti 
//         width={window.innerWidth} 
//         height={window.innerHeight} 
//         recycle={false} 
//         numberOfPieces={400} 
//         gravity={0.2}
//       />

//       {/* HEADER WITH PROGRESS STEPPER (Step 4 Active) */}
//       <header className="bg-white border-b border-gray-100 sticky top-0 z-50 pt-4 pb-2">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-center mb-4">
//             <Link to={basePath || "/"} className="flex items-center gap-3">
//               {store?.logoUrl && <img src={store.logoUrl} alt="Logo" className="w-8 h-8 rounded-full object-cover" />}
//               <h1 className="font-serif text-xl tracking-tight text-gray-900 uppercase">
//                 {store?.storeName || "Store"}
//               </h1>
//             </Link>
//           </div>

//           {/* Stepper - All Steps Complete */}
//           <div className="flex items-center justify-center max-w-2xl mx-auto mt-6 mb-4 relative">
//             <div className="absolute left-8 right-8 top-3 h-0.5 z-0 hidden sm:block" style={themeStyle}></div>
            
//             <div className="flex justify-between w-full relative z-10">
//               <div className="flex flex-col items-center gap-2 bg-white px-2">
//                 <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shadow-sm" style={themeStyle}><CheckCircle2 className="w-4 h-4" /></div>
//                 <span className="text-[10px] font-bold text-gray-900">Cart</span>
//               </div>
//               <div className="flex flex-col items-center gap-2 bg-white px-2">
//                 <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shadow-sm" style={themeStyle}><CheckCircle2 className="w-4 h-4" /></div>
//                 <span className="text-[10px] font-bold text-gray-900">Checkout</span>
//               </div>
//               <div className="flex flex-col items-center gap-2 bg-white px-2">
//                 <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shadow-sm" style={themeStyle}><CheckCircle2 className="w-4 h-4" /></div>
//                 <span className="text-[10px] font-bold text-gray-900">Payment</span>
//               </div>
//               <div className="flex flex-col items-center gap-2 bg-white px-2">
//                 <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shadow-sm" style={themeStyle}>4</div>
//                 <span className="text-[10px] font-bold text-gray-900">Confirmation</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        
//         {/* Success Icon */}
//         <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg border-4 border-white relative z-10" style={themeStyle}>
//           <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
//         </div>

//         <h1 className="text-3xl sm:text-5xl font-serif text-gray-900 mb-4">
//           Order Confirmed!
//         </h1>
//         <p className="text-gray-500 font-medium text-sm sm:text-base max-w-md mx-auto mb-10">
//           Thank you for shopping with us. Your order has been received and is currently being processed.
//         </p>

//         {/* Order Details Card */}
//         <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-10 text-left mb-10 relative overflow-hidden">
          
//           <div className="absolute top-0 left-0 w-full h-2" style={themeStyle}></div>

//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
//             <div>
//               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order Number</p>
//               <h3 className="text-lg sm:text-xl font-bold text-gray-900">{mockOrder.orderNumber}</h3>
//             </div>
//             <div className="sm:text-right">
//               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Paid</p>
//               <h3 className="text-lg sm:text-xl font-black" style={textThemeStyle}>₦{mockOrder.total.toLocaleString()}</h3>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div className="flex items-start gap-4">
//               <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
//                 <Mail className="w-5 h-5 text-gray-500" />
//               </div>
//               <div>
//                 <h4 className="text-sm font-bold text-gray-900">Order Updates</h4>
//                 <p className="text-xs font-medium text-gray-500 mt-1 leading-relaxed">
//                   We've sent a confirmation email to <strong className="text-gray-900">{mockOrder.email}</strong> with your order details and receipt.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4">
//               <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
//                 <MapPin className="w-5 h-5 text-gray-500" />
//               </div>
//               <div>
//                 <h4 className="text-sm font-bold text-gray-900">Delivery Address</h4>
//                 <p className="text-xs font-medium text-gray-500 mt-1 leading-relaxed">
//                   {mockOrder.address}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4">
//               <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
//                 <Package className="w-5 h-5 text-gray-500" />
//               </div>
//               <div>
//                 <h4 className="text-sm font-bold text-gray-900">Estimated Delivery</h4>
//                 <p className="text-xs font-medium text-gray-500 mt-1 leading-relaxed">
//                   Your items will arrive in <strong className="text-gray-900">{mockOrder.deliveryEta}</strong>.
//                 </p>
//               </div>
//             </div>
//           </div>

//         </div>

//         {/* Call to Actions */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//           <Link 
//             to={basePath || "/"}
//             className="w-full sm:w-auto flex items-center justify-center gap-2 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
//             style={themeStyle}
//           >
//             <ShoppingBag className="w-5 h-5" /> Continue Shopping
//           </Link>
//           <a 
//             href="#"
//             className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold transition-all hover:bg-gray-50 shadow-sm"
//           >
//             Track Order <ArrowRight className="w-4 h-4" />
//           </a>
//         </div>

//         {/* Security Badge */}
//         <div className="mt-12 flex items-center justify-center gap-2 text-gray-400">
//           <ShieldCheck className="w-4 h-4" />
//           <span className="text-xs font-bold uppercase tracking-widest">Securely Processed via SabiSell</span>
//         </div>

//       </main>
//     </div>
//   );
// };

// export default OrderSuccess;