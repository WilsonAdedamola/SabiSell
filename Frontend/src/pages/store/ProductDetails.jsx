import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  ArrowLeft,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  ChevronRight,
  Check,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import api from "../../utils/api";
import { ProductDetailsSkeleton } from "../../components/shared/Skeletons";
import ProductNotFound from "./ProductNotFound";

const ProductDetails = () => {
  const { fallbackStoreLink, productId, id } = useParams();
  const navigate = useNavigate();

  const targetId = productId || id;
  const basePath = fallbackStoreLink ? `/store/${fallbackStoreLink}` : "";
  const { addToCart, cartTotalItems } = useCart();

  const [store, setStore] = useState(null);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // User Selection State
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Fetch Store and Product Data
  useEffect(() => {
    const fetchProductAndStore = async () => {
      if (!targetId) {
        setIsLoading(false);
        return;
      }

      try {
        const hostname = window.location.hostname;
        const mainDomains = [
          "localhost",
          "127.0.0.1",
          "sabisell.vercel.app",
          "www.sabisell.vercel.app",
          "sabisell.com",
          "www.sabisell.com",
        ];
        let storeLink =
          fallbackStoreLink ||
          (!mainDomains.includes(hostname) ? hostname.split(".")[0] : null);

        if (storeLink) {
          const res = await api.get(`/storefront/${storeLink}`);
          const storeData = res.data.store;
          setStore(storeData);

          const foundProduct = storeData.products?.find(
            (p) =>
              String(p.id) === String(targetId) ||
              String(p._id) === String(targetId),
          );

          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            setProduct(null);
          }
        }
      } catch (error) {
        console.error("Error fetching product details", error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductAndStore();
  }, [fallbackStoreLink, targetId]);

  const handleAddToCart = () => {
    if (!product || product.stockQuantity < 1) return;

    const itemToAdd = {
      ...product,
      cartQuantity: quantity,
    };

    addToCart(itemToAdd);

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  const themeStyle = { backgroundColor: store?.themeColor || "#0A3224" };
  const textThemeStyle = { color: store?.themeColor || "#0A3224" };
  const borderThemeStyle = { borderColor: store?.themeColor || "#0A3224" };

  const isOutOfStock = product.stockQuantity < 1;

  return (
    <div className="min-h-screen bg-[#FDFDFB] font-sans pb-16">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 pt-4 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link to={basePath || "/"} className="flex items-center gap-3">
            {store?.logoUrl ? (
              <img
                src={store.logoUrl}
                alt="Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
              />
            ) : null}
            <h1 className="font-serif text-xl sm:text-2xl tracking-tight text-gray-900 uppercase">
              {store?.storeName || "Store"}
            </h1>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6 text-gray-600">
            <Link
              to={`${basePath}/cart`}
              className="relative p-2 group flex items-center"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 transition-colors group-hover:opacity-70" />
              {cartTotalItems > 0 && (
                <span
                  className="absolute top-0 right-0 text-white text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border-2 border-white"
                  style={themeStyle}
                >
                  {cartTotalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* --- BACK BUTTON --- */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors mb-6 w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Dynamic Breadcrumbs (Category is NOT clickable) */}
        <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-6 sm:mb-8 uppercase tracking-wider overflow-x-auto whitespace-nowrap hide-scrollbar">
          <Link
            to={basePath || "/"}
            className="hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />

          {product.category && (
            <>
              <span className="text-gray-500">{product.category}</span>
              <ChevronRight className="w-3 h-3" />
            </>
          )}

          <span className="text-gray-900 truncate max-w-[200px] sm:max-w-sm">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* LEFT COLUMN: IMAGE GALLERY */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-square bg-[#F5F2ED] rounded-3xl overflow-hidden relative border border-gray-100">
              {product.imageUrls && product.imageUrls.length > 0 ? (
                <img
                  src={product.imageUrls[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover mix-blend-multiply transition-opacity duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300" />
                </div>
              )}

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {isOutOfStock && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Out of Stock
                  </span>
                )}
                {!isOutOfStock && product.stockQuantity < 5 && (
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Low Stock
                  </span>
                )}
              </div>
            </div>

            {product.imageUrls?.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2">
                {product.imageUrls.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-24 sm:w-24 sm:h-28 shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === idx ? "opacity-100 shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
                    style={selectedImage === idx ? borderThemeStyle : {}}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover bg-[#F5F2ED] mix-blend-multiply"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: PRODUCT DETAILS */}
          <div className="lg:col-span-5 flex flex-col lg:py-4">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-4xl font-serif text-gray-900 leading-tight mb-4">
                {product.name}
              </h1>

              <h2 className="text-3xl font-black" style={textThemeStyle}>
                ₦{Number(product.price).toLocaleString()}
              </h2>
            </div>

            <div className="mb-8">
              <p className="text-sm font-medium text-gray-600 leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            <div className="w-full h-px bg-gray-100 mb-8"></div>

            <div className="space-y-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-sm font-bold text-gray-900">Quantity</h4>
                  {!isOutOfStock ? (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      {product.stockQuantity} left in stock
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-100">
                      Out of Stock
                    </span>
                  )}
                </div>
                <div className="flex items-center w-fit border border-gray-200 rounded-full bg-gray-50 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 bg-white rounded-full shadow-sm disabled:opacity-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-base font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stockQuantity, q + 1))
                    }
                    disabled={quantity >= product.stockQuantity}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 bg-white rounded-full shadow-sm disabled:opacity-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {quantity >= product.stockQuantity && !isOutOfStock && (
                  <p className="text-[10px] font-bold text-orange-500 mt-2">
                    Maximum stock reached.
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAdded}
                className="flex-1 py-4 px-6 rounded-2xl text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                style={themeStyle}
              >
                {isOutOfStock ? (
                  "Out of Stock"
                ) : isAdded ? (
                  <>
                    <Check className="w-5 h-5" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" /> Add to Cart — ₦
                    {Number(product.price * quantity).toLocaleString()}
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">
                    Nationwide Delivery
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    We ship to all states in Nigeria.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">
                    Secure Payments
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Powered safely by Paystack.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
