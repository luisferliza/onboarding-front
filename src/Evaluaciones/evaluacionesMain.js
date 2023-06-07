import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useEvaluaciones } from '../Hooks/useEvaluaciones'
import { EvaluacionListItem } from './evaluacionListItem'
import SearchInput from '../Custom/searchInput'
const userId = '1'

export function EvaluacionesMain() {
  const { evaluaciones, reloadEvaluaciones } = useEvaluaciones({ userId })
  const [evaluacionesFiltradas, setEvaluacionesFiltradas] = useState([])
  const { evaluacionId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    reloadEvaluaciones()
  }, [userId])

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
        <h1>Realizar evaluación</h1>
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
