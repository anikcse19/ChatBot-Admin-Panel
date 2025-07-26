import React, { useState } from "react";
import WidgetCard from "../components/dashboard/WidgetCard";
import {
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Menu,
  Dropdown,
  Button,
  Table,
  Empty,
} from "antd";
import {
  UserOutlined,
  MessageOutlined,
  BarChartOutlined,
  SmileOutlined,
  CalendarOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Line } from "@ant-design/plots";
import { FiUsers } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoMdArrowRoundUp } from "react-icons/io";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { AiOutlineFolderView } from "react-icons/ai";
import { Link } from "react-router";
import { HiOutlineDocumentReport } from "react-icons/hi";
const { Title, Text } = Typography;

const DashboardContend = () => {
  const [timeRange, setTimeRange] = useState("Live Now");

  // Dropdown Menu Items
  const menu = (
    <Menu
      onClick={(e) => setTimeRange(e.key)}
      items={[
        { label: "Live Now", key: "Live Now" },
        { label: "This Week", key: "This Week" },
        { label: "Last Week", key: "Last Week" },
        { label: "This Month", key: "This Month" },
        { label: "Last Month", key: "Last Month" },
        { label: "Last 12 Months", key: "Last 12 Months" },
        { label: "Custom Range", key: "Custom Range" },
      ]}
    />
  );

  // Sample Graph Data (Replace with your API data)
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  const config = {
    data,
    xField: "year",
    yField: "value",
    height: 300,
  };
  // Table Columns
  const columns = [
    {
      title: "Visitor",
      dataIndex: "visitor",
      key: "visitor",
    },
    {
      title: "Agent",
      dataIndex: "agent",
      key: "agent",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
  ];

  // Empty Data Source
  const tableData = [];
  return (
    <div>
      <div className="p-4 space-y-5">
        <Row gutter={[16, 16]}>
          {/* Live Visitors Section */}
          <Col xs={24} md={24} lg={12}>
            <Card
              className=" border-gray-400 border-2 shadow-md shadow-gray-300"
              title={
                <div className="flex items-center gap-2">
                  <div className="bg-blue-500 w-8 h-8 flex items-center justify-center text-white font-bold rounded">
                    E
                  </div>
                  Live Visitors
                </div>
              }
              extra={
                <Dropdown overlay={menu} trigger={["click"]}>
                  <Button icon={<CalendarOutlined />}>
                    {timeRange} <DownOutlined />
                  </Button>
                </Dropdown>
              }
            >
              <Line {...config} />
            </Card>
          </Col>
          <Col xs={24} md={24} lg={12}>
            <Row gutter={[12, 12]}>
              <Col xs={24} md={12} lg={12}>
                <Card className=" border-gray-400 border-2 shadow-md shadow-gray-300">
                  <div className="flex items-center justify-between">
                    <div className=" space-y-5">
                      <div className=" flex text-lg">
                        {/* <FiUsers /> */}
                        <LuUsers
                          size={"1.5rem"}
                          className="mr-2 text-green-600 font-bold "
                        />{" "}
                        Visitors
                      </div>
                      <div>
                        <Text type="secondary">Today</Text>
                        <h2 className=" text-2xl font-bold text-black flex items-end gap-3">
                          0{" "}
                          <span className=" text-sm text-green-600 font-normal flex items-center gap-2">
                            <FaArrowTrendUp size={"1.2rem"} /> 0.0%
                          </span>
                        </h2>
                      </div>

                      <Text className=" flex items-center" type="secondary">
                        Last 7 days:{" "}
                        <span className=" flex items-center">
                          <FaLongArrowAltUp
                            size={"1.2rem"}
                            className=" text-green-600"
                          />
                          0{" "}
                          <FaLongArrowAltDown
                            size={"1.2rem"}
                            className=" text-red-600"
                          />
                          0
                        </span>
                      </Text>
                    </div>
                  </div>
                </Card>
              </Col>

              {/* Chats Card */}
              <Col xs={24} md={12} lg={12}>
                <Card className=" border-gray-400 border-2 shadow-md shadow-gray-300">
                  <div className="flex items-center justify-between">
                    <div className=" space-y-5">
                      <div className=" flex text-lg">
                        {/* <FiUsers /> */}
                        <MdOutlineMessage
                          size={"1.5rem"}
                          className="mr-2 text-[#f18cd8] font-bold "
                        />{" "}
                        Chats
                      </div>
                      <div className=" flex justify-between items-center gap-10">
                        <div>
                          <Text type="secondary">Today</Text>
                          <h2 className=" text-2xl font-bold text-black flex items-end gap-3">
                            0{" "}
                            <span className=" text-sm text-green-600 font-normal flex items-center gap-2">
                              <FaArrowTrendUp size={"1.2rem"} /> 0.0%
                            </span>
                          </h2>
                        </div>
                        <div>
                          <Text type="secondary">Missed</Text>
                          <h2 className=" text-2xl font-bold text-black flex items-end gap-3">
                            0{" "}
                            <span className=" text-sm text-green-600 font-normal flex items-center gap-2">
                              <FaArrowTrendUp size={"1.2rem"} /> 0.0%
                            </span>
                          </h2>
                        </div>
                      </div>

                      <Text className=" flex items-center" type="secondary">
                        Last 7 days:{" "}
                        <span className=" flex items-center">
                          <FaLongArrowAltUp
                            size={"1.2rem"}
                            className=" text-green-600"
                          />
                          0{" "}
                          <FaLongArrowAltDown
                            size={"1.2rem"}
                            className=" text-red-600"
                          />
                          0
                        </span>
                      </Text>
                    </div>
                  </div>
                </Card>
              </Col>

              {/* Page Views Card */}
              <Col xs={24} md={12} lg={12}>
                <Card className=" border-gray-400 border-2 shadow-md shadow-gray-300">
                  <div className="flex items-center justify-between">
                    <div className=" space-y-5">
                      <div className=" flex text-lg">
                        {/* <FiUsers /> */}
                        <AiOutlineFolderView
                          size={"1.5rem"}
                          className="mr-1 text-orange-400 font-bold "
                        />{" "}
                        Page Views
                      </div>
                      <div>
                        <Text type="secondary">Today</Text>
                        <h2 className=" text-2xl font-bold text-black flex items-end gap-3">
                          0{" "}
                          <span className=" text-sm text-green-600 font-normal flex items-center gap-2">
                            <FaArrowTrendUp size={"1.2rem"} /> 0.0%
                          </span>
                        </h2>
                      </div>

                      <Text className=" flex items-center" type="secondary">
                        Last 7 days:{" "}
                        <span className=" flex items-center">
                          <FaLongArrowAltUp
                            size={"1.2rem"}
                            className=" text-green-600"
                          />
                          0{" "}
                          <FaLongArrowAltDown
                            size={"1.2rem"}
                            className=" text-red-600"
                          />
                          0
                        </span>
                      </Text>
                    </div>
                  </div>
                </Card>
              </Col>

              {/* Reporting Card */}
              <Col xs={24} md={12} lg={12}>
                <Card className=" border-gray-400 border-2 shadow-md shadow-gray-300">
                  <div className="">
                    <div className=" space-y-3.5">
                      <div className=" flex justify-between ">
                        <div className=" flex text-lg">
                          {/* <FiUsers /> */}
                          <HiOutlineDocumentReport
                            size={"1.5rem"}
                            className="mr-1 text-blue-400 font-bold "
                          />{" "}
                          Reporting
                        </div>
                        <Link className="" to="#">
                          <h2 className="text-green-600 underline">More</h2>
                        </Link>
                      </div>

                      <div className=" flex justify-between ">
                        <h2 className=" text-[16px] text-black flex items-end gap-3">
                          Positive Sentiment
                        </h2>
                        <span className=" text-sm text-red-600 font-normal flex items-center gap-2">
                          <FaArrowTrendUp size={"1.2rem"} /> 0%
                        </span>
                      </div>

                      <div className=" flex justify-between ">
                        <h2 className=" text-[16px] text-black flex items-end gap-3">
                          Engagement
                        </h2>
                        <span className=" text-sm text-red-600 font-normal flex items-center gap-2">
                          <FaArrowTrendUp size={"1.2rem"} /> 0%
                        </span>
                      </div>
                      <div className=" flex justify-between ">
                        <h2 className=" text-[16px] text-black flex items-end gap-3">
                          Availability
                        </h2>
                        <span className=" text-sm text-green-600 font-normal flex items-center gap-2">
                          1.0%
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
            {/* Visitors Card */}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24} lg={12}>
            <Card className=" p-0"
              title={
                <div className="flex items-center gap-2">
                  <div className="bg-blue-500 w-8 h-8 flex items-center justify-center text-white font-bold rounded">
                    E
                  </div>
                  History
                </div>
              }
            >
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={false}
                locale={{
                  emptyText: (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={
                        <span>Hi Jannat, you don't have any messages yet</span>
                      }
                    />
                  ),
                }}
              />
            </Card>
          </Col>
        </Row>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <WidgetCard title="Visitors" today={0} percent={0} />
          <WidgetCard title="Chats" today={0} answered={0} missed={0} />
          <WidgetCard title="Page Views" today={0} percent={0} />
          <WidgetCard
            title="Reporting"
            positive={0}
            engagement={0}
            availability={8.5}
          />
        </div> */}
    </div>
  );
};

export default DashboardContend;
