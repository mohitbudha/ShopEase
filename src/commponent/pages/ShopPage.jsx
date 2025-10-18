import React, { useEffect, useState, useMemo, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaStar } from "react-icons/fa";
import { SearchContext } from "../../context/SearchContex";
import StarRating from "../Rating";

const ShopPage = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const { search } = useContext(SearchContext);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "all" ? true : p.category === category;
      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  // Pagination
  const totalPage = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  if (loading)
    return <div className="text-center py-20 text-lg">Loading...</div>;
  if (error) return <div className="text-center py-20">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition flex flex-col p-4"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-52 sm:h-56 w-full object-contain mb-3 cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => navigate(`/product/${product.id}`)}
            />
            <h3 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base mb-1 truncate">
              {product.title}
            </h3>
            <div className="flex justify-between items-center text-sm sm:text-base mb-3">
              <p className="text-blue-600 font-bold">${product.price}</p>
              <p className="flex items-center gap-1 text-yellow-500">
                <StarRating className="text-lg"  rating={product.rating.rate}/>
              </p>
            </div>
            <button
              onClick={() => navigate(`/product/${product.id}`)}
              className="mt-auto w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {currentProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-base sm:text-lg">
          No products found for "{search}".
        </p>
      )}

      {/* Pagination */}
      {filteredProducts.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className={`px-4 py-2 rounded-full border transition ${
              currentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-blue-500 hover:text-white"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-full border font-medium transition ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-400 hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              currentPage < totalPage && setCurrentPage(currentPage + 1)
            }
            className={`px-4 py-2 rounded-full border transition ${
              currentPage === totalPage
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-blue-500 hover:text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
