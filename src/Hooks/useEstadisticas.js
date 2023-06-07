import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getEstadisticas } from '../Api/estadisticas'

export function useEstadisticas() {
  const [estadisticas, setEstadisticas] = useState([])

  useEffect(() => {
    reloadEstadisticas()
  }, [])

  function reloadEstadisticas() {
    getEstadisticas().then((response) => {
      if (response.status === 200) {
        setEstadisticas(response.body)
      } else {
        toast.error('Error al obtener los criterios')
      }
    })
  }

  return { estadisticas, reloadEstadisticas }
}
