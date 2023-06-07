import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";

function PaperComponent(props) {
  return (
    // <Draggable
    //   handle="#draggable-dialog-title"
    //   cancel={'[class*="MuiDialogContent-root"]'}
    // >
      <Paper {...props} />
    /* </Draggable> */
  );
}

export default function DraggableDialog({
  title,
  open,
  text,
  handleCloseProp,
  onConfirm,
}) {
  //   const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    handleCloseProp();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="title"
      >
        <DialogTitle  id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            No
          </Button>
          <Button onClick={onConfirm}>Sí</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
