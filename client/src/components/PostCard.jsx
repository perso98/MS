import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Button } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ConfirmDialog from "./ConfirmDialog";
import TimeAgo from "./TimeAgo";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { deletePost, like } from "../api/post";
import CommentDialog from "./CommentDialog";
import EditPost from "./EditPost";

export default function PostCard(props) {
  const [postId, setPostId] = useState("");
  const [openComments, setOpenComments] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [likes, setLikes] = useState(props.val.likes);
  const [commentsIds, setCommentsIds] = useState(props.val.comments);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState({
    open: false,
    id: null,
    text: "Are you sure you want to delete this post?",
  });
  const [post, setPost] = useState(props.val);

  // Funkcja zamykająca dialog komentarzy
  const handleCommentClose = () => {
    setOpenComments(false);
  };

  // Funkcja zamykająca dialog edycji posta
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // Funkcja zamykająca dialog potwierdzenia
  const handleCloseDialogConfirm = () => {
    setConfirmDialogOpen({
      ...confirmDialogOpen,
      open: false,
      id: null,
      onClick: null,
    });
  }

  return (
    <>
      <Card className="card-container" variant="outlined">
        <div className="post-top">
          <Typography
            className="user-post-section"
            onClick={() => navigate(`/user/${props.val.user?._id}`)}
          >
            <div className="post-avatar" style={{ fontWeight: "normal" }}>
              {props.val.user?.name.charAt(0)}
            </div>{" "}
            {props.val.user?.name} {props.val.user?.surname}
          </Typography>
          {user._id === props.val.user?._id ? (
            <div>
              <Button
                style={{ marginRight: "1rem" }}
                variant="contained"
                color="warning"
                onClick={() => {
                  setPost(props.val);
                  setOpenEdit(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setConfirmDialogOpen({
                    ...confirmDialogOpen,
                    open: true,
                    id: props.val._id,
                    onClick: () => {
                      deletePost(props.val._id, props.setArray, props.array);
                      handleCloseDialogConfirm();
                    },
                  });
                }}
              >
                Delete
              </Button>
            </div>
          ) : null}
        </div>
        <CardContent
          className="card-click"
          onClick={() => navigate(`/post/${props.val._id}`)}
        >
          <div className="top-card">
            <span className="card-subject">{props.val.subject}</span>
            <span style={{ marginTop: "0.3rem" }}>
              <TimeAgo createdAt={props.val.createdAt} />
            </span>
          </div>

          <p className="card-content"> {props.val.desc}</p>
        </CardContent>

        <CardActions className="bottom-card">
          <IconButton onClick={() => like(props.val._id, user._id, setLikes)}>
            {" "}
            <FavoriteIcon
              sx={{
                color: likes?.includes(user._id) ? "red" : "white",
              }}
            />
            <Typography sx={{ color: "white", marginLeft: "0.5rem" }}>
              {likes?.length}
            </Typography>
          </IconButton>

          <IconButton
            onClick={() => {
              setPostId(props.val._id);
              setOpenComments(true);
            }}
          >
            {" "}
            <Typography sx={{ color: "white", marginRight: "0.5rem" }}>
              {commentsIds.length}
            </Typography>
            <CommentIcon sx={{ color: "white" }} />{" "}
          </IconButton>
        </CardActions>
      </Card>
      <CommentDialog
        handleClose={handleCommentClose}
        open={openComments}
        setCommentsIds={setCommentsIds}
        postId={postId}
      />
      <EditPost
        handleClose={handleCloseEdit}
        open={openEdit}
        post={post}
        setPost={setPost}
        setPosts={props.setArray}
      />
      <ConfirmDialog
        handleClose={handleCloseDialogConfirm}
        confirmDialog={confirmDialogOpen}
      />
    </>
  );
}
