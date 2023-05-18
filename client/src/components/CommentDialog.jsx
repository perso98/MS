import { Dialog, Button, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function CommentDialog(props) {
  const comments = [
    { user: "you", message: "xdddddd" },
    { user: "you", message: "xdddddd" },

    { user: "x", message: "xdddddd" },

    { user: "x", message: "xdddddd" },

    { user: "you", message: "xdddddd" },

    { user: "you", message: "xdddddd" },

    { user: "x", message: "xdddddd" },

    { user: "you", message: "xdddddd" },

    { user: "x", message: "xdddddd" },

    { user: "you", message: "xdddddd" },

    { user: "x", message: "xdddddd" },

    { user: "you", message: "xdddddd" },

    { user: "you", message: "xdddddd" },
  ];
  return (
    <>
      {true ? (
        <Dialog open={true}>
          <div className="dark-dialog" dividers id="scrollableDiv">
            <div className="dialog-top">
              <span>Comments</span>
              <IconButton>
                <CloseIcon style={{ color: "white" }} />
              </IconButton>
            </div>
            <div className="comments-container">
              {comments.map((comment) => (
                <div className="comment-container">
                  <div className="profile-comment-container">J</div>
                  <div className="comment-user-info">
                    <span>Name Surname</span>
                    <span className="comment">{comment.message}</span>
                  </div>
                  <IconButton>
                    <CloseIcon style={{ color: "red", marginRight: "1rem" }} />
                  </IconButton>
                </div>
              ))}
            </div>
            <div className="dialog-comment-bottom">
              <TextField
                style={{
                  width: "80%",
                  color: "black",
                }}
              ></TextField>
              <Button variant="contained">Send</Button>
            </div>
          </div>
        </Dialog>
      ) : null}
    </>
  );
}

export default CommentDialog;
