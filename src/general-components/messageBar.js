import React from 'react'
import BlockIcon from '@mui/icons-material/Block'

function MessageBar({ display, title, message, type }) {
  const color =
    type === 'error'
      ? 'red'
      : type === 'warning'
      ? 'orange'
      : type === 'success'
      ? 'green'
      : 'blue'

  if (!display) return null

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        backgroundColor: '#fcc1c1',
        border: `1px solid ${color}`,
        alignItems: 'center',
        marginBottom: '10px',
        padding: '10px'
      }}
    >
      <BlockIcon
        fontSize="large"
        style={{ color, marginRight: '2rem', marginLeft: '2rem' }}
      />
      <section
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column'
        }}
      >
        <b style={{ fontSize: '1.2rem' }}>{title}</b>
        <p>{message}</p>
      </section>
    </div>
  )
}

export { MessageBar }
