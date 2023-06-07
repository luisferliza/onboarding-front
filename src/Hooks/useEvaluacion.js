import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getEvaluacion } from '../Api/evaluacion.api'

export function useEvaluacion({ evaluacionId }) {
  const [evaluacion, setEvaluacion] = useState({
    completa: true
  })

  useEffect(() => {
    reloadEvaluacion()
  }, [])

  function reloadEvaluacion() {
    getEvaluacion({ evaluacionId }).then((response) => {
      if (response.status === 200) {
        setEvaluacion(response.body)
      } else {
        toast.error('Error al obtener las evaluaciones')
      }
    })
  }

  return { evaluacion, reloadEvaluacion }
}
