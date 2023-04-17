import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

function ActionAlerts(props) {
  return (
    <div sx={{ width: "100%" }}>
      <Collapse in={props.alert.open}>
        <Alert
          icon={
            props.alert.severity ? (
              <CheckIcon fontSize="inherit" style={{ fontSize: "1.5rem" }} />
            ) : (
              <PriorityHighIcon />
            )
          }
          severity={props.alert.severity ? "success" : "error"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                props.setAlert({ ...props.alert, open: false });
              }}
            >
              <CloseIcon />
            </IconButton>
          }
          sx={{ mt: 2, fontSize: "1.2rem" }}
        >
          {props.alert.info}
        </Alert>
      </Collapse>
    </div>
  );
}

export default ActionAlerts;
