import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, logoutUser, updateUser } = useUser();
  const navigate = useNavigate();

  if (!user.isLoggedIn) {
    navigate("/profile"); // redirect if not logged in
    return null;
  }

 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">👤 User Profile</h2>
        <p className="mb-2"><strong>Name:</strong> {user.name}</p>
        <p className="mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="mb-4"><strong>Password:</strong> {user.password}</p>

        <button
          onClick={()=> navigate(`/auth`)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
