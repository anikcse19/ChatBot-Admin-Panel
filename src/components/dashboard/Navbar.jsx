import React, { useEffect, useState } from "react";
import {
  SearchOutlined,
  BellOutlined,
  BarChartOutlined,
  UserOutlined,
  HomeOutlined,
  InboxOutlined,
  ContactsOutlined,
  KeyOutlined,
  BookOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Input, Badge, Avatar, Button } from "antd";
import { Link, NavLink } from "react-router";

import { getCurrentAdmin, signOut } from "../../utils/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const menuItems = [
    { path: "/", icon: <HomeOutlined />, label: "Home" },
    { path: "/inbox", icon: <InboxOutlined />, label: "Inbox" },
    { path: "/contact", icon: <ContactsOutlined />, label: "Contacts" },
    { path: "/book", icon: <BookOutlined />, label: "Book" },
    { path: "/setting", icon: <SettingOutlined />, label: "Settings" },
  ];
  //  const role = getUserRole();

  useEffect(() => {
    const fetchUser =async () => {
      const role = getCurrentAdmin();
      setUser(role);
    };
    fetchUser();
  }, []);
console.log("admin", user);
  return (
    <div className="flex justify-between items-center bg-[#f7f7f9]  px-6 py-2.5 ">
      {/* Left Side Icons */}
      <ul className="flex gap-5 items-center">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              color: isActive ? "green" : "inherit",
              textDecoration: "none",
            })}
          >
            <li className="hover:bg-gray-200 text-xl py-1 px-2 rounded">
              {item.icon}
            </li>
          </NavLink>
        ))}
      </ul>

      {/* Right Side */}
      <div className="md:flex gap-4 items-center hidden">
        <SearchOutlined className="text-xl text-gray-600 cursor-pointer" />
        {/* Notification */}
        <Badge count={9} size="small">
          <BellOutlined className="text-xl text-gray-600 cursor-pointer" />
        </Badge>
        {user ? (
          <Button onClick={signOut} color="blue" variant="filled">
            Logout
          </Button>
        ) : (
          <Avatar
            className="bg-blue-500 cursor-pointer"
            icon={<UserOutlined />}
          />
        )}
        {/* Profile */}
      </div>
    </div>
  );
};

export default Navbar;
