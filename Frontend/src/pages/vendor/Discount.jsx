import { Tag, Sparkles, ArrowLeft, TicketPercent } from "lucide-react";
import { Link } from "react-router-dom";

const Discounts = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 bg-gray-50/50 h-full relative overflow-hidden">
      
      {/* Subtle Background Decorations */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-200/20 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/20 rounded-full filter blur-3xl opacity-70"></div>

      <div className="max-w-lg w-full bg-white border border-gray-100 rounded-[2.5rem] p-8 sm:p-12 text-center shadow-sm relative z-10">
         
         {/* Feature Icon Container */}
         <div className="mx-auto w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-8 relative border border-emerald-100 shadow-sm rotate-3">
            <TicketPercent className="w-10 h-10 text-[#044e3b] -rotate-3" />
            <div className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 shadow-sm border border-gray-100">
               <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
         </div>

         {/* Text Content */}
         <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
           Discounts & Coupons
         </h1>
         <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed mb-8">
           Get ready to supercharge your sales! We are building powerful tools to help you create custom promo codes, run automatic flash sales, and reward your loyal customers.
         </p>

         {/* Status Badge */}
         <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-full font-bold text-sm text-gray-700 mb-10">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            Feature in Development
         </div>

         {/* Back Button */}
         <div>
            <Link 
              to="/dashboard" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
         </div>
      </div>
    </div>
  );
};

export default Discounts;