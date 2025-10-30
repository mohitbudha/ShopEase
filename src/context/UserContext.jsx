import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Mohit",
    email: "mohit@gmail.com",
    password: "mohitmagar",
    isLoggedIn: false, // track login
  });

  const loginUser = (email, password, name) => {
    setUser({ name, email, password, isLoggedIn: true });
  };

  const logoutUser = () => {
    setUser({ name: "Mohit", email: "mohit@gmail.com", password: "mohitmagar", isLoggedIn: false });
  };

  const updateUser = (newData) => {
    setUser((prev) => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
