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

// 4. VENDOR PAGES
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

// 5. CUSTOMER STOREFRONT PAGES
import Storefront from './pages/store/StoreFront';
import ProductDetails from './pages/store/ProductDetails';
import Cart from './pages/store/Cart';
import Checkout from './pages/store/Checkout';

// 6. SYSTEM PAGES
import NotFound from './pages/errors/NotFound';
import StoreNotFound from './pages/store/StoreNotFound';
import Discounts from './pages/vendor/Discount';
import StoreLink from './pages/vendor/StoreLink';
import Payments from './pages/vendor/Payments';


// ROUTER 1: MAIN SAAS APP 

const mainRouter = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/faq", element: <FAQ /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/verify-email", element: <VerifyEmail /> },
  { path: "*", element: <NotFound /> },

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
      { path: "discounts", element: <Discounts /> },
      { path: "store-link", element: <StoreLink /> },
      { path: "payments", element: <Payments/> },
    ],
  },

  // FREE TIER FALLBACK ROUTE (sabisell.vercel.app/store/store-name)
  {
    path: "/store/:fallbackStoreLink",
    element: <StoreLayout />,
    children: [
      { index: true, element: <Storefront /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
    ],
  },

  { path: "*", element: <StoreNotFound /> }
]);


// ROUTER 2: STOREFRONT APP (For Custom Domains)

const storeRouter = createBrowserRouter([
  {
    path: "/",
    element: <StoreLayout />,
    children: [
      { index: true, element: <Storefront /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
    ],
  },
  { path: "*", element: <StoreNotFound /> }
]);

const App = () => {
  
  const hostname = window.location.hostname;
  const mainDomains = ['localhost', '127.0.0.1', 'sabisell.vercel.app', 'www.sabisell.vercel.app', 'sabisell.com', 'www.sabisell.com'];
  const isSubdomain = !mainDomains.includes(hostname);

  return <RouterProvider router={isSubdomain ? storeRouter : mainRouter} />;
};

export default App;