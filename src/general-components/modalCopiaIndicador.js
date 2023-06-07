import React from "react";
import Modal from "./modal";
import CopiarIndicadorForm from "./copiaIndicadorForm";

function ModalCopiaIndicador({ open, setOpen, indicadorActivo }) {
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
      title="Copiar inicador"
    >
        <CopiarIndicadorForm indicadorActivo={indicadorActivo}/>
    </Modal>
  );
}

export { ModalCopiaIndicador };