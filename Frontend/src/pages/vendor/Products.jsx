import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plus, Search, Edit, Trash2, Loader2, 
  AlertCircle, Star, Package, TrendingUp 
} from "lucide-react";
import api from '../../utils/api';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Get vendor plan from local storage
  const vendor = JSON.parse(localStorage.getItem('sabisell_vendor') || '{}');
  const currentPlan = vendor.plan || "FREE";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        alert("Failed to delete product.");
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- LIMIT ENFORCEMENT & TRACKING LOGIC ---
  const getProductLimit = (plan) => {
    if (plan === "FREE") return 10;
    if (plan === "STARTER") return 100;
    return "Unlimited";
  };

  const productLimit = getProductLimit(currentPlan);
  const isLimitReached = productLimit !== "Unlimited" && products.length >= productLimit;
  
  // Calculate percentage for the progress bar (max 100%)
  const usagePercentage = productLimit !== "Unlimited" 
    ? Math.min(100, (products.length / productLimit) * 100) 
    : 0;

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50/50 pb-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Products</h1>
            <p className="text-sm font-medium text-gray-500 mb-6">
              Manage your store inventory and product catalog.
            </p>
            
            {/* PLAN USAGE TRACKER */}
            <div className="max-w-sm bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <span className="text-gray-600 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#044e3b]" /> 
                  {currentPlan} Plan Usage
                </span>
                <span className={isLimitReached ? "text-red-500" : "text-gray-900"}>
                  {products.length} / {productLimit} Products
                </span>
              </div>
              
              {productLimit !== "Unlimited" ? (
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${isLimitReached ? 'bg-red-500' : 'bg-[#044e3b]'}`}
                    style={{ width: `${usagePercentage}%` }}
                  ></div>
                </div>
              ) : (
                <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-full"></div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isLimitReached ? (
              <Link 
                to="/dashboard/billing"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Star className="w-5 h-5 fill-white" /> Upgrade
              </Link>
            ) : (
              <Link 
                to="/dashboard/products/new"
                className="bg-[#044e3b] hover:bg-[#033c2d] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> Add Product
              </Link>
            )}
          </div>
        </div>

        {/* Limit Warning Banner */}
        {isLimitReached && (
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-yellow-800">Product Limit Reached</h4>
              <p className="text-sm font-medium text-yellow-700 mt-1">
                You have reached the {productLimit}-product limit on your current {currentPlan} plan. Upgrade your plan to unlock more slots and grow your catalog.
              </p>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm mb-6 flex items-center">
          <div className="pl-3 pr-2"><Search className="w-5 h-5 text-gray-400" /></div>
          <input 
            type="text" 
            placeholder="Search products by name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 bg-transparent focus:outline-none text-sm font-medium text-gray-900"
          />
        </div>

        {/* Product List Container */}
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#044e3b]" /></div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No products found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            
            {/* 📱 MOBILE VIEW: Stacked Cards (Hidden on sm and larger) */}
            <div className="flex flex-col sm:hidden divide-y divide-gray-100">
              {filteredProducts.map(product => (
                <div key={product.id} className="p-4 flex flex-col gap-4">
                  {/* Top Row: Image, Info, and Actions */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                        {product.imageUrls?.[0] ? (
                          <img src={product.imageUrls[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-6 h-6 text-gray-400 m-auto mt-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 line-clamp-1">{product.name}</p>
                        <p className="text-xs font-medium text-gray-500">{product.category}</p>
                        <p className="text-sm font-extrabold text-[#044e3b] mt-0.5">₦{product.price.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      <Link to={`/dashboard/products/edit/${product.id}`} className="p-2 text-gray-400 hover:text-[#044e3b] bg-gray-50 hover:bg-emerald-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Row: Status and Stock */}
                  <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Stock</span>
                      <span className="text-xs font-bold text-gray-900">{product.stockQuantity} Units</span>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase ${
                      product.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-800'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 💻 DESKTOP VIEW: Data Table (Hidden on mobile) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-bold">
                    <th className="p-4 pl-6">Product</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                            {product.imageUrls?.[0] ? (
                              <img src={product.imageUrls[0]} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <Package className="w-6 h-6 text-gray-400 m-auto mt-3" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{product.name}</p>
                            <p className="text-xs font-medium text-gray-500">{product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-bold text-gray-900">₦{product.price.toLocaleString()}</td>
                      <td className="p-4 text-sm font-medium text-gray-600">{product.stockQuantity}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase ${
                          product.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/dashboard/products/edit/${product.id}`} className="p-2 text-gray-400 hover:text-[#044e3b] hover:bg-emerald-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Products;