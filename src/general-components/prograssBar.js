import { LinearProgress } from "@mui/material";
import { Box } from "devextreme-react";
import React from "react";

function LinearProgressWithLabel({ score, goal }) {    
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <LinearProgress
          variant="determinate"
          value={score}
          sx={{ width: "100%" }}
          color={score > goal? "success" : "error"}
        />
        <p style={{ fontSize: "10px", marginLeft: "5px" }}>{goal}</p>
      </div>
      <p style={{ fontSize: "10px", textAlign: "center" }}>{score || "N/A"}</p>
    </div>
  );
}

export { LinearProgressWithLabel };
