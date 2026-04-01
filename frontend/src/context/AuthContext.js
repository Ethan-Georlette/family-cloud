import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("token") || null
  );

  const loginUser = (token) => {
    localStorage.setItem("token", token);
    setUser(token);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  
  const getUsers = (token) => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, getUsers }}>
      {children}
    </AuthContext.Provider>
  );
};