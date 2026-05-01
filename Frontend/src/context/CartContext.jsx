import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load saved cart from local storage if it exists
    const savedCart = localStorage.getItem('sabisell_store_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('sabisell_store_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        // If already in cart, check if we hit stock limit
        if (existingItem.cartQuantity >= product.stockQuantity) return prevCart;
        
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        );
      }
      // If new to cart, add it with a quantity of 1
      return [...prevCart, { ...product, cartQuantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return removeFromCart(productId);
    
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          // Prevent exceeding stock limit
          const validQuantity = Math.min(newQuantity, item.stockQuantity);
          return { ...item, cartQuantity: validQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  // Calculate totals
  const cartTotalItems = cart.reduce((total, item) => total + item.cartQuantity, 0);
  const cartTotalPrice = cart.reduce((total, item) => total + (Number(item.price) * item.cartQuantity), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalItems,
        cartTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};