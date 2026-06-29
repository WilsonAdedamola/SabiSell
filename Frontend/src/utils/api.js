// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   // baseURL: 'https://sabisell.onrender.com/api',
//   withCredentials: true,
// });

// // https://chip-wikipedia-devotion.ngrok-free.dev
// // https://sabisell.onrender.com/api/webhooks/paystack

// // NOTE: The Request Interceptor was completely removed. 
// // You no longer need to manually attach a Bearer token from localStorage.

// // RESPONSE INTERCEPTOR: Catch 401 Expired Cookie errors globally
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
      
//       // If the 401 comes from the initial AuthContext check or a login attempt, 
//       // we ignore it so it doesn't cause an infinite redirect loop.
//       const isAuthCheck = error.config.url.includes('/auth/me') || error.config.url.includes('/auth/login');
      
//       if (!isAuthCheck) {
//         // The session cookie is dead or missing on a protected route.
//         // Force redirect to login page.
//         window.location.href = '/login'; 
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // We log the 401 for debugging purposes
    if (error.response && error.response.status === 401) {
      // console.warn(" 401 Unauthorized: Session may have expired.", error.config.url);
    }
    
    return Promise.reject(error);
  }
);

export default api;