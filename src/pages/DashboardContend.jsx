import React from 'react';
import WidgetCard from '../components/dashboard/WidgetCard';

const DashboardContend = () => {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <WidgetCard title="Visitors" today={0} percent={0} />
          <WidgetCard title="Chats" today={0} answered={0} missed={0} />
          <WidgetCard title="Page Views" today={0} percent={0} />
          <WidgetCard
            title="Reporting"
            positive={0}
            engagement={0}
            availability={8.5}
          />
        </div>
      </div>
    );
};

export default DashboardContend;