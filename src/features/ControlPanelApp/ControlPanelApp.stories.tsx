import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlPanelApp } from './ControlPanelApp';

const meta = {
  title: 'Features/ControlPanelApp',
  component: ControlPanelApp,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ControlPanelApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
