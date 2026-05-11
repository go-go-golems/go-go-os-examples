import type { Meta, StoryObj } from '@storybook/react-vite';
import { VmEventsAndIntentsExample } from './VmEventsAndIntentsExample';

const meta = {
  title: 'Examples/08 VM Events and Intents',
  component: VmEventsAndIntentsExample,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof VmEventsAndIntentsExample>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
