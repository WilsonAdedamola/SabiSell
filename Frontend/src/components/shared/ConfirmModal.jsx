import { AlertTriangle, X, Loader2 } from "lucide-react";

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  isLoading = false 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
      {/* Dark Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={!isLoading ? onClose : undefined}
      ></div>

      {/* Modal Dialog */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-sm relative z-10 animate-in zoom-in-95 fade-in duration-200 shadow-2xl">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mt-2">
          {/* Warning Icon */}
          <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mb-5 shadow-inner">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          
          <h3 className="text-xl font-extrabold text-gray-900 mb-2">{title}</h3>
          
          <p className="text-sm font-medium text-gray-500 mb-8 leading-relaxed">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full">
            <button 
              onClick={onClose}
              disabled={isLoading}
              className="w-1/2 py-3.5 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button 
              onClick={onConfirm}
              disabled={isLoading}
              className="w-1/2 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /></>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;