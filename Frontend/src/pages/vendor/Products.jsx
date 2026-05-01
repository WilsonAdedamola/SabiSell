import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plus, Search, Edit, Trash2, Loader2, 
  AlertCircle, Star, Package, TrendingUp,
  FolderOpen, Archive, CheckCircle2, XCircle, Lock
} from "lucide-react";
import api from '../../utils/api';
// NEW: Import the Confirm Modal
import ConfirmModal from '../../components/shared/ConfirmModal';
import { ProductsSkeleton } from "../../components/shared/Skeletons";

const Products = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Main Views
  const [activeMainTab, setActiveMainTab] = useState("products"); 
  
  // Product Sub-Tabs
  const [productTab, setProductTab] = useState("all"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  // Category State
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  // --- NEW: Modal State Variables ---
  const [productToDelete, setProductToDelete] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Vendor Plan Logic
  const vendor = JSON.parse(localStorage.getItem('sabisell_vendor') || '{}');
  const currentPlan = vendor.plan || "FREE";
  
  const canViewDrafts = currentPlan === "STARTER" || currentPlan === "GROWTH";
  const categoryLimit = currentPlan === "FREE" ? 0 : currentPlan === "STARTER" ? 5 : 15;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const prodRes = await api.get('/products');
      setProducts(prodRes.data.products || []);

      try {
        const catRes = await api.get('/categories');
        setCategories(catRes.data.categories || []);
      } catch (e) {
        setCategories([
          { id: "1", name: "Fashion & Clothing" },
          { id: "2", name: "Health & Beauty" }
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- PRODUCT LOGIC ---
  const executeProductDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      await api.delete(`/products/${productToDelete.id}`);
      setProducts(products.filter(p => p.id !== productToDelete.id));
      setMessage({ type: "success", text: "Product deleted successfully." });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete product." });
    } finally {
      setIsDeleting(false);
      setProductToDelete(null);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const getProductLimit = (plan) => {
    if (plan === "FREE") return 10;
    if (plan === "STARTER") return 100;
    return "Unlimited";
  };

  const productLimit = getProductLimit(currentPlan);
  const isLimitReached = productLimit !== "Unlimited" && products.length >= productLimit;
  const usagePercentage = productLimit !== "Unlimited" ? Math.min(100, (products.length / productLimit) * 100) : 0;

  let filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  if (productTab === "all") {
    filteredProducts = filteredProducts.filter(p => p.status !== 'DRAFT');
  } else if (productTab === "in_stock") {
    filteredProducts = filteredProducts.filter(p => p.stockQuantity > 5 && p.status !== 'DRAFT');
  } else if (productTab === "low_stock") {
    filteredProducts = filteredProducts.filter(p => p.stockQuantity > 0 && p.stockQuantity <= 5 && p.status !== 'DRAFT');
  } else if (productTab === "out_of_stock") {
    filteredProducts = filteredProducts.filter(p => p.stockQuantity === 0 && p.status !== 'DRAFT');
  } else if (productTab === "drafts") {
    filteredProducts = filteredProducts.filter(p => p.status === 'DRAFT');
  }

  // --- CATEGORY LOGIC ---
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    const newCat = { id: Date.now().toString(), name: newCategoryName };
    setCategories([...categories, newCat]);
    setNewCategoryName("");
    setMessage({ type: "success", text: "Category added!" });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory.name.trim()) return;
    setCategories(categories.map(c => c.id === editingCategory.id ? editingCategory : c));
    setEditingCategory(null);
    setMessage({ type: "success", text: "Category updated!" });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const executeCategoryDelete = async () => {
    if (!categoryToDelete) return;
    setIsDeleting(true);
    try {
      // Simulate API delay
      await new Promise(res => setTimeout(res, 500));
      setCategories(categories.filter(c => c.id !== categoryToDelete.id));
      setMessage({ type: "success", text: "Category deleted successfully." });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete category." });
    } finally {
      setIsDeleting(false);
      setCategoryToDelete(null);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50/50 pb-24 relative">
      
      {/* ------------------------------------------------------------------------ */}
      {/* MODALS */}
      {/* ------------------------------------------------------------------------ */}
      <ConfirmModal 
        isOpen={Boolean(productToDelete)}
        onClose={() => setProductToDelete(null)}
        onConfirm={executeProductDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete Product"
        isLoading={isDeleting}
      />

      <ConfirmModal 
        isOpen={Boolean(categoryToDelete)}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={executeCategoryDelete}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"? Products in this category will not be deleted, but they will lose their category tag.`}
        confirmText="Delete Category"
        isLoading={isDeleting}
      />


      <div className="max-w-6xl mx-auto">
        {/* Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Products & Categories</h1>
            <p className="text-sm font-medium text-gray-500 mb-6">
              Manage your store inventory, drafts, and collections.
            </p>
            
            {activeMainTab === "products" && (
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
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isLimitReached ? (
              <Link to="/dashboard/billing" className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2">
                <Star className="w-5 h-5 fill-white" /> Upgrade
              </Link>
            ) : (
              <Link to="/dashboard/products/new" className="bg-[#044e3b] hover:bg-[#033c2d] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2">
                <Plus className="w-5 h-5" /> Add Product
              </Link>
            )}
          </div>
        </div>

        {isLimitReached && activeMainTab === "products" && (
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

        {message.text && (
          <div className={`mb-6 p-4 rounded-2xl flex items-start gap-3 ${message.type === 'error' ? 'bg-red-50 border border-red-200 text-red-800' : 'bg-emerald-50 border border-emerald-200 text-emerald-800'}`}>
            {message.type === 'error' ? <XCircle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
            <p className="text-sm font-bold">{message.text}</p>
          </div>
        )}

        <div className="flex items-center gap-2 border-b border-gray-200 mb-6">
          <button 
            onClick={() => setActiveMainTab("products")}
            className={`pb-3 px-4 text-sm font-bold transition-colors border-b-2 ${activeMainTab === "products" ? "border-[#044e3b] text-[#044e3b]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          >
            Product Inventory
          </button>
          <button 
            onClick={() => setActiveMainTab("categories")}
            className={`pb-3 px-4 text-sm font-bold transition-colors border-b-2 ${activeMainTab === "categories" ? "border-[#044e3b] text-[#044e3b]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          >
            Categories
          </button>
        </div>

        {isLoading ? (
          <ProductsSkeleton />  
        ) : (
          <>
            {/* ===================================== */}
            {/* VIEW 1: PRODUCTS INVENTORY            */}
            {/* ===================================== */}
            {activeMainTab === "products" && (
              <div className="animate-in fade-in duration-300">
                
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {["all", "in_stock", "low_stock", "out_of_stock"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setProductTab(tab)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          productTab === tab 
                            ? "bg-gray-900 text-white shadow-sm" 
                            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {tab.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {!canViewDrafts ? (
                      <Link to="/dashboard/billing" className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100 hover:bg-purple-100 flex items-center gap-2 transition-colors group">
                        <Lock className="w-3.5 h-3.5 text-purple-400 group-hover:text-purple-600" /> View Drafts (Locked)
                      </Link>
                    ) : (
                      <button
                        onClick={() => setProductTab("drafts")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                          productTab === "drafts" 
                            ? "bg-purple-600 text-white shadow-sm border border-purple-600" 
                            : "bg-white text-purple-700 border border-purple-200 hover:bg-purple-50"
                        }`}
                      >
                        <Archive className="w-3.5 h-3.5" /> 
                        {productTab === "drafts" ? "Exit Drafts" : "View Drafts"}
                      </button>
                    )}
                  </div>
                </div>

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

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-[2rem] border border-gray-200 shadow-sm">
                    {productTab === "drafts" ? (
                      <Archive className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    ) : (
                      <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    )}
                    <p className="text-gray-500 font-medium">
                      {productTab === "drafts" ? "You have no saved drafts." : "No products found matching this filter."}
                    </p>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                    
                    {/* 📱 MOBILE VIEW */}
                    <div className="flex flex-col sm:hidden divide-y divide-gray-100">
                      {filteredProducts.map(product => (
                        <div key={product.id} className="p-4 flex flex-col gap-4">
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
                            
                            <div className="flex items-center gap-1 shrink-0">
                              <Link to={`/dashboard/products/edit/${product.id}`} className="p-2 text-gray-400 hover:text-[#044e3b] bg-gray-50 hover:bg-emerald-50 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </Link>
                              {/* Trigger Modal Instead of window.confirm */}
                              <button onClick={() => setProductToDelete(product)} className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-gray-400 uppercase">Stock</span>
                              <span className="text-xs font-bold text-gray-900">{product.stockQuantity} Units</span>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase ${
                              product.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 
                              product.status === 'DRAFT' ? 'bg-purple-100 text-purple-800' : 'bg-gray-200 text-gray-800'
                            }`}>
                              {product.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 💻 DESKTOP VIEW */}
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
                                  product.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 
                                  product.status === 'DRAFT' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {product.status}
                                </span>
                              </td>
                              <td className="p-4 pr-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Link to={`/dashboard/products/edit/${product.id}`} className="p-2 text-gray-400 hover:text-[#044e3b] hover:bg-emerald-50 rounded-lg transition-colors">
                                    <Edit className="w-4 h-4" />
                                  </Link>
                                  {/* Trigger Modal */}
                                  <button onClick={() => setProductToDelete(product)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
            )}


            {/* ===================================== */}
            {/* VIEW 2: CATEGORY MANAGER              */}
            {/* ===================================== */}
            {activeMainTab === "categories" && (
              <div className="animate-in fade-in duration-300 max-w-full">
                
                {categoryLimit === 0 ? (
                  <div className="bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-8 rounded-[2rem] border border-gray-200 shadow-sm mb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 border border-blue-200 shadow-sm">
                      <FolderOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-extrabold text-gray-900 mb-2">Create Custom Categories</h4>
                    <p className="text-sm font-medium text-gray-600 mb-6 max-w-md">
                      Group your products into collections (like "Men's Wear" or "Summer Sale") to make shopping easier for your customers.
                    </p>
                    <Link to="/dashboard/billing" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 hover:scale-105">
                      <Star className="w-4 h-4 fill-white" /> Upgrade to Starter
                    </Link>
                  </div>
                ) : (
                  <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-200 shadow-sm mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-extrabold text-gray-900">Add New Category</h3>
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                        {categories.length} / {categoryLimit} Allowed
                      </span>
                    </div>
                    
                    <form onSubmit={handleAddCategory} className="flex gap-3">
                      <input 
                        type="text" 
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="e.g. Summer Collection" 
                        disabled={categories.length >= categoryLimit}
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#044e3b]/20 focus:border-[#044e3b] font-bold text-gray-900 disabled:opacity-50"
                      />
                      <button 
                        type="submit"
                        disabled={!newCategoryName.trim() || categories.length >= categoryLimit}
                        className="bg-[#044e3b] hover:bg-[#033c2d] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-bold transition-all shadow-sm shrink-0"
                      >
                        Create
                      </button>
                    </form>
                    {categories.length >= categoryLimit && (
                      <p className="text-xs font-bold text-red-500 mt-2">You have reached your category limit for the {currentPlan} plan.</p>
                    )}
                  </div>
                )}

                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
                  <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-extrabold text-gray-900">Your Categories</h3>
                  </div>

                  {categories.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 font-medium text-sm">
                      No categories created yet.
                    </div>
                  ) : (
                    categories.map(category => (
                      <div key={category.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        {editingCategory?.id === category.id ? (
                          <div className="flex-1 flex items-center gap-3 mr-4">
                            <input 
                              type="text" 
                              value={editingCategory.name}
                              onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#044e3b] font-bold text-sm"
                              autoFocus
                            />
                            <button onClick={handleUpdateCategory} className="text-emerald-600 hover:text-emerald-700 bg-emerald-50 p-2 rounded-lg font-bold text-xs">Save</button>
                            <button onClick={() => setEditingCategory(null)} className="text-gray-500 hover:text-gray-700 bg-gray-100 p-2 rounded-lg font-bold text-xs">Cancel</button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                              <FolderOpen className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="font-bold text-gray-900">{category.name}</span>
                          </div>
                        )}

                        {editingCategory?.id !== category.id && (
                          <div className="flex items-center gap-2 shrink-0">
                            <button onClick={() => setEditingCategory(category)} className="p-2 text-gray-400 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            {/* Trigger Category Modal */}
                            <button onClick={() => setCategoryToDelete(category)} className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;