import React, { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4
}

export function ModalOpcionesVistaGlobal({
  open,
  handleClose,
  aplicarAPestanaActual,
  aplicarATodaLaVista
}) {
  useEffect(() => {
    if (open) {
    }
  }, [open])

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h2 id="transition-modal-title">Configuración global</h2>
            <p id="transition-modal-description">
              ¿Donde deseas aplicar la configuración?
            </p>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-evenly',
                margin: '10px'
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={handleClose}
                style={{ marginRight: '10px' }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={aplicarAPestanaActual}
                style={{ marginRight: '10px' }}
              >
                Pestaña actual
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={aplicarATodaLaVista}
              >
                Toda la vista
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
