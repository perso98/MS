import React from "react";
import "./style.css";
function UserSearchCard(props) {
  return (
    <div className="user-card-container">
      <div className="user-top-content">
        <div className="user-avatar">{props.user.name.charAt(0)}</div>
        <div className="user-card-info">
          {props.user.name} {props.user.surname}
        </div>
      </div>
      <div className="user-bottom-content">
        <p>followers: {props.user.followers.length}</p>
        <p>follows {props.user.follows.length}</p>
        <p>posts {props.user.posts.length}</p>
      </div>
    </div>
  );
}

export default UserSearchCard;
