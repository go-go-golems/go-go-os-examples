import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export type DesktopPattern = 'Grid' | 'Dither' | 'Plain';
export type Density = 'Compact' | 'Comfortable';
export type DeviceKind = 'Display' | 'Sound' | 'Network' | 'Storage';
export type DeviceHealth = 'good' | 'warning' | 'offline';

export interface ControlPanelSettings {
  profileName: string;
  soundEnabled: boolean;
  desktopPattern: DesktopPattern;
  density: Density;
  alertVolume: number;
}

export interface Device {
  id: string;
  name: string;
  kind: DeviceKind;
  enabled: boolean;
  health: DeviceHealth;
  usage: number;
}

export interface SystemMetric {
  id: string;
  label: string;
  value: string;
  status: 'ok' | 'watch' | 'offline';
}

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

let settings: ControlPanelSettings = {
  profileName: 'Public NPM Demo',
  soundEnabled: true,
  desktopPattern: 'Dither',
  density: 'Comfortable',
  alertVolume: 62,
};

let devices: Device[] = [
  { id: 'display', name: 'Built-in Display', kind: 'Display', enabled: true, health: 'good', usage: 86 },
  { id: 'speaker', name: 'Platinum Speaker', kind: 'Sound', enabled: true, health: 'warning', usage: 64 },
  { id: 'localtalk', name: 'LocalTalk Bridge', kind: 'Network', enabled: false, health: 'offline', usage: 0 },
  { id: 'disk', name: 'Widget Disk', kind: 'Storage', enabled: true, health: 'good', usage: 41 },
];

const metrics: SystemMetric[] = [
  { id: 'pkg-core', label: '@go-go-golems/os-core', value: '0.1.0', status: 'ok' },
  { id: 'pkg-widgets', label: '@go-go-golems/os-widgets', value: '0.1.0', status: 'ok' },
  { id: 'registry', label: 'Registry source', value: 'npmjs.com', status: 'ok' },
  { id: 'storybook', label: 'Storybook coverage', value: 'local stories', status: 'watch' },
];

export const controlPanelApi = createApi({
  reducerPath: 'controlPanelApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Settings', 'Device', 'Metric'],
  endpoints: (builder) => ({
    getSettings: builder.query<ControlPanelSettings, void>({
      async queryFn() {
        await delay();
        return { data: settings };
      },
      providesTags: ['Settings'],
    }),
    updateSettings: builder.mutation<ControlPanelSettings, Partial<ControlPanelSettings>>({
      async queryFn(patch) {
        await delay(120);
        settings = { ...settings, ...patch };
        return { data: settings };
      },
      invalidatesTags: ['Settings'],
    }),
    getDevices: builder.query<Device[], void>({
      async queryFn() {
        await delay();
        return { data: devices };
      },
      providesTags: (result) =>
        result
          ? [...result.map((device) => ({ type: 'Device' as const, id: device.id })), 'Device']
          : ['Device'],
    }),
    toggleDevice: builder.mutation<Device, string>({
      async queryFn(id) {
        await delay(120);
        devices = devices.map((device) =>
          device.id === id
            ? {
                ...device,
                enabled: !device.enabled,
                health: device.enabled ? 'offline' : 'good',
                usage: device.enabled ? 0 : Math.max(15, device.usage),
              }
            : device,
        );
        const device = devices.find((candidate) => candidate.id === id);
        if (!device) {
          return { error: { message: `Unknown device ${id}` } };
        }
        return { data: device };
      },
      invalidatesTags: (_result, _error, id) => [{ type: 'Device', id }, 'Device'],
    }),
    getMetrics: builder.query<SystemMetric[], void>({
      async queryFn() {
        await delay(80);
        return { data: metrics };
      },
      providesTags: ['Metric'],
    }),
  }),
});

export const {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
  useGetDevicesQuery,
  useToggleDeviceMutation,
  useGetMetricsQuery,
} = controlPanelApi;
