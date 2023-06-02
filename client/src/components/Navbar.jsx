import "./style.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, IconButton } from "@mui/material";

import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import DarkTextField from "./DarkTextField";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getNotificationsIds } from "../api/notifications";
import NotificationsDialog from "./NotificationsDialog";
export default function Navbar(props) {
  const { logoutUser, user, setUser } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [startInterval, setStartInterval] = useState(true);
  useEffect(() => {
    if (startInterval && user) {
      getNotificationsIds(setUser);
      setStartInterval(false);
    }
    if (user) {
      const fetchNotifications = () => {
        getNotificationsIds(setUser);
      };
      const interval = setInterval(fetchNotifications, 600000);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);
  const [openNotifications, setOpenNotifications] = useState(false);
  const handleCloseNotificationDialog = () => {
    setOpenNotifications(false);
  };
  return (
    <nav>
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
              <IconButton
                className="notification-button-container"
                onClick={() => setOpenNotifications(true)}
              >
                <Badge badgeContent={user.notifications.length} color="error">
                  <NotificationsIcon className="notification-button" />
                </Badge>
              </IconButton>
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
      <NotificationsDialog
        handleClose={handleCloseNotificationDialog}
        open={openNotifications}
      />
    </nav>
  );
}
