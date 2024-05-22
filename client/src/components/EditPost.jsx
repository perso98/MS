import Dialog from "@mui/material/Dialog";
import { Button, IconButton } from "@mui/material";
import { editPost } from "../api/post";
import { AuthContext } from "../providers/AuthProvider";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
function EditPost(props) {

  // Pobranie użytkownika z kontekstu uwierzytelniania
  const { user } = useContext(AuthContext);
  return (
    <Dialog onClose={props.handleClose} open={props.open}>
      <div
        className="post-container"
        style={{ color: "white", borderRadius: "0px" }}
      >
        <div className="edit-post-top-container">
          <h2>Edit your post below</h2>
          <IconButton onClick={props.handleClose}>
            <CloseIcon style={{ color: "white", fontSize: "1.5rem" }} />
          </IconButton>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editPost(props.post._id, props.setPosts, props.post, user);
            props.handleClose();
          }}
        >
          <div className="post-element-container">
            <label>Subject</label>
            <input
              required
              type="text"
              value={
                props?.post?.subject?.slice(0, 50) > 50
                  ? 50
                  : props?.post?.subject?.slice(0, 50)
              }
              onChange={(e) => {
                const text = e.target.value.slice(0, 150);
                props.setPost({ ...props.post, subject: text });
              }}
            />
          </div>
          <span className="post-limit-characters">
            {props?.post?.subject?.length}/50
          </span>
          <div className="post-element-container">
            <label>Description</label>
            <textarea
              required
              value={props?.post?.desc?.slice(0, 400)}
              onChange={(e) => {
                const text = e.target.value.slice(0, 400);
                props.setPost({ ...props.post, desc: text });
              }}
            />
          </div>
          <span className="post-limit-characters">
            {props?.post?.desc?.length > 400 ? 400 : props?.post?.desc?.length}
            /400
          </span>
          <Button type="submit" variant="contained" color="warning">
            Edit post
          </Button>
        </form>
      </div>
    </Dialog>
  );
}

export default EditPost;
