import React, { useState, useEffect, createContext } from "react";
import { login, logout, auth } from "../api/auth";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    auth(setUser);
  }, []);

  const loginUser = async (e, loginForm, setAlert) => {
    login(e, loginForm, setAlert, setUser, navigate);
  };
  const logoutUser = async () => {
    logout(setUser, navigate);
  };
  const value = { user, loginUser, logoutUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
