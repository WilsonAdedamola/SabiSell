// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { 
//   ShoppingBag, Search, Plus, Minus, Copy,
//   MapPin, Loader2, AlertCircle, ChevronRight, 
//   Phone, Mail, MessageCircle, ShieldCheck, Lock, CheckCircle2 
// } from "lucide-react";
// // import api from '../../utils/api'; 

// const Storefront = () => {
//   const { storeSlug } = useParams();
  
//   const [isLoading, setIsLoading] = useState(true);
//   const [store, setStore] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [copied, setCopied] = useState(false);

//   // --- FETCH STORE & PRODUCTS ---
//   useEffect(() => {
//     const fetchStoreData = () => {
//       setTimeout(() => {
//         setStore({
//           name: "Zara Stitches & Fashion",
//           description: "Stylish, quality outfits for men, women & kids. Custom tailoring available.",
//           logo: "ZS",
//           location: "Lagos, Nigeria",
//           phone: "08012345678",
//           email: "hello@zarastitches.com",
//           storeLink: "zara-fashion.sabisell.com"
//         });
        
//         setProducts([
//           { id: 1, name: "Ankara Print Shirt", price: 15000, category: "Men", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80", tag: "Best Seller", stock: "In Stock" },
//           { id: 2, name: "Lace Fabric - Blue", price: 12500, category: "Accessories", image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&q=80", tag: "", stock: "In Stock" },
//           { id: 3, name: "Ready-to-wear Gown", price: 28000, category: "Dresses", image: "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=600&q=80", tag: "", stock: "Low Stock" },
//           { id: 4, name: "Men's Native Wear", price: 35000, category: "Men", image: "https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=600&q=80", tag: "Top Rated", stock: "In Stock" },
//           { id: 5, name: "Leather Slides", price: 8500, category: "Accessories", image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600&q=80", tag: "", stock: "In Stock" },
//           { id: 6, name: "Mini Handbag", price: 18000, category: "Bags", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&q=80", tag: "", stock: "In Stock" },
//         ]);
        
//         setIsLoading(false);
//       }, 600);
//     };

//     fetchStoreData();
//   }, [storeSlug]);

//   // --- CART LOGIC ---
//   const addToCart = (product) => {
//     setCart(prev => {
//       const existing = prev.find(item => item.id === product.id);
//       if (existing) {
//         return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
//       }
//       return [...prev, { ...product, qty: 1 }];
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCart(prev => {
//       const existing = prev.find(item => item.id === productId);
//       if (existing.qty === 1) {
//         return prev.filter(item => item.id !== productId);
//       }
//       return prev.map(item => item.id === productId ? { ...item, qty: item.qty - 1 } : item);
//     });
//   };

//   const getCartCount = () => cart.reduce((total, item) => total + item.qty, 0);

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(store.storeLink);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // --- FILTERING ---
//   const categories = ["All", "Dresses", "Ankara", "Accessories", "Men", "Bags"];
  
//   const filteredProducts = products.filter(p => {
//     const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === "All" || p.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//         <Loader2 className="w-10 h-10 text-[#044e3b] animate-spin mb-4" />
//       </div>
//     );
//   }

//   if (!store) {
//     return <div className="min-h-screen flex items-center justify-center">Store Not Found</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      
//       {/* 1. HEADER */}
//       <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
//         {/* Top Info Bar */}
//         <div className="hidden lg:block bg-[#f8fafc] border-b border-gray-100 text-gray-500 py-2 text-xs font-medium">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
//              <div className="flex items-center gap-6">
//                 <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified SabiSell Business</span>
//                 <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-emerald-600" /> Secure Payments</span>
//              </div>
//              <div className="flex items-center gap-4">
//                 <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {store.location}</span>
//              </div>
//           </div>
//         </div>

//         {/* Main Header */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
//           <Link to={`/${storeSlug}`} className="flex items-center gap-3 shrink-0">
//             <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#044e3b] text-white flex items-center justify-center font-extrabold text-lg sm:text-xl shadow-inner">
//               {store.logo}
//             </div>
//             <div className="hidden sm:block">
//               <h1 className="font-extrabold text-gray-900 text-lg leading-tight tracking-tight">{store.name}</h1>
//               <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Official Store</p>
//             </div>
//           </Link>

//           {/* Search Bar */}
//           <div className="flex-1 max-w-xl hidden md:block">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-400" />
//               </div>
//               <input 
//                 type="text" 
//                 placeholder="Search for products, categories..." 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-transparent rounded-full focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm font-medium"
//               />
//             </div>
//           </div>

//           {/* Cart Icon */}
//           <div className="flex items-center gap-3 shrink-0">
//             <button className="md:hidden p-2 text-gray-600">
//                <Search className="w-6 h-6" />
//             </button>
//             <Link to={`/${storeSlug}/cart`} className="relative p-2 flex items-center gap-2 group">
//               <div className="relative">
//                 <ShoppingBag className="w-7 h-7 text-gray-800 group-hover:text-[#044e3b] transition-colors" />
//                 {getCartCount() > 0 && (
//                   <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
//                     {getCartCount()}
//                   </span>
//                 )}
//               </div>
//               <div className="hidden sm:block text-left">
//                  <p className="text-[10px] font-bold text-gray-500 uppercase leading-none mb-0.5">Your Cart</p>
//                  <p className="text-sm font-bold text-gray-900 leading-none">
//                     ₦{cart.reduce((sum, item) => sum + (item.price * item.qty), 0).toLocaleString()}
//                  </p>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* 2. PROMO HERO BANNER */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 w-full">
//          <div className="w-full h-40 sm:h-56 lg:h-72 rounded-3xl bg-[#044e3b] overflow-hidden relative shadow-md flex items-center">
//             {/* Banner Background Image (mockup inspiration) */}
//             <img 
//                src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=1200&q=80" 
//                alt="Promo Background" 
//                className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
//             />
//             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
//             <div className="relative z-10 px-6 sm:px-12 text-white w-full lg:w-1/2">
//                <div className="inline-block px-3 py-1 bg-emerald-800/80 backdrop-blur-md text-emerald-100 text-xs font-bold border border-emerald-700/50 rounded-lg mb-4">
//                   Fresh Styles Just for You
//                </div>
//                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-2">
//                   Eid Collection <br /> Now Available
//                </h2>
//                <div className="inline-block px-4 py-1.5 bg-yellow-400 text-yellow-900 text-sm font-extrabold rounded-xl mt-2 shadow-sm">
//                   -20% OFF ALL ITEMS
//                </div>
//             </div>
//          </div>
//       </section>

//       {/* 3. MAIN CONTENT AREA */}
//       <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        
//         {/* Categories (Mockup Inspiration) */}
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
//            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 hidden sm:block">Popular Products</h3>
           
//            <div className="flex overflow-x-auto hide-scrollbar gap-2 sm:gap-3 w-full sm:w-auto pb-2 sm:pb-0">
//               {categories.map(category => (
//                 <button 
//                   key={category}
//                   onClick={() => setActiveCategory(category)}
//                   className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
//                     activeCategory === category 
//                     ? 'bg-[#044e3b] text-white shadow-md scale-105' 
//                     : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
//                   }`}
//                 >
//                   {category}
//                 </button>
//               ))}
//            </div>
//         </div>

//         {/* Product Grid (Combining wide layout with mockup card styles) */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
//           {filteredProducts.map((product) => {
//             const cartItem = cart.find(i => i.id === product.id);
//             const qty = cartItem ? cartItem.qty : 0;

//             return (
//               <div key={product.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                
//                 {/* Product Image Area */}
//                 <Link to={`/${storeSlug}/product/${product.id}`} className="block relative aspect-[4/5] bg-[#f8fafc] overflow-hidden p-2">
//                   <img 
//                     src={product.image} 
//                     alt={product.name} 
//                     className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" 
//                   />
//                   {/* Badges from Mockup */}
//                   {product.tag && (
//                      <span className="absolute top-4 left-4 bg-yellow-100 text-yellow-800 text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-yellow-200 shadow-sm flex items-center gap-1">
//                         ★ {product.tag}
//                      </span>
//                   )}
//                   {product.stock === "Low Stock" && (
//                      <span className="absolute bottom-4 right-4 bg-orange-100 text-orange-800 text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-orange-200 shadow-sm">
//                         Low Stock
//                      </span>
//                   )}
//                 </Link>
                
//                 {/* Product Details */}
//                 <div className="p-4 sm:p-5 flex flex-col grow">
//                   <Link to={`/${storeSlug}/product/${product.id}`}>
//                     <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-tight mb-2 hover:text-[#044e3b] transition-colors line-clamp-1">
//                       {product.name}
//                     </h4>
//                   </Link>
                  
//                   <div className="flex items-center justify-between mb-4">
//                      <p className="font-extrabold text-gray-900 text-lg">
//                        ₦{product.price.toLocaleString()}
//                      </p>
//                      {/* In Stock Pill from Mockup */}
//                      {product.stock === "In Stock" && (
//                         <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-100">
//                            <CheckCircle2 className="w-3 h-3" /> In Stock
//                         </div>
//                      )}
//                   </div>
                  
//                   {/* Add to Cart Actions */}
//                   <div className="mt-auto">
//                     {qty === 0 ? (
//                       <button 
//                         onClick={() => addToCart(product)}
//                         className="w-full py-2.5 sm:py-3 bg-white border-2 border-[#044e3b] text-[#044e3b] hover:bg-[#044e3b] hover:text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
//                       >
//                         <ShoppingBag className="w-4 h-4" /> Add to Cart
//                       </button>
//                     ) : (
//                       <div className="flex items-center justify-between bg-gray-50 rounded-xl p-1.5 border border-gray-200">
//                         <button onClick={() => removeFromCart(product.id)} className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:text-red-500 transition-colors">
//                           <Minus className="w-4 h-4" />
//                         </button>
//                         <span className="font-extrabold text-gray-900 text-base">{qty}</span>
//                         <button onClick={() => addToCart(product)} className="w-10 h-10 flex items-center justify-center bg-[#044e3b] rounded-lg shadow-sm text-white hover:bg-emerald-800 transition-colors">
//                           <Plus className="w-4 h-4" />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </main>

//       {/* 4. FOOTER (Wide layout + Mockup Features) */}
//       <footer className="bg-white border-t border-gray-200 mt-auto pt-12 pb-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 mb-12">
              
//               {/* Left Column: Store Branding & Contact Actions */}
//               <div className="md:col-span-5 lg:col-span-4">
//                  <div className="flex items-center gap-3 mb-4">
//                     <div className="w-10 h-10 rounded-xl bg-[#044e3b] text-white flex items-center justify-center font-extrabold text-lg">
//                       {store.logo}
//                     </div>
//                     <div>
//                        <span className="font-extrabold text-gray-900 text-lg block leading-tight">{store.name}</span>
//                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">About This Store</span>
//                     </div>
//                  </div>
//                  <p className="text-gray-500 text-sm leading-relaxed mb-6 pr-4">
//                     {store.description} We deliver across Nigeria. Quality guaranteed. Questions? We're just a message away!
//                  </p>
                 
//                  {/* Action Buttons from Mockup */}
//                  <div className="grid grid-cols-2 gap-3 mb-4">
//                     <a href={`https://wa.me/${store.phone}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition-colors text-sm font-bold">
//                        <MessageCircle className="w-4 h-4" /> WhatsApp
//                     </a>
//                     <a href={`tel:${store.phone}`} className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors text-sm font-bold">
//                        <Phone className="w-4 h-4" /> Call Us
//                     </a>
//                  </div>
//                  <a href="#" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200 transition-colors text-sm font-bold">
//                    Follow on Instagram
//                  </a>
//               </div>

//               {/* Middle Column: Link Copy Box (from mockup) & Trust */}
//               <div className="md:col-span-4 lg:col-span-4">
//                  <h4 className="font-bold text-gray-900 mb-6">Store Details</h4>
                 
//                  {/* Share Link Box */}
//                  <div className="mb-6">
//                     <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Share Store Link</label>
//                     <div className="flex items-center justify-between bg-gray-50 rounded-xl p-2.5 border border-gray-200">
//                        <div className="flex items-center gap-2 overflow-hidden text-gray-700 px-2">
//                           <Lock className="w-4 h-4 shrink-0 text-emerald-600" />
//                           <span className="text-sm font-medium truncate">{store.storeLink}</span>
//                        </div>
//                        <button 
//                          onClick={handleCopyLink}
//                          className="flex items-center gap-1.5 bg-white text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 hover:bg-gray-50 transition-colors shadow-sm"
//                        >
//                           {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
//                           {copied ? "Copied" : "Copy"}
//                        </button>
//                     </div>
//                  </div>

//                  {/* Contact Info */}
//                  <ul className="space-y-4 text-sm font-medium text-gray-600">
//                     <li className="flex items-start gap-3">
//                        <MapPin className="w-5 h-5 text-[#044e3b] shrink-0" />
//                        <span>{store.location}</span>
//                     </li>
//                     <li className="flex items-center gap-3">
//                        <Mail className="w-5 h-5 text-[#044e3b] shrink-0" />
//                        <span>{store.email}</span>
//                     </li>
//                  </ul>
//               </div>

//               {/* Right Column: Quick Links */}
//               <div className="md:col-span-3 lg:col-span-4">
//                  <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
//                  <ul className="space-y-4 text-sm font-medium text-gray-600">
//                     <li><Link to={`/${storeSlug}`} className="hover:text-[#044e3b] transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Home</Link></li>
//                     <li><Link to={`/${storeSlug}/cart`} className="hover:text-[#044e3b] transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Shopping Cart</Link></li>
//                     <li><a href="#" className="hover:text-[#044e3b] transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Return Policy</a></li>
//                     <li><a href="#" className="hover:text-[#044e3b] transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Delivery Information</a></li>
//                  </ul>
//               </div>
//            </div>

//            {/* Bottom Bar with Powered By Badge */}
//            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
//               <p className="text-gray-500 text-sm font-medium text-center md:text-left">
//                  &copy; {new Date().getFullYear()} {store.name}. All rights reserved.
//               </p>
              
//               <div className="flex flex-col items-center sm:items-end">
//                  <div className="flex items-center gap-1.5 text-sm mb-1">
//                     <ShieldCheck className="w-4 h-4 text-emerald-600" />
//                     <span className="text-gray-500 font-medium">Powered by</span>
//                     <span className="font-extrabold text-gray-900 tracking-tight">SabiSell</span>
//                  </div>
//                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
//                     Trusted by 10,000+ Vendors
//                  </p>
//               </div>
//            </div>
//         </div>
//       </footer>

//     </div>
//   );
// };

// export default Storefront;





import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"; 
import { 
  ShoppingBag, Search, Plus, Minus, Copy,
  MapPin, Loader2, ChevronRight, 
  Phone, Mail, MessageCircle, ShieldCheck, Lock, CheckCircle2
} from "lucide-react";
import api from '../../utils/api'; 
import { useCart } from '../../context/CartContext'; 

const Storefront = () => {
  const { fallbackStoreLink } = useParams(); 

  // --- NEW: DYNAMIC BASE PATH LOGIC ---
  // If we are on Vercel free tier, basePath will be "/store/store-name"
  // If we are on a custom subdomain, basePath will be ""
  const basePath = fallbackStoreLink ? `/store/${fallbackStoreLink}` : "";

  const [isLoading, setIsLoading] = useState(true);
  const [store, setStore] = useState(null);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [copied, setCopied] = useState(false);

  const { cart, addToCart, updateQuantity, cartTotalItems, cartTotalPrice } = useCart();

  // --- FETCH STORE & PRODUCTS ---
  useEffect(() => {
    const hostname = window.location.hostname; 
    
    const mainDomains = [
      'localhost',
      '127.0.0.1',
      'sabisell.vercel.app',
      'www.sabisell.vercel.app',
      'sabisell.com',
      'www.sabisell.com'
    ];

    let storeLink = null;

    if (fallbackStoreLink) {
      storeLink = fallbackStoreLink;
    } else if (!mainDomains.includes(hostname)) {
      storeLink = hostname.split('.')[0];
    } else {
      window.location.href = "/"; 
      return;
    }

    const fetchStore = async () => {
      try {
        const response = await api.get(`/storefront/${storeLink}`);
        setStore(response.data.store);
      } catch (err) {
        setError(err.response?.data?.message || "Store not found.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStore();
  }, [fallbackStoreLink]); 

  const handleCopyLink = () => {
    // Generate the full URL dynamically based on the current domain
    navigator.clipboard.writeText(window.location.href.split('?')[0]); // Safer copy
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- FILTERING ---
  const categoriesList = ["All", ...(store?.categories?.map(c => c.name) || [])];
  
  const filteredProducts = store?.products?.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
        <p className="text-sm font-bold text-gray-500">Loading store...</p>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Store Not Found</h1>
        <p className="text-gray-500 max-w-md">{error || "This store link does not exist or has been taken offline."}</p>
      </div>
    );
  }

  const themeStyle = { backgroundColor: store.themeColor || "#044e3b" };
  const textThemeStyle = { color: store.themeColor || "#044e3b" };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      
      {/* 1. HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        {/* Top Info Bar */}
        <div className="hidden lg:block bg-[#f8fafc] border-b border-gray-100 text-gray-500 py-2 text-xs font-medium">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
             <div className="flex items-center gap-6">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified SabiSell Business</span>
                <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-emerald-600" /> Secure Payments</span>
             </div>
             {store.businessAddress && store.showBusinessDetails && (
               <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {store.businessAddress}</span>
               </div>
             )}
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* APPLIED BASEPATH */}
          <Link to={basePath || "/"} className="flex items-center gap-3 shrink-0">
            {store.logoUrl ? (
              <img src={store.logoUrl} alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover shadow-sm border border-gray-100" />
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl text-white flex items-center justify-center font-extrabold text-sm sm:text-lg shadow-inner" style={themeStyle}>
                {store.storeName.substring(0, 2).toUpperCase()}
              </div>
            )}
            <div className="flex flex-col justify-center">
              <h1 className="font-extrabold text-gray-900 text-base sm:text-lg leading-tight tracking-tight truncate max-w-[160px] sm:max-w-xs">{store.storeName}</h1>
              <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider">Official Store</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search for products, categories..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-transparent rounded-full focus:bg-white focus:ring-2 transition-all text-sm font-medium"
                style={{ '--tw-ring-color': store.themeColor }}
              />
            </div>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center gap-3 shrink-0">
            <button className="md:hidden p-2 text-gray-600">
               <Search className="w-5 h-5" />
            </button>
            {/* APPLIED BASEPATH */}
            <Link to={`${basePath}/cart`} className="relative p-2 flex items-center gap-2 group">
              <div className="relative">
                <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 text-gray-800 transition-colors" />
                {cartTotalItems > 0 && (
                  <span 
                    className="absolute -top-1.5 -right-1.5 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm"
                    style={themeStyle}
                  >
                    {cartTotalItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left">
                 <p className="text-[10px] font-bold text-gray-500 uppercase leading-none mb-0.5">Your Cart</p>
                 <p className="text-sm font-bold text-gray-900 leading-none">
                    ₦{cartTotalPrice.toLocaleString()}
                 </p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. PROMO HERO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 w-full animate-in fade-in duration-500">
         <div className="w-full h-40 sm:h-56 lg:h-72 rounded-3xl overflow-hidden relative shadow-md flex items-center" style={themeStyle}>
            <img 
               src={store.bannerImage || "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=1200&q=80"} 
               alt="Promo Background" 
               className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
            />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 px-6 sm:px-12 text-white w-full lg:w-1/2">
               <div className="inline-block px-3 py-1 bg-black/20 backdrop-blur-md text-white text-xs font-bold border border-white/10 rounded-lg mb-4 uppercase tracking-wider">
                  {store.bannerSubtitle || "Fresh Styles Just for You"}
               </div>
               <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-2 drop-shadow-md">
                  {store.bannerTitle || "New Arrivals"} <br className="hidden sm:block" /> {store.bannerTitle ? "" : "Now Available"}
               </h2>
               {(store.bannerDiscount || !store.hasBanner) && (
                 <div className="inline-block px-4 py-1.5 bg-yellow-400 text-yellow-900 text-sm font-extrabold rounded-xl mt-2 shadow-sm uppercase tracking-wider">
                    {store.bannerDiscount || "SHOP THE LATEST"}
                 </div>
               )}
            </div>
         </div>
      </section>

      {/* 3. MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Categories / Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
           <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 hidden sm:block">Popular Products</h3>
           
           <div className="flex overflow-x-auto hide-scrollbar gap-2 sm:gap-3 w-full sm:w-auto pb-2 sm:pb-0">
              {categoriesList.map(category => (
                <button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  style={activeCategory === category ? themeStyle : {}}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    activeCategory === category 
                    ? 'text-white shadow-md scale-105' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
           </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <ShoppingBag className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No products match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => {
              const cartItem = cart.find(i => i.id === product.id);
              const qty = cartItem ? cartItem.cartQuantity : 0;
              const isOutOfStock = product.stockQuantity === 0;

              return (
                <div key={product.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 active:scale-[0.98] transition-all duration-300 flex flex-col group p-1.5 sm:p-2">
                  
                  {/* APPLIED BASEPATH */}
                  <Link to={`${basePath}/product/${product.id}`} className="block relative aspect-[4/5] bg-gray-50/50 rounded-2xl overflow-hidden flex items-center justify-center">
                    {product.imageUrls?.[0] ? (
                      <img 
                        src={product.imageUrls[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                      />
                    ) : (
                      <ShoppingBag className="w-8 h-8 text-gray-300" />
                    )}
                    
                    {/* Stock Badges */}
                    {isOutOfStock ? (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center rounded-2xl">
                        <span className="bg-gray-900 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">Sold Out</span>
                      </div>
                    ) : product.stockQuantity <= 5 ? (
                       <span className="absolute bottom-3 right-3 bg-orange-100 text-orange-800 text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-orange-200 shadow-sm">
                          Only {product.stockQuantity} Left
                       </span>
                    ) : null}
                  </Link>
                  
                  {/* Product Details */}
                  <div className="p-3 sm:p-4 flex flex-col grow">
                    {/* APPLIED BASEPATH */}
                    <Link to={`${basePath}/product/${product.id}`}>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">{product.category !== "General Product" ? product.category : "Product"}</span>
                      <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-tight mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
                        {product.name}
                      </h4>
                    </Link>
                    
                    <div className="flex items-center justify-between mb-4 mt-auto">
                       <div className="flex flex-col">
                         <p className="font-extrabold text-gray-900 text-base sm:text-lg" style={textThemeStyle}>
                           ₦{Number(product.price).toLocaleString()}
                         </p>
                         {product.compareAtPrice && (
                           <span className="text-xs font-bold text-gray-400 line-through">₦{Number(product.compareAtPrice).toLocaleString()}</span>
                         )}
                       </div>
                       
                       {/* In Stock Pill */}
                       {!isOutOfStock && product.stockQuantity > 5 && (
                          <div className="hidden sm:flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-100">
                             <CheckCircle2 className="w-3 h-3" /> In Stock
                          </div>
                       )}
                    </div>
                    
                    {/* Add to Cart Actions */}
                    <div>
                      {qty === 0 ? (
                        <button 
                          onClick={() => addToCart(product)}
                          disabled={isOutOfStock}
                          style={isOutOfStock ? {} : themeStyle}
                          className={`w-full py-2.5 sm:py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                            isOutOfStock ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "text-white shadow-md hover:opacity-90"
                          }`}
                        >
                          <ShoppingBag className="w-4 h-4" /> Add to Cart
                        </button>
                      ) : (
                        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-1.5 border border-gray-200">
                          <button onClick={() => updateQuantity(product.id, qty - 1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:text-red-500 transition-colors">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-extrabold text-gray-900 text-base">{qty}</span>
                          <button 
                            onClick={() => updateQuantity(product.id, qty + 1)} 
                            disabled={qty >= product.stockQuantity}
                            style={qty >= product.stockQuantity ? {} : themeStyle}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg shadow-sm transition-colors ${
                              qty >= product.stockQuantity ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "text-white hover:opacity-90"
                            }`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* 4. FOOTER */}
      <footer className="bg-white border-t border-gray-200 mt-auto pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 mb-12">
              
              {/* Left Column: Store Branding & Contact Actions */}
              <div className="md:col-span-5 lg:col-span-4">
                 <div className="flex items-center gap-3 mb-4">
                    {store.logoUrl ? (
                      <img src={store.logoUrl} alt="Logo" className="w-10 h-10 rounded-xl object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-xl text-white flex items-center justify-center font-extrabold text-lg" style={themeStyle}>
                        {store.storeName.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                       <span className="font-extrabold text-gray-900 text-lg block leading-tight">{store.storeName}</span>
                       <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">About This Store</span>
                    </div>
                 </div>
                 
                 <p className="text-gray-500 text-sm leading-relaxed mb-6 pr-4">
                    {store.storeDescription || "Welcome to our official online store. Shop quality products securely."}
                 </p>
                 
                 <div className="grid grid-cols-2 gap-3 mb-4">
                    {store.whatsapp && (
                      <a href={`https://wa.me/${store.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition-colors text-sm font-bold">
                         <MessageCircle className="w-4 h-4" /> WhatsApp
                      </a>
                    )}
                    {store.phone && (
                      <a href={`tel:${store.phone}`} className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors text-sm font-bold">
                         <Phone className="w-4 h-4" /> Call Us
                      </a>
                    )}
                 </div>
                 {store.instagram && (
                   <a href={store.instagram} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200 transition-colors text-sm font-bold">
                     IG Follow on Instagram
                   </a>
                 )}
              </div>

              {/* Middle Column: Link Copy Box & Trust */}
              <div className="md:col-span-4 lg:col-span-4">
                 <h4 className="font-bold text-gray-900 mb-6">Store Details</h4>
                 
                 <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Share Store Link</label>
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-2.5 border border-gray-200">
                       <div className="flex items-center gap-2 overflow-hidden text-gray-700 px-2">
                          <Lock className="w-4 h-4 shrink-0" style={textThemeStyle} />
                          <span className="text-sm font-medium truncate">{window.location.host}{basePath}</span>
                       </div>
                       <button 
                         onClick={handleCopyLink}
                         className="flex items-center gap-1.5 bg-white text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 hover:bg-gray-50 transition-colors shadow-sm"
                       >
                          {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                          {copied ? "Copied" : "Copy"}
                       </button>
                    </div>
                 </div>

                 <ul className="space-y-4 text-sm font-medium text-gray-600">
                    {store.businessAddress && store.showBusinessDetails && (
                      <li className="flex items-start gap-3">
                         <MapPin className="w-5 h-5 shrink-0" style={textThemeStyle} />
                         <span>{store.businessAddress}</span>
                      </li>
                    )}
                    {store.email && (
                      <li className="flex items-center gap-3">
                         <Mail className="w-5 h-5 shrink-0" style={textThemeStyle} />
                         <span>{store.email}</span>
                      </li>
                    )}
                 </ul>
              </div>

              {/* Right Column: Quick Links */}
              <div className="md:col-span-3 lg:col-span-4">
                 <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
                 <ul className="space-y-4 text-sm font-medium text-gray-600">
                    {/* APPLIED BASEPATH */}
                    <li><Link to={basePath || "/"} className="transition-colors flex items-center gap-2 hover:opacity-80" style={{ hover: textThemeStyle }}><ChevronRight className="w-4 h-4"/> Home</Link></li>
                    <li><Link to={`${basePath}/cart`} className="transition-colors flex items-center gap-2 hover:opacity-80" style={{ hover: textThemeStyle }}><ChevronRight className="w-4 h-4"/> Shopping Cart</Link></li>
                    <li><a href="#" className="transition-colors flex items-center gap-2 hover:opacity-80" style={{ hover: textThemeStyle }}><ChevronRight className="w-4 h-4"/> Return Policy</a></li>
                    <li><a href="#" className="transition-colors flex items-center gap-2 hover:opacity-80" style={{ hover: textThemeStyle }}><ChevronRight className="w-4 h-4"/> Delivery Information</a></li>
                 </ul>
                 
                 {/* Extra Socials */}
                 <div className="flex gap-3 mt-6">
                    {store.facebook && <a href={store.facebook} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100">FB</a>}
                    {store.twitter && <a href={store.twitter} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center hover:bg-gray-200">TW</a>}
                 </div>
              </div>
           </div>

           {/* Bottom Bar with Powered By Badge */}
           <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm font-medium text-center md:text-left">
                 &copy; {new Date().getFullYear()} {store.storeName}. All rights reserved.
              </p>
              
              <div className="flex flex-col items-center sm:items-end">
                 <div className="flex items-center gap-1.5 text-sm mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-gray-500 font-medium">Powered by</span>
                    <a href="https://sabisell.com" target="_blank" rel="noreferrer" className="font-extrabold text-gray-900 tracking-tight hover:text-emerald-600 transition-colors">SabiSell</a>
                 </div>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Trusted by 10,000+ Vendors
                 </p>
              </div>
           </div>
        </div>
      </footer>

    </div>
  );
};

export default Storefront;