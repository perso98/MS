import { Dialog, Button, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useContext, useEffect } from "react";
import { addComment, getComments, likeComment } from "../api/comment";
import FavoriteIconOutlined from "@mui/icons-material/FavoriteOutlined";
import { AuthContext } from "../providers/AuthProvider";
import { useState } from "react";

function CommentDialog(props) {
  const [comment, setComment] = useState({
    text: "",
    likes: [],
    user: {},
    createdAt: "",
  });
  const { user } = useContext(AuthContext);

  useEffect(() => {}, [props.open]);

  return (
    <>
      {props.open ? (
        <Dialog open={props.open} onClose={() => props.handleClose()}>
          <div className="dark-dialog" dividers id="scrollableDiv">
            <div className="dialog-top">
              <span>Comments</span>
              <IconButton onClick={() => props.handleClose()}>
                <CloseIcon style={{ color: "white" }} />
              </IconButton>
            </div>
            <div className="comments-container">
              {props.comments?.map((comment, idx) => (
                <div className="comment-container" key={idx}>
                  <div className="profile-comment-container">J</div>
                  <div className="comment-user-info">
                    <div className="top-comment-info">
                      <span>
                        {comment.user.name} {comment.user.surname}
                      </span>
                      <span>{comment.createdAt}</span>
                    </div>

                    <div className="comment">
                      {comment.text}
                      <IconButton
                        className="comment-like-container"
                        onClick={() => {
                          likeComment(comment._id, user._id, props.setComments);
                        }}
                      >
                        <span> {comment.likes.length}</span>
                        {comment.likes.includes(user._id) ? (
                          <FavoriteIconOutlined
                            style={{ color: "red", marginLeft: "0.3rem" }}
                          />
                        ) : (
                          <FavoriteIcon style={{ marginLeft: "0.3rem" }} />
                        )}
                      </IconButton>
                    </div>
                  </div>
                  {user._id === comment.user._id ? (
                    <IconButton>
                      <CloseIcon
                        style={{ color: "red", marginRight: "1rem" }}
                      />
                    </IconButton>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="dialog-comment-bottom">
              <TextField
                value={comment.text}
                onChange={(e) =>
                  setComment({ ...comment, text: e.target.value })
                }
                style={{
                  width: "80%",
                  color: "black",
                }}
              ></TextField>
              <Button
                variant="contained"
                onClick={() => {
                  addComment(props.postId, user._id, props.setComments);
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Dialog>
      ) : null}
    </>
  );
}

export default CommentDialog;
