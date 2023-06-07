import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchInput from '../Custom/searchInput'
import TitleWithBackArrow from '../general-components/TitleWithBackArrow'
import { useBlueprints } from '../Hooks/useBlueprint'
import { EvaluacionListItem } from '../Evaluaciones/evaluacionListItem'

export function TemplateMain() {
  //const { personalId } = useParams()
  const { blueprints, realoadBlueprints } = useBlueprints()
  const [blueprintsFiltrados, setBlueprintsFiltrados] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setBlueprintsFiltrados(blueprints)
  }, [blueprints])

  const filterPeriodos = (e) => {
    setBlueprintsFiltrados(
      blueprints.filter((blueprints) =>
        blueprints.nombre.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
  }

  function navigateToEmpleado(id) {
    navigate(`${id}`)
  }

  return (
    <div>
      <section>
        <TitleWithBackArrow title="Plantillas de evaluación" />
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
        {blueprintsFiltrados.map((evaluacion) => {
          return (
            <EvaluacionListItem
              key={evaluacion.id}
              {...evaluacion}
              onClick={() => console.log('click')}
            />
          )
        })}
      </div>
    </div>
  )
}
