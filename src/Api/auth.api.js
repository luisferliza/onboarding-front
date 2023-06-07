import { HOST } from "../Utils/config";
import { putRequest } from "./requests";

async function validateTokenApiCall() {
  return await putRequest(`${HOST}/api/v1/auth/validate`);
}

export { validateTokenApiCall };
