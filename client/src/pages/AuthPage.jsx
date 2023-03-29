import React, { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import Button from "@mui/material/Button";
export default function AuthPage() {
  const [component, setComponent] = useState(0);

  return (
    <>
      {component ? (
        <div className="auth-buttons-container">
          <Button
            variant="contained"
            color="success"
            disabled={true}
            className="auth-buttons"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => setComponent(0)}
            className="auth-buttons"
          >
            Register
          </Button>
        </div>
      ) : (
        <div className="auth-buttons-container">
          <Button
            variant="contained"
            color="success"
            onClick={() => setComponent(1)}
            className="auth-buttons"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={true}
            className="auth-buttons"
          >
            Register
          </Button>
        </div>
      )}

      {component ? <Login /> : <Register />}
    </>
  );
}
