import { createContext, useState, useEffect, useMemo } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  // Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const productId = product._id || product.id;
      const existingItem = prevItems.find((item) => (item._id || item.id) === productId);

      if (existingItem) {
        return prevItems.map((item) =>
          (item._id || item.id) === productId
            ? { ...item, quantity: item.quantity + (typeof quantity === 'number' ? quantity : 1) }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: typeof quantity === 'number' ? quantity : 1 }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        (item._id || item.id) === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => (item._id || item.id) !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculated values
  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
