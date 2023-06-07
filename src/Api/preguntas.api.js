import { HOST } from '../Utils/config'
import { putRequest } from './requests'

async function putPregunta({ preguntaId, pregunta }) {
  return await putRequest(`${HOST}/api/v1/preguntas/${preguntaId}`, pregunta)
}

export { putPregunta }
