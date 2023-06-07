import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getCriterios } from '../Api/criterios.api'

export function useCriterios() {
  const [criterios, setCriterios] = useState([])

  useEffect(() => {
    reloadCriterios()
  }, [])

  function reloadCriterios() {
    getCriterios().then((response) => {
      if (response.status === 200) {
        setCriterios(response.body)
      } else {
        toast.error('Error al obtener los criterios')
      }
    })
  }

  return { criterios, reloadCriterios }
}
