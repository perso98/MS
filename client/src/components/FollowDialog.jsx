import React from "react";
import { Dialog, Button, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
function FollowDialog(props) {
  const users = [
    { name: "Micheal" },
    { name: "Micheal" },
    { name: "Micheal" },
    { name: "Micheal" },
    { name: "Micheal" },
    { name: "Micheal" },
    { name: "Micheal" },
    { name: "Micheal" },
    { name: "Micheal" },
    { name: "Micheal" },
    { name: "Micheal" },
    { name: "Micheal" },
  ];
  return (
    <Dialog onClose={props.handleClose} open={props.open}>
      <div className="dark-dialog">
        <div className="dialog-top">
          Follows
          <IconButton onClick={props.handleClose}>
            <CloseIcon style={{ color: "white" }} />
          </IconButton>
        </div>
        <div className="follow-dialog-container">
          {users.map((val, index) => (
            <div className="follow-dialog-element">
              <div className="dialog-element-user">
                <div className="post-avatar">N</div> {val.name}
              </div>
              <Button
                color="success"
                variant="contained"
                style={{ height: "2rem", marginRight: "1rem" }}
              >
                Follow
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
}

export default FollowDialog;
