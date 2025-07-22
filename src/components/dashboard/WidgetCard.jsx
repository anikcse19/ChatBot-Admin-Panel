import React from "react";
import { Card, Statistic } from "antd";

const WidgetCard = ({ title, today, answered, missed, percent, positive, engagement, availability }) => {
  return (
    <Card title={title} className="shadow rounded-lg">
      {title === "Chats" ? (
        <div className="flex justify-between">
          <Statistic title="Answered" value={answered} suffix="0.0%" />
          <Statistic title="Missed" value={missed} suffix="0.0%" />
        </div>
      ) : title === "Reporting" ? (
        <div>
          <p>Positive Sentiment: {positive}%</p>
          <p>Engagement: {engagement}%</p>
          <p>Availability: {availability}%</p>
        </div>
      ) : (
        <Statistic title="Today" value={today} suffix={`${percent}%`} />
      )}
    </Card>
  );
};

export default WidgetCard;
