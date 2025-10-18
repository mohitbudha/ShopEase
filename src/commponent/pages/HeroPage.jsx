import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const HeroPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Fetch products from fakestore
  const fetchData = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Rotate images every 2 seconds
  useEffect(() => {
    if (products.length === 0) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, products]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        
        {/* Left: Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            Discover the <span className="text-blue-600">Best Deals</span> on Your Favorite Products 🛍️
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            Upgrade your lifestyle with quality products at unbeatable prices. Shop with confidence at <span className="font-semibold text-blue-600">ShopEase</span>.
          </p>

          <div className="flex justify-center md:justify-start gap-4">
            <Link
              to="/shop"
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Shop Now
            </Link>
            <Link
              to="/offers"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition"
            >
              View Offers
            </Link>
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="flex-1 flex justify-center">
          {loading ? (
            <img src="https://cdn.pixabay.com/photo/2016/11/29/02/30/shopping-1865372_1280.png" alt="" />
          ) : error ? (
            <p>{error}</p>
          ) : (
            <img
              src={products[currentIndex]?.image}
              alt="Product"
              className="w-80 sm:w-96 md:w-[450px] h-80 object-contain transition-all duration-700 ease-in-out cursor-pointer"
              onClick={()=> navigate(`/product/${products[currentIndex].id}`)}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroPage;
