import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

export function TooltipIconButton({color, icon, tooltip, onClick}) {
  return (
    <Tooltip title={tooltip}>
        <IconButton color={color} onClick={onClick}>
            {icon}
        </IconButton>
    </Tooltip>
  )
}
