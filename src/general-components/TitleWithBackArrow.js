import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function TitleWithBackArrow({ title }) {
  const navigate = useNavigate()
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '10px'
      }}
    >
      <IconButton
        onClick={() => {
          navigate(-1)
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <h1>{title}</h1>
      <div></div>
    </div>
  )
}
