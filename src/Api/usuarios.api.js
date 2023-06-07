import { HOST } from "../Utils/config";
import { getRequest, postRequest } from "./requests";

async function getUsuarios() {
  return await getRequest(`${HOST}/api/v1/usuarios`);
}

async function getMiUsuario() {
  return await getRequest(`${HOST}/api/v1/usuarios/yo`);
}

async function changePassword(body) {
  return await postRequest(`${HOST}/api/v1/usuarios/changepassword`, body);
}

export{ getUsuarios, getMiUsuario, changePassword }