import React from 'react'
import { useEstadisticas } from '../../Hooks/useEstadisticas'
import { Paper } from '@mui/material'
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Legend,
  Export,
  Tooltip
} from 'devextreme-react/chart'

export default function Home() {
  const { estadisticas, reloadEstadisticas } = useEstadisticas()

  function customizeTooltip(arg) {
    return {
      text: `${arg.argument} - ${arg.seriesName}: ${arg.valueText}`
    }
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '90vh'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
          gap: '20px'
        }}
      >
        <Paper
          elevation={3}
          style={{
            height: '200px',
            width: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'green',
            borderRadius: '20px',
            color: 'white'
          }}
        >
          <h1>{estadisticas.completos}</h1>
          <b>Onboardings Completos</b>
        </Paper>
        <Paper
          elevation={3}
          style={{
            height: '200px',
            width: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'orange',
            borderRadius: '20px',
            color: 'black'
          }}
        >
          <h1>{estadisticas.pendientes}</h1>
          <b>Onboardings pendientes</b>
        </Paper>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Chart
          id="chart"
          palette="Soft"
          title="Onboardings realizados por puesto"
          dataSource={estadisticas.puestos}
          style={{ width: '900px' }}
        >
          <CommonSeriesSettings argumentField="puesto" type="bar" />
          <Series valueField="pendientes" name="Onboardings pendientes" />
          <Series valueField="completos" name="Onboardings completos" />
          <Legend />
          <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
          <Export enabled={true} />
        </Chart>
      </div>
    </div>
  )
}
