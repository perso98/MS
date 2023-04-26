import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import { editPost } from "../api/post";
function EditPost(props) {
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
            editPost(props.post._id, props.setPosts, props.post);
            props.handleClose();
          }}
        >
          <div className="post-element-container">
            <label>Subject</label>
            <input
              required
              type="text"
              value={props.post.subject}
              onChange={(e) =>
                props.setPost({ ...props.post, subject: e.target.value })
              }
            />
          </div>

          <div className="post-element-container">
            <label>Description</label>
            <textarea
              required
              value={props.post.desc}
              onChange={(e) =>
                props.setPost({ ...props.post, desc: e.target.value })
              }
            />
          </div>
          <div className="post-element-container">
            <label>Category</label>
            <input
              required
              type="text"
              value={props.post.category}
              onChange={(e) =>
                props.setPost({ ...props.post, category: e.target.value })
              }
            />
          </div>

          <Button type="submit" variant="contained" color="warning">
            Edit post
          </Button>
        </form>
      </div>
    </Dialog>
  );
}

export default EditPost;
