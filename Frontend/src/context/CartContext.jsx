import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const location = useLocation();

  // 1. Identify which store the user is currently viewing based on the URL
  const getStoreIdentifier = () => {
    const hostname = window.location.hostname;
    const mainDomains = ['localhost', '127.0.0.1', 'sabisell.vercel.app', 'www.sabisell.vercel.app', 'sabisell.com', 'www.sabisell.com'];
    
    // Check if on a custom subdomain (e.g., kiki.sabisell.com)
    if (!mainDomains.includes(hostname)) {
      return hostname.split('.')[0];
    }
    
    // Check if on a free tier path (e.g., /store/kiki)
    const pathParts = location.pathname.split('/');
    if (pathParts[1] === 'store' && pathParts[2]) {
      return pathParts[2];
    }
    
    return 'default'; // Fallback
  };

  // 2. Generate a UNIQUE storage key for this specific store
  const storeId = getStoreIdentifier();
  const storageKey = `sabisell_cart_${storeId}`;

  // 3. Initialize the cart state using the unique key
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(storageKey);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 4. Listen for URL changes: If the user swaps between stores, load the correct cart into memory!
  useEffect(() => {
    if (storeId !== 'default') {
      const savedCart = localStorage.getItem(storageKey);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    }
  }, [storageKey]);

  // 5. Save back to localStorage whenever the cart changes
  useEffect(() => {
    if (storeId !== 'default') {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    }
  }, [cart, storageKey]);


  // --- CART ACTIONS ---
  const addToCart = (product) => {
    setCart(prevCart => {
      // Get the requested quantity (defaults to 1 if not provided)
      const quantityToAdd = product.cartQuantity || 1;

      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            // Add the new quantity to the existing quantity, capping it at the max stock limit
            ? { ...item, cartQuantity: Math.min(item.cartQuantity + quantityToAdd, item.stockQuantity) } 
            : item
        );
      }
      
      // If it is a completely new item, add it with the requested quantity
      return [...prevCart, { ...product, cartQuantity: quantityToAdd }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === id) {
         // Keep quantity between 1 and the max stock available
         return { ...item, cartQuantity: Math.max(1, Math.min(quantity, item.stockQuantity)) };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // --- CALCULATIONS ---
  
  // UPDATED: Now it just counts the number of unique product entries in the cart array
  const cartTotalItems = cart.length; 
  
  const cartTotalPrice = cart.reduce((total, item) => total + (item.price * (item.cartQuantity || 0)), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      updateQuantity, 
      removeFromCart, 
      clearCart, 
      cartTotalItems, 
      cartTotalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
};