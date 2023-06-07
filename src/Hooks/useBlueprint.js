import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getBlueprints } from '../Api/blueprint'

export function useBlueprints() {
  const [blueprints, setBlueprints] = useState([])

  useEffect(() => {
    realoadBlueprints()
  }, [])

  function realoadBlueprints() {
    getBlueprints().then((response) => {
      if (response.status === 200) {
        setBlueprints(response.body)
      } else {
        toast.error('Error al obtener los blueprints')
      }
    })
  }

  return { blueprints, realoadBlueprints }
}
