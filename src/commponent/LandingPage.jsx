import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6">
      {/* Logo / Name */}
      <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-center">
        ShoEase
      </h1>

      {/* Welcome Message */}
      <p className="text-xl sm:text-2xl mb-10 text-center">
        Welcome to ShoEase! Your ultimate shopping experience.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/auth")}
          className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          Explore ShopEase
        </button>

       
      </div>
    </div>
  );
};

export default LandingPage;
