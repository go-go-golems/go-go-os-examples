import { Btn, Chip, ListBox, ProgressBar } from '@go-go-golems/os-core';
import type { Device } from '../../services/controlPanelApi';
import './DeviceList.css';

export interface DeviceListProps {
  devices: Device[];
  selectedId?: string;
  busyId?: string;
  onSelect: (device: Device) => void;
  onToggle: (id: string) => void;
}

export function DeviceList({ devices, selectedId, busyId, onSelect, onToggle }: DeviceListProps) {
  const selectedIndex = Math.max(0, devices.findIndex((device) => device.id === selectedId));
  const selected = devices[selectedIndex];

  return (
    <section className="device-list">
      <ListBox
        items={devices.map((device) => `${device.enabled ? '●' : '○'} ${device.name}`)}
        selected={selectedIndex}
        onSelect={(index) => onSelect(devices[index])}
        height={164}
        width="100%"
      />
      {selected ? (
        <aside className="device-list__detail">
          <div className="device-list__heading">
            <strong>{selected.name}</strong>
            <Chip>{selected.kind}</Chip>
          </div>
          <p>Health: {selected.health}</p>
          <ProgressBar value={selected.usage} label={`${selected.name} usage`} />
          <Btn onClick={() => onToggle(selected.id)} disabled={busyId === selected.id}>
            {selected.enabled ? 'Disable' : 'Enable'}
          </Btn>
        </aside>
      ) : null}
    </section>
  );
}
