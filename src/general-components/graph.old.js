import React, { useEffect } from 'react'
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  Tooltip,
  Label,
  ZoomAndPan,
  ScrollBar,
  ValueAxis,
  Point,
  Animation,
  ConstantLine
} from 'devextreme-react/chart'
import {
  IconButton,
  Paper,
  Tooltip as MUITooltip,
  TextField,
  Chip
} from '@mui/material'
import { LayoutContext } from '../Context/layoutContext'
import DeleteIcon from '@mui/icons-material/Delete'
import { DEFAULT_DELAY } from '../Utils/config'
import { ConditionalRendering } from './conditionalRendering'
import { CHARTS_COLORS, MODO_INTEGRACION_GLOBAL } from '../Utils/enums'
import BarChartIcon from '@mui/icons-material/BarChart'
import TimelineIcon from '@mui/icons-material/Timeline'
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import GridOnIcon from '@mui/icons-material/GridOn'
import InsertChartIcon from '@mui/icons-material/InsertChart'
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart'
import { useParams } from 'react-router-dom'
import { ChartTable } from './chartTable'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'
import { addAnnotation } from '../Api/vistaInforme.api'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AuthContext } from '../Context/authContext'
import moment from 'moment'
import tooltipStyles from './chartTooltip.module.css'
import AbcIcon from '@mui/icons-material/Abc'
import CancelIcon from '@mui/icons-material/Cancel'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { sendDataToAnalyze } from '../Api/analysis.api'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import Modal from '../general-components/modal'
import { ANALYSIS_RULES } from '../Utils/analysisRules'
import { width } from '@mui/system'
import { NodoContext } from '../Context/nodoContext'

const CHART_MIN_WIDTH = 350

function CustomizedGraph({
  resultados,
  titulos,
  titulo,
  operacionIntegracion,
  maxWidth = '100%',
  minWidth = '100%',
  metaInversa = false,
  height = 500,
  customKey = Math.random() * 100,
  onDoubleClick = () => {},
  indicadorId = null,
  tipoGraficaProp,
  tipoVistaProp,
  actualizarVistaTipoGraficaFn = () => {},
  mostrarEtiquetasProp,
  showAnalysisProp,
  analysisDataProp,
  detalleIdProp,
  showToolButtons = true,
  allowComments = false,
  agregarListaComentarios,
  additionalButtons = []
}) {
  const { isDrawerOpen } = React.useContext(LayoutContext)
  const [resultadosAMostrar, setResultadosAMostrar] = React.useState([])
  const [titulosAMostrar, setTitulosAMostrar] = React.useState([])
  const [showCumulativeChart, setShowCumulativeChart] = React.useState(false)
  const [chartType, setChartType] = React.useState(
    tipoGraficaProp !== null ? tipoGraficaProp : 'line'
  )
  const chartRef = React.useRef()
  const [tipoVista, setTipoVista] = React.useState(
    tipoVistaProp ? tipoVistaProp : 'chart'
  )
  const [showValueTag, setShowValueTag] = React.useState(
    mostrarEtiquetasProp ? mostrarEtiquetasProp : false
  )

  const [showAnalysis, setShowAnalysis] = React.useState(
    showAnalysisProp ? showAnalysisProp : false
  )
  const [analysisData, setAnalysisData] = React.useState(
    analysisDataProp ? analysisDataProp : null
  )

  const { getSelectedUserName } = useContext(AuthContext)
  const handle = useFullScreenHandle()
  const [open, setOpen] = useState(false)
  const { setLoading, setLoadingMessage } = React.useContext(NodoContext)

  useEffect(() => {
    reRenderCharts()
  }, [maxWidth, minWidth, isDrawerOpen, handle])

  useEffect(() => {
    if (!showCumulativeChart) {
      setResultadosAMostrar(resultados)
      setTitulosAMostrar(titulos)
    } else {
      const resAcumulados = resultados.map((elem, index) => {
        const keys = Object.keys(elem)
        const numericKeys = keys.filter((key) => key !== 'fecha')
        const visitedResults = resultados.slice(0, index + 1)
        return {
          fecha: elem.fecha,
          [numericKeys[0]]: visitedResults.reduce(
            (prev, curr) => prev + curr[numericKeys[0]],
            0
          ),
          [numericKeys[1]]: visitedResults.reduce(
            (prev, curr) => prev + curr[numericKeys[1]],
            0
          )
        }
      })
      setResultadosAMostrar(resAcumulados)
    }
    reRenderCharts()
  }, [showCumulativeChart, titulos, resultados])

  useEffect(() => {
    console.log({ titulos })
    if (showAnalysis && analysisData) {
      let resultadosKeys = Object.keys(resultados[0])
      resultadosKeys = resultadosKeys.filter((key) => !key.startsWith('Meta'))
      const resultadosCopy = resultados.map((res) => {
        return {
          [resultadosKeys[0]]: res[resultadosKeys[0]],
          [resultadosKeys[1]]: res[resultadosKeys[1]]
        }
      })
      const nuevosTitulos = resultadosKeys
        .filter((key) => key !== 'fecha')
        .map((key) => {
          return {
            value: key,
            name: key
          }
        })
      setResultadosAMostrar(resultadosCopy)
      setTitulosAMostrar(nuevosTitulos)
    } else {
      setTitulosAMostrar(titulos)
      setResultadosAMostrar(resultados)
    }
  }, [showAnalysis])

  function reRenderCharts() {
    setTimeout(() => {
      if (chartRef.current) chartRef.current.instance.render()
    }, 100)
  }

  function checkIfAnalysisIsCorrect() {
    if (!analysisData) return true
    console.log({ analysisData })
    const isAnalysisCorrect = Object.values(analysisData.rules).every(
      ({ outsideOfLimits }) => outsideOfLimits === false
    )
    return isAnalysisCorrect
  }

  function getTitulo() {
    if (titulo) return titulo
    return ' '
  }

  function getChartIcon() {
    if (!showCumulativeChart) {
      return <TrendingUpIcon />
    }
    return <TrendingFlatIcon />
  }

  function handleButtonClick(e) {
    setShowCumulativeChart(!showCumulativeChart)
    e.stopPropagation() // Impide que se ejecuten los rerender de las graficas
  }

  function customizePoint(arg) {
    let color
    const properties = Object.keys(arg.data)
    const valueProperty = properties.filter(
      (prop) => prop !== 'fecha' && !prop.startsWith('Meta')
    )[0]
    if (showAnalysis) {
      color = CHARTS_COLORS.BLUE
    } else {
      if (arg.data[valueProperty] >= arg.data[`Meta ${valueProperty}`]) {
        color = !metaInversa ? CHARTS_COLORS.GREEN : CHARTS_COLORS.RED
      } else {
        color = !metaInversa ? CHARTS_COLORS.RED : CHARTS_COLORS.GREEN
      }
    }
    return {
      color,
      hoverStyle: { color },
      size: 14,
      border: {
        visible: arg.data.comentarios?.length > 0 ? true : false,
        width: 1,
        color: 'black'
      }
    }
  }

  function customizeLabel(arg) {
    let color
    const properties = Object.keys(arg.data)
    const valueProperty = properties.filter(
      (prop) => prop !== 'fecha' && !prop.startsWith('Meta')
    )[0]
    if (showAnalysis) {
      color = CHARTS_COLORS.NONE
    } else {
      if (arg.data[valueProperty] >= arg.data[`Meta ${valueProperty}`]) {
        color = !metaInversa ? CHARTS_COLORS.GREEN : CHARTS_COLORS.RED
      } else {
        color = !metaInversa ? CHARTS_COLORS.RED : CHARTS_COLORS.GREEN
      }
    }
    return {
      visible: arg.seriesName.startsWith('Meta') ? false : showValueTag,
      backgroundColor: color,
      // font: {
      //   color: "black",
      // },
      color: 'black',
      customizeText(e) {
        return `${e.valueText}`
      }
    }
  }

  function onPointClick({ target: point }) {
    point.showTooltip()
  }

  function hideTooltips() {
    chartRef.current.instance.getAllSeries().forEach((serie) => {
      serie.getAllPoints().forEach((point) => {
        point.hideTooltip()
      })
    })
  }

  function getCorrectWidth() {
    const width = isDrawerOpen ? minWidth : maxWidth
    if (width < CHART_MIN_WIDTH) return CHART_MIN_WIDTH
    return width
  }

  function performStatisticaAnalysis() {
    if (showAnalysis) {
      setShowAnalysis(false)
      setAnalysisData(null)
      return
    }    
    const data = { indicadores: [] }
    const cleanedResults = resultados
      .map((res) => {
        const properties = Object.keys(res)
        const valueProperty = properties.filter(
          (prop) => prop !== 'fecha' && !prop.startsWith('Meta')
        )[0]
        return res[valueProperty]
      })
      .filter((res) => res !== null)
    if (cleanedResults.length === 0) {
      return toast.warning('No hay datos para analizar')
    }
    setLoading(true)
    setLoadingMessage('Analizando datos...')
    const indicador = {
      id: indicadorId,
      nombre: titulo,
      resultados: cleanedResults
    }
    data.indicadores.push(indicador)
    console.log(data)
    sendDataToAnalyze(data).then((response) => {
      setLoading(false)
      console.log({response})
      if (response.status !== 200) {
        return toast.error('Error al analizar los datos')
      }
      console.log(response.body[indicadorId])
      setAnalysisData(response.body[indicadorId])
      setShowAnalysis(true)      
    })
  }

  return (
    <>
      <FullScreen handle={handle}>
        <Paper
          elevation={5}
          sx={{
            p: 3,
            m: 1,
            border:
              showAnalysis && analysisData
                ? `3px solid ${checkIfAnalysisIsCorrect() ? 'green' : 'red'}`
                : '3px solid transparent',
            width: handle.active ? '8000' : getCorrectWidth(),
            height: handle.active ? 800 : height,
            maxHeight: handle.active ? 800 : height,
            overflowY: 'scroll'

            // width: getCorrectWidth(),
            // maxHeight: height,
            // overflowY: 'scroll',
            // minWidth: CHART_MIN_WIDTH
          }}
          key={`${customKey} ${isDrawerOpen}`}
          onDoubleClick={onDoubleClick}
        >
          {showToolButtons && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex' }}>
                <ConditionalRendering
                  condition={
                    operacionIntegracion === MODO_INTEGRACION_GLOBAL.SUMATORIA
                  }
                >
                  <MUITooltip
                    title={
                      showCumulativeChart
                        ? 'Visualizar gráfica lineal'
                        : 'Visualizar gráfica acumulativa'
                    }
                    enterDelay={DEFAULT_DELAY}
                  >
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      sx={{
                        float: 'left'
                      }}
                      onClick={handleButtonClick}
                    >
                      {getChartIcon()}
                    </IconButton>
                  </MUITooltip>
                </ConditionalRendering>
                <MUITooltip
                  title="Gráfica de lineas"
                  enterDelay={DEFAULT_DELAY}
                >
                  <IconButton
                    aria-label="line chart"
                    color="error"
                    sx={{
                      float: 'left'
                    }}
                    onClick={() => {
                      setChartType('line')
                      setTipoVista('chart')
                      try {
                        actualizarVistaTipoGraficaFn({
                          tipoVista: 'chart',
                          tipoGrafica: 'line',
                          id: detalleIdProp
                        })
                      } catch (error) {}
                    }}
                  >
                    <TimelineIcon />
                  </IconButton>
                </MUITooltip>
                <MUITooltip
                  title="Gráfica de barras"
                  enterDelay={DEFAULT_DELAY}
                >
                  <IconButton
                    aria-label="delete"
                    color="warning"
                    sx={{
                      float: 'left'
                    }}
                    onClick={() => {
                      setChartType('bar')
                      setTipoVista('chart')
                      try {
                        actualizarVistaTipoGraficaFn({
                          tipoVista: 'chart',
                          tipoGrafica: 'bar',
                          id: detalleIdProp
                        })
                      } catch (error) {}
                    }}
                  >
                    <BarChartIcon />
                  </IconButton>
                </MUITooltip>
                <MUITooltip
                  title="Gráfica de dispersión"
                  enterDelay={DEFAULT_DELAY}
                >
                  <IconButton
                    aria-label="scatter plot"
                    color="secondary"
                    sx={{
                      float: 'left'
                    }}
                    onClick={() => {
                      setChartType('scatter')
                      setTipoVista('chart')
                      try {
                        actualizarVistaTipoGraficaFn({
                          tipoVista: 'chart',
                          tipoGrafica: 'scatter',
                          id: detalleIdProp
                        })
                      } catch (error) {}
                    }}
                  >
                    <ScatterPlotIcon />
                  </IconButton>
                </MUITooltip>
              </div>
              <div>
                {additionalButtons.length > 0 &&
                  additionalButtons.map((button, index) => {
                    return (
                      <MUITooltip
                        title={button.title}
                        enterDelay={DEFAULT_DELAY}
                        key={`additional-button-${index}`}
                      >
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          sx={{
                            float: 'left'
                          }}
                          onClick={button.onClick}
                        >
                          {button.icon}
                        </IconButton>
                      </MUITooltip>
                    )
                  })}
              </div>
              <div style={{ display: 'flex' }}>
                <MUITooltip
                  title={showValueTag ? 'Ocultar valores' : 'Mostar valores'}
                  enterDelay={DEFAULT_DELAY}
                >
                  <IconButton
                    aria-label="table"
                    color={showValueTag ? 'primary' : 'default'}
                    sx={{
                      float: 'left'
                    }}
                    onClick={() => {
                      try {
                        actualizarVistaTipoGraficaFn({
                          mostrarEtiquetas: !showValueTag,
                          id: detalleIdProp
                        })
                        setShowValueTag(!showValueTag)
                      } catch (error) {
                        console.error(error)
                      }
                    }}
                  >
                    <AbcIcon />
                  </IconButton>
                </MUITooltip>
                {showAnalysis && !checkIfAnalysisIsCorrect() && (
                  <MUITooltip
                    title={'Mostrar riesgos encontrados'}
                    enterDelay={DEFAULT_DELAY}
                  >
                    <IconButton
                      aria-label="analysis"
                      color={showAnalysis ? 'primary' : 'default'}
                      sx={{
                        float: 'left'
                      }}
                      onClick={() => setOpen(true)}
                    >
                      <FormatListBulletedIcon />
                    </IconButton>
                  </MUITooltip>
                )}
                <MUITooltip
                  title={
                    showAnalysis
                      ? 'Ocultar análisis'
                      : 'Mostar análisis estadístico'
                  }
                  enterDelay={DEFAULT_DELAY}
                >
                  <IconButton
                    aria-label="analysis"
                    color={showAnalysis ? 'primary' : 'default'}
                    sx={{
                      float: 'left'
                    }}
                    onClick={performStatisticaAnalysis}
                  >
                    <QueryStatsIcon />
                  </IconButton>
                </MUITooltip>
                <MUITooltip title="Vista de tabla" enterDelay={DEFAULT_DELAY}>
                  <IconButton
                    aria-label="table"
                    color="warning"
                    sx={{
                      float: 'left'
                    }}
                    onClick={() => {
                      setTipoVista('table')
                      try {
                        actualizarVistaTipoGraficaFn({
                          tipoVista: 'table',
                          tipoGrafica: chartType,
                          id: detalleIdProp
                        })
                      } catch (error) {}
                    }}
                  >
                    <GridOnIcon />
                  </IconButton>
                </MUITooltip>
                <MUITooltip title="Vista de chart" enterDelay={DEFAULT_DELAY}>
                  <IconButton
                    aria-label="chart"
                    color="warning"
                    sx={{
                      float: 'left'
                    }}
                    onClick={() => {
                      setTipoVista('chart')
                      try {
                        actualizarVistaTipoGraficaFn({
                          tipoVista: 'chart',
                          tipoGrafica: chartType,
                          id: detalleIdProp
                        })
                      } catch (error) {}
                    }}
                  >
                    <InsertChartIcon />
                  </IconButton>
                </MUITooltip>
                <MUITooltip
                  title="Vista de chart y tabla"
                  enterDelay={DEFAULT_DELAY}
                >
                  <IconButton
                    aria-label="mixed"
                    color="warning"
                    sx={{
                      float: 'left'
                    }}
                    onClick={() => {
                      setTipoVista('mixed')
                      try {
                        actualizarVistaTipoGraficaFn({
                          tipoVista: 'mixed',
                          tipoGrafica: chartType,
                          id: detalleIdProp
                        })
                      } catch (error) {}
                    }}
                  >
                    <PivotTableChartIcon />
                  </IconButton>
                </MUITooltip>

                <MUITooltip
                  title={
                    handle.active
                      ? 'Cerrar pantalla completa'
                      : 'Pantalla completa'
                  }
                  enterDelay={DEFAULT_DELAY}
                >
                  <IconButton
                    aria-label="Pantalla completa"
                    color="secondary"
                    sx={{
                      float: 'left'
                    }}
                    onClick={() => {
                      if (!handle.active) {
                        handle.enter()
                      } else {
                        handle.exit()
                      }
                    }}
                  >
                    {!handle.active ? (
                      <OpenInFullIcon />
                    ) : (
                      <CloseFullscreenIcon />
                    )}
                  </IconButton>
                </MUITooltip>
              </div>
            </div>
          )}

          {(tipoVista === 'chart' || tipoVista === 'mixed') && (
            <div>
              <Chart
                palette="Office"
                dataSource={resultadosAMostrar}
                title={getTitulo()}
                width={handle.active ? '100%' : getCorrectWidth() - 100}
                height={handle.active ? 750 : undefined}
                ref={chartRef}
                key={`CH${customKey} ${isDrawerOpen}`}
                redrawOnResize={true}
                customizePoint={customizePoint}
                customizeLabel={customizeLabel}
                onPointClick={onPointClick}
              >
                <CommonSeriesSettings
                  argumentField="fecha"
                  type="line"
                ></CommonSeriesSettings>
                <Animation
                  easing="linear"
                  duration={80}
                  maxPointCountSupported={100}
                />
                {titulosAMostrar.map((item) => (
                  <Series
                    key={titulo + item.value}
                    valueField={item.value}
                    name={item.name}
                    dashStyle={
                      item.name.startsWith('Meta')
                        ? showAnalysis
                          ? 'dot'
                          : 'dash'
                        : 'solid'
                    }
                    type={item.name.startsWith('Meta') ? 'line' : chartType}
                    hoverMode={
                      item.name.startsWith('Meta')
                        ? 'excludePoints'
                        : 'includePoints'
                    }
                  >
                    <Point visible={!item.name.startsWith('Meta')}></Point>
                  </Series>
                ))}
                <Margin bottom={20} />
                <ValueAxis
                  name="percentage"
                  position="left"
                  showZero={true}
                  valueMarginsEnabled={false}
                  visualRange={{
                    startValue: analysisData ? analysisData['min'] * 0.9 : null,
                    endValue: analysisData ? analysisData['max'] * 1.1 : null
                  }}
                >
                  {showAnalysis && analysisData && (
                    <ConstantLine
                      value={analysisData['UCL']}
                      width={2}
                      color="#D1111B"
                      dashStyle="dash"
                    >
                      <Label text="UCL" />
                    </ConstantLine>
                  )}
                  {showAnalysis && analysisData && (
                    <ConstantLine
                      value={analysisData['+2s']}
                      width={2}
                      color="#CD6839"
                      dashStyle="dot"
                    >
                      <Label text="+2s" />
                    </ConstantLine>
                  )}
                  {showAnalysis && analysisData && (
                    <ConstantLine
                      value={analysisData['+1s']}
                      width={2}
                      color="#CD6839"
                      dashStyle="dot"
                    >
                      <Label text="+1s" />
                    </ConstantLine>
                  )}
                  {showAnalysis && analysisData && (
                    <ConstantLine
                      value={analysisData.mean}
                      width={2}
                      color="#1A2B3C"
                      dashStyle="dash"
                    >
                      <Label text="Mean" />
                    </ConstantLine>
                  )}
                  {showAnalysis && analysisData && (
                    <ConstantLine
                      value={analysisData['-1s']}
                      width={2}
                      color="#CD6839"
                      dashStyle="dot"
                    >
                      <Label text="-1s" />
                    </ConstantLine>
                  )}
                  {showAnalysis && analysisData && (
                    <ConstantLine
                      value={analysisData['-2s']}
                      width={2}
                      color="#CD6839"
                      dashStyle="dot"
                    >
                      <Label text="-2s" />
                    </ConstantLine>
                  )}

                  {showAnalysis && analysisData && (
                    <ConstantLine
                      value={analysisData['LCL']}
                      width={2}
                      color="#D1111B"
                      dashStyle="dash"
                    >
                      <Label text="LCL" />
                    </ConstantLine>
                  )}
                  <Label />
                </ValueAxis>
                <Legend
                  verticalAlignment="bottom"
                  horizontalAlignment="center"
                  itemTextPosition="bottom"
                />
                <IconButton
                  aria-label="delete"
                  color="primary"
                  sx={{ position: 'relative', marginTop: '-5px' }}
                >
                  <DeleteIcon />
                </IconButton>
                <Export enabled={true} />
                {allowComments ? (
                  <Tooltip
                    enabled={false}
                    // contentRender={(info) =>
                    //   TooltipTemplate(informeId, getSelectedUserName, info)
                    // }
                    contentComponent={(props) => (
                      <TooltipTemplate
                        {...props}
                        hideTooltips={hideTooltips}
                        agregarListaComentarios={agregarListaComentarios}
                      />
                    )}
                    interactive
                  />
                ) : (
                  <Tooltip enabled={true} />
                )}

                <ScrollBar visible={false} />
                <ZoomAndPan argumentAxis="none" />
              </Chart>
            </div>
          )}

          {(tipoVista === 'table' || tipoVista === 'mixed') && (
            <div>
              <ChartTable
                dataArray={resultados}
                title={getTitulo()}
                periodos={titulos}
              />
            </div>
          )}
        </Paper>
      </FullScreen>
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        title="Riesgos encontrados"
      >
        {analysisData && (
          <div
            style={{ width: '100%', maxHeight: '80vh', overflowY: 'scroll' }}
          >
            {Object.values(analysisData.rules).map((rule) => {
              if (rule.outsideOfLimits) {
                return (
                  <Paper
                    key={rule.id}
                    elevation={3}
                    sx={{
                      padding: '10px',
                      margin: '10px 5px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      borderRadius: '10px'
                    }}
                  >
                    <b>{ANALYSIS_RULES[rule.id].name}</b>
                    <p>{ANALYSIS_RULES[rule.id].description}</p>
                    <div>
                      <b>Causas probables:</b>
                      <div
                        style={{
                          display: 'flex',
                          gap: '5px',
                          flexWrap: 'wrap'
                        }}
                      >
                        {ANALYSIS_RULES[rule.id].causes.map((cause, index) => (
                          <Chip label={cause} key={index} />
                        ))}
                      </div>
                    </div>
                  </Paper>
                )
              }
              return null
            })}
          </div>
        )}
      </Modal>
    </>
  )
}

function TooltipTemplate({ data, hideTooltips, agregarListaComentarios }) {
  const { point } = data
  const [commentMessage, setCommentMessage] = useState('')
  const { getSelectedUserName } = useContext(AuthContext)
  const [comments, setComments] = useState(point.data?.comentarios)
  const [reloadKey, setReloadKey] = useState(0)
  const { informeId } = useParams()
  const { getToken } = useContext(AuthContext)
  const autenticado = getToken() !== null

  function addComment() {
    const comment = {
      id: new Date().getTime(),
      annotationDate: new Date(),
      usuario: getSelectedUserName(),
      comment: commentMessage
    }
    const commentInfo = {
      ...comment,
      informe: informeId,
      tab: point.data.tab,
      indicador: point.data.indicador,
      fecha: point.data.fecha
    }

    addAnnotation(commentInfo).then((response) => {
      if (response.status === 200) {
        toast.success('Comentario añadido correctamente')
        setComments([comment, ...comments])
        setCommentMessage('')
        setReloadKey(reloadKey + 1)
        point.data?.comentarios.unshift(comment)
        //setFireInformeReload((prev) => prev + 1);
        try {
          agregarListaComentarios({ ...commentInfo, tabId: point.data.tab })
        } catch (error) {
          console.error(error)
        }
      } else {
        toast.error('Error al añadir comentario')
      }
    })
  }

  if (data.seriesName.startsWith('Meta')) {
    return <div></div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <IconButton
          color="primary"
          aria-label="Post comment"
          component="label"
          onClick={hideTooltips}
          sx={{ float: 'right', marginBottom: '-10px', marginRight: '-10px' }}
        >
          <CancelIcon sx={{ color: 'red' }} fontSize="small" />
        </IconButton>
      </div>
      <div className={tooltipStyles.tooltip} style={{ height: '300px' }}>
        <div style={{}}>
          <b>Comentarios:</b>
          <div className={tooltipStyles.commentsContainer}>
            {comments.reverse()?.map((comment, index) => (
              <Paper className={tooltipStyles.comment} key={index}>
                {comment.comment}
                <p style={{ fontSize: '8px' }}>
                  {comment.usuario} -{' '}
                  {moment(comment.annotationDate).format('DD/MM/YYYY HH:mm')}
                </p>
              </Paper>
            ))}
          </div>
        </div>
        {autenticado && (
          <div
            style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}
          >
            <TextField
              label="Comentario..."
              variant="outlined"
              value={commentMessage}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addComment()
                }
              }}
              onChange={(e) => setCommentMessage(e.target.value)}
            />
            <IconButton
              color="primary"
              aria-label="Post comment"
              component="label"
              onClick={addComment}
            >
              <SendIcon />
            </IconButton>
          </div>
        )}
        {!autenticado && (
          <div
            style={{
              marginTop: '35px',
              display: 'flex',
              maxWidth: '220px',
              justifyContent: 'center'
            }}
          >
            <b>Estás en una vista de invitado, inicia sesión para comentar.</b>
          </div>
        )}
      </div>
    </div>
  )
}

export { CustomizedGraph }
