import axios from "axios";

export const API = axios.create({ baseURL: "http://localhost:5000/api" });
export const apiKey = "fb3740bc653a7910499d04a143f890fc";