import React, { useContext, useEffect, useState } from "react";
import { Dialog, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../providers/AuthProvider";
import { addComment, getComments } from "../api/comment";
import { LinearProgress } from "@mui/material";
import DarkTextField from "./DarkTextField";
import SendIcon from "@mui/icons-material/Send";
import ConfirmDialog from "./ConfirmDialog";
import Comments from "./Comments";
import InfiniteScroll from "react-infinite-scroll-component";

function CommentDialog(props) {
  const [comments, setComments] = useState({
    data: [],
    hasMore: true,
    limit: 10,
    loading: true,
  });
  const [comment, setComment] = useState({
    text: "",
    likes: [],
    user: {},
    createdAt: "",
  });
  const { user } = useContext(AuthContext);

  const loadMore = () => {
    getComments(props.postId, comments, setComments);
  };

  useEffect(() => {
    if (props.open) loadMore();
  }, [props.postId, props.open]);

  const [confirmDialogOpen, setConfirmDialogOpen] = useState({
    open: false,
    id: null,
    text: "Are you sure you want to delete this comment?",
  });

  const handleCloseDialogConfirm = () => {
    setConfirmDialogOpen({
      ...confirmDialogOpen,
      open: false,
      id: null,
    });
  };

  return (
    <>
      {props.open && (
        <>
          <Dialog open={props.open} onClose={() => props.handleClose()}>
            <div className="dark-dialog" dividers id="scrollableDiv">
              <div className="dialog-top">
                <h2>Comments</h2>
                <IconButton onClick={() => props.handleClose()}>
                  <CloseIcon style={{ color: "white" }} />
                </IconButton>
              </div>
              <div className="comments-container">
                {comments.loading ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress color="inherit" />
                  </div>
                ) : (
                  <>
                    <InfiniteScroll
                      dataLength={comments.data.length}
                      next={loadMore}
                      hasMore={comments.hasMore}
                      loader={
                        <div style={{ marginTop: "2rem", textAlign: "center" }}>
                          <LinearProgress color="inherit" />
                        </div>
                      }
                      scrollableTarget="scrollableDiv"
                    >
                      {!comments.loading && comments.data.length === 0 ? (
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          There are no comments
                        </div>
                      ) : null}
                      <Comments
                        comments={comments.data}
                        user={user}
                        postId={props.postId}
                        setComments={setComments}
                        setCommentsIds={props.setCommentsIds}
                        setConfirmDialogOpen={setConfirmDialogOpen}
                      />
                    </InfiniteScroll>
                  </>
                )}
              </div>
              <div className="dialog-container-bottom">
                <DarkTextField
                  label="Add your comment"
                  width="90%"
                  setOnChange={(e) => {
                    const text = e.target.value.slice(0, 150);
                    setComment({ ...comment, text: text });
                  }}
                  value={comment.text.slice(0, 150)}
                  adornment={true}
                  adornmentIcon={<SendIcon />}
                  multiline={true}
                  rows={3}
                  adornmentOnClick={() => {
                    addComment(
                      comment,
                      props.postId,
                      user,
                      setComments,
                      props.setCommentsIds,
                      setComment
                    );
                  }}
                />
                <span className="comment-counter-letters">
                  {comment?.text?.length > 150 ? 150 : comment?.text?.length}
                  /150
                </span>
              </div>
            </div>
          </Dialog>
          <ConfirmDialog
            handleClose={handleCloseDialogConfirm}
            confirmDialog={confirmDialogOpen}
          />
        </>
      )}
    </>
  );
}

export default CommentDialog;
