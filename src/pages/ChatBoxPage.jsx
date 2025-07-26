/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { conversationData } from "./conversationData";
import ChatBox from "../components/chatbox/ChatBox";
import { Layout } from "antd";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { Content } from "antd/es/layout/layout";
const { Sider } = Layout;

const ChatBoxPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState(conversationData);
  const [selectedSession, setSelectedSession] = useState(null);

  const handleSelectSession = async (sessionId) => {
    const selected = conversations.find((conv) => conv.sessionId === sessionId);

    if (selected) {
      setSelectedSession(selected); // Store entire session
      setMessages(selected.messages); // Store only messages of that session
    } else {
      setSelectedSession(null);
      setMessages([]); // no messages if not found
    }
  };

  return (
    <Layout
      style={{ display: "flex", gap: "16px", minHeight: "calc(100vh - 92px)" }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={240}
        style={{
          background: "white",
          border: "1px solid #d9d9d9",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          borderRadius: "8px",
          height: "100%", // fixed height relative to parent Layout
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Fixed header */}
        <div className="flex px-2 bg-gray-100  py-2 justify-end">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded transition"
          >
            {collapsed ? (
              <MdKeyboardDoubleArrowRight
                size={"1.5rem"}
                className="text-gray-400"
              />
            ) : (
              <MdOutlineKeyboardDoubleArrowLeft
                size={"1.5rem"}
                className="text-gray-400"
              />
            )}
          </button>
        </div>
        {collapsed ? (
          <>
            {" "}
            <h2 className="text-sm bg-gray-100 font-bold pb-2 text-center">
              Total {conversations.length}
            </h2>
            {/* Scrollable user list */}
            <div
              style={{
                overflowY: "auto",
                flex: 1,
                height: "calc(100vh - 189px)",
              }}
              className="pb-2 px-1 mb-2"
            >
              {conversations.map((conv) => (
                <div
                  onClick={() => handleSelectSession(conv.sessionId)}
                  key={conv.sessionId}
                  className="hover:bg-blue-100 px-1 py-2 flex items-center justify-between rounded-lg text-center mb-5 text-sm font-medium cursor-pointer"
                >
                  <img
                    src="/user.jpg"
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                  {/* <h2 className="text-center flex-1">{conv.userName}</h2> */}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {" "}
            <h2 className="text-2xl bg-gray-100 font-bold pb-2 text-center">
              All users {conversations.length}
            </h2>
            {/* Scrollable user list */}
            <div
              style={{
                overflowY: "auto",
                flex: 1,
                height: "calc(100vh - 189px)",
              }}
              className="pb-2 px-3 mb-2"
            >
              {conversations.map((conv) => (
                <div
                  onClick={() => handleSelectSession(conv.sessionId)}
                  key={conv.sessionId}
                  className="hover:bg-blue-100 p-2 flex items-center justify-between rounded-lg text-center mb-5 text-sm font-medium cursor-pointer"
                >
                  <img
                    src="/user.jpg"
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                  <h2 className="text-center flex-1">{conv.userName}</h2>
                </div>
              ))}
            </div>
          </>
        )}
      </Sider>

      {/* Chat Content */}
      <Layout
        style={{
          background: "white",
          border: "1px solid #d9d9d9",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          borderRadius: "8px",
          flex: 1,
        }}
      >
        <Content className="p-8 flex flex-col justify-between flex-1">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">Admin Chat</h2>
            {selectedSession && (
              <div className="flex items-center space-x-3">
                <button
                  className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ${
                    selectedSession.isAdminOnline
                      ? "bg-emerald-600"
                      : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                      selectedSession.isAdminOnline
                        ? "translate-x-6"
                        : "translate-x-0"
                    }`}
                  ></div>
                </button>
                <span className="text-sm font-medium">
                  {selectedSession.isAdminOnline ? "Active" : "Offline"}
                </span>
              </div>
            )}
          </div>

          <div className="border border-gray-300 rounded-lg flex-1 flex flex-col">
            {selectedSession ? (
              <>
                <ChatBox messages={messages} currentUser="admin" />
                <div className="border rounded-b-lg border-gray-300 mt-4 flex">
                  <input
                    className="rounded-b-lg"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ flex: 1, padding: "12px" }}
                    placeholder="Type admin reply..."
                  />
                  <button
                    disabled={!selectedSession.isAdminOnline}
                    className={`text-white rounded-b-lg ${
                      selectedSession.isAdminOnline
                        ? "bg-blue-500"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    style={{ padding: "8px 16px" }}
                  >
                    Reply
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center p-8 text-gray-600">
                Select a user to start chatting.
              </p>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatBoxPage;
