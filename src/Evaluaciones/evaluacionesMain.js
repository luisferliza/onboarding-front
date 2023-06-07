import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useEvaluaciones } from '../Hooks/useEvaluaciones'
import { EvaluacionListItem } from './evaluacionListItem'
import SearchInput from '../Custom/searchInput'
import TitleWithBackArrow from '../general-components/TitleWithBackArrow'
import MatrizEvaluacion from './matrizEvaluacion'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useBlueprints } from '../Hooks/useBlueprint'

export function EvaluacionesMain() {
  const { personalId } = useParams()
  const { evaluacionId } = useParams()
  const { evaluaciones, matriz, reloadEvaluaciones } = useEvaluaciones({
    personalId
  })
  const { blueprints, realoadBlueprints } = useBlueprints()
  const [evaluacionesFiltradas, setEvaluacionesFiltradas] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [blueprintId, setBlueprintId] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    reloadEvaluaciones()
  }, [personalId])

  useEffect(() => {
    setEvaluacionesFiltradas(evaluaciones)
  }, [evaluaciones])

  const filterPeriodos = (e) => {
    setEvaluacionesFiltradas(
      evaluaciones.filter((evaluacion) =>
        evaluacion.nombre.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
  }

  function navigateToEmpleado(id) {
    navigate(`${id}`)
  }

  if (evaluacionId) return <Outlet />

  return (
    <div>
      <section>
        <TitleWithBackArrow title="Evaluaciones" />
      </section>
      <section
        style={{
          width: '250px',
          border: '1px solid black',
          borderRadius: '20px',
          margin: '20px'
        }}
      >
        <SearchInput onChange={filterPeriodos} />
      </section>
      {matriz && (
        <div
          style={{
            width: '90%',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          <CheckCircleIcon style={{ color: 'green' }} /> On boarding Completo!
        </div>
      )}
      <div style={{ width: '90%', margin: '0 auto' }}>
        {evaluacionesFiltradas.map((evaluacion) => {
          return (
            <EvaluacionListItem
              key={evaluacion.id}
              {...evaluacion}
              onClick={navigateToEmpleado}
            />
          )
        })}
      </div>
      {matriz && (
        <MatrizEvaluacion skills={matriz.skills} wills={matriz.wills} />
      )}
      <Fab
        disabled={evaluaciones.length === 2}
        onClick={() => setOpenModal(true)}
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#008000'
        }}
      >
        <AddIcon />
      </Fab>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Nueva evaluacion
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Seleccione el blueprint para la nueva evaluacion
          </Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={blueprintId}
            label="Blueprint"
            fullWidth
            onChange={(e) => setBlueprintId(e.target.value)}
            sx={{ mt: 2 }}
          >
            {blueprints.map((blueprint) => {
              return (
                <MenuItem value={blueprint.id}>{blueprint.nombre}</MenuItem>
              )
            })}
          </Select>
          <TextField
            id="filled-error"
            label="Fecha máxima de entrega"
            variant="filled"
            type="date"
            fullWidth
          />
          <Button style={{ marginTop: '20px' }} fullWidth>
            Crear
          </Button>
        </Box>
      </Modal>
    </div>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
}
