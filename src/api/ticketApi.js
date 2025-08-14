import { API } from "../config/baseUrl";

export const createTicket = (data) => API.post("/ticket/create", data);
export const getAllTickets = () => API.get("/ticket");