import type { Meta, StoryObj } from '@storybook/react-vite';
import { WindowManagerShellExample } from './WindowManagerShellExample';

const meta = {
  title: 'Examples/05 Window Manager Shell',
  component: WindowManagerShellExample,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof WindowManagerShellExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
