import { HOST } from '../Utils/config'
import { getRequest, postRequest, putRequest } from './requests'

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

async function postEvaluacion(data) {
  return await postRequest(`${HOST}/api/v1/evaluaciones`, data)
}

export { getEvaluaciones, getEvaluacion, putEvaluacion, postEvaluacion }
