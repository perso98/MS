import { Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import "./style.css";
export default function Login() {
  const { loginUser } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  return (
    <div className="auth-container">
      <h1>Log in to account</h1>
      <div className="auth-elements">
        <label>Login</label>
        <input
          type="text"
          onChange={(e) =>
            setLoginForm({ ...loginForm, email: e.target.value })
          }
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
        />
        <Button
          variant="contained"
          color="success"
          onClick={() => loginUser(loginForm)}
        >
          Log in
        </Button>
      </div>
    </div>
  );
}
