import { Navigate, useLocation } from "react-router-dom";
import { getUserRole } from "../utils/auth";


const AdminRoute = ({ children }) => {
 const location = useLocation();
  const role = getUserRole();
 
  const token = localStorage.getItem("token");
  console.log("token",token)

if (!token || !["admin", "agent", "sub-admin"].includes(role)) {
  return <Navigate to="/login" state={{ from: location }} replace />;
}

  return children;
};

export default AdminRoute;
