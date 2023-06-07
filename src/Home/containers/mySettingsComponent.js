import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../../Context/authContext'
import NameBasedIcon from './nameBasedIcon'
import style from './mySettings.module.css'

export default function MySettings() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { logout, getNombre } = React.useContext(AuthContext)
  const { setSelectedUser, getSelectedUserName, selectedUser } =
    React.useContext(AuthContext)
  const [username, setUsername] = React.useState(getNombre())

  React.useEffect(() => {
    setUsername(getSelectedUserName())
  }, [selectedUser])

  const navigate = useNavigate()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const closeSession = () => {
    logout()
    navigate(`/login`)
    toast.info('Sesión finalizada correctamente')
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMySettings = () => {
    navigate(`yo`)
    handleClose()
  }

  const asumirMiUsuario = () => {
    setSelectedUser(null)
    toast.success('Usuario asumido correctamente')
    handleClose()
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div className={style['name-container']}>
        <p>{username}</p>
        {selectedUser && (
          <p style={{ fontSize: '10px', textAlign: 'right' }}>{getNombre()}</p>
        )}
      </div>
      <NameBasedIcon username={username} onClick={handleMenu} />
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleMySettings}>Mi cuenta</MenuItem>
        <MenuItem onClick={asumirMiUsuario}>Regresar a mi usuario</MenuItem>
        <MenuItem onClick={closeSession}>Cerrar Sesión</MenuItem>
      </Menu>
    </div>
  )
}
