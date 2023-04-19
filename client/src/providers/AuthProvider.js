import React, { useState, useEffect, createContext, useCallback } from "react";
import { login, logout, auth } from "../api/auth";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    auth(setUser, setLoading);
  }, []);

  const loginUser = async (loginForm, setAlert) => {
    login(loginForm, setAlert, setUser, navigate);
  };
  const logoutUser = async () => {
    logout(setUser, navigate);
  };
  const value = { user, setUser, loginUser, logoutUser, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
