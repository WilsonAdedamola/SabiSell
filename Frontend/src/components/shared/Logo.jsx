
const Logo = ({ className = "w-10 h-10", showText = true }) => {
  return (
    <div className="flex items-center gap-3">
      {/* The Sabi-Bag SVG Icon */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
      >
        {/* Bag Handle */}
        <path 
          d="M35 35V25C35 16.7157 41.7157 10 50 10C58.2843 10 65 16.7157 65 25V35" 
          stroke="#10B981" 
          strokeWidth="8" 
          strokeLinecap="round"
        />
        {/* Bag Body / Speech Bubble Tail */}
        <path 
          d="M20 35C20 29.4772 24.4772 25 30 25H70C75.5228 25 80 29.4772 80 35V75C80 80.5228 75.5228 85 70 85H30C26.134 85 20 95 20 95V35Z" 
          fill="#10B981"
        />
        {/* The 'S' Inside */}
        <path 
          d="M60 48C60 43.5817 55.5228 40 50 40C44.4772 40 40 43.5817 40 48C40 52.4183 60 52.5817 60 57C60 61.4183 55.5228 65 50 65C44.4772 65 40 61.4183 40 57" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      
      {/* Optional Brand Text */}
      {showText && (
        <span className="text-3xl font-extrabold text-emerald-900 tracking-tighter">
          SabiSell
        </span>
      )}
    </div>
  );
};

export default Logo;