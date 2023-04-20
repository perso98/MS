import React from "react";
import { TextField, makeStyles } from "@material-ui/core";

import { IconButton, InputAdornment } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important",
  },
}));
function DarkTextField(props) {
  const classes = useStyles();
  return (
    <TextField
      variant="outlined"
      margin="normal"
      label={props.label}
      style={{ width: props.width }}
      onChange={(e) => props.setOnChange(e.target.value)}
      inputProps={{
        style: {
          color: "white",
        },
      }}
      InputLabelProps={{
        style: {
          color: "white",
        },
      }}
      InputProps={{
        classes: {
          notchedOutline: classes.notchedOutline,
        },

        startAdornment: props.adornment ? (
          <InputAdornment
            position="end"
            style={{ position: "absolute", right: 0 }}
          >
            <IconButton
              style={{ color: "white" }}
              onClick={props.adornmentOnClick}
              disabled={!props.value}
            >
              {props.adornmentIcon}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
}

export default DarkTextField;
