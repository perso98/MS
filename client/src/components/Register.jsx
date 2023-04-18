import { Button } from "@mui/material";
import React, { useState } from "react";
import { register } from "../api/auth";
import ActionAlerts from "./ActionAlerts";
import "./style.css";
export default function Register() {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    password2: "",
    name: "",
    surname: "",
  });
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
          register(e, registerForm, setRegisterForm, setAlert);
        }}
      >
        <label>Name</label>
        <input
          required
          type="text"
          value={registerForm.name}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, name: e.target.value })
          }
        />
        <label>Surname</label>
        <input
          required
          type="text"
          value={registerForm.surname}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, surname: e.target.value })
          }
        />
        <label>E-mail</label>
        <input
          required
          type="email"
          value={registerForm.email}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, email: e.target.value })
          }
        />
        <label>Password</label>
        <input
          required
          type="password"
          value={registerForm.password}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, password: e.target.value })
          }
        />
        <label>Confirm password</label>
        <input
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

        {registerForm.password === registerForm.password2 ? (
          <Button variant="contained" color="success" type="submit">
            Register
          </Button>
        ) : (
          <Button variant="contained" color="success" disabled="true">
            Register
          </Button>
        )}
      </form>
    </div>
  );
}
