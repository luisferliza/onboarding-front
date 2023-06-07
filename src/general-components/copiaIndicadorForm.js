import React from 'react'
import { copiarIndicador } from '../Api/indicadores.api'
import { toast } from 'react-toastify'
import { Button } from '@mui/material'
import { modosIntegracion, TIPOS_NODO } from '../Utils/enums'
import ProcessTree from '../TreeView/ProcessTree'

export default function CopiarIndicadorForm({ indicadorActivo }) {
  const [nodoDestino, setNodoDestino] = React.useState(null)

  function handleCopy() {
    if (indicadorActivo === {}) {
      return toast.warn('No se ha seleccionado ningún indicador')
    }
    if (nodoDestino === null) {
      return toast.warn('Debe seleccionar un proceso o actividad destino')
    }
    if (
      nodoDestino.tipoNodoId === TIPOS_NODO.PROCESO &&
      indicadorActivo.modoIntegracionId !== modosIntegracion.calculado
    ) {
      return toast.warn(
        'Solo se pueden copiar indicadores calculados a procesos'
      )
    }
    const settings = {
      nodoId: nodoDestino.id,
      indicadorId: indicadorActivo.id
    }
    copiarIndicador(settings).then((response) => {
      if (response.status === 201) {
        toast.success('indicador copiado con éxito')
      } else {
        toast.error('Error al copiar el indicador')
      }
    })
  }

  function handleSelect(nodo) {
    setNodoDestino(nodo)
  }

  return (
    <div>
      <br />
      {nodoDestino ? (
        <p>
          {nodoDestino.tipoNodoId === TIPOS_NODO.PROCESO
            ? 'Proceso destino:'
            : 'Actividad destino:'}{' '}
          <b>{nodoDestino.nombre}</b>
        </p>
      ) : (
        <p>Seleccione un proceso o actividad destino</p>
      )}
      <div style={{ maxHeight: 'calc(100vh*0.7)', overflow: 'auto' }}>
        <ProcessTree onNodeClick={handleSelect} fontColor="black" />
      </div>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '10px', float: 'right' }}
        onClick={handleCopy}
      >
        Copiar
      </Button>
    </div>
  )
}
