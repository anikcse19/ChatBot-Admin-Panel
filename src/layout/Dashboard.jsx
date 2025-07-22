import React from "react";

import { Layout } from "antd";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import WidgetCard from "../components/dashboard/WidgetCard";
import { Outlet } from "react-router";

const { Content } = Layout;

const Dashboard = () => {
  return (
    <Layout className="h-screen">
      <Sidebar />
      <Layout>
        <Navbar />
        <Content className="p-4 bg-[#f7f7f9] overflow-y-auto">
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
