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
  const [followType, setFollowType] = useState(null);
  const [followInfo, setFollowInfo] = useState({
    followers: props.val.followers,
    follows: props.val.follows,
  });
  const [follow, setFollow] = useState({
    users: [],
    skip: 0,
    hasMore: true,
    loading: true,
  });
  const navigate = useNavigate();
  const handleCloseFollow = () => {
    console.log(follow);
    setFollow({ ...follow, users: [], skip: 0, hasMore: true, loading: true });
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
                  followHandler(props.val._id, user, setUser, setFollowInfo)
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
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              setFollowType(1);
              setOpenFollow(true);
            }}
          >
            followers: {followInfo.followers.length}
          </p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              setFollowType(0);
              setOpenFollow(true);
            }}
          >
            follows:{" "}
            {user._id !== props.val._id
              ? followInfo.follows.length
              : user.follows.length}
          </p>
          <p>
            posts:{" "}
            {user._id === props.val._id
              ? user.posts.length
              : props.val.posts.length}
          </p>
        </div>
      </div>
      <FollowDialog
        handleClose={handleCloseFollow}
        open={openFollow}
        id={props.val._id}
        followType={followType}
        follow={follow}
        setFollow={setFollow}
      />
    </>
  );
}

export default UserCard;
