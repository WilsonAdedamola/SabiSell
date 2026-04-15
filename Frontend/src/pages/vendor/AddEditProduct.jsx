import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Camera, X, Tag, AlignLeft, 
  ChevronDown, Check
} from "lucide-react";

const AddEditProduct = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([1, 2]); // Dummy images array for visual representation
  const [isToggled, setIsToggled] = useState(true); // Product status toggle

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300 pb-10">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-extrabold text-gray-900">Add Product</h1>
        <button className="text-sm font-bold text-sabi-primary hover:text-sabi-primaryDark transition-colors">
          Save Draft
        </button>
      </div>

      {/* PROGRESS STEPPER */}
      <div className="flex items-center justify-between relative mb-8 px-4 sm:px-10">
        <div className="absolute left-10 right-10 top-3 h-0.5 bg-gray-200 z-0"></div>
        <div className="absolute left-10 right-1/2 top-3 h-0.5 bg-sabi-primary z-0 transition-all"></div>

        {/* Step 1 */}
        <div className="relative z-10 flex flex-col items-center gap-2 bg-[#f9fafb] px-2 cursor-pointer" onClick={() => setStep(1)}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${step >= 1 ? 'bg-sabi-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
            {step > 1 ? <Check className="w-3 h-3" /> : 1}
          </div>
          <span className={`text-[10px] font-bold ${step >= 1 ? 'text-sabi-primary' : 'text-gray-400'}`}>Product Info</span>
        </div>

        {/* Step 2 */}
        <div className="relative z-10 flex flex-col items-center gap-2 bg-[#f9fafb] px-2 cursor-pointer" onClick={() => setStep(2)}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${step >= 2 ? 'bg-sabi-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
            {step > 2 ? <Check className="w-3 h-3" /> : 2}
          </div>
          <span className={`text-[10px] font-bold ${step >= 2 ? 'text-sabi-primary' : 'text-gray-400'}`}>Pricing & Stock</span>
        </div>

        {/* Step 3 */}
        <div className="relative z-10 flex flex-col items-center gap-2 bg-[#f9fafb] px-2 cursor-pointer" onClick={() => setStep(3)}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${step >= 3 ? 'bg-sabi-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
            3
          </div>
          <span className={`text-[10px] font-bold ${step >= 3 ? 'text-sabi-primary' : 'text-gray-400'}`}>Review</span>
        </div>
      </div>

      <div className="bg-white rounded-4xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        
        {/* ================= STEP 1: PRODUCT INFO ================= */}
        {step === 1 && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            {/* Images */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Product Images <span className="text-red-500">*</span></h3>
                  <p className="text-xs font-medium text-gray-500 mt-0.5">Add up to 5 clear photos</p>
                </div>
                <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">1/5</span>
              </div>
              
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                {/* Dummy Uploaded Images */}
                <div className="relative w-24 h-24 shrink-0 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center overflow-hidden group">
                  <div className="text-4xl">👕</div>
                  <button className="absolute top-1.5 right-1.5 w-5 h-5 bg-gray-900/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <div className="relative w-24 h-24 shrink-0 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center overflow-hidden group">
                  <div className="text-4xl">👔</div>
                  <button className="absolute top-1.5 right-1.5 w-5 h-5 bg-gray-900/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-3 h-3" />
                  </button>
                </div>

                {/* Upload Button */}
                <button className="w-24 h-24 shrink-0 rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 flex flex-col items-center justify-center gap-1 transition-colors">
                  <Camera className="w-6 h-6 text-sabi-primary" />
                  <span className="text-[10px] font-bold text-sabi-primary">Add Photo</span>
                </button>
              </div>
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
                <input type="text" defaultValue="Ankara Print Shirt" className="w-full pl-14 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-bold text-gray-900" />
              </div>
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-2">Category <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Tag className="w-5 h-5 text-sabi-primary" />
                </div>
                <select className="w-full pl-12 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-bold text-gray-900 appearance-none">
                  <option>Fashion & Clothing</option>
                  <option>Electronics</option>
                  <option>Health & Beauty</option>
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
                  defaultValue="Beautiful African print shirt made with high-quality Ankara fabric. Perfect for casual and native wear."
                  className="w-full pl-12 pr-4 py-4 bg-emerald-50/30 border border-emerald-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-medium text-gray-700 resize-none"
                ></textarea>
                <div className="absolute bottom-3 right-4 text-xs font-bold text-gray-400">
                  120/500
                </div>
              </div>
            </div>

            <button onClick={() => setStep(2)} className="w-full py-4 bg-sabi-primary hover:bg-sabi-primaryDark text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 text-base">
              Continue to Pricing →
            </button>
          </div>
        )}

        {/* ================= STEP 2: PRICING & STOCK ================= */}
        {step === 2 && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-extrabold text-gray-900 mb-6">Pricing & Stock</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Price (₦) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="font-extrabold text-gray-500">₦</span>
                  </div>
                  <input type="number" defaultValue="15000" className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-bold text-gray-900" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Compare at Price <span className="text-gray-400 font-medium">(Optional)</span></label>
                <input type="number" defaultValue="18000" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all font-bold text-gray-500 line-through" />
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
                <input type="number" defaultValue="8" className="w-full pl-14 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sabi-primary/20 focus:border-sabi-primary transition-all font-bold text-gray-900" />
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between mb-8 cursor-pointer" onClick={() => setIsToggled(!isToggled)}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Tag className="w-4 h-4 text-sabi-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Product Status</h4>
                  <p className="text-xs font-medium text-gray-500">Show this product in your store</p>
                </div>
              </div>
              {/* Custom Toggle */}
              <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${isToggled ? 'bg-sabi-primary' : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${isToggled ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </div>

            <button onClick={() => setStep(3)} className="w-full py-4 bg-sabi-primary hover:bg-sabi-primaryDark text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 text-base">
              Continue to Review →
            </button>
          </div>
        )}

        {/* ================= STEP 3: REVIEW (Extrapolated) ================= */}
        {step === 3 && (
          <div className="animate-in slide-in-from-right-4 duration-300 text-center py-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-sabi-primary" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Ready to Publish</h3>
            <p className="text-gray-500 text-sm mb-8">Your product "Ankara Print Shirt" looks great and is ready to go live on your store.</p>
            
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="w-1/3 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold transition-all hover:bg-gray-50">
                Back
              </button>
              <Link to="/dashboard/products" className="w-2/3 py-4 bg-sabi-primary hover:bg-sabi-primaryDark text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 text-base">
                Publish Product
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AddEditProduct;