import React from "react";
import { Link } from "react-router-dom";

const UserInfo = ({ user, handleClose }) => (
  <Link
    to={`/user/${user._id}`}
    onClick={handleClose}
    className="notification-user-info"
  >
    <div className="profile-container" style={{ marginRight: "1rem" }}>
      <span style={{ textDecoration: "none" }}>{user.name.charAt(0)}</span>
    </div>
    <p style={{ textDecoration: "underline" }}>
      {user.name.length > 7 ? user.name.slice(0, 2) + "..." : user.name}{" "}
      {user.surname.length > 7
        ? user.surname.slice(0, 7) + "..."
        : user.surname}
    </p>
  </Link>
);

const PostLink = ({ action, to, handleClose }) => (
  <>
    <span>{action} your </span>
    <Link style={{ textDecoration: "underline" }} to={to} onClick={handleClose}>
      POST
    </Link>
  </>
);

function Notifications({ notifications, handleClose }) {
  return (
    <>
      {notifications?.map((notification) => (
        <div className="notification" key={notification._id}>
          <UserInfo user={notification.user} handleClose={handleClose} />
          {notification.action === "likedPost" && (
            <PostLink
              action="liked"
              to={`/post/${notification.likedPost}`}
              handleClose={handleClose}
            />
          )}
          {notification.action === "addComment" && (
            <PostLink
              action="commented"
              to={`/post/${notification.addComment}`}
              handleClose={handleClose}
            />
          )}
        </div>
      ))}
    </>
  );
}

export default Notifications;
