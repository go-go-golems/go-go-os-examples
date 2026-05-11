import type { Meta, StoryObj } from '@storybook/react-vite';
import { VmUiCardExample } from './VmUiCardExample';

const meta = {
  title: 'Examples/07 VM UI Card',
  component: VmUiCardExample,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof VmUiCardExample>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
