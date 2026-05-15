import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  // baseURL: 'https://sabisell.onrender.com/api',
});

// 1. REQUEST INTERCEPTOR: Attach the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sabisell_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. RESPONSE INTERCEPTOR: Catch 401 Expired Token errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is dead. Wipe the storage.
      localStorage.removeItem('sabisell_token');
      localStorage.removeItem('sabisell_vendor');
      
      // Force redirect to login page
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;