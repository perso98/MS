import React, { useState, useEffect, createContext, useCallback } from "react";
import { login, logout, auth } from "../api/auth";
import { useNavigate } from "react-router-dom";

// Tworzenie kontekstu uwierzytelniania
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {

  // Stan użytkownika
  const [user, setUser] = useState(null);

  // Hook nawigacji do przekierowywania użytkownika
  const navigate = useNavigate();

  // Stan ładowania, aby wskazać, czy dane użytkownika są ładowane
  const [loading, setLoading] = useState(true);

  // useEffect do uwierzytelniania użytkownika przy pierwszym renderowaniu komponentu
  useEffect(() => {
    auth(setUser, setLoading);
  }, []);

  // Funkcja do logowania użytkownika
  const loginUser = async (loginForm, setAlert) => {
    login(loginForm, setAlert, setUser, navigate);
  };

  // Funkcja do wylogowania użytkownika
  const logoutUser = async () => {
    logout(setUser, navigate);
  };

  // Wartości przekazywane przez kontekst uwierzytelniania
  const value = { user, setUser, loginUser, logoutUser, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
