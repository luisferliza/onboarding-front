import React from "react";
import BlockIcon from "@mui/icons-material/Block";

function PermisionDeniedBar({display}) {
  if(!display) return null;
  return (
    <div
      style={{
        width: "100%",        
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: "#fcc1c1",
        border: "1px solid red",
        alignItems: "center",
        marginBottom: "10px",
        padding: "10px",
      }}
    >
      <BlockIcon
        fontSize="large"
        style={{ color: "red", marginRight: "2rem", marginLeft: "2rem" }}
      />
      <section
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <b style={{fontSize: "1.2rem"}}>Acceso Denegado</b>
        <p>
          No tienes permisos para ver este contenido, si crees que se trata de
          un error, contacta al administrador para obtener permisos.
        </p>
      </section>
    </div>
  );
}

export { PermisionDeniedBar };
