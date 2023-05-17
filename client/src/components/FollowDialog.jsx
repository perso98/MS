import React, { useContext, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import { Dialog, Button, IconButton, CircularProgress } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";
import CloseIcon from "@mui/icons-material/Close";
import { followHandler, getFollowersOrFollows } from "../api/user";

function FollowDialog(props) {
  const { user, setUser } = useContext(AuthContext);

  const loadMore = () => {
    getFollowersOrFollows(
      props.id,
      props.followType,
      props.setFollow,
      props.follow
    );
  };
  useEffect(() => {
    if (props.open) loadMore();
  }, [props.open]);

  return (
    <>
      {props.open ? (
        <Dialog onClose={props.handleClose} open={props.open}>
          <div className="dark-dialog" dividers id="scrollableDiv">
            <div className="dialog-top">
              {props.followType ? "Followers" : "Follows"}
              <IconButton onClick={props.handleClose}>
                <CloseIcon style={{ color: "white" }} />
              </IconButton>
            </div>
            <div className="follow-dialog-container">
              <InfiniteScroll
                dataLength={props.follow.data.length}
                next={loadMore}
                hasMore={props.follow.hasMore}
                loader={
                  <div style={{ marginTop: "2rem", textAlign: "center" }}>
                    <LinearProgress color="inherit" />
                  </div>
                }
                scrollableTarget="scrollableDiv"
              >
                {props.follow.data.map((val) => (
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
              </InfiniteScroll>
            </div>
          </div>
        </Dialog>
      ) : null}
    </>
  );
}

export default FollowDialog;
