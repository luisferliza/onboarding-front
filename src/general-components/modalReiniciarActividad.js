import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { PeriodoContext } from "../Context/periodoContext";
import { NodoContext } from "../Context/nodoContext";
import { reiniciarActividadPeriodo } from "../Api/periodo.api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

export function ModalReiniciarActividad(props) {
  const { getUnicoPeriodoSeleccionado } = React.useContext(PeriodoContext);
  const { setLoading, setLoadingMessage } = React.useContext(NodoContext);
  useEffect(() => {
    if (props.open) {
    }
  }, [props.open]);

  async function reiniciarActividad() {
    setLoadingMessage("Reiniciando actividad...");
    setLoading(true);
    const resp = await reiniciarActividadPeriodo(
      props.nodoId,
      getUnicoPeriodoSeleccionado().id
    );
    if (resp.status === 200) {
      toast.success("Actividad reiniciada con éxito");
    } else {
      toast.error("Error reiniciando actividad...");
    }
    props.handleClose();
    setLoading(false);
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <h2 id="transition-modal-title">Reiniciar Actividad</h2>
            <p id="transition-modal-description">
              ¿Está seguro que desea reiniciar la actividad para el periodo{" "}
              <b>{getUnicoPeriodoSeleccionado()?.nombre}</b>?
            </p>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                margin: "10px",                
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={props.handleClose}
                style={{ marginRight: "10px" }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={reiniciarActividad}
                style={{ marginRight: "10px" }}
              >
                Reiniciar
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
