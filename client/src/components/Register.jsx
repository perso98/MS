import { Button } from "@mui/material";
import React, { useState } from "react";
import { register } from "../api/auth";
import "./style.css";
export default function Register() {
  const [registerForm, setRegisterForm] = useState({ email: "", password: "" });

  return (
    <div className="auth-container">
      <h1>Register new account</h1>
      <div className="auth-elements">
        <label>E-mail</label>
        <input
          type="text"
          onChange={(e) =>
            setRegisterForm({ ...registerForm, email: e.target.value })
          }
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(e) =>
            setRegisterForm({ ...registerForm, password: e.target.value })
          }
        />
        <label>Confirm password</label>
        <input type="text" />
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            register(registerForm);
          }}
        >
          Register
        </Button>
      </div>
    </div>
  );
}
