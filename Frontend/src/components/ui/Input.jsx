import { cn } from '../../utils/helpers' // Importing our global utility

const Input = ({ label, error, className, ...props }) => {
  const inputId = props.id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        {...props}
        id={inputId}
        className={cn(
          "w-full px-4 py-3 bg-white",
          "border border-gray-200 rounded-xl",
          "text-base placeholder:text-gray-400",
          "transition-all duration-150 ease-in-out",
          "focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 focus:outline-none",
          error && "border-red-500 focus:ring-red-100 focus:border-red-500",
          className
        )}
      />
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;