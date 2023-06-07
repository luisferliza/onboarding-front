import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LogoComponent from './logoComponent'
import MySettings from './mySettingsComponent'
import Tooltip from '@mui/material/Tooltip'
import { DEFAULT_DELAY } from '../../Utils/config'

export default function DrawerTopBar({ open, setOpen }) {
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  return (
    <Toolbar
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ display: 'flex' }}>
        <Tooltip title="Abrir el drawer" enterDelay={DEFAULT_DELAY}>
          <IconButton
            color="inherit"
            aria-label="árbol de navegaciónr"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <LogoComponent />
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MySettings />
      </div>
    </Toolbar>
  )
}
