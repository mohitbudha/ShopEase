import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserAuthForm = () => {
  const { user, loginUser, updateUser } = useUser();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      if (formData.email === user.email && formData.password === user.password) {
        loginUser(user.email, user.password, user.name);
        navigate("/profile"); // redirect to profile page
      } else {
        setMessage("Invalid email or password!");
      }
    } else {
      // Sign up
      updateUser({ ...formData, isLoggedIn: true });
      navigate("/profile"); // redirect after signup
    }

    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

          <button
            type="submit"
            className="mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {message && <p className="text-center mt-2 text-red-600">{message}</p>}

          <p className="mt-4 text-center text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserAuthForm;
