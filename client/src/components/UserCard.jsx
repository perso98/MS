import React, { useContext, useState } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import { AuthContext } from "../providers/AuthProvider";
import { followHandler } from "../api/user";
import { useNavigate } from "react-router-dom";
import FollowDialog from "./FollowDialog";
function UserCard(props) {
  const { user, setUser } = useContext(AuthContext);
  const [openFollow, setOpenFollow] = useState(false);
  const navigate = useNavigate();
  const handleCloseFollow = () => {
    setOpenFollow(false);
  };
  return (
    <>
      <div className="user-card-container">
        <div className="user-top-content">
          <div
            className="user-card-click"
            onClick={() => navigate(`/user/${props.val._id}`)}
          >
            <div className="user-avatar">{props.val.name.charAt(0)}</div>
            {props.val.name} {props.val.surname}
          </div>
          <div className="user-card-info">
            {user._id !== props.val._id ? (
              <Button
                style={{ marginLeft: "2rem" }}
                variant="contained"
                color={
                  user.follows.includes(props.val._id) ? "warning" : "success"
                }
                onClick={() =>
                  followHandler(props.val._id, user, setUser, props.setArray)
                }
              >
                {user.follows.includes(props.val._id) ? "unfollow" : "follow"}
              </Button>
            ) : null}
          </div>
        </div>
        <div
          style={{
            margin: "1rem 0 1rem ",
            fontSize: "1rem",
            marginLeft: "auto",
          }}
        >
          {user._id !== props.val._id
            ? props.val.follows.includes(user._id)
              ? "following you"
              : "not following you"
            : null}
        </div>
        <div className="user-bottom-content">
          <p onClick={() => setOpenFollow(true)}>
            followers: {props.val.followers.length}
          </p>
          <p>follows: {props.val.follows.length}</p>
          <p>
            posts:{" "}
            {user._id === props.val._id
              ? user.posts.length
              : props.val.posts.length}
          </p>
        </div>
      </div>
      <FollowDialog handleClose={handleCloseFollow} open={openFollow} />
    </>
  );
}

export default UserCard;
