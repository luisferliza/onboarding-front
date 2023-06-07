import React, { UseState } from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

function OkCancelButtons({ okFn, cancelFn }) {
  return (
    <div>
      <Stack
        direction="row"
        spacing={1}
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <IconButton aria-label="aceptar" color="primary" onClick={okFn}>
          <CheckIcon />
        </IconButton>
        <IconButton aria-label="cancelar" color="secondary" onClick={cancelFn}>
          <CancelIcon />
        </IconButton>
      </Stack>
    </div>
  );
}

export default OkCancelButtons;
