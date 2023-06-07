import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function NavBar() {
  const navigate = useNavigate()
  function login() {
    navigate(`/login`)
  }

  function signin() {
    navigate(`/signup`)
  }
  return (
    <>
      <div>
        <header style={loginHeader}>
          <p>Procesos e indicadores</p>
          <div>
            {/* <OutlinedButton
              onClick={login}
              color="success"
              sx={{ margin: "0 10px" }}
            >
              Login
            </OutlinedButton>
            <OutlinedButton
              onClick={signin}
              color="success"
              sx={{ margin: "0 10px" }}
            >
              Crear Usuario
            </OutlinedButton> */}
          </div>
        </header>
      </div>
      <Outlet />
    </>
  )
}

const loginHeader = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: '#202e3c',
  color: 'white',
  fontSize: 18,
  height: '60px',
  alignItems: 'center',
  padding: '10px 10%',
  borderBottom: '1px solid black'
}
