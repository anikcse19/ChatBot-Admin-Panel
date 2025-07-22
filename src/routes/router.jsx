import { createBrowserRouter } from "react-router";
import App from "../App";
import Dashboard from "../layout/Dashboard";
import DashboardContend from "../pages/DashboardContend";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/l",
        element: <DashboardContend></DashboardContend>,
      },
      {
        path: "/laa",
        element: <div>hello</div>,
      },
    ],
  },
]);
export default router;