import { Dialog, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useContext, useEffect } from "react";
import {
  addComment,
  deleteComment,
  getComments,
  likeComment,
} from "../api/comment";
import FavoriteIconOutlined from "@mui/icons-material/FavoriteOutlined";
import { AuthContext } from "../providers/AuthProvider";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LinearProgress } from "@mui/material";
import DarkTextField from "./DarkTextField";
import SendIcon from "@mui/icons-material/Send";
import ConfirmDialog from "./ConfirmDialog";
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
  }, [props.postId]);

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
      onClick: null,
    });
  };
  return (
    <>
      {props.open ? (
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
                      {comments?.data?.map((comment, idx) => (
                        <div className="dialog-middle-container" key={idx}>
                          <div className="profile-comment-container">
                            {comment.user.name.charAt(0)}
                          </div>
                          <div className="comment-user-info">
                            <div className="top-comment-info">
                              <span>
                                {comment.user.name} {comment.user.surname}
                              </span>
                              <span>
                                {comment.createdAt
                                  .replace("T", " ")
                                  .slice(0, 16)}
                              </span>
                            </div>

                            <div className="comment">
                              {comment.text}
                              <IconButton
                                className="comment-like-container"
                                onClick={() => {
                                  likeComment(
                                    comment._id,
                                    user._id,
                                    setComments
                                  );
                                }}
                              >
                                <span style={{ color: "white" }}>
                                  {" "}
                                  {comment.likes.length > 0
                                    ? comment.likes.length
                                    : null}
                                </span>
                                {comment.likes.includes(user._id) ? (
                                  <FavoriteIconOutlined
                                    style={{
                                      color: "red",
                                      marginLeft: "0.3rem",
                                    }}
                                  />
                                ) : (
                                  <FavoriteIcon
                                    style={{
                                      marginLeft: "0.3rem",
                                      color: "white",
                                    }}
                                  />
                                )}
                              </IconButton>
                            </div>
                          </div>
                          {user._id === comment.user._id ? (
                            <IconButton
                              style={{ backgroundColor: "transparent" }}
                              onClick={() => {
                                setConfirmDialogOpen({
                                  ...confirmDialogOpen,
                                  open: true,
                                  id: comment._id,
                                  onClick: () => {
                                    deleteComment(
                                      props.postId,
                                      comment._id,
                                      setComments,
                                      props.setCommentsIds
                                    );
                                    handleCloseDialogConfirm();
                                  },
                                });
                              }}
                            >
                              <CloseIcon
                                style={{
                                  color: "red",
                                  marginRight: "1rem",
                                  marginLeft: "1rem",
                                }}
                              />
                            </IconButton>
                          ) : null}
                        </div>
                      ))}
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
      ) : null}
    </>
  );
}

export default CommentDialog;
