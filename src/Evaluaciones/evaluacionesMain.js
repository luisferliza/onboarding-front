import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useEvaluaciones } from '../Hooks/useEvaluaciones'
import { EvaluacionListItem } from './evaluacionListItem'
import SearchInput from '../Custom/searchInput'
import TitleWithBackArrow from '../general-components/TitleWithBackArrow'

export function EvaluacionesMain() {
  const { personalId } = useParams()
  const { evaluacionId } = useParams()
  const { evaluaciones, reloadEvaluaciones } = useEvaluaciones({ personalId })
  const [evaluacionesFiltradas, setEvaluacionesFiltradas] = useState([])
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
    </div>
  )
}
