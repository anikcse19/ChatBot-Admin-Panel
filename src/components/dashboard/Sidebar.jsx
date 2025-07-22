import React, { useState } from "react";
import {
  HomeOutlined,
  MessageOutlined,
  BellOutlined,
  SettingOutlined,
  BarChartOutlined,
  UserOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Badge, Layout, Menu, Progress, Tooltip } from "antd";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={240}
      className="min-h-screen"
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white p-1 rounded transition"
        >
          {collapsed ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
        </button>
      </div>

      {/* Top Icons */}
      <div className="flex flex-col text-white gap-4 items-center py-2">
        <Tooltip title="Home" placement="right">
          <HomeOutlined className="text-white text-xl cursor-pointer" /> Home
        </Tooltip>
        <Tooltip title="Users" placement="right">
          <UserOutlined className="text-white text-xl cursor-pointer" /> User
        </Tooltip>
        <Tooltip title="Messages" placement="right">
          <MessageOutlined className="text-white text-xl cursor-pointer" />{" "}
          Message
        </Tooltip>
        <Tooltip title="Reports" placement="right">
          <BarChartOutlined className="text-white text-xl cursor-pointer" />{" "}
          Chart
        </Tooltip>
        <Tooltip title="Settings" placement="right">
          <SettingOutlined className="text-white text-xl cursor-pointer" />{" "}
          Settings
        </Tooltip>
      </div>

      {/* Setup Progress (Show only when expanded) */}
      {!collapsed && (
        <div className="px-4 py-3 text-white">
          <div className="text-sm mb-2">Setup Completion 23%</div>
          <Progress percent={23} size="small" />
        </div>
      )}

      {/* Notification & Profile - Bottom */}
      <div className="absolute bottom-4 left-0 w-full flex flex-col text-white items-center gap-4">
        <Badge color="" count={9} size="small">
          <BellOutlined
            color="white"
            className="text-white text-xl cursor-pointer"
          />
        </Badge>
        <div className="w-10 h-10 bg-pink-400 text-white rounded-full flex items-center justify-center">
          J
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
