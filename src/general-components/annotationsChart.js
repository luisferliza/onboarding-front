import React from "react";
import PieChart, { Series, Tooltip, Export } from "devextreme-react/pie-chart";
import { IconButton, Paper, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const populationData = [
  {
    name: "California",
    population: 38802500,
    capital: "Sacramento",
    area: 423967,
    comments: [
      {
        user: 3016940280101,
        comment: "This is a comment",
      },
      {
        user: 3016940280102,
        comment: "This is a comment",
      },
    ],
  },
  {
    name: "Texas",
    population: 26956958,
    capital: "Austin",
    area: 695662,
    comments: [
      {
        user: 3016940280101,
        comment: "This is a comment",
      },
      {
        user: 3016940280102,
        comment: "This is a comment",
      },
    ],
  },
  {
    name: "Florida",
    population: 19893297,
    capital: "Tallahassee",
    area: 170312,
    comments: [
      {
        user: 3016940280101,
        comment: "This is a comment",
      },
      {
        user: 3016940280102,
        comment: "This is a comment",
      },
    ],
  },
  {
    name: "New York",
    population: 19746227,
    capital: "Albany",
    area: 141297,
    comments: [
      {
        user: 3016940280101,
        comment: "This is a comment",
      },
      {
        user: 3016940280102,
        comment: "This is a comment",
      },
    ],
  },
  {
    name: "Illinois",
    population: 12880580,
    capital: "Springfield",
    area: 149995,
    comments: [
      {
        user: 3016940280101,
        comment: "This is a comment",
      },
      {
        user: 3016940280102,
        comment: "This is a comment",
      },
    ],
  },
  {
    name: "Pennsylvania",
    population: 12787209,
    capital: "Harrisburg",
    area: 119280,
    comments: [
      {
        user: 3016940280101,
        comment: "This is a comment",
      },
      {
        user: 3016940280102,
        comment: "This is a comment",
      },
    ],
  },
  {
    name: "Ohio",
    population: 11594163,
    capital: "Columbus",
    area: 116098,
    comments: [
      {
        user: 3016940280101,
        comment: "This is a comment",
      },
      {
        user: 3016940280102,
        comment: "This is a comment",
      },
    ],
  },
  {
    name: "Georgia",
    population: 10097343,
    capital: "Atlanta",
    area: 153910,
    comments: [
      {
        user: 3016940280101,
        comment: "This is a comment",
      },
      {
        user: 3016940280102,
        comment: "This is a comment",
      },
    ],
  },
  {
    name: "North Carolina",
    population: 9943964,
    capital: "Raleigh",
    area: 139391,
    comments: [
      {
        user: 3016940280101,
        comment: "This is a comment",
      },
      {
        user: 3016940280102,
        comment: "This is a comment",
      },
    ],
  },
  {
    name: "Michigan",
    population: 9909877,
    capital: "Lansing",
    area: 250487,
    comments: [
      {
        user: 3016940280101,
        comment: "This is a comment",
      },
      {
        user: 3016940280102,
        comment: "This is a comment",
      },
    ],
  },
];

export function AnnotationsChart() {
  return (
    <PieChart
      id="pie-chart"
      dataSource={populationData}
      title="Top 10 Most Populated States in US"
      palette="Bright"
    >
      <Series argumentField="name" valueField="population" />
      <Tooltip enabled={false} contentRender={TooltipTemplate} interactive />
      <Export enabled={true} />
    </PieChart>
  );
}

const formatNumber = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
}).format;

function TooltipTemplate(info) {
  return (
    <div className="state-tooltip" onClick={() => console.log("Clicked")}>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        {info.point.data.comments.map((comment, index) => (
          <Paper sx={{ padding: "10px" }} key={index}>
            {comment.comment}
          </Paper>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <IconButton color="primary" aria-label="Post comment" component="label">
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}
