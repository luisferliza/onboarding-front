import React from 'react'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import { HOST } from '../../Utils/config'
import { AuthContext } from '../../Context/authContext'

export default function LoginInput() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const { login, setSelectedUser } = React.useContext(AuthContext)

  const navigate = useNavigate()

  function updateUsername(e) {
    setUsername(e.target.value)
  }

  function updatePassword(e) {
    setPassword(e.target.value)
  }

  function credentialsComplete() {
    return username !== '' && password !== ''
  }

  const handleOnSubmitLogin = async () => {
    setSelectedUser(null)
    if (credentialsComplete()) {
      setLoading(true)
      const response = await fetch(`${HOST}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario: username,
          password
        })
      })
      setLoading(false)
      if (response.ok) {
        response.json().then((res) => {
          login(JSON.stringify(res.body))
          navigate(`/home`)
        })
      } else {
        toast.error('Usuario o contraseña incorrecto')
      }
    } else {
      toast.warning('Ingrese un usuario y contraseña')
    }
  }

  return (
    <div style={centeredDiv}>
      <div style={loginContainer}>
        <h2>¡Bienvenido!</h2>
        <TextField
          id="outlined-username"
          label="Usuario"
          variant="outlined"
          value={username}
          onChange={updateUsername}
          sx={{ margin: '18px 0' }}
        />
        <TextField
          id="outlined-password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={updatePassword}
          type="password"
          sx={{ margin: '18px 0' }}
        />
        <div className="buttons__container">
          <Button
            variant="contained"
            color="success"
            sx={{ margin: '5px 0' }}
            disabled={loading}
            onClick={handleOnSubmitLogin}
          >
            Login
          </Button>
        </div>

        <p>¿Olvidaste tu contraseña?</p>
      </div>
    </div>
  )
}

const centeredDiv = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  height: 'calc(100vh - 90px)'
}

const loginContainer = {
  backgroundColor: 'white',
  borderRadius: '30px',
  padding: '20px',
  border: '3px solid rgb(128, 123, 123)',
  display: 'flex',
  flexDirection: 'column',
  width: '400px',
  minWidth: '350px',
  height: '380px',
  alignSelf: 'center'
}
