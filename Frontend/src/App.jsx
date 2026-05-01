import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 1. LAYOUTS
import VendorLayout from './layouts/VendorLayout';
import StoreLayout from './layouts/StoreLayout';

// 2. MARKETING PAGES
import Landing from './pages/marketing/Landing';
import Pricing from './pages/marketing/Pricing';
import FAQ from './pages/marketing/FAQ';

// 3. AUTH PAGES
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyEmail from './pages/auth/VerifyEmail';

// 4. VENDOR PAGES (The Core App)
import Onboarding from './pages/vendor/Onboarding';
import Dashboard from './pages/vendor/Dashboard';
import Products from './pages/vendor/Products';
import AddEditProduct from './pages/vendor/AddEditProduct';
import Orders from './pages/vendor/Orders';
import OrderDetails from './pages/vendor/OrderDetails';
import Inbox from './pages/vendor/Inbox';
import ChatScreen from './pages/vendor/ChatScreen';
import Settings from './pages/vendor/Settings';
import Billing from './pages/vendor/Billing';

// 5. CUSTOMER STOREFRONT PAGES (No Login Required)
import Storefront from './pages/store/StoreFront';
import ProductDetails from './pages/store/ProductDetails';
import Cart from './pages/store/Cart';
import Checkout from './pages/store/Checkout';
import OrderSuccess from './pages/store/OrderSuccess';

// 6. SYSTEM PAGES
import NotFound from './pages/errors/NotFound';

// ==========================================
// ROUTER 1: MAIN SAAS APP (sabisell.com)
// ==========================================
const mainRouter = createBrowserRouter([
  // MARKETING WEBSITE
  { path: "/", element: <Landing /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/faq", element: <FAQ /> },

  // AUTHENTICATION FLOW
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/verify-email", element: <VerifyEmail /> },

  // VENDOR APP
  {
    path: "/dashboard",
    element: <VendorLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "onboarding", element: <Onboarding /> },
      { path: "products", element: <Products /> },
      { path: "products/new", element: <AddEditProduct /> },
      { path: "products/edit/:id", element: <AddEditProduct /> },
      { path: "orders", element: <Orders /> },
      { path: "orders/:id", element: <OrderDetails /> },
      { path: "messages", element: <Inbox /> },
      { path: "messages/:id", element: <ChatScreen /> },
      { path: "settings", element: <Settings /> },
      { path: "billing", element: <Billing /> },
    ],
  },

  // CATCH-ALL 404
  { path: "*", element: <NotFound /> }
]);

// ==========================================
// ROUTER 2: STOREFRONT APP (store.sabisell.com)
// ==========================================
const storeRouter = createBrowserRouter([
  {
    // Notice how the path is just "/", because the store slug is now in the domain!
    path: "/",
    element: <StoreLayout />,
    children: [
      { index: true, element: <Storefront /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "success", element: <OrderSuccess /> },
    ],
  },
  // CATCH-ALL 404 FOR STORES
  { path: "*", element: <NotFound /> }
]);


// ==========================================
// ROOT COMPONENT: DOMAIN ROUTING LOGIC
// ==========================================
const App = () => {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  
  let isSubdomain = false;

  // Check if we are on a production subdomain (e.g., zara.sabisell.com)
  if (parts.length >= 3 && parts[0] !== 'www') {
    isSubdomain = true;
  } 
  // Check if we are on a local testing subdomain (e.g., zara.localhost)
  else if (hostname.includes('localhost') && parts.length === 2) {
    isSubdomain = true;
  }

  // If a valid subdomain is detected, hijack the app and serve the Store Router.
  // Otherwise, serve the Main SaaS Router.
  return <RouterProvider router={isSubdomain ? storeRouter : mainRouter} />;
};

export default App;