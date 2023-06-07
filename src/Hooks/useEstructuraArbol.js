import React from 'react'
import { useEffect } from 'react'
import { NodoContext } from '../Context/nodoContext'

export function useEstructuraArbol() {
  const { reloadTree, estructuraArbolNodos } = React.useContext(NodoContext)

  useEffect(() => {
    if (estructuraArbolNodos.length > 0) return
    reloadTree()
  }, [])

  return {
    estructuraArbol: estructuraArbolNodos,
    actualizarEstructura: reloadTree
  }
}
