import { DefaultError, useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  updateLampBrightness,
  UpdateLampBrightnessVariables,
} from '@/api/device';
import { Slider } from '@/components/ui/slider';
import Lamp from './statics/lamp.svg?react';

const deviceId = 'e6d8ace0-1b87-11f0-b556-e7ea660b8ad9';

const LampControlWidget = () => {
  const [brightness, setBrightness] = useState(0);
  const mutation = useMutation<void, DefaultError, UpdateLampBrightnessVariables['params']>({
    mutationFn: (params) => updateLampBrightness({ deviceId, params }),
  });

  return (
    <div className="widget">
      <div className="bg-gray-800 p-8 flex justify-center">
        <Lamp
          width={200}
          height={200}
          opacity={0.1 + brightness * 0.9}
        />
      </div>
      <div className="p-6">
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
