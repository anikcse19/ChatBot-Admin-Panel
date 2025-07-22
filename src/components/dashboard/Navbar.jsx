import React from "react";
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
import { Input, Badge, Avatar } from "antd";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-[#f7f7f9]  px-6 py-3 ">
      {/* Left Side Icons */}
      <div className="flex gap-5 items-center">
        <HomeOutlined className="text-xl text-gray-600" />
        <InboxOutlined className="text-xl text-gray-600" />
        <ContactsOutlined className="text-xl text-gray-600" />
        <BookOutlined className="text-xl text-gray-600" />
        <SettingOutlined className="text-xl text-gray-600" />
      </div>

      {/* Right Side */}
      <div className="flex gap-4 items-center">
        <SearchOutlined className="text-xl text-gray-600 cursor-pointer" />
        {/* Notification */}
        <Badge count={9} size="small">
          <BellOutlined className="text-xl text-gray-600 cursor-pointer" />
        </Badge>

        {/* Profile */}
        <Avatar
          className="bg-blue-500 cursor-pointer"
          icon={<UserOutlined />}
        />
      </div>
    </div>
  );
};

export default Navbar;
