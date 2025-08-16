import { Navigate, useLocation } from "react-router-dom";
import { getUserRole } from "../utils/auth";


const AdminRoute = ({ children }) => {
 const location = useLocation();
  const role = getUserRole();
  console.log("role",role)
  const token = localStorage.getItem("token");
  console.log("token",token)

  if (!token || role !== "admin") {
   return <Navigate to="/login" state={{ from: location }} replace></Navigate>
  }

  return children;
};

export default AdminRoute;
