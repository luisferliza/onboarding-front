import { Tooltip } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DEFAULT_DELAY } from '../../Utils/config'
import './logoComponent.css'

function LogoComponent() {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate(`/home`)
  }

  return (
    <Tooltip title="Menú principal" enterDelay={DEFAULT_DELAY}>
      <div
        className="logo-container"
        onClick={handleLogoClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="logo"></div>
      </div>
    </Tooltip>
  )
}

export default LogoComponent
