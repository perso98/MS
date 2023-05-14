import React, { useContext, useState, useEffect } from "react";
import { Dialog, Button, IconButton, CircularProgress } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";
import CloseIcon from "@mui/icons-material/Close";
import { followHandler, getFollowersOrFollows } from "../api/user";

function FollowDialog(props) {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (props.open)
      getFollowersOrFollows(
        props.id,
        props.followType,
        props.setFollow,
        props.follow
      );
  }, [props.id, props.followType, props.open]);

  return (
    <>
      {props.open ? (
        <Dialog onClose={props.handleClose} open={props.open}>
          <div className="dark-dialog">
            <div className="dialog-top">
              {props.followType ? "Followers" : "Follows"}
              <IconButton onClick={props.handleClose}>
                <CloseIcon style={{ color: "white" }} />
              </IconButton>
            </div>
            <div className="follow-dialog-container">
              {props.follow.loading ? (
                <CircularProgress
                  color="inherit"
                  style={{ position: "absolute", top: "45%", left: "45%" }}
                />
              ) : null}
              {props.follow?.users.map((val, index) => (
                <div className="follow-dialog-element" key={val._id}>
                  <div className="dialog-element-user">
                    <div className="post-avatar">N</div> {val.name}{" "}
                    {val.surname}
                  </div>
                  {user._id !== val._id ? (
                    <Button
                      color={
                        user.follows.includes(val._id) ? "warning" : "success"
                      }
                      variant="contained"
                      onClick={() => followHandler(val._id, user, setUser)}
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
      ) : null}
    </>
  );
}

export default FollowDialog;
