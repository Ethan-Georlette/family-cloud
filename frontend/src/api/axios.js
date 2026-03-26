import axios from "axios";

const API = axios.create({
	baseURL: "http://192.168.0.123:8080/api/users",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
