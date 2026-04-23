import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Plus, Search, SlidersHorizontal, MoreVertical, 
  ChevronLeft, ChevronRight, ShoppingBag, Box, AlertTriangle,
  Loader2, AlertCircle, Image as ImageIcon, ImageOff, Edit, Trash2
} from "lucide-react";
import api from '../../utils/api';
import Toast from '../../components/shared/Toast'; 
import ConfirmModal from '../../components/shared/ConfirmModal'
import { ProductListSkeleton } from '../../components/shared/Skeletons'

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // STATE
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Toast State
  const [toast, setToast] = useState(null);

  // 2. DELETE MODAL STATE
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Filter & Sort State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Products");
  const [sortOption, setSortOption] = useState("Newest First");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // CATCH ROUTER TOAST MESSAGES
  useEffect(() => {
    if (location.state?.toastMessage) {
      setToast({
        message: location.state.toastMessage,
        type: location.state.toastType
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // FETCH DATA
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data.products);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load products.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 3. UPDATED DELETE LOGIC
  // Triggers when the trash icon is clicked
  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setIsDeleteModalOpen(true);
  };

  // Triggers when "Yes, Delete" is clicked inside the modal
  const confirmDelete = async () => {
    if (!productToDelete) return;
    
    setIsDeleting(true);
    try {
      await api.delete(`/products/${productToDelete}`);
      
      // Remove from UI
      setProducts(products.filter(p => p.id !== productToDelete));
      
      // Close modal and show success toast
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
      setToast({ message: "Product deleted successfully!", type: "success" });
      
    } catch (err) {
      setIsDeleteModalOpen(false);
      setToast({ message: err.response?.data?.message || "Failed to delete product.", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  // HELPER FUNCTIONS
  const getStockStatus = (stock) => {
    if (stock <= 0) return "Out of Stock";
    if (stock <= 5) return "Low Stock";
    return "In Stock";
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "In Stock": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Low Stock": return "bg-orange-50 text-orange-700 border-orange-200";
      case "Out of Stock": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // FILTER & SORT LOGIC
  let filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const status = getStockStatus(product.stockQuantity);
    const matchesTab = activeTab === "All Products" || status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  filteredProducts = filteredProducts.sort((a, b) => {
    if (sortOption === "Newest First") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOption === "Oldest First") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortOption === "Price: High to Low") return parseFloat(b.price) - parseFloat(a.price);
    if (sortOption === "Price: Low to High") return parseFloat(a.price) - parseFloat(b.price);
    return 0;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab, sortOption]);

  const tabs = [
    { name: "All Products", count: products.length, color: "bg-sabi-primary text-white" },
    { name: "In Stock", count: products.filter(p => getStockStatus(p.stockQuantity) === "In Stock").length, color: "bg-emerald-50 text-emerald-700" },
    { name: "Low Stock", count: products.filter(p => getStockStatus(p.stockQuantity) === "Low Stock").length, color: "bg-orange-50 text-orange-700" },
    { name: "Out of Stock", count: products.filter(p => getStockStatus(p.stockQuantity) === "Out of Stock").length, color: "bg-red-50 text-red-700" },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full relative">
      
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* 4. RENDER THE CONFIRM MODAL */}
      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Delete Product?"
        message="Are you sure you want to delete this product? This action cannot be undone and it will be permanently removed from your store."
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />

      <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Products</h1>
            <p className="text-sm font-medium text-gray-500 mt-1">Manage your inventory, pricing, and stock.</p>
          </div>
          <Link to="/dashboard/products/new" className="hidden sm:flex items-center gap-2 bg-sabi-primary hover:bg-sabi-primaryDark text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-sm">
            <Plus className="w-5 h-5" /> Add Product
          </Link>
        </div>

        {/* ERROR STATE */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        {/* SEARCH & FILTER */}
        <div className="flex gap-3">
          <div className="relative grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary font-medium text-gray-900"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors shrink-0">
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        {/* TABS */}
        <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map((tab) => (
            <button 
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm shrink-0 transition-colors border ${
                activeTab === tab.name ? 'bg-sabi-primary text-white border-sabi-primary' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {tab.name}
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.name ? 'bg-emerald-600 text-white' : tab.color}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* PRODUCTS LIST */}
        <div className="bg-white border border-gray-200 rounded-4xl overflow-hidden shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h3 className="font-bold text-gray-900">{filteredProducts.length} Products</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500 hidden sm:inline">Sort by:</span>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent font-bold text-sm text-gray-900 focus:outline-none cursor-pointer"
              >
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Price: High to Low</option>
                <option>Price: Low to High</option>
              </select>
            </div>
          </div>

          <div className="divide-y divide-gray-100 min-h-75">
            {isLoading ? (
              <ProductListSkeleton />
            ) : currentProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-16 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                  <Box className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-gray-900 font-extrabold text-lg mb-1">No products found</h3>
                <p className="text-gray-500 font-medium text-sm mb-6">
                  {searchQuery ? "No items matched your search criteria." : "You haven't added any products in this category yet."}
                </p>
                {!searchQuery && activeTab === "All Products" && (
                  <Link to="/dashboard/products/new" className="inline-flex items-center gap-2 bg-[#044e3b] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-sabi-primaryDark transition-colors text-sm">
                    <Plus className="w-4 h-4" /> Add First Product
                  </Link>
                )}
              </div>
            ) : (
              currentProducts.map((product) => {
                const stockStatus = getStockStatus(product.stockQuantity);
                return (
                  <div key={product.id} className="p-4 sm:p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors group">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-xl flex items-center justify-center shrink-0 border border-gray-200 overflow-hidden">
                      {product.imageUrls && product.imageUrls.length > 0 ? (
                        <img src={product.imageUrls[0]} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <ImageOff className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="grow min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate pr-4 cursor-pointer hover:text-sabi-primary">{product.name}</h4>
                        <span className="font-extrabold text-gray-900 text-sm sm:text-base shrink-0">₦{parseFloat(product.price).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusColor(stockStatus)}`}>
                          {stockStatus}
                        </span>
                        <span className="text-xs font-medium text-gray-500">Stock: {product.stockQuantity}</span>
                      </div>
                      <p className="text-xs font-medium text-gray-400 truncate">
                        {product.category} <span className="mx-1">•</span> Added {formatDate(product.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                      <Link 
                        to={`/dashboard/products/edit/${product.id}`} 
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      
                      {/* MODAL CALL */}
                      <button 
                        onClick={() => handleDeleteClick(product.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* PAGINATION */}
          {!isLoading && filteredProducts.length > itemsPerPage && (
            <div className="p-4 sm:p-6 border-t border-gray-100 flex items-center justify-center gap-2 bg-gray-50/50">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button 
                  key={idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center transition-colors ${
                    currentPage === idx + 1 
                      ? 'bg-sabi-primary text-white shadow-sm' 
                      : 'border border-gray-200 text-gray-600 hover:bg-white hover:text-gray-900'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Products;