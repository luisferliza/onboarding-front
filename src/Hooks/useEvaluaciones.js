import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getEvaluaciones } from '../Api/evaluacion.api'

export function useEvaluaciones({ personalId }) {
  const [evaluaciones, setEvaluaciones] = useState([])

  useEffect(() => {
    reloadEvaluaciones()
  }, [])

  function reloadEvaluaciones() {
    getEvaluaciones({ personalId }).then((response) => {
      if (response.status === 200) {
        setEvaluaciones(response.body)
      } else {
        toast.error('Error al obtener las evaluaciones')
      }
    })
  }

  return { evaluaciones, reloadEvaluaciones }
}
