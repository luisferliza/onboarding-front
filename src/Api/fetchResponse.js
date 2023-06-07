function fetchResponse(status, body, message) {
  return {
    status,
    body,
    message,
  };
}

function getHTTPStatusAsText(status) {
  const statusResponses = {
    200: "Solicitud completada exitosamente",
    201: "Registro creado correctamente",
    204: "La solicitud no retornó ningún contenido",
    401: "Necesitas autenticarte para obtener la respuesta solicitada",
    403: "Acceso denegado. No tienes permiso para visualizar el contenido",
    404: "No se encontró el recurso solicitado",
    405: "Método no soportado",
    413: "Carga demasiado grande",
    500: "Ha ocurrido un error en el servidor, intenta nuevamente",
  };
  const response = statusResponses[status];
  if (!response) return "Error interno, por favor intenta nuevamente.";
  return response;
}
export { fetchResponse, getHTTPStatusAsText };
