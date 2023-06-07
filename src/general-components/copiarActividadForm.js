import { Button } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { copiarNodo } from "../Api/nodos.api";
import { NodoContext } from "../Context/nodoContext";
import ProcessTree from "../TreeView/ProcessTree";

export default function CopiarActividadForm() {
  const [procesoDestino, setProcesoDestino] = React.useState(null);
  const { nodoActual, reloadTree } = React.useContext(NodoContext);

  function handleCopy() {
    if (procesoDestino === null) {
      toast.error("Debe seleccionar un proceso destino");
      return;
    }
    const settings = {
      procesoDestinoId: procesoDestino.id,
      actividadId: nodoActual.id,
    };
    copiarNodo(settings).then((response) => {
      if (response.status === 201) {
        toast.success("Actividad copiada con éxito");
        reloadTree();
      } else {
        toast.error("Error al copiar la actividad");
      }
    });
  }
  function handleSelect(nodo) {
    if (nodo.tipoNodoId === 2) {
      setProcesoDestino(nodo);
    } else {
      setProcesoDestino(null);
    }
  }

  return (
    <div>
      <br />
      {procesoDestino ? (
        <p>
          Proceso destino: <b>{procesoDestino.nombre}</b>
        </p>
      ) : (
        <p>Seleccione un proceso destino</p>
      )}
      <div style={{ maxHeight: "calc(100vh*0.7)", overflow: "auto" }}>
        <ProcessTree onNodeClick={handleSelect} fontColor="black" />
      </div>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "10px", float: "right" }}
        onClick={handleCopy}
      >
        Copiar
      </Button>
    </div>
  );
}
