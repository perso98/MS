import { Button, CircularProgress, Dialog, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { getNotifications } from "../api/notifications";
import Notifications from "./Notifications";

const notificationContainerStyle = {
  display: "flex",
  justifyContent: "center",
  height: "47vh",
};

function NotificationsDialog({ open, handleClose }) {

  // Stan przechowujący powiadomienia
  const [notifications, setNotifications] = useState([]);

  // Stan ładowania powiadomień
  const [loading, setLoading] = useState(true);

  // Efekt do pobierania powiadomień przy otwarciu dialogu
  useEffect(() => {
    if (open) getNotifications(setNotifications, setLoading);
  }, [open]);

  // Komponent wyświetlający wskaźnik ładowania
  const Loading = () => (
    <div style={notificationContainerStyle}>
      <CircularProgress color="inherit" />
    </div>
  );

  // Komponent wyświetlający informację o braku powiadomień
  const EmptyNotifications = () => (
    <div style={notificationContainerStyle}>
      <p>There are no notifications</p>
    </div>
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="dark-dialog">
        <div className="dialog-top">
          <h2>Your notifications</h2>
          <IconButton onClick={handleClose}>
            <CloseIcon style={{ color: "white" }} />
          </IconButton>
        </div>
        <div className="notification-container">
          {loading ? <Loading /> : null}
          {!loading && !notifications?.length ? (
            <EmptyNotifications />
          ) : (
            <Notifications
              notifications={notifications}
              handleClose={handleClose}
            />
          )}
        </div>
        <div className="dialog-container-bottom">
          <Button
            variant="contained"
            color="warning"
            style={{ padding: "1rem" }}
          >
            Clear all
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default NotificationsDialog;
