import "./style.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import DarkTextField from "./DarkTextField";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const { logoutUser, user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <div className="navbar-container">
      <NavLink to="/">
        <h1>MS</h1>
      </NavLink>

      {user ? (
        <>
          <DarkTextField
            label="Search data"
            setOnChange={setSearch}
            width="20%"
            adornment={true}
            adornmentIcon={<SearchIcon />}
            adornmentOnClick={() => navigate(`/search/${search}`)}
          />
          <div className="navbar-elements">
            <div className="logged-elements">
              <NavLink to="/profile">
                <div className="profile-container">{user.name.slice(0, 1)}</div>
              </NavLink>

              <Button
                variant="contained"
                color="success"
                onClick={() => logoutUser()}
              >
                Logout
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
