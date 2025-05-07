import apiClient from './apiClient';

export interface UpdateLampBrightnessVariables {
  deviceId: string;
  params: {
    brightness: number;
  }
}

export const updateLampBrightness = ({ deviceId, params }: UpdateLampBrightnessVariables) => (
  apiClient.post<UpdateLampBrightnessVariables['params'], void>(
    `/api/plugins/telemetry/DEVICE/${deviceId}/SERVER_SCOPE`,
    params,
  )
);
