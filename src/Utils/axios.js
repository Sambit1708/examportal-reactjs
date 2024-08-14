import axios from "axios";

/**
 * ! This axios is created in order to add Interceptors and define baseURL.
 */
const API = axios.create({
  baseURL: "http://13.202.153.111:8085/",
});

API.interceptors.request.use((request) => {
  if (
    localStorage.getItem("token") != null &&
    request.url !== "http://13.202.153.111:8085/generate-token"
  ) {
    request.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return request;
});

export default API;
