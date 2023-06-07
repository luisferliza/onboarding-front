import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getObjetivosDesempeno } from '../Api/objetivoDesempeno.api'

export function useObjetivoDesempeno() {
  const [objetivosDesempeno, setObjetivosDesempeno] = useState([])

  useEffect(() => {
    reloadObjetivosDesempeno()
  }, [])

  function reloadObjetivosDesempeno() {
    getObjetivosDesempeno().then((response) => {
      if (response.status === 200) {
        setObjetivosDesempeno(response.body)
      } else {
        toast.error('Error al obtener los objetivos de desempeño')
      }
    })
  }

  return { objetivosDesempeno, reloadObjetivosDesempeno }
}
