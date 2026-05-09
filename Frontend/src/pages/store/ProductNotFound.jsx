import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import productNotFoundImg from "../../assets/product-not-found.png";
import api from "../../utils/api";

const ProductNotFound = ({ basePath: propBasePath, store: propStore }) => {
  const { fallbackStoreLink } = useParams();
  const [fetchedStore, setFetchedStore] = useState(null);

  // 1. Identify the store link from the URL (handles both subdomains and /store/name paths)
  const hostname = window.location.hostname;
  const mainDomains = ['localhost', '127.0.0.1', 'sabisell.vercel.app', 'www.sabisell.vercel.app', 'sabisell.com', 'www.sabisell.com'];
  const isCustomDomain = !mainDomains.includes(hostname);
  const storeLink = fallbackStoreLink || (isCustomDomain ? hostname.split('.')[0] : null);

  // 2. Automatically compute the base path if it wasn't passed as a prop
  const basePath = propBasePath !== undefined 
    ? propBasePath 
    : (fallbackStoreLink ? `/store/${fallbackStoreLink}` : "");

  // 3. Fetch store data if it wasn't passed as a prop so we can display recommendations
  useEffect(() => {
    if (!propStore && storeLink) {
      api.get(`/storefront/${storeLink}`)
        .then(res => setFetchedStore(res.data.store))
        .catch(err => console.error("Could not fetch store for 404 page", err));
    }
  }, [propStore, storeLink]);

  // Use either the passed prop OR the fetched data
  const store = propStore || fetchedStore;

  // Set up theme and dynamic recommendations
  const themeColor = store?.themeColor || "#0A3224";
  const recommendedProducts = store?.products?.filter(p => p.status === 'ACTIVE').slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-[#FDFDFB] font-sans pb-20">
      
      {/* TOP SECTION: 404 Hero */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-16 sm:pt-20 sm:pb-24 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
        
        {/* Left: 3D Illustration */}
        <div className="w-full max-w-[220px] sm:max-w-[280px] md:max-w-sm shrink-0">
          <img 
            src={productNotFoundImg} 
            alt="Open box with question mark" 
            className="w-full h-auto object-contain drop-shadow-md"
          />
        </div>

        {/* Right: Text & Actions */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-md">
          <h1 className="text-3xl sm:text-4xl font-serif text-gray-900 mb-3">
            Product Not Found
          </h1>
          <p className="text-gray-600 font-medium mb-6 leading-relaxed">
            We can't seem to find the product you're looking for.
          </p>

          {/* Decorative Divider */}
          <div className="w-full max-w-[240px] md:max-w-[200px] h-px bg-gray-200 relative mb-6">
            <div 
              className="absolute top-1/2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 w-10 h-1 rounded-full"
              style={{ backgroundColor: themeColor }}
            ></div>
          </div>

          <p className="text-sm text-gray-500 mb-8 font-medium leading-relaxed">
            It might have been removed, changed or is temporarily unavailable.
          </p>

          <div className="flex w-full justify-center md:justify-start">
            <Link 
              to={basePath || "/"}
              className="w-full sm:w-auto py-3.5 px-8 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 border-2 border-transparent text-center"
              style={{ backgroundColor: themeColor }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Recommendations */}
      {recommendedProducts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 border-t border-gray-100">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 font-serif">
            You might like these
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {recommendedProducts.map((product) => (
              <Link to={`${basePath}/product/${product.id || product._id}`} key={product.id || product._id} className="group relative block">
                <div className="aspect-[4/5] sm:aspect-[3/4] bg-[#F5F2ED] rounded-2xl overflow-hidden mb-3 relative border border-gray-100">
                  {product.imageUrls?.[0] ? (
                    <img 
                      src={product.imageUrls[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate group-hover:opacity-70 transition-opacity">
                  {product.name}
                </h4>
                <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1">
                  ₦{Number(product.price).toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductNotFound;