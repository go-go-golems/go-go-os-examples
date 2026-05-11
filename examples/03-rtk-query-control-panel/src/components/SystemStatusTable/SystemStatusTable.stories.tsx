import type { Meta, StoryObj } from '@storybook/react-vite';
import { SystemStatusTable } from './SystemStatusTable';

const meta = {
  title: 'Components/SystemStatusTable',
  component: SystemStatusTable,
  args: {
    metrics: [
      { id: 'core', label: '@go-go-golems/os-core', value: '0.1.0', status: 'ok' },
      { id: 'widgets', label: '@go-go-golems/os-widgets', value: '0.1.0', status: 'ok' },
      { id: 'storybook', label: 'Storybook', value: 'local', status: 'watch' },
    ],
  },
} satisfies Meta<typeof SystemStatusTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { metrics: [] },
};
