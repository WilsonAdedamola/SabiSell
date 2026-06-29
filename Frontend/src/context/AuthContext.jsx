import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [vendor, setVendor] = useState(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Wrap in useCallback so it can be exposed and called from other components
  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/auth/me'); 
      setVendor(response.data.vendor);
      setIsOnboarded(response.data.isOnboarded);
    } catch (error) {
      // 401 Unauthorized means no valid cookie/session
      setVendor(null);
      setIsOnboarded(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 2. Run on initial mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    setVendor(response.data.vendor);
    setIsOnboarded(response.data.isOnboarded);
    return response.data;
  };

  const signup = async (userData) => {
    const response = await api.post('/auth/signup', userData);
    setVendor(response.data.vendor);
    setIsOnboarded(response.data.isOnboarded);
    return response.data;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setVendor(null);
      setIsOnboarded(false);
    }
  };

  // 3. Helper to update partial vendor data instantly (e.g., after changing plan or settings)
  const updateVendor = (newData) => {
    setVendor(prev => ({ ...prev, ...newData }));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        vendor, 
        isOnboarded, 
        isLoading, 
        login, 
        signup, 
        logout,
        setVendor,     
        updateVendor, 
        checkAuth      
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};