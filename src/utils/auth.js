/* eslint-disable no-unused-vars */
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role; // role from backend
  } catch (error) {
    return null;
  }
};
// get current user
export const getCurrentAdmin = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded; // role from backend
  } catch (error) {
    return null;
  }
};
// Sign out function
export const signOut = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/login";
    toast.success("SignOut successfully");
};
