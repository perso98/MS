import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIconOutlined from "@mui/icons-material/FavoriteOutlined";
import { deleteComment, likeComment } from "../api/comment";

function Comments({
  comments,
  user,
  postId,
  setComments,
  setConfirmDialogOpen,
}) {

  // Funkcja obsługująca usuwanie komentarza
  const handleDeleteComment = (commentId) => {
    setConfirmDialogOpen({
      open: true,
      id: commentId,
      onClick: () => {
        deleteComment(postId, commentId, setComments);
        handleCloseDialogConfirm();
      },
    });
  };

  // Funkcja zamykająca dialog potwierdzenia usunięcia
  const handleCloseDialogConfirm = () => {
    setConfirmDialogOpen({
      open: false,
      id: null,
      onClick: null,
    });
  };

  return (
    <>
      {comments?.map((comment, idx) => (
        <div className="dialog-middle-container" key={idx}>
          <div className="profile-comment-container">
            {comment.user.name.charAt(0)}
          </div>
          <div className="comment-user-info">
            <div className="top-comment-info">
              <span>
                {comment.user.name} {comment.user.surname}
              </span>
              <span>{comment.createdAt.replace("T", " ").slice(0, 16)}</span>
            </div>

            <div className="comment">
              <p> {comment.text}</p>
              <IconButton
                className="comment-like-container"
                onClick={() => {
                  likeComment(comment._id, user._id, setComments);
                }}
              >
                <span style={{ color: "white" }}>
                  {" "}
                  {comment.likes.length > 0 ? comment.likes.length : null}
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
          {user._id === comment.user._id && (
            <IconButton
              style={{ backgroundColor: "transparent" }}
              onClick={() => handleDeleteComment(comment._id)}
            >
              <CloseIcon
                style={{
                  color: "red",
                  marginRight: "1rem",
                  marginLeft: "1rem",
                }}
              />
            </IconButton>
          )}
        </div>
      ))}
    </>
  );
}

export default Comments;
