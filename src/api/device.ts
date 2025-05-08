import apiClient from './apiClient';

export interface GetDeviceStatusKeysVariables {
  deviceId: string;
}

export type GetDeviceStatusKeysPayload = string[];

export interface GetDeviceStatusValuesVariables {
  deviceId: string;
  params: {
    startTs: number;
    endTs: number;
    keys: string;
  }
}

export interface GetDeviceStatusValuesPayload {
  [key: string]: {
    ts: number;
    value: string;
  }[]
}

export interface UpdateLampBrightnessVariables {
  deviceId: string;
  params: {
    brightness: number;
  }
}

export const getDeviceStatusKeys = ({ deviceId }: GetDeviceStatusKeysVariables) => (
  apiClient.get<GetDeviceStatusKeysPayload>(
    `/api/plugins/telemetry/DEVICE/${deviceId}/keys/timeseries`,
  )
);

export const getDiviceStatusValues = ({ deviceId, params }: GetDeviceStatusValuesVariables) => (
  apiClient.get<GetDeviceStatusValuesPayload>(
    `/api/plugins/telemetry/DEVICE/${deviceId}/values/timeseries`,
    { params },
  )
);

export const updateLampBrightness = ({ deviceId, params }: UpdateLampBrightnessVariables) => (
  apiClient.post<UpdateLampBrightnessVariables['params'], void>(
    `/api/plugins/telemetry/DEVICE/${deviceId}/SERVER_SCOPE`,
    params,
  )
);
