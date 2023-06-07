import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function TemporaryDrawer(props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && event.key === "escape") {
      props.handleClose();
    }

    //setState({ ...state, [props.position]: open });
  };

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={props.position}
          open={props.show}
          variant="temporary"
          onClose={() => {
            props.handleClose();
          }}
          hideBackdrop={props.hideBackdrop}
          onKeyDown={toggleDrawer(false)}
        >
          <Box
            sx={{
              width:
                props.position === "top" || props.position === "bottom"
                  ? "auto"
                  : 450,
              paddingTop: 10,
              paddingLeft: 5,
              paddingRight: 3,
            }}
            role="application"
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-end",
                marginTop: -60,
              }}
            >
              <IconButton
                aria-label="delete"
                size="small"
                onClick={props.handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
            <Box>
              <Typography variant="h6" gutterBottom component="div">
                {props.title}
              </Typography>
            </Box>

            <Divider />
            <div>{props.children}</div>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
