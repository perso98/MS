import { Dialog, Button, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
function CommentDialog(props) {
  const comments = [
    { user: "you", message: "xdddddd" },
    { user: "you", message: "xdddddd" },

    { user: "x", message: "xdddddd" },

    { user: "x", message: "xdddddd" },

    { user: "you", message: "xdddddd" },

    {
      user: "you",
      message:
        "xddddddxddddddxddddddxddddddxddddddxddddddxddddddxddddddxddddddxddddddxddddddxddddddxddddddxddddddxdddddd",
    },

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
              {comments.map((comment, idx) => (
                <div className="comment-container" key={idx}>
                  <div className="profile-comment-container">J</div>
                  <div className="comment-user-info">
                    <span>Name Surname</span>
                    <div className="comment">
                      {comment.message}
                      <IconButton className="comment-like-container">
                        <span> 154</span>
                        <FavoriteIcon
                          style={{
                            marginLeft: "0.3rem",
                          }}
                        />
                      </IconButton>
                    </div>
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
