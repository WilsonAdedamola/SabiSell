import { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  // Auto-close after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-100 animate-in slide-in-from-top-5 fade-in duration-300">
      <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border ${
        type === 'success' 
          ? 'bg-[#F0FDF4] border-emerald-200 text-emerald-800 shadow-emerald-900/5' 
          : 'bg-red-50 border-red-200 text-red-800 shadow-red-900/5'
      }`}>
        {type === 'success' ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
        )}
        
        <p className="text-sm font-bold pr-4">{message}</p>
        
        <button onClick={onClose} className="ml-auto hover:opacity-70 transition-opacity">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;