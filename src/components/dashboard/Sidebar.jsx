import React, { useState } from "react";
import {
  BellOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  CaretRightOutlined,
  UserOutlined,
  HomeOutlined,
  MessageOutlined,
  BarChartOutlined,
  SettingOutlined,
  GroupOutlined,
  MessageTwoTone,
  StepForwardOutlined,
} from "@ant-design/icons";
import { Badge, Collapse, Layout, Progress, Tooltip, Grid } from "antd";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa6";
import { LuUserRoundCheck } from "react-icons/lu";
import { CgDetailsMore } from "react-icons/cg";
import { Link } from "react-router";
import "../../App.css";
const { Sider } = Layout;
const { Panel } = Collapse;
const { useBreakpoint } = Grid;

const tasks = [
  { id: 1, label: "Signed Up", completed: true, link: "/signedUp" },
  { id: 2, label: "Chat Box", completed: false, link: "/chatBox" },
  { id: 3, label: "Invite Members", completed: false, link: "/signedUp" },
  { id: 4, label: "Dashboard Tour", completed: true, link: "/signedUp" },
  { id: 5, label: "Watch Demo", completed: false, link: "/signedUp" },
  { id: 6, label: "Customize Widget", completed: false, link: "/signedUp" },
  { id: 7, label: "Create a Shortcut", completed: true, link: "/signedUp" },
  { id: 8, label: "Check out Inbox", completed: false, link: "/signedUp" },
  { id: 9, label: "Create a Property", completed: true, link: "/signedUp" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.lg; // true for md & sm

  const completedTasks = tasks.filter((t) => t.completed).length;
  const completionPercent = Math.round((completedTasks / tasks.length) * 100);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      trigger={null}
      width={240}
      breakpoint="lg"
      collapsedWidth={isMobile ? 60 : 80} // on mobile collapsed width = 0
      style={{
        minHeight: "calc(100vh - 92px)",
        background: "#262626",
        position: isMobile && !collapsed ? "fixed" : "relative",
        zIndex: isMobile && !collapsed ? 999 : "auto",
        transition: "all 0.4s ease-in-out",
      }}
      className="overflow-y-auto"
    >
      {/* Toggle Button */}
      <div
        className={`flex px-2 py-4 ${
          collapsed ? "justify-end" : "justify-between"
        }`}
      >
        {!collapsed && (
          <div className="flex text-white gap-8">
            <button>
              <FaLayerGroup size={"1.5rem"} />
            </button>
            <button>
              <LuUserRoundCheck size={"1.5rem"} />
            </button>
            <button>
              <CgDetailsMore size={"1.5rem"} />
            </button>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white p-2 rounded transition"
        >
          {collapsed ? (
            <MdKeyboardDoubleArrowRight
              size={"1.5rem"}
              className=" text-gray-400"
            />
          ) : (
            <MdOutlineKeyboardDoubleArrowLeft
              size={"1.5rem"}
              className=" text-gray-300"
            />
          )}
        </button>
      </div>

      {!collapsed ? (
        <div className="text-white py-4 px-1 bg-[#262626] h-[566px] no-scrollbar overflow-y-auto">
          <Collapse
            bordered={false}
            defaultActiveKey={["3"]}
            expandIconPosition="start"
            expandIcon={({ isActive }) => (
              <CaretRightOutlined
                style={{ color: "white" }}
                rotate={isActive ? 90 : 0}
              />
            )}
            style={{ color: "white" }}
          >
            <Panel
              header={<span className="text-white font-bold">Groups</span>}
              key="1"
            >
              <button className="flex items-center gap-2 mt-2 text-sm bg-gray-700 px-3 py-1 rounded text-white">
                <PlusOutlined /> New Group
              </button>
            </Panel>

            <Panel
              header={
                <span className="text-white font-bold">
                  Direct Messages (1)
                </span>
              }
              key="2"
            >
              <div className="flex items-center gap-2 mt-2 bg-gray-800 p-2 rounded text-white">
                <div className="bg-pink-500 rounded-full w-6 h-6 text-center text-sm font-semibold">
                  J
                </div>
                <span>Jannat</span>
                <span className="ml-auto bg-green-400 w-2 h-2 rounded-full" />
              </div>
            </Panel>

            <Panel
              header={
                <span className="text-white font-bold">Getting Started</span>
              }
              key="3"
            >
              <div className="flex justify-between bg-gray-500 p-2 rounded-lg items-center mb-3">
                <span className="font-semibold text-white">Progress</span>
                <Badge
                  count={`${completionPercent}%`}
                  style={{ backgroundColor: "#00B96B" }}
                />
              </div>
              <ul className="text-sm space-y-2">
                {tasks.map((task, index) => (
                  <Link
                    to={task.link}
                    key={task.id}
                    className="flex items-center hover:bg-black p-2 rounded-lg justify-between"
                  >
                    <span className="text-white">{`${index + 1}. ${
                      task.label
                    }`}</span>
                    <span
                      className={
                        task.completed ? "text-green-600" : "text-white"
                      }
                    >
                      {task.completed ? (
                        <CheckCircleOutlined className="text-green-400" />
                      ) : (
                        <ClockCircleOutlined className="text-white" />
                      )}
                    </span>
                  </Link>
                ))}
              </ul>
            </Panel>
          </Collapse>
          <div className="px-4 py-3 text-white">
            <div className="text-sm mb-2">
              Setup Completion {completionPercent}%
            </div>
            <Progress
              percent={completionPercent}
              size="small"
              strokeColor="#ffffff"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col text-white gap-4 items-center py-2 h-[530px] overflow-y-auto">
          <Tooltip title="Groups" placement="right">
            <GroupOutlined className="text-white text-xl cursor-pointer" />
          </Tooltip>

          <Tooltip title="Messages" placement="right">
            <MessageOutlined className="text-white text-xl cursor-pointer" />
          </Tooltip>
          <Tooltip title="Started" placement="right">
            <StepForwardOutlined className="text-white text-xl cursor-pointer" />
          </Tooltip>
          <Tooltip title="Settings" placement="right">
            <SettingOutlined className="text-white text-xl cursor-pointer" />
          </Tooltip>
        </div>
      )}

      {/* Bottom */}
      <div
        className={`${
          collapsed ? "flex flex-col" : "flex"
        } w-full justify-between px-6 py-2 text-white items-center border-t border-gray-400 gap-4`}
      >
        <Badge count={9} size="small">
          <BellOutlined
            style={{ color: "white" }}
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
