import { Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import ActionAlerts from "./ActionAlerts";
import "./style.css";
export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({
    open: false,
    info: "",
    severity: "",
  });
  return (
    <div className="auth-container">
      <h1>Log in to account</h1>
      <ActionAlerts alert={alert} setAlert={setAlert} />
      <form
        className="auth-elements"
        onSubmit={(e) => loginUser(e, loginForm, setAlert)}
      >
        <label>E-mail</label>
        <input
          required
          type="email"
          onChange={(e) =>
            setLoginForm({ ...loginForm, email: e.target.value })
          }
        />
        <label>Password</label>
        <input
          required
          type="password"
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
        />
        <Button variant="contained" color="success" type="submit">
          Log in
        </Button>
      </form>
    </div>
  );
}
