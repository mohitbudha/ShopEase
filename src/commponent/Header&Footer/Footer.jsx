import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">ShopEase 🛍️</h2>
          <p className="text-sm">
            Your one-stop shop for the latest and greatest products.  
            Shop smart. Live better.
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Returns & Refunds</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-600"><FaFacebookF /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="hover:text-sky-500"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-800 dark:hover:text-white"><FaGithub /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} <span className="font-semibold text-blue-600">ShopEase</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
