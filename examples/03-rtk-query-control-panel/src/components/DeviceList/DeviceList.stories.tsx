import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Device } from '../../services/controlPanelApi';
import { DeviceList } from './DeviceList';

const sampleDevices: Device[] = [
  { id: 'display', name: 'Built-in Display', kind: 'Display', enabled: true, health: 'good', usage: 86 },
  { id: 'speaker', name: 'Platinum Speaker', kind: 'Sound', enabled: true, health: 'warning', usage: 64 },
  { id: 'localtalk', name: 'LocalTalk Bridge', kind: 'Network', enabled: false, health: 'offline', usage: 0 },
];

const meta = {
  title: 'Components/DeviceList',
  component: DeviceList,
} satisfies Meta<typeof DeviceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    devices: sampleDevices,
    selectedId: 'display',
    onSelect: () => undefined,
    onToggle: () => undefined,
  },
  render: () => {
    const [selectedId, setSelectedId] = useState('display');
    return (
      <DeviceList
        devices={sampleDevices}
        selectedId={selectedId}
        onSelect={(device) => setSelectedId(device.id)}
        onToggle={(id) => console.log('toggle', id)}
      />
    );
  },
};
