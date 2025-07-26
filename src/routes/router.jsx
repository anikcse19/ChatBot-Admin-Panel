import { createBrowserRouter } from "react-router";
import Dashboard from "../layout/Dashboard";
import DashboardContend from "../pages/DashboardContend";
import ChatBox from "../pages/ChatBoxPage";
import ChatBoxPage from "../pages/ChatBoxPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/",
        element: <DashboardContend></DashboardContend>,
      },
      {
        path: "/chatBox",
        element: <ChatBoxPage></ChatBoxPage>
      },
      {
        path: "/laa",
        element: <div>hello</div>,
      },
    ],
  },
]);
export default router;