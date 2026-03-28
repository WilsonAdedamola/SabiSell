import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Layouts
import StoreLayout from './layouts/StoreLayout';
import VendorLayout from './layouts/VendorLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Storefront Pages (The Shopper Experience)
import StoreHome from './pages/store/StoreHome';
import ProductDetails from './pages/store/ProductDetails';
import Cart from './pages/store/Cart';

// Vendor Pages (The Admin Experience)
import Dashboard from './pages/vendor/Dashboard';
import Products from './pages/vendor/Products';
import Orders from './pages/vendor/Orders';
import Settings from './pages/vendor/Settings';

const router = createBrowserRouter([
  {
    path: "/",
    element: <StoreLayout />,
    children: [
      { index: true, element: <StoreHome /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: <VendorLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <Products /> },
      { path: "orders", element: <Orders /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;