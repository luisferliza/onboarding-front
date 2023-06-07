import { HOST } from '../Utils/config'
import { getRequest } from './requests'

async function getCriterios() {
  return await getRequest(`${HOST}/api/v1/criterios`)
}

export { getCriterios }
