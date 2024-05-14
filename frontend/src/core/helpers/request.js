import axios from "axios";
import { local } from "./localstorage";

axios.defaults.baseURL = "http://localhost:8000";

export const sendRequest = async ({ route, method = "GET", body }) => {
  const type = local("type");
  const token = local("token");

  const headers = {
    Authorization: `${type} ${token}`,
  };

  // so that if the  body is an instance of FormData, don't set the Content-Type header
  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await axios({
    method,
    url: route,
    data: body,
    headers,
  });

  return response.data;
};
