import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import React from "react";

function ConfirmDialog(props) {
  return (
    <Dialog open={props.confirmDialog.open} onClose={() => props.handleClose()}>
      <div className="confirm-dialog-container">
        <div className="confirm-top-dialog">
          <span>{props.confirmDialog.text}</span>
          <IconButton onClick={() => props.handleClose()}>
            <CloseIcon style={{ color: "white" }} />
          </IconButton>
        </div>
        <div className="confirm-bottom-dialog">
          <Button
            variant="contained"
            color="success"
            onClick={props.confirmDialog.onClick}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => props.handleClose()}
          >
            No
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default ConfirmDialog;
