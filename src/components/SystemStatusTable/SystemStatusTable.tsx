import { DataTable } from '@go-go-golems/os-core';
import type { SystemMetric } from '../../services/controlPanelApi';

export interface SystemStatusTableProps {
  metrics: SystemMetric[];
}

type MetricRow = SystemMetric & Record<string, unknown>;

export function SystemStatusTable({ metrics }: SystemStatusTableProps) {
  return (
    <DataTable<MetricRow>
      items={metrics as MetricRow[]}
      rowKey="id"
      columns={[
        { key: 'label', label: 'Check', width: '1.6fr' },
        { key: 'value', label: 'Value', width: '1fr' },
        {
          key: 'status',
          label: 'Status',
          width: '80px',
          renderCell: (value) => String(value).toUpperCase(),
          cellState: (value) => String(value),
        },
      ]}
      emptyMessage="No metrics loaded"
    />
  );
}
