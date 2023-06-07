import React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function AccordionSection({
  id,
  name,
  description,
  children,
  expanded,
  handleChange,
  options
}) {
  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1d-content"
        id={id}
        sx={{ backgroundColor: "#f5f5f5", borderRadius: "1rem" }}
        onClick={handleChange}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            <b>{name}</b>
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            <i>{description}</i>
          </Typography>
          <div>
            {options}
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails
        sx={{ border: "2px solid #f5f5f5", borderRadius: "1rem" }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
}

export { AccordionSection };
