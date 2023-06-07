import { HOST } from '../Utils/config'
import { getRequest, putRequest } from './requests'

async function getPersonalAMiCargo() {
  return await getRequest(`${HOST}/api/v1/personal`)
}

export { getPersonalAMiCargo }
