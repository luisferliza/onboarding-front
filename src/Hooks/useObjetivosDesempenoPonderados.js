import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getObjetivosDesempenoPonderados } from '../Api/objetivoDesempeno.api'

export function useObjetivosDesempenoPonderados(usuarioId) {
  const [objetivosDesempeno, setObjetivosDesempeno] = useState([])

  useEffect(() => {
    reloadObjetivosDesempeno(usuarioId)
  }, [usuarioId])

  function reloadObjetivosDesempeno(usuarioId) {
    getObjetivosDesempenoPonderados(usuarioId).then((response) => {
      if (response.status === 200) {
        setObjetivosDesempeno(response.body)
      } else {
        toast.error('Error al obtener los objetivos de desempeño')
      }
    })
  }

  return { objetivosDesempeno, reloadObjetivosDesempeno }
}
