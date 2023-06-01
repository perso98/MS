import { Button, Dialog, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

import { getNotifications } from "../api/notifications";
function NotificationsDialog(props) {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    if (props.open) getNotifications(setNotifications);
  }, [props.open]);
  return (
    <Dialog open={props.open} onClose={() => props.handleClose()}>
      <div className="dark-dialog">
        {" "}
        <div className="dialog-top">
          <h2>Your notifications</h2>
          <IconButton onClick={() => props.handleClose()}>
            <CloseIcon style={{ color: "white" }} />
          </IconButton>
        </div>
        <div
          className="dialog-notification-container"
          style={{ height: "65%" }}
        >
          {notifications?.map((notification) => {
            console.log(notification);
            if (notification.action === "likedPost") {
              return (
                <div className="notification-container">
                  <div className="liked-notification-container">
                    <Link
                      to={`/user/${notification.user}`}
                      onClick={props.handleClose}
                      className="notification-user-info"
                      style={{ textDecoration: "underline" }}
                    >
                      <div
                        className="profile-container"
                        style={{ marginRight: "1rem" }}
                      >
                        {notification.user.name.charAt(0)}
                      </div>

                      <p>
                        {notification.user.name} {notification.user.surname}
                      </p>
                    </Link>

                    <span> liked your </span>
                    <Link
                      style={{ textDecoration: "underline" }}
                      to={`/post/${notification.likedPost}`}
                      onClick={props.handleClose}
                    >
                      POST
                    </Link>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}

          <div className="dialog-container-bottom">
            <Button
              variant="contained"
              color="warning"
              style={{ padding: "1rem" }}
            >
              {" "}
              Clear all{" "}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default NotificationsDialog;
