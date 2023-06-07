import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getEvaluaciones } from '../Api/evaluacion.api'

export function useEvaluaciones({ personalId }) {
  const [evaluaciones, setEvaluaciones] = useState([])
  const [matriz, setMatriz] = useState(null)

  useEffect(() => {
    reloadEvaluaciones()
  }, [])

  function reloadEvaluaciones() {
    getEvaluaciones({ personalId }).then((response) => {
      if (response.status === 200) {
        const evaluaciones = response.body.evaluaciones
        const matriz = response.body.matriz ?? null
        setEvaluaciones(evaluaciones)
        setMatriz(matriz)
      } else {
        toast.error('Error al obtener las evaluaciones')
      }
    })
  }

  return { evaluaciones, matriz, reloadEvaluaciones }
}
