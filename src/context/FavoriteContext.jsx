import React, { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // ❤️ Add or remove from favorites
  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id); // remove
      } else {
        return [...prev, product]; // add
      }
    });
  };

  // 🧹 Clear all favorites (optional)
  const clearFavorites = () => setFavorites([]);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, clearFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
