import { Button } from "@mui/material";
import React, { useState } from "react";
import { register } from "../api/auth";
import ActionAlerts from "./ActionAlerts";
import "./style.css";
export default function Register() {

  // Stan dla formularza rejestracji
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    password2: "",
    name: "",
    surname: "",
  });

  // Stan dla alertów
  const [alert, setAlert] = useState({
    open: false,
    info: "",
    severity: "",
  });

  return (
    <div className="auth-container">
      <h1>Register new account</h1>
      <ActionAlerts alert={alert} setAlert={setAlert} />
      <form
        className="auth-elements"
        onSubmit={(e) => {
          e.preventDefault();
          register(registerForm, setRegisterForm, setAlert);
        }}
      >
        <input
          placeholder="Name"
          required
          type="text"
          value={registerForm.name}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, name: e.target.value })
          }
        />

        <input
          placeholder="Surname"
          required
          type="text"
          value={registerForm.surname}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, surname: e.target.value })
          }
        />

        <input
          placeholder="E-mail"
          required
          type="email"
          value={registerForm.email}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, email: e.target.value })
          }
        />

        <input
          placeholder="Password"
          required
          type="password"
          value={registerForm.password}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, password: e.target.value })
          }
        />

        <input
          placeholder="Confirm password"
          type="password"
          required
          value={registerForm.password2}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, password2: e.target.value })
          }
        />
        {registerForm.password !== registerForm.password2 &&
        (registerForm.password.length > 0 ||
          registerForm.password2.length > 0) ? (
          <div style={{ color: "#FFCCCB", height: "1rem" }}>
            passwords doesn't match
          </div>
        ) : (
          <div style={{ height: "1rem" }}></div>
        )}

        <Button
          variant="contained"
          color="success"
          type="submit"
          disabled={
            registerForm.password === registerForm.password2 ? false : true
          }
        >
          Register
        </Button>
      </form>
    </div>
  );
}
