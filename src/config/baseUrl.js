import axios from "axios";

export const API = axios.create({ baseURL: "http://localhost:5000/api" });
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const apiKey = "fb3740bc653a7910499d04a143f890fc";