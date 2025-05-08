import { DefaultError, useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  updateLampBrightness,
  UpdateLampBrightnessVariables,
} from '@/api/device';
import { Slider } from '@/components/ui/slider';
import Lamp from './statics/lamp.svg?react';

const LampControlWidget = () => {
  const [brightness, setBrightness] = useState(0);
  const mutation = useMutation<void, DefaultError, UpdateLampBrightnessVariables['params']>({
    mutationFn: (params) => updateLampBrightness({
      deviceId: import.meta.env.VITE_DEVICE_ID,
      params,
    }),
  });

  return (
    <div className="widget">
      <div className="text-lg font-semibold pb-4">
        Lamp Brightness Controller
      </div>
      <div className="bg-gray-800 w-[300px] h-[300px] rounded-full flex justify-center items-center mx-auto">
        <Lamp
          width={200}
          height={200}
          opacity={0.1 + brightness * 0.9}
        />
      </div>
      <div className="py-4 w-full">
        <div className="text-gray-500 text-sm mb-4">
          밝기:
          {' '}
          {(brightness * 100).toFixed(0)}
          %
        </div>
        <Slider
          min={0}
          max={1}
          step={0.01}
          onValueChange={([value]) => {
            setBrightness(value);
          }}
          onValueCommit={([value]) => {
            mutation.mutate({
              brightness: value,
            });
          }}
        />
      </div>
    </div>
  );
};

export default LampControlWidget;
