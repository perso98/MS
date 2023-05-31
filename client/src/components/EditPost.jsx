import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import { editPost } from "../api/post";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
function EditPost(props) {
  const { user } = useContext(AuthContext);
  return (
    <Dialog onClose={props.handleClose} open={props.open}>
      <div
        className="post-container"
        style={{ color: "white", borderRadius: "0px" }}
      >
        <h2>Edit your post below</h2>
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
              value={props?.post?.desc?.slice(0, 200)}
              onChange={(e) => {
                const text = e.target.value.slice(0, 200);
                props.setPost({ ...props.post, desc: text });
              }}
            />
          </div>
          <span className="post-limit-characters">
            {props?.post?.desc?.length > 200 ? 200 : props?.post?.desc?.length}
            /200
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
