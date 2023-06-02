import React from "react";
import { Link } from "react-router-dom";
function Notifications({ notifications, handleClose }) {
  return (
    <>
      {notifications?.map((notification) => {
        if (notification.action === "likedPost") {
          return (
            <div className="liked-notification-container">
              <Link
                to={`/user/${notification.user._id}`}
                onClick={handleClose}
                className="notification-user-info"
              >
                <div
                  className="profile-container"
                  style={{ marginRight: "1rem" }}
                >
                  <span style={{ textDecoration: "none" }}>
                    {" "}
                    {notification.user.name.charAt(0)}
                  </span>
                </div>

                <p style={{ textDecoration: "underline" }}>
                  {notification.user.name} {notification.user.surname}
                </p>
              </Link>

              <span> liked your</span>
              <Link
                style={{ textDecoration: "underline" }}
                to={`/post/${notification.likedPost}`}
                onClick={handleClose}
              >
                POST
              </Link>
            </div>
          );
        } else {
          return null;
        }
      })}
    </>
  );
}

export default Notifications;
