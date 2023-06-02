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
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) getNotifications(setNotifications, setLoading);
  }, [open]);

  const Loading = () => (
    <div style={notificationContainerStyle}>
      <CircularProgress color="inherit" />
    </div>
  );

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
