import axios from "axios";

const API = axios.create({
	baseURL: "http://banana:8080/api/users",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
