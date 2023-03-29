import React, { useState, useEffect, createContext } from "react";
import { login, logout, auth } from "../api/auth";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth(setUser);
  }, []);

  const loginUser = async (loginForm) => {
    login(loginForm, setUser);
  };
  const logoutUser = async () => {
    logout(setUser);
  };
  const value = { user, loginUser, logoutUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
