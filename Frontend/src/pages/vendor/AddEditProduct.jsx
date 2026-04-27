import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, Camera, X, Tag, AlignLeft, 
  ChevronDown, Check, Loader2, AlertCircle, ImageIcon, Star
} from "lucide-react";
import api from '../../utils/api';
import { AddEditProductSkeleton } from '../../components/shared/Skeletons';

const AddEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const isEditMode = Boolean(id); 
  
  const fileInputRef = useRef(null);
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode); 
  const [error, setError] = useState("");

  // --- PLAN & LIMIT LOGIC ---
  const vendor = JSON.parse(localStorage.getItem('sabisell_vendor') || '{}');
  const currentPlan = vendor.plan || "FREE";
  const maxImages = currentPlan === "GROWTH" ? 5 : currentPlan === "STARTER" ? 3 : 1;

  const [formData, setFormData] = useState({
    name: "",
    category: "Fashion & Clothing",
    description: "",
    price: "",
    compareAtPrice: "",
    stockQuantity: "1"
  });
  
  const [isToggled, setIsToggled] = useState(true); 

  // Image Handling
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]); 

  // --- FETCH EXISTING PRODUCT IF IN EDIT MODE ---
  useEffect(() => {
    if (isEditMode) {
      const fetchProductData = async () => {
        try {
          const response = await api.get(`/products/${id}`);
          const product = response.data.product;

          setFormData({
            name: product.name || "",
            category: product.category || "Fashion & Clothing",
            description: product.description || "",
            price: product.price ? product.price.toString() : "",
            compareAtPrice: product.compareAtPrice ? product.compareAtPrice.toString() : "",
            stockQuantity: product.stockQuantity ? product.stockQuantity.toString() : "0"
          });
          
          setIsToggled(product.status === "ACTIVE");
          
          if (product.imageUrls && product.imageUrls.length > 0) {
            setImagePreviews(product.imageUrls);
            setExistingImages(product.imageUrls); 
          }

        } catch (err) {
          setError("Failed to load product details.");
        } finally {
          setIsFetching(false);
        }
      };

      fetchProductData();
    }
  }, [id, isEditMode]);

  // --- HANDLERS ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Enforce dynamic limit based on plan
    if (imagePreviews.length + files.length > maxImages) {
      setError(`Your ${currentPlan} plan allows a maximum of ${maxImages} images per product.`);
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > 2 * 1024 * 1024) {
        setError(`"${file.name}" is too large. Max size is 2MB.`);
        return false;
      }
      return true;
    });

    setImageFiles(prev => [...prev, ...validFiles]);
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
    if (error) setError("");
  };

  const removeImage = (indexToRemove) => {
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
    
    const isNewImage = indexToRemove >= existingImages.length;
    if (isNewImage) {
      const newFileIndex = indexToRemove - existingImages.length;
      setImageFiles(prev => prev.filter((_, idx) => idx !== newFileIndex));
    } else {
      setExistingImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
    }
  };

  // VALIDATION & NAVIGATION
  const nextStep = () => {
    setError("");
    if (step === 1) {
      if (!formData.name.trim()) return setError("Product name is required.");
      if (imagePreviews.length === 0) return setError("Please have at least one product image.");
    }
    if (step === 2) {
      if (!formData.price || parseFloat(formData.price) <= 0) return setError("Please enter a valid price.");
      if (!formData.stockQuantity || parseInt(formData.stockQuantity) < 0) return setError("Please enter a valid stock quantity.");
    }
    setStep(prev => Math.min(prev + 1, 3));
  };

  // --- API SUBMISSION ---
  const handlePublish = async (forceDraft = false) => {
    setIsLoading(true);
    setError("");

    if (forceDraft && !formData.name.trim()) {
      setError("You must enter a product name before saving a draft.");
      setIsLoading(false);
      return;
    }

    try {
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("category", formData.category);
      dataToSend.append("description", formData.description);
      dataToSend.append("price", formData.price || "0");
      dataToSend.append("stockQuantity", formData.stockQuantity || "0");
      dataToSend.append("status", (forceDraft || !isToggled) ? "DRAFT" : "ACTIVE");
      
      if (formData.compareAtPrice) {
        dataToSend.append("compareAtPrice", formData.compareAtPrice);
      }

      dataToSend.append("existingImages", JSON.stringify(existingImages));

      imageFiles.forEach(file => {
        dataToSend.append("images", file);
      });

      let toastMessage = forceDraft || !isToggled ? "Product saved to drafts!" : "Product published successfully!";

      if (isEditMode) {
        await api.put(`/products/${id}`, dataToSend);
        if (!forceDraft && isToggled) toastMessage = "Product updated successfully!";
      } else {
        await api.post('/products', dataToSend);
      }
      
      navigate('/dashboard/products', { 
        state: { toastMessage, toastType: "success" } 
      });

    } catch (err) {
      if (err.response?.status === 403) {
        setError(err.response.data.message); 
      } else {
        setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'publish'} product. Please try again.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <AddEditProductSkeleton />
  }

  return (
    <div className="flex-1 overflow-y-auto h-full p-4 sm:p-6 lg:p-8 pb-32 lg:pb-20 w-full bg-sabi-surface">
      <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-200 rounded-full transition-colors -ml-2">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-extrabold text-gray-900">
              {isEditMode ? "Edit Product" : "Add Product"}
            </h1>
          </div>
          <button 
            onClick={() => handlePublish(true)} 
            disabled={isLoading}
            className="text-sm font-bold text-sabi-primary hover:text-sabi-primaryDark transition-colors disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Draft"}
          </button>
        </div>

        {/* ERROR DISPLAY */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 animate-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        {/* PROGRESS STEPPER */}
        <div className="flex items-center justify-between relative mb-8 px-4 sm:px-10">
          <div className="absolute left-10 right-10 top-3 h-0.5 bg-gray-200 z-0"></div>
          <div className="absolute left-10 right-1/2 top-3 h-0.5 bg-sabi-primary z-0 transition-all" style={{ right: step === 1 ? '100%' : step === 2 ? '50%' : '10%' }}></div>

          <div className="relative z-10 flex flex-col items-center gap-2 bg-sabi-surface px-2 cursor-pointer" onClick={() => step > 1 && setStep(1)}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${step >= 1 ? 'bg-sabi-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
              {step > 1 ? <Check className="w-3 h-3" /> : 1}
            </div>
            <span className={`text-[10px] font-bold ${step >= 1 ? 'text-sabi-primary' : 'text-gray-400'}`}>Product Info</span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2 bg-sabi-surface px-2 cursor-pointer" onClick={() => step > 2 && setStep(2)}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${step >= 2 ? 'bg-sabi-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
              {step > 2 ? <Check className="w-3 h-3" /> : 2}
            </div>
            <span className={`text-[10px] font-bold ${step >= 2 ? 'text-sabi-primary' : 'text-gray-400'}`}>Pricing & Stock</span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2 bg-sabi-surface px-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${step >= 3 ? 'bg-sabi-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
              3
            </div>
            <span className={`text-[10px] font-bold ${step >= 3 ? 'text-sabi-primary' : 'text-gray-400'}`}>Review</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          
          {/* STEP 1: PRODUCT INFO */}
          {step === 1 && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              
              {/* Images */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Product Images <span className="text-red-500">*</span></h3>
                    <p className="text-xs font-medium text-gray-500 mt-0.5">Add up to {maxImages} clear {maxImages === 1 ? 'photo' : 'photos'}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${imagePreviews.length === maxImages ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'}`}>
                    {imagePreviews.length}/{maxImages}
                  </span>
                </div>
                
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                  {imagePreviews.map((src, index) => (
                    <div key={index} className="relative w-24 h-24 shrink-0 rounded-2xl border border-gray-200 flex items-center justify-center overflow-hidden group bg-gray-50">
                      <img src={src} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                      <button 
                        onClick={() => removeImage(index)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-gray-900/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {/* Upload Button */}
                  {imagePreviews.length < maxImages && (
                    <>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/png, image/jpeg, image/jpg" 
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                      />
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-24 h-24 shrink-0 rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 flex flex-col items-center justify-center gap-1 transition-colors"
                      >
                        <Camera className="w-6 h-6 text-sabi-primary" />
                        <span className="text-[10px] font-bold text-sabi-primary">Add Photo</span>
                      </button>
                    </>
                  )}
                </div>

                {/* UPSELL BANNER: Show if they hit the limit but aren't on Growth */}
                {imagePreviews.length >= maxImages && currentPlan !== "GROWTH" && (
                  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-3">
                      <Star className="w-6 h-6 text-yellow-500 shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-yellow-800">Reach your image limit?</h4>
                        <p className="text-xs font-medium text-yellow-700">
                          {currentPlan === "FREE" ? "Upgrade to Starter to add up to 3 images." : "Upgrade to Growth to add up to 5 images."}
                        </p>
                      </div>
                    </div>
                    <Link to="/dashboard/billing" className="whitespace-nowrap px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-bold rounded-lg transition-colors shadow-sm">
                      Upgrade Plan
                    </Link>
                  </div>
                )}

              </div>

              {/* Product Name */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-2">Product Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <div className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center">
                      <span className="text-xs">🏷️</span>
                    </div>
                  </div>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ankara Print Shirt" 
                    className="w-full pl-14 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-bold text-gray-900" 
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-2">Category <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Tag className="w-5 h-5 text-sabi-primary" />
                  </div>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full pl-12 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-bold text-gray-900 appearance-none"
                  >
                    <option>Fashion & Clothing</option>
                    <option>Electronics & Gadgets</option>
                    <option>Health & Beauty</option>
                    <option>Food & Groceries</option>
                    <option>Home & Furniture</option>
                    <option>Services & Others</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-900 mb-2">Product Description</label>
                <div className="relative">
                  <div className="absolute top-4 left-4 flex items-center pointer-events-none">
                    <AlignLeft className="w-5 h-5 text-sabi-primary" />
                  </div>
                  <textarea 
                    rows="4" 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your product's features, material, and benefits..."
                    className="w-full pl-12 pr-4 py-4 bg-emerald-50/30 border border-emerald-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-700 resize-none"
                  ></textarea>
                </div>
              </div>

              <button onClick={nextStep} className="w-full py-4 bg-sabi-primary hover:bg-sabi-primaryDark text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 text-base">
                Continue to Pricing →
              </button>
            </div>
          )}

          {/* STEP 2: PRICING & STOCK */}
          {step === 2 && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-extrabold text-gray-900 mb-6">Pricing & Stock</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Price (₦) <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="font-extrabold text-gray-500">₦</span>
                    </div>
                    <input 
                      type="number" 
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0" 
                      className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-bold text-gray-900" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Compare at Price <span className="text-gray-400 font-medium">(Optional)</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="font-extrabold text-gray-400">₦</span>
                    </div>
                    <input 
                      type="number" 
                      name="compareAtPrice"
                      value={formData.compareAtPrice}
                      onChange={handleChange}
                      placeholder="0" 
                      className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all font-bold text-gray-500 line-through" 
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-900 mb-2">Stock Quantity <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <div className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center">
                      <span className="text-xs">📦</span>
                    </div>
                  </div>
                  <input 
                    type="number" 
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    min="0"
                    className="w-full pl-14 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-bold text-gray-900" 
                  />
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between mb-8 cursor-pointer" onClick={() => setIsToggled(!isToggled)}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Tag className="w-4 h-4 text-sabi-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Product Status</h4>
                    <p className="text-xs font-medium text-gray-500">{isToggled ? "Active and visible in store" : "Saved as draft, hidden from store"}</p>
                  </div>
                </div>
                {/* Custom Toggle */}
                <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${isToggled ? 'bg-sabi-primary' : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${isToggled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="w-1/3 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold transition-all hover:bg-gray-50">
                  Back
                </button>
                <button onClick={nextStep} className="w-2/3 py-4 bg-sabi-primary hover:bg-sabi-primaryDark text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 text-base">
                  Continue to Review →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW */}
          {step === 3 && (
            <div className="animate-in slide-in-from-right-4 duration-300 text-center py-6">
              
              <div className="w-32 h-32 mx-auto mb-6 relative rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-gray-50 flex items-center justify-center">
                 {imagePreviews.length > 0 ? (
                   <img src={imagePreviews[0]} alt="Product preview" className="w-full h-full object-cover" />
                 ) : (
                   <ImageIcon className="w-10 h-10 text-gray-300" />
                 )}
              </div>

              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                {isEditMode ? "Ready to Update" : "Ready to Publish"}
              </h3>
              <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">
                Your product <strong>"{formData.name}"</strong> looks great and is ready to be {isEditMode ? "updated in" : "added to"} your inventory.
              </p>
              
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} disabled={isLoading} className="w-1/3 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold transition-all hover:bg-gray-50 disabled:opacity-50">
                  Back
                </button>
                <button 
                  onClick={() => handlePublish(false)} 
                  disabled={isLoading} 
                  className="w-2/3 py-4 bg-sabi-primary hover:bg-sabi-primaryDark text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>Processing <Loader2 className="w-5 h-5 animate-spin" /></>
                  ) : (
                    isEditMode ? "Update Product" : "Publish Product"
                  )}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AddEditProduct;