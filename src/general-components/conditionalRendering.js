import React from "react";

function ConditionalRendering({ children, condition }) {
  if (condition) {
    return children;
  } else {
    return <></>;
  }
}

export { ConditionalRendering };