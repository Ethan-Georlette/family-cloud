import API from "./axios";

export const login = (data) => API.post("/login", data);
export const signup = (data) => API.post("", data);
