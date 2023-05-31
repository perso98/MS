import "./style.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import DarkTextField from "./DarkTextField";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
export default function Navbar(props) {
  const { logoutUser, user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        {user ? (
          <IconButton
            onClick={() => {
              props.open ? props.setOpen(false) : props.setOpen(true);
            }}
          >
            {props.open ? (
              <CloseIcon className="nav-open-close-icon" />
            ) : (
              <MenuIcon className="nav-open-close-icon" />
            )}
          </IconButton>
        ) : null}
        <NavLink to="/">
          <h1>MS</h1>
        </NavLink>
      </div>

      {user ? (
        <>
          <DarkTextField
            label="Search data"
            setOnChange={(e) => setSearch(e.target.value)}
            value={search}
            width="20%"
            adornment={true}
            adornmentIcon={<SearchIcon />}
            adornmentOnClick={() => navigate(`/search/${search}`)}
          />
          <div className="navbar-elements">
            <div className="logged-elements">
              <NavLink to={`/user/${user._id}`}>
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
