import { API } from "../config/baseUrl";
// login and registration api
export const createAdmin = (data) => API.post("/users/create", data);
export const loginAdmin = (data) => API.post("/admin/login", data);
// team member
export const createTeamMember = (data) =>
  API.post("/admin/create-subAdmin", data);
export const getAllTeamMembers = () => API.get(`/admin/get-all-subAdmins`);
export const deleteMember = (memberId) => API.delete(`/admin/member/${memberId}`);
