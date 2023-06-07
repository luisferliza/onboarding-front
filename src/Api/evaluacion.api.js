import { HOST } from '../Utils/config'
import { getRequest } from './requests'

async function getEvaluaciones({ userId }) {
  return await getRequest(`${HOST}/api/v1/evaluaciones/usuario/${userId}`)
}

async function getEvaluacion({ evaluacionId }) {
  return await getRequest(`${HOST}/api/v1/evaluaciones/${evaluacionId}`)
}

export { getEvaluaciones, getEvaluacion }
