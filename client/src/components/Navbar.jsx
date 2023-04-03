import "./style.css";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
export default function Navbar() {
  const { logoutUser, user } = useContext(AuthContext);
  return (
    <div className="navbar-container">
      <NavLink to="/">
        <h1>MS</h1>
      </NavLink>
      <div className="navbar-elements">
        <NavLink to="/profile">
          <div className="profile-container">Y</div>
        </NavLink>
      </div>
      {user ? (
        <Button
          variant="contained"
          color="success"
          onClick={() => logoutUser()}
        >
          Logout
        </Button>
      ) : null}
    </div>
  );
}
