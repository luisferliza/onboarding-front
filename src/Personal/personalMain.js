import React from 'react'
import { usePersonal } from '../Hooks/usePersonal'
import { Paper } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

export default function PersonalMain() {
  const { empleados, reloadPersonal } = usePersonal()
  const navigate = useNavigate()
  const { personalId } = useParams()

  const getRandomImage = () => {
    // get random number from 1 to 7
    const num = Math.floor(Math.random() * 7) + 1
    return `/a${num}.webp`
  }

  const handleClick = (id) => {
    navigate(`${id}`)
  }

  if (personalId) return <Outlet />

  return (
    <div>
      <h1>Personal a mi cargo</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around'
        }}
      >
        {empleados.map((empleado) => {
          return (
            <Paper
              key={empleado.id}
              elevation={6}
              sx={{
                width: '200px',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '10px',
                padding: '10px',
                cursor: 'pointer'
              }}
              onClick={() => handleClick(empleado.id)}
            >
              <img
                src={getRandomImage()}
                alt="Foto"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%'
                }}
              />
              <b
                style={{
                  textAlign: 'center',
                  fontSize: '12px'
                }}
              >
                {empleado.nombreCompleto}
              </b>
              {empleado.onboardingCompleto ? (
                <>
                  <CheckCircleIcon style={{ color: 'green' }} />
                  <p
                    style={{
                      textAlign: 'center',
                      fontSize: '12px',
                      color: 'green'
                    }}
                  >
                    Onboarding completo
                  </p>
                </>
              ) : (
                <>
                  <CancelIcon style={{ color: 'red' }} />
                  <p
                    style={{
                      textAlign: 'center',
                      fontSize: '12px',
                      color: 'red'
                    }}
                  >
                    Onboarding incompleto
                  </p>
                </>
              )}
            </Paper>
          )
        })}
      </div>
    </div>
  )
}
