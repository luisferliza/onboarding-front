import { HOST } from '../Utils/config'
import { getRequest } from './requests'

async function getEstadisticas() {
  return await getRequest(`${HOST}/api/v1/estadisticas`)
}

export { getEstadisticas }
