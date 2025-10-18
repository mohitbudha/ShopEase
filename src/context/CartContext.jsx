import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Add to cart (handles quantity from product object)
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (existing) {
        // If product exists, increase by selected quantity
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + (product.quantity || 1) }
            : p
        );
      } else {
        // If product is new, add it with its quantity or 1 by default
        return [...prev, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  // 🗑️ Remove from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔄 Update quantity manually (optional helper)
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) return; // prevent zero/negative
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
