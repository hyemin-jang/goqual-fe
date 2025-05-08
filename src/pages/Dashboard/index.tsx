import React from 'react';
import DeviceStatusWidget from './components/DeviceStatusWidget';
import LampControlWidget from './components/LampControlWidget';

const Dashboard = () => (
  <div className="page bg-gray-50 flex flex-col gap-y-6">
    <DeviceStatusWidget />
    <LampControlWidget />
  </div>
);

export default Dashboard;
