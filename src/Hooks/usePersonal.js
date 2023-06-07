import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getPersonalAMiCargo } from '../Api/personal.api'

export function usePersonal() {
  const [empleados, setEmpleados] = useState([])

  useEffect(() => {
    reloadPersonal()
  }, [])

  function reloadPersonal() {
    getPersonalAMiCargo().then((response) => {
      if (response.status === 200) {
        setEmpleados(response.body)
      } else {
        toast.error('Error al obtener el personal')
      }
    })
  }

  return { empleados, reloadPersonal }
}
