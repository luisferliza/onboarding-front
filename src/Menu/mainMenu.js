import * as React from 'react'
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { NonDecoratedLink } from '../Custom/nonDecoratedLink'
import { ListItemButton } from '@mui/material'
import styled from '@emotion/styled'
import ApartmentIcon from '@mui/icons-material/Apartment'
import ListAltIcon from '@mui/icons-material/ListAlt'
import GradingIcon from '@mui/icons-material/Grading'
import PeopleIcon from '@mui/icons-material/People'

const CustomizedListItemButton = styled(ListItemButton)`
  &.Mui-selected {
    background-color: #acb236;
  }
  &.Mui-selected:hover {
    background-color: #acb236;
  }
  :hover {
    background-color: rgba(172, 178, 54, 0.2);
  }
`

function MainMenu() {
  const handleListItemClick = (event, index) => {
    //setSelectedIndex(index)
  }

  React.useEffect(() => {}, [])

  return (
    <List>
      <NonDecoratedLink to="/proceso" visible>
        <CustomizedListItemButton
          selected={false}
          onClick={(e) =>
            //menuItem.onClick(e, handleListItemClick, setDisplayTreeView)
            console.log('click')
          }
          sx={{ pl: 4 }}
        >
          <ListItemIcon sx={{ color: 'white' }}>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Plantillas" />
        </CustomizedListItemButton>
      </NonDecoratedLink>
      <NonDecoratedLink to="/home/evaluaciones" visible>
        <CustomizedListItemButton
          selected={false}
          onClick={(e) =>
            //menuItem.onClick(e, handleListItemClick, setDisplayTreeView)
            console.log('click')
          }
          sx={{ pl: 4 }}
        >
          <ListItemIcon sx={{ color: 'white' }}>
            <GradingIcon />
          </ListItemIcon>
          <ListItemText primary="Mis Evaluaciones" />
        </CustomizedListItemButton>
      </NonDecoratedLink>
      <NonDecoratedLink to="/home/personal" visible>
        <CustomizedListItemButton
          selected={false}
          onClick={(e) =>
            //menuItem.onClick(e, handleListItemClick, setDisplayTreeView)
            console.log('click')
          }
          sx={{ pl: 4 }}
        >
          <ListItemIcon sx={{ color: 'white' }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Personal a mi cargo" />
        </CustomizedListItemButton>
      </NonDecoratedLink>
    </List>
  )
}

export { MainMenu }
