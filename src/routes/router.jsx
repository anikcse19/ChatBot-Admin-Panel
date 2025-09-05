import { createBrowserRouter } from "react-router";
import Dashboard from "../layout/Dashboard";
import DashboardContend from "../pages/DashboardContend";

import ChatBoxPage from "../pages/ChatBoxPage";
import TicketListPage from "../pages/TicketListPage";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import AdminRoute from "./AdminRoutes";
import TeamMemberList from "../pages/TeamMemberList";
import IntegrationPage from "../pages/IntegrationScriptPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AdminRoute>
        <Dashboard></Dashboard>
      </AdminRoute>
    ),
    children: [
      {
        path: "/",
        element: <DashboardContend></DashboardContend>,
      },
      {
        path: "/chatBox",
        element: <ChatBoxPage></ChatBoxPage>,
      },
      {
        path: "/ticketList",
        element: <TicketListPage></TicketListPage>,
      },
      {
        path: "/teamMembers",
        element: <TeamMemberList></TeamMemberList>,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/integration-script",
    element: <IntegrationPage></IntegrationPage>,
  },
]);
export default router;
