import { HOST } from '../Utils/config'
import { getRequest } from './requests'

async function getBlueprints() {
  return await getRequest(`${HOST}/api/v1/blueprints`)
}

export { getBlueprints }
