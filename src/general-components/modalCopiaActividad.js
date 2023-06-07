import React from "react";
import Modal from "./modal";
import CopiarActividadForm from "./copiarActividadForm";

function ModalCopiaActividad({ open, setOpen }) {
  function handleCloseModal() {
    setOpen(false);
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}      
      handleClose={handleCloseModal}
      closeAfterTransition
      title="Copiar actividad"
    >
        <CopiarActividadForm />
    </Modal>
  );
}

export { ModalCopiaActividad };