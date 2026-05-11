import { useMemo, useState } from 'react';
import '@go-go-golems/os-core/theme';
import '@go-go-golems/os-core/desktop-theme-macos1';
import '@go-go-golems/os-widgets/theme';
import { Btn, Chip, ProgressBar, TabControl } from '@go-go-golems/os-core';
import { WidgetToolbar } from '@go-go-golems/os-widgets';
import { DeviceList } from '../../components/DeviceList';
import { FeedbackDemo } from '../../components/FeedbackDemo';
import { Os1Shell } from '../../components/Os1Shell';
import { PrimitiveGallery } from '../../components/PrimitiveGallery';
import { SettingsForm } from '../../components/SettingsForm';
import { SystemStatusTable } from '../../components/SystemStatusTable';
import {
  useGetDevicesQuery,
  useGetMetricsQuery,
  useGetSettingsQuery,
  useToggleDeviceMutation,
  useUpdateSettingsMutation,
} from '../../services/controlPanelApi';
import './ControlPanelApp.css';

const tabs = ['Primitives', 'Settings', 'Devices', 'Status', 'Feedback'];

export function ControlPanelApp() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('display');
  const settingsQuery = useGetSettingsQuery();
  const devicesQuery = useGetDevicesQuery();
  const metricsQuery = useGetMetricsQuery();
  const [updateSettings, updateState] = useUpdateSettingsMutation();
  const [toggleDevice, toggleState] = useToggleDeviceMutation();

  const enabledCount = useMemo(
    () => devicesQuery.data?.filter((device) => device.enabled).length ?? 0,
    [devicesQuery.data],
  );

  const footer = (
    <>
      <Chip>npmjs.com</Chip>
      <span>@go-go-golems/os-core@0.1.1</span>
      <span>@go-go-golems/os-widgets@0.1.1</span>
      <span>{enabledCount} devices enabled</span>
    </>
  );

  return (
    <Os1Shell
      title="Go-Go OS1 Control Panel"
      subtitle="React + RTK Query + Storybook consumer for public npm primitives"
      footer={footer}
    >
      <div className="control-panel-app">
        <WidgetToolbar>
          <Btn isDefault onClick={() => setActiveTab(0)}>Primitives</Btn>
          <Btn onClick={() => setActiveTab(1)}>Settings</Btn>
          <Btn onClick={() => setActiveTab(2)}>Devices</Btn>
          <Chip>{settingsQuery.isFetching || devicesQuery.isFetching ? 'Loading' : 'Ready'}</Chip>
        </WidgetToolbar>

        <TabControl tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
          <div className="control-panel-app__panel">
            {activeTab === 0 ? <PrimitiveGallery /> : null}

            {activeTab === 1 ? (
              settingsQuery.data ? (
                <SettingsForm
                  settings={settingsQuery.data}
                  saving={updateState.isLoading}
                  onSave={(patch) => void updateSettings(patch)}
                />
              ) : (
                <ProgressBar value={45} label="Loading settings" />
              )
            ) : null}

            {activeTab === 2 ? (
              devicesQuery.data ? (
                <DeviceList
                  devices={devicesQuery.data}
                  selectedId={selectedDeviceId}
                  busyId={toggleState.isLoading ? selectedDeviceId : undefined}
                  onSelect={(device) => setSelectedDeviceId(device.id)}
                  onToggle={(id) => void toggleDevice(id)}
                />
              ) : (
                <ProgressBar value={35} label="Loading devices" />
              )
            ) : null}

            {activeTab === 3 ? (
              metricsQuery.data ? <SystemStatusTable metrics={metricsQuery.data} /> : <ProgressBar value={70} />
            ) : null}

            {activeTab === 4 ? <FeedbackDemo /> : null}
          </div>
        </TabControl>
      </div>
    </Os1Shell>
  );
}
