import React from 'react'
import PersonIcon from '@mui/icons-material/Person'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

export default function EmpleadoListItem({ id, nombre, puesto, onClick }) {
  const [mouseOver, setMouseOver] = React.useState(false)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '5px 0',
        backgroundColor: mouseOver ? '#f3efef' : '#fff',
        cursor: 'pointer',
        borderRadius: '10px',
        padding: '10px'
      }}
      onClick={() => onClick(id)}
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
    >
      <div
        style={{
          gap: '20px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <PersonIcon fontSize="large" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <b>{puesto}</b>
          <div>{nombre}</div>
        </div>
      </div>
      <ArrowForwardIosIcon fontSize="medium" color={mouseOver ? 'primary' : 'disabled'} />
    </div>
  )
}
