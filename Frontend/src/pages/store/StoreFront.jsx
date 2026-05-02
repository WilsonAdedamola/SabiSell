import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"; 
import { 
  ShoppingBag, Search, Plus, Minus, Copy, Menu, User,
  MapPin, Loader2, ChevronRight, Star, Heart,
  Phone, Mail, MessageCircle, ShieldCheck, Lock, CheckCircle2,
} from "lucide-react";
import IG from '../../assets/social icons/instagram.svg';
import FB from '../../assets/social icons/facebook.svg';
import TT from '../../assets/social icons/tiktok.svg';
import X from '../../assets/social icons/x.svg';
import api from '../../utils/api'; 
import { useCart } from '../../context/CartContext'; 

const Storefront = () => {
  const { fallbackStoreLink } = useParams(); 
  const basePath = fallbackStoreLink ? `/store/${fallbackStoreLink}` : "";

  const [isLoading, setIsLoading] = useState(true);
  const [store, setStore] = useState(null);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [copied, setCopied] = useState(false);
  
  // Mobile Search Toggle State
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);

  const { cart, addToCart, updateQuantity, cartTotalItems, cartTotalPrice } = useCart();

  // --- FETCH STORE & PRODUCTS ---
  useEffect(() => {
    const hostname = window.location.hostname; 
    const mainDomains = ['localhost', '127.0.0.1', 'sabisell.vercel.app', 'www.sabisell.vercel.app', 'sabisell.com', 'www.sabisell.com'];
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

  // --- PREMIUM FEATURES LOGIC ---
  const isPremium = store?.plan === 'starter' || store?.plan === 'growth' || true; 
  
  // Slideshow Auto-play
  useEffect(() => {
    if (!isPremium || !store?.enableSlideshow || !store?.slideshowImages?.length) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % store.slideshowImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [store, isPremium]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href.split('?')[0]); 
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- FILTERING ---
  const categoriesList = ["All", ...(store?.categories?.map(c => c.name) || [])];
  
  const filteredProducts = store?.products?.filter(p => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(searchLower) || (p.category && p.category.toLowerCase().includes(searchLower));
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
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col text-gray-900">
      
      {/* 1. HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
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
                style={{ '--tw-ring-color': store.themeColor || '#044e3b' }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button 
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
               <Search className="w-5 h-5" />
            </button>
            <Link to={`${basePath}/cart`} className="relative p-2 flex items-center gap-2 group">
              <div className="relative">
                <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 text-gray-800 transition-colors group-hover:opacity-70" />
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

        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileSearchOpen ? 'max-h-20 opacity-100 pb-4 px-4' : 'max-h-0 opacity-0 px-4'}`}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search products, categories..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-transparent rounded-full focus:bg-white focus:ring-2 transition-all text-sm font-medium"
                style={{ '--tw-ring-color': store.themeColor || '#044e3b' }}
              />
            </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-6 mb-12 w-full">
        <div className="w-full h-[60vh] sm:h-[70vh] rounded-[2rem] overflow-hidden relative bg-[#EFEFE9] flex items-center shadow-sm">
          
          {isPremium && store.enableSlideshow && store.slideshowImages?.length > 0 ? (
            <>
              {store.slideshowImages.map((imgUrl, index) => (
                <img 
                  key={index}
                  src={imgUrl} 
                  alt={`Slide ${index + 1}`} 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                {store.slideshowImages.map((_, index) => (
                  <button 
                    key={index} 
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "w-5" : "bg-white/50"}`}
                    style={index === currentSlide ? themeStyle : {}}
                  />
                ))}
              </div>
            </>
          ) : (
            <img 
               src={store.bannerImage || "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&q=80"} 
               alt="Hero Banner" 
               className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>

          <div className="relative z-10 px-8 sm:px-16 w-full lg:w-1/2">
             <p className="text-[10px] sm:text-[11px] lg:text-sm font-bold uppercase tracking-[0.15em] mb-4 text-white drop-shadow-md">
               {/* {!store.bannerSubtitle ? "Welcome to Our Store" : store.bannerSubtitle} */}
               {store.bannerSubtitle ? "Welcome to Our Store" : store.bannerSubtitle}
             </p>
             {/* Note the whitespace-pre-line class which enables the \n rendering natively! */}
             <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] mb-8 text-white drop-shadow-lg whitespace-pre-line">
               {store.bannerTitle ? "Discover Quality & Excellence.\nCurated just for you." : store.bannerTitle}
              
                {/* {store.bannerTitle || "Discover Quality & Excellence.\nCurated just for you."} */}
             </h2>
             <div className="flex gap-4">
                <a href="#products" className="px-8 py-3.5 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all" style={themeStyle}>
                  Shop Now
                </a>
             </div>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 w-full">
        
        {/* 3. CIRCULAR CATEGORIES */}
        {categoriesList.length > 1 && (
          <section className="mb-16">
             <div className="flex justify-between items-end mb-6">
               <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif">Categories</h3>
             </div>
             
             <div className="flex overflow-x-auto hide-scrollbar gap-6 sm:gap-10 pb-4 px-2 -mx-2">
                {categoriesList.map((category) => (
                    <button 
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className="flex flex-col items-center gap-3 shrink-0 group"
                    >
                      <div 
                        className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 ${activeCategory === category ? 'ring-2 ring-offset-4' : 'ring-1 ring-gray-200 group-hover:shadow-lg group-hover:-translate-y-1'}`} 
                        style={activeCategory === category ? { '--tw-ring-color': store.themeColor || '#044e3b', backgroundColor: "#F5F2ED" } : { backgroundColor: "#F5F2ED" }}
                      >
                        <span className="font-serif text-2xl text-gray-800 opacity-60">
                           {category === "All" ? "★" : category.charAt(0)}
                        </span>
                      </div>
                      <span className={`text-xs sm:text-sm font-medium transition-colors ${activeCategory === category ? 'font-bold' : 'text-gray-600'}`} style={activeCategory === category ? textThemeStyle : {}}>
                        {category}
                      </span>
                    </button>
                ))}
             </div>
          </section>
        )}

        {/* 4. ALL PRODUCTS GRID */}
        <section id="products" className="mb-16">
           <div className="flex justify-between items-end mb-6">
             <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif">All Products</h3>
           </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <ShoppingBag className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No products match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
              {filteredProducts.map((product) => {
                const cartItem = cart.find(i => i.id === product.id);
                const qty = cartItem ? cartItem.cartQuantity : 0;
                const isOutOfStock = product.stockQuantity === 0;

                return (
                  // Reverted to clean borders without the extra wrapper padding/scaling
                  <div key={product.id} className="flex flex-col group">
                    <div className="relative aspect-[3/4] bg-[#F5F2ED] rounded-2xl overflow-hidden mb-4">
                      <Link to={`${basePath}/product/${product.id}`} className="block w-full h-full">
                        {product.imageUrls?.[0] ? (
                          <img 
                            src={product.imageUrls[0]} 
                            alt={product.name} 
                            className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                             <ShoppingBag className="w-8 h-8" />
                          </div>
                        )}
                        {isOutOfStock && (
                          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center">
                            <span className="bg-black text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-sm rounded-sm">Sold Out</span>
                          </div>
                        )}
                      </Link>
                      
                      <button className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:text-red-500">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <Link to={`${basePath}/product/${product.id}`}>
                      <h4 className="text-sm font-semibold text-gray-900 leading-tight mb-1 hover:opacity-70 transition-opacity truncate">
                        {product.name}
                      </h4>
                    </Link>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-bold text-gray-900 text-sm">
                        ₦{Number(product.price).toLocaleString()}
                      </p>
                      {product.compareAtPrice && (
                        <span className="text-xs text-gray-400 line-through">₦{Number(product.compareAtPrice).toLocaleString()}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                       <div className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
                         <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> 4.8
                       </div>
                       
                       {!isOutOfStock && qty === 0 && (
                          <button 
                            onClick={() => addToCart(product)}
                            className="w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                       )}
                       {!isOutOfStock && qty > 0 && (
                          <div className="flex items-center bg-gray-100 rounded-full p-0.5">
                             <button onClick={() => updateQuantity(product.id, qty - 1)} className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-red-500 transition-colors"><Minus className="w-3 h-3" /></button>
                             <span className="text-xs font-bold w-6 text-center">{qty}</span>
                             <button onClick={() => updateQuantity(product.id, qty + 1)} className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-green-600 transition-colors"><Plus className="w-3 h-3" /></button>
                          </div>
                       )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* 5. SECONDARY PROMO BANNER (Premium Only) */}
        {isPremium && store.enableSecondaryBanner && (
          <section className="mb-16 w-full">
            <div className="w-full rounded-3xl overflow-hidden flex flex-col md:flex-row relative shadow-sm" style={themeStyle}>
              <div className="p-8 sm:p-16 flex-1 flex flex-col justify-center text-white z-10">
                <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.1] mb-4 text-white">
                  {store.secondaryBannerTitle || "Look Good.\nFeel Unstoppable."}
                </h2>
                <p className="text-sm text-white/80 max-w-sm mb-8 leading-relaxed">
                  {store.secondaryBannerDesc || "Explore premium styles made to make you stand out. Handcrafted with precision and care."}
                </p>
                
                <ul className="space-y-4 mb-8 hidden sm:block">
                  <li className="flex items-center gap-3 text-sm text-white/90">
                    <ShieldCheck className="w-5 h-5 text-white/60" /> Premium Fabrics
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-white/60" /> Perfect Fit
                  </li>
                </ul>

                <div>
                  <a href="#products" className="inline-block px-8 py-3 bg-white text-gray-900 text-sm font-bold rounded-full hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    Discover More
                  </a>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={store.secondaryBannerImage || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"} 
                  alt="Promo" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent hidden md:block"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* 6. FOOTER */}
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
                   <a href={`https://www.instagram.com/${store.instagram}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200 transition-colors text-sm font-bold">
                     <img src={IG} alt="instagram" className="w-4 h-4" /> Follow on Instagram
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
                    <li><Link to={basePath || "/"} className="transition-colors flex items-center gap-2 hover:opacity-80" style={{ hover: textThemeStyle }}><ChevronRight className="w-4 h-4"/> Home</Link></li>
                    <li><Link to={`${basePath}/cart`} className="transition-colors flex items-center gap-2 hover:opacity-80" style={{ hover: textThemeStyle }}><ChevronRight className="w-4 h-4"/> Shopping Cart</Link></li>
                    <li><a href="#" className="transition-colors flex items-center gap-2 hover:opacity-80" style={{ hover: textThemeStyle }}><ChevronRight className="w-4 h-4"/> Return Policy</a></li>
                    <li><a href="#" className="transition-colors flex items-center gap-2 hover:opacity-80" style={{ hover: textThemeStyle }}><ChevronRight className="w-4 h-4"/> Delivery Information</a></li>
                 </ul>
                 
                 {/* Extra Socials */}
                 <div className="flex gap-3 mt-6">
                    {store.facebook && <a href={`https://www.facebook.com/${store.facebook}`} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"><img src={FB} alt="facebook" className="w-4 h-4" /></a>}
                    {store.twitter && <a href={`https://twitter.com/${store.twitter}`} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center hover:bg-gray-200"><img src={X} alt="X" className="w-4 h-4" /></a>}
                     {store.tiktok && <a href={`https://tiktok.com/${store.tiktok}`} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center hover:bg-gray-200"><img src={TT} alt="TikTok" className="w-4 h-4" /></a>}
                      {store.snapchat && <a href={`https://snapchat.com/${store.snapchat}`} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center hover:bg-gray-200"><img src={X} alt="X" className="w-4 h-4" /></a>}
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