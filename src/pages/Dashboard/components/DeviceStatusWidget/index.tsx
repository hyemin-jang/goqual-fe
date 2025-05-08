import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import {
  getDeviceStatusKeys,
  getDiviceStatusValues,
  type GetDeviceStatusKeysPayload,
  type GetDeviceStatusValuesPayload,
} from '@/api/device';
import { durationMinute } from '@/constants/time';
import DeviceStatusTimeSeriesChart from './components/DeviceStatusTimeSeriesChart';

const DeviceStatusWidget = () => {
  const { data } = useSuspenseQuery<GetDeviceStatusKeysPayload>({
    queryFn: () => getDeviceStatusKeys({
      deviceId: import.meta.env.VITE_DEVICE_ID,
    }),
    queryKey: ['getDeviceStatusKeys'],
  });

  const { data: intervalData } = useSuspenseQuery<GetDeviceStatusValuesPayload>({
    queryFn: () => getDiviceStatusValues({
      deviceId: import.meta.env.VITE_DEVICE_ID,
      params: {
        startTs: Date.now() - durationMinute * 10,
        endTs: Date.now(),
        keys: 'interval',
      },
    }),
    queryKey: ['getDiviceStatusValues'],
  });
  const interval = Number(intervalData.interval[0].value) * 1000;

  return (
    <div className="widget">
      <div className="text-lg font-semibold pb-4">
        Device Status
      </div>
      <div className="flex flex-wrap -m-4">
        {
          data.filter((deviceKey) => [
            'wh40batt',
            'baromrelin',
            'soilad1',
            'rainratein',
          ].includes(deviceKey)).map((deviceKey) => (
            <div
              key={deviceKey}
              className="flex-1 min-w-full md:flex-1/2 md:min-w-1/2 p-4"
            >
              <DeviceStatusTimeSeriesChart
                deviceKey={deviceKey}
                refetchInterval={interval}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default DeviceStatusWidget;
