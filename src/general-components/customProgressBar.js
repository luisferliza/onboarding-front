import React from "react";

function CustomProgressBar({ score, goal, barColor, inverseGoal }) {
  const HEIGHT = "6px";
  const BAR_WIDTH =
    goal === 0 ? "0%" : score > goal ? "100%" : `${(score / goal) * 100}%`;  
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            height: HEIGHT,
            borderRadius: "50px",
          }}
        >
          <div
            style={{
              backgroundColor: barColor,
              width: BAR_WIDTH,
              height: HEIGHT,
              borderRadius: "50px",
            }}
          ></div>
        </div>
        <p style={{ fontSize: "10px", paddingLeft: "5px" }}>{goal}</p>
      </div>
      <p style={{ fontSize: "10px", textAlign: "center" }}>{score || "N/A"}</p>
    </div>
  );
}

export { CustomProgressBar };
