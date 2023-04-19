import React from "react";
import "./style.css";
function UserSearchCard(props) {
  return (
    <div className="user-card-container">
      <div className="user-top-content">
        <div className="user-avatar">{props.val.name.charAt(0)}</div>
        <div className="user-card-info">
          {props.val.name} {props.val.surname}
        </div>
      </div>
      <div className="user-bottom-content">
        <p>followers: {props.val.followers.length}</p>
        <p>follows {props.val.follows.length}</p>
        <p>posts {props.val.posts.length}</p>
      </div>
    </div>
  );
}

export default UserSearchCard;
