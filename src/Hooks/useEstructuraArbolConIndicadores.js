import React from 'react'
import { useEffect } from 'react'
import { NodoContext } from '../Context/nodoContext'

export function useEstructuraArbolConIndicadores() {
  const { estructuraArbolNodosIndicadores, reloadNodosConIndicadores } =
    React.useContext(NodoContext)

  useEffect(() => {
    if (estructuraArbolNodosIndicadores.length > 0) return
    reloadNodosConIndicadores()
  }, [])

  return {
    estructuraArbol: estructuraArbolNodosIndicadores,
    actualizarEstructura: reloadNodosConIndicadores
  }
}
