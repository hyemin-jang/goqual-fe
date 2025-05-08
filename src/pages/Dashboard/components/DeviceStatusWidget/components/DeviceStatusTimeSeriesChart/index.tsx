import { useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { getDiviceStatusValues } from '@/api/device';
import { ChartContainer } from '@/components/ui/chart';
import { durationMinute } from '@/constants/time';

export interface DeviceStatusTimeSeriesChartProps {
  deviceKey: string;
  refetchInterval: number;
}

const DeviceStatusTimeSeriesChart = ({
  deviceKey,
  refetchInterval,
}: DeviceStatusTimeSeriesChartProps) => {
  const { data } = useSuspenseQuery({
    queryFn: () => getDiviceStatusValues({
      deviceId: import.meta.env.VITE_DEVICE_ID,
      params: {
        startTs: Date.now() - durationMinute * 10,
        endTs: Date.now(),
        keys: deviceKey,
      },
    }),
    queryKey: ['getDiviceStatusValues', deviceKey],
    refetchInterval,
    refetchIntervalInBackground: true,
  });

  return (
    <div>
      <div className="pb-3">
        <div className="text-gray-500 text-xs">
          Device key name
        </div>
        <div className="text-gray-900 font-medium">
          {deviceKey}
        </div>
      </div>
      <ChartContainer
        config={{
          ts: {
            label: 'Time',
          },
        }}
        className="max-h-[200px] w-full"
      >
        <LineChart
          data={data[deviceKey].map(({ ts, value }) => ({
            ts,
            value: Number(value),
          }))}
        >
          <CartesianGrid
            syncWithTicks
          />
          <XAxis
            dataKey="ts"
            type="number"
            scale="time"
            domain={[
              Date.now() - durationMinute * 10,
              'dataMax',
            ]}
            tickLine={false}
            tickFormatter={(tick) => dayjs(new Date(tick)).format('HH:mm:ss')}
            interval="equidistantPreserveStart"
          />
          <YAxis
            dataKey="value"
            domain={['auto', 'auto']}
            tickLine={false}
            axisLine={false}
          />
          <Line
            dataKey="value"
            isAnimationActive={false}
            dot={false}
            stroke="var(--color-primary)"
            strokeWidth={2}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload?.length) {
                const { ts, value } = payload[0].payload;
                return (
                  <div className="p-2 bg-background border border-gray-200 shadow-sm">
                    <div className="font-semibold mb-1">
                      {deviceKey}
                    </div>
                    <div className="flex gap-x-2">
                      <div>
                        {dayjs(ts).format('YYYY-MM-DD HH:mm:ss')}
                      </div>
                      <div className="font-semibold">
                        {value}
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default DeviceStatusTimeSeriesChart;
