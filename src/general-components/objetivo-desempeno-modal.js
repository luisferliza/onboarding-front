import React, { useState, useEffect } from 'react'
import Modal from './modal'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { toast } from 'react-toastify'
import { useObjetivoDesempeno } from '../Hooks/useObjetivosDesempeno'

export function ObjetivoDesempenoModal({
  open,
  closeFn,
  onClickItem,
  mostrarPorcentaje = false
}) {
  const { objetivosDesempeno } = useObjetivoDesempeno()
  const [porcentaje, setPorcentaje] = useState(null)

  useEffect(() => {
    setPorcentaje(null)
  }, [open])

  return (
    <Modal title="Selecciona un pilar" open={open} handleClose={closeFn}>
      <div>
        <Grid container spacing={1}>
          {mostrarPorcentaje === true && (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                type="number"
                id="txtPorcentaje"
                label={'Porcentaje'}
                value={porcentaje}
                onChange={(event) => setPorcentaje(event.target.value)}
                margin="normal"
                inputProps={{ maxLength: 6 }}
                style={{ width: '100%' }}
                required={true}
              />
            </Grid>
          )}
        </Grid>

        <Grid item xs={12} lg={12} sm={12}>
          <Grid container spacing={1}>
            <List
              component="nav"
              aria-label="main mailbox folders"
              style={{ width: '100%' }}
            >
              {objetivosDesempeno.map((objetivo) => (
                <ListItem
                  button
                  onClick={() => {
                    if (mostrarPorcentaje === true) {
                      if (porcentaje === null || porcentaje <= 0) {
                        toast.warn(
                          'Debes asignar un porcentaje a esta etiqueta'
                        )
                        return
                      }

                      onClickItem(objetivo, porcentaje)
                    } else {
                      onClickItem(objetivo)
                    }
                  }}
                  style={{ width: '100% !important' }}
                >
                  <ListItemIcon>
                    <LocalOfferIcon />
                  </ListItemIcon>
                  <ListItemText primary={objetivo.nombre} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </div>
    </Modal>
  )
}
