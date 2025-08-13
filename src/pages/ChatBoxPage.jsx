/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { conversationData } from "./conversationData";
import ChatBox from "../components/chatbox/ChatBox";
import { Card, Layout } from "antd";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { Content } from "antd/es/layout/layout";
import { IoMailOutline } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import {
  adminImageReply,
  adminReply,
  getAllConversation,
  getConversation,
  getSingleUser,
  makeAdminActive,
} from "../api/chatApplicationAPI";
import socket from "../socket";
import "../App.css";
const { Sider } = Layout;

const ChatBoxPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // file object
  const [dragOver, setDragOver] = useState(false);
  const dropRef = useRef(null);
  // Fetch all conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await getAllConversation();
        setConversations(res.data.conversation);
      } catch (err) {
        console.error("Error loading conversations:", err);
      }
    };

    fetchConversations();
  }, []);

  // Select session
  const handleSelectSession = async (sessionId) => {
    const selected = conversations.find((conv) => conv.sessionId === sessionId);
    setSelectedSession(selected);
    // console.log("select user",selectedSession)
    // Load conversation messages
    try {
      const res = await getConversation(sessionId);

      if (res.data.conversation) {
        setMessages(res.data.conversation.messages);
      }
      const data = await getSingleUser(res.data.conversation.userId);
      if (data?.data?.user) {
        setSelectedUser(data?.data?.user);
      }
    } catch (err) {
      console.error("Error loading conversation:", err);
    }

    // Emit admin joined
    socket.emit("admin-status", {
      sessionId,
      isActive: true,
    });
  };

  // Handle toggle
  const handleToggle = async (sessionId, newStatus) => {
    try {
      const res = await makeAdminActive({
        sessionId,
        isAdminOnline: newStatus,
      });

      if (res.status === 200) {
        const updated = conversations.map((conv) =>
          conv.sessionId === sessionId
            ? { ...conv, isAdminOnline: newStatus }
            : conv
        );
        setConversations(updated);
        setSelectedSession((prev) => ({
          ...prev,
          isAdminOnline: newStatus,
        }));

        socket.emit("admin-status", {
          sessionId,
          isActive: newStatus,
        });
      }
    } catch (error) {
      console.error("Toggle failed", error);
    }
  };

  // Handle sending admin message
  const handleSend = async () => {
    if (!message && !imageFile) return;
    console.log("di", imageFile);
    if (!selectedSession) return;

    const sessionId = selectedSession.sessionId;

    try {
      // Send text message
      if (message) {
        const textMsg = {
          sender: "admin",
          type: "text",
          text: message,
          timestamp: new Date(),
        };

        await adminReply({ sessionId, message: textMsg });

        setMessages((prev) => [...prev, textMsg]);
        socket.emit("admin-reply", { sessionId, text: message });
        setMessage("");
      }

      // Send image message
      if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const imageData = reader.result;
          console.log("imageData", imageData); // base64
          const res = await adminImageReply({
            sessionId,
            imageData,
            fileName: imageFile.name,
          });
          console.log(res);
          if (res.data?.imageUrl) {
            const imgMsg = {
              sender: "admin",
              type: "image",
              imageUrl: res.data.imageUrl,
              timestamp: new Date(),
            };

            setMessages((prev) => [...prev, imgMsg]);
            socket.emit("admin-reply", {
              sessionId,
              imageUrl: res.data.imageUrl,
            });

            // Clear image state after send
            setImageFile(null);
            setSelectedImage(null);
          }
        };
        reader.readAsDataURL(imageFile);
      }
    } catch (error) {
      console.error("Error sending admin reply:", error);
    }
  };

  const handleImageSelect = (file) => {
    if (!file) return;
    setImageFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  // Drag and Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.style.borderColor = "#3b82f6"; // blue
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.style.borderColor = "#9ca3af"; // gray-400
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.style.borderColor = "#9ca3af";

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageSelect(file);
    }
  };
  // Socket listeners
  useEffect(() => {
    if (!selectedSession?.sessionId) return;

    const sessionId = selectedSession.sessionId;

    const handleUserMsg = (data) => {
      const newMsg = {
        sender: "user",
        text: data.message,
        imageUrl: data.imageUrl,
        timestamp: new Date(),
      };

      if (data.sessionId === sessionId) {
        setMessages((prev) => [...prev, newMsg]);
      }

      // Update conversations + sort by latest message timestamp
      setConversations((prev) => {
        const updated = prev.map((conv) =>
          conv.sessionId === data.sessionId
            ? { ...conv, messages: [...conv.messages, newMsg] }
            : conv
        );
        return [...updated].sort((a, b) => {
          const aTime = new Date(a.messages[a.messages.length - 1].timestamp);
          const bTime = new Date(b.messages[b.messages.length - 1].timestamp);
          return bTime - aTime;
        });
      });
    };

    const handleBotReply = (data) => {
      const newMsg = {
        sender: "bot",
        text: data.message,
        timestamp: new Date(),
      };

      if (data.sessionId === sessionId) {
        setMessages((prev) => [...prev, newMsg]);
      }

      setConversations((prev) => {
        const updated = prev.map((conv) =>
          conv.sessionId === data.sessionId
            ? { ...conv, messages: [...conv.messages, newMsg] }
            : conv
        );
        return [...updated].sort((a, b) => {
          const aTime = new Date(a.messages[a.messages.length - 1].timestamp);
          const bTime = new Date(b.messages[b.messages.length - 1].timestamp);
          return bTime - aTime;
        });
      });
    };

    socket.on("user-message", handleUserMsg);
    socket.on("bot_reply", handleBotReply);
    socket.emit("join", sessionId);

    return () => {
      socket.off("user-message", handleUserMsg);
      socket.off("bot_reply", handleBotReply);
    };
  }, [selectedSession?.sessionId]);

  return (
    <Layout
      style={{ display: "flex", gap: "16px", minHeight: "calc(100vh - 92px)" }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={300}
        style={{
          background: "white",
          border: "1px solid #d9d9d9",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          borderRadius: "8px",
          height: "100%", // fixed height relative to parent Layout
          display: "flex",
          flexDirection: "column",
          transition: "all 0.4s ease-in-out",
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
                  className="hover:bg-blue-100 px-1 py-1 flex items-center justify-between rounded-lg text-center mb-5 text-sm font-medium cursor-pointer"
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
              Messages
              {/* All users {conversations.length} */}
            </h2>
            {/* Scrollable user list */}
            <div
              style={{
                overflowY: "auto",
                flex: 1,
                height: "calc(100vh - 189px)",
              }}
              className="py-2 px-1 mb-2"
            >
              {conversations.map((conv) => (
                <div
                  onClick={() => handleSelectSession(conv.sessionId)}
                  key={conv.sessionId}
                  className={`hover:bg-blue-100 p-2 flex items-start justify-between rounded-lg text-center mb-5 text-sm font-medium cursor-pointer ${
                    selectedSession?.sessionId === conv.sessionId
                      ? "bg-blue-200"
                      : "bg-white"
                  }`}
                >
                  <div className=" flex items-center gap-3">
                    <img
                      src="/user.jpg"
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                    <div className=" flex flex-col items-start">
                      <h2 className=" flex-1 text-lg">{conv.userName}</h2>
                      <p
                        className="truncate text-start w-40 text-xs text-gray-600"
                        style={{}}
                      >
                        {" "}
                        {conv?.messages[conv?.messages.length - 1].text}
                      </p>
                    </div>
                  </div>

                  <div className=" flex items-start ">
                    <h2 className="text-[10px]">
                      {" "}
                      {new Date(
                        conv?.messages[conv?.messages.length - 1].timestamp
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </h2>
                  </div>
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
        <Content className="p-8 justify-between flex lg:flex-row flex-col flex-1">
          <div className=" lg:w-[70%]">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold">Admin Chat</h2>
              <div className=" flex gap-2 items-center">
                {selectedSession && (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() =>
                        handleToggle(
                          selectedSession.sessionId,
                          !selectedSession.isAdminOnline
                        )
                      }
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
                {/* <button className=" lg:hidden border p-1 text-lg"> 
                  <BiUser></BiUser></button> */}
              </div>
            </div>

            <div className="border border-gray-300 rounded-lg flex-1 flex flex-col">
              {selectedSession ? (
                <>
                  <ChatBox messages={messages} currentUser="admin" />
                  <div
                    ref={dropRef}
                    className={`border border-dashed p-4 rounded relative ${
                      dragOver ? "border-blue-500" : "border-white"
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                    }}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      handleDrop(e);
                    }}
                  >
                    {/* Image preview */}
                    {selectedImage && (
                      <div className="p-2 relative ">
                        <img
                          src={selectedImage}
                          alt="preview"
                          className="max-h-24 rounded border mb-2"
                        />
                        <button
                          onClick={() => {
                            setSelectedImage(null);
                            setImageFile(null);
                            setDragOver(false);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white px-2 rounded cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    )}

                    <div className="border rounded-b-lg border-gray-300 mt-4 flex">
                      <input
                        className="rounded-b-lg"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ flex: 1, padding: "12px" }}
                        placeholder="Type admin reply..."
                      />
                      <label className="cursor-pointer bg-gray-200 px-3 py-2 rounded">
                        📷
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageSelect(e.target.files[0])}
                          className="hidden"
                        />
                      </label>
                      <button
                        onClick={handleSend}
                        disabled={!selectedSession?.isAdminOnline}
                        className={`text-white rounded-b-lg ${
                          selectedSession?.isAdminOnline
                            ? "bg-blue-500"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                        style={{ padding: "8px 16px" }}
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-center p-8 text-gray-600">
                  Select a user to start chatting.
                </p>
              )}
            </div>
          </div>
          {selectedSession && (
            <Card
              style={{
                maxHeight: "300px",
                marginTop: "46px",
                // background: "#f7f7f9",
                border: "1px solid #d9d9d9",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <img src="user.jpg" alt="" className=" w-40 h-40 rounded-full" />
              <h2 className=" text-2xl font-semibold text-center text-green-600">
                {selectedUser?.name}
              </h2>
              <h2 className=" text-center flex gap-2 mt-2 text-sm text-gray-600  justify-center items-center">
                <IoMailOutline style={{ color: "blue" }} size={"1.3rem"} />{" "}
                {selectedUser?.email}
              </h2>
            </Card>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatBoxPage;
