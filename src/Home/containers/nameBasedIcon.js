import { width } from "@mui/system";
import React, { useEffect } from "react";

export default function NameBasedIcon({ username, onClick }) {
  const [nombre, setNombre] = React.useState("");

  useEffect(() => {
    getNameInititals();
  }, [username]);

  function getNameInititals() {
    if (username) {      
      const nameArray = username.split(" ");        
      if (nameArray.length === 1) {
        setNombre(nameArray[0].substring(0, 2));
      } else if (nameArray.length === 2) {
        setNombre(nameArray[0].substring(0, 1) + nameArray[1].substring(0, 1));
      } else {
        setNombre(nameArray[0].substring(0, 1) + nameArray[2].substring(0, 1));
      }
    }
  }

  return (
    <section
      style={{
        background: "green",
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20px",
        border: "2px solid gray",
        cursor: "pointer",
        marginLeft: "10px",
        color: "white",
      }}
      onClick={onClick}
    >
      <p>{nombre}</p>
    </section>
  );
}

export { NameBasedIcon };
