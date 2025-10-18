import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa6";
import { useCart } from "../../context/CartContext";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity });
    alert(`${quantity} × ${product.title} added to cart!`);
    navigate("/cart");
  };

  if (!product)
    return <div className="text-center py-20 text-lg font-medium">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center md:items-start gap-10">
      {/* Product Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-64 sm:w-80 md:w-96 object-contain rounded-xl shadow-md bg-white p-4"
        />
      </div>

      {/* Product Details */}
      <div className="w-full md:w-1/2 flex flex-col">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-center md:text-left">
          {product.title}
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base text-center md:text-left">
          {product.description}
        </p>

        {/* Price + Rating */}
        <div className="flex justify-center md:justify-start gap-6 mb-4 flex-wrap">
          <p className="text-2xl text-blue-600 font-semibold">${product.price}</p>
          <p className="flex items-center gap-2 text-xl font-semibold text-yellow-600">
            <FaStar className="text-yellow-500" /> {product.rating.rate}
          </p>
        </div>

        {/* Quantity Input */}
        <div className="flex justify-center md:justify-start items-center gap-3 mb-6">
          <label className="font-medium text-lg">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 border rounded-lg px-3 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center md:justify-start gap-4">
          <button
            className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
              quantity <= 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={quantity <= 0}
            onClick={() => {
              if (quantity <= 0) {
                alert("❌ Please select at least 1 quantity before adding to cart!");
                return;
              }
              handleAddToCart(product);
            }}
          >
            Add to Cart
          </button>

          <Link
            to="/shop"
            className="text-blue-600 hover:underline font-medium self-center"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
