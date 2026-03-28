import React from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Button({ 
  children, 
  variant = 'primary', // primary, secondary, outline
  isLoading, 
  className, 
  ...props 
}) {
  const baseClasses = cn(
    "px-6 py-3 font-semibold rounded-xl text-center", // Radii and styling
    "transition-all duration-150 ease-in-out active:scale-[0.98]", // Added click feel
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "flex items-center justify-center gap-2",
    "disabled:opacity-60 disabled:cursor-not-allowed"
  );

  const variants = {
    // That vibrant green seen in your mockups
    primary: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",
    
    // A lighter variation
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300",
    
    // Transparent with border
    outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-300",
  };

  return (
    <button 
      {...props} 
      className={cn(baseClasses, variants[variant], className)}
      disabled={props.disabled || isLoading}
    >
      {isLoading ? (
        // Simple SVG Spinner
        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : children}
    </button>
  );
}