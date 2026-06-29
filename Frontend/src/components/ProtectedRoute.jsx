import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
  const { vendor, isLoading } = useAuth();

  // Wait for the auth check to finish before making a routing decision
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <Loader2 className="w-10 h-10 animate-spin text-[#044e3b]" />
      </div>
    );
  }

 
  if (!vendor) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children
  return <Outlet />;
};

export default ProtectedRoute;