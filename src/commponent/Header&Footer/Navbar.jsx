import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import UserAuthForm from "../pages/AuthPage";
import { SearchContext } from "../../context/SearchContex";

const Navbar = ({ onCategoryChange }) => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const { search, setSearch } = useContext(SearchContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategories(["all", ...data]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = (e) => e.preventDefault();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 flex items-center"
        >
          ShopEase 🛍️
        </Link>

        {/* Desktop Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="hidden md:flex flex-1 mx-6 items-center"
        >
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              navigate("/shop");
            }}
            className="w-full px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-r-full hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {/* Icons + Mobile Menu Toggle */}
        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200">
          {/* Category Dropdown (Desktop only) */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              onCategoryChange(e.target.value);
              navigate("/shop");
            }}
            className="hidden md:block rounded-lg border border-gray-300 px-3 py-2 focus:outline-none dark:bg-gray-800 dark:text-white"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <Link to="/cart" className="relative hover:text-blue-600">
            <FaShoppingCart size={22} />
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="hover:text-blue-600 focus:outline-none"
          >
            <FaUser size={22} />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-6 pb-4 space-y-3">
          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                navigate("/shop");
              }}
              className="w-full px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-full hover:bg-blue-700"
            >
              Go
            </button>
          </form>

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              onCategoryChange(e.target.value);
              navigate("/shop");
              setMenuOpen(false);
            }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:text-white"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Popup Auth Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className=" dark:bg-gray-800 p-6 rounded-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <UserAuthForm />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
