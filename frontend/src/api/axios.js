import axios from "axios";
import keycloak from "../config/keycloak";

const API = axios.create({
  baseURL: "",
});

API.interceptors.request.use(
  async (req) => {
    if (keycloak.authenticated) {
      await keycloak.updateToken(30);
      req.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export default API;