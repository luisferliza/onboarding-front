import React from 'react'
import { HOST } from '../../Utils/config'
import LoginInput from '../components/loginInputContainer'

export default function Login() {
  React.useEffect(() => {
    /*fetch(HOST).then((response) => {
      // Esta funcion hace que se disminuya el cold start
      console.log('Funcion despertada', response)
    })*/
  }, [])

  return <LoginInput />
}
