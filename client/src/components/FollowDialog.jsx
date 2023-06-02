import React, { useContext, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import { Dialog, Button, IconButton } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";
import CloseIcon from "@mui/icons-material/Close";
import { followHandler, getFollowersOrFollows } from "../api/user";

function FollowDialog({
  id,
  followType,
  setFollow,
  follow,
  open,
  handleClose,
}) {
  const { user, setUser } = useContext(AuthContext);

  const loadMore = () => {
    getFollowersOrFollows(id, followType, setFollow, follow);
  };

  useEffect(() => {
    if (open) loadMore();
  }, [open]);

  const FollowButton = ({ val }) =>
    user._id !== val._id ? (
      <Button
        color={user.follows.includes(val._id) ? "warning" : "success"}
        variant="contained"
        onClick={() => followHandler(val._id, user, setUser)}
        style={{ height: "2rem", marginRight: "1rem" }}
      >
        {user.follows.includes(val._id) ? "unfollow" : "follow"}
      </Button>
    ) : null;

  return open ? (
    <Dialog onClose={handleClose} open={open}>
      <div className="dark-dialog" dividers id="scrollableDiv">
        <div className="dialog-top">
          <h2> {followType ? "Followers" : "Follows"}</h2>
          <IconButton onClick={handleClose}>
            <CloseIcon style={{ color: "white" }} />
          </IconButton>
        </div>
        <div className="follow-dialog-container">
          <InfiniteScroll
            dataLength={follow.data.length}
            next={loadMore}
            hasMore={follow.hasMore}
            loader={
              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <LinearProgress color="inherit" />
              </div>
            }
            scrollableTarget="scrollableDiv"
          >
            {follow.data.map((val) => (
              <div className="follow-dialog-element" key={val._id}>
                <div className="dialog-element-user">
                  <div className="post-avatar">N</div> {val.name} {val.surname}
                </div>
                <FollowButton val={val} />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </Dialog>
  ) : null;
}

export default FollowDialog;
