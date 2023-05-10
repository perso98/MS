import React, { useContext, useState, useEffect } from "react";
import { Dialog, Button, IconButton, CircularProgress } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";
import CloseIcon from "@mui/icons-material/Close";
import {
  followHandlerWithoutUpdatingFollower,
  getFollowersOrFollows,
} from "../api/user";

function FollowDialog(props) {
  const { user, setUser } = useContext(AuthContext);
  const [follow, setFollow] = useState({
    users: [],
    skip: 0,
    hasMore: true,
    loading: true,
  });
  const [initialFollow, setInitialFollow] = useState(false);
  useEffect(() => {
    setFollow({ ...follow, users: [], skip: 0, loading: true, hasMore: true });
    setInitialFollow(false);
  }, [props.id, props.followType]);

  useEffect(() => {
    if (initialFollow)
      getFollowersOrFollows(props.id, props.followType, setFollow, follow);
    else setInitialFollow(true);
  }, [initialFollow]);

  return (
    <Dialog onClose={props.handleClose} open={props.open}>
      <div className="dark-dialog">
        <div className="dialog-top">
          Follows
          <IconButton onClick={props.handleClose}>
            <CloseIcon style={{ color: "white" }} />
          </IconButton>
        </div>
        <div className="follow-dialog-container">
          {follow.loading ? (
            <CircularProgress
              color="inherit"
              style={{ position: "absolute", top: "45%", left: "45%" }}
            />
          ) : null}
          {follow?.users.map((val, index) => (
            <div className="follow-dialog-element" key={val._id}>
              <div className="dialog-element-user">
                <div className="post-avatar">N</div> {val.name} {val.surname}
              </div>
              {user._id !== val._id ? (
                <Button
                  color={user.follows.includes(val._id) ? "warning" : "success"}
                  variant="contained"
                  onClick={() =>
                    followHandlerWithoutUpdatingFollower(val._id, user, setUser)
                  }
                  style={{ height: "2rem", marginRight: "1rem" }}
                >
                  {user.follows.includes(val._id) ? "unfollow" : "follow"}
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
}

export default FollowDialog;
