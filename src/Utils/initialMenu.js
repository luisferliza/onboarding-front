import AltRouteIcon from '@mui/icons-material/AltRoute'
import StyleIcon from '@mui/icons-material/Style'
import RecentActorsIcon from '@mui/icons-material/RecentActors'
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import HubIcon from '@mui/icons-material/Hub'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import MediationIcon from '@mui/icons-material/Mediation'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import EventRepeatIcon from '@mui/icons-material/EventRepeat'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ListAltIcon from '@mui/icons-material/ListAlt'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

export const initialMenu = {
  firstLoad: true,
  procesos: [
    {
      index: 1,
      visible: 0,
      name: 'Árbol de procesos',
      to: '/',
      icon: () => <ClearAllIcon />,
      onClick: (event, handleListItemClick, setDisplayTreeView) => {
        event.preventDefault()
        handleListItemClick(event, 1)
        setDisplayTreeView(true)
      }
    },
    // {
    //   index: 2,
    //   visible: 0,
    //   name: "Mapa de procesos",
    //   to: "mapadeprocesos",
    //   icon: () => <AccountTreeIcon />,
    //   onClick: (event, handleListItemClick) => handleListItemClick(event, 2),
    // },
    {
      index: 3,
      visible: 0,
      name: 'Value Stream Maps',
      to: 'valuemaplist',
      icon: () => <MediationIcon />,
      onClick: (event, handleListItemClick) => handleListItemClick(event, 3)
    },
    // {
    //   index: 3,
    //   visible: 0,
    //   name: "Mapa de actividades",
    //   to: "mapadeactividades",
    //   icon: () => <MediationIcon />,
    //   onClick: (event, handleListItemClick) => handleListItemClick(event, 3),
    // },
    // {
    //   index: 4,
    //   visible: 0,
    //   name: "Mapa de indicadores",
    //   to: "mapadeindicadores",
    //   icon: () => <AltRouteIcon />,
    //   onClick: (event, handleListItemClick) => handleListItemClick(event, 4),
    // },
    {
      index: 14,
      visible: 0,
      name: 'Tablero de indicadores',
      to: 'tableros',
      icon: () => <DashboardIcon />,
      onClick: (event, handleListItemClick) => handleListItemClick(event, 14)
    },
    {
      index: 6,
      visible: 0,
      name: 'Ingreso de resultados',
      to: 'resultados',
      icon: () => <SaveAsIcon />,
      onClick: (event, handleListItemClick) => handleListItemClick(event, 6)
    },
    {
      index: 13,
      visible: 0,
      name: 'Ingreso de resultados (Digitador)',
      to: 'digitador',
      icon: () => <AppRegistrationIcon />,
      onClick: (event, handleListItemClick) => handleListItemClick(event, 13)
    }
  ],
  evaluaciones: [
    {
      index: 17,
      visible: 0,
      name: 'Mis Indicadores',
      to: 'indicadoresasignados',
      icon: () => <ListAltIcon />,
      onClick: (event, handleListItemClick) => handleListItemClick(event, 17)
    },
    {
      index: 12,
      visible: 0,
      name: 'Asignación a Bono Zafra',
      to: 'bonozafra',
      icon: () => <PersonAddIcon />,
      onClick: (event, handleListItemClick) => handleListItemClick(event, 12)
    },
    {
      index: 18,
      visible: 0,
      name: 'Reporte de desempeño',
      to: 'reportedesempenocompleto',
      icon: () => <RequestQuoteIcon />,
      onClick: (event, handleListItemClick) => handleListItemClick(event, 18)
    },
    {
      index: 16,
      visible: 0,
      name: 'Pesos de evaluación',
      to: 'desempeno',
      icon: () => <AssignmentIcon />,
      onClick: (event, handleListItemClick) => handleListItemClick(event, 16)
    },
    {
      index: 9,
      visible: 0,
      name: 'Niveles organizacionales',
      to: 'etiquetas',
      icon: () => <HubIcon />,
      onClick: (event, handleListItemClick) => handleListItemClick(event, 9)
    }

    // {
    //   index: 7,
    //   visible: 0,
    //   name: "Evaluaciones creadas por mí",
    //   to: "evaluacionescreadaspormi",
    //   icon: () => <ContentPasteSearchIcon />,
    //   onClick: (event, handleListItemClick) => handleListItemClick(event, 7),
    // },
    // {
    //   index: 8,
    //   visible: 0,
    //   name: "Evaluaciones realizadas a mí",
    //   to: "evaluacionesrealizadasami",
    //   icon: () => <ContentPasteSearchIcon />,
    //   onClick: (event, handleListItemClick) => handleListItemClick(event, 8),
    // },
  ],
  administracion: [
    {
      index: 10,
      visible: 0,
      name: 'Gestión de roles',
      to: 'roles',
      icon: () => <RecentActorsIcon />,
      onClick: (event, handleListItemClick) => handleListItemClick(event, 10)
    },
    {
      index: 11,
      visible: 0,
      name: 'Asignación de roles',
      to: 'asignacionroles',
      icon: () => <ReduceCapacityIcon />,
      onClick: (event, handleListItemClick) => handleListItemClick(event, 11)
    },

    {
      index: 15,
      visible: 0,
      name: 'Gestión de etiquetas',
      to: 'familiaetiqueta',
      icon: () => <StyleIcon />,
      onClick: (event, handleListItemClick) => handleListItemClick(event, 15)
    },
    {
      index: 5,
      visible: 0,
      name: 'Periodos de evaluación',
      to: 'periodos',
      icon: () => <EventRepeatIcon />,
      onClick: (event, handleListItemClick) => handleListItemClick(event, 5)
    }
  ]
}
