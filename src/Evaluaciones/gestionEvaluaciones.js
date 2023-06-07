import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useEvaluacion } from '../Hooks/useEvaluacion'
import { useEffect } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useCriterios } from '../Hooks/useCriterios'
import { putPregunta } from '../Api/preguntas.api'
import { toast } from 'react-toastify'
import TitleWithBackArrow from '../general-components/TitleWithBackArrow'
import { putEvaluacion } from '../Api/evaluacion.api'

export default function GestionEvaluaciones() {
  const { evaluacionId } = useParams()
  const { criterios } = useCriterios()
  const ref = useRef(null)
  const { evaluacion, reloadEvaluacion } = useEvaluacion({ evaluacionId })

  const disabled = evaluacion.completa || evaluacion.disabled

  useEffect(() => {
    reloadEvaluacion()
  }, [evaluacionId])

  const handlePreguntaChange = (preguntaId, valor) => {
    putPregunta({ preguntaId, pregunta: { valor } }).then((res) => {
      if (res.status !== 200) {
        toast.error('Error al actualizar la pregunta')
        reloadEvaluacion()
      }
    })
  }

  const handleComentarioChange = () => {
    putEvaluacion({
      evaluacionId: evaluacion.id,
      evaluacion: {
        comentarios: ref.current.value
      }
    }).then((res) => {
      if (res.status !== 200) {
        toast.error('Error al actualizar la evaluación')
      }
    })
  }

  const handleCompletarEvaluacion = () => {
    putEvaluacion({
      evaluacionId: evaluacion.id,
      evaluacion: {
        completa: true
      }
    }).then((res) => {
      if (res.status !== 200) {
        toast.error('Error al completar la evaluación')
      } else {
        toast.success('Evaluación actualizada')
        reloadEvaluacion()
      }
    })
  }

  return (
    <Paper
      elevation={6}
      sx={{
        margin: '10px',
        padding: '10px',
        minHeight: 'calc(100vh - 120px)'
      }}
    >
      <TitleWithBackArrow title={evaluacion.nombre} />

      {evaluacion.tiposEvaluacion?.map((tipoEvaluacion) => {
        return (
          <Paper
            key={tipoEvaluacion.id}
            elevation={6}
            sx={{
              margin: '10px',
              padding: '10px'
            }}
          >
            <b>{tipoEvaluacion.nombre}</b>
            {tipoEvaluacion.secciones?.map((seccion) => {
              return (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{seccion.nombre}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {seccion.preguntas?.map((pregunta) => {
                      return (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingLeft: '20px'
                          }}
                        >
                          <i>{pregunta.descripcion}</i>
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                              defaultValue={pregunta.valor}
                              onChange={(e) => {
                                handlePreguntaChange(
                                  pregunta.id,
                                  e.target.value
                                )
                              }}
                            >
                              {criterios?.map((criterio, index) => {
                                console.log({ criterio })
                                console.log({ pregunta })
                                return (
                                  <FormControlLabel
                                    value={criterio.valor}
                                    control={<Radio />}
                                    label={`${criterio.nombre} (${criterio.valor}%)`}
                                    labelPlacement="bottom"
                                    disabled={disabled}
                                  />
                                )
                              })}
                            </RadioGroup>
                          </FormControl>
                        </div>
                      )
                    })}
                  </AccordionDetails>
                </Accordion>
              )
            })}
          </Paper>
        )
      })}
      <Paper
        elevation={6}
        sx={{
          margin: '10px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <b>Comentarios</b>
        <TextField
          id="standard-multiline-static"
          multiline
          rows={4}
          placeholder="Escribe tus comentarios aquí..."
          variant="standard"
          inputRef={ref}
          disabled={disabled}
          defaultValue={evaluacion.comentarios}
          onBlur={handleComentarioChange}
        />
      </Paper>
      {!evaluacion.completa && (
        <Button variant="contained" onClick={handleCompletarEvaluacion}>
          Completar evaluación
        </Button>
      )}
    </Paper>
  )
}
