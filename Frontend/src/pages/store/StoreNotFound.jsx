import { Link } from "react-router-dom";
import storeNotFoundImg from "../../assets/store-not-found.png";
const StoreNotFound = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFB] font-sans flex items-center justify-center p-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-24">
        
        {/* LEFT / TOP: 3D Illustration */}
        <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-md shrink-0">
          {/* 
            Replace this placeholder image src with the actual exported 3D asset from your design. 
            The drop-shadow helps ground it nicely against the background.
          */}
          <img 
            src={storeNotFoundImg} 
            alt="Store Not Found" 
            className="w-full h-auto object-contain drop-shadow-sm"
          />
        </div>

        {/* RIGHT / BOTTOM: Text & Call to Action */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-md">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-gray-900 mb-2 leading-tight">
            Oops!
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gray-900 mb-4 leading-snug">
            This store can't be found.
          </h2>
          
          <p className="text-base text-gray-500 mb-8 font-medium max-w-xs md:max-w-none leading-relaxed">
            The store you're looking for doesn't exist or may have been removed.
          </p>

          <Link 
            to="/"
            className="w-full sm:w-auto px-10 py-4 bg-[#0A3224] hover:bg-[#072419] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center"
          >
            Go Back Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default StoreNotFound;