import React from "react";
import { useFavorites } from "../../context/FavoriteContext";

const FavoritePage = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-semibold mb-6">💖 My Favorites</h2>

      {favorites.length === 0 ? (
        <p>No favorites yet! Start adding some 💫</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-xl shadow-md">
              <img
                src={product.image}
                alt={product.title}
                className="h-40 w-full object-contain"
              />
              <h3 className="mt-2 font-semibold">{product.title}</h3>
              <p>${product.price}</p>
              <button
                onClick={() => toggleFavorite(product)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Remove ❤️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
