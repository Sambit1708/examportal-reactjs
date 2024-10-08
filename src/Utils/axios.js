import axios from "axios";

/**
 * ! This axios is created in order to add Interceptors and define baseURL.
 */
const API = axios.create({
  baseURL: "/",
});

API.interceptors.request.use((request) => {
  if (
    localStorage.getItem("token") != null &&
    request.url !== "/generate-token"
  ) {
    request.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return request;
});

export default API;
