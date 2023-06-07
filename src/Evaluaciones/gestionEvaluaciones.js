import React from 'react'
import { useParams } from 'react-router-dom'
import { useEvaluacion } from '../Hooks/useEvaluacion'
import { useEffect } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useCriterios } from '../Hooks/useCriterios'

export default function GestionEvaluaciones() {
  const { evaluacionId } = useParams()
  const { criterios } = useCriterios()
  const { evaluacion, reloadEvaluacion } = useEvaluacion({ evaluacionId })

  useEffect(() => {
    reloadEvaluacion()
  }, [evaluacionId])

  console.log({ evaluacion })
  console.log({ criterios })

  return (
    <div>
      <h1>{evaluacion.nombre}</h1>
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
                            >
                              {criterios?.map((criterio) => {
                                return (
                                  <FormControlLabel
                                    defaultChecked={
                                      criterio.valor === pregunta.valor
                                    }
                                    value={criterio.valor}
                                    control={<Radio />}
                                    label={criterio.nombre}
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
    </div>
  )
}
