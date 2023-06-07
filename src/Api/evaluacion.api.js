import { HOST } from '../Utils/config'
import { getRequest, putRequest } from './requests'

async function getEvaluaciones({ personalId }) {
  return await getRequest(`${HOST}/api/v1/evaluaciones/usuario/${personalId}`)
}

async function getEvaluacion({ evaluacionId }) {
  return await getRequest(`${HOST}/api/v1/evaluaciones/${evaluacionId}`)
}

async function putEvaluacion({ evaluacionId, evaluacion }) {
  return await putRequest(
    `${HOST}/api/v1/evaluaciones/${evaluacionId}`,
    evaluacion
  )
}

export { getEvaluaciones, getEvaluacion, putEvaluacion }
