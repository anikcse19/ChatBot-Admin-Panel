import { API } from "../config/baseUrl";
// login and registration api
export const createAdmin = (data) => API.post("/users/create", data);
export const loginAdmin = (data) => API.post("/admin/login", data);
