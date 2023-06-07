import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Outlet } from 'react-router-dom'
import { AppBar } from '../containers/drawerAppBar'
import { DrawerHeader } from '../containers/drawerHeader'
import { Main } from '../containers/drawerMain'
import './layout.css'
import { MainMenu } from '../../Menu/mainMenu'
import { LayoutContext } from '../../Context/layoutContext'
import { Tooltip } from '@mui/material'
import { DEFAULT_DELAY } from '../../Utils/config'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import DrawerTopBar from '../containers/drawerTopbar'
import style from '../../Styles/main.module.css'

const drawerWidth = 300

export default function MainDrawer() {
  const theme = useTheme()
  const { isDrawerOpen, setDrawerOpen } = React.useContext(LayoutContext)
  const [closeIconColor, setCloseIconColor] = React.useState('inherit')

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={isDrawerOpen}
        drawerwidth={drawerWidth}
        sx={{
          backgroundColor: '#202e3c',
          flex: 1
        }}
      >
        <DrawerTopBar
          open={isDrawerOpen}
          setOpen={setDrawerOpen}
        ></DrawerTopBar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
        PaperProps={{
          sx: {
            backgroundColor: '#202e3c',
            color: 'white'
          }
        }}
      >
        <DrawerHeader>
          <Tooltip title="Cerrar el menú" enterDelay={DEFAULT_DELAY}>
            <IconButton
              color={closeIconColor}
              onClick={handleDrawerClose}
              onMouseEnter={() => setCloseIconColor('error')}
              onMouseLeave={() => setCloseIconColor('inherit')}
            >
              {theme.direction === 'ltr' ? <CloseIcon /> : <CloseIcon />}
            </IconButton>
          </Tooltip>
        </DrawerHeader>
        <Divider />
        <div className={style.sidebar}>
          <MainMenu />
        </div>
      </Drawer>
      <Main open={isDrawerOpen} drawerwidth={drawerWidth}>
        <DrawerHeader />
        <div
          className={isDrawerOpen ? style['content-reduced'] : style.content}
          data-testid="content"
        >
          <Outlet />
        </div>
      </Main>
    </Box>
  )
}
