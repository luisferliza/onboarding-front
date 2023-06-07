import { getToken } from "../Utils/security";

const originalFetch = require("isomorphic-fetch");
const { fetchResponse, getHTTPStatusAsText } = require("./fetchResponse");
const fetch = require("fetch-retry")(originalFetch, {
  retries: 3,
  retryDelay: 300,
});

async function getRequest(url) {  
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });    
    if (response.ok) {      
      const jsonResponse = await response.json();
      if (jsonResponse.body) {        
        return fetchResponse(response.status, jsonResponse.body, getHTTPStatusAsText(200));
      }
      return fetchResponse(204, null, getHTTPStatusAsText(204));
    }
    return fetchResponse(
      response.status,
      null,
      getHTTPStatusAsText(response.status)
    );
  } catch (error) {
    console.error({error})
    return fetchResponse(500, null, error);
  }
}

async function postRequest(url, body) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      return fetchResponse(201, null, getHTTPStatusAsText(201));
    }
    return fetchResponse(
      response.status,
      null,
      getHTTPStatusAsText(response.status)
    );
  } catch (error) {
    return fetchResponse(500, null, error);
  }
}

async function putRequest(url, body) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const body = await response.json();
      return fetchResponse(200, body, "Registro actualizado correctamente");
    }
    return fetchResponse(
      response.status,
      null,
      getHTTPStatusAsText(response.status)
    );
  } catch (error) {
    return fetchResponse(500, null, error);
  }
}

async function deleteRequest(url, body) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      return fetchResponse(200, null, "Registro removido correctamente");
    }
    return fetchResponse(
      response.status,
      null,
      getHTTPStatusAsText(response.status)
    );
  } catch (error) {
    return fetchResponse(500, null, error);
  }
}

export { getRequest, postRequest, putRequest, deleteRequest };
