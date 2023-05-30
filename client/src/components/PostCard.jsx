import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Button } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import TimeAgo from "./TimeAgo";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { deletePost, like } from "../api/post";
import CommentDialog from "./CommentDialog";

export default function PostCard(props) {
  const [postId, setPostId] = useState("");
  const [openComments, setOpenComments] = useState(false);
  const handleCommentClose = () => {
    setOpenComments(false);
  };
  const [likes, setLikes] = useState(props.val.likes);
  const [comments, setComments] = useState(props.val.comments);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
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
                  props.setPost(props.val);
                  props.setOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  deletePost(props.val._id, props.setPosts, props.posts);
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
              {comments.length}
            </Typography>
            <CommentIcon sx={{ color: "white" }} />{" "}
          </IconButton>
        </CardActions>
      </Card>
      <CommentDialog
        handleClose={handleCommentClose}
        open={openComments}
        setComments={setComments}
        comments={comments}
        postId={postId}
      />
    </>
  );
}
